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

import { PANEL_DEFAULTS } from "../../../animation/index.js";
import type { CommunicationProtocol_UpdatePanelActionOptions } from "../../../options/action-options.js";
import type { CommunicationProtocol_ChatAction } from "../../../types/chat.js";
import type {
  CommunicationProtocol_PanelBody_ChatGptHomeContent,
  CommunicationProtocol_PanelBody_GeminiHomeContent,
  CommunicationProtocol_PanelBody_GoogleMapsHomeContent,
  CommunicationProtocol_PanelBody_GoogleMapsReviewsContent,
  CommunicationProtocol_PanelBody_GoogleSearchHomeContent,
  CommunicationProtocol_PanelBody_GoogleSearchResultContent,
  CommunicationProtocol_PanelBody_ImageContent,
  CommunicationProtocol_PanelBody_PerplexityHomeContent,
  PanelBodyContent,
  PanelBodyType,
} from "../../../types/common.js";
import { ProtocolIdUtils } from "../../protocol-id-utils.js";

// #region Helper Functions

/**
 * Validates staged `panel_body_data` against the active `panel_body_type` before emit.
 *
 * @remarks
 * Implementations throw when the payload shape does not match the paired type token; used by {@link BODY_VALIDATORS}.
 */
type ValidatorFunction = (content: unknown) => void;

/**
 * Requires panel body content to be a non-null object for structured body types.
 *
 * @param content - Untyped body payload under validation.
 * @param typeName - Body type token surfaced in error messages for diagnosis.
 * @throws Error when content is not an object.
 */
function validateObject(content: unknown, typeName: string): void {
  if (!content || typeof content !== "object") {
    throw new Error(`Panel body content must be an object when bodyType is '${typeName}'`);
  }
}

/**
 * Requires a string-valued property on panel body content objects.
 *
 * @param content - Object-shaped body payload; callers should ensure `validateObject` ran first when applicable.
 * @param property - Required string field name on the payload.
 * @param typeName - Body type token surfaced in error messages for diagnosis.
 * @throws Error when the property is missing or not a string.
 */
function validateStringProperty(content: unknown, property: string, typeName: string): void {
  if (typeof (content as Record<string, unknown>)[property] !== "string") {
    throw new Error(
      `Panel body content must have '${property}' string property when bodyType is '${typeName}'`
    );
  }
}

/**
 * Requires an array-valued property on panel body content objects.
 *
 * @param content - Object-shaped body payload; callers should ensure `validateObject` ran first when applicable.
 * @param property - Required array field name on the payload.
 * @param typeName - Body type token surfaced in error messages for diagnosis.
 * @throws Error when the property is missing or not an array.
 */
function validateArrayProperty(content: unknown, property: string, typeName: string): void {
  if (!Array.isArray((content as Record<string, unknown>)[property])) {
    throw new Error(
      `Panel body content must have '${property}' array property when bodyType is '${typeName}'`
    );
  }
}

/**
 * Accepts raw markdown string or `{ markdown: string }` for `PANEL_BODY_MARKDOWN`.
 *
 * @throws Error when content is neither a string nor an object with a string `markdown` field.
 */
const validateMarkdown: ValidatorFunction = (content) => {
  if (
    typeof content !== "string" &&
    (!content || typeof (content as Record<string, unknown>).markdown !== "string")
  ) {
    throw new Error(
      "Panel body content must be a string or object with 'markdown' property when bodyType is 'PANEL_BODY_MARKDOWN'"
    );
  }
};

/**
 * Builds a validator that only checks non-null object shape for actionable card/chip bodies.
 *
 * @param typeName - Body type token surfaced in error messages for diagnosis.
 * @returns Validator that throws when content is not an object.
 */
const validateActionableContent = (typeName: string): ValidatorFunction => {
  return (content) => {
    if (!content || typeof content !== "object") {
      throw new Error(`Panel body content must be an object when bodyType is '${typeName}'`);
    }
  };
};

/**
 * Validates image panel payloads include URL and alt text strings.
 *
 * @throws Error when required fields are missing or not strings.
 */
const validateImage: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_IMAGE");
  validateStringProperty(content, "image_url", "PANEL_BODY_IMAGE");
  validateStringProperty(content, "image_alt_text", "PANEL_BODY_IMAGE");
};

/**
 * Validates Google Search home panel payload carries a `search_query` string.
 *
 * @throws Error when shape does not match `PANEL_BODY_GOOGLE_SEARCH_HOME`.
 */
const validateGoogleSearchHome: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GOOGLE_SEARCH_HOME");
  validateStringProperty(content, "search_query", "PANEL_BODY_GOOGLE_SEARCH_HOME");
};

/**
 * Validates Google Search result panel payload includes `google_custom_search_items` array.
 *
 * @throws Error when shape does not match `PANEL_BODY_GOOGLE_SEARCH_RESULT`.
 */
const validateGoogleSearchResult: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GOOGLE_SEARCH_RESULT");
  validateArrayProperty(content, "google_custom_search_items", "PANEL_BODY_GOOGLE_SEARCH_RESULT");
};

/**
 * Validates ChatGPT home panel payload carries a `user_prompt` string.
 *
 * @throws Error when shape does not match `PANEL_BODY_CHATGPT_HOME`.
 */
const validateChatGptHome: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_CHATGPT_HOME");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_CHATGPT_HOME");
};

/**
 * Validates ChatGPT result panel payload includes `user_prompt` and `assistant_response` strings.
 *
 * @throws Error when shape does not match `PANEL_BODY_CHATGPT_RESULT`.
 */
const validateChatGptResult: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_CHATGPT_RESULT");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_CHATGPT_RESULT");
  validateStringProperty(content, "assistant_response", "PANEL_BODY_CHATGPT_RESULT");
};

/**
 * Validates Gemini home panel payload carries a `user_prompt` string.
 *
 * @throws Error when shape does not match `PANEL_BODY_GEMINI_HOME`.
 */
const validateGeminiHome: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GEMINI_HOME");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_GEMINI_HOME");
};

/**
 * Validates Gemini result panel payload includes `user_prompt` and `assistant_response` strings.
 *
 * @throws Error when shape does not match `PANEL_BODY_GEMINI_RESULT`.
 */
const validateGeminiResult: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GEMINI_RESULT");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_GEMINI_RESULT");
  validateStringProperty(content, "assistant_response", "PANEL_BODY_GEMINI_RESULT");
};

/**
 * Validates Perplexity home panel payload carries a `user_prompt` string.
 *
 * @throws Error when shape does not match `PANEL_BODY_PERPLEXITY_HOME`.
 */
const validatePerplexityHome: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_PERPLEXITY_HOME");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_PERPLEXITY_HOME");
};

/**
 * Validates Perplexity result panel payload includes `user_prompt` and `assistant_response` strings.
 *
 * @throws Error when shape does not match `PANEL_BODY_PERPLEXITY_RESULT`.
 */
const validatePerplexityResult: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_PERPLEXITY_RESULT");
  validateStringProperty(content, "user_prompt", "PANEL_BODY_PERPLEXITY_RESULT");
  validateStringProperty(content, "assistant_response", "PANEL_BODY_PERPLEXITY_RESULT");
};

/**
 * Validates Google Maps home panel payload carries a `search_query` string.
 *
 * @throws Error when shape does not match `PANEL_BODY_GOOGLE_MAPS_HOME`.
 */
const validateGoogleMapsHome: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GOOGLE_MAPS_HOME");
  validateStringProperty(content, "search_query", "PANEL_BODY_GOOGLE_MAPS_HOME");
};

/**
 * Validates Google Maps reviews panel payload includes a `reviews` array.
 *
 * @throws Error when shape does not match `PANEL_BODY_GOOGLE_MAPS_REVIEWS`.
 */
const validateGoogleMapsReviews: ValidatorFunction = (content) => {
  validateObject(content, "PANEL_BODY_GOOGLE_MAPS_REVIEWS");
  validateArrayProperty(content, "reviews", "PANEL_BODY_GOOGLE_MAPS_REVIEWS");
};

/**
 * Validates reasoning markdown panels require an object with string `markdown` (v1 and v2 types share this shape).
 *
 * @throws Error when content is not an object or `markdown` is not a string.
 */
const validateReasoningMarkdown: ValidatorFunction = (content) => {
  if (!content || typeof content !== "object") {
    throw new Error(
      "Panel body content must be an object with 'markdown' property when bodyType is 'PANEL_BODY_REASONING_V1_MARKDOWN'"
    );
  }
  validateStringProperty(content, "markdown", "PANEL_BODY_REASONING_V1_MARKDOWN");
};

const BODY_VALIDATORS: Record<string, ValidatorFunction> = {
  PANEL_BODY_MARKDOWN: validateMarkdown,
  PANEL_BODY_REASONING_V1_MARKDOWN: validateReasoningMarkdown,
  PANEL_BODY_REASONING_V2_MARKDOWN: validateReasoningMarkdown,
  PANEL_BODY_ACTIONABLE_CARDS: validateActionableContent("PANEL_BODY_ACTIONABLE_CARDS"),
  PANEL_BODY_ACTIONABLE_CHIPS: validateActionableContent("PANEL_BODY_ACTIONABLE_CHIPS"),
  PANEL_BODY_IMAGE: validateImage,
  PANEL_BODY_GOOGLE_SEARCH_HOME: validateGoogleSearchHome,
  PANEL_BODY_GOOGLE_SEARCH_RESULT: validateGoogleSearchResult,
  PANEL_BODY_CHATGPT_HOME: validateChatGptHome,
  PANEL_BODY_CHATGPT_RESULT: validateChatGptResult,
  PANEL_BODY_GEMINI_HOME: validateGeminiHome,
  PANEL_BODY_GEMINI_RESULT: validateGeminiResult,
  PANEL_BODY_PERPLEXITY_HOME: validatePerplexityHome,
  PANEL_BODY_PERPLEXITY_RESULT: validatePerplexityResult,
  PANEL_BODY_GOOGLE_MAPS_HOME: validateGoogleMapsHome,
  PANEL_BODY_GOOGLE_MAPS_REVIEWS: validateGoogleMapsReviews,
};

// #endregion

/**
 * Fluent builder for CHAT_ACTION_UPDATE_PANEL with auto-ID support.
 *
 * @remarks
 * Validates `panel_body_data` against `panel_body_type` in the constructor; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_UpdatePanelActionBuilder({ autoId: "u", content_id: "c1", panel_body_type: "PANEL_BODY_MARKDOWN", panel_body_data: "x", message_id: "m" }).build()`
 */
export class CommunicationProtocol_UpdatePanelActionBuilder {
  private action: CommunicationProtocol_ChatAction;

  /**
   * Initialize the update panel action builder with comprehensive animation support
   *
   * @param options - Configuration options for the update panel action including animation features
   */
  constructor(options: CommunicationProtocol_UpdatePanelActionOptions) {
    const {
      content_id,
      panel_header_icon,
      panel_header_favicon_url,
      panel_header_title,
      panel_header_description,
      panel_visibility,
      panel_body_type,
      panel_body_aspect_ratio,
      panel_body_data,
      panel_scrolling_framer_motion_attributes,
      panel_transitions: newTransitions,
      panel_effects: newEffects,
    } = options;

    this.action = {
      action_id: ProtocolIdUtils.resolveActionId(options),
      action_type: "CHAT_ACTION_UPDATE_PANEL",
      action_data: {
        target: "CHAT",
        panel_content_id: content_id,
        ...(panel_header_icon !== undefined && { panel_header_icon: panel_header_icon }),
        ...(panel_header_favicon_url !== undefined && {
          panel_header_favicon_url: panel_header_favicon_url,
        }),
        ...(panel_header_title !== undefined && { panel_header_title: panel_header_title }),
        ...(panel_header_description !== undefined && {
          panel_header_description,
        }),
        ...(panel_visibility !== undefined && { panel_visibility: panel_visibility }),
        ...(panel_body_type !== undefined && { panel_body_type: panel_body_type }),
        ...(panel_body_aspect_ratio !== undefined && {
          panel_body_aspect_ratio,
        }),
        ...(panel_body_data !== undefined && {
          panel_body_data: panel_body_data as PanelBodyContent,
        }),
        ...(panel_scrolling_framer_motion_attributes !== undefined && {
          panel_scrolling_framer_motion_attributes,
        }),
        ...(newTransitions !== undefined && { panel_transitions: newTransitions }),
        ...(newEffects !== undefined && { panel_effects: newEffects }),
      },
    };

    // Validate body content if both type and content are provided
    if (panel_body_type && panel_body_data !== undefined) {
      this.validateBodyContent(panel_body_type, panel_body_data);
    }
  }

  /**
   * Set new panel header title
   *
   * @param header - New header text for the panel
   * @returns This builder instance for method chaining
   */
  setHeader(header: string): CommunicationProtocol_UpdatePanelActionBuilder {
    this.action.action_data.panel_header_title = header;
    return this;
  }

  /**
   * Blanks `panel_header_title` on the staged update so the client clears the visible header.
   *
   * @returns This builder instance for method chaining
   */
  clearHeader(): CommunicationProtocol_UpdatePanelActionBuilder {
    this.action.action_data.panel_header_title = "";
    return this;
  }

  /**
   * Set new panel body type
   *
   * @param type - New body content type (supports both legacy and new formats)
   * @returns This builder instance for method chaining
   */
  setBodyType(type: PanelBodyType): CommunicationProtocol_UpdatePanelActionBuilder {
    this.action.action_data.panel_body_type = type;
    return this;
  }

  /**
   * Set new panel body content (must match the body type)
   *
   * @param content - New body content data
   * @returns This builder instance for method chaining
   */
  setBodyContent(content: unknown): CommunicationProtocol_UpdatePanelActionBuilder {
    if (this.action.action_data.panel_body_type) {
      this.validateBodyContent(this.action.action_data.panel_body_type as string, content);
    }
    this.action.action_data.panel_body_data = content as PanelBodyContent;
    return this;
  }

  /**
   * Set both body type and content together (with validation)
   *
   * @param type - New body content type
   * @param content - New body content data that matches the specified type
   * @returns This builder instance for method chaining
   */
  setBody(type: PanelBodyType, content: unknown): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent(type, content);
    this.action.action_data.panel_body_type = type;
    this.action.action_data.panel_body_data = content as PanelBodyContent;
    return this;
  }

  /**
   * Set markdown body content (convenience method)
   *
   * @param markdown - Markdown text content
   * @returns This builder instance for method chaining
   */
  setMarkdownBody(markdown: string): CommunicationProtocol_UpdatePanelActionBuilder {
    this.action.action_data.panel_body_type = "PANEL_BODY_MARKDOWN";
    this.action.action_data.panel_body_data = markdown as PanelBodyContent;
    return this;
  }

  /**
   * Set image body content (convenience method)
   *
   * @param imageData - Image body data with url, alt text, and optional positioning/animation
   * @returns This builder instance for method chaining
   */
  setImageBody(
    imageData: CommunicationProtocol_PanelBody_ImageContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    // Apply defaults for optional properties when not provided
    const imageDataWithDefaults = {
      image_gravity: PANEL_DEFAULTS.IMAGE_ANIMATION.GRAVITY,
      image_sizing: PANEL_DEFAULTS.IMAGE_ANIMATION.SIZING,
      image_animation_type: PANEL_DEFAULTS.IMAGE_ANIMATION.TYPE,
      ...imageData, // User-provided values override defaults
    };

    this.validateBodyContent("PANEL_BODY_IMAGE", imageDataWithDefaults);
    this.action.action_data.panel_body_type = "PANEL_BODY_IMAGE";
    this.action.action_data.panel_body_data = imageDataWithDefaults as PanelBodyContent;
    return this;
  }

  /**
   * Set Google Search Home body content (convenience method)
   *
   * @param searchData - Google Search Home data with search query
   * @returns This builder instance for method chaining
   */
  setGoogleSearchHomeBody(
    searchData: CommunicationProtocol_PanelBody_GoogleSearchHomeContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_SEARCH_HOME", searchData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GOOGLE_SEARCH_HOME";
    this.action.action_data.panel_body_data = searchData;
    return this;
  }

  /**
   * Set Google Search Result body content (convenience method)
   *
   * @param resultData - Google Search Result data with Google Custom Search API items
   * @returns This builder instance for method chaining
   */
  setGoogleSearchResultBody(
    resultData: CommunicationProtocol_PanelBody_GoogleSearchResultContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_SEARCH_RESULT", resultData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GOOGLE_SEARCH_RESULT";
    this.action.action_data.panel_body_data = resultData as PanelBodyContent;
    return this;
  }

  /**
   * Set ChatGPT Home body content (convenience method)
   *
   * @param promptData - ChatGPT Home data with user prompt
   * @returns This builder instance for method chaining
   */
  setChatGptHomeBody(
    promptData: CommunicationProtocol_PanelBody_ChatGptHomeContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_CHATGPT_HOME", promptData);
    this.action.action_data.panel_body_type = "PANEL_BODY_CHATGPT_HOME";
    this.action.action_data.panel_body_data = promptData;
    return this;
  }

  /**
   * Set ChatGPT Result body content (convenience method)
   *
   * @param resultData - ChatGPT Result data with user prompt and assistant response
   * @returns This builder instance for method chaining
   */
  setChatGptResultBody(resultData: {
    user_prompt: string;
    assistant_response: string;
  }): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_CHATGPT_RESULT", resultData);
    this.action.action_data.panel_body_type = "PANEL_BODY_CHATGPT_RESULT";
    this.action.action_data.panel_body_data = resultData;
    return this;
  }

  /**
   * Set Gemini Home body content (convenience method)
   *
   * @param promptData - Gemini Home data with user prompt
   * @returns This builder instance for method chaining
   */
  setGeminiHomeBody(
    promptData: CommunicationProtocol_PanelBody_GeminiHomeContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GEMINI_HOME", promptData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GEMINI_HOME";
    this.action.action_data.panel_body_data = promptData;
    return this;
  }

  /**
   * Set Gemini Result body content (convenience method)
   *
   * @param resultData - Gemini Result data with user prompt and assistant response
   * @returns This builder instance for method chaining
   */
  setGeminiResultBody(resultData: {
    user_prompt: string;
    assistant_response: string;
  }): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GEMINI_RESULT", resultData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GEMINI_RESULT";
    this.action.action_data.panel_body_data = resultData;
    return this;
  }

  /**
   * Set Perplexity Home body content (convenience method)
   *
   * @param promptData - Perplexity Home data with user prompt
   * @returns This builder instance for method chaining
   */
  setPerplexityHomeBody(
    promptData: CommunicationProtocol_PanelBody_PerplexityHomeContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_PERPLEXITY_HOME", promptData);
    this.action.action_data.panel_body_type = "PANEL_BODY_PERPLEXITY_HOME";
    this.action.action_data.panel_body_data = promptData;
    return this;
  }

  /**
   * Set Perplexity Result body content (convenience method)
   *
   * @param resultData - Perplexity Result data with user prompt and assistant response
   * @returns This builder instance for method chaining
   */
  setPerplexityResultBody(resultData: {
    user_prompt: string;
    assistant_response: string;
  }): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_PERPLEXITY_RESULT", resultData);
    this.action.action_data.panel_body_type = "PANEL_BODY_PERPLEXITY_RESULT";
    this.action.action_data.panel_body_data = resultData;
    return this;
  }

  /**
   * Set Google Maps Home body content (convenience method)
   *
   * @param searchData - Google Maps Home data with search query
   * @returns This builder instance for method chaining
   */
  setGoogleMapsHomeBody(
    searchData: CommunicationProtocol_PanelBody_GoogleMapsHomeContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_MAPS_HOME", searchData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GOOGLE_MAPS_HOME";
    this.action.action_data.panel_body_data = searchData;
    return this;
  }

  /**
   * Set Google Maps Reviews body content (convenience method)
   *
   * @param reviewsData - Google Maps Reviews data with Google Places API review objects
   * @returns This builder instance for method chaining
   */
  setGoogleMapsReviewsBody(
    reviewsData: CommunicationProtocol_PanelBody_GoogleMapsReviewsContent
  ): CommunicationProtocol_UpdatePanelActionBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_MAPS_REVIEWS", reviewsData);
    this.action.action_data.panel_body_type = "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
    this.action.action_data.panel_body_data = reviewsData as PanelBodyContent;
    return this;
  }

  /**
   * Get the target content ID for this update action
   *
   * @returns The panel content ID being updated
   */
  getContentId(): string {
    return this.action.action_data.panel_content_id as string;
  }

  /**
   * Get the new header title if set
   *
   * @returns New header title or undefined
   */
  getNewHeader(): string | undefined {
    return this.action.action_data.panel_header_title as string | undefined;
  }

  /**
   * Get the new body type if set
   *
   * @returns New body type or undefined
   */
  getNewBodyType(): string | undefined {
    return this.action.action_data.panel_body_type as string | undefined;
  }

  /**
   * Get the new body content if set
   *
   * @returns New body content or undefined
   */
  getNewBodyContent(): unknown {
    return this.action.action_data.panel_body_data;
  }

  /**
   * Check if this action updates the header
   *
   * @returns True if header title is being updated
   */
  updatesHeader(): boolean {
    return this.action.action_data.panel_header_title !== undefined;
  }

  /**
   * Check if this action updates the body type
   *
   * @returns True if body type is being updated
   */
  updatesBodyType(): boolean {
    return this.action.action_data.panel_body_type !== undefined;
  }

  /**
   * Check if this action updates the body content
   *
   * @returns True if body content is being updated
   */
  updatesBodyContent(): boolean {
    return this.action.action_data.panel_body_data !== undefined;
  }

  /**
   * Validate that body content matches the specified body type
   *
   * @private
   * @param bodyType - The expected body type
   * @param bodyContent - The content to validate
   * @throws Error if content doesn't match expected type
   */
  private validateBodyContent(bodyType: string, bodyContent: unknown): void {
    const validator = BODY_VALIDATORS[bodyType];
    if (validator) {
      validator(bodyContent);
    } else {
      throw new Error(
        `Invalid panel body type: ${bodyType}. Must be one of: 'markdown', 'actionable_cards', 'actionable_chips', 'PANEL_BODY_MARKDOWN', 'PANEL_BODY_IMAGE', 'PANEL_BODY_GOOGLE_SEARCH_HOME', 'PANEL_BODY_GOOGLE_SEARCH_RESULT', 'PANEL_BODY_GOOGLE_MAPS_HOME', 'PANEL_BODY_GOOGLE_MAPS_REVIEWS', 'PANEL_BODY_CHATGPT_HOME', 'PANEL_BODY_CHATGPT_RESULT', 'PANEL_BODY_GEMINI_HOME', 'PANEL_BODY_GEMINI_RESULT', 'PANEL_BODY_PERPLEXITY_HOME', 'PANEL_BODY_PERPLEXITY_RESULT'`
      );
    }
  }

  /**
   * Build and return the final chat action object
   *
   * @returns Immutable copy of the configured chat action
   */
  build(): CommunicationProtocol_ChatAction {
    return { ...this.action };
  }
}
