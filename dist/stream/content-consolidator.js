/**
 * @fileoverview Protocol content consolidation for stream-summary and persistence consumers.
 *
 * The consolidator operates on pre-tokenized protocol segments so consuming applications can keep
 * their own markdown/LLM extraction policies while sharing protocol-owned content/action merging.
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run typecheck
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { isProtocolActionLoose } from "../validators/loose.js";
import { extractProtocolStreamSegmentsFromMarkdown } from "./segment-extractor.js";
import { asRecord, isRecord, } from "./summary-parser.js";
/** Walks protocol JSON segments to merge `message_contents` and apply deferred action wrappers. */
export class ProtocolContentConsolidator_Class {
    options;
    constructor(options = {}) {
        this.options = {
            debug: false,
            includeActionWrappers: false,
            ...options,
        };
    }
    /** Consolidates message contents from pre-tokenized stream segments. */
    consolidateSegments(segments) {
        const stats = ProtocolContentConsolidator_createEmptyStats();
        if (!segments || segments.length === 0) {
            return ProtocolContentConsolidator_createResult({ stats });
        }
        const contentMap = new Map();
        const actionWrappers = [];
        for (const segment of segments) {
            this.processSegment(segment, contentMap, actionWrappers, stats);
        }
        stats.actionWrappersFound = actionWrappers.length;
        const { appliedActions, orphanedActions } = this.applyTrackedActions(actionWrappers, contentMap);
        const contents = Array.from(contentMap.values());
        stats.contentItemsConsolidated = contents.length;
        if (this.options.debug) {
            console.log("[ProtocolContentConsolidator_Class] Consolidation stats:", stats);
            if (orphanedActions.length > 0) {
                console.log("[ProtocolContentConsolidator_Class] Orphaned actions:", orphanedActions);
            }
        }
        return {
            contents,
            appliedActions,
            orphanedActions,
            stats,
        };
    }
    /** Consolidates message contents from JSON values without a segment extraction layer. */
    consolidateValues(values) {
        return this.consolidateSegments(values?.map((value) => ({ type: "json", content: value })));
    }
    /** Consolidates message contents from raw markdown stream output. */
    consolidate(streamOutput) {
        if (!streamOutput) {
            return this.consolidateSegments(undefined);
        }
        return this.consolidateSegments(extractProtocolStreamSegmentsFromMarkdown(streamOutput));
    }
    /** Extracts only consolidated content items from pre-tokenized stream segments. */
    extractContentsFromSegments(segments) {
        return this.consolidateSegments(segments).contents;
    }
    /** Extracts only consolidated content items from raw markdown stream output. */
    extractContents(streamOutput) {
        return this.consolidate(streamOutput).contents;
    }
    /** Applies action wrappers from external sources to existing content. */
    applyExternalActions(contents, actions) {
        const contentMap = new Map();
        for (const content of contents) {
            contentMap.set(content.content_id, { ...content });
        }
        for (const action of actions) {
            if (!action.targetContentId)
                continue;
            const targetContent = contentMap.get(action.targetContentId);
            if (targetContent) {
                this.applyActionToContent(action, targetContent);
            }
        }
        return Array.from(contentMap.values());
    }
    /** Processes a generic segment recursively. */
    processSegment(segment, contentMap, actionWrappers, stats) {
        if (segment.type === "json") {
            this.processSegmentValue(segment.content, contentMap, actionWrappers, stats);
            return;
        }
        if (segment.type === "container" &&
            ProtocolContentConsolidator_isSegmentArray(segment.content)) {
            for (const nestedSegment of segment.content) {
                this.processSegment(nestedSegment, contentMap, actionWrappers, stats);
            }
        }
    }
    /** Processes a JSON value to extract protocol messages and content items. */
    processSegmentValue(value, contentMap, actionWrappers, stats) {
        if (Array.isArray(value)) {
            for (const item of value) {
                this.processSegmentValue(item, contentMap, actionWrappers, stats);
            }
            return;
        }
        const message = ProtocolContentConsolidator_getProtocolMessage(value);
        if (!message)
            return;
        stats.messagesProcessed += 1;
        for (const content of message.message_contents ?? []) {
            stats.contentItemsRaw += 1;
            this.processContentItem(content, contentMap, actionWrappers);
        }
    }
    /** Processes a single content item. */
    processContentItem(content, contentMap, actionWrappers) {
        if (content.content_type === "CHAT_CONTENT_ACTION_WRAPPER") {
            const actionWrapper = this.extractActionWrapper(content);
            if (actionWrapper) {
                actionWrappers.push(actionWrapper);
            }
            if (!this.options.includeActionWrappers)
                return;
        }
        const existingContent = contentMap.get(content.content_id);
        if (existingContent) {
            const merged = this.deepMerge(existingContent, content);
            if (ProtocolContentConsolidator_isContentItem(merged)) {
                contentMap.set(content.content_id, merged);
            }
        }
        else {
            contentMap.set(content.content_id, { ...content });
        }
    }
    /** Extracts action wrapper data from a `CHAT_CONTENT_ACTION_WRAPPER` content item. */
    extractActionWrapper(content) {
        const action = content.content_data?.["action"];
        if (!isProtocolActionLoose(action))
            return null;
        const targetContentId = this.resolveActionTargetContentId(action.action_type, action.action_data);
        return {
            targetContentId,
            actionType: action.action_type,
            actionData: action.action_data,
            sourceContentId: content.content_id,
        };
    }
    /** Resolves the target content id for an action based on its type and data. */
    resolveActionTargetContentId(actionType, actionData) {
        if (!actionData)
            return undefined;
        const targetFieldsByActionType = {
            CHAT_ACTION_UPDATE_PROGRESS_BAR: ["progress_bar_content_id"],
            CHAT_ACTION_UPDATE_PANEL: ["panel_content_id"],
        };
        const targetFields = targetFieldsByActionType[actionType] || [];
        for (const field of targetFields) {
            const value = actionData[field];
            if (typeof value === "string")
                return value;
        }
        for (const field of ["target_content_id", "content_id"]) {
            const value = actionData[field];
            if (typeof value === "string")
                return value;
        }
        return undefined;
    }
    /** Applies an action wrapper to a target content item. */
    applyActionToContent(action, targetContent) {
        const existingData = asRecord(targetContent.content_data) ?? {};
        targetContent.content_data = this.deepMerge(existingData, action.actionData);
    }
    /** Deep-merges objects with source values overriding target values; arrays are replaced. */
    deepMerge(target, source) {
        const result = { ...target };
        for (const [key, sourceValue] of Object.entries(source)) {
            const targetValue = result[key];
            if (isRecord(sourceValue) && isRecord(targetValue)) {
                result[key] = this.deepMerge(targetValue, sourceValue);
            }
            else if (sourceValue !== undefined) {
                result[key] = sourceValue;
            }
        }
        return result;
    }
    applyTrackedActions(actionWrappers, contentMap) {
        const appliedActions = [];
        const orphanedActions = [];
        for (const wrapper of actionWrappers) {
            if (!wrapper.targetContentId) {
                orphanedActions.push(wrapper);
                continue;
            }
            const targetContent = contentMap.get(wrapper.targetContentId);
            if (targetContent) {
                this.applyActionToContent(wrapper, targetContent);
                appliedActions.push(wrapper);
            }
            else {
                orphanedActions.push(wrapper);
            }
        }
        return { appliedActions, orphanedActions };
    }
}
/** Convenience helper to extract consolidated content items from pre-tokenized segments. */
export function extractConsolidatedMessageContentsFromSegments(segments) {
    const consolidator = new ProtocolContentConsolidator_Class();
    return consolidator.extractContentsFromSegments(segments);
}
/** Convenience helper to extract consolidated content items from raw markdown stream output. */
export function extractConsolidatedMessageContents(streamOutput) {
    const consolidator = new ProtocolContentConsolidator_Class();
    return consolidator.extractContents(streamOutput);
}
function ProtocolContentConsolidator_createEmptyStats() {
    return {
        messagesProcessed: 0,
        contentItemsRaw: 0,
        contentItemsConsolidated: 0,
        actionWrappersFound: 0,
    };
}
function ProtocolContentConsolidator_createResult(options) {
    return {
        contents: [],
        appliedActions: [],
        orphanedActions: [],
        stats: options.stats,
    };
}
function ProtocolContentConsolidator_getProtocolMessage(value) {
    const record = asRecord(value);
    if (!record || !Array.isArray(record["message_contents"]))
        return undefined;
    const messageContents = record["message_contents"].filter(ProtocolContentConsolidator_isContentItem);
    return {
        ...record,
        message_contents: messageContents,
    };
}
function ProtocolContentConsolidator_isContentItem(value) {
    const record = asRecord(value);
    return (record !== undefined &&
        typeof record["content_id"] === "string" &&
        typeof record["content_type"] === "string" &&
        (record["content_data"] === undefined || isRecord(record["content_data"])));
}
function ProtocolContentConsolidator_isSegmentArray(value) {
    return (Array.isArray(value) &&
        value.every((item) => isRecord(item) && typeof item["type"] === "string"));
}
//# sourceMappingURL=content-consolidator.js.map