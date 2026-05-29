/**
 * Canonical fence language for protocol fenced-JSON stream transport.
 * Only lowercase `json` is supported. `javascript`, `js`, and uppercase `JSON`
 * are unsupported aliases that strict validation rejects.
 */
export declare const PROTOCOL_FENCE_LANGUAGE: "json";
export declare const PROTOCOL_MESSAGE_ROLES: {
    readonly PROTOCOL_MESSAGE_ROLE_USER: "USER";
    readonly PROTOCOL_MESSAGE_ROLE_ASSISTANT: "ASSISTANT";
};
export declare const PROTOCOL_MESSAGE_TARGETS: {
    readonly PROTOCOL_MESSAGE_TARGET_CHAT: "CHAT";
};
export declare const PROTOCOL_ACTION_TARGETS: {
    readonly PROTOCOL_ACTION_TARGET_CHAT: "CHAT";
    readonly PROTOCOL_ACTION_TARGET_CANVAS: "CANVAS";
    readonly PROTOCOL_ACTION_TARGET_APP: "APP";
};
export declare const PROTOCOL_WAIT_MODES: {
    readonly PROTOCOL_WAIT_MODE_DRAIN: "DRAIN";
    readonly PROTOCOL_WAIT_MODE_IDLE: "IDLE";
    readonly PROTOCOL_WAIT_MODE_CONTENT_IDS: "CONTENT_IDS";
};
export declare const PROTOCOL_QUEUE_NAMES: {
    readonly PROTOCOL_QUEUE_NAME_MAIN: "main";
};
export declare const PROTOCOL_CHAT_CONTENT_TYPES: readonly ["CHAT_CONTENT_MARKDOWN", "CHAT_CONTENT_BUTTON", "CHAT_CONTENT_ACTIONABLE_CARDS", "CHAT_CONTENT_ACTIONABLE_CHIPS", "CHAT_CONTENT_ACTION_WRAPPER", "CHAT_CONTENT_PROGRESS_BAR", "CHAT_CONTENT_PANEL"];
export declare const PROTOCOL_CANVAS_CONTENT_TYPES: readonly ["CANVAS_CONTENT_MARKDOWN", "CANVAS_CONTENT_SECTION", "CANVAS_CONTENT_HTML"];
export declare const PROTOCOL_CHAT_ACTION_TYPES: readonly ["CHAT_ACTION_SEND_TEXT_MESSAGE", "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD", "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP", "CHAT_ACTION_UPDATE_BUTTON", "CHAT_ACTION_UPDATE_PROGRESS_BAR", "CHAT_ACTION_WAIT_FOR_QUEUES", "CHAT_ACTION_UPDATE_PANEL", "CHAT_ACTION_BEGIN_SIMULATED_TURN", "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE"];
export declare const PROTOCOL_CANVAS_ACTION_TYPES: readonly ["CANVAS_ACTION_OPEN", "CANVAS_ACTION_CLOSE", "CANVAS_ACTION_UPDATE"];
export declare const PROTOCOL_APP_ACTION_TYPES: readonly ["APP_ACTION_SET_THEME", "APP_ACTION_THREAD_LIST_REFRESH", "APP_ACTION_USER_PREFERENCE_UPDATE", "APP_ACTION_CORE_CONSOLE", "APP_ACTION_SET_INPUT_PLACEHOLDER", "APP_ACTION_WAIT_FOR_USER_INPUT", "APP_ACTION_SET_SEND_ERROR"];
/**
 * Message Type Constants
 *
 * Constants for all message types supported by the communication protocol.
 * Currently only CHAT_MESSAGE is implemented, but this provides a foundation
 * for future message types.
 */
export declare const MESSAGE_TYPES: {
    /** Chat message type for conversational interactions */
    readonly CHAT_MESSAGE: "CHAT_MESSAGE";
};
/**
 * Message Role Constants
 *
 * Constants for message sender roles in chat communications.
 */
export declare const MESSAGE_ROLES: {
    /** Human-originated message */
    readonly USER: "USER";
    /** AI Assistant-originated message */
    readonly ASSISTANT: "ASSISTANT";
    /** Automated system message */
    readonly SYSTEM: "SYSTEM";
};
/**
 * Message Target Constants
 *
 * Constants for message target interfaces.
 */
export declare const MESSAGE_TARGETS: {
    /** Chat interface target */
    readonly CHAT: "CHAT";
    /** Canvas interface target */
    readonly CANVAS: "CANVAS";
    /** Application-level target */
    readonly APP: "APP";
};
/**
 * Chat Content Type Constants
 *
 * Type-safe constants for all CHAT_CONTENT types. These determine the structure
 * of content_data and the available functionality for each content type.
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - CHAT_CONTENT Specification
 */
export declare const CHAT_CONTENT_TYPES: {
    /** Rich text with markdown formatting */
    readonly CHAT_CONTENT_MARKDOWN: "CHAT_CONTENT_MARKDOWN";
    /** Interactive buttons */
    readonly CHAT_CONTENT_BUTTON: "CHAT_CONTENT_BUTTON";
    /** Card-based selection interfaces */
    readonly CHAT_CONTENT_ACTIONABLE_CARDS: "CHAT_CONTENT_ACTIONABLE_CARDS";
    /** Small action buttons and tags */
    readonly CHAT_CONTENT_ACTIONABLE_CHIPS: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    /** Wrapper for actionable content elements */
    readonly CHAT_CONTENT_ACTION_WRAPPER: "CHAT_CONTENT_ACTION_WRAPPER";
    /** Progress indicators and status bars */
    readonly CHAT_CONTENT_PROGRESS_BAR: "CHAT_CONTENT_PROGRESS_BAR";
    /** Structured panels with headers */
    readonly CHAT_CONTENT_PANEL: "CHAT_CONTENT_PANEL";
};
/**
 * Chat Action Type Constants
 *
 * Type-safe constants for all CHAT_ACTION types. These determine the structure
 * of action_data and the behavior when the action is executed.
 *
 * @see docs/communication-protocol/specialized-structures/CHAT_ACTION.md - CHAT_ACTION Specification
 */
export declare const CHAT_ACTION_TYPES: {
    /** Simulate user text input */
    readonly CHAT_ACTION_SEND_TEXT_MESSAGE: "CHAT_ACTION_SEND_TEXT_MESSAGE";
    /** Handle user card selections */
    readonly CHAT_ACTION_CHOOSE_ACTIONABLE_CARD: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
    /** Handle user chip selections */
    readonly CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
    /** Update button states */
    readonly CHAT_ACTION_UPDATE_BUTTON: "CHAT_ACTION_UPDATE_BUTTON";
    /** Update progress bar values and states */
    readonly CHAT_ACTION_UPDATE_PROGRESS_BAR: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
    /** Block current queue until specified content queues drain */
    readonly CHAT_ACTION_WAIT_FOR_QUEUES: "CHAT_ACTION_WAIT_FOR_QUEUES";
    /** Update panel headers and content */
    readonly CHAT_ACTION_UPDATE_PANEL: "CHAT_ACTION_UPDATE_PANEL";
    /** Begin a new simulated turn, scrolling the chat and clearing the screen */
    readonly CHAT_ACTION_BEGIN_SIMULATED_TURN: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
    /** Signal content sequence completion, preparing UI for new logical unit with assistant logo */
    readonly CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
};
/**
 * Canvas Content Type Constants
 *
 * Type-safe constants for all CANVAS_CONTENT types. These determine the structure
 * of content_data for canvas-specific content elements.
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_CONTENT.md - CANVAS_CONTENT Specification
 */
export declare const CANVAS_CONTENT_TYPES: {
    /** Rich text with markdown formatting for canvas */
    readonly CANVAS_CONTENT_MARKDOWN: "CANVAS_CONTENT_MARKDOWN";
    /** Structured sections with collapsible headers */
    readonly CANVAS_CONTENT_SECTION: "CANVAS_CONTENT_SECTION";
    /** Raw HTML content for canvas (no sanitization at protocol level) */
    readonly CANVAS_CONTENT_HTML: "CANVAS_CONTENT_HTML";
};
/**
 * Canvas Action Type Constants
 *
 * Type-safe constants for all CANVAS_ACTION types. These determine the structure
 * of action_data for canvas-specific operations.
 *
 * @see docs/communication-protocol/specialized-structures/CANVAS_ACTION.md - CANVAS_ACTION Specification
 */
export declare const CANVAS_ACTION_TYPES: {
    /** Open and initialize canvas workspace */
    readonly CANVAS_ACTION_OPEN: "CANVAS_ACTION_OPEN";
    /** Close canvas workspace */
    readonly CANVAS_ACTION_CLOSE: "CANVAS_ACTION_CLOSE";
    /** Update canvas content */
    readonly CANVAS_ACTION_UPDATE: "CANVAS_ACTION_UPDATE";
};
/**
 * App Action Type Constants
 *
 * Type-safe constants for all APP_ACTION types. These determine the structure
 * of action_data for application-level operations.
 *
 * @see docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 */
export declare const APP_ACTION_TYPES: {
    /** Change application theme */
    readonly APP_ACTION_SET_THEME: "APP_ACTION_SET_THEME";
    /** Refresh conversation thread list */
    readonly APP_ACTION_THREAD_LIST_REFRESH: "APP_ACTION_THREAD_LIST_REFRESH";
    /** Update user preferences and settings */
    readonly APP_ACTION_USER_PREFERENCE_UPDATE: "APP_ACTION_USER_PREFERENCE_UPDATE";
    /** Stream core debug logs to the client console */
    readonly APP_ACTION_CORE_CONSOLE: "APP_ACTION_CORE_CONSOLE";
    /** Set the chat input placeholder text */
    readonly APP_ACTION_SET_INPUT_PLACEHOLDER: "APP_ACTION_SET_INPUT_PLACEHOLDER";
    /** Pause message progression and wait for explicit user interaction */
    readonly APP_ACTION_WAIT_FOR_USER_INPUT: "APP_ACTION_WAIT_FOR_USER_INPUT";
    /** Set the structured send-error state in the client */
    readonly APP_ACTION_SET_SEND_ERROR: "APP_ACTION_SET_SEND_ERROR";
};
/**
 * Panel Body Type Constants
 *
 * Type-safe constants for all PANEL_BODY types. These determine the structure
 * of panel_body_data within CHAT_CONTENT_PANEL elements.
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - Panel Content Specification
 */
export declare const PANEL_BODY_TYPES: {
    /** Markdown text content */
    readonly PANEL_BODY_MARKDOWN: "PANEL_BODY_MARKDOWN";
    /** Reasoning markdown V1 - headerless, content-focused presentation */
    readonly PANEL_BODY_REASONING_V1_MARKDOWN: "PANEL_BODY_REASONING_V1_MARKDOWN";
    /** Reasoning markdown V2 - header shows progress messages, body accumulates content */
    readonly PANEL_BODY_REASONING_V2_MARKDOWN: "PANEL_BODY_REASONING_V2_MARKDOWN";
    /** Image content with positioning options */
    readonly PANEL_BODY_IMAGE: "PANEL_BODY_IMAGE";
    /** Actionable cards within panel */
    readonly PANEL_BODY_ACTIONABLE_CARDS: "PANEL_BODY_ACTIONABLE_CARDS";
    /** Actionable chips within panel */
    readonly PANEL_BODY_ACTIONABLE_CHIPS: "PANEL_BODY_ACTIONABLE_CHIPS";
    /** Google Search home interface */
    readonly PANEL_BODY_GOOGLE_SEARCH_HOME: "PANEL_BODY_GOOGLE_SEARCH_HOME";
    /** Google Search results display */
    readonly PANEL_BODY_GOOGLE_SEARCH_RESULT: "PANEL_BODY_GOOGLE_SEARCH_RESULT";
    /** Google Maps location search */
    readonly PANEL_BODY_GOOGLE_MAPS_HOME: "PANEL_BODY_GOOGLE_MAPS_HOME";
    /** Google Maps reviews display */
    readonly PANEL_BODY_GOOGLE_MAPS_REVIEWS: "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
    /** ChatGPT query interface */
    readonly PANEL_BODY_CHATGPT_HOME: "PANEL_BODY_CHATGPT_HOME";
    /** ChatGPT response display */
    readonly PANEL_BODY_CHATGPT_RESULT: "PANEL_BODY_CHATGPT_RESULT";
    /** Gemini query interface */
    readonly PANEL_BODY_GEMINI_HOME: "PANEL_BODY_GEMINI_HOME";
    /** Gemini response display */
    readonly PANEL_BODY_GEMINI_RESULT: "PANEL_BODY_GEMINI_RESULT";
    /** Perplexity query interface */
    readonly PANEL_BODY_PERPLEXITY_HOME: "PANEL_BODY_PERPLEXITY_HOME";
    /** Perplexity response display */
    readonly PANEL_BODY_PERPLEXITY_RESULT: "PANEL_BODY_PERPLEXITY_RESULT";
};
/**
 * Content Width Constants
 *
 * Type-safe constants for content width behavior in UI rendering.
 */
export declare const CONTENT_WIDTH: {
    /** Auto-size to content */
    readonly WIDTH_AUTO: "WIDTH_AUTO";
    /** Full width of container */
    readonly WIDTH_FULL: "WIDTH_FULL";
};
/**
 * Actionable Card Selection Mode Constants
 *
 * Type-safe constants for selection behavior specific to actionable cards.
 * Independent from chip selection modes to allow future divergence.
 */
export declare const ACTIONABLE_CARD_SELECTION_MODES: {
    /** Only one card can be selected */
    readonly SINGLE: "SINGLE";
    /** Multiple cards can be selected */
    readonly MULTIPLE: "MULTIPLE";
};
/**
 * Actionable Card Selection State Constants
 *
 * Type-safe constants for current selection state specific to actionable cards.
 * Independent from chip selection states to allow future divergence.
 */
export declare const ACTIONABLE_CARD_SELECTION_STATES: {
    /** Awaiting user selection */
    readonly PENDING_SELECTION: "PENDING_SELECTION";
    /** User has made a selection */
    readonly SELECTED: "SELECTED";
    /** Selection has been cleared */
    readonly UNSELECTED: "UNSELECTED";
};
/**
 * Actionable Chip Selection Mode Constants
 *
 * Type-safe constants for selection behavior specific to actionable chips.
 * Independent from card selection modes to allow future divergence.
 */
export declare const ACTIONABLE_CHIP_SELECTION_MODES: {
    /** Only one chip can be selected */
    readonly SINGLE: "SINGLE";
    /** Multiple chips can be selected */
    readonly MULTIPLE: "MULTIPLE";
};
/**
 * Actionable Chip Selection State Constants
 *
 * Type-safe constants for current selection state specific to actionable chips.
 * Independent from card selection states to allow future divergence.
 */
export declare const ACTIONABLE_CHIP_SELECTION_STATES: {
    /** Awaiting user selection */
    readonly PENDING_SELECTION: "PENDING_SELECTION";
    /** User has made a selection */
    readonly SELECTED: "SELECTED";
    /** Selection is disabled */
    readonly DISABLED: "DISABLED";
};
/**
 * Progress Bar State Constants
 *
 * Type-safe constants for progress bar states.
 */
export declare const PROGRESS_BAR_STATES: {
    /** Progress is ongoing */
    readonly IN_PROGRESS: "IN_PROGRESS";
    /** Progress is completed */
    readonly COMPLETED: "COMPLETED";
    /** Progress ended with an error */
    readonly ERROR: "ERROR";
    /** Progress is paused */
    readonly PAUSED: "PAUSED";
    /** Progress was cancelled */
    readonly CANCELLED: "CANCELLED";
};
/**
 * Progress Bar Visibility State Constants
 *
 * Type-safe constants for progress bar visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export declare const PROGRESS_BAR_VISIBILITY_STATES: {
    /** Progress bar is visible */
    readonly VISIBLE: "VISIBLE";
    /** Progress bar is hidden */
    readonly HIDDEN: "HIDDEN";
};
/**
 * Panel Visibility State Constants
 *
 * Type-safe constants for panel visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export declare const PANEL_VISIBILITY_STATES: {
    /** Panel is visible */
    readonly VISIBLE: "VISIBLE";
    /** Panel is hidden */
    readonly HIDDEN: "HIDDEN";
    /** Panel is collapsed */
    readonly COLLAPSED: "COLLAPSED";
};
/**
 * Button Visibility State Constants
 *
 * Type-safe constants for button visibility states.
 * Independent from other visibility types to allow future divergence.
 */
export declare const BUTTON_VISIBILITY_STATES: {
    /** Button is visible */
    readonly VISIBLE: "VISIBLE";
    /** Button is hidden */
    readonly HIDDEN: "HIDDEN";
};
/**
 * Visibility State Constants (deprecated)
 *
 * @deprecated Use PROGRESS_BAR_VISIBILITY_STATES, PANEL_VISIBILITY_STATES, or BUTTON_VISIBILITY_STATES instead
 */
export declare const VISIBILITY_STATES: {
    /** Element is visible */
    readonly VISIBLE: "VISIBLE";
    /** Element is hidden */
    readonly HIDDEN: "HIDDEN";
};
/**
 * Button Style Constants
 *
 * Type-safe constants for button visual styles.
 */
export declare const BUTTON_STYLES: {
    /** Primary button style */
    readonly PRIMARY: "BUTTON_STYLE_PRIMARY";
    /** Secondary button style */
    readonly SECONDARY: "BUTTON_STYLE_SECONDARY";
    /** Success button style */
    readonly SUCCESS: "BUTTON_STYLE_SUCCESS";
    /** Warning button style */
    readonly WARNING: "BUTTON_STYLE_WARNING";
    /** Danger button style */
    readonly DANGER: "BUTTON_STYLE_DANGER";
};
/**
 * Chat Button State Constants
 *
 * Type-safe constants for chat interface button interaction states.
 * Independent from other button types to allow future divergence.
 */
export declare const CHAT_BUTTON_STATES: {
    /** Button is enabled and interactive */
    readonly ENABLED: "ENABLED";
    /** Button is disabled and non-interactive */
    readonly DISABLED: "DISABLED";
    /** Button is in loading state */
    readonly LOADING: "LOADING";
};
/**
 * Panel Button State Constants
 *
 * Type-safe constants for panel interface button interaction states.
 * Independent from other button types to allow future divergence.
 */
export declare const PANEL_BUTTON_STATES: {
    /** Button is enabled and interactive */
    readonly ENABLED: "ENABLED";
    /** Button is disabled and non-interactive */
    readonly DISABLED: "DISABLED";
    /** Button is in loading state */
    readonly LOADING: "LOADING";
    /** Button is hidden */
    readonly HIDDEN: "HIDDEN";
};
/**
 * Button State Constants (deprecated)
 *
 * @deprecated Use CHAT_BUTTON_STATES or PANEL_BUTTON_STATES instead
 */
export declare const BUTTON_STATES: {
    /** Button is enabled and interactive */
    readonly ENABLED: "ENABLED";
    /** Button is disabled and non-interactive */
    readonly DISABLED: "DISABLED";
    /** Button is in loading state */
    readonly LOADING: "LOADING";
};
/**
 * Chip Style Constants
 *
 * Type-safe constants for chip visual styles.
 */
export declare const CHIP_STYLES: {
    /** Primary chip style */
    readonly PRIMARY: "CHIP_STYLE_PRIMARY";
    /** Secondary chip style */
    readonly SECONDARY: "CHIP_STYLE_SECONDARY";
};
/**
 * Chip State Constants
 *
 * Type-safe constants for chip interaction states.
 * Independent from button states to allow future divergence.
 */
export declare const CHIP_STATES: {
    /** Chip is enabled and interactive */
    readonly ENABLED: "ENABLED";
    /** Chip is disabled and non-interactive */
    readonly DISABLED: "DISABLED";
    /** Chip is in loading state */
    readonly LOADING: "LOADING";
};
/**
 * Section Style Constants
 *
 * Type-safe constants for canvas section visual styles.
 * Controls layout and appearance of section containers.
 */
export declare const SECTION_STYLES: {
    /** Default section style */
    readonly DEFAULT: "DEFAULT";
    /** Bordered section style */
    readonly BORDERED: "BORDERED";
    /** Highlighted section style */
    readonly HIGHLIGHTED: "HIGHLIGHTED";
    /** Compact section style */
    readonly COMPACT: "COMPACT";
};
/**
 * Markdown Style Constants
 *
 * Type-safe constants for markdown content visual styles.
 */
export declare const MARKDOWN_STYLES: {
    /** Default markdown styling */
    readonly DEFAULT: "DEFAULT";
    /** Compact markdown styling */
    readonly COMPACT: "COMPACT";
    /** Large markdown styling */
    readonly LARGE: "LARGE";
};
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
export type ActionableCardSelectionMode = (typeof ACTIONABLE_CARD_SELECTION_MODES)[keyof typeof ACTIONABLE_CARD_SELECTION_MODES];
/**
 * Union type of all actionable card selection state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - CHAT_CONTENT_ACTIONABLE_CARDS Specification
 */
export type ActionableCardSelectionState = (typeof ACTIONABLE_CARD_SELECTION_STATES)[keyof typeof ACTIONABLE_CARD_SELECTION_STATES];
/**
 * Union type of all actionable chip selection mode values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionMode = (typeof ACTIONABLE_CHIP_SELECTION_MODES)[keyof typeof ACTIONABLE_CHIP_SELECTION_MODES];
/**
 * Union type of all actionable chip selection state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionState = (typeof ACTIONABLE_CHIP_SELECTION_STATES)[keyof typeof ACTIONABLE_CHIP_SELECTION_STATES];
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
export type ProgressBarVisibilityState = (typeof PROGRESS_BAR_VISIBILITY_STATES)[keyof typeof PROGRESS_BAR_VISIBILITY_STATES];
/**
 * Union type of all panel visibility state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelVisibilityState = (typeof PANEL_VISIBILITY_STATES)[keyof typeof PANEL_VISIBILITY_STATES];
/**
 * Union type of all button visibility state values
 *
 * @see docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ButtonVisibilityState = (typeof BUTTON_VISIBILITY_STATES)[keyof typeof BUTTON_VISIBILITY_STATES];
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
//# sourceMappingURL=constants.d.ts.map