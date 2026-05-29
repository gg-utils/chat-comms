/**
 * Pure protocol message and content builders.
 * Accept option objects, return JSON-serializable protocol values.
 */
import { CommunicationProtocol_SendTextMessageActionBuilder } from "./actions/chat/send-text-message.js";
import { CommunicationProtocol_UpdatePanelActionBuilder } from "./actions/chat/update-panel.js";
import { CommunicationProtocol_UpdateProgressBarActionBuilder } from "./actions/chat/update-progress-bar.js";
import { CommunicationProtocol_ActionWrapperContentBuilder } from "./content/action-wrapper.js";
export { ProtocolIdUtils } from "./protocol-id-utils.js";
export { ProtocolIdUtils_SequenceManager } from "./protocol-id-utils.js";
/** Build a canonical CHAT_MESSAGE envelope. */
export function buildProtocolChatMessage(options) {
    return {
        message_id: options.message_id,
        message_type: "CHAT_MESSAGE",
        message_role: options.message_role,
        message_target: "CHAT",
        message_contents: options.message_contents,
        ...(options.debug === true ? { debug: true } : {}),
    };
}
/** Build a CHAT_CONTENT_MARKDOWN content item. */
export function buildProtocolMarkdownContent(options) {
    return {
        content_id: options.content_id,
        content_type: "CHAT_CONTENT_MARKDOWN",
        content_queue: options.content_queue,
        content_data: {
            markdown: options.markdown,
            ...(options.streaming_options !== undefined
                ? { streaming_options: options.streaming_options }
                : {}),
        },
        ...(options.content_delay !== undefined
            ? { content_delay: options.content_delay }
            : {}),
        ...(options.content_width !== undefined
            ? { content_width: options.content_width }
            : {}),
        ...(options.content_group_id !== undefined
            ? { content_group_id: options.content_group_id }
            : {}),
    };
}
/** Build a canonical CHAT_CONTENT_ACTION_WRAPPER content item. */
export function buildProtocolActionWrapperContent(options) {
    return new CommunicationProtocol_ActionWrapperContentBuilder(options).build();
}
/** Build a canonical CHAT_ACTION_SEND_TEXT_MESSAGE instruction. */
export function buildProtocolChatSendTextMessageAction(options) {
    return new CommunicationProtocol_SendTextMessageActionBuilder(options).build();
}
/** Build a canonical CHAT_ACTION_UPDATE_PANEL instruction. */
export function buildProtocolChatUpdatePanelAction(options) {
    return new CommunicationProtocol_UpdatePanelActionBuilder(options).build();
}
/** Build a canonical CHAT_ACTION_UPDATE_PROGRESS_BAR instruction. */
export function buildProtocolChatUpdateProgressBarAction(options) {
    return new CommunicationProtocol_UpdateProgressBarActionBuilder(options).build();
}
/** Build a canonical CANVAS_ACTION_OPEN instruction. */
export function buildProtocolCanvasOpenAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CANVAS_ACTION_OPEN",
        action_data: {
            target: "CANVAS",
            ...(options.canvas_id !== undefined
                ? { canvas_id: options.canvas_id }
                : {}),
            ...(options.canvas_title_label !== undefined
                ? { canvas_title_label: options.canvas_title_label }
                : {}),
            ...(options.canvas_title_href !== undefined
                ? { canvas_title_href: options.canvas_title_href }
                : {}),
            ...(options.canvas_state !== undefined
                ? { canvas_state: options.canvas_state }
                : {}),
            ...(options.canvas_icon !== undefined
                ? { canvas_icon: options.canvas_icon }
                : {}),
            ...(options.canvas_initial_contents !== undefined
                ? { canvas_initial_contents: options.canvas_initial_contents }
                : {}),
        },
    };
}
/** Build a canonical CANVAS_ACTION_UPDATE instruction. */
export function buildProtocolCanvasUpdateAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CANVAS_ACTION_UPDATE",
        action_data: {
            target: "CANVAS",
            canvas_id: options.canvas_id,
            ...(options.canvas_title_label !== undefined
                ? { canvas_title_label: options.canvas_title_label }
                : {}),
            ...(options.canvas_title_href !== undefined
                ? { canvas_title_href: options.canvas_title_href }
                : {}),
            ...(options.canvas_operation !== undefined
                ? { canvas_operation: options.canvas_operation }
                : {}),
            ...(options.canvas_contents !== undefined
                ? { canvas_contents: options.canvas_contents }
                : {}),
            ...(options.canvas_content_id !== undefined
                ? { canvas_content_id: options.canvas_content_id }
                : {}),
            ...(options.append_contents !== undefined
                ? { append_contents: options.append_contents }
                : {}),
            ...(options.modify_contents !== undefined
                ? { modify_contents: options.modify_contents }
                : {}),
            ...(options.remove_contents !== undefined
                ? { remove_contents: options.remove_contents }
                : {}),
            ...(options.scroll_to_top_after_finish !== undefined
                ? { scroll_to_top_after_finish: options.scroll_to_top_after_finish }
                : {}),
        },
    };
}
/** Build a canonical CANVAS_ACTION_CLOSE instruction. */
export function buildProtocolCanvasCloseAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CANVAS_ACTION_CLOSE",
        action_data: {
            target: "CANVAS",
            canvas_id: options.canvas_id,
        },
    };
}
/** Build a canonical CHAT_ACTION_BEGIN_SIMULATED_TURN instruction. */
export function buildProtocolChatBeginSimulatedTurnAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN",
        action_data: {
            target: "CHAT",
        },
    };
}
/** Build a canonical CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE instruction. */
export function buildProtocolChatCompleteContentSequenceAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
        action_data: {
            target: "CHAT",
        },
    };
}
/** Build a canonical CHAT_ACTION_WAIT_FOR_QUEUES instruction. */
export function buildProtocolChatWaitForQueuesAction(options) {
    return {
        action_id: options.action_id,
        action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
        action_data: {
            target: "CHAT",
            queue_names: options.queue_names,
            ...(options.wait_mode !== undefined
                ? { wait_mode: options.wait_mode }
                : {}),
            ...(options.content_ids !== undefined
                ? { content_ids: options.content_ids }
                : {}),
            ...(options.timeout_ms !== undefined
                ? { timeout_ms: options.timeout_ms }
                : {}),
            ...(options.on_timeout !== undefined
                ? { on_timeout: options.on_timeout }
                : {}),
        },
    };
}
/** Build a canonical APP_ACTION_WAIT_FOR_USER_INPUT instruction. */
export function buildProtocolAppWaitForUserInputAction(options) {
    return {
        action_id: options.action_id,
        action_type: "APP_ACTION_WAIT_FOR_USER_INPUT",
        action_data: {
            target: "APP",
            ...(options.focus_target !== undefined
                ? { focus_target: options.focus_target }
                : {}),
        },
    };
}
/** Build a canonical APP_ACTION_THREAD_LIST_REFRESH instruction. */
export function buildProtocolAppThreadListRefreshAction(options) {
    return {
        action_id: options.action_id,
        action_type: "APP_ACTION_THREAD_LIST_REFRESH",
        action_data: {
            target: "APP",
        },
    };
}
export * from "./content/index.js";
export * from "./actions/chat/index.js";
export * from "./messages/index.js";
export { CommunicationProtocol_Builder } from "./communication-protocol-builder.js";
export { default as CommunicationProtocol_BuilderDefault } from "./communication-protocol-builder.js";
//# sourceMappingURL=index.js.map