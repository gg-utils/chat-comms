/**
 * @fileoverview Runtime chat protocol types for messages, content, actions, and canvas state.
 *
 * This package module owns the reusable chat runtime type surface that was previously
 * duplicated inside an initial UI consumer. It re-exports canonical wire types and adds generic
 * client/runtime extensions (content_source_*, raw_content, opaque metadata, etc.) without
 * depending on any consuming product's domain model. Canvas queue scope metadata lives in
 * `@gg-utils/chat-comms/runtime/canvas`.
 *
 * @example
 * ```typescript
 * import type { ChatMessage } from "@gg-utils/chat-comms/runtime/chat";
 *
 * const message: ChatMessage = {
 *   message_id: "msg_123",
 *   message_type: "CHAT_MESSAGE",
 *   message_role: "ASSISTANT",
 *   message_target: "CHAT",
 *   message_contents: [],
 * };
 * ```
 * @testing TypeScript compile: cd chat-stream-protocol && npm run typecheck
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { AnimationTrigger, AnimationType, CommunicationProtocol_FramerMotionAttributes, EffectState, FramerMotionEasing, FramerMotionType, PanelEffectType as ProtocolPanelEffectType } from "../../animation/index.js";
import type { AppSetSendErrorActionDataErrorKind, ErrorDiagnosticInfoSource, RecoveryHintStyle, RecoveryHintType } from "../../types/app.js";
export { APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS, } from "../../types/app.js";
export type { AppSetSendErrorActionDataErrorKind, ErrorDiagnosticInfoSource, RecoveryHintStyle, RecoveryHintType, } from "../../types/app.js";
export type { ProtocolAction, ProtocolActionTarget, ProtocolActionType, ProtocolAppActionType, ProtocolCanvasActionType, ProtocolCanvasContentType, ProtocolChatActionType, ProtocolChatContent, ProtocolChatContentType, ProtocolChatMessage, ProtocolMessageTarget, ProtocolWireMessageRole, } from "../../wire/index.js";
/** Leaf-level JSON scalar types. */
export type JsonPrimitive = string | number | boolean | null;
/** Typed JSON object with string keys and recursive `JsonValue` values. */
export type JsonObject = {
    [key: string]: JsonValue;
};
/** Typed JSON array with recursive `JsonValue` elements. */
export type JsonArray = JsonValue[];
/** Recursive union covering all valid JSON values. */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
/** Top-level chat message envelope parsed from the streaming protocol. Carries all content items for one assistant or user turn. */
export interface ChatMessage {
    message_id: string;
    message_type: "CHAT_MESSAGE";
    message_role: "USER" | "ASSISTANT";
    message_target: "CHAT" | "CANVAS" | "APP";
    debug?: boolean;
    message_contents: AllChatContent[];
    raw_content?: string;
}
/** Framer Motion easing values supported by protocol-owned panel animation attributes. */
export type Easing = FramerMotionEasing;
/** Panel animation type tokens that map to Framer Motion transition presets. */
export type PanelAnimationType = AnimationType;
/** Viewport/visibility event tokens that trigger panel animations. */
export type PanelAnimationTrigger = AnimationTrigger;
/**
 * Runtime Framer Motion configuration passed alongside a `PanelAnimationType` or effect.
 *
 * The base protocol-owned attribute set lives in `@gg-utils/chat-comms/animation`;
 * this runtime alias keeps UI renderer extras that are not part of strict producer validation.
 */
export type FramerMotionAnimationAttributes = Omit<CommunicationProtocol_FramerMotionAttributes, "type"> & {
    type?: FramerMotionType | "keyframes";
    bounce?: number;
    bounceDamping?: number;
    bounceStiffness?: number;
    opacity?: {
        delay?: number;
        duration?: number;
    };
};
/** A single panel transition rule pairing a trigger event with an animation type and optional Framer Motion attributes. */
export interface PanelTransitionAnimation {
    animation_trigger: PanelAnimationTrigger;
    animation_type: PanelAnimationType;
    animation_framer_motion_attributes?: FramerMotionAnimationAttributes;
}
/** Ordered list of panel transition rules applied to a chat content panel. */
export type PanelTransitions = PanelTransitionAnimation[];
/** Visual effect type tokens applied to chat content panels. */
export type PanelEffectType = ProtocolPanelEffectType;
/** Enabled/disabled state for a panel effect. */
export type PanelEffectState = EffectState;
/** A single panel effect rule combining an effect type, enabled/disabled state, and optional Framer Motion attributes. */
export interface PanelEffect {
    effect_type: PanelEffectType;
    effect_state: PanelEffectState;
    effect_framer_motion_attributes?: FramerMotionAnimationAttributes;
}
/** Ordered list of panel effects applied to a chat content panel. */
export type PanelEffects = PanelEffect[];
/**
 * Default queue name for content processing.
 * Content without an explicit queue is processed in the main queue.
 */
export declare const DEFAULT_CONTENT_QUEUE = "main";
/**
 * Canonical type for content queue names in the frontend runtime.
 */
export type ContentQueue = string;
/**
 * Runtime validator for queue values used by queue processors/debuggers.
 */
export declare function ChatTypes_validateContentQueue(options: {
    contentQueue: string;
    context?: string;
}): ContentQueue;
/** Shared base fields present on every chat content item. */
export interface BaseChatContent {
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL";
    content_group_id?: string;
    /**
     * UI runtime metadata: marks content items that should start a new visible
     * assistant sequence (logo shown).
     */
    content_starts_sequence?: boolean;
    /**
     * UI runtime metadata for debug / provenance and tooltip rendering.
     */
    content_source_message_id?: string;
    content_source_debug?: boolean;
    content_source_raw_content?: string;
    /**
     * Named queue for content processing. Content in the same queue is processed
     * sequentially, but different queues run in parallel. This enables simultaneous
     * streaming of independent content (e.g., website panel in "website" queue while
     * reasoning panel updates continue in "main" queue).
     */
    content_queue: ContentQueue;
    content_delay?: number;
}
/** Optional streaming render configuration controlling chunk interval, chunk size, and total animation duration for text content. */
export type StreamingOptions = {
    chunkInterval?: number;
    chunkSize?: number;
    desiredTotalDuration?: number;
    maximumDuration?: number;
};
/** A parsed protocol message queued for sequential processing by the message queue processor. */
export interface PendingProtocolMessage {
    id: string;
    message: ChatMessage;
    timestamp: number;
    processed: boolean;
}
/** Chat content shape accepted from loose historical stream ingestion before missing ids are normalized. */
export type RuntimeChatContentWithOptionalContentId = AllChatContent extends infer Content ? Content extends {
    content_id: string;
} ? Omit<Content, "content_id"> & {
    content_id?: string;
} : never : never;
/** Chat message shape accepted from loose historical stream ingestion before content ids are normalized. */
export type RuntimeChatMessageWithOptionalContentIds = Omit<ChatMessage, "message_contents"> & {
    message_contents: RuntimeChatContentWithOptionalContentId[];
};
/** Options for generating a fallback content id for one missing `content_id`. */
export interface RuntimeChatGeneratedContentIdOptions {
    messageId: string;
    contentIndex: number;
    uniqueSuffix?: string;
}
/** Context passed to custom missing-content-id factories. */
export interface RuntimeChatNormalizeContentIdFactoryOptions extends RuntimeChatGeneratedContentIdOptions {
    content: RuntimeChatContentWithOptionalContentId;
}
/** Factory used when normalizing historical chat messages that omitted `content_id`. */
export type RuntimeChatNormalizeContentIdFactory = (options: RuntimeChatNormalizeContentIdFactoryOptions) => string;
/** Options for `RuntimeChat_normalizeMessageContentIds`. */
export interface RuntimeChatNormalizeMessageContentIdsOptions {
    createContentId?: RuntimeChatNormalizeContentIdFactory;
}
/**
 * Creates a protocol-owned fallback content id for historical messages that omitted `content_id`.
 *
 * @remarks
 * The default id is deterministic per message and content slot. Consumers that need additional
 * uniqueness can pass a namespace-safe `uniqueSuffix`.
 */
export declare function RuntimeChat_createGeneratedContentId(options: RuntimeChatGeneratedContentIdOptions): string;
/**
 * Normalizes loose historical chat messages by filling missing `content_id` fields.
 *
 * @remarks
 * The function is immutable: when no content ids are missing, it returns the original message
 * reference; otherwise it returns a shallow-cloned message with cloned content items only for the
 * entries that required generated ids.
 */
export declare function RuntimeChat_normalizeMessageContentIds(message: RuntimeChatMessageWithOptionalContentIds, options?: RuntimeChatNormalizeMessageContentIdsOptions): ChatMessage;
/** UI state snapshot for a progress bar content item, used by the canvas reducer to track animation progress. */
export interface ProgressBarState {
    contentId: string;
    state: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED";
    visibility?: "VISIBLE" | "HIDDEN";
    currentPercentage: number;
    currentAnimationDurationMs?: number;
    nextGoalPercentage?: number;
    nextGoalDelayMs?: number;
    nextGoalAnimationDurationMs?: number;
    message: string;
    characterCount: number;
    icon?: string;
}
/**
 * Shared UI-side panel chrome merged into every `ChatContentPanelState` discriminant arm.
 *
 * @remarks
 * Intersected with body-specific variants in `ChatContentPanelState` (`body_type` narrows `body_data`).
 */
interface BaseChatContentPanelState {
    content_id: string;
    header_title?: string;
    header_description?: string;
    panel_visibility?: "VISIBLE" | "HIDDEN";
    streaming_options?: StreamingOptions;
    body_aspect_ratio?: string;
    panel_header_icon?: string;
    panel_header_favicon_url?: string;
    panel_transitions?: PanelTransitions;
    panel_effects?: PanelEffects;
    panel_scrolling_framer_motion_attributes?: FramerMotionAnimationAttributes;
    should_have_scanning_line_animation?: boolean;
}
/** UI-side discriminated union of panel body state shapes, keyed by `body_type`. Used by the canvas context reducer. */
export type ChatContentPanelState = (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_MARKDOWN";
    body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_REASONING_V1_MARKDOWN";
    body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_REASONING_V2_MARKDOWN";
    body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_HTML";
    body_data: ChatContentPanelBodyHtmlData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_IMAGE";
    body_data: ChatContentPanelBodyImageData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GOOGLE_SEARCH_HOME";
    body_data: ChatContentPanelBodyGoogleSearchHomeData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GOOGLE_SEARCH_RESULT";
    body_data: ChatContentPanelBodyGoogleSearchResultData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GOOGLE_MAPS_HOME";
    body_data: ChatContentPanelBodyGoogleMapsHomeData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
    body_data: ChatContentPanelBodyGoogleMapsReviewsData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_CHATGPT_HOME";
    body_data: ChatContentPanelBodyChatGptHomeData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_CHATGPT_RESULT";
    body_data: ChatContentPanelBodyChatGptResultData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GEMINI_HOME";
    body_data: ChatContentPanelBodyGeminiHomeData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_GEMINI_RESULT";
    body_data: ChatContentPanelBodyGeminiResultData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_PERPLEXITY_HOME";
    body_data: ChatContentPanelBodyPerplexityHomeData;
}) | (BaseChatContentPanelState & {
    body_type: "PANEL_BODY_PERPLEXITY_RESULT";
    body_data: ChatContentPanelBodyPerplexityResultData;
});
/** Runtime UI state for an actionable-cards content item, including selection mode and per-item state. */
export interface ActionableCardState {
    contentId: string;
    selectedCardIndex: number | null;
    selectionMode: "SINGLE" | "MULTIPLE";
    selectionState: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
    items: Array<{
        card_title: string;
        card_subtitle: string;
        card_body?: string;
        card_fields?: ActionableCardField[];
        card_action_id?: string;
        card_value: string;
        card_actions?: ChatAction[];
    }>;
}
/** Visual style token for actionable chip items. */
export type ChatChipStyle = "CHIP_STYLE_PRIMARY" | "CHIP_STYLE_SECONDARY";
/** Visual style token for button content items, mapping to intent-colored button variants. */
export type ChatButtonStyle = "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER";
/** Runtime UI state for an actionable-chips content item, including selection mode and per-chip state. */
export interface ActionableChipState {
    contentId: string;
    selectedChipIndex: number | null;
    selectionMode: "SINGLE" | "MULTIPLE";
    selectionState: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
    items: Array<{
        chip_text: string;
        chip_value: string;
        chip_style?: ChatChipStyle;
        chip_state?: "ENABLED" | "DISABLED" | "SELECTED";
        chip_actions?: ChatAction[];
    }>;
}
/** Discriminated union of all renderable chat content types, keyed by `content_type`. */
export type AllChatContent = MarkdownContent | ProgressBarContent | ActionableCardsContent | ChatContentPanel | ActionableChipsContent | ButtonContent | ActionWrapperContent;
/** Data payload for a `CHAT_CONTENT_MARKDOWN` content item. */
export interface MarkdownContentData {
    markdown?: string;
    streaming_options?: StreamingOptions;
}
/** Data payload for a `CHAT_CONTENT_PROGRESS_BAR` content item, including state, animation, and icon tokens. */
export interface ProgressBarContentData {
    progress_bar_state: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED";
    progress_bar_visibility?: "VISIBLE" | "HIDDEN";
    progress_bar_current_percentage: number;
    progress_bar_current_animation_duration_ms?: number;
    progress_bar_next_goal_percentage?: number;
    progress_bar_next_goal_delay_ms?: number;
    progress_bar_next_goal_animation_duration_ms?: number;
    progress_bar_message: string;
    progress_bar_icon?: "progress-bar-icon-web" | "progress-bar-icon-chatgpt" | "progress-bar-icon-gemini" | "progress-bar-icon-claude" | "progress-bar-icon-perplexity" | "progress-bar-icon-deepseek" | "progress-bar-icon-grok" | "progress-bar-icon-copilot" | "progress-bar-icon-google-search" | "progress-bar-icon-google-places" | "progress-bar-icon-web-search" | "progress-bar-icon-website-crawling" | "progress-bar-icon-data-processing" | "progress-bar-icon-ai-analysis" | "progress-bar-icon-file-upload" | "progress-bar-icon-database" | "progress-bar-icon-api" | "progress-bar-icon-security";
}
/**
 * Shared protocol-level panel metadata merged into every `ChatContentPanelData` discriminant arm.
 *
 * @remarks
 * Intersected with body-specific variants in `ChatContentPanelData` (`panel_body_type` narrows `panel_body_data`).
 */
interface BaseChatContentPanelData {
    panel_header_icon?: "panel-icon-web" | "panel-icon-chatgpt" | "panel-icon-gemini" | "panel-icon-claude" | "panel-icon-perplexity" | "panel-icon-deepseek" | "panel-icon-grok" | "panel-icon-copilot" | "panel-icon-google-search" | "panel-icon-google-maps" | "panel-icon-google-places" | "panel-icon-web-search" | "panel-icon-website-crawling" | "panel-icon-data-processing" | "panel-icon-ai-analysis" | "panel-icon-file-upload" | "panel-icon-database" | "panel-icon-api" | "panel-icon-security";
    panel_header_title?: string;
    panel_header_description?: string;
    panel_header_favicon_url?: string;
    panel_visibility?: "VISIBLE" | "HIDDEN";
    panel_body_aspect_ratio?: string;
    streaming_options?: StreamingOptions;
    panel_transitions?: PanelTransitions;
    panel_effects?: PanelEffects;
    should_have_scanning_line_animation?: boolean;
}
/** Protocol-level discriminated union of all panel body variants, keyed by `panel_body_type`. Consumed by the content panel renderer. */
export type ChatContentPanelData = (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_IMAGE";
    panel_body_data: ChatContentPanelBodyImageData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_MARKDOWN";
    panel_body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_REASONING_V1_MARKDOWN";
    panel_body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_REASONING_V2_MARKDOWN";
    panel_body_data: ChatContentPanelBodyMarkdownData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_HTML";
    panel_body_data: ChatContentPanelBodyHtmlData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GOOGLE_SEARCH_HOME";
    panel_body_data: ChatContentPanelBodyGoogleSearchHomeData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GOOGLE_SEARCH_RESULT";
    panel_body_data: ChatContentPanelBodyGoogleSearchResultData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GOOGLE_MAPS_HOME";
    panel_body_data: ChatContentPanelBodyGoogleMapsHomeData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
    panel_body_data: ChatContentPanelBodyGoogleMapsReviewsData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_CHATGPT_HOME";
    panel_body_data: ChatContentPanelBodyChatGptHomeData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_CHATGPT_RESULT";
    panel_body_data: ChatContentPanelBodyChatGptResultData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GEMINI_HOME";
    panel_body_data: ChatContentPanelBodyGeminiHomeData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_GEMINI_RESULT";
    panel_body_data: ChatContentPanelBodyGeminiResultData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_PERPLEXITY_HOME";
    panel_body_data: ChatContentPanelBodyPerplexityHomeData;
}) | (BaseChatContentPanelData & {
    panel_body_type: "PANEL_BODY_PERPLEXITY_RESULT";
    panel_body_data: ChatContentPanelBodyPerplexityResultData;
});
/** Panel body data for `PANEL_BODY_IMAGE`: URL, alt text, gravity, sizing, and animation configuration. */
export interface ChatContentPanelBodyImageData {
    image_url: string;
    image_alt_text: string;
    image_gravity: "IMAGE_GRAVITY_TOP_LEFT" | "IMAGE_GRAVITY_TOP_CENTER" | "IMAGE_GRAVITY_TOP_RIGHT" | "IMAGE_GRAVITY_CENTER_LEFT" | "IMAGE_GRAVITY_CENTER" | "IMAGE_GRAVITY_CENTER_RIGHT" | "IMAGE_GRAVITY_BOTTOM_LEFT" | "IMAGE_GRAVITY_BOTTOM_CENTER" | "IMAGE_GRAVITY_BOTTOM_RIGHT";
    image_sizing: "IMAGE_SIZING_COVER" | "IMAGE_SIZING_CONTAIN" | "IMAGE_SIZING_FILL" | "IMAGE_SIZING_SCALE_DOWN" | "IMAGE_SIZING_STRETCH" | "IMAGE_SIZING_FIT_WIDTH" | "IMAGE_SIZING_FIT_HEIGHT";
    image_animation_type: "IMAGE_ANIMATION_SCROLL_DOWN" | "IMAGE_ANIMATION_FADE_IN" | "IMAGE_ANIMATION_NONE" | "IMAGE_ANIMATION_ZOOM_IN";
    image_animation_framer_motion_attributes: {
        delay: number;
        duration: number;
        ease: Easing;
    };
}
/** Panel body data for `PANEL_BODY_MARKDOWN` and reasoning markdown variants. */
export interface ChatContentPanelBodyMarkdownData {
    markdown?: string;
}
/** Panel body data for `PANEL_BODY_HTML`: raw HTML string rendered in the panel. */
export interface ChatContentPanelBodyHtmlData {
    html: string;
}
/** Panel body data for `PANEL_BODY_GOOGLE_SEARCH_HOME`: the query shown in the simulated search bar. */
export interface ChatContentPanelBodyGoogleSearchHomeData {
    search_query: string;
}
/** Raw Google Custom Search API response shape used inside `ChatContentPanelBodyGoogleSearchResultData`. */
export interface SearchResponse {
    kind?: string;
    url?: {
        type?: string;
        template?: string;
    };
    queries?: {
        request?: Array<{
            title?: string;
            totalResults?: string;
            searchTerms?: string;
            count?: number;
            startIndex?: number;
            inputEncoding?: string;
            outputEncoding?: string;
            safe?: string;
            cx?: string;
        }>;
        nextPage?: Array<{
            title?: string;
            totalResults?: string;
            searchTerms?: string;
            count?: number;
            startIndex?: number;
            inputEncoding?: string;
            outputEncoding?: string;
            safe?: string;
            cx?: string;
        }>;
    };
    context?: {
        title?: string;
    };
    searchInformation?: {
        searchTime?: number;
        formattedSearchTime?: string;
        totalResults?: string;
        formattedTotalResults?: string;
    };
    items?: Array<{
        kind?: string;
        title?: string;
        htmlTitle?: string;
        link?: string;
        displayLink?: string;
        snippet?: string;
        htmlSnippet?: string;
        cacheId?: string;
        formattedUrl?: string;
        htmlFormattedUrl?: string;
        pagemap?: Record<string, unknown>;
    }>;
}
/** Panel body data for `PANEL_BODY_GOOGLE_SEARCH_RESULT`: the list of Google Custom Search result items to render. */
export interface ChatContentPanelBodyGoogleSearchResultData {
    google_custom_search_items: Array<{
        kind?: string;
        title?: string;
        htmlTitle?: string;
        link?: string;
        displayLink?: string;
        snippet?: string;
        htmlSnippet?: string;
        cacheId?: string;
        formattedUrl?: string;
        htmlFormattedUrl?: string;
        pagemap?: Record<string, unknown>;
    }>;
}
/** Panel body data for `PANEL_BODY_CHATGPT_HOME`: the user prompt shown in the simulated ChatGPT query panel. */
export interface ChatContentPanelBodyChatGptHomeData {
    user_prompt: string;
}
/** Panel body data for `PANEL_BODY_CHATGPT_RESULT`: the user prompt and assistant response from a ChatGPT simulation. */
export interface ChatContentPanelBodyChatGptResultData {
    user_prompt: string;
    assistant_response: string;
}
/** Panel body data for `PANEL_BODY_GEMINI_HOME`: the user prompt shown in the simulated Gemini query panel. */
export interface ChatContentPanelBodyGeminiHomeData {
    user_prompt: string;
}
/** Panel body data for `PANEL_BODY_GEMINI_RESULT`: the user prompt and assistant response from a Gemini simulation. */
export interface ChatContentPanelBodyGeminiResultData {
    user_prompt: string;
    assistant_response: string;
}
/** Panel body data for `PANEL_BODY_PERPLEXITY_HOME`: the user prompt shown in the simulated Perplexity query panel. */
export interface ChatContentPanelBodyPerplexityHomeData {
    user_prompt: string;
}
/** Panel body data for `PANEL_BODY_PERPLEXITY_RESULT`: the user prompt and assistant response from a Perplexity simulation. */
export interface ChatContentPanelBodyPerplexityResultData {
    user_prompt: string;
    assistant_response: string;
}
/** Panel body data for `PANEL_BODY_GOOGLE_MAPS_HOME`: the location query shown in the simulated Maps home panel. */
export interface ChatContentPanelBodyGoogleMapsHomeData {
    search_query: string;
}
/** Panel body data for `PANEL_BODY_GOOGLE_MAPS_REVIEWS`: an array of Google Places review objects. */
export interface ChatContentPanelBodyGoogleMapsReviewsData {
    reviews: Array<{
        author_name?: string;
        author_url?: string;
        language?: string;
        original_language?: string;
        author_photo_url?: string;
        rating?: number;
        relative_time_description?: string;
        text?: string;
        time?: number;
        translated?: boolean;
        [key: string]: unknown;
    }>;
}
/** Data payload for a `CHAT_CONTENT_ACTIONABLE_CARDS` content item. */
export interface ActionableCardsContentData {
    actionable_cards_selected_indexes: number[];
    actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
    actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
    actionable_cards_items: ActionableCard[];
}
/** Data payload for a `CHAT_CONTENT_ACTIONABLE_CHIPS` content item. */
export interface ActionableChipsContentData {
    actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
    actionable_chips_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
    actionable_chips_items: ActionableChip[];
}
/** Data payload for a `CHAT_CONTENT_BUTTON` content item. */
export interface ButtonContentData {
    button_id: string;
    button_text: string;
    button_state: "ENABLED" | "DISABLED" | "LOADING";
    button_style?: ChatButtonStyle;
    button_actions: ChatAction[];
    button_icon: string;
}
/** Action data for `CHAT_ACTION_UPDATE_PROGRESS_BAR`: partial update fields for an existing progress bar content item. */
export interface UpdateProgressBarActionData {
    progress_bar_content_id: string;
    progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED";
    progress_bar_visibility?: "VISIBLE" | "HIDDEN";
    progress_bar_current_percentage?: number;
    progress_bar_current_animation_duration_ms?: number;
    progress_bar_next_goal_percentage?: number;
    progress_bar_next_goal_delay_ms?: number;
    progress_bar_next_goal_animation_duration_ms?: number;
    progress_bar_message?: string;
    progress_bar_icon?: "progress-bar-icon-web" | "progress-bar-icon-chatgpt" | "progress-bar-icon-gemini" | "progress-bar-icon-claude" | "progress-bar-icon-perplexity" | "progress-bar-icon-deepseek" | "progress-bar-icon-grok" | "progress-bar-icon-copilot" | "progress-bar-icon-google-search" | "progress-bar-icon-google-places" | "progress-bar-icon-web-search" | "progress-bar-icon-website-crawling" | "progress-bar-icon-data-processing" | "progress-bar-icon-ai-analysis" | "progress-bar-icon-file-upload" | "progress-bar-icon-database" | "progress-bar-icon-api" | "progress-bar-icon-security";
}
/** Action data for `CHAT_ACTION_UPDATE_PANEL`: partial update fields for an existing panel content item. */
export interface UpdatePanelActionData {
    target: "CHAT";
    panel_content_id: string;
    panel_header_title?: string;
    panel_header_description?: string;
    panel_header_icon?: string;
    panel_header_favicon_url?: string;
    panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_HTML" | "PANEL_BODY_IMAGE" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
    panel_visibility?: "VISIBLE" | "HIDDEN";
    panel_body_aspect_ratio?: string;
    streaming_options?: StreamingOptions;
    panel_transitions?: PanelTransitions;
    panel_effects?: PanelEffects;
    panel_scrolling_framer_motion_attributes?: FramerMotionAnimationAttributes;
    panel_body_data?: ChatContentPanelBodyMarkdownData | ChatContentPanelBodyHtmlData | ChatContentPanelBodyImageData | ChatContentPanelBodyGoogleSearchHomeData | ChatContentPanelBodyGoogleSearchResultData | ChatContentPanelBodyGoogleMapsHomeData | ChatContentPanelBodyGoogleMapsReviewsData | ChatContentPanelBodyChatGptHomeData | ChatContentPanelBodyChatGptResultData | ChatContentPanelBodyGeminiHomeData | ChatContentPanelBodyGeminiResultData | ChatContentPanelBodyPerplexityHomeData | ChatContentPanelBodyPerplexityResultData;
    should_have_scanning_line_animation?: boolean;
}
/** Action data for `CHAT_ACTION_UPDATE_BUTTON`: partial update fields (text, state, style, icon) for an existing button. */
export interface UpdateButtonActionData {
    button_content_id: string;
    button_text?: string;
    button_state: "ENABLED" | "DISABLED" | "LOADING";
    button_style?: ChatButtonStyle;
    button_icon: string;
}
/**
 * Blocks the current queue until specified content queues reach a condition.
 * Used to coordinate parallel content queues (e.g., wait for "website" queue).
 */
export interface WaitForQueuesActionData {
    /** Named queues to wait for (e.g., ["website", "reasoning"]). */
    queue_names: string[];
    /**
     * Wait mode:
     * - DRAIN: wait until pending content for these queues is processed.
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
/** Data payload for a `CHAT_CONTENT_ACTION_WRAPPER` content item — carries a single inline action to be processed immediately. */
export interface ActionWrapperContentData {
    action: ChatAction;
}
/** Shared base for all chat action types — carries a unique `action_id`. */
export interface BaseChatAction {
    action_id: string;
}
/**
 * Marks the completion of a content sequence.
 * The next assistant content item after this action will display the logo,
 * visually separating it from previous content.
 */
export interface CompleteContentSequenceAction extends BaseChatAction {
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}
/** Discriminated union of all chat and canvas action types. Dispatched by the action processor to mutate UI state. */
export type ChatAction = SendTextMessageAction | BeginSimulatedTurnAction | ChooseActionableCardAction | ChooseActionableChipAction | UpdatePanelAction | UpdateProgressBarAction | UpdateButtonAction | WaitForQueuesAction | CompleteContentSequenceAction | AppAction | CanvasAction;
/** Action that sends a text message to the specified target (chat, canvas, or app). */
export interface SendTextMessageAction extends BaseChatAction {
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
    action_data: SendTextMessageActionData;
}
/**
 * Begins a new simulated conversation turn.
 * Creates an empty turn container with no user content item and no assistant
 * content items.
 * and sets it as the current turn. Does not send any message to the server.
 * Used to visually separate assistant responses into distinct interaction cycles.
 */
export interface BeginSimulatedTurnAction extends BaseChatAction {
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
    action_data: BeginSimulatedTurnActionData;
}
/** Action that records a card selection in an actionable-cards content item. */
export interface ChooseActionableCardAction extends BaseChatAction {
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
    action_data: ChooseActionableCardActionData;
}
/** Action that records a chip selection in an actionable-chips content item. */
export interface ChooseActionableChipAction extends BaseChatAction {
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
    action_data: ChooseActionableChipActionData;
}
/** Action that applies a partial update to an existing progress bar content item. */
export interface UpdateProgressBarAction extends BaseChatAction {
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
    action_data: UpdateProgressBarActionData;
}
/** Action that applies a partial update to an existing panel content item. */
export interface UpdatePanelAction extends BaseChatAction {
    action_type: "CHAT_ACTION_UPDATE_PANEL";
    action_data: UpdatePanelActionData;
}
/** Action that applies a partial update to an existing button content item. */
export interface UpdateButtonAction extends BaseChatAction {
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
    action_data: UpdateButtonActionData;
}
/** Action that blocks the current queue until the specified content queues drain or reach the given condition. */
export interface WaitForQueuesAction extends BaseChatAction {
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
    action_data: WaitForQueuesActionData;
}
/** Discriminated union of all app-level actions. */
export type AppAction = AppThreadListRefreshAction | AppSetThemeAction | AppUserPreferenceUpdateAction | CoreConsoleAction | AppSetInputPlaceholderAction | AppWaitForUserInteractionAction | AppSetSendErrorAction;
/** Discriminated union of all canvas-level actions. */
export type CanvasAction = CanvasOpenAction | CanvasCloseAction | CanvasUpdateAction;
/** Action that refreshes thread lists in the application shell. */
export interface AppThreadListRefreshAction extends BaseChatAction {
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
    action_data: AppThreadListRefreshActionData;
}
/** Action that sets the application theme. */
export interface AppSetThemeAction extends BaseChatAction {
    action_type: "APP_ACTION_SET_THEME";
    action_data: AppSetThemeActionData;
}
/** Action that updates a user/application preference. */
export interface AppUserPreferenceUpdateAction extends BaseChatAction {
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
    action_data: AppUserPreferenceUpdateActionData;
}
/** Action that forwards producer diagnostics to the browser console. */
export interface CoreConsoleAction extends BaseChatAction {
    action_type: "APP_ACTION_CORE_CONSOLE";
    action_data: CoreConsoleActionData;
}
/** Action that sets the chat input placeholder. */
export interface AppSetInputPlaceholderAction extends BaseChatAction {
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
    action_data: AppSetInputPlaceholderActionData;
}
/** Action that pauses progression until user input/focus occurs. */
export interface AppWaitForUserInteractionAction extends BaseChatAction {
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
    action_data: AppWaitForUserInteractionActionData;
}
/** Action that surfaces a send-error state. */
export interface AppSetSendErrorAction extends BaseChatAction {
    action_type: "APP_ACTION_SET_SEND_ERROR";
    action_data: AppSetSendErrorActionData;
}
/** Action that opens or focuses a canvas. */
export interface CanvasOpenAction extends BaseChatAction {
    action_type: "CANVAS_ACTION_OPEN";
    action_data: CanvasOpenActionData;
}
/** Action that closes a canvas. */
export interface CanvasCloseAction extends BaseChatAction {
    action_type: "CANVAS_ACTION_CLOSE";
    action_data: CanvasCloseActionData;
}
/** Action that updates canvas state or contents. */
export interface CanvasUpdateAction extends BaseChatAction {
    action_type: "CANVAS_ACTION_UPDATE";
    action_data: CanvasUpdateActionData;
}
/** Union of all action data payload shapes; kept for backward compatibility with generic action handlers. */
export type ChatActionData = SendTextMessageActionData | BeginSimulatedTurnActionData | ChooseActionableCardActionData | ChooseActionableChipActionData | UpdateProgressBarActionData | UpdatePanelActionData | UpdateButtonActionData | WaitForQueuesActionData | AppActionData | CanvasActionData;
/** Action data for `CHAT_ACTION_SEND_TEXT_MESSAGE`. */
export interface SendTextMessageActionData {
    target: "CHAT" | "CANVAS" | "APP";
    role: "USER" | "ASSISTANT";
    text: string;
}
/**
 * Action data for CHAT_ACTION_BEGIN_SIMULATED_TURN.
 * Note: Only `target` is currently used. The `role` and `text` fields are reserved for future use.
 */
export interface BeginSimulatedTurnActionData {
    target: "CHAT" | "CANVAS" | "APP";
}
/** Action data for `CHAT_ACTION_CHOOSE_ACTIONABLE_CARD`: identifies the card selected and the simulated user message text. */
export interface ChooseActionableCardActionData {
    target: "CHAT" | "CANVAS" | "APP";
    actionable_cards_content_id: string;
    selected_card_value: string;
    selected_card_title: string;
    simulated_user_message_text: string;
}
/** Action data for `CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP`: identifies the chip selected and the simulated user message text. */
export interface ChooseActionableChipActionData {
    target: "CHAT" | "CANVAS" | "APP";
    actionable_chips_content_id: string;
    selected_chip_value: string;
    selected_chip_text: string;
    simulated_user_message_text: string;
}
/** Action data for `APP_ACTION_THREAD_LIST_REFRESH`: optional thread ID and filter criteria for the refresh. */
export interface AppThreadListRefreshActionData {
    thread_id?: string;
    filter_criteria?: Record<string, unknown>;
}
/** Action data for `APP_ACTION_SET_THEME`: sets the UI theme to `LIGHT`, `DARK`, or `AUTO`. */
export interface AppSetThemeActionData {
    theme: "LIGHT" | "DARK" | "AUTO";
}
/** Action data for `APP_ACTION_USER_PREFERENCE_UPDATE`: sets a named preference value at user, session, or global scope. */
export interface AppUserPreferenceUpdateActionData {
    preference_key: string;
    preference_value: unknown;
    preference_scope?: "USER" | "SESSION" | "GLOBAL";
}
/** Action data for `APP_ACTION_CORE_CONSOLE`: forwards a structured log message from the server to the browser console. */
export interface CoreConsoleActionData {
    level: "debug" | "info" | "warn" | "error";
    message: string;
    payload?: unknown;
    timestamp?: string;
    source?: string;
}
/** Action data for `APP_ACTION_SET_INPUT_PLACEHOLDER`: sets the chat input placeholder text. */
export interface AppSetInputPlaceholderActionData {
    target: "APP";
    placeholder: string;
}
/** Focus target token for the `APP_ACTION_WAIT_FOR_USER_INPUT` action. */
export type AppFocusTarget = "CHAT_INPUT" | "CANVAS" | "NONE";
/** Action data for `APP_ACTION_WAIT_FOR_USER_INPUT`: pauses pipeline turn processing until the user interacts. */
export interface AppWaitForUserInteractionActionData {
    target: "APP";
    focus_target?: AppFocusTarget;
}
/** UI/runtime-only send-error state kind for in-flight retry/recovery interactions. */
export declare const SEND_ERROR_STATE_KIND_STILL_PROCESSING: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_STILL_PROCESSING";
/** Runtime send-error state kinds include protocol error kinds plus UI/runtime-only states. */
export type SendErrorStateKind = AppSetSendErrorActionDataErrorKind | typeof SEND_ERROR_STATE_KIND_STILL_PROCESSING;
/** Source tokens for `SendErrorState`, tracking whether the error was surfaced by the protocol or transport layer. */
export type SendErrorStateSource = "SEND_ERROR_STATE_SOURCE_PROTOCOL" | "SEND_ERROR_STATE_SOURCE_TRANSPORT";
/** A single recovery hint shown in the send-error state, offering the user an actionable next step. */
export interface RecoveryHint {
    hint_id: string;
    hint_type: RecoveryHintType;
    label: string;
    description?: string;
    placeholder?: string;
    style?: RecoveryHintStyle;
}
/** Structured error diagnostics included with a `AppSetSendErrorActionData` payload for debugging. */
export interface ErrorDiagnosticInfo {
    diagnostic_id?: string;
    thread_id?: string;
    message_id?: string;
    pipeline_name?: string;
    source: ErrorDiagnosticInfoSource;
    timestamp?: string;
    status_code?: number;
    retry_count?: number;
}
/** Action data for `APP_ACTION_SET_SEND_ERROR`: surfaces an error kind, message, recovery hints, and diagnostics to the UI. */
export interface AppSetSendErrorActionData {
    target: "APP";
    error_kind: AppSetSendErrorActionDataErrorKind;
    message: string;
    recovery_hints?: RecoveryHint[];
    diagnostics?: ErrorDiagnosticInfo;
}
/** UI-side send-error state shape held in the app context after an `APP_ACTION_SET_SEND_ERROR` action. */
export interface SendErrorState {
    kind: SendErrorStateKind;
    message: string;
    recoveryHints: RecoveryHint[];
    diagnostics?: ErrorDiagnosticInfo;
    source: SendErrorStateSource;
}
/** Union of all app-level action data payloads. */
export type AppActionData = AppThreadListRefreshActionData | AppSetThemeActionData | AppUserPreferenceUpdateActionData | CoreConsoleActionData | AppSetInputPlaceholderActionData | AppWaitForUserInteractionActionData | AppSetSendErrorActionData;
/** Action data for `CANVAS_ACTION_OPEN`: opens or focuses a canvas with optional initial state and contents. */
export interface CanvasOpenActionData {
    target: "CANVAS";
    canvas_id?: string;
    canvas_title_label?: string;
    canvas_title_href?: string;
    canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS";
    canvas_icon?: string;
    canvas_initial_contents?: CanvasContent[];
}
/** Action data for `CANVAS_ACTION_CLOSE`: closes the specified canvas by ID. */
export interface CanvasCloseActionData {
    target: "CANVAS";
    canvas_id?: string;
}
/** Action data for `CANVAS_ACTION_UPDATE`: replaces, appends, modifies, or removes canvas contents. */
export interface CanvasUpdateActionData {
    target: "CANVAS";
    canvas_id: string;
    canvas_title_label?: string;
    canvas_title_href?: string;
    canvas_contents?: CanvasContent[];
    append_contents?: {
        canvas_insert_position: "TOP" | "BOTTOM";
        contents: CanvasContent[];
    };
    scroll_to_top_after_finish?: boolean;
    modify_contents?: {
        target_content_id: string;
        modification_type: "REVEAL" | "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT";
        new_content_data: CanvasHTMLContentData | CanvasMarkdownContentData | CanvasSectionContentData;
    };
    remove_contents?: {
        target_content_ids: string[];
    };
}
/** Union of all canvas action data payloads. */
export type CanvasActionData = CanvasOpenActionData | CanvasCloseActionData | CanvasUpdateActionData;
/** Closed string union of all chat content type tokens used in `content_type` discriminants. */
export type ChatContentType = "CHAT_CONTENT_MARKDOWN" | "CHAT_CONTENT_PROGRESS_BAR" | "CHAT_CONTENT_ACTIONABLE_CARDS" | "CHAT_CONTENT_ACTIONABLE_CHIPS" | "CHAT_CONTENT_BUTTON" | "CHAT_CONTENT_PANEL" | "CHAT_CONTENT_ACTION_WRAPPER";
/** Closed string union of all canvas content type tokens used in `content_type` discriminants. */
export type CanvasContentType = "CANVAS_CONTENT_MARKDOWN" | "CANVAS_CONTENT_SECTION" | "CANVAS_CONTENT_HTML";
/** Closed string union of all chat action type tokens used in `action_type` discriminants. */
export type ChatActionType = "CHAT_ACTION_SEND_TEXT_MESSAGE" | "CHAT_ACTION_BEGIN_SIMULATED_TURN" | "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD" | "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP" | "CHAT_ACTION_UPDATE_PROGRESS_BAR" | "CHAT_ACTION_UPDATE_BUTTON" | "CHAT_ACTION_UPDATE_PANEL" | "CHAT_ACTION_WAIT_FOR_QUEUES" | "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
/** Closed string union of all app action type tokens used in `action_type` discriminants. */
export type AppActionType = "APP_ACTION_THREAD_LIST_REFRESH" | "APP_ACTION_SET_THEME" | "APP_ACTION_USER_PREFERENCE_UPDATE" | "APP_ACTION_CORE_CONSOLE" | "APP_ACTION_SET_INPUT_PLACEHOLDER" | "APP_ACTION_WAIT_FOR_USER_INPUT" | "APP_ACTION_SET_SEND_ERROR";
/** Closed string union of all canvas action type tokens used in `action_type` discriminants. */
export type CanvasActionType = "CANVAS_ACTION_OPEN" | "CANVAS_ACTION_CLOSE" | "CANVAS_ACTION_UPDATE";
/** Chat content item rendering markdown text, optionally with streaming animation. */
export interface MarkdownContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_MARKDOWN";
    content_data: MarkdownContentData;
}
/** Chat content item rendering an animated progress bar. */
export interface ProgressBarContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_PROGRESS_BAR";
    content_data: ProgressBarContentData;
}
/** Chat content item rendering a rich panel (markdown, HTML, image, Google Search/Maps, ChatGPT, Gemini, or Perplexity variant). */
export interface ChatContentPanel extends BaseChatContent {
    content_type: "CHAT_CONTENT_PANEL";
    content_data: ChatContentPanelData;
}
/** Chat content item rendering a set of selectable cards with optional follow-on actions. */
export interface ActionableCardsContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
    content_data: ActionableCardsContentData;
}
/** Chat content item rendering a set of selectable chip buttons with optional follow-on actions. */
export interface ActionableChipsContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    content_data: ActionableChipsContentData;
}
/** Chat content item rendering a single interactive button. */
export interface ButtonContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_BUTTON";
    content_data: ButtonContentData;
}
/** Chat content item that carries a single action to execute inline rather than render visible UI. */
export interface ActionWrapperContent extends BaseChatContent {
    content_type: "CHAT_CONTENT_ACTION_WRAPPER";
    content_data: ActionWrapperContentData;
}
/** One labelled value shown on an actionable card, as an item of `card_fields`. */
export interface ActionableCardField {
    label: string;
    value: string;
}
/** A single card item within an `ActionableCardsContent`, with title, subtitle, value, and follow-on actions. */
export interface ActionableCard {
    card_title: string;
    card_subtitle: string;
    /** Longer text shown under the title. It is separate from the subtitle. */
    card_body?: string;
    /** Labelled values in display order. */
    card_fields?: ActionableCardField[];
    /** Identifier of the follow-up action. Present only when the card can be chosen. */
    card_action_id?: string;
    card_value: string;
    card_actions: ChatAction[];
}
/** A single chip item within an `ActionableChipsContent`, with text, value, style, state, and optional follow-on actions. */
export interface ActionableChip {
    chip_text: string;
    chip_value: string;
    chip_style?: ChatChipStyle;
    chip_state?: "ENABLED" | "DISABLED" | "SELECTED";
    chip_actions?: ChatAction[];
}
/** UI-side streaming render state for text content items under active animation. */
export interface StreamingState {
    isStreaming: boolean;
    isPaused: boolean;
    currentText: string;
    targetText: string;
    speed: number;
}
/** Narrow action union for use cases that only need to handle text-message sending and button updates. */
export type AllChatActions = SendTextMessageAction | UpdateButtonAction;
/** Data for a `CANVAS_CONTENT_MARKDOWN` canvas item, including optional style variant. */
export interface CanvasMarkdownContentData {
    markdown?: string;
    markdown_style?: "DEFAULT" | "COMPACT" | "LARGE";
}
/** Data for a canvas HTML content item, including optional table-of-contents metadata and opaque consumer section metadata. */
export interface CanvasHTMLContentData {
    html: string;
    toc_label?: string;
    toc_key?: string;
    section_data?: JsonObject;
}
/** Data for a `CANVAS_CONTENT_SECTION` canvas item, including title, style, collapse state, and nested contents. */
export interface CanvasSectionContentData {
    section_title: string;
    section_collapsed?: boolean;
    section_style?: "DEFAULT" | "BORDERED" | "HIGHLIGHTED" | "COMPACT";
    section_contents: CanvasContent[];
}
/** Modification operation token applied to canvas content items by the canvas reducer. */
export type CanvasModificationType = "REVEAL" | "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT";
/** Shared base fields present on every canvas content item. */
export interface BaseCanvasContent {
    content_id: string;
    content_layout_priority?: number;
    content_section_depth?: number;
    /** The last modification type applied to this content (set by reducer) */
    lastModificationType?: CanvasModificationType;
}
/** Canvas content item rendering markdown text with an optional style variant. */
export interface CanvasMarkdownContent extends BaseCanvasContent {
    content_type: "CANVAS_CONTENT_MARKDOWN";
    content_data: CanvasMarkdownContentData;
}
/** Canvas content item rendering raw HTML, optionally with table-of-contents metadata and opaque extension data. */
export interface CanvasHTMLContent extends BaseCanvasContent {
    content_type: "CANVAS_CONTENT_HTML";
    content_data: CanvasHTMLContentData;
}
/** Canvas content item rendering a collapsible section with a title and nested canvas contents. */
export interface CanvasSectionContent extends BaseCanvasContent {
    content_type: "CANVAS_CONTENT_SECTION";
    content_data: CanvasSectionContentData;
}
/** Discriminated union of all canvas content types, keyed by `content_type`. */
export type CanvasContent = CanvasMarkdownContent | CanvasHTMLContent | CanvasSectionContent;
/** UI-side state for a single canvas panel, managed by the canvas context reducer. */
export interface SingleCanvasState {
    canvasId: string;
    title?: string | null;
    titleHref?: string | null;
    state: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS";
    icon: string | null;
    contents: CanvasContent[];
    justOpened?: boolean;
    minimized?: boolean;
    lastModificationType?: CanvasModificationType;
    hasModifications?: boolean;
    /** Incremented on each OPEN action to force React remount and stop animations */
    generation?: number;
    /** When true, triggers scroll-to-top illusion after animation completes */
    scrollToTopAfterFinish?: boolean;
}
/** Root canvas context state holding all open canvas panels, the active canvas ID, and open/closed status. */
export interface CanvasState {
    canvases: Map<string, SingleCanvasState>;
    activeCanvasId: string | null;
    isOpen: boolean;
}
/** Canvas HTML payload with consumer-typed extension metadata. */
export type RuntimeChatCanvasHtmlContentData<SectionData = JsonObject> = Omit<CanvasHTMLContentData, "section_data"> & {
    section_data?: SectionData;
};
/** Canvas HTML content item with consumer-typed extension metadata. */
export type RuntimeChatCanvasHtmlContent<SectionData = JsonObject> = Omit<CanvasHTMLContent, "content_data"> & {
    content_data: RuntimeChatCanvasHtmlContentData<SectionData>;
};
/** Canvas section payload with recursively typed nested canvas contents. */
export type RuntimeChatCanvasSectionContentData<SectionData = JsonObject> = Omit<CanvasSectionContentData, "section_contents"> & {
    section_contents: RuntimeChatCanvasContent<SectionData>[];
};
/** Canvas section content item with recursively typed nested canvas contents. */
export type RuntimeChatCanvasSectionContent<SectionData = JsonObject> = Omit<CanvasSectionContent, "content_data"> & {
    content_data: RuntimeChatCanvasSectionContentData<SectionData>;
};
/** Canvas content union parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatCanvasContent<SectionData = JsonObject> = CanvasMarkdownContent | RuntimeChatCanvasHtmlContent<SectionData> | RuntimeChatCanvasSectionContent<SectionData>;
/** Canvas open action payload parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatCanvasOpenActionData<SectionData = JsonObject> = Omit<CanvasOpenActionData, "canvas_initial_contents"> & {
    canvas_initial_contents?: RuntimeChatCanvasContent<SectionData>[];
};
/** Canvas update action payload parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatCanvasUpdateActionData<SectionData = JsonObject> = Omit<CanvasUpdateActionData, "canvas_contents" | "append_contents" | "modify_contents"> & {
    canvas_contents?: RuntimeChatCanvasContent<SectionData>[];
    append_contents?: {
        canvas_insert_position: "TOP" | "BOTTOM";
        contents: RuntimeChatCanvasContent<SectionData>[];
    };
    modify_contents?: {
        target_content_id: string;
        modification_type: CanvasModificationType;
        new_content_data: RuntimeChatCanvasHtmlContentData<SectionData> | CanvasMarkdownContentData | RuntimeChatCanvasSectionContentData<SectionData>;
    };
};
/** Canvas action payload union parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatCanvasActionData<SectionData = JsonObject> = RuntimeChatCanvasOpenActionData<SectionData> | CanvasCloseActionData | RuntimeChatCanvasUpdateActionData<SectionData>;
/** Canvas action parameterized by consumer-owned HTML metadata and runtime-only action metadata. */
export type RuntimeChatCanvasAction<SectionData = JsonObject, RuntimeMetadata extends object = object> = Omit<CanvasAction, "action_data"> & RuntimeMetadata & {
    action_data: RuntimeChatCanvasActionData<SectionData>;
};
/** Chat action data union parameterized by consumer-owned canvas HTML `section_data` metadata. */
export type RuntimeChatActionData<SectionData = JsonObject> = SendTextMessageActionData | BeginSimulatedTurnActionData | ChooseActionableCardActionData | ChooseActionableChipActionData | UpdateProgressBarActionData | UpdatePanelActionData | UpdateButtonActionData | WaitForQueuesActionData | AppActionData | RuntimeChatCanvasActionData<SectionData>;
/** Chat action union parameterized by consumer-owned canvas metadata and runtime-only action metadata. */
export type RuntimeChatAction<SectionData = JsonObject, RuntimeMetadata extends object = object> = SendTextMessageAction | BeginSimulatedTurnAction | ChooseActionableCardAction | ChooseActionableChipAction | UpdatePanelAction | UpdateProgressBarAction | UpdateButtonAction | WaitForQueuesAction | CompleteContentSequenceAction | AppAction | RuntimeChatCanvasAction<SectionData, RuntimeMetadata>;
/** Single canvas state parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatSingleCanvasState<SectionData = JsonObject> = Omit<SingleCanvasState, "contents"> & {
    contents: RuntimeChatCanvasContent<SectionData>[];
};
/** Canvas state parameterized by consumer-owned HTML `section_data` metadata. */
export type RuntimeChatCanvasState<SectionData = JsonObject> = Omit<CanvasState, "canvases"> & {
    canvases: Map<string, RuntimeChatSingleCanvasState<SectionData>>;
};
/** Stable reasons passed to synthetic content-id factories when compiling protocol actions. */
export type RuntimeChatSyntheticContentIdReason = "RUNTIME_CHAT_SYNTHETIC_CONTENT_ID_REASON_SEND_TEXT_MESSAGE" | "RUNTIME_CHAT_SYNTHETIC_CONTENT_ID_REASON_CHOOSE_ACTIONABLE_CHIP";
/** Canvas actions only need to stay opaque pass-through values during headless action compilation. */
export type RuntimeChatCompilableCanvasAction = BaseChatAction & {
    action_type: "CANVAS_ACTION_OPEN" | "CANVAS_ACTION_UPDATE" | "CANVAS_ACTION_CLOSE";
    action_data: object;
};
/** Action shapes accepted by the package-owned headless action compiler. */
export type RuntimeChatCompilableAction = Exclude<ChatAction, CanvasAction> | RuntimeChatCompilableCanvasAction;
/** Context for generating a content id for user-facing content synthesized from protocol actions. */
export interface RuntimeChatSyntheticContentIdFactoryOptions<Action extends RuntimeChatCompilableAction = RuntimeChatCompilableAction> {
    reason: RuntimeChatSyntheticContentIdReason;
    action: Action;
}
/** Factory used by headless action compilation when a protocol action creates synthetic user content. */
export type RuntimeChatSyntheticContentIdFactory<Action extends RuntimeChatCompilableAction = RuntimeChatCompilableAction> = (options: RuntimeChatSyntheticContentIdFactoryOptions<Action>) => string;
/** Options for compiling one protocol action into headless runtime commands. */
export interface RuntimeChatCompileActionToCommandsOptions<Action extends RuntimeChatCompilableAction = RuntimeChatCompilableAction> {
    action: Action;
    defaultContentQueue: ContentQueue;
    createSyntheticContentId: RuntimeChatSyntheticContentIdFactory<Action>;
}
/**
 * Headless command vocabulary produced from protocol actions.
 *
 * These commands describe reusable protocol semantics only; consumers still own the concrete UI,
 * networking, canvas, and application side effects for each command.
 */
export type RuntimeChatActionCommand<Action extends RuntimeChatCompilableAction = RuntimeChatCompilableAction> = {
    type: "RUNTIME_CHAT_ACTION_COMMAND_ADD_MESSAGE";
    role: "USER" | "ASSISTANT";
    contentItems: AllChatContent[];
    insertAfterContentId?: string;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_SEND_MESSAGE";
    message?: string;
    customURL?: string;
    userMessageMetadata?: Record<string, string | boolean | object>;
    userActions?: Action[];
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_PROGRESS_BAR";
    action: Extract<Action, {
        action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
    }>;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_PANEL";
    action: Extract<Action, {
        action_type: "CHAT_ACTION_UPDATE_PANEL";
    }>;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_BUTTON";
    action: Extract<Action, {
        action_type: "CHAT_ACTION_UPDATE_BUTTON";
    }>;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_WAIT_FOR_QUEUES";
    action: Extract<Action, {
        action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
    }>;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_WAIT_FOR_USER_INTERACTION";
    focusTarget?: AppFocusTarget;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_REFRESH_THREADS";
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_PROCESS_CANVAS_ACTION";
    action: Extract<Action, {
        action_type: "CANVAS_ACTION_OPEN" | "CANVAS_ACTION_UPDATE" | "CANVAS_ACTION_CLOSE";
    }>;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_CREATE_NEW_TURN";
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_MARK_NEXT_CONTENT_ITEM_AS_SEQUENCE_START";
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_SET_INPUT_PLACEHOLDER";
    placeholder: string;
} | {
    type: "RUNTIME_CHAT_ACTION_COMMAND_SET_SEND_ERROR";
    sendError: SendErrorState;
};
/** Compile one protocol action into product-agnostic runtime commands. */
export declare function RuntimeChat_compileActionToCommands<Action extends RuntimeChatCompilableAction>(options: RuntimeChatCompileActionToCommandsOptions<Action>): RuntimeChatActionCommand<Action>[];
/** Headless command vocabulary produced from protocol content items. */
export type RuntimeChatContentCommand = {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_PROGRESS_BAR";
    content: ProgressBarContent;
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_MARKDOWN";
    content: MarkdownContent;
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_PANEL";
    content: ChatContentPanel;
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTIONABLE_CARDS";
    content: ActionableCardsContent;
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTIONABLE_CHIPS";
    content: ActionableChipsContent;
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_BUTTON";
} | {
    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTION";
    action: ChatAction;
};
/** Compile one protocol content item into product-agnostic runtime content commands. */
export declare function RuntimeChat_compileContentItemToCommands(content: AllChatContent): RuntimeChatContentCommand[];
/**
 * Produces a concise, human-readable protocol content summary for logs and debug traces.
 */
export declare function RuntimeChat_getContentSummary(content: AllChatContent): string;
/** Minimal pending-message shape required by runtime chat image URL discovery helpers. */
export interface RuntimeChatPendingMessageLike {
    readonly message: ChatMessage;
}
/** Extracts deduplicated image URLs from a chat message's protocol content items. */
export declare function RuntimeChat_extractImageUrlsFromMessage(message: ChatMessage): string[];
/** Extracts deduplicated image URLs from one queued/pending protocol message. */
export declare function RuntimeChat_extractImageUrlsFromPendingMessage(pendingMessage: RuntimeChatPendingMessageLike): string[];
/** Extracts deduplicated image URLs from many queued/pending protocol messages. */
export declare function RuntimeChat_extractImageUrlsFromPendingMessages(pendingMessages: readonly RuntimeChatPendingMessageLike[]): string[];
/** Extracts image URLs from one protocol content item. */
export declare function RuntimeChat_extractImageUrlsFromContent(content: AllChatContent): string[];
/** Extracts image URLs from one protocol action payload. */
export declare function RuntimeChat_extractImageUrlsFromAction(action: ChatAction): string[];
/**
 * Partitions queued/pending messages by whether protocol panel payloads contain image URLs.
 */
export declare function RuntimeChat_groupPendingMessagesByImageContent<Message extends RuntimeChatPendingMessageLike>(messages: readonly Message[]): {
    withImages: Message[];
    withoutImages: Message[];
};
//# sourceMappingURL=index.d.ts.map