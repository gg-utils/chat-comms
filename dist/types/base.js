/**
 * @fileoverview Base protocol envelopes for MESSAGE, CONTENT, and ACTION shared across chat, canvas, and app surfaces.
 *
 * Flow: foundational interfaces -> specialized types -> builders and validators in streaming runtimes.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_BaseMessage } from "./base.js";
 *
 * const envelope: Pick<CommunicationProtocol_BaseMessage, "message_id" | "message_type" | "message_target"> = {
 *   message_id: "msg-example-1",
 *   message_type: "CHAT_MESSAGE",
 *   message_target: "CHAT",
 * };
 * void envelope;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE base structure spec.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=base.js.map