/**
 * @fileoverview Builds CHAT_CONTENT_ACTIONABLE_CARDS payloads for structured single- or multi-select card UIs.
 *
 * Cards carry titles, subtitles, and server-generated selection actions; builders keep `content_id` stable via ProtocolIdUtils.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ActionableCardsContentBuilder } from "./actionable-cards.js";
 *
 * const content = new CommunicationProtocol_ActionableCardsContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "pick-plan",
 *   actionable_cards_selection_mode: "SINGLE",
 *   message_id: "msg-50",
 * })
 *   .addCard({ title: "Starter", subtitle: "For individuals", value: "starter" })
 *   .build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - actionable cards contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

import type {
  CommunicationProtocol_ActionableCardsOptions,
  CommunicationProtocol_CardOptions,
} from "../../options/content-options.js";
import type {
  CommunicationProtocol_ChatAction,
  CommunicationProtocol_ChatContent,
} from "../../types/chat.js";
import type {
  ActionableCardSelectionMode,
  ActionableCardSelectionState,
  ContentWidth,
} from "../../types/common.js";
import { ProtocolIdUtils } from "../protocol-id-utils.js";

/**
 * Fluent builder for CHAT_CONTENT_ACTIONABLE_CARDS with auto-ID support.
 *
 * @remarks
 * Generates CHAT_ACTION_CHOOSE_ACTIONABLE_CARD actions per card when `message_id` is present; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ActionableCardsContentBuilder({ autoId: "c", selectionMode: "SINGLE", message_id: "m" }).build()`
 */
export class CommunicationProtocol_ActionableCardsContentBuilder {
  private content: CommunicationProtocol_ChatContent;
  private messageId: string | undefined;

  /**
   * Initialize the actionable cards content builder
   *
   * @param options - Configuration options for the actionable cards content
   */
  constructor(options: CommunicationProtocol_ActionableCardsOptions) {
    const {
      actionable_cards_selection_mode: selectionMode = "SINGLE",
      actionable_cards_selection_state: selectionState = "PENDING_SELECTION",
      content_width: content_width = "WIDTH_AUTO",
      content_queue,
      content_delay,
      message_id,
    } = options;

    this.messageId = message_id;
    this.content = {
      content_id: ProtocolIdUtils.resolveContentId(options),
      content_type: "CHAT_CONTENT_ACTIONABLE_CARDS",
      content_width,
      content_queue,
      ...(content_delay && { content_delay }),
      content_data: {
        actionable_cards_selection_mode: selectionMode,
        actionable_cards_selection_state: selectionState,
        actionable_cards_items: [],
      },
    };
  }

  /**
   * Set selection mode (SINGLE, MULTIPLE)
   *
   * @param mode - Selection behavior mode specific to cards
   * @returns This builder instance for method chaining
   */
  selectionMode(
    mode: ActionableCardSelectionMode
  ): CommunicationProtocol_ActionableCardsContentBuilder {
    this.content.content_data.actionable_cards_selection_mode = mode;
    return this;
  }

  /**
   * Set selection state (PENDING_SELECTION, SELECTED, UNSELECTED)
   *
   * @param state - Current selection state of the card group
   * @returns This builder instance for method chaining
   */
  selectionState(
    state: ActionableCardSelectionState
  ): CommunicationProtocol_ActionableCardsContentBuilder {
    this.content.content_data.actionable_cards_selection_state = state;
    return this;
  }

  /**
   * Set content width (WIDTH_AUTO, WIDTH_FULL)
   *
   * @param width - Width behavior for content rendering
   * @returns This builder instance for method chaining
   */
  content_width(width: ContentWidth): CommunicationProtocol_ActionableCardsContentBuilder {
    this.content.content_width = width;
    return this;
  }

  /**
   * Add a card with actions using deconstructable options
   * Actions are automatically generated if not provided
   *
   * @param options - Card configuration options
   * @returns This builder instance for method chaining
   */
  addCard({
    title,
    subtitle,
    value,
    actions,
    simulated_user_message_text,
  }: CommunicationProtocol_CardOptions): CommunicationProtocol_ActionableCardsContentBuilder {
    let processedActions: CommunicationProtocol_ChatAction[];

    if (actions && actions.length > 0) {
      // Use provided actions
      processedActions = actions;
    } else {
      // Auto-generate CHOOSE_ACTIONABLE_CARD action
      if (!this.messageId) {
        throw new Error("Cannot auto-generate card actions without message ID context");
      }

      // Default simulated user message: title + subtitle
      const defaultSimulatedMessage = subtitle ? `${title} ${subtitle}` : title;

      // Generate a unique action ID by combining content ID with card value
      const action_id_suffix = `select-${value}`;

      // Create the action with auto-generated ID
      const action_id = ProtocolIdUtils.generateActionId(this.messageId, action_id_suffix);

      processedActions = [
        {
          action_id,
          action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
          action_data: {
            target: "CHAT",
            actionable_cards_content_id: this.content.content_id,
            selected_card_value: value,
            selected_card_title: title,
            ...(simulated_user_message_text || defaultSimulatedMessage
              ? {
                  simulated_user_message_text:
                    simulated_user_message_text || defaultSimulatedMessage,
                }
              : {}),
          },
        },
      ];
    }

    (this.content.content_data.actionable_cards_items as unknown[]).push({
      card_title: title,
      card_subtitle: subtitle,
      card_value: value,
      card_actions: processedActions,
    });
    return this;
  }

  /**
   * Add multiple cards at once
   *
   * @param cards - Array of card options to add
   * @returns This builder instance for method chaining
   */
  addCards(
    cards: CommunicationProtocol_CardOptions[]
  ): CommunicationProtocol_ActionableCardsContentBuilder {
    cards.forEach((card) => this.addCard(card));
    return this;
  }

  /**
   * Clear all cards from the content
   *
   * @returns This builder instance for method chaining
   */
  clearCards(): CommunicationProtocol_ActionableCardsContentBuilder {
    this.content.content_data.actionable_cards_items = [];
    return this;
  }

  /**
   * Get the number of cards currently added
   *
   * @returns Number of cards in the content
   */
  getCardCount(): number {
    return (this.content.content_data.actionable_cards_items as unknown[]).length;
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
