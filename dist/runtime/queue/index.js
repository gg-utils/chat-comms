/**
 * @fileoverview Headless queue scheduling primitives — barrier logic with no React/DOM dependency.
 *
 * These functions determine when queued content can proceed based on wait-mode semantics:
 * DRAIN, IDLE, and CONTENT_IDS. They also normalize protocol `content_delay` values and
 * partition content into the default queue versus named parallel queues without depending on
 * React, browser APIs, or a consuming app's state containers.
 *
 * @testing cd chat-stream-protocol && npm test
 */
export const RUNTIME_QUEUE_DEFAULT_QUEUE_NAME = "main";
export const RUNTIME_QUEUE_CONTENT_DELAY_WARNING_THRESHOLD_MS = 60000;
// ============================================================================
// Barrier evaluation
// ============================================================================
/**
 * Check if all items in the specified queues have reached terminal state.
 * Terminal states: "completed" or "error".
 */
export function areQueuesDrained(items, queueNames) {
    const targetItems = items.filter((item) => queueNames.includes(item.queueName));
    if (targetItems.length === 0)
        return true;
    return targetItems.every((item) => item.status === "completed" || item.status === "error");
}
/**
 * Check if no items in the specified queues are actively processing.
 * IDLE means no "processing" items — pending is allowed.
 */
export function areQueuesIdle(items, queueNames) {
    const targetItems = items.filter((item) => queueNames.includes(item.queueName));
    return targetItems.every((item) => item.status !== "processing");
}
/**
 * Check if all specified content IDs have reached terminal state.
 */
export function areContentIdsComplete(items, contentIds) {
    const targetItems = items.filter((item) => contentIds.includes(item.contentId));
    if (targetItems.length === 0)
        return true;
    return targetItems.every((item) => item.status === "completed" || item.status === "error");
}
/**
 * Evaluate a queue barrier against the current queue state.
 *
 * @returns `true` if the barrier condition is satisfied.
 */
export function evaluateQueueBarrier(items, barrier) {
    switch (barrier.waitMode) {
        case "DRAIN":
            return areQueuesDrained(items, barrier.queueNames);
        case "IDLE":
            return areQueuesIdle(items, barrier.queueNames);
        case "CONTENT_IDS":
            return areContentIdsComplete(items, barrier.contentIds ?? []);
        default:
            return false;
    }
}
// ============================================================================
// Protocol wait-action normalization
// ============================================================================
/**
 * Collect content IDs in targeted queues that were pending when a wait barrier was created.
 *
 * @remarks
 * This mirrors the protocol semantics used by UI queue processors: DRAIN waits for the snapshot
 * of currently pending content in targeted queues, then waits for those queues to become inactive.
 */
export function collectRuntimeQueuePendingContentIds(options) {
    const targetQueueNames = new Set(options.targetQueueNames);
    const pendingContentIds = [];
    for (const item of options.contentItems) {
        if (!targetQueueNames.has(item.queueName)) {
            continue;
        }
        if (!item.processed) {
            pendingContentIds.push(item.contentId);
        }
    }
    return pendingContentIds;
}
/**
 * Convert a protocol `CHAT_ACTION_WAIT_FOR_QUEUES` payload into a runtime wait request.
 *
 * @remarks
 * The default queue is intentionally removed from `queue_names` to prevent self-deadlocks in
 * processors that execute the main/default queue serially.
 */
export function normalizeRuntimeQueueWaitRequest(options) {
    const defaultQueueName = options.defaultQueueName ?? RUNTIME_QUEUE_DEFAULT_QUEUE_NAME;
    const requestedQueueNames = options.actionData.queue_names ?? [];
    if (requestedQueueNames.length === 0) {
        return {
            shouldWait: false,
            reason: "RUNTIME_QUEUE_WAIT_SKIP_EMPTY_QUEUE_NAMES",
        };
    }
    const queueNames = Array.from(new Set(requestedQueueNames.filter((queueName) => queueName.trim().length > 0 && queueName !== defaultQueueName)));
    if (queueNames.length === 0) {
        return {
            shouldWait: false,
            reason: "RUNTIME_QUEUE_WAIT_SKIP_ONLY_DEFAULT_QUEUE",
        };
    }
    const waitMode = options.actionData.wait_mode ?? "DRAIN";
    const pendingContentIds = waitMode === "CONTENT_IDS"
        ? (options.actionData.content_ids ?? [])
        : collectRuntimeQueuePendingContentIds({
            contentItems: options.contentItems,
            targetQueueNames: queueNames,
        });
    return {
        shouldWait: true,
        request: {
            queueNames,
            waitMode,
            pendingContentIds,
            timeoutMs: options.actionData.timeout_ms,
            onTimeout: options.actionData.on_timeout ?? "CONTINUE",
        },
    };
}
/**
 * Decide whether a normalized runtime queue wait request is complete.
 *
 * @remarks
 * `IDLE` only checks active queue names, `CONTENT_IDS` only checks explicit content IDs, and
 * `DRAIN` requires both the snapshot content IDs to be processed and the target queues to be idle.
 */
export function isRuntimeQueueWaitComplete(options) {
    const { request, processedContentIds, activeQueueNames } = options;
    if (request.waitMode === "IDLE") {
        return request.queueNames.every((queueName) => !activeQueueNames.has(queueName));
    }
    const allPendingIdsProcessed = request.pendingContentIds.every((contentId) => processedContentIds.has(contentId));
    if (request.waitMode === "CONTENT_IDS") {
        return allPendingIdsProcessed;
    }
    return (allPendingIdsProcessed &&
        request.queueNames.every((queueName) => !activeQueueNames.has(queueName)));
}
/** Count how many snapshot content IDs for a wait request are currently processed. */
export function getRuntimeQueueWaitProcessedCount(options) {
    return options.request.pendingContentIds.filter((contentId) => options.processedContentIds.has(contentId)).length;
}
// ============================================================================
// Queue partitioning and content-delay normalization
// ============================================================================
/** Return a non-empty queue name, falling back to the protocol default queue. */
export function getRuntimeQueueName(options) {
    const defaultQueueName = options.defaultQueueName ?? RUNTIME_QUEUE_DEFAULT_QUEUE_NAME;
    const queueName = options.queueName?.trim();
    return queueName && queueName.length > 0 ? queueName : defaultQueueName;
}
/** Partition generic runtime items into default-queue work and named parallel-queue work. */
export function partitionRuntimeQueueItemsByQueue(options) {
    const defaultQueueName = options.defaultQueueName ?? RUNTIME_QUEUE_DEFAULT_QUEUE_NAME;
    const defaultQueueItems = [];
    const nonDefaultQueueItemsByName = new Map();
    for (const item of options.items) {
        const queueName = getRuntimeQueueName({
            queueName: options.getQueueName(item),
            defaultQueueName,
        });
        if (queueName === defaultQueueName) {
            defaultQueueItems.push(item);
            continue;
        }
        const queueItems = nonDefaultQueueItemsByName.get(queueName) ?? [];
        queueItems.push(item);
        nonDefaultQueueItemsByName.set(queueName, queueItems);
    }
    return { defaultQueueItems, nonDefaultQueueItemsByName };
}
/** Normalize protocol `content_delay` before a UI queue processor starts a delay timer. */
export function normalizeRuntimeQueueContentDelay(options) {
    const warningThresholdMs = options.warningThresholdMs ??
        RUNTIME_QUEUE_CONTENT_DELAY_WARNING_THRESHOLD_MS;
    if (options.rawDelay === undefined || options.rawDelay === null) {
        return {
            shouldDelay: false,
            delayMs: null,
            reason: "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_MISSING",
        };
    }
    if (!Number.isFinite(options.rawDelay)) {
        return {
            shouldDelay: false,
            delayMs: null,
            reason: "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_NON_FINITE",
            warningMessage: `[ContentDelay] Invalid delay value: ${options.rawDelay}ms, skipping`,
        };
    }
    if (options.rawDelay <= 0) {
        return {
            shouldDelay: false,
            delayMs: null,
            reason: "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_NON_POSITIVE",
            warningMessage: `[ContentDelay] Invalid delay value: ${options.rawDelay}ms, skipping`,
        };
    }
    if (options.rawDelay > warningThresholdMs) {
        return {
            shouldDelay: true,
            delayMs: options.rawDelay,
            isUnusuallyLong: true,
            warningMessage: `[ContentDelay] Unusually long delay: ${options.rawDelay}ms (${(options.rawDelay / 1000).toFixed(1)}s) - is this intentional?`,
        };
    }
    return {
        shouldDelay: true,
        delayMs: options.rawDelay,
        isUnusuallyLong: false,
    };
}
// ============================================================================
// Queue scheduling
// ============================================================================
/**
 * Schedule content items into named queues. Returns a map of queueName -> items.
 * Items with no queue or empty queue are assigned to the default queue.
 */
export function scheduleItemsIntoQueues(items, defaultQueue = "main") {
    const queues = new Map();
    for (const item of items) {
        const qn = item.queueName?.trim() || defaultQueue;
        const existing = queues.get(qn) ?? [];
        existing.push(item.contentId);
        queues.set(qn, existing);
    }
    return queues;
}
/**
 * Determine the next item to process from a queue, respecting FIFO order.
 * Returns the first pending item, or null if none.
 */
export function selectNextQueueItem(items, queueName) {
    const queueItems = items.filter((item) => item.queueName === queueName && item.status === "pending");
    return queueItems[0] ?? null;
}
/**
 * Check if a queue name is the reserved main queue.
 * The main queue is serial and should never be targeted by WAIT_FOR_QUEUES
 * to prevent self-deadlock.
 */
export function isReservedMainQueue(queueName) {
    return queueName === "main";
}
//# sourceMappingURL=index.js.map