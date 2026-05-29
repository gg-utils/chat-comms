/**
 * Loose compatibility classifiers for historical stream content.
 *
 * These do not enforce strict schema validity — they accept broader inputs
 * and emit warning-level diagnostics for drift or deprecated patterns.
 */

import type {
  AllAction,
  CommunicationProtocol_ChatMessage,
  CommunicationProtocol_UpdatePanelActionData,
} from "../types/index.js";
import type {
  AppAction,
  ChatMessage,
  ChooseActionableCardAction,
  CoreConsoleActionData,
} from "../runtime/chat/index.js";

export interface LooseClassificationResult {
  accepted: boolean;
  warnings: string[];
}

/** Union of JSON object shapes that can appear in protocol-bearing markdown streams. */
export type ProtocolJsonCandidate =
  | CommunicationProtocol_ChatMessage
  | AllAction
  | Record<string, unknown>;

/** Loose shape of a single content item before full protocol schema validation. */
export interface ProtocolStreamParser_ChatContentCandidate {
  content_id?: string;
  content_type: string;
  content_queue: string;
  content_data?: Record<string, unknown>;
}

/** Loose shape of a chat message candidate before full protocol schema validation. */
export interface ProtocolStreamParser_ChatMessageCandidate {
  message_id?: string;
  message_type?: string;
  message_contents?: unknown;
  debug?: boolean;
}

/** Chat message narrowed enough for historical stream parsers to iterate content items. */
export type ChatMessageWithContents =
  ProtocolStreamParser_ChatMessageCandidate & {
    message_contents: ProtocolStreamParser_ChatContentCandidate[];
  };

function isProtocolRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isKnownProtocolActionTarget(value: string): boolean {
  return value === "CHAT" || value === "CANVAS" || value === "APP";
}

function isKnownProtocolWireRole(
  value: unknown,
): value is "USER" | "ASSISTANT" {
  return value === "USER" || value === "ASSISTANT";
}

/**
 * Loose chat-content classifier shared by stream consumers that must accept
 * historical protocol payloads before stricter per-content schemas are applied.
 */
export function classifyProtocolChatContentLoose(
  value: unknown,
): LooseClassificationResult {
  if (!isProtocolRecord(value)) {
    return { accepted: false, warnings: ["content item is not an object"] };
  }

  if (
    value["content_id"] !== undefined &&
    typeof value["content_id"] !== "string"
  ) {
    return {
      accepted: false,
      warnings: ["content item has non-string content_id"],
    };
  }

  if (typeof value["content_type"] !== "string") {
    return { accepted: false, warnings: ["content item missing content_type"] };
  }

  if (
    typeof value["content_queue"] !== "string" ||
    value["content_queue"].trim().length === 0
  ) {
    return {
      accepted: false,
      warnings: ["content item has empty or missing content_queue"],
    };
  }

  if (
    value["content_data"] !== undefined &&
    !isProtocolRecord(value["content_data"])
  ) {
    return {
      accepted: false,
      warnings: ["content item has non-object content_data"],
    };
  }

  return { accepted: true, warnings: [] };
}

/** Type guard companion for `classifyProtocolChatContentLoose`. */
export function isProtocolChatContentCandidateLoose(
  value: unknown,
): value is ProtocolStreamParser_ChatContentCandidate {
  return classifyProtocolChatContentLoose(value).accepted;
}

/**
 * Loose message classifier: checks structural shape without enforcing
 * strict role/target/content-type membership.
 */
export function classifyProtocolMessageLoose(
  value: unknown,
): LooseClassificationResult {
  const warnings: string[] = [];

  if (!isProtocolRecord(value)) {
    return { accepted: false, warnings: ["Value is not an object"] };
  }

  if (!Array.isArray(value["message_contents"])) {
    return { accepted: false, warnings: ["message_contents is not an array"] };
  }

  // Allow empty contents with warning (historical compatibility)
  if (value["message_contents"].length === 0) {
    warnings.push("message_contents is empty (strict validation would reject)");
  }

  // Validate each content item has content_type and content_queue
  for (const item of value["message_contents"]) {
    const result = classifyProtocolChatContentLoose(item);
    if (!result.accepted) {
      return result;
    }
    warnings.push(...result.warnings);
  }

  return { accepted: true, warnings };
}

/** Type guard companion for `classifyProtocolMessageLoose`. */
export function isProtocolChatMessageLoose(
  value: unknown,
): value is ChatMessageWithContents & Record<string, unknown> {
  return classifyProtocolMessageLoose(value).accepted;
}

/**
 * Loose stream-envelope classifier for runtime consumers that need to accept
 * historical `content_id` omissions while still requiring a chat-message
 * envelope (`CHAT_MESSAGE`, `USER`/`ASSISTANT`, `CHAT`).
 */
export function classifyProtocolRuntimeChatMessageLoose(
  value: unknown,
): LooseClassificationResult {
  const messageResult = classifyProtocolMessageLoose(value);
  if (!messageResult.accepted) {
    return messageResult;
  }
  if (!isProtocolRecord(value)) {
    return { accepted: false, warnings: ["Value is not an object"] };
  }
  if (value["message_type"] !== "CHAT_MESSAGE") {
    return { accepted: false, warnings: ["message_type is not CHAT_MESSAGE"] };
  }
  if (!isKnownProtocolWireRole(value["message_role"])) {
    return {
      accepted: false,
      warnings: ["message_role is not USER or ASSISTANT"],
    };
  }
  if (value["message_target"] !== "CHAT") {
    return { accepted: false, warnings: ["message_target is not CHAT"] };
  }

  return messageResult;
}

/** Type guard companion for `classifyProtocolRuntimeChatMessageLoose`. */
export function isProtocolRuntimeChatMessageLoose(
  value: unknown,
): value is ChatMessage {
  return classifyProtocolRuntimeChatMessageLoose(value).accepted;
}

/**
 * Loose action classifier: checks structural shape without enforcing
 * strict action_type membership. Known targets are still checked when present.
 */
export function classifyProtocolActionLoose(
  value: unknown,
): LooseClassificationResult {
  if (!isProtocolRecord(value)) {
    return { accepted: false, warnings: ["Value is not an object"] };
  }

  if (
    typeof value["action_type"] !== "string" ||
    value["action_type"].trim().length === 0
  ) {
    return { accepted: false, warnings: ["Missing or non-string action_type"] };
  }

  if (!isProtocolRecord(value["action_data"])) {
    return { accepted: false, warnings: ["Missing or non-object action_data"] };
  }

  const target = value["action_data"]["target"];
  if (target !== undefined && typeof target !== "string") {
    return {
      accepted: false,
      warnings: ["action_data.target is not a string"],
    };
  }
  if (typeof target === "string" && !isKnownProtocolActionTarget(target)) {
    return {
      accepted: false,
      warnings: [`unknown action_data.target "${target}"`],
    };
  }

  return { accepted: true, warnings: [] };
}

/** Type guard companion for `classifyProtocolActionLoose`. */
export function isProtocolActionLoose(value: unknown): value is Record<
  string,
  unknown
> & {
  action_type: string;
  action_data: Record<string, unknown>;
} {
  return classifyProtocolActionLoose(value).accepted;
}

/** Narrows a loose protocol action candidate to chat-targeted actions only. */
export function isProtocolChatOnlyActionLoose(value: unknown): value is Record<
  string,
  unknown
> & {
  action_type: string;
  action_data: Record<string, unknown> & { target: "CHAT" };
} {
  if (!isProtocolActionLoose(value)) {
    return false;
  }
  const targetValue = value.action_data["target"];
  return targetValue === undefined || targetValue === "CHAT";
}

/** Narrows a loose protocol action candidate to panel update actions with a target content id. */
export function isProtocolPanelUpdateActionLoose(
  value: unknown,
): value is Record<string, unknown> & {
  action_type: "CHAT_ACTION_UPDATE_PANEL";
  action_data: CommunicationProtocol_UpdatePanelActionData;
} {
  if (!isProtocolActionLoose(value)) {
    return false;
  }
  if (value.action_type !== "CHAT_ACTION_UPDATE_PANEL") {
    return false;
  }
  return typeof value.action_data["panel_content_id"] === "string";
}

/** Narrows a loose protocol action candidate to actionable-card selection actions. */
export function isProtocolChooseActionableCardActionLoose(
  value: unknown,
): value is ChooseActionableCardAction {
  if (!isProtocolActionLoose(value)) {
    return false;
  }
  return (
    value.action_type === "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD" &&
    typeof value.action_data["selected_card_value"] === "string"
  );
}

/** Narrows a loose protocol action candidate to app-level core-console actions. */
export function isProtocolCoreConsoleActionLoose(
  value: unknown,
): value is AppAction & {
  action_type: "APP_ACTION_CORE_CONSOLE";
  action_data: CoreConsoleActionData;
} {
  if (!isProtocolActionLoose(value)) {
    return false;
  }

  const level = value.action_data["level"];
  return (
    value.action_type === "APP_ACTION_CORE_CONSOLE" &&
    (value.action_data["target"] === undefined ||
      value.action_data["target"] === "APP") &&
    (level === "debug" ||
      level === "info" ||
      level === "warn" ||
      level === "error") &&
    typeof value.action_data["message"] === "string"
  );
}
