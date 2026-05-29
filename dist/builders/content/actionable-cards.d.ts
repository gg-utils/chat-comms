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
import type { CommunicationProtocol_ActionableCardsOptions, CommunicationProtocol_CardOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { ActionableCardSelectionMode, ActionableCardSelectionState, ContentWidth } from "../../types/common.js";
/**
 * Fluent builder for CHAT_CONTENT_ACTIONABLE_CARDS with auto-ID support.
 *
 * @remarks
 * Generates CHAT_ACTION_CHOOSE_ACTIONABLE_CARD actions per card when `message_id` is present; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ActionableCardsContentBuilder({ autoId: "c", selectionMode: "SINGLE", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_ActionableCardsContentBuilder {
    private content;
    private messageId?;
    /**
     * Initialize the actionable cards content builder
     *
     * @param options - Configuration options for the actionable cards content
     */
    constructor(options: CommunicationProtocol_ActionableCardsOptions);
    /**
     * Set selection mode (SINGLE, MULTIPLE)
     *
     * @param mode - Selection behavior mode specific to cards
     * @returns This builder instance for method chaining
     */
    selectionMode(mode: ActionableCardSelectionMode): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Set selection state (PENDING_SELECTION, SELECTED, UNSELECTED)
     *
     * @param state - Current selection state of the card group
     * @returns This builder instance for method chaining
     */
    selectionState(state: ActionableCardSelectionState): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width: ContentWidth): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Add a card with actions using deconstructable options
     * Actions are automatically generated if not provided
     *
     * @param options - Card configuration options
     * @returns This builder instance for method chaining
     */
    addCard({ title, subtitle, value, actions, simulated_user_message_text, }: CommunicationProtocol_CardOptions): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Add multiple cards at once
     *
     * @param cards - Array of card options to add
     * @returns This builder instance for method chaining
     */
    addCards(cards: CommunicationProtocol_CardOptions[]): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Clear all cards from the content
     *
     * @returns This builder instance for method chaining
     */
    clearCards(): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Get the number of cards currently added
     *
     * @returns Number of cards in the content
     */
    getCardCount(): number;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=actionable-cards.d.ts.map