/**
 * @fileoverview Protocol content consolidation for stream-summary and persistence consumers.
 *
 * The consolidator operates on pre-tokenized protocol segments so consuming applications can keep
 * their own markdown/LLM extraction policies while sharing protocol-owned content/action merging.
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run typecheck
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { type ProtocolStreamParser_Segment } from "./summary-parser.js";
/** Protocol content item structure from `message_contents` arrays. */
export interface ProtocolContentConsolidator_ProtocolContentItem {
    content_id: string;
    content_type: string;
    content_width?: string;
    content_data?: Record<string, unknown>;
    [key: string]: unknown;
}
/** Protocol message structure with message contents. */
export interface ProtocolContentConsolidator_ProtocolMessage {
    message_id?: string;
    message_type?: string;
    message_role?: string;
    message_target?: string;
    message_contents?: ProtocolContentConsolidator_ProtocolContentItem[];
    [key: string]: unknown;
}
/** Tracked action wrapper for deferred application. */
export interface ProtocolContentConsolidator_TrackedActionWrapper {
    targetContentId?: string;
    actionType: string;
    actionData: Record<string, unknown>;
    sourceContentId?: string;
}
/** Options for protocol content consolidation. */
export interface ProtocolContentConsolidator_Options {
    debug?: boolean;
    includeActionWrappers?: boolean;
}
/** Result from content consolidation. */
export interface ProtocolContentConsolidator_Consolidation_Result {
    contents: ProtocolContentConsolidator_ProtocolContentItem[];
    appliedActions: ProtocolContentConsolidator_TrackedActionWrapper[];
    orphanedActions: ProtocolContentConsolidator_TrackedActionWrapper[];
    stats: {
        messagesProcessed: number;
        contentItemsRaw: number;
        contentItemsConsolidated: number;
        actionWrappersFound: number;
    };
}
/** Walks protocol JSON segments to merge `message_contents` and apply deferred action wrappers. */
export declare class ProtocolContentConsolidator_Class {
    protected options: ProtocolContentConsolidator_Options;
    constructor(options?: ProtocolContentConsolidator_Options);
    /** Consolidates message contents from pre-tokenized stream segments. */
    consolidateSegments(segments: readonly ProtocolStreamParser_Segment[] | undefined): ProtocolContentConsolidator_Consolidation_Result;
    /** Consolidates message contents from JSON values without a segment extraction layer. */
    consolidateValues(values: readonly unknown[] | undefined): ProtocolContentConsolidator_Consolidation_Result;
    /** Consolidates message contents from raw markdown stream output. */
    consolidate(streamOutput: string | undefined): ProtocolContentConsolidator_Consolidation_Result;
    /** Extracts only consolidated content items from pre-tokenized stream segments. */
    extractContentsFromSegments(segments: readonly ProtocolStreamParser_Segment[] | undefined): ProtocolContentConsolidator_ProtocolContentItem[];
    /** Extracts only consolidated content items from raw markdown stream output. */
    extractContents(streamOutput: string | undefined): ProtocolContentConsolidator_ProtocolContentItem[];
    /** Applies action wrappers from external sources to existing content. */
    applyExternalActions(contents: ProtocolContentConsolidator_ProtocolContentItem[], actions: ProtocolContentConsolidator_TrackedActionWrapper[]): ProtocolContentConsolidator_ProtocolContentItem[];
    /** Processes a generic segment recursively. */
    protected processSegment(segment: ProtocolStreamParser_Segment, contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>, actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[], stats: ProtocolContentConsolidator_Consolidation_Result["stats"]): void;
    /** Processes a JSON value to extract protocol messages and content items. */
    protected processSegmentValue(value: unknown, contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>, actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[], stats: ProtocolContentConsolidator_Consolidation_Result["stats"]): void;
    /** Processes a single content item. */
    protected processContentItem(content: ProtocolContentConsolidator_ProtocolContentItem, contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>, actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[]): void;
    /** Extracts action wrapper data from a `CHAT_CONTENT_ACTION_WRAPPER` content item. */
    protected extractActionWrapper(content: ProtocolContentConsolidator_ProtocolContentItem): ProtocolContentConsolidator_TrackedActionWrapper | null;
    /** Resolves the target content id for an action based on its type and data. */
    protected resolveActionTargetContentId(actionType: string, actionData: Record<string, unknown> | undefined): string | undefined;
    /** Applies an action wrapper to a target content item. */
    protected applyActionToContent(action: ProtocolContentConsolidator_TrackedActionWrapper, targetContent: ProtocolContentConsolidator_ProtocolContentItem): void;
    /** Deep-merges objects with source values overriding target values; arrays are replaced. */
    protected deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown>;
    private applyTrackedActions;
}
/** Convenience helper to extract consolidated content items from pre-tokenized segments. */
export declare function extractConsolidatedMessageContentsFromSegments(segments: readonly ProtocolStreamParser_Segment[] | undefined): ProtocolContentConsolidator_ProtocolContentItem[];
/** Convenience helper to extract consolidated content items from raw markdown stream output. */
export declare function extractConsolidatedMessageContents(streamOutput: string | undefined): ProtocolContentConsolidator_ProtocolContentItem[];
//# sourceMappingURL=content-consolidator.d.ts.map