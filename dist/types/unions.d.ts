/**
 * @fileoverview Exhaustive unions of concrete messages, content blocks, and actions for narrowing across the protocol surface.
 *
 * Flow: concrete interfaces -> exported union aliases -> builder return types and client-side discriminated handling.
 *
 * @example
 * ```typescript
 * import type { AllContent, ProtocolActionType } from "./unions.js";
 *
 * declare const block: AllContent;
 * void block;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { AppActionType, CommunicationProtocol_AppAction } from "./app.js";
import type { CanvasActionType, CanvasContent, CommunicationProtocol_CanvasAction } from "./canvas.js";
import type { CommunicationProtocol_ChatAction, CommunicationProtocol_ChatContent, CommunicationProtocol_ChatMessage, ProtocolChatActionType } from "./chat.js";
/**
 * Union type for all supported content types
 *
 * Represents any valid content that can be used within the protocol.
 * Includes both implemented and placeholder content types.
 *
 * @type {AllContent}
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 */
export type AllContent = CommunicationProtocol_ChatContent | CanvasContent;
/**
 * Union type for all supported action types
 *
 * Represents any valid action that can be executed within the protocol.
 * Includes both implemented and placeholder action types.
 *
 * @type {AllAction}
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 */
export type AllAction = CommunicationProtocol_ChatAction | CommunicationProtocol_CanvasAction | CommunicationProtocol_AppAction;
/**
 * Aggregate union of all protocol action type discriminants across domains.
 *
 * Prefer domain-specific types (`ProtocolChatActionType`, `CanvasActionType`,
 * `AppActionType`) when narrowing within a single domain. Use `ProtocolActionType`
 * for aggregate validators and exhaustive switches across all protocol actions.
 *
 * @type {ProtocolActionType}
 */
export type ProtocolActionType = ProtocolChatActionType | CanvasActionType | AppActionType;
/**
 * Union type for all supported message types
 *
 * Represents any valid message that can be sent within the protocol.
 * Currently only includes CHAT_MESSAGE but prepared for future message types.
 *
 * @type {AllMessage}
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE Base Structure
 */
export type AllMessage = CommunicationProtocol_ChatMessage;
//# sourceMappingURL=unions.d.ts.map