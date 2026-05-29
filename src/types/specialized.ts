/**
 * @fileoverview Intermediate specialized MESSAGE, CONTENT, and ACTION contracts between base envelopes and chat/canvas/app concrete types.
 *
 * Flow: `CommunicationProtocol_Specialized*` -> chat/canvas unions -> builder `build()` outputs.
 *
 * Naming: TypeScript identifiers still carry the `CommunicationProtocol_` prefix while markdown specs use ALL_CAPS headings; keep renames coordinated across this file, unions, and the protocol docs tree.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_SpecializedMessage } from "./specialized.js";
 *
 * declare const message: CommunicationProtocol_SpecializedMessage;
 * void message.message_type;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/README.md - Specialized structures overview.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

import type {
  CommunicationProtocol_BaseAction,
  CommunicationProtocol_BaseContent,
  CommunicationProtocol_BaseMessage,
} from "./base.js";

/**
 * MESSAGE specialized structure - template for specific message types
 *
 * This is a conceptual interface that represents the specialization of CommunicationProtocol_BaseMessage
 * for specific domains. Currently implemented as CHAT_MESSAGE for chat communication.
 * Future implementations may include CANVAS_MESSAGE for canvas-specific messages.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/README.md - Specialized Structures Overview
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Implementation
 *
 * @interface CommunicationProtocol_SpecializedMessage
 * @extends CommunicationProtocol_BaseMessage
 */
export interface CommunicationProtocol_SpecializedMessage
  extends CommunicationProtocol_BaseMessage {
  /** Specialized message type identifier */
  message_type: string;
  /** Message role indicating sender context */
  message_role?: string;
  /** Target interface for message delivery */
  message_target: string;
  /** Array of content objects specific to message type */
  message_contents?: unknown[];
}

/**
 * CONTENT specialized structure - template for specific content types
 *
 * This is a conceptual interface that represents the specialization of CommunicationProtocol_BaseContent
 * for specific domains. Currently implemented as CommunicationProtocol_ChatContent and CanvasContent.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 *
 * @interface CommunicationProtocol_SpecializedContent
 * @extends CommunicationProtocol_BaseContent
 */
export interface CommunicationProtocol_SpecializedContent
  extends CommunicationProtocol_BaseContent {
  /** Specialized content type identifier */
  content_type: string;
  /** Content-specific data structure - strongly typed based on content_type */
  content_data: Record<string, unknown>;
}

/**
 * ACTION specialized structure - template for specific action types
 *
 * This is a conceptual interface that represents the specialization of CommunicationProtocol_BaseAction
 * for specific domains. Currently implemented as CommunicationProtocol_ChatAction, CommunicationProtocol_CanvasAction, and CommunicationProtocol_AppAction.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 *
 * @interface CommunicationProtocol_SpecializedAction
 * @extends CommunicationProtocol_BaseAction
 */
export interface CommunicationProtocol_SpecializedAction extends CommunicationProtocol_BaseAction {
  /** Specialized action type identifier */
  action_type: string;
  /** Action-specific data with target context */
  action_data: {
    /** Target interface or system for the action */
    target: string;
    /** Additional action-specific parameters */
    // [key: string]: unknown;
  };
}
