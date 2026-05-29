/**
 * Canonical fence language for protocol fenced-JSON stream transport.
 * Only lowercase `json` is supported. `javascript`, `js`, and uppercase `JSON`
 * are unsupported aliases that strict validation rejects.
 */
export const PROTOCOL_FENCE_LANGUAGE = "json";
// ============================================================================
// Namespace-Qualified Protocol Wire Constants
// ============================================================================
export const PROTOCOL_MESSAGE_ROLES = {
    PROTOCOL_MESSAGE_ROLE_USER: "USER",
    PROTOCOL_MESSAGE_ROLE_ASSISTANT: "ASSISTANT",
};
export const PROTOCOL_MESSAGE_TARGETS = {
    PROTOCOL_MESSAGE_TARGET_CHAT: "CHAT",
};
export const PROTOCOL_ACTION_TARGETS = {
    PROTOCOL_ACTION_TARGET_CHAT: "CHAT",
    PROTOCOL_ACTION_TARGET_CANVAS: "CANVAS",
    PROTOCOL_ACTION_TARGET_APP: "APP",
};
export const PROTOCOL_WAIT_MODES = {
    PROTOCOL_WAIT_MODE_DRAIN: "DRAIN",
    PROTOCOL_WAIT_MODE_IDLE: "IDLE",
    PROTOCOL_WAIT_MODE_CONTENT_IDS: "CONTENT_IDS",
};
export const PROTOCOL_QUEUE_NAMES = {
    PROTOCOL_QUEUE_NAME_MAIN: "main",
};
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
];
export const PROTOCOL_CANVAS_CONTENT_TYPES = [
    "CANVAS_CONTENT_MARKDOWN",
    "CANVAS_CONTENT_SECTION",
    "CANVAS_CONTENT_HTML",
];
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
];
export const PROTOCOL_CANVAS_ACTION_TYPES = [
    "CANVAS_ACTION_OPEN",
    "CANVAS_ACTION_CLOSE",
    "CANVAS_ACTION_UPDATE",
];
export const PROTOCOL_APP_ACTION_TYPES = [
    "APP_ACTION_SET_THEME",
    "APP_ACTION_THREAD_LIST_REFRESH",
    "APP_ACTION_USER_PREFERENCE_UPDATE",
    "APP_ACTION_CORE_CONSOLE",
    "APP_ACTION_SET_INPUT_PLACEHOLDER",
    "APP_ACTION_WAIT_FOR_USER_INPUT",
    "APP_ACTION_SET_SEND_ERROR",
];
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
    CHAT_MESSAGE: "CHAT_MESSAGE",
};
/**
 * Message Role Constants
 *
 * Constants for message sender roles in chat communications.
 */
export const MESSAGE_ROLES = {
    /** Human-originated message */
    USER: "USER",
    /** AI Assistant-originated message */
    ASSISTANT: "ASSISTANT",
    /** Automated system message */
    SYSTEM: "SYSTEM",
};
/**
 * Message Target Constants
 *
 * Constants for message target interfaces.
 */
export const MESSAGE_TARGETS = {
    /** Chat interface target */
    CHAT: "CHAT",
    /** Canvas interface target */
    CANVAS: "CANVAS",
    /** Application-level target */
    APP: "APP",
};
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
    CHAT_CONTENT_MARKDOWN: "CHAT_CONTENT_MARKDOWN",
    /** Interactive buttons */
    CHAT_CONTENT_BUTTON: "CHAT_CONTENT_BUTTON",
    /** Card-based selection interfaces */
    CHAT_CONTENT_ACTIONABLE_CARDS: "CHAT_CONTENT_ACTIONABLE_CARDS",
    /** Small action buttons and tags */
    CHAT_CONTENT_ACTIONABLE_CHIPS: "CHAT_CONTENT_ACTIONABLE_CHIPS",
    /** Wrapper for actionable content elements */
    CHAT_CONTENT_ACTION_WRAPPER: "CHAT_CONTENT_ACTION_WRAPPER",
    /** Progress indicators and status bars */
    CHAT_CONTENT_PROGRESS_BAR: "CHAT_CONTENT_PROGRESS_BAR",
    /** Structured panels with headers */
    CHAT_CONTENT_PANEL: "CHAT_CONTENT_PANEL",
};
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
    CHAT_ACTION_SEND_TEXT_MESSAGE: "CHAT_ACTION_SEND_TEXT_MESSAGE",
    /** Handle user card selections */
    CHAT_ACTION_CHOOSE_ACTIONABLE_CARD: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
    /** Handle user chip selections */
    CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
    /** Update button states */
    CHAT_ACTION_UPDATE_BUTTON: "CHAT_ACTION_UPDATE_BUTTON",
    /** Update progress bar values and states */
    CHAT_ACTION_UPDATE_PROGRESS_BAR: "CHAT_ACTION_UPDATE_PROGRESS_BAR",
    /** Block current queue until specified content queues drain */
    CHAT_ACTION_WAIT_FOR_QUEUES: "CHAT_ACTION_WAIT_FOR_QUEUES",
    /** Update panel headers and content */
    CHAT_ACTION_UPDATE_PANEL: "CHAT_ACTION_UPDATE_PANEL",
    /** Begin a new simulated turn, scrolling the chat and clearing the screen */
    CHAT_ACTION_BEGIN_SIMULATED_TURN: "CHAT_ACTION_BEGIN_SIMULATED_TURN",
    /** Signal content sequence completion, preparing UI for new logical unit with assistant logo */
    CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
};
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
    CANVAS_CONTENT_MARKDOWN: "CANVAS_CONTENT_MARKDOWN",
    /** Structured sections with collapsible headers */
    CANVAS_CONTENT_SECTION: "CANVAS_CONTENT_SECTION",
    /** Raw HTML content for canvas (no sanitization at protocol level) */
    CANVAS_CONTENT_HTML: "CANVAS_CONTENT_HTML",
};
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
    CANVAS_ACTION_OPEN: "CANVAS_ACTION_OPEN",
    /** Close canvas workspace */
    CANVAS_ACTION_CLOSE: "CANVAS_ACTION_CLOSE",
    /** Update canvas content */
    CANVAS_ACTION_UPDATE: "CANVAS_ACTION_UPDATE",
};
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
    APP_ACTION_SET_THEME: "APP_ACTION_SET_THEME",
    /** Refresh conversation thread list */
    APP_ACTION_THREAD_LIST_REFRESH: "APP_ACTION_THREAD_LIST_REFRESH",
    /** Update user preferences and settings */
    APP_ACTION_USER_PREFERENCE_UPDATE: "APP_ACTION_USER_PREFERENCE_UPDATE",
    /** Stream core debug logs to the client console */
    APP_ACTION_CORE_CONSOLE: "APP_ACTION_CORE_CONSOLE",
    /** Set the chat input placeholder text */
    APP_ACTION_SET_INPUT_PLACEHOLDER: "APP_ACTION_SET_INPUT_PLACEHOLDER",
    /** Pause message progression and wait for explicit user interaction */
    APP_ACTION_WAIT_FOR_USER_INPUT: "APP_ACTION_WAIT_FOR_USER_INPUT",
    /** Set the structured send-error state in the client */
    APP_ACTION_SET_SEND_ERROR: "APP_ACTION_SET_SEND_ERROR",
};
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
    PANEL_BODY_MARKDOWN: "PANEL_BODY_MARKDOWN",
    /** Reasoning markdown V1 - headerless, content-focused presentation */
    PANEL_BODY_REASONING_V1_MARKDOWN: "PANEL_BODY_REASONING_V1_MARKDOWN",
    /** Reasoning markdown V2 - header shows progress messages, body accumulates content */
    PANEL_BODY_REASONING_V2_MARKDOWN: "PANEL_BODY_REASONING_V2_MARKDOWN",
    /** Image content with positioning options */
    PANEL_BODY_IMAGE: "PANEL_BODY_IMAGE",
    /** Actionable cards within panel */
    PANEL_BODY_ACTIONABLE_CARDS: "PANEL_BODY_ACTIONABLE_CARDS",
    /** Actionable chips within panel */
    PANEL_BODY_ACTIONABLE_CHIPS: "PANEL_BODY_ACTIONABLE_CHIPS",
    /** Google Search home interface */
    PANEL_BODY_GOOGLE_SEARCH_HOME: "PANEL_BODY_GOOGLE_SEARCH_HOME",
    /** Google Search results display */
    PANEL_BODY_GOOGLE_SEARCH_RESULT: "PANEL_BODY_GOOGLE_SEARCH_RESULT",
    /** Google Maps location search */
    PANEL_BODY_GOOGLE_MAPS_HOME: "PANEL_BODY_GOOGLE_MAPS_HOME",
    /** Google Maps reviews display */
    PANEL_BODY_GOOGLE_MAPS_REVIEWS: "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
    /** ChatGPT query interface */
    PANEL_BODY_CHATGPT_HOME: "PANEL_BODY_CHATGPT_HOME",
    /** ChatGPT response display */
    PANEL_BODY_CHATGPT_RESULT: "PANEL_BODY_CHATGPT_RESULT",
    /** Gemini query interface */
    PANEL_BODY_GEMINI_HOME: "PANEL_BODY_GEMINI_HOME",
    /** Gemini response display */
    PANEL_BODY_GEMINI_RESULT: "PANEL_BODY_GEMINI_RESULT",
    /** Perplexity query interface */
    PANEL_BODY_PERPLEXITY_HOME: "PANEL_BODY_PERPLEXITY_HOME",
    /** Perplexity response display */
    PANEL_BODY_PERPLEXITY_RESULT: "PANEL_BODY_PERPLEXITY_RESULT",
};
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
    WIDTH_AUTO: "WIDTH_AUTO",
    /** Full width of container */
    WIDTH_FULL: "WIDTH_FULL",
};
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
    SINGLE: "SINGLE",
    /** Multiple cards can be selected */
    MULTIPLE: "MULTIPLE",
};
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
    PENDING_SELECTION: "PENDING_SELECTION",
    /** User has made a selection */
    SELECTED: "SELECTED",
    /** Selection has been cleared */
    UNSELECTED: "UNSELECTED",
};
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
    SINGLE: "SINGLE",
    /** Multiple chips can be selected */
    MULTIPLE: "MULTIPLE",
};
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
    PENDING_SELECTION: "PENDING_SELECTION",
    /** User has made a selection */
    SELECTED: "SELECTED",
    /** Selection is disabled */
    DISABLED: "DISABLED",
};
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
    IN_PROGRESS: "IN_PROGRESS",
    /** Progress is completed */
    COMPLETED: "COMPLETED",
    /** Progress ended with an error */
    ERROR: "ERROR",
    /** Progress is paused */
    PAUSED: "PAUSED",
    /** Progress was cancelled */
    CANCELLED: "CANCELLED",
};
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
    VISIBLE: "VISIBLE",
    /** Progress bar is hidden */
    HIDDEN: "HIDDEN",
};
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
    VISIBLE: "VISIBLE",
    /** Panel is hidden */
    HIDDEN: "HIDDEN",
    /** Panel is collapsed */
    COLLAPSED: "COLLAPSED",
};
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
    VISIBLE: "VISIBLE",
    /** Button is hidden */
    HIDDEN: "HIDDEN",
};
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
    VISIBLE: "VISIBLE",
    /** Element is hidden */
    HIDDEN: "HIDDEN",
};
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
    PRIMARY: "BUTTON_STYLE_PRIMARY",
    /** Secondary button style */
    SECONDARY: "BUTTON_STYLE_SECONDARY",
    /** Success button style */
    SUCCESS: "BUTTON_STYLE_SUCCESS",
    /** Warning button style */
    WARNING: "BUTTON_STYLE_WARNING",
    /** Danger button style */
    DANGER: "BUTTON_STYLE_DANGER",
};
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
    ENABLED: "ENABLED",
    /** Button is disabled and non-interactive */
    DISABLED: "DISABLED",
    /** Button is in loading state */
    LOADING: "LOADING",
};
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
    ENABLED: "ENABLED",
    /** Button is disabled and non-interactive */
    DISABLED: "DISABLED",
    /** Button is in loading state */
    LOADING: "LOADING",
    /** Button is hidden */
    HIDDEN: "HIDDEN",
};
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
    ENABLED: "ENABLED",
    /** Button is disabled and non-interactive */
    DISABLED: "DISABLED",
    /** Button is in loading state */
    LOADING: "LOADING",
};
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
    PRIMARY: "CHIP_STYLE_PRIMARY",
    /** Secondary chip style */
    SECONDARY: "CHIP_STYLE_SECONDARY",
};
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
    ENABLED: "ENABLED",
    /** Chip is disabled and non-interactive */
    DISABLED: "DISABLED",
    /** Chip is in loading state */
    LOADING: "LOADING",
};
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
    DEFAULT: "DEFAULT",
    /** Bordered section style */
    BORDERED: "BORDERED",
    /** Highlighted section style */
    HIGHLIGHTED: "HIGHLIGHTED",
    /** Compact section style */
    COMPACT: "COMPACT",
};
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
    DEFAULT: "DEFAULT",
    /** Compact markdown styling */
    COMPACT: "COMPACT",
    /** Large markdown styling */
    LARGE: "LARGE",
};
//# sourceMappingURL=constants.js.map