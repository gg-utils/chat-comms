/**
 * @fileoverview Chat-scoped messages, content blocks, and actions for the streaming communication protocol.
 *
 * Flow: discriminated chat shapes -> builders and stream writers -> markdown fenced-block embedding.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_ChatMessage } from "./chat.js";
 *
 * const message: Pick<CommunicationProtocol_ChatMessage, "message_type" | "message_role" | "message_target"> = {
 *   message_type: "CHAT_MESSAGE",
 *   message_role: "ASSISTANT",
 *   message_target: "CHAT",
 * };
 * void message;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE specification.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=chat.js.map