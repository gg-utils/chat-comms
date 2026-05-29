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

import type {
  CommunicationProtocol_FramerMotionAttributes,
  CommunicationProtocol_PanelEffect,
  CommunicationProtocol_PanelTransition,
  PanelBodyAspectRatio,
  PanelHeaderIcon,
} from "./animation.js";
import type {
  CanvasActionTarget,
  CanvasActionType,
  CanvasContent,
  CanvasContentData,
  CanvasModificationType,
  CanvasUpdateOperation,
} from "./canvas.js";
import type {
  ButtonStyle,
  ChatButtonState,
  MessageRole,
  PanelBodyContent,
  PanelBodyType,
  PanelVisibilityState,
  ProgressBarState,
  ProgressBarVisibilityState,
} from "./common.js";
import type {
  CommunicationProtocol_SpecializedContent,
  CommunicationProtocol_SpecializedMessage,
} from "./specialized.js";

/** Chat-specific message type identifier */
export type ChatMessageType = "CHAT_MESSAGE";

/**
 * Allowed targets for chat message delivery.
 *
 * Canonical chat envelopes use `message_target: "CHAT"` only. App and canvas
 * effects are expressed as wrapped app/canvas actions inside `CHAT_CONTENT_ACTION_WRAPPER`,
 * not as non-chat chat-message targets.
 */
export type ChatMessageTarget = "CHAT";

/** Supported chat content structures */
export type ChatContentType =
  | "CHAT_CONTENT_MARKDOWN"
  | "CHAT_CONTENT_BUTTON"
  | "CHAT_CONTENT_ACTIONABLE_CARDS"
  | "CHAT_CONTENT_ACTIONABLE_CHIPS"
  | "CHAT_CONTENT_ACTION_WRAPPER"
  | "CHAT_CONTENT_PROGRESS_BAR"
  | "CHAT_CONTENT_PANEL";

/**
 * Domain-specific chat action identifiers (chat-only, excluding canvas/app).
 *
 * For the aggregate union that includes all action types across domains,
 * use `ProtocolActionType` from `./unions`.
 */
export type ProtocolChatActionType =
  | "CHAT_ACTION_SEND_TEXT_MESSAGE"
  | "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD"
  | "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP"
  | "CHAT_ACTION_UPDATE_BUTTON"
  | "CHAT_ACTION_UPDATE_PROGRESS_BAR"
  | "CHAT_ACTION_WAIT_FOR_QUEUES"
  | "CHAT_ACTION_UPDATE_PANEL"
  | "CHAT_ACTION_BEGIN_SIMULATED_TURN"
  | "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";

/**
 * Chat action identifiers including delegated canvas actions.
 *
 * This aggregate type exists for backward compatibility. Prefer domain-specific
 * `ProtocolChatActionType` for chat-only actions and `ProtocolActionType` for
 * the full protocol action surface.
 */
export type ChatActionType = ProtocolChatActionType | CanvasActionType;

/** Valid targets for chat actions */
export type ChatActionTarget = "CHAT" | CanvasActionTarget;

/** Consolidated payload definition for chat and delegated canvas actions */
export interface CommunicationProtocol_ChatActionData {
  /** Target interface - "CHAT" for chat actions and "CANVAS" for canvas actions */
  target: ChatActionTarget;

  // Send Text Message Action properties
  role?: MessageRole;
  text?: string;

  // Choose Actionable Card Action properties
  actionable_cards_content_id?: string;
  selected_card_value?: string;
  selected_card_title?: string;
  selected_card_subtitle?: string;
  simulated_user_message_text?: string;

  // Choose Actionable Chip Action properties
  actionable_chips_content_id?: string;
  selected_chip_value?: string;
  selected_chip_text?: string;
  selected_chip_values?: string[];
  selected_chip_texts?: string[];
  chip_value?: string;
  chip_text?: string;

  // Update Button Action properties
  button_content_id?: string;
  button_text?: string;
  button_state?: ChatButtonState;
  button_style?: ButtonStyle;
  button_icon?: string;
  button_actions?: CommunicationProtocol_ChatAction[];
  button_updates?: {
    button_text?: string;
    button_icon?: string;
    button_style?: ButtonStyle;
    button_state?: ChatButtonState;
    button_actions?: CommunicationProtocol_ChatAction[];
  };

  // Update Progress Bar Action properties
  progress_bar_content_id?: string;
  progress_bar_state?: ProgressBarState;
  progress_bar_visibility?: ProgressBarVisibilityState;
  progress_bar_current_percentage?: number;
  progress_bar_current_animation_duration_ms?: number;
  progress_bar_next_goal_delay_ms?: number;
  progress_bar_next_goal_percentage?: number;
  progress_bar_next_goal_animation_duration_ms?: number;
  progress_bar_message?: string;
  progress_bar_icon?: string;
  content_id?: string;
  message?: string;

  // Wait for Queues Action properties
  /**
   * Named content queues to wait for (e.g., ["website", "reasoning"]).
   * Note: "main" is allowed but typically unnecessary.
   */
  queue_names?: string[];
  /**
   * Wait mode:
   * - "DRAIN": wait until queued content for those queues is fully processed.
   * - "IDLE": wait until queues are no longer actively processing.
   * - "CONTENT_IDS": wait until specific content IDs are processed.
   */
  wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS";
  /** Specific content IDs to wait for (used with wait_mode = "CONTENT_IDS"). */
  content_ids?: string[];
  /** Optional timeout in ms before applying on_timeout behavior. */
  timeout_ms?: number;
  /** Behavior when timeout is reached. */
  on_timeout?: "CONTINUE" | "ERROR";

  // Update Panel Action properties
  panel_content_id?: string;
  panel_header_icon?: PanelHeaderIcon;
  /** Favicon URL for website panels (captured from Firecrawl scrape metadata) */
  panel_header_favicon_url?: string;
  panel_header_title?: string;
  panel_header_description?: string;
  panel_visibility?: PanelVisibilityState;
  panel_body_type?: PanelBodyType;
  panel_body_aspect_ratio?: PanelBodyAspectRatio;
  panel_body_data?: PanelBodyContent;
  panel_transitions?: CommunicationProtocol_PanelTransition[];
  panel_effects?: CommunicationProtocol_PanelEffect[];

  // Canvas Action properties
  canvas_id?: string;
  // canvas_document_id?: string;
  canvas_title_label?: string;
  /** Optional URL that makes the canvas title clickable, opening the URL when clicked */
  canvas_title_href?: string;
  canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS";
  canvas_icon?: string;
  canvas_initial_contents?: CanvasContent[];
  canvas_contents?: CanvasContent[];
  canvas_operation?: CanvasUpdateOperation;
  canvas_content_id?: string;
  append_contents?: {
    canvas_insert_position: "TOP" | "BOTTOM";
    contents: CanvasContent[];
  };
  modify_contents?: {
    target_content_id: string;
    modification_type: CanvasModificationType;
    new_content_data: CanvasContentData;
  };
  remove_contents?: {
    target_content_ids: string[];
  };
}

/**
 * CHAT_MESSAGE interface - concrete implementation of CommunicationProtocol_SpecializedMessage for chat communication
 *
 * The fundamental unit of communication within a chat thread. Represents a single
 * message or interaction, whether originating from USER or ASSISTANT. Each conversation
 * turn is encapsulated within a CHAT_MESSAGE.
 *
 * Contains one or more CHAT_CONTENT objects that represent the actual substance
 * of the message (text, interactive elements, etc.) and can embed various ACTIONs.
 *
 * @remarks `message_contents` is the only body channel for chat turns; keep `message_id` aligned with thread correlation ids.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_MESSAGE.md - Worked-through payloads
 *   showing how `message_contents`, nested content, and actions compose in practice.
 *
 * @interface CommunicationProtocol_ChatMessage
 * @extends CommunicationProtocol_SpecializedMessage
 */
export interface CommunicationProtocol_ChatMessage
  extends CommunicationProtocol_SpecializedMessage {
  /** Must be "CHAT_MESSAGE" to distinguish from other message types */
  message_type: ChatMessageType;
  /** Sender: "USER" (human), "ASSISTANT" (AI), or "SYSTEM" (automated) */
  message_role: MessageRole;
  /** Target interface - typically "CHAT" for chat messages */
  message_target: ChatMessageTarget;
  /** Array of CHAT_CONTENT objects that form the message body */
  message_contents: CommunicationProtocol_ChatContent[];
}

/**
 * CHAT_CONTENT interface - specialized content for chat messages
 *
 * General type representing any piece of content that forms part of a CHAT_MESSAGE.
 * These are the building blocks for constructing rich and interactive chat messages
 * between User and Assistant.
 *
 * A single CHAT_MESSAGE can contain multiple CHAT_CONTENT objects, allowing complex
 * messages to be composed from various content elements like text, buttons, cards,
 * progress bars, etc.
 *
 * @remarks `content_type` selects the parser for `content_data`; never mix incompatible `content_data` shapes for a given type literal.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/ - Individual Content Type Specifications
 *
 * @interface CommunicationProtocol_ChatContent
 * @extends CommunicationProtocol_SpecializedContent
 */
export interface CommunicationProtocol_ChatContent
  extends CommunicationProtocol_SpecializedContent {
  /** Specific chat content type - determines content_data structure */
  content_type: ChatContentType;
}

/**
 * Send Text Message Action Data
 *
 * Action data structure for CHAT_ACTION_SEND_TEXT_MESSAGE.
 * Used to simulate user text input within the chat interface.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md - CHAT_ACTION_SEND_TEXT_MESSAGE Specification
 */
export interface CommunicationProtocol_SendTextMessageActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** Role of the simulated message sender */
  role: MessageRole;
  /** Text content to send as simulated input */
  text: string;
}

/**
 * Choose Actionable Card Action Data
 *
 * Action data structure for CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.
 * Used to handle user card selections.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md - CHAT_ACTION_CHOOSE_ACTIONABLE_CARD Specification
 */
export interface CommunicationProtocol_ChooseActionableCardActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** ID of the actionable cards content */
  actionable_cards_content_id: string;
  /** Value of the selected card */
  selected_card_value: string;
  /** Title of the selected card */
  selected_card_title: string;
  /** Subtitle of the selected card */
  selected_card_subtitle: string;
  /** Optional simulated user message text */
  simulated_user_message_text?: string;
}

/**
 * Choose Actionable Chip Action Data
 *
 * Action data structure for CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.
 * Used to handle user chip selections.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md - CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP Specification
 */
export interface CommunicationProtocol_ChooseActionableChipActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** ID of the actionable chips content */
  actionable_chips_content_id: string;
  /** Value of the selected chip */
  selected_chip_value: string;
  /** Text of the selected chip */
  selected_chip_text: string;
  /** Optional simulated user message text */
  simulated_user_message_text?: string;
}

/**
 * Update Button Action Data
 *
 * Action data structure for CHAT_ACTION_UPDATE_BUTTON.
 * Used to update button states and properties.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_BUTTON.md - CHAT_ACTION_UPDATE_BUTTON Specification
 */
export interface CommunicationProtocol_UpdateButtonActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** ID of the button content to update */
  button_content_id: string;
  /** New button text (optional) */
  button_text?: string;
  /** New button state (optional) */
  button_state?: ChatButtonState;
  /** New button style (optional) */
  button_style?: ButtonStyle;
  /** New button icon (optional) */
  button_icon?: string;
  /** Replacement actions to associate with the button (optional) */
  button_actions?: CommunicationProtocol_ChatAction[];
  /** Structured update payload aligning with protocol specification (optional) */
  button_updates?: {
    button_text?: string;
    button_icon?: string;
    button_style?: ButtonStyle;
    button_state?: ChatButtonState;
    button_actions?: CommunicationProtocol_ChatAction[];
  };
}

/**
 * Update Progress Bar Action Data
 *
 * Action data structure for CHAT_ACTION_UPDATE_PROGRESS_BAR.
 * Used to update progress bar values and states.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md - CHAT_ACTION_UPDATE_PROGRESS_BAR Specification
 */
export interface CommunicationProtocol_UpdateProgressBarActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** ID of the progress bar content to update */
  progress_bar_content_id: string;
  /** New progress bar state (optional) */
  progress_bar_state?: ProgressBarState;
  /** New visibility state (optional) */
  progress_bar_visibility?: ProgressBarVisibilityState;
  /** New current percentage (optional) */
  progress_bar_current_percentage?: number;
  /** New current animation duration in milliseconds (optional) */
  progress_bar_current_animation_duration_ms?: number;
  /** New next goal delay in milliseconds (optional) */
  progress_bar_next_goal_delay_ms?: number;
  /** New next goal percentage (optional) */
  progress_bar_next_goal_percentage?: number;
  /** New next goal animation duration in milliseconds (optional) */
  progress_bar_next_goal_animation_duration_ms?: number;
  /** New progress message (optional) */
  progress_bar_message?: string;
  /** New progress icon (optional) */
  progress_bar_icon?: string;
}

/**
 * Wait For Queues Action Data
 *
 * Action data structure for CHAT_ACTION_WAIT_FOR_QUEUES.
 * Used to block the current queue until specified content queues complete.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_WAIT_FOR_QUEUES.md - Specification
 */
export interface CommunicationProtocol_WaitForQueuesActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;
  /** Named content queues to wait for (e.g., ["website", "reasoning"]) */
  queue_names: string[];
  /**
   * Wait mode:
   * - DRAIN: wait until queued content for these queues is processed.
   * - IDLE: wait until queues are no longer actively processing.
   * - CONTENT_IDS: wait for specific content IDs (requires content_ids).
   */
  wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS";
  /** Content IDs to wait for when using CONTENT_IDS mode. */
  content_ids?: string[];
  /** Optional timeout before applying on_timeout behavior. */
  timeout_ms?: number;
  /** Behavior when timeout is reached. Default: CONTINUE. */
  on_timeout?: "CONTINUE" | "ERROR";
}

/**
 * Begin Simulated Turn Action Data
 *
 * Action data structure for CHAT_ACTION_BEGIN_SIMULATED_TURN.
 * Used to scroll the chat in the UI, clearing the screen and starting a new simulated turn.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_BEGIN_SIMULATED_TURN.md - CHAT_ACTION_BEGIN_SIMULATED_TURN Specification
 */
export interface CommunicationProtocol_BeginSimulatedTurnActionData {
  /** Target interface - always "CHAT" (constant value, no other targets supported) */
  target: ChatMessageTarget;
}

/**
 * Complete Content Sequence Action Data
 *
 * Action data structure for CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.
 * Signals the UI that a content sequence has been completed and the UI should
 * prepare for the next sequence of contents. The next content sent after this
 * action will display the assistant logo, visually separating previous contents
 * from the new logical unit.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md - CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE Specification
 */
export interface CommunicationProtocol_CompleteContentSequenceActionData {
  /** Target interface - always "CHAT" (constant value, no other targets supported) */
  target: ChatMessageTarget;
}

/**
 * Update Panel Action Data
 *
 * Enhanced action data structure for CHAT_ACTION_UPDATE_PANEL with
 * complete union type support and new animation features introduced
 * in the 2025-09-15 communication protocol updates.
 *
 * @interface CommunicationProtocol_UpdatePanelActionData
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PANEL.md - CHAT_ACTION_UPDATE_PANEL Specification
 */
export interface CommunicationProtocol_UpdatePanelActionData {
  /** Target interface - must be "CHAT" */
  target: ChatMessageTarget;

  /** ID of the panel content to update */
  panel_content_id: string;

  /** New panel header icon - predefined or custom URL (optional) */
  panel_header_icon?: PanelHeaderIcon;

  /** Favicon URL for website panels (captured from Firecrawl scrape metadata) */
  panel_header_favicon_url?: string;

  /** New panel header title (optional) */
  panel_header_title?: string;

  /** New panel header description (optional) */
  panel_header_description?: string;

  /** New panel visibility state (optional) */
  panel_visibility?: PanelVisibilityState;

  /** New panel body type (optional) */
  panel_body_type?: PanelBodyType;

  /** New panel body aspect ratio (optional) */
  panel_body_aspect_ratio?: PanelBodyAspectRatio;

  /** New panel body content data (optional) */
  panel_body_data?: PanelBodyContent;

  /** Motion attributes for whole-panel scroll/transition updates (optional) */
  panel_scrolling_framer_motion_attributes?: CommunicationProtocol_FramerMotionAttributes;

  /** New panel animation transitions (optional) */
  panel_transitions?: CommunicationProtocol_PanelTransition[];

  /** New panel overlay effects (optional) */
  panel_effects?: CommunicationProtocol_PanelEffect[];
}

/**
 * CHAT_ACTION interface - specialized actions for chat interface
 *
 * General type representing instructions for actions to be performed within or
 * related to the chat interface. These can range from simulating user input to
 * directly manipulating UI elements like buttons or progress bars.
 *
 * CHAT_ACTIONs are typically embedded within CHAT_CONTENT objects (e.g., as part
 * of actionable cards or chips) or dispatched independently to control chat UI.
 *
 * @remarks `ChatActionType` may delegate canvas operations; validate `action_data.target` before assuming chat-only fields are present.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/ - Individual Chat Action Specifications
 *
 * @interface CommunicationProtocol_ChatAction
 */
export interface CommunicationProtocol_ChatAction {
  /** Unique identifier for this specific action instance */
  action_id: string;
  /** Specific chat action type - determines action_data structure */
  action_type: ChatActionType;
  /** Action data with strongly typed common properties and extensible structure */
  action_data: CommunicationProtocol_ChatActionData;
}
