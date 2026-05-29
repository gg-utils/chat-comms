/**
 * Canonical fence language for protocol fenced-JSON stream transport.
 * Only lowercase `json` is supported. `javascript`, `js`, and uppercase `JSON`
 * are unsupported aliases that strict validation rejects.
 */
export const PROTOCOL_FENCE_LANGUAGE = "json" as const;

// ============================================================================
// Namespace-Qualified Protocol Wire Constants
// ============================================================================

export const PROTOCOL_MESSAGE_ROLES = {
  PROTOCOL_MESSAGE_ROLE_USER: "USER",
  PROTOCOL_MESSAGE_ROLE_ASSISTANT: "ASSISTANT",
} as const;

export const PROTOCOL_MESSAGE_TARGETS = {
  PROTOCOL_MESSAGE_TARGET_CHAT: "CHAT",
} as const;

export const PROTOCOL_ACTION_TARGETS = {
  PROTOCOL_ACTION_TARGET_CHAT: "CHAT",
  PROTOCOL_ACTION_TARGET_CANVAS: "CANVAS",
  PROTOCOL_ACTION_TARGET_APP: "APP",
} as const;

export const PROTOCOL_WAIT_MODES = {
  PROTOCOL_WAIT_MODE_DRAIN: "DRAIN",
  PROTOCOL_WAIT_MODE_IDLE: "IDLE",
  PROTOCOL_WAIT_MODE_CONTENT_IDS: "CONTENT_IDS",
} as const;

export const PROTOCOL_QUEUE_NAMES = {
  PROTOCOL_QUEUE_NAME_MAIN: "main",
} as const;

// ============================================================================
// Token Family Arrays (for validation and enumeration)
// ============================================================================

export const PROTOCOL_CHAT_CONTENT_TYPES = [
  "CHAT_CONTENT_MARKDOWN",
  "CHAT_CONTENT_BUTTON",
  "CHAT_CONTENT_ACTIONABLE_CARDS",
  "CHAT_CONTENT_ACTIONABLE_CHIPS",
  "CHAT_CONTENT_ACTION_WRAPPER",
  "CHAT_CONTENT_PROGRESS_BAR",
  "CHAT_CONTENT_PANEL",
] as const;

export const PROTOCOL_CANVAS_CONTENT_TYPES = [
  "CANVAS_CONTENT_MARKDOWN",
  "CANVAS_CONTENT_SECTION",
  "CANVAS_CONTENT_HTML",
] as const;

export const PROTOCOL_CHAT_ACTION_TYPES = [
  "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "CHAT_ACTION_UPDATE_BUTTON",
  "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "CHAT_ACTION_WAIT_FOR_QUEUES",
  "CHAT_ACTION_UPDATE_PANEL",
  "CHAT_ACTION_BEGIN_SIMULATED_TURN",
  "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
] as const;

export const PROTOCOL_CANVAS_ACTION_TYPES = [
  "CANVAS_ACTION_OPEN",
  "CANVAS_ACTION_CLOSE",
  "CANVAS_ACTION_UPDATE",
] as const;

export const PROTOCOL_APP_ACTION_TYPES = [
  "APP_ACTION_SET_THEME",
  "APP_ACTION_THREAD_LIST_REFRESH",
  "APP_ACTION_USER_PREFERENCE_UPDATE",
  "APP_ACTION_CORE_CONSOLE",
  "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "APP_ACTION_WAIT_FOR_USER_INPUT",
  "APP_ACTION_SET_SEND_ERROR",
] as const;

// ============================================================================
// Message Type Constants
// ============================================================================

/**
 * Message Type Constants
 *
 * Constants for all message types supported by the communication protocol.
 * Currently only CHAT_MESSAGE is implemented, but this provides a foundation
 * for future message types.
 */
export const MESSAGE_TYPES = {
  /** Chat message type for conversational interactions */
  CHAT_MESSAGE: "CHAT_MESSAGE" as const,
} as const;

/**
 * Message Role Constants
 *
 * Constants for message sender roles in chat communications.
 */
export const MESSAGE_ROLES = {
  /** Human-originated message */
  USER: "USER" as const,
  /** AI Assistant-originated message */
  ASSISTANT: "ASSISTANT" as const,
  /** Automated system message */
  SYSTEM: "SYSTEM" as const,
} as const;

/**
 * Message Target Constants
 *
 * Constants for message target interfaces.
 */
export const MESSAGE_TARGETS = {
  /** Chat interface target */
  CHAT: "CHAT" as const,
  /** Canvas interface target */
  CANVAS: "CANVAS" as const,
  /** Application-level target */
  APP: "APP" as const,
} as const;

// ============================================================================
// Chat Content Type Constants
// ============================================================================

/**
 * Chat Content Type Constants
 *
 * Type-safe constants for all CHAT_CONTENT types. These determine the structure
 * of content_data and the available functionality for each content type.
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 */
export const CHAT_CONTENT_TYPES = {
  /** Rich text with markdown formatting */
  CHAT_CONTENT_MARKDOWN: "CHAT_CONTENT_MARKDOWN" as const,
  /** Interactive buttons */
  CHAT_CONTENT_BUTTON: "CHAT_CONTENT_BUTTON" as const,
  /** Card-based selection interfaces */
  CHAT_CONTENT_ACTIONABLE_CARDS: "CHAT_CONTENT_ACTIONABLE_CARDS" as const,
  /** Small action buttons and tags */
  CHAT_CONTENT_ACTIONABLE_CHIPS: "CHAT_CONTENT_ACTIONABLE_CHIPS" as const,
  /** Wrapper for actionable content elements */
  CHAT_CONTENT_ACTION_WRAPPER: "CHAT_CONTENT_ACTION_WRAPPER" as const,
  /** Progress indicators and status bars */
  CHAT_CONTENT_PROGRESS_BAR: "CHAT_CONTENT_PROGRESS_BAR" as const,
  /** Structured panels with headers */
  CHAT_CONTENT_PANEL: "CHAT_CONTENT_PANEL" as const,
} as const;

// ============================================================================
// Chat Action Type Constants
// ============================================================================

/**
 * Chat Action Type Constants
 *
 * Type-safe constants for all CHAT_ACTION types. These determine the structure
 * of action_data and the behavior when the action is executed.
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 */
export const CHAT_ACTION_TYPES = {
  /** Simulate user text input */
  CHAT_ACTION_SEND_TEXT_MESSAGE: "CHAT_ACTION_SEND_TEXT_MESSAGE" as const,
  /** Handle user card selections */
  CHAT_ACTION_CHOOSE_ACTIONABLE_CARD: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD" as const,
  /** Handle user chip selections */
  CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP" as const,
  /** Update button states */
  CHAT_ACTION_UPDATE_BUTTON: "CHAT_ACTION_UPDATE_BUTTON" as const,
  /** Update progress bar values and states */
  CHAT_ACTION_UPDATE_PROGRESS_BAR: "CHAT_ACTION_UPDATE_PROGRESS_BAR" as const,
  /** Block current queue until specified content queues drain */
  CHAT_ACTION_WAIT_FOR_QUEUES: "CHAT_ACTION_WAIT_FOR_QUEUES" as const,
  /** Update panel headers and content */
  CHAT_ACTION_UPDATE_PANEL: "CHAT_ACTION_UPDATE_PANEL" as const,
  /** Begin a new simulated turn, scrolling the chat and clearing the screen */
  CHAT_ACTION_BEGIN_SIMULATED_TURN: "CHAT_ACTION_BEGIN_SIMULATED_TURN" as const,
  /** Signal content sequence completion, preparing UI for new logical unit with assistant logo */
  CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE" as const,
} as const;

// ============================================================================
// Canvas Content Type Constants
// ============================================================================

/**
 * Canvas Content Type Constants
 *
 * Type-safe constants for all CANVAS_CONTENT types. These determine the structure
 * of content_data for canvas-specific content elements.
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 */
export const CANVAS_CONTENT_TYPES = {
  /** Rich text with markdown formatting for canvas */
  CANVAS_CONTENT_MARKDOWN: "CANVAS_CONTENT_MARKDOWN" as const,
  /** Structured sections with collapsible headers */
  CANVAS_CONTENT_SECTION: "CANVAS_CONTENT_SECTION" as const,
  /** Raw HTML content for canvas (no sanitization at protocol level) */
  CANVAS_CONTENT_HTML: "CANVAS_CONTENT_HTML" as const,
} as const;

// ============================================================================
// Canvas Action Type Constants
// ============================================================================

/**
 * Canvas Action Type Constants
 *
 * Type-safe constants for all CANVAS_ACTION types. These determine the structure
 * of action_data for canvas-specific operations.
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 */
export const CANVAS_ACTION_TYPES = {
  /** Open and initialize canvas workspace */
  CANVAS_ACTION_OPEN: "CANVAS_ACTION_OPEN" as const,
  /** Close canvas workspace */
  CANVAS_ACTION_CLOSE: "CANVAS_ACTION_CLOSE" as const,
  /** Update canvas content */
  CANVAS_ACTION_UPDATE: "CANVAS_ACTION_UPDATE" as const,
} as const;

// ============================================================================
// App Action Type Constants
// ============================================================================

/**
 * App Action Type Constants
 *
 * Type-safe constants for all APP_ACTION types. These determine the structure
 * of action_data for application-level operations.
 *
 * @see docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 */
export const APP_ACTION_TYPES = {
  /** Change application theme */
  APP_ACTION_SET_THEME: "APP_ACTION_SET_THEME" as const,
  /** Refresh conversation thread list */
  APP_ACTION_THREAD_LIST_REFRESH: "APP_ACTION_THREAD_LIST_REFRESH" as const,
  /** Update user preferences and settings */
  APP_ACTION_USER_PREFERENCE_UPDATE: "APP_ACTION_USER_PREFERENCE_UPDATE" as const,
  /** Stream core debug logs to the client console */
  APP_ACTION_CORE_CONSOLE: "APP_ACTION_CORE_CONSOLE" as const,
  /** Set the chat input placeholder text */
  APP_ACTION_SET_INPUT_PLACEHOLDER: "APP_ACTION_SET_INPUT_PLACEHOLDER" as const,
  /** Pause message progression and wait for explicit user interaction */
  APP_ACTION_WAIT_FOR_USER_INPUT: "APP_ACTION_WAIT_FOR_USER_INPUT" as const,
  /** Set the structured send-error state in the client */
  APP_ACTION_SET_SEND_ERROR: "APP_ACTION_SET_SEND_ERROR" as const,
} as const;

// ============================================================================
// Panel Body Type Constants
// ============================================================================

/**
 * Panel Body Type Constants
 *
 * Type-safe constants for all PANEL_BODY types. These determine the structure
 * of panel_body_data within CHAT_CONTENT_PANEL elements.
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - Panel Content Specification
 */
export const PANEL_BODY_TYPES = {
  /** Markdown text content */
  PANEL_BODY_MARKDOWN: "PANEL_BODY_MARKDOWN" as const,
  /** Reasoning markdown V1 - headerless, content-focused presentation */
  PANEL_BODY_REASONING_V1_MARKDOWN: "PANEL_BODY_REASONING_V1_MARKDOWN" as const,
  /** Reasoning markdown V2 - header shows progress messages, body accumulates content */
  PANEL_BODY_REASONING_V2_MARKDOWN: "PANEL_BODY_REASONING_V2_MARKDOWN" as const,
  /** Image content with positioning options */
  PANEL_BODY_IMAGE: "PANEL_BODY_IMAGE" as const,
  /** Actionable cards within panel */
  PANEL_BODY_ACTIONABLE_CARDS: "PANEL_BODY_ACTIONABLE_CARDS" as const,
  /** Actionable chips within panel */
  PANEL_BODY_ACTIONABLE_CHIPS: "PANEL_BODY_ACTIONABLE_CHIPS" as const,
  /** Google Search home interface */
  PANEL_BODY_GOOGLE_SEARCH_HOME: "PANEL_BODY_GOOGLE_SEARCH_HOME" as const,
  /** Google Search results display */
  PANEL_BODY_GOOGLE_SEARCH_RESULT: "PANEL_BODY_GOOGLE_SEARCH_RESULT" as const,
  /** Google Maps location search */
  PANEL_BODY_GOOGLE_MAPS_HOME: "PANEL_BODY_GOOGLE_MAPS_HOME" as const,
  /** Google Maps reviews display */
  PANEL_BODY_GOOGLE_MAPS_REVIEWS: "PANEL_BODY_GOOGLE_MAPS_REVIEWS" as const,
  /** ChatGPT query interface */
  PANEL_BODY_CHATGPT_HOME: "PANEL_BODY_CHATGPT_HOME" as const,
  /** ChatGPT response display */
  PANEL_BODY_CHATGPT_RESULT: "PANEL_BODY_CHATGPT_RESULT" as const,
  /** Gemini query interface */
  PANEL_BODY_GEMINI_HOME: "PANEL_BODY_GEMINI_HOME" as const,
  /** Gemini response display */
  PANEL_BODY_GEMINI_RESULT: "PANEL_BODY_GEMINI_RESULT" as const,
  /** Perplexity query interface */
  PANEL_BODY_PERPLEXITY_HOME: "PANEL_BODY_PERPLEXITY_HOME" as const,
  /** Perplexity response display */
  PANEL_BODY_PERPLEXITY_RESULT: "PANEL_BODY_PERPLEXITY_RESULT" as const,
} as const;

// ============================================================================
// Content Width Constants
// ============================================================================

/**
 * Content Width Constants
 *
 * Type-safe constants for content width behavior in UI rendering.
 */
export const CONTENT_WIDTH = {
  /** Auto-size to content */
  WIDTH_AUTO: "WIDTH_AUTO" as const,
  /** Full width of container */
  WIDTH_FULL: "WIDTH_FULL" as const,
} as const;

// ============================================================================
// Actionable Card Selection Mode Constants
// ============================================================================

/**
 * Actionable Card Selection Mode Constants
 *
 * Type-safe constants for selection behavior specific to actionable cards.
 * Independent from chip selection modes to allow future divergence.
 */
export const ACTIONABLE_CARD_SELECTION_MODES = {
  /** Only one card can be selected */
  SINGLE: "SINGLE" as const,
  /** Multiple cards can be selected */
  MULTIPLE: "MULTIPLE" as const,
} as const;

// ============================================================================
// Actionable Card Selection State Constants
// ============================================================================

/**
 * Actionable Card Selection State Constants
 *
 * Type-safe constants for current selection state specific to actionable cards.
 * Independent from chip selection states to allow future divergence.
 */
export const ACTIONABLE_CARD_SELECTION_STATES = {
  /** Awaiting user selection */
  PENDING_SELECTION: "PENDING_SELECTION" as const,
  /** User has made a selection */
  SELECTED: "SELECTED" as const,
  /** Selection has been cleared */
  UNSELECTED: "UNSELECTED" as const,
} as const;

// ============================================================================
// Actionable Chip Selection Mode Constants
// ============================================================================

/**
 * Actionable Chip Selection Mode Constants
 *
 * Type-safe constants for selection behavior specific to actionable chips.
 * Independent from card selection modes to allow future divergence.
 */
export const ACTIONABLE_CHIP_SELECTION_MODES = {
  /** Only one chip can be selected */
  SINGLE: "SINGLE" as const,
  /** Multiple chips can be selected */
  MULTIPLE: "MULTIPLE" as const,
} as const;

// ============================================================================
// Actionable Chip Selection State Constants
// ============================================================================

/**
 * Actionable Chip Selection State Constants
 *
 * Type-safe constants for current selection state specific to actionable chips.
 * Independent from card selection states to allow future divergence.
 */
export const ACTIONABLE_CHIP_SELECTION_STATES = {
  /** Awaiting user selection */
  PENDING_SELECTION: "PENDING_SELECTION" as const,
  /** User has made a selection */
  SELECTED: "SELECTED" as const,
  /** Selection is disabled */
  DISABLED: "DISABLED" as const,
} as const;

// ============================================================================
// Progress Bar State Constants
// ============================================================================

/**
 * Progress Bar State Constants
 *
 * Type-safe constants for progress bar states.
 */
export const PROGRESS_BAR_STATES = {
  /** Progress is ongoing */
  IN_PROGRESS: "IN_PROGRESS" as const,
  /** Progress is completed */
  COMPLETED: "COMPLETED" as const,
  /** Progress ended with an error */
  ERROR: "ERROR" as const,
  /** Progress is paused */
  PAUSED: "PAUSED" as const,
  /** Progress was cancelled */
  CANCELLED: "CANCELLED" as const,
} as const;

// ============================================================================
// Progress Bar Visibility State Constants
// ============================================================================

/**
 * Progress Bar Visibility State Constants
 *
 * Type-safe constants for progress bar visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export const PROGRESS_BAR_VISIBILITY_STATES = {
  /** Progress bar is visible */
  VISIBLE: "VISIBLE" as const,
  /** Progress bar is hidden */
  HIDDEN: "HIDDEN" as const,
} as const;

// ============================================================================
// Panel Visibility State Constants
// ============================================================================

/**
 * Panel Visibility State Constants
 *
 * Type-safe constants for panel visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export const PANEL_VISIBILITY_STATES = {
  /** Panel is visible */
  VISIBLE: "VISIBLE" as const,
  /** Panel is hidden */
  HIDDEN: "HIDDEN" as const,
  /** Panel is collapsed */
  COLLAPSED: "COLLAPSED" as const,
} as const;

// ============================================================================
// Button Visibility State Constants
// ============================================================================

/**
 * Button Visibility State Constants
 *
 * Type-safe constants for button visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export const BUTTON_VISIBILITY_STATES = {
  /** Button is visible */
  VISIBLE: "VISIBLE" as const,
  /** Button is hidden */
  HIDDEN: "HIDDEN" as const,
} as const;

// ============================================================================
// Visibility State Constants (Deprecated)
// ============================================================================

/**
 * Visibility State Constants (deprecated)
 *
 * @deprecated Use PROGRESS_BAR_VISIBILITY_STATES, PANEL_VISIBILITY_STATES, or BUTTON_VISIBILITY_STATES instead
 */
export const VISIBILITY_STATES = {
  /** Element is visible */
  VISIBLE: "VISIBLE" as const,
  /** Element is hidden */
  HIDDEN: "HIDDEN" as const,
} as const;

// ============================================================================
// Button Style Constants
// ============================================================================

/**
 * Button Style Constants
 *
 * Type-safe constants for button visual styles.
 */
export const BUTTON_STYLES = {
  /** Primary button style */
  PRIMARY: "BUTTON_STYLE_PRIMARY" as const,
  /** Secondary button style */
  SECONDARY: "BUTTON_STYLE_SECONDARY" as const,
  /** Success button style */
  SUCCESS: "BUTTON_STYLE_SUCCESS" as const,
  /** Warning button style */
  WARNING: "BUTTON_STYLE_WARNING" as const,
  /** Danger button style */
  DANGER: "BUTTON_STYLE_DANGER" as const,
} as const;

// ============================================================================
// Chat Button State Constants
// ============================================================================

/**
 * Chat Button State Constants
 *
 * Type-safe constants for chat interface button interaction states.
 * Independent from other button types to allow future divergence.
 */
export const CHAT_BUTTON_STATES = {
  /** Button is enabled and interactive */
  ENABLED: "ENABLED" as const,
  /** Button is disabled and non-interactive */
  DISABLED: "DISABLED" as const,
  /** Button is in loading state */
  LOADING: "LOADING" as const,
} as const;

// ============================================================================
// Panel Button State Constants
// ============================================================================

/**
 * Panel Button State Constants
 *
 * Type-safe constants for panel interface button interaction states.
 * Independent from other button types to allow future divergence.
 */
export const PANEL_BUTTON_STATES = {
  /** Button is enabled and interactive */
  ENABLED: "ENABLED" as const,
  /** Button is disabled and non-interactive */
  DISABLED: "DISABLED" as const,
  /** Button is in loading state */
  LOADING: "LOADING" as const,
  /** Button is hidden */
  HIDDEN: "HIDDEN" as const,
} as const;

// ============================================================================
// Button State Constants (Deprecated)
// ============================================================================

/**
 * Button State Constants (deprecated)
 *
 * @deprecated Use CHAT_BUTTON_STATES or PANEL_BUTTON_STATES instead
 */
export const BUTTON_STATES = {
  /** Button is enabled and interactive */
  ENABLED: "ENABLED" as const,
  /** Button is disabled and non-interactive */
  DISABLED: "DISABLED" as const,
  /** Button is in loading state */
  LOADING: "LOADING" as const,
} as const;

// ============================================================================
// Chip Style Constants
// ============================================================================

/**
 * Chip Style Constants
 *
 * Type-safe constants for chip visual styles.
 */
export const CHIP_STYLES = {
  /** Primary chip style */
  PRIMARY: "CHIP_STYLE_PRIMARY" as const,
  /** Secondary chip style */
  SECONDARY: "CHIP_STYLE_SECONDARY" as const,
} as const;

// ============================================================================
// Chip State Constants
// ============================================================================

/**
 * Chip State Constants
 *
 * Type-safe constants for chip interaction states.
 * Independent from button states to allow future divergence.
 */
export const CHIP_STATES = {
  /** Chip is enabled and interactive */
  ENABLED: "ENABLED" as const,
  /** Chip is disabled and non-interactive */
  DISABLED: "DISABLED" as const,
  /** Chip is in loading state */
  LOADING: "LOADING" as const,
} as const;

// ============================================================================
// Section Style Constants
// ============================================================================

/**
 * Section Style Constants
 *
 * Type-safe constants for canvas section visual styles.
 * Controls layout and appearance of section containers.
 */
export const SECTION_STYLES = {
  /** Default section style */
  DEFAULT: "DEFAULT" as const,
  /** Bordered section style */
  BORDERED: "BORDERED" as const,
  /** Highlighted section style */
  HIGHLIGHTED: "HIGHLIGHTED" as const,
  /** Compact section style */
  COMPACT: "COMPACT" as const,
} as const;

// ============================================================================
// Markdown Style Constants
// ============================================================================

/**
 * Markdown Style Constants
 *
 * Type-safe constants for markdown content visual styles.
 */
export const MARKDOWN_STYLES = {
  /** Default markdown styling */
  DEFAULT: "DEFAULT" as const,
  /** Compact markdown styling */
  COMPACT: "COMPACT" as const,
  /** Large markdown styling */
  LARGE: "LARGE" as const,
} as const;

// ============================================================================
// Union Type Helpers
// ============================================================================

/**
 * Union type of all chat content type values
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 */
export type ChatContentType = (typeof CHAT_CONTENT_TYPES)[keyof typeof CHAT_CONTENT_TYPES];

/**
 * Union type of all chat action type values
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 */
export type ChatActionType = (typeof CHAT_ACTION_TYPES)[keyof typeof CHAT_ACTION_TYPES];

/**
 * Union type of all canvas content type values
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 */
export type CanvasContentType = (typeof CANVAS_CONTENT_TYPES)[keyof typeof CANVAS_CONTENT_TYPES];

/**
 * Union type of all canvas action type values
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 */
export type CanvasActionType = (typeof CANVAS_ACTION_TYPES)[keyof typeof CANVAS_ACTION_TYPES];

/**
 * Union type of all app action type values
 *
 * @see docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 */
export type AppActionType = (typeof APP_ACTION_TYPES)[keyof typeof APP_ACTION_TYPES];

/**
 * Union type of all panel body type values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelBodyType = (typeof PANEL_BODY_TYPES)[keyof typeof PANEL_BODY_TYPES];

/**
 * Union type of all message role values
 *
 * @see docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE Base Structure
 * @see docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 */
export type MessageRole = (typeof MESSAGE_ROLES)[keyof typeof MESSAGE_ROLES];

/**
 * Union type of all content width values
 *
 * @see docs/communication-protocol/base-structures/CONTENT.md - CONTENT Base Structure
 */
export type ContentWidth = (typeof CONTENT_WIDTH)[keyof typeof CONTENT_WIDTH];

/**
 * Union type of all actionable card selection mode values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - CHAT_CONTENT_ACTIONABLE_CARDS Specification
 */
export type ActionableCardSelectionMode =
  (typeof ACTIONABLE_CARD_SELECTION_MODES)[keyof typeof ACTIONABLE_CARD_SELECTION_MODES];

/**
 * Union type of all actionable card selection state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - CHAT_CONTENT_ACTIONABLE_CARDS Specification
 */
export type ActionableCardSelectionState =
  (typeof ACTIONABLE_CARD_SELECTION_STATES)[keyof typeof ACTIONABLE_CARD_SELECTION_STATES];

/**
 * Union type of all actionable chip selection mode values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionMode =
  (typeof ACTIONABLE_CHIP_SELECTION_MODES)[keyof typeof ACTIONABLE_CHIP_SELECTION_MODES];

/**
 * Union type of all actionable chip selection state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionState =
  (typeof ACTIONABLE_CHIP_SELECTION_STATES)[keyof typeof ACTIONABLE_CHIP_SELECTION_STATES];

/**
 * Union type of all progress bar state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PROGRESS_BAR.md - CHAT_CONTENT_PROGRESS_BAR Specification
 */
export type ProgressBarState = (typeof PROGRESS_BAR_STATES)[keyof typeof PROGRESS_BAR_STATES];

/**
 * Union type of all progress bar visibility state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PROGRESS_BAR.md - CHAT_CONTENT_PROGRESS_BAR Specification
 */
export type ProgressBarVisibilityState =
  (typeof PROGRESS_BAR_VISIBILITY_STATES)[keyof typeof PROGRESS_BAR_VISIBILITY_STATES];

/**
 * Union type of all panel visibility state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelVisibilityState =
  (typeof PANEL_VISIBILITY_STATES)[keyof typeof PANEL_VISIBILITY_STATES];

/**
 * Union type of all button visibility state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ButtonVisibilityState =
  (typeof BUTTON_VISIBILITY_STATES)[keyof typeof BUTTON_VISIBILITY_STATES];

/**
 * Union type of all chat button state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ChatButtonState = (typeof CHAT_BUTTON_STATES)[keyof typeof CHAT_BUTTON_STATES];

/**
 * Union type of all panel button state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelButtonState = (typeof PANEL_BUTTON_STATES)[keyof typeof PANEL_BUTTON_STATES];

/**
 * Union type of all visibility state values (deprecated)
 * @deprecated Use ProgressBarVisibilityState, PanelVisibilityState, or ButtonVisibilityState instead
 */
export type VisibilityState = "VISIBLE" | "HIDDEN";

/**
 * Union type of all button style values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ButtonStyle = (typeof BUTTON_STYLES)[keyof typeof BUTTON_STYLES];

/**
 * Union type of all button state values (deprecated)
 * @deprecated Use ChatButtonState or PanelButtonState instead
 */
export type ButtonState = "ENABLED" | "DISABLED" | "LOADING";

/**
 * Union type of all chip style values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ChipStyle = (typeof CHIP_STYLES)[keyof typeof CHIP_STYLES];

/**
 * Union type of all chip state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ChipState = (typeof CHIP_STATES)[keyof typeof CHIP_STATES];

/**
 * Union type of all section style values
 *
 * @see docs/communication-protocol/type-specifications/CANVAS_CONTENT_SECTION.md - CANVAS_CONTENT_SECTION Specification
 */
export type SectionStyle = (typeof SECTION_STYLES)[keyof typeof SECTION_STYLES];

/**
 * Union type of all markdown style values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_MARKDOWN.md - CHAT_CONTENT_MARKDOWN Specification
 * @see docs/communication-protocol/type-specifications/CANVAS_CONTENT_MARKDOWN.md - CANVAS_CONTENT_MARKDOWN Specification
 */
export type MarkdownStyle = (typeof MARKDOWN_STYLES)[keyof typeof MARKDOWN_STYLES];

