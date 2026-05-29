/**
 * @fileoverview Builds CHAT_CONTENT_ACTION_WRAPPER payloads that embed a resolved chat, canvas, or app action inside chat content.
 *
 * Used when an action must ride alongside streamed content so clients execute it without a separate top-level action slot.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_SendTextMessageActionBuilder } from "../actions/chat/send-text-message";
 * import { CommunicationProtocol_ActionWrapperContentBuilder } from "./action-wrapper.js";
 *
 * const inner = new CommunicationProtocol_SendTextMessageActionBuilder({
 *   autoId: "inner",
 *   text: "Continue",
 *   message_id: "msg-1",
 * }).build();
 *
 * const content = new CommunicationProtocol_ActionWrapperContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "wrap",
 *   action: inner,
 *   message_id: "msg-1",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTION_WRAPPER.md - action-wrapper contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_ActionWrapperContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { ContentWidth } from "../../types/common.js";
import type { AllAction } from "../../types/unions.js";
/**
 * Fluent builder for CHAT_CONTENT_ACTION_WRAPPER with auto-ID support.
 *
 * @remarks
 * Stores the wrapped `AllAction` on `content_data`; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ActionWrapperContentBuilder({ autoId: "w", action: innerAction, message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_ActionWrapperContentBuilder {
    private content;
    /**
     * Initialize the action wrapper content builder
     *
     * @param options - Configuration options for the action wrapper content
     */
    constructor(options: CommunicationProtocol_ActionWrapperContentOptions);
    /**
     * Set the action to wrap
     *
     * @param action - Action to wrap (supports CommunicationProtocol_ChatAction, CommunicationProtocol_CanvasAction, CommunicationProtocol_AppAction)
     * @returns This builder instance for method chaining
     */
    action(action: AllAction): CommunicationProtocol_ActionWrapperContentBuilder;
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width: ContentWidth): CommunicationProtocol_ActionWrapperContentBuilder;
    /**
     * Get the wrapped action
     *
     * @returns The currently wrapped action
     */
    getAction(): AllAction;
    /**
     * Get the action type of the wrapped action
     *
     * @returns The action type string
     */
    getActionType(): string;
    /**
     * Get the action ID of the wrapped action
     *
     * @returns The action ID string
     */
    getActionId(): string;
    /**
     * Get the target of the wrapped action
     *
     * @returns The action target string
     */
    getActionTarget(): string;
    /**
     * Check if the wrapped action is a chat action
     *
     * @returns True if the action targets CHAT
     */
    isChatAction(): boolean;
    /**
     * Check if the wrapped action is a canvas action
     *
     * @returns True if the action targets CANVAS
     */
    isCanvasAction(): boolean;
    /**
     * Check if the wrapped action is an app action
     *
     * @returns True if the action targets APP
     */
    isAppAction(): boolean;
    /**
     * Check if the wrapped action is a progress bar update action
     *
     * @returns True if the action is CHAT_ACTION_UPDATE_PROGRESS_BAR
     */
    isProgressBarUpdate(): boolean;
    /**
     * Check if the wrapped action is a button update action
     *
     * @returns True if the action is CHAT_ACTION_UPDATE_BUTTON
     */
    isButtonUpdate(): boolean;
    /**
     * Check if the wrapped action is a panel update action
     *
     * @returns True if the action is CHAT_ACTION_UPDATE_PANEL
     */
    isPanelUpdate(): boolean;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=action-wrapper.d.ts.map