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

import { PANEL_DEFAULTS } from "../../animation/index.js";
import type { CommunicationProtocol_PanelContentOptions } from "../../options/content-options.js";
import type {
  CommunicationProtocol_PanelEffect,
  CommunicationProtocol_PanelTransition,
  PanelBodyAspectRatio,
  PanelHeaderIcon,
} from "../../types/animation.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type {
  CommunicationProtocol_PanelBody_ChatGptHomeContent,
  CommunicationProtocol_PanelBody_ChatGptResultContent,
  CommunicationProtocol_PanelBody_GeminiHomeContent,
  CommunicationProtocol_PanelBody_GeminiResultContent,
  CommunicationProtocol_PanelBody_GoogleMapsHomeContent,
  CommunicationProtocol_PanelBody_GoogleMapsReviewsContent,
  CommunicationProtocol_PanelBody_GoogleSearchHomeContent,
  CommunicationProtocol_PanelBody_GoogleSearchResultContent,
  CommunicationProtocol_PanelBody_ImageContent,
  CommunicationProtocol_PanelBody_PerplexityHomeContent,
  CommunicationProtocol_PanelBody_PerplexityResultContent,
  PanelVisibilityState,
} from "../../types/common.js";
import {
  CommunicationProtocol_Panel_createValidationSummary,
  CommunicationProtocol_Panel_validatePanelAnimationConfig,
  CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio,
  CommunicationProtocol_PanelBody_validatePanelTransitions,
  CommunicationProtocol_validatePanelHeaderIcon,
  CommunicationProtocol_validatePanelVisibility,
} from "../../animation/index.js";
import { ProtocolIdUtils } from "../protocol-id-utils.js";

/**
 * Fluent builder for CHAT_CONTENT_PANEL with auto-ID support.
 *
 * @remarks
 * Runs shared animation and body validators during construction; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_PanelContentBuilder({ panel_body_type: "PANEL_BODY_MARKDOWN", panel_body_data: "x", message_id: "m" }).build()`
 */
export class CommunicationProtocol_PanelContentBuilder {
  private content: CommunicationProtocol_ChatContent;

  /**
   * Initialize the panel content builder with comprehensive animation support
   *
   * @param options - Configuration options for the panel content including animation features
   */
  constructor(options: CommunicationProtocol_PanelContentOptions) {
    const {
      panel_header_icon,
      panel_header_favicon_url,
      panel_header_title,
      panel_header_description,
      panel_visibility,
      panel_body_type,
      panel_body_aspect_ratio,
      panel_body_data,
      panel_transitions,
      panel_effects,
      streaming_options,

      content_width,
      content_group_id,
      content_queue,
      content_delay,
      // message_id is used via options in ProtocolIdUtils.resolveContentId
    } = options;

    // Validate body content based on type
    this.validateBodyContent(panel_body_type, panel_body_data);

    this.content = {
      content_id: ProtocolIdUtils.resolveContentId(options),
      content_type: "CHAT_CONTENT_PANEL",
      ...(content_width && { content_width }),
      ...(content_group_id && { content_group_id }),
      content_queue,
      ...(content_delay && { content_delay }),
      content_data: {
        panel_header_icon,
        ...(panel_header_favicon_url && { panel_header_favicon_url }),
        panel_header_title: panel_header_title || "",
        panel_header_description,
        panel_visibility: panel_visibility || "VISIBLE",
        panel_body_type,
        panel_body_aspect_ratio,
        panel_body_data,
        panel_transitions: panel_transitions || [],
        ...(panel_effects ? { panel_effects } : {}),
        ...(streaming_options ? { streaming_options } : {}),
      },
    };
  }

  /**
   * Set panel header text
   *
   * @param header - Header text to display at top of panel
   * @returns This builder instance for method chaining
   */
  setHeader(header: string): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_title = header;
    return this;
  }

  /**
   * Clear the panel header
   *
   * @returns This builder instance for method chaining
   */
  clearHeader(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_title = "";
    return this;
  }

  /**
   * Set panel header icon
   *
   * @param icon - Panel header icon (predefined icon or custom URL)
   * @returns This builder instance for method chaining
   */
  setHeaderIcon(icon: PanelHeaderIcon): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_icon = icon;
    return this;
  }

  /**
   * Clear the panel header icon
   *
   * @returns This builder instance for method chaining
   */
  clearHeaderIcon(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_icon = undefined;
    return this;
  }

  /**
   * Set panel header description
   *
   * @param description - Header description text
   * @returns This builder instance for method chaining
   */
  setHeaderDescription(description: string): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_description = description;
    return this;
  }

  /**
   * Clear the panel header description
   *
   * @returns This builder instance for method chaining
   */
  clearHeaderDescription(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_header_description = undefined;
    return this;
  }

  /**
   * Set panel visibility state
   *
   * @param visibility - Panel visibility state
   * @returns This builder instance for method chaining
   */
  setVisibility(visibility: PanelVisibilityState): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_visibility = visibility;
    return this;
  }

  /**
   * Show the panel (set visibility to VISIBLE)
   *
   * @returns This builder instance for method chaining
   */
  show(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_visibility = "VISIBLE";
    return this;
  }

  /**
   * Hide the panel (set visibility to HIDDEN)
   *
   * @returns This builder instance for method chaining
   */
  hide(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_visibility = "HIDDEN";
    return this;
  }

  /**
   * Set panel body aspect ratio
   *
   * @param aspectRatio - Panel body aspect ratio
   * @returns This builder instance for method chaining
   */
  setAspectRatio(aspectRatio: PanelBodyAspectRatio): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_aspect_ratio = aspectRatio;
    return this;
  }

  /**
   * Clear the panel body aspect ratio
   *
   * @returns This builder instance for method chaining
   */
  clearAspectRatio(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_aspect_ratio = undefined;
    return this;
  }

  /**
   * Set panel animation transitions
   *
   * @param transitions - Array of panel transition configurations
   * @returns This builder instance for method chaining
   */
  setTransitions(
    transitions: CommunicationProtocol_PanelTransition[]
  ): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_transitions = transitions;
    return this;
  }

  /**
   * Add a single animation transition
   *
   * @param transition - Panel transition configuration to add
   * @returns This builder instance for method chaining
   */
  addTransition(
    transition: CommunicationProtocol_PanelTransition
  ): CommunicationProtocol_PanelContentBuilder {
    if (!this.content.content_data.panel_transitions) {
      this.content.content_data.panel_transitions = [];
    }
    (this.content.content_data.panel_transitions as CommunicationProtocol_PanelTransition[]).push(
      transition
    );
    return this;
  }

  /**
   * Clear all panel animation transitions
   *
   * @returns This builder instance for method chaining
   */
  clearTransitions(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_transitions = [];
    return this;
  }

  /**
   * Set panel overlay effects
   *
   * @param effects - Array of panel overlay effects
   * @returns This builder instance for method chaining
   */
  setEffects(
    effects: CommunicationProtocol_PanelEffect[]
  ): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_effects = effects;
    return this;
  }

  /**
   * Add a single overlay effect
   *
   * @param effect - Panel overlay effect configuration to add
   * @returns This builder instance for method chaining
   */
  addEffect(effect: CommunicationProtocol_PanelEffect): CommunicationProtocol_PanelContentBuilder {
    if (!this.content.content_data.panel_effects) {
      this.content.content_data.panel_effects = [] as CommunicationProtocol_PanelEffect[];
    }
    (this.content.content_data.panel_effects as CommunicationProtocol_PanelEffect[]).push(effect);
    return this;
  }

  /**
   * Clear all overlay effects
   *
   * @returns This builder instance for method chaining
   */
  clearEffects(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_effects = [];
    return this;
  }

  // ============================================================================
  // Streaming Options Methods
  // ============================================================================

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
  }): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.streaming_options = options;
    return this;
  }

  /**
   * Remove streaming timing hints from the panel payload so delivery reverts to protocol defaults.
   *
   * @returns This builder instance for method chaining
   */
  clearStreamingOptions(): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.streaming_options = undefined;
    return this;
  }

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
  validateAnimationConfig() {
    return CommunicationProtocol_Panel_validatePanelAnimationConfig(
      this.content.content_data
    );
  }

  /**
   * Validate and set panel header icon with error handling
   *
   * @param icon - Panel header icon to validate and set
   * @param throwOnError - Whether to throw an error on validation failure (default: true)
   * @returns This builder instance for method chaining
   * @throws {Error} If validation fails and throwOnError is true
   */
  setHeaderIconWithValidation(
    icon: PanelHeaderIcon,
    throwOnError = true
  ): CommunicationProtocol_PanelContentBuilder {
    const validation = CommunicationProtocol_validatePanelHeaderIcon(icon);

    if (!validation.isValid) {
      const summary = CommunicationProtocol_Panel_createValidationSummary(validation);
      if (throwOnError) {
        throw new Error(`Panel header icon validation failed:\n${summary}`);
      } else {
        console.warn(`Panel header icon validation warning:\n${summary}`);
      }
    }

    this.content.content_data.panel_header_icon = icon;
    return this;
  }

  /**
   * Validate and set panel visibility with error handling
   *
   * @param visibility - Panel visibility state to validate and set
   * @param throwOnError - Whether to throw an error on validation failure (default: true)
   * @returns This builder instance for method chaining
   * @throws {Error} If validation fails and throwOnError is true
   */
  setVisibilityWithValidation(
    visibility: PanelVisibilityState,
    throwOnError = true
  ): CommunicationProtocol_PanelContentBuilder {
    const validation = CommunicationProtocol_validatePanelVisibility(visibility);

    if (!validation.isValid) {
      const summary = CommunicationProtocol_Panel_createValidationSummary(validation);
      if (throwOnError) {
        throw new Error(`Panel visibility validation failed:\n${summary}`);
      } else {
        console.warn(`Panel visibility validation warning:\n${summary}`);
      }
    }

    this.content.content_data.panel_visibility = visibility;
    return this;
  }

  /**
   * Validate and set panel aspect ratio with error handling
   *
   * @param aspectRatio - Panel body aspect ratio to validate and set
   * @param throwOnError - Whether to throw an error on validation failure (default: true)
   * @returns This builder instance for method chaining
   * @throws {Error} If validation fails and throwOnError is true
   */
  setAspectRatioWithValidation(
    aspectRatio: PanelBodyAspectRatio,
    throwOnError = true
  ): CommunicationProtocol_PanelContentBuilder {
    const validation = CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio(aspectRatio);

    if (!validation.isValid) {
      const summary = CommunicationProtocol_Panel_createValidationSummary(validation);
      if (throwOnError) {
        throw new Error(`Panel aspect ratio validation failed:\n${summary}`);
      } else {
        console.warn(`Panel aspect ratio validation warning:\n${summary}`);
      }
    }

    this.content.content_data.panel_body_aspect_ratio = aspectRatio;
    return this;
  }

  /**
   * Validate and set panel transitions with error handling
   *
   * @param transitions - Panel transitions array to validate and set
   * @param throwOnError - Whether to throw an error on validation failure (default: true)
   * @returns This builder instance for method chaining
   * @throws {Error} If validation fails and throwOnError is true
   */
  setTransitionsWithValidation(
    transitions: CommunicationProtocol_PanelTransition[],
    throwOnError = true
  ): CommunicationProtocol_PanelContentBuilder {
    const validation = CommunicationProtocol_PanelBody_validatePanelTransitions(transitions);

    if (!validation.isValid) {
      const summary = CommunicationProtocol_Panel_createValidationSummary(validation);
      if (throwOnError) {
        throw new Error(`Panel transitions validation failed:\n${summary}`);
      } else {
        console.warn(`Panel transitions validation warning:\n${summary}`);
      }
    }

    this.content.content_data.panel_transitions = transitions;
    return this;
  }

  /**
   * Set panel body type
   *
   * @param type - Type of body content (supports both legacy and new formats)
   * @returns This builder instance for method chaining
   */
  setBodyType(
    type:
      | "PANEL_BODY_MARKDOWN"
      | "PANEL_BODY_REASONING_V1_MARKDOWN"
      | "PANEL_BODY_REASONING_V2_MARKDOWN"
      | "PANEL_BODY_IMAGE"
      | "PANEL_BODY_ACTIONABLE_CARDS"
      | "PANEL_BODY_ACTIONABLE_CHIPS"
      | "PANEL_BODY_GOOGLE_SEARCH_HOME"
      | "PANEL_BODY_GOOGLE_SEARCH_RESULT"
      | "PANEL_BODY_GOOGLE_MAPS_HOME"
      | "PANEL_BODY_GOOGLE_MAPS_REVIEWS"
      | "PANEL_BODY_CHATGPT_HOME"
      | "PANEL_BODY_CHATGPT_RESULT"
      | "PANEL_BODY_GEMINI_HOME"
      | "PANEL_BODY_GEMINI_RESULT"
      | "PANEL_BODY_PERPLEXITY_HOME"
      | "PANEL_BODY_PERPLEXITY_RESULT"
  ): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_type = type;

    // Clear body content when changing type to prevent type mismatches
    this.content.content_data.panel_body_data = this.getDefaultBodyContent(type);

    return this;
  }

  /**
   * Set panel body content (must match the body type)
   *
   * @param content - Content data that matches the current body type
   * @returns This builder instance for method chaining
   */
  setBodyContent(content: unknown): CommunicationProtocol_PanelContentBuilder {
    // Validate content matches current body type
    this.validateBodyContent(this.content.content_data.panel_body_type as string, content);
    this.content.content_data.panel_body_data = content;
    return this;
  }

  /**
   * Set both body type and content together (with validation)
   *
   * @param type - Type of body content (supports both legacy and new formats)
   * @param content - Content data that matches the specified type
   * @returns This builder instance for method chaining
   */
  setBody(
    type:
      | "PANEL_BODY_MARKDOWN"
      | "PANEL_BODY_REASONING_V1_MARKDOWN"
      | "PANEL_BODY_REASONING_V2_MARKDOWN"
      | "PANEL_BODY_IMAGE"
      | "PANEL_BODY_ACTIONABLE_CARDS"
      | "PANEL_BODY_ACTIONABLE_CHIPS"
      | "PANEL_BODY_GOOGLE_SEARCH_HOME"
      | "PANEL_BODY_GOOGLE_SEARCH_RESULT"
      | "PANEL_BODY_GOOGLE_MAPS_HOME"
      | "PANEL_BODY_GOOGLE_MAPS_REVIEWS"
      | "PANEL_BODY_CHATGPT_HOME"
      | "PANEL_BODY_CHATGPT_RESULT"
      | "PANEL_BODY_GEMINI_HOME"
      | "PANEL_BODY_GEMINI_RESULT"
      | "PANEL_BODY_PERPLEXITY_HOME"
      | "PANEL_BODY_PERPLEXITY_RESULT",
    content: unknown
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent(type, content);
    this.content.content_data.panel_body_type = type;
    this.content.content_data.panel_body_data = content;
    return this;
  }

  /**
   * Set markdown body content (convenience method)
   *
   * @param markdown - Markdown text content
   * @returns This builder instance for method chaining
   */
  setMarkdownBody(markdown: string): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_type = "PANEL_BODY_MARKDOWN";
    this.content.content_data.panel_body_data = markdown;
    return this;
  }

  /**
   * Set reasoning markdown body content V1 (convenience method)
   *
   * V1: Headerless panels focused on content display
   *
   * @param markdown - Markdown text content for reasoning display
   * @returns This builder instance for method chaining
   */
  setReasoningMarkdownBody(markdown: string): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_type = "PANEL_BODY_REASONING_V1_MARKDOWN";
    this.content.content_data.panel_body_data = markdown;
    return this;
  }

  /**
   * Set reasoning markdown body content V2 (convenience method)
   *
   * V2: Uses header title for progress messages, body accumulates full reasoning
   *
   * @param markdown - Markdown text content for reasoning display
   * @returns This builder instance for method chaining
   */
  setReasoningMarkdownV2Body(markdown: string): CommunicationProtocol_PanelContentBuilder {
    this.content.content_data.panel_body_type = "PANEL_BODY_REASONING_V2_MARKDOWN";
    this.content.content_data.panel_body_data = markdown;
    return this;
  }

  /**
   * Set actionable cards body content (convenience method)
   *
   * @param cardsData - Actionable cards configuration object
   * @returns This builder instance for method chaining
   */
  setActionableCardsBody(cardsData: object): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_ACTIONABLE_CARDS", cardsData);
    this.content.content_data.panel_body_type = "PANEL_BODY_ACTIONABLE_CARDS";
    this.content.content_data.panel_body_data = cardsData;
    return this;
  }

  /**
   * Set actionable chips body content (convenience method)
   *
   * @param chipsData - Actionable chips configuration object
   * @returns This builder instance for method chaining
   */
  setActionableChipsBody(chipsData: object): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_ACTIONABLE_CHIPS", chipsData);
    this.content.content_data.panel_body_type = "PANEL_BODY_ACTIONABLE_CHIPS";
    this.content.content_data.panel_body_data = chipsData;
    return this;
  }

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
  }): CommunicationProtocol_PanelContentBuilder {
    // Apply defaults for optional properties when not provided
    const imageDataWithDefaults = {
      image_gravity: PANEL_DEFAULTS.IMAGE_ANIMATION.GRAVITY,
      image_sizing: PANEL_DEFAULTS.IMAGE_ANIMATION.SIZING,
      image_animation_type: PANEL_DEFAULTS.IMAGE_ANIMATION.TYPE,
      ...imageData, // User-provided values override defaults
    };

    this.validateBodyContent("PANEL_BODY_IMAGE", imageDataWithDefaults);
    this.content.content_data.panel_body_type = "PANEL_BODY_IMAGE";
    this.content.content_data.panel_body_data = imageDataWithDefaults;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_SEARCH_HOME", searchData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GOOGLE_SEARCH_HOME";
    this.content.content_data.panel_body_data = searchData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_SEARCH_RESULT", resultData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GOOGLE_SEARCH_RESULT";
    this.content.content_data.panel_body_data = resultData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_CHATGPT_HOME", promptData);
    this.content.content_data.panel_body_type = "PANEL_BODY_CHATGPT_HOME";
    this.content.content_data.panel_body_data = promptData;
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
  }): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_CHATGPT_RESULT", resultData);
    this.content.content_data.panel_body_type = "PANEL_BODY_CHATGPT_RESULT";
    this.content.content_data.panel_body_data = resultData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GEMINI_HOME", promptData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GEMINI_HOME";
    this.content.content_data.panel_body_data = promptData;
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
  }): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GEMINI_RESULT", resultData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GEMINI_RESULT";
    this.content.content_data.panel_body_data = resultData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_PERPLEXITY_HOME", promptData);
    this.content.content_data.panel_body_type = "PANEL_BODY_PERPLEXITY_HOME";
    this.content.content_data.panel_body_data = promptData;
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
  }): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_PERPLEXITY_RESULT", resultData);
    this.content.content_data.panel_body_type = "PANEL_BODY_PERPLEXITY_RESULT";
    this.content.content_data.panel_body_data = resultData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_MAPS_HOME", searchData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GOOGLE_MAPS_HOME";
    this.content.content_data.panel_body_data = searchData;
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
  ): CommunicationProtocol_PanelContentBuilder {
    this.validateBodyContent("PANEL_BODY_GOOGLE_MAPS_REVIEWS", reviewsData);
    this.content.content_data.panel_body_type = "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
    this.content.content_data.panel_body_data = reviewsData;
    return this;
  }

  /**
   * Get current panel header
   *
   * @returns Current header text
   */
  getHeader(): string {
    // Prefer `panel_header_title` if present in content_data to align with docs,
    // fallback to internal `panel_header` for backward compatibility.
    const data = this.content.content_data;
    const maybeTitle = data["panel_header_title"];
    if (typeof maybeTitle === "string") return maybeTitle;
    const legacyHeader = data["panel_header"];
    if (typeof legacyHeader === "string") return legacyHeader;
    return "";
  }

  /**
   * Get current body type
   *
   * @returns Current body content type
   */
  getBodyType(): string {
    return this.content.content_data.panel_body_type as string;
  }

  /**
   * Get current body content
   *
   * @returns Current body content data
   */
  getBodyContent(): unknown {
    return this.content.content_data.panel_body_data;
  }

  /**
   * Check if panel has a header
   *
   * @returns True if header is not empty
   */
  hasHeader(): boolean {
    const data = this.content.content_data;
    const title = data["panel_header_title"];
    if (typeof title === "string" && title.trim() !== "") return true;
    const header = data["panel_header"];
    return typeof header === "string" && header.trim() !== "";
  }

  /**
   * Check if body content is markdown
   *
   * @returns True if body type is markdown
   */
  isMarkdownBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_MARKDOWN";
  }

  /**
   * Check if body content is reasoning markdown (V1 or V2)
   *
   * @returns True if body type is reasoning markdown (any version)
   */
  isReasoningMarkdownBody(): boolean {
    return (
      this.content.content_data.panel_body_type === "PANEL_BODY_REASONING_V1_MARKDOWN" ||
      this.content.content_data.panel_body_type === "PANEL_BODY_REASONING_V2_MARKDOWN"
    );
  }

  /**
   * Check if body content is reasoning markdown V1
   *
   * @returns True if body type is reasoning markdown V1
   */
  isReasoningMarkdownV1Body(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_REASONING_V1_MARKDOWN";
  }

  /**
   * Check if body content is reasoning markdown V2
   *
   * @returns True if body type is reasoning markdown V2
   */
  isReasoningMarkdownV2Body(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_REASONING_V2_MARKDOWN";
  }

  /**
   * Check if body content is actionable cards
   *
   * @returns True if body type is actionable_cards
   */
  isActionableCardsBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_ACTIONABLE_CARDS";
  }

  /**
   * Check if body content is actionable chips
   *
   * @returns True if body type is actionable_chips
   */
  isActionableChipsBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_ACTIONABLE_CHIPS";
  }

  /**
   * Check if body content is image
   *
   * @returns True if body type is PANEL_BODY_IMAGE
   */
  isImageBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_IMAGE";
  }

  /**
   * Check if body content is Google Search Home
   *
   * @returns True if body type is PANEL_BODY_GOOGLE_SEARCH_HOME
   */
  isGoogleSearchHomeBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GOOGLE_SEARCH_HOME";
  }

  /**
   * Check if body content is Google Search Result
   *
   * @returns True if body type is PANEL_BODY_GOOGLE_SEARCH_RESULT
   */
  isGoogleSearchResultBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GOOGLE_SEARCH_RESULT";
  }

  /**
   * Check if body content is ChatGPT Home
   *
   * @returns True if body type is PANEL_BODY_CHATGPT_HOME
   */
  isChatGptHomeBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_CHATGPT_HOME";
  }

  /**
   * Check if body content is ChatGPT Result
   *
   * @returns True if body type is PANEL_BODY_CHATGPT_RESULT
   */
  isChatGptResultBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_CHATGPT_RESULT";
  }

  /**
   * Check if body content is Gemini Home
   *
   * @returns True if body type is PANEL_BODY_GEMINI_HOME
   */
  isGeminiHomeBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GEMINI_HOME";
  }

  /**
   * Check if body content is Gemini Result
   *
   * @returns True if body type is PANEL_BODY_GEMINI_RESULT
   */
  isGeminiResultBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GEMINI_RESULT";
  }

  /**
   * Check if body content is Perplexity Home
   *
   * @returns True if body type is PANEL_BODY_PERPLEXITY_HOME
   */
  isPerplexityHomeBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_PERPLEXITY_HOME";
  }

  /**
   * Check if body content is Perplexity Result
   *
   * @returns True if body type is PANEL_BODY_PERPLEXITY_RESULT
   */
  isPerplexityResultBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_PERPLEXITY_RESULT";
  }

  /**
   * Check if body content is Google Maps Home
   *
   * @returns True if body type is PANEL_BODY_GOOGLE_MAPS_HOME
   */
  isGoogleMapsHomeBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GOOGLE_MAPS_HOME";
  }

  /**
   * Check if body content is Google Maps Reviews
   *
   * @returns True if body type is PANEL_BODY_GOOGLE_MAPS_REVIEWS
   */
  isGoogleMapsReviewsBody(): boolean {
    return this.content.content_data.panel_body_type === "PANEL_BODY_GOOGLE_MAPS_REVIEWS";
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
    // PANEL_BODY_MARKDOWN accepts string
    if (bodyType === "PANEL_BODY_MARKDOWN") {
      if (typeof bodyContent !== "string") {
        throw new Error(
          `Panel body content must be a string when bodyType is 'PANEL_BODY_MARKDOWN'`
        );
      }
      return;
    }

    // PANEL_BODY_REASONING_V1_MARKDOWN and PANEL_BODY_REASONING_V2_MARKDOWN require { markdown: string }
    if (
      bodyType === "PANEL_BODY_REASONING_V1_MARKDOWN" ||
      bodyType === "PANEL_BODY_REASONING_V2_MARKDOWN"
    ) {
      if (!bodyContent || typeof bodyContent !== "object") {
        throw new Error(
          `Panel body content must be an object with 'markdown' property when bodyType is '${bodyType}'`
        );
      }
      const content = bodyContent as Record<string, unknown>;
      if (typeof content.markdown !== "string") {
        throw new Error(
          `Panel body content must have 'markdown' string property when bodyType is '${bodyType}'`
        );
      }
      return;
    }

    // Object content types
    if (!bodyContent || typeof bodyContent !== "object") {
      throw new Error(`Panel body content must be an object when bodyType is '${bodyType}'`);
    }

    // Specific validations for each object type
    switch (bodyType) {
      case "PANEL_BODY_IMAGE":
        this.validateImageContent(bodyContent);
        break;
      case "PANEL_BODY_GOOGLE_SEARCH_HOME":
        this.validateGoogleSearchHomeContent(bodyContent);
        break;
      case "PANEL_BODY_GOOGLE_MAPS_HOME":
        this.validateGoogleMapsHomeContent(bodyContent);
        break;
      case "PANEL_BODY_GOOGLE_MAPS_REVIEWS":
        this.validateGoogleMapsReviewsContent(bodyContent);
        break;
      case "PANEL_BODY_CHATGPT_HOME":
        this.validateChatGptHomeContent(bodyContent);
        break;
      case "PANEL_BODY_CHATGPT_RESULT":
        this.validateChatGptResultContent(bodyContent);
        break;
      case "PANEL_BODY_GEMINI_HOME":
        this.validateGeminiHomeContent(bodyContent);
        break;
      case "PANEL_BODY_GEMINI_RESULT":
        this.validateGeminiResultContent(bodyContent);
        break;
      case "PANEL_BODY_PERPLEXITY_HOME":
        this.validatePerplexityHomeContent(bodyContent);
        break;
      case "PANEL_BODY_PERPLEXITY_RESULT":
        this.validatePerplexityResultContent(bodyContent);
        break;
      case "PANEL_BODY_ACTIONABLE_CARDS":
      case "PANEL_BODY_ACTIONABLE_CHIPS":
        // Already validated as object above
        break;
      default:
        throw new Error(`Unknown panel body type: '${bodyType}'`);
    }
  }

  /**
   * Validate `PANEL_BODY_IMAGE` required string fields.
   *
   * @private
   * @param content - Panel body object routed for image panels.
   * @throws Error if `image_url` or `image_alt_text` is missing or not a string.
   */
  private validateImageContent(content: unknown): void {
    const imageData = content as CommunicationProtocol_PanelBody_ImageContent;
    if (typeof imageData.image_url !== "string") {
      throw new Error(
        "Panel body content must have 'image_url' string property when bodyType is 'PANEL_BODY_IMAGE'"
      );
    }
    if (typeof imageData.image_alt_text !== "string") {
      throw new Error(
        "Panel body content must have 'image_alt_text' string property when bodyType is 'PANEL_BODY_IMAGE'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_GOOGLE_SEARCH_HOME` search query field.
   *
   * @private
   * @param content - Panel body object routed for Google Search home panels.
   * @throws Error if `search_query` is missing or not a string.
   */
  private validateGoogleSearchHomeContent(content: unknown): void {
    const searchData = content as CommunicationProtocol_PanelBody_GoogleSearchHomeContent;
    if (typeof searchData.search_query !== "string") {
      throw new Error(
        "Panel body content must have 'search_query' string property when bodyType is 'PANEL_BODY_GOOGLE_SEARCH_HOME'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_GOOGLE_MAPS_HOME` search query field.
   *
   * @private
   * @param content - Panel body object routed for Google Maps home panels.
   * @throws Error if `search_query` is missing or not a string.
   */
  private validateGoogleMapsHomeContent(content: unknown): void {
    const searchData = content as CommunicationProtocol_PanelBody_GoogleMapsHomeContent;
    if (typeof searchData.search_query !== "string") {
      throw new Error(
        "Panel body content must have 'search_query' string property when bodyType is 'PANEL_BODY_GOOGLE_MAPS_HOME'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_GOOGLE_MAPS_REVIEWS` reviews collection.
   *
   * @private
   * @param content - Panel body object routed for Google Maps reviews panels.
   * @throws Error if `reviews` is missing or not an array.
   */
  private validateGoogleMapsReviewsContent(content: unknown): void {
    const reviewsData = content as CommunicationProtocol_PanelBody_GoogleMapsReviewsContent;
    if (!Array.isArray(reviewsData.reviews)) {
      throw new Error(
        "Panel body content must have 'reviews' array property when bodyType is 'PANEL_BODY_GOOGLE_MAPS_REVIEWS'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_CHATGPT_HOME` user prompt field.
   *
   * @private
   * @param content - Panel body object routed for ChatGPT home panels.
   * @throws Error if `user_prompt` is missing or not a string.
   */
  private validateChatGptHomeContent(content: unknown): void {
    const promptData = content as CommunicationProtocol_PanelBody_ChatGptHomeContent;
    if (typeof promptData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_CHATGPT_HOME'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_CHATGPT_RESULT` prompt and assistant response fields.
   *
   * @private
   * @param content - Panel body object routed for ChatGPT result panels.
   * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
   */
  private validateChatGptResultContent(content: unknown): void {
    const resultData = content as CommunicationProtocol_PanelBody_ChatGptResultContent;
    if (typeof resultData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_CHATGPT_RESULT'"
      );
    }
    if (typeof resultData.assistant_response !== "string") {
      throw new Error(
        "Panel body content must have 'assistant_response' string property when bodyType is 'PANEL_BODY_CHATGPT_RESULT'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_GEMINI_HOME` user prompt field.
   *
   * @private
   * @param content - Panel body object routed for Gemini home panels.
   * @throws Error if `user_prompt` is missing or not a string.
   */
  private validateGeminiHomeContent(content: unknown): void {
    const promptData = content as CommunicationProtocol_PanelBody_GeminiHomeContent;
    if (typeof promptData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_GEMINI_HOME'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_GEMINI_RESULT` prompt and assistant response fields.
   *
   * @private
   * @param content - Panel body object routed for Gemini result panels.
   * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
   */
  private validateGeminiResultContent(content: unknown): void {
    const resultData = content as CommunicationProtocol_PanelBody_GeminiResultContent;
    if (typeof resultData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_GEMINI_RESULT'"
      );
    }
    if (typeof resultData.assistant_response !== "string") {
      throw new Error(
        "Panel body content must have 'assistant_response' string property when bodyType is 'PANEL_BODY_GEMINI_RESULT'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_PERPLEXITY_HOME` user prompt field.
   *
   * @private
   * @param content - Panel body object routed for Perplexity home panels.
   * @throws Error if `user_prompt` is missing or not a string.
   */
  private validatePerplexityHomeContent(content: unknown): void {
    const promptData = content as CommunicationProtocol_PanelBody_PerplexityHomeContent;
    if (typeof promptData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_PERPLEXITY_HOME'"
      );
    }
  }

  /**
   * Validate `PANEL_BODY_PERPLEXITY_RESULT` prompt and assistant response fields.
   *
   * @private
   * @param content - Panel body object routed for Perplexity result panels.
   * @throws Error if `user_prompt` or `assistant_response` is missing or not a string.
   */
  private validatePerplexityResultContent(content: unknown): void {
    const resultData = content as CommunicationProtocol_PanelBody_PerplexityResultContent;
    if (typeof resultData.user_prompt !== "string") {
      throw new Error(
        "Panel body content must have 'user_prompt' string property when bodyType is 'PANEL_BODY_PERPLEXITY_RESULT'"
      );
    }
    if (typeof resultData.assistant_response !== "string") {
      throw new Error(
        "Panel body content must have 'assistant_response' string property when bodyType is 'PANEL_BODY_PERPLEXITY_RESULT'"
      );
    }
  }

  /**
   * Get default body content for a given type
   *
   * @private
   * @param type - Panel body discriminator string (each `PANEL_BODY_*` case maps to an empty or scaffolded payload shape).
   * @returns Default content for the specified type
   */
  private getDefaultBodyContent(type: string): unknown {
    switch (type) {
      case "PANEL_BODY_MARKDOWN":
      case "PANEL_BODY_REASONING_V1_MARKDOWN":
      case "PANEL_BODY_REASONING_V2_MARKDOWN":
        return "";
      case "PANEL_BODY_ACTIONABLE_CARDS":
      case "PANEL_BODY_ACTIONABLE_CHIPS":
        return {};
      case "PANEL_BODY_IMAGE":
        return {
          image_url: "",
          image_alt_text: "",
          image_animation_type: PANEL_DEFAULTS.IMAGE_ANIMATION.TYPE,
          image_gravity: PANEL_DEFAULTS.IMAGE_ANIMATION.GRAVITY,
          image_sizing: PANEL_DEFAULTS.IMAGE_ANIMATION.SIZING,
        };
      case "PANEL_BODY_GOOGLE_SEARCH_HOME":
      case "PANEL_BODY_GOOGLE_MAPS_HOME":
        return {
          search_query: "",
        };
      case "PANEL_BODY_GOOGLE_SEARCH_RESULT":
        return {
          google_custom_search_items: [],
        };
      case "PANEL_BODY_CHATGPT_HOME":
      case "PANEL_BODY_GEMINI_HOME":
      case "PANEL_BODY_PERPLEXITY_HOME":
        return {
          user_prompt: "",
        };
      case "PANEL_BODY_CHATGPT_RESULT":
      case "PANEL_BODY_GEMINI_RESULT":
      case "PANEL_BODY_PERPLEXITY_RESULT":
        return {
          user_prompt: "",
          assistant_response: "",
        };
      case "PANEL_BODY_GOOGLE_MAPS_REVIEWS":
        return {
          reviews: [],
        };
      default:
        return "";
    }
  }

  /**
   * Build and return the final chat content object
   *
   * @returns Immutable copy of the configured chat content
   */
  build(): CommunicationProtocol_ChatContent {
    return { ...this.content };
  }
}
