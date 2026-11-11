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
import {
  asRecord,
  isRecord,
  type ProtocolStreamParser_Segment,
} from "./summary-parser.js";

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
  targetContentId?: string | undefined;
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
export class ProtocolContentConsolidator_Class {
  protected options: ProtocolContentConsolidator_Options;

  constructor(options: ProtocolContentConsolidator_Options = {}) {
    this.options = {
      debug: false,
      includeActionWrappers: false,
      ...options,
    };
  }

  /** Consolidates message contents from pre-tokenized stream segments. */
  consolidateSegments(
    segments: readonly ProtocolStreamParser_Segment[] | undefined,
  ): ProtocolContentConsolidator_Consolidation_Result {
    const stats = ProtocolContentConsolidator_createEmptyStats();

    if (!segments || segments.length === 0) {
      return ProtocolContentConsolidator_createResult({ stats });
    }

    const contentMap = new Map<
      string,
      ProtocolContentConsolidator_ProtocolContentItem
    >();
    const actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[] =
      [];

    for (const segment of segments) {
      this.processSegment(segment, contentMap, actionWrappers, stats);
    }

    stats.actionWrappersFound = actionWrappers.length;
    const { appliedActions, orphanedActions } = this.applyTrackedActions(
      actionWrappers,
      contentMap,
    );
    const contents = Array.from(contentMap.values());
    stats.contentItemsConsolidated = contents.length;

    if (this.options.debug) {
      console.log(
        "[ProtocolContentConsolidator_Class] Consolidation stats:",
        stats,
      );
      if (orphanedActions.length > 0) {
        console.log(
          "[ProtocolContentConsolidator_Class] Orphaned actions:",
          orphanedActions,
        );
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
  consolidateValues(
    values: readonly unknown[] | undefined,
  ): ProtocolContentConsolidator_Consolidation_Result {
    return this.consolidateSegments(
      values?.map((value) => ({ type: "json", content: value })),
    );
  }

  /** Consolidates message contents from raw markdown stream output. */
  consolidate(
    streamOutput: string | undefined,
  ): ProtocolContentConsolidator_Consolidation_Result {
    if (!streamOutput) {
      return this.consolidateSegments(undefined);
    }

    return this.consolidateSegments(
      extractProtocolStreamSegmentsFromMarkdown(streamOutput),
    );
  }

  /** Extracts only consolidated content items from pre-tokenized stream segments. */
  extractContentsFromSegments(
    segments: readonly ProtocolStreamParser_Segment[] | undefined,
  ): ProtocolContentConsolidator_ProtocolContentItem[] {
    return this.consolidateSegments(segments).contents;
  }

  /** Extracts only consolidated content items from raw markdown stream output. */
  extractContents(
    streamOutput: string | undefined,
  ): ProtocolContentConsolidator_ProtocolContentItem[] {
    return this.consolidate(streamOutput).contents;
  }

  /** Applies action wrappers from external sources to existing content. */
  applyExternalActions(
    contents: ProtocolContentConsolidator_ProtocolContentItem[],
    actions: ProtocolContentConsolidator_TrackedActionWrapper[],
  ): ProtocolContentConsolidator_ProtocolContentItem[] {
    const contentMap = new Map<
      string,
      ProtocolContentConsolidator_ProtocolContentItem
    >();
    for (const content of contents) {
      contentMap.set(content.content_id, { ...content });
    }

    for (const action of actions) {
      if (!action.targetContentId) continue;
      const targetContent = contentMap.get(action.targetContentId);
      if (targetContent) {
        this.applyActionToContent(action, targetContent);
      }
    }

    return Array.from(contentMap.values());
  }

  /** Processes a generic segment recursively. */
  protected processSegment(
    segment: ProtocolStreamParser_Segment,
    contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>,
    actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[],
    stats: ProtocolContentConsolidator_Consolidation_Result["stats"],
  ): void {
    if (segment.type === "json") {
      this.processSegmentValue(
        segment.content,
        contentMap,
        actionWrappers,
        stats,
      );
      return;
    }

    if (
      segment.type === "container" &&
      ProtocolContentConsolidator_isSegmentArray(segment.content)
    ) {
      for (const nestedSegment of segment.content) {
        this.processSegment(nestedSegment, contentMap, actionWrappers, stats);
      }
    }
  }

  /** Processes a JSON value to extract protocol messages and content items. */
  protected processSegmentValue(
    value: unknown,
    contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>,
    actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[],
    stats: ProtocolContentConsolidator_Consolidation_Result["stats"],
  ): void {
    if (Array.isArray(value)) {
      for (const item of value) {
        this.processSegmentValue(item, contentMap, actionWrappers, stats);
      }
      return;
    }

    const message = ProtocolContentConsolidator_getProtocolMessage(value);
    if (!message) return;

    stats.messagesProcessed += 1;
    for (const content of message.message_contents ?? []) {
      stats.contentItemsRaw += 1;
      this.processContentItem(content, contentMap, actionWrappers);
    }
  }

  /** Processes a single content item. */
  protected processContentItem(
    content: ProtocolContentConsolidator_ProtocolContentItem,
    contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>,
    actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[],
  ): void {
    if (content.content_type === "CHAT_CONTENT_ACTION_WRAPPER") {
      const actionWrapper = this.extractActionWrapper(content);
      if (actionWrapper) {
        actionWrappers.push(actionWrapper);
      }
      if (!this.options.includeActionWrappers) return;
    }

    const existingContent = contentMap.get(content.content_id);
    if (existingContent) {
      const merged = this.deepMerge(existingContent, content);
      if (ProtocolContentConsolidator_isContentItem(merged)) {
        contentMap.set(content.content_id, merged);
      }
    } else {
      contentMap.set(content.content_id, { ...content });
    }
  }

  /** Extracts action wrapper data from a `CHAT_CONTENT_ACTION_WRAPPER` content item. */
  protected extractActionWrapper(
    content: ProtocolContentConsolidator_ProtocolContentItem,
  ): ProtocolContentConsolidator_TrackedActionWrapper | null {
    const action = content.content_data?.["action"];
    if (!isProtocolActionLoose(action)) return null;

    const targetContentId = this.resolveActionTargetContentId(
      action.action_type,
      action.action_data,
    );

    return {
      targetContentId,
      actionType: action.action_type,
      actionData: action.action_data,
      sourceContentId: content.content_id,
    };
  }

  /** Resolves the target content id for an action based on its type and data. */
  protected resolveActionTargetContentId(
    actionType: string,
    actionData: Record<string, unknown> | undefined,
  ): string | undefined {
    if (!actionData) return undefined;

    const targetFieldsByActionType: Record<string, string[]> = {
      CHAT_ACTION_UPDATE_PROGRESS_BAR: ["progress_bar_content_id"],
      CHAT_ACTION_UPDATE_PANEL: ["panel_content_id"],
    };

    const targetFields = targetFieldsByActionType[actionType] || [];
    for (const field of targetFields) {
      const value = actionData[field];
      if (typeof value === "string") return value;
    }

    for (const field of ["target_content_id", "content_id"]) {
      const value = actionData[field];
      if (typeof value === "string") return value;
    }

    return undefined;
  }

  /** Applies an action wrapper to a target content item. */
  protected applyActionToContent(
    action: ProtocolContentConsolidator_TrackedActionWrapper,
    targetContent: ProtocolContentConsolidator_ProtocolContentItem,
  ): void {
    const existingData = asRecord(targetContent.content_data) ?? {};
    targetContent.content_data = this.deepMerge(
      existingData,
      action.actionData,
    );
  }

  /** Deep-merges objects with source values overriding target values; arrays are replaced. */
  protected deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = { ...target };

    for (const [key, sourceValue] of Object.entries(source)) {
      const targetValue = result[key];
      if (isRecord(sourceValue) && isRecord(targetValue)) {
        result[key] = this.deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue;
      }
    }

    return result;
  }

  private applyTrackedActions(
    actionWrappers: ProtocolContentConsolidator_TrackedActionWrapper[],
    contentMap: Map<string, ProtocolContentConsolidator_ProtocolContentItem>,
  ): {
    appliedActions: ProtocolContentConsolidator_TrackedActionWrapper[];
    orphanedActions: ProtocolContentConsolidator_TrackedActionWrapper[];
  } {
    const appliedActions: ProtocolContentConsolidator_TrackedActionWrapper[] =
      [];
    const orphanedActions: ProtocolContentConsolidator_TrackedActionWrapper[] =
      [];

    for (const wrapper of actionWrappers) {
      if (!wrapper.targetContentId) {
        orphanedActions.push(wrapper);
        continue;
      }
      const targetContent = contentMap.get(wrapper.targetContentId);
      if (targetContent) {
        this.applyActionToContent(wrapper, targetContent);
        appliedActions.push(wrapper);
      } else {
        orphanedActions.push(wrapper);
      }
    }

    return { appliedActions, orphanedActions };
  }
}

/** Convenience helper to extract consolidated content items from pre-tokenized segments. */
export function extractConsolidatedMessageContentsFromSegments(
  segments: readonly ProtocolStreamParser_Segment[] | undefined,
): ProtocolContentConsolidator_ProtocolContentItem[] {
  const consolidator = new ProtocolContentConsolidator_Class();
  return consolidator.extractContentsFromSegments(segments);
}

/** Convenience helper to extract consolidated content items from raw markdown stream output. */
export function extractConsolidatedMessageContents(
  streamOutput: string | undefined,
): ProtocolContentConsolidator_ProtocolContentItem[] {
  const consolidator = new ProtocolContentConsolidator_Class();
  return consolidator.extractContents(streamOutput);
}

function ProtocolContentConsolidator_createEmptyStats(): ProtocolContentConsolidator_Consolidation_Result["stats"] {
  return {
    messagesProcessed: 0,
    contentItemsRaw: 0,
    contentItemsConsolidated: 0,
    actionWrappersFound: 0,
  };
}

function ProtocolContentConsolidator_createResult(options: {
  stats: ProtocolContentConsolidator_Consolidation_Result["stats"];
}): ProtocolContentConsolidator_Consolidation_Result {
  return {
    contents: [],
    appliedActions: [],
    orphanedActions: [],
    stats: options.stats,
  };
}

function ProtocolContentConsolidator_getProtocolMessage(
  value: unknown,
): ProtocolContentConsolidator_ProtocolMessage | undefined {
  const record = asRecord(value);
  if (!record || !Array.isArray(record["message_contents"])) return undefined;

  const messageContents = record["message_contents"].filter(
    ProtocolContentConsolidator_isContentItem,
  );
  return {
    ...record,
    message_contents: messageContents,
  };
}

function ProtocolContentConsolidator_isContentItem(
  value: unknown,
): value is ProtocolContentConsolidator_ProtocolContentItem {
  const record = asRecord(value);
  return (
    record !== undefined &&
    typeof record["content_id"] === "string" &&
    typeof record["content_type"] === "string" &&
    (record["content_data"] === undefined || isRecord(record["content_data"]))
  );
}

function ProtocolContentConsolidator_isSegmentArray(
  value: unknown,
): value is ProtocolStreamParser_Segment[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isRecord(item) && typeof item["type"] === "string")
  );
}
