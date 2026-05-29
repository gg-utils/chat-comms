/**
 * @fileoverview Builds CHAT_ACTION_UPDATE_PANEL payloads to mutate an existing panel (header, body type, body data, visibility, animation).
 *
 * Constructor options are validated against `panel_body_type`; fluent methods return `this` until `build()` emits an immutable `CommunicationProtocol_ChatAction`.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_UpdatePanelActionBuilder } from "./update-panel.js";
 *
 * const action = new CommunicationProtocol_UpdatePanelActionBuilder({
 *   autoId: "panel-refresh",
 *   content_queue: "main",
 *   content_id: "panel-main",
 *   panel_header_title: "Updated",
 *   panel_body_type: "PANEL_BODY_MARKDOWN",
 *   panel_body_data: "## Status\n\nDone.",
 *   message_id: "msg-901",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PANEL.md - update-panel action contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_UpdatePanelActionOptions } from "../../../options/action-options.js";
import type { CommunicationProtocol_ChatAction } from "../../../types/chat.js";
import type { CommunicationProtocol_PanelBody_ChatGptHomeContent, CommunicationProtocol_PanelBody_GeminiHomeContent, CommunicationProtocol_PanelBody_GoogleMapsHomeContent, CommunicationProtocol_PanelBody_GoogleMapsReviewsContent, CommunicationProtocol_PanelBody_GoogleSearchHomeContent, CommunicationProtocol_PanelBody_GoogleSearchResultContent, CommunicationProtocol_PanelBody_ImageContent, CommunicationProtocol_PanelBody_PerplexityHomeContent, PanelBodyType } from "../../../types/common.js";
/**
 * Fluent builder for CHAT_ACTION_UPDATE_PANEL with auto-ID support.
 *
 * @remarks
 * Validates `panel_body_data` against `panel_body_type` in the constructor; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_UpdatePanelActionBuilder({ autoId: "u", content_id: "c1", panel_body_type: "PANEL_BODY_MARKDOWN", panel_body_data: "x", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_UpdatePanelActionBuilder {
    private action;
    /**
     * Initialize the update panel action builder with comprehensive animation support
     *
     * @param options - Configuration options for the update panel action including animation features
     */
    constructor(options: CommunicationProtocol_UpdatePanelActionOptions);
    /**
     * Set new panel header title
     *
     * @param header - New header text for the panel
     * @returns This builder instance for method chaining
     */
    setHeader(header: string): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Blanks `panel_header_title` on the staged update so the client clears the visible header.
     *
     * @returns This builder instance for method chaining
     */
    clearHeader(): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set new panel body type
     *
     * @param type - New body content type (supports both legacy and new formats)
     * @returns This builder instance for method chaining
     */
    setBodyType(type: PanelBodyType): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set new panel body content (must match the body type)
     *
     * @param content - New body content data
     * @returns This builder instance for method chaining
     */
    setBodyContent(content: unknown): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set both body type and content together (with validation)
     *
     * @param type - New body content type
     * @param content - New body content data that matches the specified type
     * @returns This builder instance for method chaining
     */
    setBody(type: PanelBodyType, content: unknown): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set markdown body content (convenience method)
     *
     * @param markdown - Markdown text content
     * @returns This builder instance for method chaining
     */
    setMarkdownBody(markdown: string): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set image body content (convenience method)
     *
     * @param imageData - Image body data with url, alt text, and optional positioning/animation
     * @returns This builder instance for method chaining
     */
    setImageBody(imageData: CommunicationProtocol_PanelBody_ImageContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Google Search Home body content (convenience method)
     *
     * @param searchData - Google Search Home data with search query
     * @returns This builder instance for method chaining
     */
    setGoogleSearchHomeBody(searchData: CommunicationProtocol_PanelBody_GoogleSearchHomeContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Google Search Result body content (convenience method)
     *
     * @param resultData - Google Search Result data with Google Custom Search API items
     * @returns This builder instance for method chaining
     */
    setGoogleSearchResultBody(resultData: CommunicationProtocol_PanelBody_GoogleSearchResultContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set ChatGPT Home body content (convenience method)
     *
     * @param promptData - ChatGPT Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setChatGptHomeBody(promptData: CommunicationProtocol_PanelBody_ChatGptHomeContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set ChatGPT Result body content (convenience method)
     *
     * @param resultData - ChatGPT Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setChatGptResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Gemini Home body content (convenience method)
     *
     * @param promptData - Gemini Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setGeminiHomeBody(promptData: CommunicationProtocol_PanelBody_GeminiHomeContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Gemini Result body content (convenience method)
     *
     * @param resultData - Gemini Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setGeminiResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Perplexity Home body content (convenience method)
     *
     * @param promptData - Perplexity Home data with user prompt
     * @returns This builder instance for method chaining
     */
    setPerplexityHomeBody(promptData: CommunicationProtocol_PanelBody_PerplexityHomeContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Perplexity Result body content (convenience method)
     *
     * @param resultData - Perplexity Result data with user prompt and assistant response
     * @returns This builder instance for method chaining
     */
    setPerplexityResultBody(resultData: {
        user_prompt: string;
        assistant_response: string;
    }): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Google Maps Home body content (convenience method)
     *
     * @param searchData - Google Maps Home data with search query
     * @returns This builder instance for method chaining
     */
    setGoogleMapsHomeBody(searchData: CommunicationProtocol_PanelBody_GoogleMapsHomeContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Set Google Maps Reviews body content (convenience method)
     *
     * @param reviewsData - Google Maps Reviews data with Google Places API review objects
     * @returns This builder instance for method chaining
     */
    setGoogleMapsReviewsBody(reviewsData: CommunicationProtocol_PanelBody_GoogleMapsReviewsContent): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Get the target content ID for this update action
     *
     * @returns The panel content ID being updated
     */
    getContentId(): string;
    /**
     * Get the new header title if set
     *
     * @returns New header title or undefined
     */
    getNewHeader(): string | undefined;
    /**
     * Get the new body type if set
     *
     * @returns New body type or undefined
     */
    getNewBodyType(): string | undefined;
    /**
     * Get the new body content if set
     *
     * @returns New body content or undefined
     */
    getNewBodyContent(): unknown;
    /**
     * Check if this action updates the header
     *
     * @returns True if header title is being updated
     */
    updatesHeader(): boolean;
    /**
     * Check if this action updates the body type
     *
     * @returns True if body type is being updated
     */
    updatesBodyType(): boolean;
    /**
     * Check if this action updates the body content
     *
     * @returns True if body content is being updated
     */
    updatesBodyContent(): boolean;
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
     * Build and return the final chat action object
     *
     * @returns Immutable copy of the configured chat action
     */
    build(): CommunicationProtocol_ChatAction;
}
//# sourceMappingURL=update-panel.d.ts.map