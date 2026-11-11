/**
 * @fileoverview Builds CHAT_CONTENT_ACTIONABLE_CHIPS payloads for compact chip-based single- or multi-select UIs.
 *
 * Chips mirror cards at a smaller surface area and still emit structured CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP actions when wired with `message_id`.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ActionableChipsContentBuilder } from "./actionable-chips.js";
 *
 * const content = new CommunicationProtocol_ActionableChipsContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "yn",
 *   actionable_chips_selection_mode: "SINGLE",
 *   message_id: "msg-51",
 * })
 *   .addChip({ text: "Yes", value: "yes", style: "CHIP_STYLE_PRIMARY" })
 *   .build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md - actionable chips contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_ActionableChipsOptions, CommunicationProtocol_ChipOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { ActionableChipSelectionMode, ActionableChipSelectionState, ContentWidth } from "../../types/common.js";
/**
 * Fluent builder for CHAT_CONTENT_ACTIONABLE_CHIPS with auto-ID support.
 *
 * @remarks
 * Generates chip selection actions when `message_id` is present; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ActionableChipsContentBuilder({ autoId: "h", selectionMode: "MULTIPLE", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_ActionableChipsContentBuilder {
    private content;
    private messageId;
    /**
     * Initialize the actionable chips content builder
     *
     * @param options - Configuration options for the actionable chips content
     */
    constructor(options: CommunicationProtocol_ActionableChipsOptions);
    /**
     * Set selection mode (SINGLE, MULTIPLE)
     *
     * @param mode - Selection behavior mode specific to chips
     * @returns This builder instance for method chaining
     */
    selectionMode(mode: ActionableChipSelectionMode): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Set selection state (PENDING_SELECTION, SELECTED, DISABLED)
     *
     * @param state - Current selection state of the chip group
     * @returns This builder instance for method chaining
     */
    selectionState(state: ActionableChipSelectionState): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width: ContentWidth): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Add a chip with actions using deconstructable options
     * Actions are automatically generated if not provided
     *
     * @param options - Chip configuration options
     * @returns This builder instance for method chaining
     */
    addChip({ chip_text: text, chip_value: value, chip_style: style, chip_state: state, chip_actions: actions, simulated_user_message_text, }: CommunicationProtocol_ChipOptions): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Add multiple chips at once
     *
     * @param chips - Array of chip options to add
     * @returns This builder instance for method chaining
     */
    addChips(chips: CommunicationProtocol_ChipOptions[]): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Clear all chips from the content
     *
     * @returns This builder instance for method chaining
     */
    clearChips(): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Get the number of chips currently added
     *
     * @returns Number of chips in the content
     */
    getChipCount(): number;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=actionable-chips.d.ts.map