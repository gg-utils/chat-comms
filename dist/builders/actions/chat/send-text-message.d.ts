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
/**
 * Fluent builder for CHAT_ACTION_SEND_TEXT_MESSAGE with auto-ID support.
 *
 * @remarks
 * Resolves `action_id` via ProtocolIdUtils; `build()` returns a shallow copy of the internal action.
 *
 * @example
 * `new CommunicationProtocol_SendTextMessageActionBuilder({ autoId: "d", text: "Hi", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_SendTextMessageActionBuilder {
    private action;
    /**
     * Initialize the send text message action builder
     *
     * @param options - Configuration options for the send text message action
     */
    constructor(options: CommunicationProtocol_SendTextMessageActionOptions);
    /**
     * Set the role (USER, ASSISTANT, SYSTEM)
     *
     * @param role - Role of the simulated message sender
     * @returns This builder instance for method chaining
     */
    role(role: MessageRole): CommunicationProtocol_SendTextMessageActionBuilder;
    /**
     * Set the text content
     *
     * @param text - Text content to send as simulated input
     * @returns This builder instance for method chaining
     */
    text(text: string): CommunicationProtocol_SendTextMessageActionBuilder;
    /**
     * Get the current text content
     *
     * @returns Current text content
     */
    getText(): string;
    /**
     * Get the current role
     *
     * @returns Current message role
     */
    getRole(): string;
    /**
     * Check if this is a user message
     *
     * @returns True if role is USER
     */
    isUserMessage(): boolean;
    /**
     * Check if this is an assistant message
     *
     * @returns True if role is ASSISTANT
     */
    isAssistantMessage(): boolean;
    /**
     * Check if this is a system message
     *
     * @returns True if role is SYSTEM
     */
    isSystemMessage(): boolean;
    /**
     * Build and return the final chat action object
     *
     * @returns Immutable copy of the configured chat action
     */
    build(): CommunicationProtocol_ChatAction;
}
//# sourceMappingURL=send-text-message.d.ts.map