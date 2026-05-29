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
export {};
//# sourceMappingURL=message-options.js.map