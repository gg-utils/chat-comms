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
export interface RuntimeQueueItem {
    contentId: string;
    queueName: string;
    status: "pending" | "processing" | "completed" | "error";
}
export interface RuntimeQueueBarrier {
    queueNames: string[];
    waitMode: "DRAIN" | "IDLE" | "CONTENT_IDS";
    contentIds?: string[];
    timeoutMs?: number;
    onTimeout?: "CONTINUE" | "ERROR";
}
export type RuntimeQueueWaitMode = RuntimeQueueBarrier["waitMode"];
export type RuntimeQueueTimeoutBehavior = NonNullable<RuntimeQueueBarrier["onTimeout"]>;
export declare const RUNTIME_QUEUE_DEFAULT_QUEUE_NAME = "main";
export declare const RUNTIME_QUEUE_CONTENT_DELAY_WARNING_THRESHOLD_MS = 60000;
export interface RuntimeQueueWaitActionData {
    queue_names?: string[];
    wait_mode?: RuntimeQueueWaitMode;
    content_ids?: string[];
    timeout_ms?: number;
    on_timeout?: RuntimeQueueTimeoutBehavior;
}
export interface RuntimeQueueContentSnapshotItem {
    contentId: string;
    queueName: string;
    processed: boolean;
}
export interface RuntimeQueueWaitRequest {
    queueNames: string[];
    waitMode: RuntimeQueueWaitMode;
    pendingContentIds: string[];
    timeoutMs?: number;
    onTimeout: RuntimeQueueTimeoutBehavior;
}
export type RuntimeQueueWaitSkipReason = "RUNTIME_QUEUE_WAIT_SKIP_EMPTY_QUEUE_NAMES" | "RUNTIME_QUEUE_WAIT_SKIP_ONLY_DEFAULT_QUEUE";
export type RuntimeQueueWaitRequestResolution = {
    shouldWait: false;
    reason: RuntimeQueueWaitSkipReason;
} | {
    shouldWait: true;
    request: RuntimeQueueWaitRequest;
};
export type RuntimeQueueContentDelaySkipReason = "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_MISSING" | "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_NON_FINITE" | "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_NON_POSITIVE";
export type RuntimeQueueContentDelayDecision = {
    shouldDelay: false;
    delayMs: null;
    reason: RuntimeQueueContentDelaySkipReason;
    warningMessage?: string;
} | {
    shouldDelay: true;
    delayMs: number;
    isUnusuallyLong: boolean;
    warningMessage?: string;
};
export interface RuntimeQueuePartitionResult<Item> {
    defaultQueueItems: Item[];
    nonDefaultQueueItemsByName: Map<string, Item[]>;
}
/**
 * Check if all items in the specified queues have reached terminal state.
 * Terminal states: "completed" or "error".
 */
export declare function areQueuesDrained(items: RuntimeQueueItem[], queueNames: string[]): boolean;
/**
 * Check if no items in the specified queues are actively processing.
 * IDLE means no "processing" items — pending is allowed.
 */
export declare function areQueuesIdle(items: RuntimeQueueItem[], queueNames: string[]): boolean;
/**
 * Check if all specified content IDs have reached terminal state.
 */
export declare function areContentIdsComplete(items: RuntimeQueueItem[], contentIds: string[]): boolean;
/**
 * Evaluate a queue barrier against the current queue state.
 *
 * @returns `true` if the barrier condition is satisfied.
 */
export declare function evaluateQueueBarrier(items: RuntimeQueueItem[], barrier: RuntimeQueueBarrier): boolean;
/**
 * Collect content IDs in targeted queues that were pending when a wait barrier was created.
 *
 * @remarks
 * This mirrors the protocol semantics used by UI queue processors: DRAIN waits for the snapshot
 * of currently pending content in targeted queues, then waits for those queues to become inactive.
 */
export declare function collectRuntimeQueuePendingContentIds(options: {
    contentItems: RuntimeQueueContentSnapshotItem[];
    targetQueueNames: readonly string[];
}): string[];
/**
 * Convert a protocol `CHAT_ACTION_WAIT_FOR_QUEUES` payload into a runtime wait request.
 *
 * @remarks
 * The default queue is intentionally removed from `queue_names` to prevent self-deadlocks in
 * processors that execute the main/default queue serially.
 */
export declare function normalizeRuntimeQueueWaitRequest(options: {
    actionData: RuntimeQueueWaitActionData;
    contentItems: RuntimeQueueContentSnapshotItem[];
    defaultQueueName?: string;
}): RuntimeQueueWaitRequestResolution;
/**
 * Decide whether a normalized runtime queue wait request is complete.
 *
 * @remarks
 * `IDLE` only checks active queue names, `CONTENT_IDS` only checks explicit content IDs, and
 * `DRAIN` requires both the snapshot content IDs to be processed and the target queues to be idle.
 */
export declare function isRuntimeQueueWaitComplete(options: {
    request: RuntimeQueueWaitRequest;
    processedContentIds: ReadonlySet<string>;
    activeQueueNames: ReadonlySet<string>;
}): boolean;
/** Count how many snapshot content IDs for a wait request are currently processed. */
export declare function getRuntimeQueueWaitProcessedCount(options: {
    request: RuntimeQueueWaitRequest;
    processedContentIds: ReadonlySet<string>;
}): number;
/** Return a non-empty queue name, falling back to the protocol default queue. */
export declare function getRuntimeQueueName(options: {
    queueName: string | undefined;
    defaultQueueName?: string;
}): string;
/** Partition generic runtime items into default-queue work and named parallel-queue work. */
export declare function partitionRuntimeQueueItemsByQueue<Item>(options: {
    items: readonly Item[];
    getQueueName: (item: Item) => string | undefined;
    defaultQueueName?: string;
}): RuntimeQueuePartitionResult<Item>;
/** Normalize protocol `content_delay` before a UI queue processor starts a delay timer. */
export declare function normalizeRuntimeQueueContentDelay(options: {
    rawDelay: number | null | undefined;
    warningThresholdMs?: number;
}): RuntimeQueueContentDelayDecision;
/**
 * Schedule content items into named queues. Returns a map of queueName -> items.
 * Items with no queue or empty queue are assigned to the default queue.
 */
export declare function scheduleItemsIntoQueues(items: Array<{
    contentId: string;
    queueName?: string;
}>, defaultQueue?: string): Map<string, string[]>;
/**
 * Determine the next item to process from a queue, respecting FIFO order.
 * Returns the first pending item, or null if none.
 */
export declare function selectNextQueueItem(items: RuntimeQueueItem[], queueName: string): RuntimeQueueItem | null;
/**
 * Check if a queue name is the reserved main queue.
 * The main queue is serial and should never be targeted by WAIT_FOR_QUEUES
 * to prevent self-deadlock.
 */
export declare function isReservedMainQueue(queueName: string): boolean;
//# sourceMappingURL=index.d.ts.map