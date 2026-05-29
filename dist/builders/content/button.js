/**
 * @fileoverview Builds CHAT_CONTENT_BUTTON payloads that render labeled buttons with style, state, and ordered chat actions.
 *
 * Buttons are the primary tap target for explicit user confirmations; keep `button_actions` aligned with server-side intent checks.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ButtonContentBuilder } from "./button.js";
 * import { CommunicationProtocol_SendTextMessageActionBuilder } from "../actions/chat/send-text-message";
 *
 * const go = new CommunicationProtocol_SendTextMessageActionBuilder({
 *   autoId: "go",
 *   text: "Go",
 *   message_id: "msg-60",
 * }).build();
 *
 * const content = new CommunicationProtocol_ButtonContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "cta",
 *   button_text: "Continue",
 *   button_style: "BUTTON_STYLE_PRIMARY",
 *   button_actions: [go],
 *   message_id: "msg-60",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_BUTTON.md - button content contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { ProtocolIdUtils } from "../protocol-id-utils.js";
/**
 * Fluent builder for CHAT_CONTENT_BUTTON with auto-ID support.
 *
 * @remarks
 * Maps camelCase options into protocol snake_case fields; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ButtonContentBuilder({ autoId: "b", buttonText: "OK", button_actions: [], message_id: "m" }).build()`
 */
export class CommunicationProtocol_ButtonContentBuilder {
    content;
    /**
     * Initialize the button content builder
     *
     * @param options - Configuration options for the button content
     */
    constructor(options) {
        const { button_text: buttonText, button_style: buttonStyle = "BUTTON_STYLE_PRIMARY", button_state: buttonState = "ENABLED", button_actions: actions, content_width: content_width = "WIDTH_AUTO", content_queue, content_delay, message_id: _message_id, } = options;
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CHAT_CONTENT_BUTTON",
            content_width,
            content_queue,
            ...(content_delay && { content_delay }),
            content_data: {
                button_text: buttonText,
                button_style: buttonStyle,
                button_state: buttonState,
                button_actions: actions,
            },
        };
    }
    /**
     * Set button text
     *
     * @param text - Text to display on the button
     * @returns This builder instance for method chaining
     */
    setText(text) {
        this.content.content_data.button_text = text;
        return this;
    }
    /**
     * Set button style (BUTTON_STYLE_PRIMARY, BUTTON_STYLE_SECONDARY,
     * BUTTON_STYLE_SUCCESS, BUTTON_STYLE_WARNING, BUTTON_STYLE_DANGER)
     *
     * @param style - Visual style variant for the button
     * @returns This builder instance for method chaining
     */
    style(style) {
        this.content.content_data.button_style = style;
        return this;
    }
    /**
     * Set button actions
     *
     * @param actions - Array of actions to execute when button is clicked
     * @returns This builder instance for method chaining
     */
    actions(actions) {
        this.content.content_data.button_actions = actions;
        return this;
    }
    /**
     * Add a single action to the button
     *
     * @param action - Action to add to the button's action list
     * @returns This builder instance for method chaining
     */
    addAction(action) {
        if (!Array.isArray(this.content.content_data.button_actions)) {
            this.content.content_data.button_actions = [];
        }
        this.content.content_data.button_actions.push(action);
        return this;
    }
    /**
     * Add multiple actions to the button
     *
     * @param actions - Array of actions to add to the button's action list
     * @returns This builder instance for method chaining
     */
    addActions(actions) {
        if (!Array.isArray(this.content.content_data.button_actions)) {
            this.content.content_data.button_actions = [];
        }
        this.content.content_data.button_actions.push(...actions);
        return this;
    }
    /**
     * Clear all actions from the button
     *
     * @returns This builder instance for method chaining
     */
    clearActions() {
        this.content.content_data.button_actions = [];
        return this;
    }
    /**
     * Set button disabled state
     *
     * @param disabled - Whether the button should be disabled
     * @returns This builder instance for method chaining
     */
    disabled() {
        this.content.content_data.button_state = "DISABLED";
        return this;
    }
    /**
     * Enable the button (convenience method)
     *
     * @returns This builder instance for method chaining
     */
    enabled() {
        this.content.content_data.button_state = "ENABLED";
        return this;
    }
    /**
     * Set button to loading state
     *
     * @returns This builder instance for method chaining
     */
    loading() {
        this.content.content_data.button_state = "LOADING";
        return this;
    }
    /**
     * Set button state directly
     *
     * @param state - Button state ("ENABLED", "DISABLED", "LOADING")
     * @returns This builder instance for method chaining
     */
    state(state) {
        this.content.content_data.button_state = state;
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
     * Get the current button text
     *
     * @returns Current button text
     */
    getText() {
        return this.content.content_data.button_text;
    }
    /**
     * Get the current button style
     *
     * @returns Current button style
     */
    getStyle() {
        return this.content.content_data.button_style;
    }
    /**
     * Get the current disabled state
     *
     * @returns Whether the button is disabled
     */
    isDisabled() {
        return this.content.content_data.button_state === "DISABLED";
    }
    /**
     * Get the number of actions assigned to the button
     *
     * @returns Number of actions
     */
    getActionCount() {
        const actions = this.content.content_data.button_actions;
        return Array.isArray(actions) ? actions.length : 0;
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
//# sourceMappingURL=button.js.map