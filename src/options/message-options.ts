/**
 * @fileoverview Option objects for chat message builders and related message constructors.
 *
 * Flow: message options -> chat message builder -> serialized `CHAT_MESSAGE` envelopes.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_ChatMessageOptions } from "./message-options";
 *
 * const opts: Pick<CommunicationProtocol_ChatMessageOptions, "message_id"> = { message_id: "msg-1" };
 * void opts;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/options - Shared option exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

import type { CommunicationProtocol_ChatContent } from "../types/chat.js";
import type { MessageRole } from "../types/common.js";

// ============================================================================
// Chat Message Options
// ============================================================================

/**
 * Options for creating CHAT_MESSAGE messages
 *
 * Configures the fundamental unit of communication within a chat thread.
 * Each chat message can contain multiple content objects and control
 * flow instructions for optimal user experience.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_MESSAGE.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_ChatMessageOptions
 */
export interface CommunicationProtocol_ChatMessageOptions {
  /**
   * Unique identifier for this specific message instance
   * Must be unique within the conversation thread
   * @required
   */
  message_id: string;

  /**
   * Sender role indicating message origin
   * - USER: Human-originated message
   * - ASSISTANT: AI-originated message
   * - SYSTEM: Automated system message
   * @optional @default "ASSISTANT"
   */
  message_role?: MessageRole;

  /**
   * Array of CHAT_CONTENT objects that form the message body
   * Can be empty initially and populated via builder methods
   * @optional
   * @default [] When omitted, builders start with an empty contents list until fragments are appended.
   */
  contents?: CommunicationProtocol_ChatContent[];

  /**
   * Include debug information in the protocol message
   * Only included in JSON serialization when true to keep protocol lean
   *
   * @warning **PRODUCTION FILTERING**: When `debug: true`, the ENTIRE protocol block
   * is filtered out in production streams by `filterDebugProtocolBlocks` in
   * `chat-completion-streaming.ts`. This means the content will NOT be visible
   * to production users at all.
   *
   * Only set to `true` for content that is:
   * - Meant for development/debugging purposes only
   * - Intentionally hidden from production users
   * - Safe to completely omit from production responses
   *
   * @optional @default false
   */
  debug?: boolean;
}
