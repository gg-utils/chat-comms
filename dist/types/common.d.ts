/**
 * @fileoverview Shared enums, panel body unions, streaming knobs, and base option shapes for the communication protocol.
 *
 * Flow: canonical literals here -> specialized types, builders, and validators import these contracts without duplication.
 *
 * @example
 * ```typescript
 * import type { MessageRole } from "./common.js";
 *
 * const role: MessageRole = "ASSISTANT";
 * void role;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_PanelEffect, CommunicationProtocol_PanelTransition, PanelBodyAspectRatio, PanelHeaderIcon } from "./animation.js";
/**
 * Base interface for ID resolution options
 *
 * Standard pattern used across all builders for content and action ID generation.
 * Provides flexibility between explicit IDs and auto-generated IDs with message context.
 *
 * @interface CommunicationProtocol_BaseIdResolutionOptions
 */
export interface CommunicationProtocol_BaseIdResolutionOptions {
    /**
     * Auto-generated ID suffix (prefixed with message/context ID)
     * Creates IDs in format: {contextId}-{type}-{autoId}
     * @optional
     */
    content_id_suffix?: string;
    /**
     * Internal parameter passed from parent builder for auto-ID generation
     * Should not be set manually when using builder pattern
     * @internal
     */
    message_id?: string;
}
/**
 * Content ID resolution options
 *
 * Extends base pattern with content-specific ID resolution.
 * Used by all content builders for consistent ID management.
 *
 * @interface CommunicationProtocol_ContentIdResolutionOptions
 */
export interface CommunicationProtocol_ContentIdResolutionOptions extends CommunicationProtocol_BaseIdResolutionOptions {
    /**
     * Full content ID - if provided, autoId is ignored
     * Use when you need a specific, predefined content identifier
     * @optional
     */
    content_id?: string;
}
/**
 * Action ID resolution options
 *
 * Extends base pattern with action-specific ID resolution.
 * Used by all action builders for consistent ID management.
 *
 * @interface CommunicationProtocol_ActionIdResolutionOptions
 */
export interface CommunicationProtocol_ActionIdResolutionOptions extends CommunicationProtocol_BaseIdResolutionOptions {
    /**
     * Full action ID - if provided, autoId is ignored
     * Use when you need a specific, predefined action identifier
     * @optional
     */
    action_id?: string;
}
/**
 * Wire-protocol message roles for the shared protocol contract.
 *
 * Only `USER` and `ASSISTANT` are canonical wire roles. `SYSTEM` is a core-internal
 * producer/context role that is rejected by strict protocol validation.
 *
 * @type ProtocolWireMessageRole
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE Base Structure
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 */
export type ProtocolWireMessageRole = "USER" | "ASSISTANT";
/**
 * Message role types (includes core-internal SYSTEM role)
 *
 * Standard roles for message senders across the communication protocol.
 * For strict protocol wire validation, use `ProtocolWireMessageRole` which
 * excludes `SYSTEM`. The `SYSTEM` role is core-internal and should not appear
 * in protocol messages sent to consumers.
 *
 * @type MessageRole
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/MESSAGE.md - MESSAGE Base Structure
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE Specification
 */
export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";
/**
 * Content width behavior types
 *
 * Standard width behaviors for content rendering across all content types.
 * Provides consistent layout control throughout the protocol.
 *
 * @type ContentWidth
 * @see @gg-utils/chat-comms/docs/communication-protocol/base-structures/CONTENT.md - CONTENT Base Structure
 */
export type ContentWidth = "WIDTH_AUTO" | "WIDTH_FULL";
/**
 * Runtime validator for content queue values used at producer boundaries.
 */
export declare function CommunicationProtocol_validatestring(options: {
    contentQueue: string;
    context?: string;
}): string;
/**
 * Actionable Card Selection Mode
 *
 * Selection behaviors specific to actionable cards.
 * Independent from other selection types to allow future divergence.
 *
 * @type ActionableCardSelectionMode
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - CHAT_CONTENT_ACTIONABLE_CARDS Specification
 */
export type ActionableCardSelectionMode = "SINGLE" | "MULTIPLE";
/**
 * Actionable Card Selection State
 *
 * Selection states specific to actionable cards.
 * Independent from other selection types to allow future divergence.
 *
 * @type ActionableCardSelectionState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - CHAT_CONTENT_ACTIONABLE_CARDS Specification
 */
export type ActionableCardSelectionState = "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
/**
 * Actionable Chip Selection Mode
 *
 * Selection behaviors specific to actionable chips.
 * Independent from other selection types to allow future divergence.
 *
 * @type ActionableChipSelectionMode
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionMode = "SINGLE" | "MULTIPLE";
/**
 * Actionable Chip Selection State
 *
 * Selection states specific to actionable chips.
 * Independent from other selection types to allow future divergence.
 *
 * @type ActionableChipSelectionState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ActionableChipSelectionState = "PENDING_SELECTION" | "SELECTED" | "DISABLED";
/**
 * Progress bar state types
 *
 * Standard states for progress indicators throughout the protocol.
 * Never automatically determined from percentage values - must be explicitly set.
 *
 * @type ProgressBarState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PROGRESS_BAR.md - CHAT_CONTENT_PROGRESS_BAR Specification
 */
export type ProgressBarState = "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED";
/**
 * Progress Bar Visibility State
 *
 * Visibility states specific to progress bar elements.
 * Independent from other visibility types to allow future divergence.
 *
 * @type ProgressBarVisibilityState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PROGRESS_BAR.md - CHAT_CONTENT_PROGRESS_BAR Specification
 */
export type ProgressBarVisibilityState = "VISIBLE" | "HIDDEN";
/**
 * Panel Visibility State
 *
 * Visibility states specific to panel elements.
 * Independent from other visibility types to allow future divergence.
 *
 * @type PanelVisibilityState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelVisibilityState = "VISIBLE" | "HIDDEN" | "COLLAPSED";
/**
 * Manual Chunking Streaming Options (Mode 1)
 *
 * Explicit control over streaming behavior using chunk interval and size.
 *
 * @interface ProtocolStreamingOptions_ManualChunking
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md
 */
export interface ProtocolStreamingOptions_ManualChunking {
    /**
     * Time interval in milliseconds between each streamed chunk.
     * Lower values create smoother streaming.
     */
    chunkInterval: number;
    /**
     * Size of each streamed chunk in characters or units.
     * Controls the granularity of content delivery.
     */
    chunkSize: number;
}
/**
 * Duration-Based Streaming Options (Mode 2)
 *
 * Automatic chunk size calculation based on target duration.
 *
 * @interface ProtocolStreamingOptions_DurationBased
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md
 */
export interface ProtocolStreamingOptions_DurationBased {
    /**
     * Target total duration in milliseconds for streaming all content.
     * The system will adjust chunk sizes to meet this target.
     */
    desiredTotalDuration: number;
    /**
     * Maximum allowed duration in milliseconds for the streaming operation.
     * Acts as an upper bound safety limit.
     */
    maximumDuration: number;
}
/**
 * Protocol Streaming Options
 *
 * Controls how content is streamed to the client for smooth delivery.
 * Union type enforcing two mutually exclusive modes:
 *
 * **Mode 1: Manual Chunking** - `ProtocolStreamingOptions_ManualChunking`
 * **Mode 2: Duration-Based** - `ProtocolStreamingOptions_DurationBased`
 *
 * @type ProtocolStreamingOptions
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_ACTION_UPDATE.md - CANVAS_ACTION_UPDATE (REVEAL)
 */
export type ProtocolStreamingOptions = ProtocolStreamingOptions_ManualChunking | ProtocolStreamingOptions_DurationBased;
/**
 * Button Visibility State
 *
 * Visibility states specific to button elements.
 * Independent from other visibility types to allow future divergence.
 *
 * @type ButtonVisibilityState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ButtonVisibilityState = "VISIBLE" | "HIDDEN";
/**
 * Visibility state types (deprecated)
 *
 * @deprecated Use structure-specific types (ProgressBarVisibilityState, PanelVisibilityState, ButtonVisibilityState) instead
 * @type VisibilityState
 */
export type VisibilityState = "VISIBLE" | "HIDDEN";
/**
 * Button style types
 *
 * Standard visual styles for buttons and button-like elements.
 * Provides consistent styling across all button implementations.
 *
 * @type ButtonStyle
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ButtonStyle = "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER";
/**
 * Chat Button State
 *
 * Interaction states specific to chat interface buttons.
 * Independent from other button types to allow future divergence.
 *
 * @type ChatButtonState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - CHAT_CONTENT_BUTTON Specification
 */
export type ChatButtonState = "ENABLED" | "DISABLED" | "LOADING";
/**
 * Panel Button State
 *
 * Interaction states specific to panel interface buttons.
 * Independent from other button types to allow future divergence.
 *
 * @type PanelButtonState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelButtonState = "ENABLED" | "DISABLED" | "LOADING" | "HIDDEN";
/**
 * Button state types (deprecated)
 *
 * @deprecated Use structure-specific types (ChatButtonState, PanelButtonState) instead
 * @type ButtonState
 */
export type ButtonState = "ENABLED" | "DISABLED" | "LOADING";
/**
 * Chip style types
 *
 * Standard visual styles for chip elements.
 * Provides consistent styling across all chip implementations.
 *
 * @type ChipStyle
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ChipStyle = "CHIP_STYLE_PRIMARY" | "CHIP_STYLE_SECONDARY";
/**
 * Chip State
 *
 * Interaction states specific to chip elements.
 * Independent from button states to allow future divergence.
 *
 * @type ChipState
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - CHAT_CONTENT_ACTIONABLE_CHIPS Specification
 */
export type ChipState = "ENABLED" | "DISABLED" | "LOADING";
/**
 * Section Style
 *
 * Visual styles for canvas section elements.
 * Controls layout and appearance of section containers.
 *
 * @type SectionStyle
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_SECTION.md - CANVAS_CONTENT_SECTION Specification
 */
export type SectionStyle = "DEFAULT" | "BORDERED" | "HIGHLIGHTED" | "COMPACT";
/**
 * Markdown style types
 *
 * Standard visual styles for markdown content rendering.
 * Controls typography and spacing of markdown elements.
 *
 * @type MarkdownStyle
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_MARKDOWN.md - CHAT_CONTENT_MARKDOWN Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_MARKDOWN.md - CANVAS_CONTENT_MARKDOWN Specification
 */
export type MarkdownStyle = "DEFAULT" | "COMPACT" | "LARGE";
/**
 * Panel body types
 *
 * Centralized definition of all supported panel body content types.
 * Standardized PANEL_BODY_* format ensures consistency across all panel implementations.
 *
 * @type PanelBodyType
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - CHAT_CONTENT_PANEL Specification
 */
export type PanelBodyType = "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
/**
 * Panel body types for home/input states only
 * Extracted subset of PanelBodyType for LLM service home screens
 *
 * @type PanelBodyType_Home
 */
export type PanelBodyType_Home = Extract<PanelBodyType, "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_PERPLEXITY_HOME">;
/**
 * Panel body types for result/output states only
 * Extracted subset of PanelBodyType for LLM service result screens
 *
 * @type PanelBodyType_Result
 */
export type PanelBodyType_Result = Extract<PanelBodyType, "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_RESULT">;
/**
 * Base content options
 *
 * Common options shared across all content builders.
 * Provides consistent foundation for content creation with ID resolution and styling.
 *
 * @interface CommunicationProtocol_BaseContentOptions
 */
export interface CommunicationProtocol_BaseContentOptions extends CommunicationProtocol_ContentIdResolutionOptions {
    /**
     * Width behavior for content rendering
     * @optional @default "WIDTH_AUTO"
     */
    content_width?: ContentWidth;
    /**
     * Groups multiple content elements together for visual and functional cohesion
     * Content elements with the same content_group_id are perceived as a single logical unit
     * @optional
     * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/CHAT_CONTENT.md - Content Grouping Documentation
     */
    content_group_id?: string;
    /**
     * Named queue for content processing. Content in the same queue is processed
     * sequentially, but different queues run in parallel. This enables simultaneous
     * streaming of independent content (e.g., website panel in "website" queue while
     * reasoning panel updates continue in "main" queue).
     * @required
     */
    content_queue: string;
    /**
     * Optional delay in milliseconds applied AFTER this content item finishes
     * processing, BEFORE the next item begins.
     * Can be skipped by user interaction (e.g., typing).
     * Invalid values (≤0) are ignored with a console warning.
     * @optional
     */
    content_delay?: number;
}
/**
 * Base action options
 *
 * Common options shared across all action builders.
 * Provides consistent foundation for action creation with ID resolution.
 *
 * @interface CommunicationProtocol_BaseActionOptions
 */
export interface CommunicationProtocol_BaseActionOptions extends CommunicationProtocol_ActionIdResolutionOptions {
}
/**
 * Base actionable card content options
 *
 * Options specific to actionable card content types.
 * Independent from chip options to allow future divergence.
 *
 * @interface CommunicationProtocol_BaseActionableCardContentOptions
 */
export interface CommunicationProtocol_BaseActionableCardContentOptions extends CommunicationProtocol_BaseContentOptions {
    /**
     * Selection behavior mode specific to cards
     * @optional @default "SINGLE"
     */
    actionable_cards_selection_mode?: ActionableCardSelectionMode;
    /**
     * Current selection state specific to cards
     * @optional @default "PENDING_SELECTION"
     */
    actionable_cards_selection_state?: ActionableCardSelectionState;
}
/**
 * Base actionable chip content options
 *
 * Options specific to actionable chip content types.
 * Independent from card options to allow future divergence.
 *
 * @interface CommunicationProtocol_BaseActionableChipContentOptions
 */
export interface CommunicationProtocol_BaseActionableChipContentOptions extends CommunicationProtocol_BaseContentOptions {
    /**
     * Selection behavior mode specific to chips
     * @optional @default "SINGLE"
     */
    actionable_chips_selection_mode?: ActionableChipSelectionMode;
    /**
     * Current selection state specific to chips
     * @optional @default "PENDING_SELECTION"
     */
    actionable_chips_selection_state?: ActionableChipSelectionState;
}
/**
 * Base progress options
 *
 * Common options for progress-related content and actions.
 * Provides consistent progress state and animation configuration.
 *
 * @interface CommunicationProtocol_BaseProgressOptions
 */
export interface CommunicationProtocol_BaseProgressOptions {
    /**
     * Progress state - never automatically determined from percentage
     * @optional
     */
    progress_bar_state?: ProgressBarState;
    /**
     * Visibility state
     * @optional
     */
    progress_bar_visibility?: ProgressBarVisibilityState;
    /**
     * Current percentage (0-100)
     * @optional
     */
    progress_bar_current_percentage?: number;
    /**
     * Animation duration to reach current percentage (milliseconds)
     * @optional
     */
    progress_bar_current_animation_duration_ms?: number;
    /**
     * Delay before starting next goal animation (milliseconds)
     * @optional
     */
    progress_bar_next_goal_delay_ms?: number;
    /**
     * Next goal percentage (0-100)
     * @optional
     */
    progress_bar_next_goal_percentage?: number;
    /**
     * Animation duration to reach next goal (milliseconds)
     * @optional
     */
    progress_bar_next_goal_animation_duration_ms?: number;
    /**
     * Progress message
     * @optional
     */
    progress_bar_message?: string;
    /**
     * Progress icon
     * @optional
     */
    progress_bar_icon?: string;
}
/**
 * Base panel options
 *
 * Common options for panel-related content and actions.
 * Provides consistent panel configuration across content and action builders.
 *
 * Enhanced with comprehensive animation support and new panel properties
 * introduced in the 2025-09-15 communication protocol updates.
 *
 * @interface CommunicationProtocol_BasePanelOptions
 * @see ./animation.ts - Animation Types and Interfaces
 */
export interface CommunicationProtocol_BasePanelOptions {
    /**
     * Panel header text
     * @optional
     */
    panel_header_title?: string;
    /**
     * Panel header icon - predefined icon or custom URL
     * @optional
     */
    panel_header_icon?: PanelHeaderIcon;
    /**
     * Favicon URL for website panels (captured from Firecrawl scrape metadata)
     * @optional
     */
    panel_header_favicon_url?: string;
    /**
     * Panel header description
     * @optional
     */
    panel_header_description?: string;
    /**
     * Panel visibility state
     * @optional
     */
    panel_visibility?: PanelVisibilityState;
    /**
     * Panel body content type
     * @optional
     */
    panel_body_type?: PanelBodyType;
    /**
     * Panel body content data
     * @optional
     */
    panel_body_data?: unknown;
    /**
     * Panel body aspect ratio
     * @optional
     */
    panel_body_aspect_ratio?: PanelBodyAspectRatio;
    /**
     * Panel animation transitions array
     * @optional
     */
    panel_transitions?: CommunicationProtocol_PanelTransition[];
    /**
     * Panel overlay effects array
     * Ambient/repeating visual treatments applied on top of panel content
     * @optional
     */
    panel_effects?: CommunicationProtocol_PanelEffect[];
    /**
     * Panel streaming options
     * Controls how content is streamed to the client for smooth delivery
     * @optional
     */
    streaming_options?: ProtocolStreamingOptions;
}
/**
 * Builder validation options
 *
 * Common validation parameters used across builders.
 * Provides consistent validation patterns for content and action builders.
 *
 * @interface CommunicationProtocol_BuilderValidationOptions
 */
export interface CommunicationProtocol_BuilderValidationOptions {
    /**
     * Whether to perform strict validation
     * @optional @default true
     */
    strict?: boolean;
    /**
     * Whether to allow empty or undefined values
     * @optional @default false
     */
    allowEmpty?: boolean;
}
/**
 * All common option interfaces
 *
 * Union type of all base option interfaces for generic handling.
 * Useful for utility functions that work with any option type.
 *
 * @type CommonOptions
 */
export type CommonOptions = CommunicationProtocol_BaseContentOptions | CommunicationProtocol_BaseActionOptions | CommunicationProtocol_BaseActionableCardContentOptions | CommunicationProtocol_BaseActionableChipContentOptions | CommunicationProtocol_BaseProgressOptions | CommunicationProtocol_BasePanelOptions;
/**
 * All common enum types
 *
 * Union type of all enum types for generic handling.
 * Useful for validation and type checking utilities.
 *
 * @type CommonEnumTypes
 */
export type CommonEnumTypes = MessageRole | ContentWidth | ActionableCardSelectionMode | ActionableCardSelectionState | ActionableChipSelectionMode | ActionableChipSelectionState | ProgressBarState | ProgressBarVisibilityState | PanelVisibilityState | ButtonVisibilityState | ChatButtonState | PanelButtonState | ButtonStyle | ChipStyle | ChipState | SectionStyle | MarkdownStyle | PanelBodyType;
/**
 * Panel Body Content for PANEL_BODY_IMAGE
 *
 * Defines the structure for image panel content with positioning and animation options.
 */
export interface CommunicationProtocol_PanelBody_ImageContent {
    /** Image URL to display */
    image_url: string;
    /** Alt text for accessibility */
    image_alt_text: string;
    /** Image positioning within container */
    image_gravity?: string;
    /** Image sizing behavior */
    image_sizing?: string;
    /** Animation type for image display */
    image_animation_type?: string;
    /** Framer Motion animation attributes */
    image_animation_framer_motion_attributes?: Record<string, unknown>;
}
/**
 * Panel Body Content for Google Search Home
 *
 * Defines the structure for Google Search home panel content.
 */
export interface CommunicationProtocol_PanelBody_GoogleSearchHomeContent {
    /** Search query string */
    search_query: string;
}
/**
 * Panel Body Content for Google Search Results
 *
 * Defines the structure for Google Search results panel content.
 */
export interface CommunicationProtocol_PanelBody_GoogleSearchResultContent {
    /** Array of Google Custom Search API items */
    google_custom_search_items: Array<{
        title?: string;
        link?: string;
        snippet?: string;
        [key: string]: unknown;
    }>;
}
/**
 * Panel Body Content for ChatGPT Home
 *
 * Defines the structure for ChatGPT home panel content.
 */
export interface CommunicationProtocol_PanelBody_ChatGptHomeContent {
    /** User prompt text */
    user_prompt: string;
}
/**
 * Panel Body Content for ChatGPT Results
 *
 * Defines the structure for ChatGPT results panel content.
 */
export interface CommunicationProtocol_PanelBody_ChatGptResultContent {
    /** Original user prompt */
    user_prompt: string;
    /** Assistant response */
    assistant_response: string;
}
/**
 * Panel Body Content for Gemini Home
 *
 * Defines the structure for Gemini home panel content.
 */
export interface CommunicationProtocol_PanelBody_GeminiHomeContent {
    /** User prompt text */
    user_prompt: string;
}
/**
 * Panel Body Content for Gemini Results
 *
 * Defines the structure for Gemini results panel content.
 */
export interface CommunicationProtocol_PanelBody_GeminiResultContent {
    /** Original user prompt */
    user_prompt: string;
    /** Assistant response */
    assistant_response: string;
}
/**
 * Panel Body Content for Perplexity Home
 *
 * Defines the structure for Perplexity home panel content.
 */
export interface CommunicationProtocol_PanelBody_PerplexityHomeContent {
    /** User prompt text */
    user_prompt: string;
}
/**
 * Panel Body Content for Perplexity Results
 *
 * Defines the structure for Perplexity results panel content.
 */
export interface CommunicationProtocol_PanelBody_PerplexityResultContent {
    /** Original user prompt */
    user_prompt: string;
    /** Assistant response */
    assistant_response: string;
}
/**
 * Panel Body Content for Google Maps Home
 *
 * Defines the structure for Google Maps home panel content.
 */
export interface CommunicationProtocol_PanelBody_GoogleMapsHomeContent {
    /** Search query for a location or place */
    search_query: string;
}
/**
 * Panel Body Content for Google Maps Reviews
 *
 * Defines the structure for Google Maps reviews panel content.
 */
export interface CommunicationProtocol_PanelBody_GoogleMapsReviewsContent {
    /** Array of review objects from Google Places API */
    reviews: Array<{
        rating?: number;
        text?: string;
        author_name?: string;
        [key: string]: unknown;
    }>;
}
/**
 * Union type for all panel body content structures
 *
 * Provides type safety for panel body content based on the panel body type.
 */
/**
 * Actionable Card Field Structure
 *
 * One labelled value shown on an actionable card, as an item of `card_fields`.
 */
export interface CommunicationProtocol_ActionableCardField {
    /** Label of the value */
    label: string;
    /** Value shown next to the label */
    value: string;
}
/**
 * Actionable Card Item Structure
 *
 * Defines the structure for individual card items in actionable cards content.
 */
export interface CommunicationProtocol_ActionableCardItem {
    /** Card title text */
    card_title: string;
    /** Card subtitle text */
    card_subtitle: string;
    /** Longer text shown under the title. It is separate from the subtitle. */
    card_body?: string;
    /** Labelled values in display order. Array order is the display order. */
    card_fields?: CommunicationProtocol_ActionableCardField[];
    /**
     * Identifier of the follow-up action that choosing the card starts. Present only
     * when the card can be chosen; a card without it is display-only. Never empty.
     */
    card_action_id?: string;
    /** Card value identifier */
    card_value: string;
    /** Actions to execute when card is selected */
    card_actions: Array<import("./chat.js").CommunicationProtocol_ChatAction>;
}
/**
 * Actionable Cards Content Data
 *
 * Defines the structure for actionable cards content data.
 * Uses card-specific selection types for independence from other structures.
 */
export interface CommunicationProtocol_ActionableCardsContentData {
    /** Selection mode (SINGLE or MULTIPLE) - specific to cards */
    actionable_cards_selection_mode: ActionableCardSelectionMode;
    /** Selection state - specific to cards */
    actionable_cards_selection_state: ActionableCardSelectionState;
    /** Array of card items */
    actionable_cards_items: CommunicationProtocol_ActionableCardItem[];
}
/**
 * Actionable Chip Item Structure
 *
 * Defines the structure for individual chip items in actionable chips content.
 */
export interface CommunicationProtocol_ActionableChipItem {
    /** Chip text */
    chip_text: string;
    /** Chip value identifier */
    chip_value: string;
    /** Chip visual style */
    chip_style: ChipStyle;
    /** Chip state */
    chip_state: ChipState;
    /** Actions to execute when chip is selected */
    chip_actions: Array<import("./chat.js").CommunicationProtocol_ChatAction>;
}
/**
 * Actionable Chips Content Data
 *
 * Defines the structure for actionable chips content data.
 * Uses chip-specific selection types for independence from other structures.
 */
export interface CommunicationProtocol_ActionableChipsContentData {
    /** Selection mode (SINGLE or MULTIPLE) - specific to chips */
    actionable_chips_selection_mode: ActionableChipSelectionMode;
    /** Selection state - specific to chips */
    actionable_chips_selection_state: ActionableChipSelectionState;
    /** Array of chip items */
    actionable_chips_items: CommunicationProtocol_ActionableChipItem[];
}
/**
 * Reasoning Markdown Panel Body Content
 *
 * Content structure for PANEL_BODY_REASONING_V1_MARKDOWN panels.
 * Unlike PANEL_BODY_MARKDOWN which accepts raw strings, reasoning markdown
 * panels require an object with a 'markdown' property for consistent parsing.
 */
export interface CommunicationProtocol_PanelBody_ReasoningMarkdownContent {
    /** The markdown content to display in the reasoning panel */
    markdown: string;
}
/**
 * Union type for all panel body content structures
 *
 * Provides type safety for panel body content based on the panel body type.
 */
export type PanelBodyContent = string | CommunicationProtocol_PanelBody_ReasoningMarkdownContent | CommunicationProtocol_PanelBody_ImageContent | CommunicationProtocol_ActionableCardsContentData | CommunicationProtocol_ActionableChipsContentData | CommunicationProtocol_PanelBody_GoogleSearchHomeContent | CommunicationProtocol_PanelBody_GoogleSearchResultContent | CommunicationProtocol_PanelBody_ChatGptHomeContent | CommunicationProtocol_PanelBody_ChatGptResultContent | CommunicationProtocol_PanelBody_GeminiHomeContent | CommunicationProtocol_PanelBody_GeminiResultContent | CommunicationProtocol_PanelBody_PerplexityHomeContent | CommunicationProtocol_PanelBody_PerplexityResultContent | CommunicationProtocol_PanelBody_GoogleMapsHomeContent | CommunicationProtocol_PanelBody_GoogleMapsReviewsContent;
//# sourceMappingURL=common.d.ts.map