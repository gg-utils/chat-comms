/**
 * @fileoverview Builds CHAT_ACTION_SEND_TEXT_MESSAGE payloads for simulated user, assistant, or system chat text.
 *
 * Construct with initial `text` and optional `role`, apply fluent setters, then `build()` for an immutable `CommunicationProtocol_ChatAction`.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_SendTextMessageActionBuilder } from "./send-text-message.js";
 *
 * const action = new CommunicationProtocol_SendTextMessageActionBuilder({
 *   autoId: "user-ack",
 *   text: "Thanks — that works for me.",
 *   message_id: "msg-204",
 * })
 *   .role("USER")
 *   .build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md - action contract and fields
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

import type { CommunicationProtocol_SendTextMessageActionOptions } from "../../../options/action-options.js";
import type { CommunicationProtocol_ChatAction } from "../../../types/chat.js";
import type { MessageRole } from "../../../types/common.js";
import { ProtocolIdUtils } from "../../protocol-id-utils.js";

/**
 * Fluent builder for CHAT_ACTION_SEND_TEXT_MESSAGE with auto-ID support.
 *
 * @remarks
 * Resolves `action_id` via ProtocolIdUtils; `build()` returns a shallow copy of the internal action.
 *
 * @example
 * `new CommunicationProtocol_SendTextMessageActionBuilder({ autoId: "d", text: "Hi", message_id: "m" }).build()`
 */
export class CommunicationProtocol_SendTextMessageActionBuilder {
  private action: CommunicationProtocol_ChatAction;

  /**
   * Initialize the send text message action builder
   *
   * @param options - Configuration options for the send text message action
   */
  constructor(options: CommunicationProtocol_SendTextMessageActionOptions) {
    const { text, role = "USER" } = options;

    this.action = {
      action_id: ProtocolIdUtils.resolveActionId(options),
      action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE",
      action_data: {
        target: "CHAT",
        role,
        text,
      },
    };
  }

  /**
   * Set the role (USER, ASSISTANT, SYSTEM)
   *
   * @param role - Role of the simulated message sender
   * @returns This builder instance for method chaining
   */
  role(role: MessageRole): CommunicationProtocol_SendTextMessageActionBuilder {
    this.action.action_data.role = role;
    return this;
  }

  /**
   * Set the text content
   *
   * @param text - Text content to send as simulated input
   * @returns This builder instance for method chaining
   */
  text(text: string): CommunicationProtocol_SendTextMessageActionBuilder {
    this.action.action_data.text = text;
    return this;
  }

  /**
   * Get the current text content
   *
   * @returns Current text content
   */
  getText(): string {
    return this.action.action_data.text as string;
  }

  /**
   * Get the current role
   *
   * @returns Current message role
   */
  getRole(): string {
    return this.action.action_data.role as string;
  }

  /**
   * Check if this is a user message
   *
   * @returns True if role is USER
   */
  isUserMessage(): boolean {
    return this.action.action_data.role === "USER";
  }

  /**
   * Check if this is an assistant message
   *
   * @returns True if role is ASSISTANT
   */
  isAssistantMessage(): boolean {
    return this.action.action_data.role === "ASSISTANT";
  }

  /**
   * Check if this is a system message
   *
   * @returns True if role is SYSTEM
   */
  isSystemMessage(): boolean {
    return this.action.action_data.role === "SYSTEM";
  }

  /**
   * Build and return the final chat action object
   *
   * @returns Immutable copy of the configured chat action
   */
  build(): CommunicationProtocol_ChatAction {
    return { ...this.action };
  }
}
