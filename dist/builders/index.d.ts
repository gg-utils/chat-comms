/**
 * Pure protocol message and content builders.
 * Accept option objects, return JSON-serializable protocol values.
 */
import type { CommunicationProtocol_AppAction } from "../types/app.js";
import type { CanvasContent, CommunicationProtocol_CanvasAction } from "../types/canvas.js";
import type { CommunicationProtocol_ChatAction, CommunicationProtocol_WaitForQueuesActionData } from "../types/chat.js";
import type { ProtocolStreamingOptions } from "../types/common.js";
import type { ProtocolChatContent, ProtocolChatMessage } from "../wire/types.js";
import type { CommunicationProtocol_SendTextMessageActionOptions, CommunicationProtocol_UpdatePanelActionOptions, CommunicationProtocol_UpdateProgressBarActionOptions } from "../options/action-options.js";
import type { CommunicationProtocol_ActionWrapperContentOptions } from "../options/content-options.js";
export { ProtocolIdUtils } from "./protocol-id-utils.js";
export type { ProtocolIdUtils_ActionIdResolutionOptions, ProtocolIdUtils_BaseIdResolutionOptions, ProtocolIdUtils_ContentIdResolutionOptions, ProtocolIdUtils_LogMetadata, ProtocolIdUtils_MessageLike, ProtocolIdUtils_SequenceManagerLogger, ProtocolIdUtils_SequenceManagerOptions, } from "./protocol-id-utils.js";
export { ProtocolIdUtils_SequenceManager } from "./protocol-id-utils.js";
export interface BuildChatMessageOptions {
    message_id: string;
    message_role: "USER" | "ASSISTANT";
    message_contents: ProtocolChatContent[];
    debug?: boolean;
}
/** Build a canonical CHAT_MESSAGE envelope. */
export declare function buildProtocolChatMessage(options: BuildChatMessageOptions): ProtocolChatMessage;
export interface BuildMarkdownContentOptions {
    content_id: string;
    content_queue: string;
    markdown: string;
    content_delay?: number;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL";
    content_group_id?: string;
    streaming_options?: ProtocolStreamingOptions;
}
/** Build a CHAT_CONTENT_MARKDOWN content item. */
export declare function buildProtocolMarkdownContent(options: BuildMarkdownContentOptions): ProtocolChatContent;
/** Build a canonical CHAT_CONTENT_ACTION_WRAPPER content item. */
export declare function buildProtocolActionWrapperContent(options: CommunicationProtocol_ActionWrapperContentOptions): ProtocolChatContent;
/** Build a canonical CHAT_ACTION_SEND_TEXT_MESSAGE instruction. */
export declare function buildProtocolChatSendTextMessageAction(options: CommunicationProtocol_SendTextMessageActionOptions): CommunicationProtocol_ChatAction;
/** Build a canonical CHAT_ACTION_UPDATE_PANEL instruction. */
export declare function buildProtocolChatUpdatePanelAction(options: CommunicationProtocol_UpdatePanelActionOptions): CommunicationProtocol_ChatAction;
/** Build a canonical CHAT_ACTION_UPDATE_PROGRESS_BAR instruction. */
export declare function buildProtocolChatUpdateProgressBarAction(options: CommunicationProtocol_UpdateProgressBarActionOptions): CommunicationProtocol_ChatAction;
export interface BuildProtocolCanvasOpenActionOptions {
    action_id: string;
    canvas_id?: string;
    canvas_title_label?: string;
    canvas_title_href?: string;
    canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS";
    canvas_icon?: string;
    canvas_initial_contents?: CanvasContent[];
}
/** Build a canonical CANVAS_ACTION_OPEN instruction. */
export declare function buildProtocolCanvasOpenAction(options: BuildProtocolCanvasOpenActionOptions): CommunicationProtocol_CanvasAction;
export interface BuildProtocolCanvasUpdateActionOptions {
    action_id: string;
    canvas_id: string;
    canvas_title_label?: string;
    canvas_title_href?: string;
    canvas_contents?: CanvasContent[];
    canvas_content_id?: string;
    canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT";
    append_contents?: {
        canvas_insert_position: "TOP" | "BOTTOM";
        contents: CanvasContent[];
    };
    modify_contents?: CommunicationProtocol_CanvasAction["action_data"]["modify_contents"];
    remove_contents?: {
        target_content_ids: string[];
    };
    scroll_to_top_after_finish?: boolean;
}
/** Build a canonical CANVAS_ACTION_UPDATE instruction. */
export declare function buildProtocolCanvasUpdateAction(options: BuildProtocolCanvasUpdateActionOptions): CommunicationProtocol_CanvasAction;
export interface BuildProtocolCanvasCloseActionOptions {
    action_id: string;
    canvas_id: string;
}
/** Build a canonical CANVAS_ACTION_CLOSE instruction. */
export declare function buildProtocolCanvasCloseAction(options: BuildProtocolCanvasCloseActionOptions): CommunicationProtocol_CanvasAction;
export interface BuildProtocolChatActionOptions {
    action_id: string;
}
/** Build a canonical CHAT_ACTION_BEGIN_SIMULATED_TURN instruction. */
export declare function buildProtocolChatBeginSimulatedTurnAction(options: BuildProtocolChatActionOptions): CommunicationProtocol_ChatAction;
/** Build a canonical CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE instruction. */
export declare function buildProtocolChatCompleteContentSequenceAction(options: BuildProtocolChatActionOptions): CommunicationProtocol_ChatAction;
export interface BuildProtocolChatWaitForQueuesActionOptions extends Omit<CommunicationProtocol_WaitForQueuesActionData, "target"> {
    action_id: string;
}
/** Build a canonical CHAT_ACTION_WAIT_FOR_QUEUES instruction. */
export declare function buildProtocolChatWaitForQueuesAction(options: BuildProtocolChatWaitForQueuesActionOptions): CommunicationProtocol_ChatAction;
export interface BuildProtocolAppWaitForUserInputActionOptions {
    action_id: string;
    focus_target?: "CHAT_INPUT" | "CANVAS" | "NONE";
}
/** Build a canonical APP_ACTION_WAIT_FOR_USER_INPUT instruction. */
export declare function buildProtocolAppWaitForUserInputAction(options: BuildProtocolAppWaitForUserInputActionOptions): CommunicationProtocol_AppAction;
/** Build a canonical APP_ACTION_THREAD_LIST_REFRESH instruction. */
export declare function buildProtocolAppThreadListRefreshAction(options: BuildProtocolChatActionOptions): CommunicationProtocol_AppAction;
export * from "./content/index.js";
export * from "./actions/chat/index.js";
export * from "./messages/index.js";
export { CommunicationProtocol_Builder } from "./communication-protocol-builder.js";
export { default as CommunicationProtocol_BuilderDefault } from "./communication-protocol-builder.js";
//# sourceMappingURL=index.d.ts.map