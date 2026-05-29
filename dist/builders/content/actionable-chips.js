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
import { ProtocolIdUtils } from "../protocol-id-utils.js";
/**
 * Fluent builder for CHAT_CONTENT_ACTIONABLE_CHIPS with auto-ID support.
 *
 * @remarks
 * Generates chip selection actions when `message_id` is present; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ActionableChipsContentBuilder({ autoId: "h", selectionMode: "MULTIPLE", message_id: "m" }).build()`
 */
export class CommunicationProtocol_ActionableChipsContentBuilder {
    content;
    messageId;
    /**
     * Initialize the actionable chips content builder
     *
     * @param options - Configuration options for the actionable chips content
     */
    constructor(options) {
        const { actionable_chips_selection_mode: selectionMode = "SINGLE", actionable_chips_selection_state: selectionState = "PENDING_SELECTION", content_width: content_width = "WIDTH_AUTO", content_queue, content_delay, message_id, } = options;
        this.messageId = message_id;
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS",
            content_width,
            content_queue,
            ...(content_delay && { content_delay }),
            content_data: {
                actionable_chips_selection_mode: selectionMode,
                actionable_chips_selection_state: selectionState,
                actionable_chips_items: [],
            },
        };
    }
    /**
     * Set selection mode (SINGLE, MULTIPLE)
     *
     * @param mode - Selection behavior mode specific to chips
     * @returns This builder instance for method chaining
     */
    selectionMode(mode) {
        this.content.content_data.actionable_chips_selection_mode = mode;
        return this;
    }
    /**
     * Set selection state (PENDING_SELECTION, SELECTED, DISABLED)
     *
     * @param state - Current selection state of the chip group
     * @returns This builder instance for method chaining
     */
    selectionState(state) {
        this.content.content_data.actionable_chips_selection_state = state;
        return this;
    }
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width) {
        this.content.content_width = width;
        return this;
    }
    /**
     * Add a chip with actions using deconstructable options
     * Actions are automatically generated if not provided
     *
     * @param options - Chip configuration options
     * @returns This builder instance for method chaining
     */
    addChip({ chip_text: text, chip_value: value, chip_style: style = "CHIP_STYLE_SECONDARY", chip_state: state = "ENABLED", chip_actions: actions, simulated_user_message_text, }) {
        let processedActions;
        if (actions && actions.length > 0) {
            // Use provided actions
            processedActions = actions;
        }
        else {
            // Auto-generate CHOOSE_ACTIONABLE_CHIP action
            if (!this.messageId) {
                throw new Error("Cannot auto-generate chip actions without message ID context");
            }
            // Default simulated user message: chip text
            const defaultSimulatedMessage = text;
            // Generate a unique action ID by combining content ID with chip value
            const action_id_suffix = `select-${value}`;
            // Create the action with auto-generated ID
            const action_id = ProtocolIdUtils.generateActionId(this.messageId, action_id_suffix);
            processedActions = [
                {
                    action_id,
                    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                    action_data: {
                        target: "CHAT",
                        actionable_chips_content_id: this.content.content_id,
                        selected_chip_value: value,
                        selected_chip_text: text,
                        ...(simulated_user_message_text || defaultSimulatedMessage
                            ? {
                                simulated_user_message_text: simulated_user_message_text || defaultSimulatedMessage,
                            }
                            : {}),
                    },
                },
            ];
        }
        this.content.content_data.actionable_chips_items.push({
            chip_text: text,
            chip_value: value,
            chip_style: style,
            chip_state: state,
            chip_actions: processedActions,
        });
        return this;
    }
    /**
     * Add multiple chips at once
     *
     * @param chips - Array of chip options to add
     * @returns This builder instance for method chaining
     */
    addChips(chips) {
        chips.forEach((chip) => this.addChip(chip));
        return this;
    }
    /**
     * Clear all chips from the content
     *
     * @returns This builder instance for method chaining
     */
    clearChips() {
        this.content.content_data.actionable_chips_items = [];
        return this;
    }
    /**
     * Get the number of chips currently added
     *
     * @returns Number of chips in the content
     */
    getChipCount() {
        return this.content.content_data.actionable_chips_items.length;
    }
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build() {
        return { ...this.content };
    }
}
//# sourceMappingURL=actionable-chips.js.map