/**
 * @fileoverview Type-safe option objects for chat, canvas, and app action builders (send text, cards, canvas ops, send-error, etc.).
 *
 * Flow: action option interfaces -> protocol builder static factories -> built `CHAT_ACTION_*` payloads.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_SendTextMessageActionOptions } from "./action-options";
 *
 * const opts: Pick<CommunicationProtocol_SendTextMessageActionOptions, "text"> = { text: "Hello" };
 * void opts;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/options - Shared option exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=action-options.js.map