/**
 * @fileoverview Canvas workspace content and actions for secondary rich layouts alongside chat.
 *
 * Flow: discriminated `CanvasContent` trees -> `CANVAS_ACTION_*` updates -> client canvas renderer.
 *
 * @example
 * ```typescript
 * import type { CanvasContent } from "./canvas.js";
 *
 * declare const section: CanvasContent;
 * void section;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT specification.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { MarkdownStyle, ProtocolStreamingOptions, SectionStyle } from "./common.js";
import type { CommunicationProtocol_SpecializedAction, CommunicationProtocol_SpecializedContent } from "./specialized.js";
/**
 * Specific canvas content categories supported by the protocol
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_MARKDOWN.md - Markdown content
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_SECTION.md - Section content
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_HTML.md - HTML content (raw)
 */
export type CanvasContentType = "CANVAS_CONTENT_MARKDOWN" | "CANVAS_CONTENT_SECTION" | "CANVAS_CONTENT_HTML";
/** Canvas-specific action instruction types */
export type CanvasActionType = "CANVAS_ACTION_OPEN" | "CANVAS_ACTION_CLOSE" | "CANVAS_ACTION_UPDATE";
/** Canvas update operation identifiers */
export type CanvasUpdateOperation = "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT";
/**
 * Modification types for modify_contents operations.
 * - REPLACE: Completely replace the target content with new content
 * - UPDATE_PROPERTIES: Update specific properties without replacing entire content
 * - APPEND_TO_CONTENT: Add new content to the end of existing content
 * - REVEAL: Progressively reveal content that was previously hidden or collapsed
 */
export type CanvasModificationType = "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
/** Allowed action targets for canvas instructions */
export type CanvasActionTarget = "CANVAS";
/** Shape of the canvas-focused action payload */
export interface CommunicationProtocol_CanvasActionData {
    /** Must be "CANVAS" for canvas actions */
    target: CanvasActionTarget;
    /** Identifier for specific canvas document being targeted (optional for some actions) */
    canvas_id?: string;
    canvas_title_label?: string;
    /** Optional URL that makes the canvas title clickable, opening the URL when clicked */
    canvas_title_href?: string;
    /** Optional state indicator for the canvas shell. */
    canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS";
    /** Optional icon token or URL shown by consumers next to the canvas title. */
    canvas_icon?: string;
    /** Initial contents supplied by CANVAS_ACTION_OPEN. */
    canvas_initial_contents?: CanvasContent[];
    /** Additional canvas action-specific parameters */
    canvas_operation?: CanvasUpdateOperation;
    /** Full replacement contents supplied by CANVAS_ACTION_UPDATE. */
    canvas_contents?: CanvasContent[];
    /** Target content ID for modify/remove style update operations. */
    canvas_content_id?: string;
    /**
     * When true, signals the frontend to scroll to the top of the canvas after
     * this action completes. Typically used on the final reveal action in a
     * sequential reveal flow.
     */
    scroll_to_top_after_finish?: boolean;
    append_contents?: {
        canvas_insert_position: "TOP" | "BOTTOM";
        contents: CanvasContent[];
    };
    modify_contents?: {
        target_content_id: string;
        modification_type: CanvasModificationType;
        new_content_data: CanvasContentData;
        /**
         * Streaming options for REVEAL modification type.
         * Controls how content is progressively revealed with timing parameters.
         * @optional - Only applicable when modification_type is "REVEAL"
         */
        streaming_options?: ProtocolStreamingOptions;
    };
    /** Optional content IDs to remove from the current canvas document. */
    remove_contents?: {
        target_content_ids: string[];
    };
}
/**
 * CANVAS_CONTENT interface - specialized content for canvas workspace
 *
 * General type representing any piece of content that can be displayed within
 * the Canvas interface. The Canvas serves as a secondary workspace for presenting
 * detailed information, rich media, or interactive elements.
 *
 * Multiple CANVAS_CONTENT objects can be arranged within a canvas, often managed
 * by CANVAS_ACTIONs for dynamic content updates.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_MARKDOWN.md - authoritative payload layout for markdown source and MarkdownStyle knobs in canvas panels.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_SECTION.md - authoritative payload layout for section chrome, collapse state, and nested CanvasContent trees.
 *
 * @interface CanvasContent
 * @extends CommunicationProtocol_SpecializedContent
 * @todo Implementation needed for canvas content builders and utilities
 */
/** Keys omitted from the specialized content base when building canvas content types. */
type CanvasContentOmittedKeys = "content_type" | "content_data" | "content_queue";
/** Canvas content block carrying raw HTML rendered inside the canvas workspace. */
export interface CommunicationProtocol_CanvasHtmlContent extends Omit<CommunicationProtocol_SpecializedContent, CanvasContentOmittedKeys> {
    content_type: "CANVAS_CONTENT_HTML";
    content_data: CommunicationProtocol_CanvasHtmlContentData;
}
/** Canvas content block carrying markdown text rendered inside the canvas workspace. */
export interface CommunicationProtocol_CanvasMarkdownContent extends Omit<CommunicationProtocol_SpecializedContent, CanvasContentOmittedKeys> {
    content_type: "CANVAS_CONTENT_MARKDOWN";
    content_data: CommunicationProtocol_CanvasMarkdownContentData;
}
/** Canvas content block that groups nested `CanvasContent` items under a collapsible section. */
export interface CommunicationProtocol_CanvasSectionContent extends Omit<CommunicationProtocol_SpecializedContent, CanvasContentOmittedKeys> {
    content_type: "CANVAS_CONTENT_SECTION";
    content_data: CommunicationProtocol_CanvasSectionContentData;
}
/** Discriminated union of all supported canvas content variants; exhaustive for type narrowing. */
export type CanvasContent = CommunicationProtocol_CanvasHtmlContent | CommunicationProtocol_CanvasMarkdownContent | CommunicationProtocol_CanvasSectionContent;
/**
 * Optional table-of-contents and extension metadata shared by all canvas `content_data` payloads.
 *
 * @remarks `section_data` is intentionally `unknown` so specialized renderers can attach
 * forward-compatible extension blobs without widening the primary canvas contract.
 */
interface CommunicationProtocol_CanvasContentDataBase<SectionData = unknown> {
    toc_label?: string | undefined;
    toc_key?: string | undefined;
    section_data?: SectionData | undefined;
}
/** Data payload for a `CANVAS_CONTENT_MARKDOWN` block: the markdown source and optional style. */
export interface CommunicationProtocol_CanvasMarkdownContentData<SectionData = unknown> extends CommunicationProtocol_CanvasContentDataBase<SectionData> {
    markdown: string;
    markdown_style?: MarkdownStyle | undefined;
}
/** Data payload for a `CANVAS_CONTENT_SECTION` block: title, collapse state, and nested contents. */
export interface CommunicationProtocol_CanvasSectionContentData<SectionData = unknown> extends CommunicationProtocol_CanvasContentDataBase<SectionData> {
    section_title: string;
    section_collapsed?: boolean | undefined;
    section_style?: SectionStyle | undefined;
    section_contents: CanvasContent[];
}
/** Data payload for a `CANVAS_CONTENT_HTML` block: raw HTML string to embed in the canvas. */
export interface CommunicationProtocol_CanvasHtmlContentData<SectionData = unknown> extends CommunicationProtocol_CanvasContentDataBase<SectionData> {
    html: string;
}
/** Discriminated union of the three canvas content data payload types. */
export type CanvasContentData = CommunicationProtocol_CanvasMarkdownContentData | CommunicationProtocol_CanvasSectionContentData | CommunicationProtocol_CanvasHtmlContentData;
/**
 * CANVAS_ACTION interface - specialized actions for canvas workspace
 *
 * General type representing instructions for actions to be performed within or
 * related to the Canvas interface. Used to control canvas state and content,
 * such as opening/closing canvas, setting title, or adding/removing content.
 *
 * CANVAS_ACTIONs can be triggered by user interactions or directly by the Assistant
 * to manage canvas content dynamically.
 *
 * @remarks `canvas_operation` and nested modify/append payloads must stay consistent with `action_type`; streaming options apply only to REVEAL flows.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_OPEN.md - wire contract for presenting or focusing the canvas workspace and title affordances.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_CLOSE.md - wire contract for dismissing or hiding the canvas workspace from the client surface.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_UPDATE.md - wire contract for set, append, modify, and remove operations on canvas document content.
 *
 * @interface CommunicationProtocol_CanvasAction
 * @extends CommunicationProtocol_SpecializedAction
 * @todo Implementation needed for canvas action builders and utilities
 */
export interface CommunicationProtocol_CanvasAction extends CommunicationProtocol_SpecializedAction {
    /** Specific canvas action type - determines action_data structure */
    action_type: CanvasActionType;
    /** Action data with canvas-specific target and document ID */
    action_data: CommunicationProtocol_CanvasActionData;
}
export {};
//# sourceMappingURL=canvas.d.ts.map