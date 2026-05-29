/**
 * @fileoverview Barrel exporting the chat message orchestrator used to assemble multi-content CHAT_MESSAGE payloads.
 *
 * Prefer the facade in `communication-protocol/index.ts` for one-shot helpers; import from here when extending the fluent API.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ChatMessageBuilder } from "./index";
 *
 * void CommunicationProtocol_ChatMessageBuilder;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
// ============================================================================
// Message Builders
// ============================================================================
export { CommunicationProtocol_ChatMessageBuilder } from "./chat-message.js";
//# sourceMappingURL=index.js.map