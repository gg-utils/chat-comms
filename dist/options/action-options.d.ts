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
import type { AppSetSendErrorActionDataErrorKind, AppThemeName, CanvasContent, CanvasUpdateOperation, CommunicationProtocol_ChatAction, CommunicationProtocol_ErrorDiagnosticInfo, CommunicationProtocol_RecoveryHint, CoreConsoleLevel, ThemePreference } from "../types/index.js";
import type { CommunicationProtocol_FramerMotionAttributes, CommunicationProtocol_PanelEffect, CommunicationProtocol_PanelTransition, PanelBodyAspectRatio, PanelHeaderIcon } from "../types/animation.js";
import type { ButtonStyle, ChatButtonState, CommunicationProtocol_BaseActionOptions, CommunicationProtocol_BaseIdResolutionOptions, CommunicationProtocol_BaseProgressOptions, ContentWidth, MessageRole, PanelBodyType, PanelVisibilityState, ProtocolStreamingOptions } from "../types/common.js";
/**
 * Options for creating CHAT_ACTION_SEND_TEXT_MESSAGE actions
 *
 * Configures actions that simulate user text input within the chat interface.
 * These actions can be used to programmatically send messages as if typed by the user.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md - Send Text Message Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_SEND_TEXT_MESSAGE.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_SendTextMessageActionOptions
 */
export interface CommunicationProtocol_SendTextMessageActionOptions extends CommunicationProtocol_BaseActionOptions {
    /**
     * Text content to send as simulated user input
     * @required
     */
    text: string;
    /**
     * Role of the simulated message sender
     * @optional @default "USER"
     */
    role?: MessageRole;
}
/**
 * Options for creating CHAT_ACTION_CHOOSE_ACTIONABLE_CARD actions
 *
 * Configures actions that handle user selections from actionable card interfaces.
 * These actions are typically auto-generated when creating actionable cards.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md - Choose Card Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_ChooseActionableCardActionOptions
 */
export interface CommunicationProtocol_ChooseActionableCardActionOptions extends CommunicationProtocol_BaseActionOptions {
    /**
     * Content ID of the actionable cards this action targets
     * @required
     */
    content_id: string;
    /**
     * Value of the selected card
     * @required
     */
    selectedValue: string;
    /**
     * Title of the selected card
     * @required
     */
    selectedTitle: string;
    /**
     * Custom text to simulate as user input when card is selected
     * If not provided, uses card title and subtitle
     * @optional
     */
    simulated_user_message_text?: string;
}
/**
 * Options for creating CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP actions
 *
 * Configures actions that handle user selections from actionable chip interfaces.
 * These actions are typically auto-generated when creating actionable chips.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md - Choose Chip Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_ChooseActionableChipActionOptions
 */
export interface CommunicationProtocol_ChooseActionableChipActionOptions extends CommunicationProtocol_BaseActionOptions {
    /**
     * Content ID of the actionable chips this action targets
     * @required
     */
    content_id: string;
    /**
     * Value of the selected chip
     * @required
     */
    selectedValue: string;
    /**
     * Text of the selected chip
     * @required
     */
    selectedText: string;
    /**
     * Custom text to simulate as user input when chip is selected
     * If not provided, uses chip text
     * @optional
     */
    simulated_user_message_text?: string;
}
/**
 * Options for creating CHAT_ACTION_UPDATE_PROGRESS_BAR actions
 *
 * Configures actions that update progress bar states and values.
 * These actions allow dynamic modification of progress indicators.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md - Update Progress Bar Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_UPDATE_PROGRESS_BAR.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_UpdateProgressBarActionOptions
 */
export interface CommunicationProtocol_UpdateProgressBarActionOptions extends CommunicationProtocol_BaseActionOptions, CommunicationProtocol_BaseProgressOptions {
    /**
     * Content ID of the progress bar to update
     * @required
     */
    content_id: string;
}
/**
 * Options for creating CHAT_ACTION_UPDATE_BUTTON actions
 *
 * Configures actions that update button states and properties.
 * These actions allow dynamic modification of button appearance and behavior.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_BUTTON.md - Update Button Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_UPDATE_BUTTON.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_UpdateButtonActionOptions
 */
export interface CommunicationProtocol_UpdateButtonActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Content ID of the button to update
     * @required
     */
    content_id: string;
    /**
     * New button text
     * @optional
     */
    newButtonText?: string;
    /**
     * New button style
     * @optional
     */
    newButtonStyle?: ButtonStyle;
    /**
     * New button state
     * @optional
     */
    newButtonState?: ChatButtonState;
    /**
     * New button actions array
     * @optional
     */
    newButtonActions?: CommunicationProtocol_ChatAction[];
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating CHAT_ACTION_UPDATE_PANEL actions
 *
 * Enhanced configuration for updating existing panel content with comprehensive
 * animation support and new properties introduced in 2025-09-15 updates.
 * These actions allow dynamic modification of panel structure, content, and animations.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PANEL.md - Update Panel Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_ACTION_UPDATE_PANEL.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_UpdatePanelActionOptions
 */
export interface CommunicationProtocol_UpdatePanelActionOptions extends CommunicationProtocol_BaseActionOptions {
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Content ID of the panel to update
     * @required
     */
    content_id: string;
    /**
     * Named queue for content processing. Content in the same queue is processed
     * sequentially, but different queues run in parallel.
     * @required
     */
    content_queue: string;
    /**
     * Optional delay in ms AFTER this action wrapper finishes processing.
     * Controls inter-item timing within a content queue.
     * @optional
     */
    content_delay?: number;
    /**
     * New panel header icon - predefined icon or custom URL
     * @optional
     */
    panel_header_icon?: PanelHeaderIcon;
    /**
     * Favicon URL for website panels (captured from Firecrawl scrape metadata)
     * @optional
     */
    panel_header_favicon_url?: string;
    /**
     * New panel header text
     * @optional
     */
    panel_header_title?: string;
    /**
     * New panel header description
     * @optional
     */
    panel_header_description?: string;
    /**
     * New panel visibility state
     * @optional
     */
    panel_visibility?: PanelVisibilityState;
    /**
     * New panel body content type
     * @optional
     */
    panel_body_type?: PanelBodyType;
    /**
     * New panel body aspect ratio
     * @optional
     */
    panel_body_aspect_ratio?: PanelBodyAspectRatio;
    /**
     * New panel body content data
     * @optional
     */
    panel_body_data?: unknown;
    /**
     * Motion attributes for whole-panel scroll/transition updates.
     * @optional
     */
    panel_scrolling_framer_motion_attributes?: CommunicationProtocol_FramerMotionAttributes;
    /**
     * New panel animation transitions array
     * @optional
     */
    panel_transitions?: CommunicationProtocol_PanelTransition[];
    /**
     * New panel overlay effects array
     * Ambient/repeating visual effects applied to the panel
     * @optional
     */
    panel_effects?: CommunicationProtocol_PanelEffect[];
    /**
     * New panel streaming options
     * Controls how content is streamed to the client for smooth delivery
     * @optional
     */
    streaming_options?: ProtocolStreamingOptions;
}
/**
 * Options for creating CHAT_ACTION_BEGIN_SIMULATED_TURN actions
 *
 * Configures actions that begin a new simulated turn, scrolling the chat
 * and clearing the screen. This action has no additional parameters beyond
 * the base action options.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_BEGIN_SIMULATED_TURN.md - Begin Simulated Turn Action Specification
 *
 * @interface CommunicationProtocol_BeginSimulatedTurnActionOptions
 */
export interface CommunicationProtocol_BeginSimulatedTurnActionOptions extends CommunicationProtocol_BaseActionOptions {
}
/**
 * Options for creating CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE actions
 *
 * Configures actions that signal the UI that a content sequence has been
 * completed. The UI should prepare for the next sequence of contents,
 * with the next content displaying the assistant logo to visually
 * separate previous contents from the new logical unit.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md - Complete Content Sequence Action Specification
 *
 * @interface CommunicationProtocol_CompleteContentSequenceActionOptions
 */
export interface CommunicationProtocol_CompleteContentSequenceActionOptions extends CommunicationProtocol_BaseActionOptions {
}
/**
 * Options for creating CANVAS_ACTION_OPEN actions
 *
 * Configures actions that open and initialize canvas workspace.
 * These actions create new canvas documents for organizing canvas content.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_OPEN.md - Canvas Open Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CANVAS_ACTION_OPEN.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_CanvasOpenActionOptions
 */
export interface CommunicationProtocol_CanvasOpenActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Title for the canvas workspace
     * @required
     */
    canvasTitle: string;
    /**
     * Optional URL that makes the canvas title clickable, opening the URL when clicked
     * @optional
     */
    canvasTitleHref?: string;
    /**
     * Initial content to display in canvas
     * @optional
     * @default Omits pre-populated canvas rows when unset (empty contents).
     */
    canvasInitialContents?: CanvasContent[];
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating CANVAS_ACTION_CLOSE actions
 *
 * Configures actions that close canvas workspace by document ID.
 * These actions remove canvas from display and clean up resources.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_CLOSE.md - Canvas Close Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CANVAS_ACTION_CLOSE.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_CanvasCloseActionOptions
 */
export interface CommunicationProtocol_CanvasCloseActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * ID of the canvas document to close
     * @required
     */
    canvasDocumentId: string;
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating CANVAS_ACTION_UPDATE actions
 *
 * Configures actions that update canvas content and properties.
 * These actions support various update operations for dynamic canvas management.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_UPDATE.md - Canvas Update Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CANVAS_ACTION_UPDATE.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_CanvasUpdateActionOptions
 */
export interface CommunicationProtocol_CanvasUpdateActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * ID of the canvas document to update
     * @required
     */
    canvasDocumentId: string;
    /**
     * New title for the canvas workspace
     * @optional
     */
    canvasTitle?: string;
    /**
     * Optional URL that makes the canvas title clickable, opening the URL when clicked
     * @optional
     */
    canvasTitleHref?: string;
    /**
     * Type of update operation
     * @optional
     */
    canvasOperation?: CanvasUpdateOperation;
    /**
     * Content for SET_CONTENTS or APPEND_CONTENT operations
     * @optional
     */
    canvasContents?: CanvasContent[];
    /**
     * Target content ID for MODIFY_CONTENT or REMOVE_CONTENT operations
     * @optional
     */
    canvasContentId?: string;
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating APP_ACTION_SET_THEME actions
 *
 * Configures actions that change application theme.
 * These actions affect global application appearance and colors.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_SET_THEME.md - Set Theme Action Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/APP_ACTION_SET_THEME.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_SetThemeActionOptions
 */
export interface CommunicationProtocol_SetThemeActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Theme to set
     * @required
     */
    themeName: AppThemeName;
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating APP_ACTION_THREAD_LIST_REFRESH actions
 *
 * Configures actions that refresh the conversation thread list.
 * These actions trigger a reload of thread data from the backend.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md - Thread List Refresh Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/APP_ACTION_THREAD_LIST_REFRESH.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_ThreadListRefreshActionOptions
 */
export interface CommunicationProtocol_ThreadListRefreshActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating APP_ACTION_USER_PREFERENCE_UPDATE actions
 *
 * Configures actions that update user preferences and settings.
 * These actions support batch updates of multiple preference values.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md - User Preference Update Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/APP_ACTION_USER_PREFERENCE_UPDATE.md - Builder-oriented examples supplementing the normative specification
 *
 * @interface CommunicationProtocol_UserPreferenceUpdateActionOptions
 */
export interface CommunicationProtocol_UserPreferenceUpdateActionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
    /**
     * Object containing preference key-value pairs to update
     * @required
     */
    preferenceUpdates: {
        /** Whether notifications are enabled */
        notificationsEnabled?: boolean;
        /** Default language preference */
        defaultLanguage?: string;
        /** Theme preference */
        themePreference?: ThemePreference;
        /** Chat-related preferences */
        chatPreferences?: {
            /** Show typing indicators */
            showTypingIndicators?: boolean;
            /** Enable sound notifications */
            enableSoundNotifications?: boolean;
            /** Auto-scroll to new messages */
            autoScrollToNewMessages?: boolean;
        };
        /** Canvas-related preferences */
        canvasPreferences?: {
            /** Default canvas theme */
            defaultCanvasTheme?: ThemePreference;
            /** Auto-save interval in minutes */
            autoSaveIntervalMinutes?: number;
        };
        /** Accessibility preferences */
        accessibilityPreferences?: {
            /** High contrast mode */
            highContrastMode?: boolean;
            /** Font size multiplier */
            fontSizeMultiplier?: number;
            /** Screen reader optimizations */
            screenReaderOptimizations?: boolean;
        };
    };
    /**
     * Internal parameter passed from builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Options for creating APP_ACTION_SET_INPUT_PLACEHOLDER actions
 *
 * Configures actions that set placeholder text in the chat input field.
 * These actions provide contextual hints to guide user input.
 *
 * @interface CommunicationProtocol_SetInputPlaceholderActionOptions
 */
export interface CommunicationProtocol_SetInputPlaceholderActionOptions {
    /**
     * Placeholder text to display in the chat input field
     * @required
     */
    placeholder: string;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
}
/**
 * Options for creating APP_ACTION_SET_SEND_ERROR actions
 *
 * Configures a shared structured error surface for protocol-emitted known failures
 * and system failures that should appear in the chat UI.
 *
 * @interface CommunicationProtocol_SetSendErrorActionOptions
 */
export interface CommunicationProtocol_SetSendErrorActionOptions {
    /**
     * Structured error classification
     * @required
     */
    error_kind: AppSetSendErrorActionDataErrorKind;
    /**
     * User-facing error message
     * @required
     */
    message: string;
    /**
     * Optional recovery hints rendered as actions in the UI
     * @optional
     */
    recovery_hints?: CommunicationProtocol_RecoveryHint[];
    /**
     * Optional sanitized diagnostics metadata
     * @optional
     */
    diagnostics?: CommunicationProtocol_ErrorDiagnosticInfo;
    /**
     * Auto-generated action ID suffix (prefixed with message ID)
     * Creates IDs in format: {messageId}-action-{autoId}
     * @optional
     */
    action_id_suffix?: string;
}
/**
 * Shared queue placement options for message-builder helpers that emit an action
 * inside `CHAT_CONTENT_ACTION_WRAPPER`.
 */
export interface CommunicationProtocol_WrappedActionMessageOptions {
    /**
     * Named queue for content processing. Content in the same queue is processed
     * sequentially, but different queues run in parallel.
     */
    content_queue: string;
    /**
     * Optional delay in ms AFTER this action wrapper finishes processing.
     * Controls inter-item timing within a content queue.
     * @optional
     */
    content_delay?: number;
}
/** Message-builder options for wrapping `CHAT_ACTION_UPDATE_BUTTON`. */
export type CommunicationProtocol_UpdateButtonMessageOptions = Omit<CommunicationProtocol_UpdateButtonActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `CHAT_ACTION_UPDATE_PANEL`. */
export type CommunicationProtocol_UpdatePanelMessageOptions = Omit<CommunicationProtocol_UpdatePanelActionOptions, "message_id">;
/** Message-builder options for wrapping `CANVAS_ACTION_OPEN`. */
export type CommunicationProtocol_CanvasOpenMessageOptions = Omit<CommunicationProtocol_CanvasOpenActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `CANVAS_ACTION_UPDATE`. */
export type CommunicationProtocol_CanvasUpdateMessageOptions = Omit<CommunicationProtocol_CanvasUpdateActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `CANVAS_ACTION_CLOSE`. */
export type CommunicationProtocol_CanvasCloseMessageOptions = Omit<CommunicationProtocol_CanvasCloseActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `APP_ACTION_SET_THEME`. */
export type CommunicationProtocol_SetThemeMessageOptions = Omit<CommunicationProtocol_SetThemeActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `APP_ACTION_CORE_CONSOLE`. */
export interface CommunicationProtocol_CoreConsoleActionOptions extends CommunicationProtocol_WrappedActionMessageOptions {
    /** Full action ID; if provided, action_id_suffix is ignored. */
    action_id?: string;
    /** Auto-generated action ID suffix (prefixed with message ID). */
    action_id_suffix?: string;
    /** Log level that determines console method and styling in consumers. */
    level: CoreConsoleLevel;
    /** Human-readable diagnostic line. */
    message: string;
    /** Optional JSON-serializable payload displayed as expandable detail. */
    payload?: unknown;
    /** Optional ISO 8601 timestamp; defaults to current time in builders. */
    timestamp?: string;
    /** Optional source identifier such as a pipeline or subsystem name. */
    source?: string;
}
/** Message-builder options for wrapping `APP_ACTION_SET_INPUT_PLACEHOLDER`. */
export type CommunicationProtocol_SetInputPlaceholderMessageOptions = CommunicationProtocol_SetInputPlaceholderActionOptions & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `APP_ACTION_SET_SEND_ERROR`. */
export type CommunicationProtocol_SetSendErrorMessageOptions = CommunicationProtocol_SetSendErrorActionOptions & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `APP_ACTION_THREAD_LIST_REFRESH`. */
export type CommunicationProtocol_ThreadListRefreshMessageOptions = Omit<CommunicationProtocol_ThreadListRefreshActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/** Message-builder options for wrapping `APP_ACTION_USER_PREFERENCE_UPDATE`. */
export type CommunicationProtocol_UserPreferenceUpdateMessageOptions = Omit<CommunicationProtocol_UserPreferenceUpdateActionOptions, "message_id"> & CommunicationProtocol_WrappedActionMessageOptions;
/**
 * Options for creating card selection actions
 */
export interface CommunicationProtocol_CreateCardActionOptions {
    /** Message ID for context */
    messageId: string;
    /** Content auto-ID that this action targets */
    content_id_suffix: string;
    /** Action auto-ID suffix */
    action_id_suffix: string;
    /** Value when this card is selected */
    selectedValue: string;
    /** Title when this card is selected */
    selectedTitle: string;
    /** Optional simulated user message */
    simulated_user_message_text?: string;
}
/**
 * Options for creating chip selection actions
 */
export interface CommunicationProtocol_CreateChipActionOptions {
    /** Message ID for context */
    messageId: string;
    /** Content auto-ID that this action targets */
    content_id_suffix: string;
    /** Action auto-ID suffix */
    action_id_suffix: string;
    /** Value when this chip is selected */
    selectedValue: string;
    /** Text when this chip is selected */
    selectedText: string;
    /** Optional simulated user message */
    simulated_user_message_text?: string;
}
/**
 * Options for updating progress bars via helper methods
 */
export interface CommunicationProtocol_UpdateProgressBarOptions extends CommunicationProtocol_BaseProgressOptions, CommunicationProtocol_BaseIdResolutionOptions {
    /** Auto-generated action wrapper ID suffix */
    content_id_suffix?: string;
    /** Full content ID of progress bar to update */
    content_id?: string;
    /** Auto-generated content ID of progress bar to update (alternative to content_id) */
    targetAutoId?: string;
    /** Width behavior for content rendering */
    content_width?: ContentWidth;
    /**
     * Named queue for content processing. Content in the same queue is processed
     * sequentially, but different queues run in parallel.
     */
    content_queue: string;
    /**
     * Optional delay in ms AFTER this action wrapper finishes processing.
     * Controls inter-item timing within a content queue.
     * @optional
     */
    content_delay?: number;
}
//# sourceMappingURL=action-options.d.ts.map