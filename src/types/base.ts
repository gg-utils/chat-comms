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

import type { ContentWidth } from "./common.js";

/**
 * Base MESSAGE interface - foundational structure for all message types
 *
 * Represents a generic container for information exchanged between entities
 * (User, Assistant, System) within the communication protocol. All messages
 * share this common structure to identify them, define their type, and specify
 * their intended target or context.
 *
 * This base type serves as the parent for specialized message types like CHAT_MESSAGE.
 * The message_contents structure varies based on the specific message_type.
 *
 * @remarks `message_type` and `message_target` select the consumer parser; keep ids stable for correlation across turns.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE Base Structure
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Implementation
 *
 * @interface CommunicationProtocol_BaseMessage
 */
export interface CommunicationProtocol_BaseMessage {
  /**
   * Debug flag for development and troubleshooting
   * Only included in JSON serialization when true to keep protocol lean
   * @optional
   */
  debug?: boolean;

  /**
   * Unique identifier for this specific message instance
   * Crucial for tracking, referencing, and correlating messages with other events
   * @required
   */
  message_id: string;

  /**
   * Defines the specific type of message (e.g., "CHAT_MESSAGE")
   * Determines the expected structure and purpose of the message
   * @required
   */
  message_type: string;

  /**
   * Indicates the originator or role associated with the message
   * Common values: "USER", "ASSISTANT", "SYSTEM"
   * @optional - not universal across all conceivable message types
   */
  message_role?: string;

  /**
   * Specifies the primary interface, system, or context for this message
   * Common values: "CHAT", "CANVAS", "APP"
   * Helps in routing and processing the message correctly
   * @required
   */
  message_target: string;

  /**
   * The payload or content of the message
   * Structure is highly dependent on the message_type
   * For CHAT_MESSAGE, this is an array of CHAT_CONTENT objects
   * @optional - structure depends on message_type
   */
  message_contents?: unknown[];
}

/**
 * Base CONTENT interface - foundational structure for all content types
 *
 * Represents a generic unit of information or interactive element within messages.
 * Serves as the base type for specialized content categories like CHAT_CONTENT
 * and CANVAS_CONTENT.
 *
 * All content objects share this common structure to identify them and encapsulate
 * their specific data. The content_type field dictates the nature of the content
 * and the expected structure of content_data.
 *
 * @remarks `content_queue` orders work inside a turn; delays apply after the item finishes within its queue.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/CONTENT.md - CONTENT Base Structure
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 *
 * @interface CommunicationProtocol_BaseContent
 */
export interface CommunicationProtocol_BaseContent {
  /** Unique identifier for this specific piece of content */
  content_id: string;
  /** Defines the specific type of content (e.g., "CHAT_CONTENT_MARKDOWN") */
  content_type: string;
  /** Width behavior for content rendering */
  content_width?: ContentWidth;
  /** Content-specific data object - structure depends on content_type */
  content_data: Record<string, unknown>;

  /**
   * Named queue for content processing. Content in the same queue is processed
   * sequentially, but different queues run in parallel.
   * @required
   * @see CommunicationProtocol_BaseContentOptions.content_queue
   */
  content_queue: string;

  /**
   * Optional delay in milliseconds to apply AFTER this content item
   * finishes processing, BEFORE the next item in the same queue begins.
   * Controls inter-item timing within a content queue.
   * @optional
   * @see CommunicationProtocol_BaseContentOptions.content_delay
   */
  content_delay?: number;
}

/**
 * Base ACTION interface - foundational structure for all action types
 *
 * Represents a generic instruction for an operation to be performed. Serves as
 * the base type for specialized action categories like APP_ACTION, CANVAS_ACTION,
 * and CHAT_ACTION.
 *
 * All actions share this common structure to identify them and carry necessary data.
 * The action_type field dictates the specific nature of the action and the expected
 * structure of action_data.
 *
 * @remarks `action_data.target` routes the instruction to APP, CANVAS, or CHAT handlers; keep `action_id` unique per outbound batch.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/ACTION.md - ACTION Base Structure
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/ - Specialized Action Types
 *
 * @interface CommunicationProtocol_BaseAction
 */
export interface CommunicationProtocol_BaseAction {
  /** Unique identifier for this specific action instance */
  action_id: string;
  /** Defines the specific type of action (e.g., "CHAT_ACTION_SEND_TEXT_MESSAGE") */
  action_type: string;
  /** Action-specific data object containing necessary parameters */
  action_data: {
    /** Primary interface or context for the action (e.g., "APP", "CANVAS", "CHAT") */
    target: string;
    /** Additional action-specific parameters */
    // [key: string]: unknown;
  };
}
