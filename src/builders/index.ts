/**
 * Pure protocol message and content builders.
 * Accept option objects, return JSON-serializable protocol values.
 */

import type { CommunicationProtocol_AppAction } from "../types/app.js";
import type {
  CanvasContent,
  CommunicationProtocol_CanvasAction,
} from "../types/canvas.js";
import type {
  CommunicationProtocol_ChatAction,
  CommunicationProtocol_WaitForQueuesActionData,
} from "../types/chat.js";
import type { ProtocolStreamingOptions } from "../types/common.js";
import type {
  ProtocolChatContent,
  ProtocolChatMessage,
} from "../wire/types.js";
import type {
  CommunicationProtocol_SendTextMessageActionOptions,
  CommunicationProtocol_UpdatePanelActionOptions,
  CommunicationProtocol_UpdateProgressBarActionOptions,
} from "../options/action-options.js";
import type { CommunicationProtocol_ActionWrapperContentOptions } from "../options/content-options.js";
import { CommunicationProtocol_SendTextMessageActionBuilder } from "./actions/chat/send-text-message.js";
import { CommunicationProtocol_UpdatePanelActionBuilder } from "./actions/chat/update-panel.js";
import { CommunicationProtocol_UpdateProgressBarActionBuilder } from "./actions/chat/update-progress-bar.js";
import { CommunicationProtocol_ActionWrapperContentBuilder } from "./content/action-wrapper.js";

export { ProtocolIdUtils } from "./protocol-id-utils.js";
export type {
  ProtocolIdUtils_ActionIdResolutionOptions,
  ProtocolIdUtils_BaseIdResolutionOptions,
  ProtocolIdUtils_ContentIdResolutionOptions,
  ProtocolIdUtils_LogMetadata,
  ProtocolIdUtils_MessageLike,
  ProtocolIdUtils_SequenceManagerLogger,
  ProtocolIdUtils_SequenceManagerOptions,
} from "./protocol-id-utils.js";
export { ProtocolIdUtils_SequenceManager } from "./protocol-id-utils.js";

export interface BuildChatMessageOptions {
  message_id: string;
  message_role: "USER" | "ASSISTANT";
  message_contents: ProtocolChatContent[];
  debug?: boolean;
}

/** Build a canonical CHAT_MESSAGE envelope. */
export function buildProtocolChatMessage(
  options: BuildChatMessageOptions,
): ProtocolChatMessage {
  return {
    message_id: options.message_id,
    message_type: "CHAT_MESSAGE",
    message_role: options.message_role,
    message_target: "CHAT",
    message_contents: options.message_contents,
    ...(options.debug === true ? { debug: true } : {}),
  };
}

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
export function buildProtocolMarkdownContent(
  options: BuildMarkdownContentOptions,
): ProtocolChatContent {
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
export function buildProtocolActionWrapperContent(
  options: CommunicationProtocol_ActionWrapperContentOptions,
): ProtocolChatContent {
  return new CommunicationProtocol_ActionWrapperContentBuilder(options).build();
}

/** Build a canonical CHAT_ACTION_SEND_TEXT_MESSAGE instruction. */
export function buildProtocolChatSendTextMessageAction(
  options: CommunicationProtocol_SendTextMessageActionOptions,
): CommunicationProtocol_ChatAction {
  return new CommunicationProtocol_SendTextMessageActionBuilder(options).build();
}

/** Build a canonical CHAT_ACTION_UPDATE_PANEL instruction. */
export function buildProtocolChatUpdatePanelAction(
  options: CommunicationProtocol_UpdatePanelActionOptions,
): CommunicationProtocol_ChatAction {
  return new CommunicationProtocol_UpdatePanelActionBuilder(options).build();
}

/** Build a canonical CHAT_ACTION_UPDATE_PROGRESS_BAR instruction. */
export function buildProtocolChatUpdateProgressBarAction(
  options: CommunicationProtocol_UpdateProgressBarActionOptions,
): CommunicationProtocol_ChatAction {
  return new CommunicationProtocol_UpdateProgressBarActionBuilder(options).build();
}

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
export function buildProtocolCanvasOpenAction(
  options: BuildProtocolCanvasOpenActionOptions,
): CommunicationProtocol_CanvasAction {
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

export interface BuildProtocolCanvasUpdateActionOptions {
  action_id: string;
  canvas_id: string;
  canvas_title_label?: string;
  canvas_title_href?: string;
  canvas_contents?: CanvasContent[];
  canvas_content_id?: string;
  canvas_operation?:
    | "SET_CONTENTS"
    | "APPEND_CONTENT"
    | "MODIFY_CONTENT"
    | "REMOVE_CONTENT";
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
export function buildProtocolCanvasUpdateAction(
  options: BuildProtocolCanvasUpdateActionOptions,
): CommunicationProtocol_CanvasAction {
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

export interface BuildProtocolCanvasCloseActionOptions {
  action_id: string;
  canvas_id: string;
}

/** Build a canonical CANVAS_ACTION_CLOSE instruction. */
export function buildProtocolCanvasCloseAction(
  options: BuildProtocolCanvasCloseActionOptions,
): CommunicationProtocol_CanvasAction {
  return {
    action_id: options.action_id,
    action_type: "CANVAS_ACTION_CLOSE",
    action_data: {
      target: "CANVAS",
      canvas_id: options.canvas_id,
    },
  };
}

export interface BuildProtocolChatActionOptions {
  action_id: string;
}

/** Build a canonical CHAT_ACTION_BEGIN_SIMULATED_TURN instruction. */
export function buildProtocolChatBeginSimulatedTurnAction(
  options: BuildProtocolChatActionOptions,
): CommunicationProtocol_ChatAction {
  return {
    action_id: options.action_id,
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN",
    action_data: {
      target: "CHAT",
    },
  };
}

/** Build a canonical CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE instruction. */
export function buildProtocolChatCompleteContentSequenceAction(
  options: BuildProtocolChatActionOptions,
): CommunicationProtocol_ChatAction {
  return {
    action_id: options.action_id,
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
    action_data: {
      target: "CHAT",
    },
  };
}

export interface BuildProtocolChatWaitForQueuesActionOptions
  extends Omit<CommunicationProtocol_WaitForQueuesActionData, "target"> {
  action_id: string;
}

/** Build a canonical CHAT_ACTION_WAIT_FOR_QUEUES instruction. */
export function buildProtocolChatWaitForQueuesAction(
  options: BuildProtocolChatWaitForQueuesActionOptions,
): CommunicationProtocol_ChatAction {
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

export interface BuildProtocolAppWaitForUserInputActionOptions {
  action_id: string;
  focus_target?: "CHAT_INPUT" | "CANVAS" | "NONE";
}

/** Build a canonical APP_ACTION_WAIT_FOR_USER_INPUT instruction. */
export function buildProtocolAppWaitForUserInputAction(
  options: BuildProtocolAppWaitForUserInputActionOptions,
): CommunicationProtocol_AppAction {
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
export function buildProtocolAppThreadListRefreshAction(
  options: BuildProtocolChatActionOptions,
): CommunicationProtocol_AppAction {
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
