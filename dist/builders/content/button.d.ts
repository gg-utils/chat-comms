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
import type { CommunicationProtocol_ButtonContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatAction, CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { ButtonStyle, ChatButtonState, ContentWidth } from "../../types/common.js";
/**
 * Fluent builder for CHAT_CONTENT_BUTTON with auto-ID support.
 *
 * @remarks
 * Maps camelCase options into protocol snake_case fields; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ButtonContentBuilder({ autoId: "b", buttonText: "OK", button_actions: [], message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_ButtonContentBuilder {
    private content;
    /**
     * Initialize the button content builder
     *
     * @param options - Configuration options for the button content
     */
    constructor(options: CommunicationProtocol_ButtonContentOptions);
    /**
     * Set button text
     *
     * @param text - Text to display on the button
     * @returns This builder instance for method chaining
     */
    setText(text: string): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set button style (BUTTON_STYLE_PRIMARY, BUTTON_STYLE_SECONDARY,
     * BUTTON_STYLE_SUCCESS, BUTTON_STYLE_WARNING, BUTTON_STYLE_DANGER)
     *
     * @param style - Visual style variant for the button
     * @returns This builder instance for method chaining
     */
    style(style: ButtonStyle): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set button actions
     *
     * @param actions - Array of actions to execute when button is clicked
     * @returns This builder instance for method chaining
     */
    actions(actions: CommunicationProtocol_ChatAction[]): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Add a single action to the button
     *
     * @param action - Action to add to the button's action list
     * @returns This builder instance for method chaining
     */
    addAction(action: CommunicationProtocol_ChatAction): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Add multiple actions to the button
     *
     * @param actions - Array of actions to add to the button's action list
     * @returns This builder instance for method chaining
     */
    addActions(actions: CommunicationProtocol_ChatAction[]): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Clear all actions from the button
     *
     * @returns This builder instance for method chaining
     */
    clearActions(): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set button disabled state
     *
     * @param disabled - Whether the button should be disabled
     * @returns This builder instance for method chaining
     */
    disabled(): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Enable the button (convenience method)
     *
     * @returns This builder instance for method chaining
     */
    enabled(): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set button to loading state
     *
     * @returns This builder instance for method chaining
     */
    loading(): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set button state directly
     *
     * @param state - Button state ("ENABLED", "DISABLED", "LOADING")
     * @returns This builder instance for method chaining
     */
    state(state: ChatButtonState): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width: ContentWidth): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Get the current button text
     *
     * @returns Current button text
     */
    getText(): string;
    /**
     * Get the current button style
     *
     * @returns Current button style
     */
    getStyle(): string;
    /**
     * Get the current disabled state
     *
     * @returns Whether the button is disabled
     */
    isDisabled(): boolean;
    /**
     * Get the number of actions assigned to the button
     *
     * @returns Number of actions
     */
    getActionCount(): number;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=button.d.ts.map