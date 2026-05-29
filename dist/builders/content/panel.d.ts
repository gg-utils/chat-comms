/**
 * @fileoverview Builds CHAT_CONTENT_PANEL payloads with validated headers, body types, animation metadata, and streaming hints.
 *
 * This is the heaviest chat content builder: constructor work runs panel/body validators shared with update-panel actions.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_PanelContentBuilder } from "./panel.js";
 *
 * const content = new CommunicationProtocol_PanelContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "task-panel",
 *   panel_header_title: "Task",
 *   panel_body_type: "PANEL_BODY_MARKDOWN",
 *   panel_body_data: "## Progress\n\n50% complete.",
 *   message_id: "msg-80",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PANEL.md - panel content contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_PanelContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_PanelEffect, CommunicationProtocol_PanelTransition, PanelBodyAspectRatio, PanelHeaderIcon } from "../../types/animation.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { CommunicationProtocol_PanelBody_ChatGptHomeContent, CommunicationProtocol_PanelBody_GeminiHomeContent, CommunicationProtocol_PanelBody_GoogleMapsHomeContent, CommunicationProtocol_PanelBody_GoogleMapsReviewsContent, CommunicationProtocol_PanelBody_GoogleSearchHomeContent, CommunicationProtocol_PanelBody_GoogleSearchResultContent, CommunicationProtocol_PanelBody_PerplexityHomeContent, PanelVisibilityState } from "../../types/common.js";
/**
 * Fluent builder for CHAT_CONTENT_PANEL with auto-ID support.
 *
 * @remarks
 * Runs shared animation and body validators during construction; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_PanelContentBuilder({ panel_body_type: "PANEL_BODY_MARKDOWN", panel_body_data: "x", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_PanelContentBuilder {
    private content;
    /**
     * Initialize the panel content builder with comprehensive animation support
     *
     * @param options - Configuration options for the panel content including animation features
     */
    constructor(options: CommunicationProtocol_PanelContentOptions);
    /**
     * Set panel header text
     *
     * @param header - Header text to display at top of panel
     * @returns This builder instance for method chaining
     */
    setHeader(header: string): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear the panel header
     *
     * @returns This builder instance for method chaining
     */
    clearHeader(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel header icon
     *
     * @param icon - Panel header icon (predefined icon or custom URL)
     * @returns This builder instance for method chaining
     */
    setHeaderIcon(icon: PanelHeaderIcon): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear the panel header icon
     *
     * @returns This builder instance for method chaining
     */
    clearHeaderIcon(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel header description
     *
     * @param description - Header description text
     * @returns This builder instance for method chaining
     */
    setHeaderDescription(description: string): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear the panel header description
     *
     * @returns This builder instance for method chaining
     */
    clearHeaderDescription(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel visibility state
     *
     * @param visibility - Panel visibility state
     * @returns This builder instance for method chaining
     */
    setVisibility(visibility: PanelVisibilityState): CommunicationProtocol_PanelContentBuilder;
    /**
     * Show the panel (set visibility to VISIBLE)
     *
     * @returns This builder instance for method chaining
     */
    show(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Hide the panel (set visibility to HIDDEN)
     *
     * @returns This builder instance for method chaining
     */
    hide(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel body aspect ratio
     *
     * @param aspectRatio - Panel body aspect ratio
     * @returns This builder instance for method chaining
     */
    setAspectRatio(aspectRatio: PanelBodyAspectRatio): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear the panel body aspect ratio
     *
     * @returns This builder instance for method chaining
     */
    clearAspectRatio(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel animation transitions
     *
     * @param transitions - Array of panel transition configurations
     * @returns This builder instance for method chaining
     */
    setTransitions(transitions: CommunicationProtocol_PanelTransition[]): CommunicationProtocol_PanelContentBuilder;
    /**
     * Add a single animation transition
     *
     * @param transition - Panel transition configuration to add
     * @returns This builder instance for method chaining
     */
    addTransition(transition: CommunicationProtocol_PanelTransition): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear all panel animation transitions
     *
     * @returns This builder instance for method chaining
     */
    clearTransitions(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel overlay effects
     *
     * @param effects - Array of panel overlay effects
     * @returns This builder instance for method chaining
     */
    setEffects(effects: CommunicationProtocol_PanelEffect[]): CommunicationProtocol_PanelContentBuilder;
    /**
     * Add a single overlay effect
     *
     * @param effect - Panel overlay effect configuration to add
     * @returns This builder instance for method chaining
     */
    addEffect(effect: CommunicationProtocol_PanelEffect): CommunicationProtocol_PanelContentBuilder;
    /**
     * Clear all overlay effects
     *
     * @returns This builder instance for method chaining
     */
    clearEffects(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set streaming options for controlling content delivery timing
     *
     * @param options - Streaming options object with chunkInterval, desiredTotalDuration, and maximumDuration
     * @returns This builder instance for method chaining
     */
    setStreamingOptions(options: {
        chunkInterval?: number;
        desiredTotalDuration?: number;
        maximumDuration?: number;
    }): CommunicationProtocol_PanelContentBuilder;
    /**
     * Remove streaming timing hints from the panel payload so delivery reverts to protocol defaults.
     *
     * @returns This builder instance for method chaining
     */
    clearStreamingOptions(): CommunicationProtocol_PanelContentBuilder;
    /**
     * Validate current panel animation configuration
     *
     * Performs comprehensive validation of all animation-related properties
     * including header icon, visibility, aspect ratio, and transitions.
     *
     * @returns Validation result with detailed feedback
     *
     * @example
     * ```typescript
     * const panel = new CommunicationProtocol_PanelContentBuilder(options);
     * const validation = panel.validateAnimationConfig();
     *
     * if (!validation.isValid) {
     *   console.error(createValidationSummary(validation));
     * }
     * ```
     */
    validateAnimationConfig(): import("../../animation/index.js").CommunicationProtocol_Animation_ValidationResult;
    /**
     * Validate and set panel header icon with error handling
     *
     * @param icon - Panel header icon to validate and set
     * @param throwOnError - Whether to throw an error on validation failure (default: true)
     * @returns This builder instance for method chaining
     * @throws {Error} If validation fails and throwOnError is true
     */
    setHeaderIconWithValidation(icon: PanelHeaderIcon, throwOnError?: boolean): CommunicationProtocol_PanelContentBuilder;
    /**
     * Validate and set panel visibility with error handling
     *
     * @param visibility - Panel visibility state to validate and set
     * @param throwOnError - Whether to throw an error on validation failure (default: true)
     * @returns This builder instance for method chaining
     * @throws {Error} If validation fails and throwOnError is true
     */
    setVisibilityWithValidation(visibility: PanelVisibilityState, throwOnError?: boolean): CommunicationProtocol_PanelContentBuilder;
    /**
     * Validate and set panel aspect ratio with error handling
     *
     * @param aspectRatio - Panel body aspect ratio to validate and set
     * @param throwOnError - Whether to throw an error on validation failure (default: true)
     * @returns This builder instance for method chaining
     * @throws {Error} If validation fails and throwOnError is true
     */
    setAspectRatioWithValidation(aspectRatio: PanelBodyAspectRatio, throwOnError?: boolean): CommunicationProtocol_PanelContentBuilder;
    /**
     * Validate and set panel transitions with error handling
     *
     * @param transitions - Panel transitions array to validate and set
     * @param throwOnError - Whether to throw an error on validation failure (default: true)
     * @returns This builder instance for method chaining
     * @throws {Error} If validation fails and throwOnError is true
     */
    setTransitionsWithValidation(transitions: CommunicationProtocol_PanelTransition[], throwOnError?: boolean): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel body type
     *
     * @param type - Type of body content (supports both legacy and new formats)
     * @returns This builder instance for method chaining
     */
    setBodyType(type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT"): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set panel body content (must match the body type)
     *
     * @param content - Content data that matches the current body type
     * @returns This builder instance for method chaining
     */
    setBodyContent(content: unknown): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set both body type and content together (with validation)
     *
     * @param type - Type of body content (supports both legacy and new formats)
     * @param content - Content data that matches the specified type
     * @returns This builder instance for method chaining
     */
    setBody(type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT", content: unknown): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set markdown body content (convenience method)
     *
     * @param markdown - Markdown text content
     * @returns This builder instance for method chaining
     */
    setMarkdownBody(markdown: string): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set reasoning markdown body content V1 (convenience method)
     *
     * V1: Headerless panels focused on content display
     *
     * @param markdown - Markdown text content for reasoning display
     * @returns This builder instance for method chaining
     */
    setReasoningMarkdownBody(markdown: string): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set reasoning markdown body content V2 (convenience method)
     *
     * V2: Uses header title for progress messages, body accumulates full reasoning
     *
     * @param markdown - Markdown text content for reasoning display
     * @returns This builder instance for method chaining
     */
    setReasoningMarkdownV2Body(markdown: string): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set actionable cards body content (convenience method)
     *
     * @param cardsData - Actionable cards configuration object
     * @returns This builder instance for method chaining
     */
    setActionableCardsBody(cardsData: object): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set actionable chips body content (convenience method)
     *
     * @param chipsData - Actionable chips configuration object
     * @returns This builder instance for method chaining
     */
    setActionableChipsBody(chipsData: object): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set image body content (convenience method)
     *
     * @param imageData - Image body data with url, alt text, and optional positioning/animation
     * @returns This builder instance for method chaining
     */
    setImageBody(imageData: {
        image_url: string;
        image_alt_text: string;
        image_gravity?: string;
        image_sizing?: string;
        image_animation_type?: string;
        image_animation_framer_motion_attributes?: object;
    }): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Google Search Home body content (convenience method)
     *
     * @param searchData - Google Search Home data with search query
     * @returns This builder instance for method chaining
     */
    setGoogleSearchHomeBody(searchData: CommunicationProtocol_PanelBody_GoogleSearchHomeContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Google Search Result body content (convenience method)
     *
     * @param resultData - Google Search Result data with Google Custom Search API items
     * @returns This builder instance for method chaining
     */
    setGoogleSearchResultBody(resultData: CommunicationProtocol_PanelBody_GoogleSearchResultContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set ChatGPT Home body content (convenience method)
     *
     * @param promptData - ChatGPT Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setChatGptHomeBody(promptData: CommunicationProtocol_PanelBody_ChatGptHomeContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set ChatGPT Result body content (convenience method)
     *
     * @param resultData - ChatGPT Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setChatGptResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Gemini Home body content (convenience method)
     *
     * @param promptData - Gemini Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setGeminiHomeBody(promptData: CommunicationProtocol_PanelBody_GeminiHomeContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Gemini Result body content (convenience method)
     *
     * @param resultData - Gemini Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setGeminiResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Perplexity Home body content (convenience method)
     *
     * @param promptData - Perplexity Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setPerplexityHomeBody(promptData: CommunicationProtocol_PanelBody_PerplexityHomeContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Perplexity Result body content (convenience method)
     *
     * @param resultData - Perplexity Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setPerplexityResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Google Maps Home body content (convenience method)
     *
     * @param searchData - Google Maps Home data with search query
     * @returns This builder instance for method chaining
     */
    setGoogleMapsHomeBody(searchData: CommunicationProtocol_PanelBody_GoogleMapsHomeContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Set Google Maps Reviews body content (convenience method)
     *
     * @param reviewsData - Google Maps Reviews data with Google Places API review objects
     * @returns This builder instance for method chaining
     */
    setGoogleMapsReviewsBody(reviewsData: CommunicationProtocol_PanelBody_GoogleMapsReviewsContent): CommunicationProtocol_PanelContentBuilder;
    /**
     * Get current panel header
     *
     * @returns Current header text
     */
    getHeader(): string;
    /**
     * Get current body type
     *
     * @returns Current body content type
     */
    getBodyType(): string;
    /**
     * Get current body content
     *
     * @returns Current body content data
     */
    getBodyContent(): unknown;
    /**
     * Check if panel has a header
     *
     * @returns True if header is not empty
     */
    hasHeader(): boolean;
    /**
     * Check if body content is markdown
     *
     * @returns True if body type is markdown
     */
    isMarkdownBody(): boolean;
    /**
     * Check if body content is reasoning markdown (V1 or V2)
     *
     * @returns True if body type is reasoning markdown (any version)
     */
    isReasoningMarkdownBody(): boolean;
    /**
     * Check if body content is reasoning markdown V1
     *
     * @returns True if body type is reasoning markdown V1
     */
    isReasoningMarkdownV1Body(): boolean;
    /**
     * Check if body content is reasoning markdown V2
     *
     * @returns True if body type is reasoning markdown V2
     */
    isReasoningMarkdownV2Body(): boolean;
    /**
     * Check if body content is actionable cards
     *
     * @returns True if body type is actionable_cards
     */
    isActionableCardsBody(): boolean;
    /**
     * Check if body content is actionable chips
     *
     * @returns True if body type is actionable_chips
     */
    isActionableChipsBody(): boolean;
    /**
     * Check if body content is image
     *
     * @returns True if body type is PANEL_BODY_IMAGE
     */
    isImageBody(): boolean;
    /**
     * Check if body content is Google Search Home
     *
     * @returns True if body type is PANEL_BODY_GOOGLE_SEARCH_HOME
     */
    isGoogleSearchHomeBody(): boolean;
    /**
     * Check if body content is Google Search Result
     *
     * @returns True if body type is PANEL_BODY_GOOGLE_SEARCH_RESULT
     */
    isGoogleSearchResultBody(): boolean;
    /**
     * Check if body content is ChatGPT Home
     *
     * @returns True if body type is PANEL_BODY_CHATGPT_HOME
     */
    isChatGptHomeBody(): boolean;
    /**
     * Check if body content is ChatGPT Result
     *
     * @returns True if body type is PANEL_BODY_CHATGPT_RESULT
     */
    isChatGptResultBody(): boolean;
    /**
     * Check if body content is Gemini Home
     *
     * @returns True if body type is PANEL_BODY_GEMINI_HOME
     */
    isGeminiHomeBody(): boolean;
    /**
     * Check if body content is Gemini Result
     *
     * @returns True if body type is PANEL_BODY_GEMINI_RESULT
     */
    isGeminiResultBody(): boolean;
    /**
     * Check if body content is Perplexity Home
     *
     * @returns True if body type is PANEL_BODY_PERPLEXITY_HOME
     */
    isPerplexityHomeBody(): boolean;
    /**
     * Check if body content is Perplexity Result
     *
     * @returns True if body type is PANEL_BODY_PERPLEXITY_RESULT
     */
    isPerplexityResultBody(): boolean;
    /**
     * Check if body content is Google Maps Home
     *
     * @returns True if body type is PANEL_BODY_GOOGLE_MAPS_HOME
     */
    isGoogleMapsHomeBody(): boolean;
    /**
     * Check if body content is Google Maps Reviews
     *
     * @returns True if body type is PANEL_BODY_GOOGLE_MAPS_REVIEWS
     */
    isGoogleMapsReviewsBody(): boolean;
    /**
     * Validate that body content matches the specified body type
     *
     * @private
     * @param bodyType - The expected body type
     * @param bodyContent - The content to validate
     * @throws Error if content doesn't match expected type
     */
    private validateBodyContent;
    /**
     * Validate `PANEL_BODY_IMAGE` required string fields.
     *
     * @private
     * @param content - Panel body object routed for image panels.
     * @throws Error if `image_url` or `image_alt_text` is missing or not a string.
     */
    private validateImageContent;
    /**
     * Validate `PANEL_BODY_GOOGLE_SEARCH_HOME` search query field.
     *
     * @private
     * @param content - Panel body object routed for Google Search home panels.
     * @throws Error if `search_query` is missing or not a string.
     */
    private validateGoogleSearchHomeContent;
    /**
     * Validate `PANEL_BODY_GOOGLE_MAPS_HOME` search query field.
     *
     * @private
     * @param content - Panel body object routed for Google Maps home panels.
     * @throws Error if `search_query` is missing or not a string.
     */
    private validateGoogleMapsHomeContent;
    /**
     * Validate `PANEL_BODY_GOOGLE_MAPS_REVIEWS` reviews collection.
     *
     * @private
     * @param content - Panel body object routed for Google Maps reviews panels.
     * @throws Error if `reviews` is missing or not an array.
     */
    private validateGoogleMapsReviewsContent;
    /**
     * Validate `PANEL_BODY_CHATGPT_HOME` user prompt field.
     *
     * @private
     * @param content - Panel body object routed for ChatGPT home panels.
     * @throws Error if `user_prompt` is missing or not a string.
     */
    private validateChatGptHomeContent;
    /**
     * Validate `PANEL_BODY_CHATGPT_RESULT` prompt and assistant response fields.
     *
     * @private
     * @param content - Panel body object routed for ChatGPT result panels.
     * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
     */
    private validateChatGptResultContent;
    /**
     * Validate `PANEL_BODY_GEMINI_HOME` user prompt field.
     *
     * @private
     * @param content - Panel body object routed for Gemini home panels.
     * @throws Error if `user_prompt` is missing or not a string.
     */
    private validateGeminiHomeContent;
    /**
     * Validate `PANEL_BODY_GEMINI_RESULT` prompt and assistant response fields.
     *
     * @private
     * @param content - Panel body object routed for Gemini result panels.
     * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
     */
    private validateGeminiResultContent;
    /**
     * Validate `PANEL_BODY_PERPLEXITY_HOME` user prompt field.
     *
     * @private
     * @param content - Panel body object routed for Perplexity home panels.
     * @throws Error if `user_prompt` is missing or not a string.
     */
    private validatePerplexityHomeContent;
    /**
     * Validate `PANEL_BODY_PERPLEXITY_RESULT` prompt and assistant response fields.
     *
     * @private
     * @param content - Panel body object routed for Perplexity result panels.
     * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
     */
    private validatePerplexityResultContent;
    /**
     * Get default body content for a given type
     *
     * @private
     * @param type - Panel body discriminator string (each `PANEL_BODY_*` case maps to an empty or scaffolded payload shape).
     * @returns Default content for the specified type
     */
    private getDefaultBodyContent;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=panel.d.ts.map