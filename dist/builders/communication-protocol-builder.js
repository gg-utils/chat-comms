/**
 * @fileoverview Static factory for fluent communication-protocol builders (messages, content, actions, compat shims).
 *
 * Flow: `CommunicationProtocol_Builder.*` entrypoints -> typed builder classes -> `build()` JSON-safe payloads.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_Builder } from "./communication-protocol-builder";
 * import { ProtocolIdUtils } from "./protocol-id-utils";
 *
 * const message = CommunicationProtocol_Builder.chatMessage({
 *   message_id: ProtocolIdUtils.generateMessageId(),
 *   message_role: "ASSISTANT",
 * })
 *   .addMarkdown({
 *     content_queue: "main",
 *     content_id_suffix: "intro",
 *     markdown: "Hello",
 *   })
 *   .build();
 * void message;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol overview.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { CommunicationProtocol_SendTextMessageActionBuilder } from "./actions/chat/send-text-message.js";
import { CommunicationProtocol_UpdatePanelActionBuilder } from "./actions/chat/update-panel.js";
import { CommunicationProtocol_UpdateProgressBarActionBuilder } from "./actions/chat/update-progress-bar.js";
import { CommunicationProtocol_ActionWrapperContentBuilder } from "./content/action-wrapper.js";
import { CommunicationProtocol_ActionableCardsContentBuilder } from "./content/actionable-cards.js";
import { CommunicationProtocol_ActionableChipsContentBuilder } from "./content/actionable-chips.js";
import { CommunicationProtocol_ButtonContentBuilder } from "./content/button.js";
import { CommunicationProtocol_MarkdownContentBuilder } from "./content/markdown.js";
import { CommunicationProtocol_PanelContentBuilder } from "./content/panel.js";
import { CommunicationProtocol_ProgressBarContentBuilder } from "./content/progress-bar.js";
import { CommunicationProtocol_ChatMessageBuilder } from "./messages/chat-message.js";
import { writeProtocolFencedJsonBlock } from "../stream/index.js";
/**
 * Fluent static entrypoint for protocol messages, content blocks, and actions used by pipelines and PromptFormatter.
 *
 * @remarks Prefer explicit per-block `content_queue` and id suffix fields; `updatePanelActionCompat` preserves legacy caller shapes without importing deprecated prompt-builder types.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_Builder } from "./communication-protocol-builder";
 *
 *
 * const message = CommunicationProtocol_Builder.chatMessage({
 *   message_id: ProtocolIdUtils.generateMessageId(),
 *   message_role: "ASSISTANT",
 * })
 *   .addMarkdown({
 *     content_queue: "main",
 *     content_id_suffix: "greeting",
 *     markdown: "# Welcome!\n\nChoose your preferred option:",
 *   })
 *   .addActionableCards({
 *     content_queue: "main",
 *     content_id_suffix: "user-choice",
 *     actionable_cards_items: [
 *       { title: "Option A", subtitle: "First choice", value: "a" },
 *       { title: "Option B", subtitle: "Second choice", value: "b" },
 *     ],
 *   })
 *   .build();
 * ```
 */
export class CommunicationProtocol_Builder {
    // ========================================================================
    // Message Builders
    // ========================================================================
    /**
     * Create a new chat message with auto-ID context
     *
     * @param options - Chat message configuration options
     * @returns CommunicationProtocol_ChatMessageBuilder instance for fluent configuration
     */
    static chatMessage(options) {
        return new CommunicationProtocol_ChatMessageBuilder(options);
    }
    // ========================================================================
    // Content Builders
    // ========================================================================
    /**
     * Create markdown content with auto-ID support
     *
     * @param options - Markdown content configuration options
     * @returns CommunicationProtocol_MarkdownContentBuilder instance for fluent configuration
     */
    static markdownContent(options) {
        return new CommunicationProtocol_MarkdownContentBuilder(options);
    }
    /**
     * Create actionable cards content with auto-ID support
     *
     * @param options - Actionable cards configuration options
     * @returns CommunicationProtocol_ActionableCardsContentBuilder instance for fluent configuration
     */
    static actionableCardsContent(options) {
        return new CommunicationProtocol_ActionableCardsContentBuilder(options);
    }
    /**
     * Create actionable chips content with auto-ID support
     *
     * @param options - Actionable chips configuration options
     * @returns CommunicationProtocol_ActionableChipsContentBuilder instance for fluent configuration
     */
    static actionableChipsContent(options) {
        return new CommunicationProtocol_ActionableChipsContentBuilder(options);
    }
    /**
     * Create button content with auto-ID support
     *
     * @param options - Button content configuration options
     * @returns CommunicationProtocol_ButtonContentBuilder instance for fluent configuration
     */
    static buttonContent(options) {
        return new CommunicationProtocol_ButtonContentBuilder(options);
    }
    /**
     * Create progress bar content with auto-ID support
     *
     * @param options - Progress bar content configuration options
     * @returns CommunicationProtocol_ProgressBarContentBuilder instance for fluent configuration
     */
    static progressBarContent(options) {
        return new CommunicationProtocol_ProgressBarContentBuilder(options);
    }
    /**
     * Create action wrapper content with auto-ID support
     *
     * @param options - Action wrapper content configuration options
     * @returns CommunicationProtocol_ActionWrapperContentBuilder instance for fluent configuration
     */
    static actionWrapperContent(options) {
        return new CommunicationProtocol_ActionWrapperContentBuilder(options);
    }
    /**
     * Create panel content with auto-ID support
     *
     * @param options - Panel content configuration options
     * @returns CommunicationProtocol_PanelContentBuilder instance for fluent configuration
     */
    static panelContent(options) {
        return new CommunicationProtocol_PanelContentBuilder(options);
    }
    // ========================================================================
    // Action Builders
    // ========================================================================
    /**
     * Create send text message action with auto-ID support
     *
     * @param options - Send text message action configuration options
     * @returns CommunicationProtocol_SendTextMessageActionBuilder instance for fluent configuration
     */
    static sendTextMessageAction(options) {
        return new CommunicationProtocol_SendTextMessageActionBuilder(options);
    }
    /**
     * Create update progress bar action with auto-ID support
     *
     * @param options - Update progress bar action configuration options
     * @returns CommunicationProtocol_UpdateProgressBarActionBuilder instance for fluent configuration
     */
    static updateProgressBarAction(options) {
        return new CommunicationProtocol_UpdateProgressBarActionBuilder(options);
    }
    /**
     * Create update panel action with auto-ID support
     *
     * @param options - Update panel action configuration options
     * @returns CommunicationProtocol_UpdatePanelActionBuilder instance for fluent configuration
     */
    static updatePanelAction(options) {
        return new CommunicationProtocol_UpdatePanelActionBuilder(options);
    }
    /**
     * Create update panel action with legacy compatibility support
     * Handles legacy Prompting_PromptBuilder format with loose types.
     *
     * Accepts both modern `CommunicationProtocol_UpdatePanelActionOptions` and legacy options (structurally
     * compatible with the deprecated Prompting_PromptBuilder type) and normalizes them safely
     * without assertions. Invalid legacy `panel_body_type` values combined with
     * `panel_body_data` produce explicit errors to preserve previous validation behavior.
     *
     * @param options - Legacy or modern update panel action configuration options
     * @returns CommunicationProtocol_UpdatePanelActionBuilder instance for fluent configuration
     */
    static updatePanelActionCompat(options) {
        const normalizedContentQueue = options.content_queue;
        if (typeof normalizedContentQueue !== "string" || normalizedContentQueue.trim().length === 0) {
            throw new Error("content_queue is required and must be a non-empty string");
        }
        // Normalize legacy options to the modern CommunicationProtocol_UpdatePanelActionOptions type without assertions
        const normalized = {
            action_id: "action_id" in options ? options.action_id : undefined,
            action_id_suffix: "action_id_suffix" in options ? options.action_id_suffix : undefined,
            content_id: options.content_id,
            content_queue: normalizedContentQueue,
            panel_header_icon: options.panel_header_icon,
            panel_header_favicon_url: options.panel_header_favicon_url,
            panel_header_title: options.panel_header_title,
            panel_header_description: options.panel_header_description,
            panel_visibility: options.panel_visibility,
            panel_body_aspect_ratio: options.panel_body_aspect_ratio,
            panel_body_data: options.panel_body_data,
            message_id: options.message_id,
        };
        // Only include animation arrays when they are valid shaped arrays
        const maybeTransitions = options.panel_transitions;
        if (maybeTransitions !== undefined &&
            CommunicationProtocol_Builder.isPanelTransitionArray(maybeTransitions)) {
            normalized.panel_transitions = maybeTransitions;
        }
        const maybeEffects = options.panel_effects;
        if (maybeEffects !== undefined &&
            CommunicationProtocol_Builder.isPanelEffectArray(maybeEffects)) {
            normalized.panel_effects = maybeEffects;
        }
        // Preserve legacy behavior: if an invalid body type is provided together with body data,
        // throw an error similar to the builder's validation rather than silently ignoring it.
        if ("panel_body_type" in options && options.panel_body_type !== undefined) {
            const value = String(options.panel_body_type);
            if (CommunicationProtocol_Builder.isPanelBodyType(value)) {
                normalized.panel_body_type = value;
            }
            else if (options.panel_body_data !== undefined) {
                throw new Error(`Invalid panel body type: ${value}. Must be one of: 'PANEL_BODY_MARKDOWN', 'PANEL_BODY_IMAGE', 'PANEL_BODY_ACTIONABLE_CARDS', 'PANEL_BODY_ACTIONABLE_CHIPS', 'PANEL_BODY_GOOGLE_SEARCH_HOME', 'PANEL_BODY_GOOGLE_SEARCH_RESULT', 'PANEL_BODY_GOOGLE_MAPS_HOME', 'PANEL_BODY_GOOGLE_MAPS_REVIEWS', 'PANEL_BODY_CHATGPT_HOME', 'PANEL_BODY_CHATGPT_RESULT', 'PANEL_BODY_GEMINI_HOME', 'PANEL_BODY_GEMINI_RESULT', 'PANEL_BODY_PERPLEXITY_HOME', 'PANEL_BODY_PERPLEXITY_RESULT'`);
            }
        }
        return new CommunicationProtocol_UpdatePanelActionBuilder(normalized);
    }
    /**
     * Type guard for PanelBodyType string values
     */
    static isPanelBodyType(value) {
        const allowed = [
            "PANEL_BODY_MARKDOWN",
            "PANEL_BODY_IMAGE",
            "PANEL_BODY_ACTIONABLE_CARDS",
            "PANEL_BODY_ACTIONABLE_CHIPS",
            "PANEL_BODY_GOOGLE_SEARCH_HOME",
            "PANEL_BODY_GOOGLE_SEARCH_RESULT",
            "PANEL_BODY_GOOGLE_MAPS_HOME",
            "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
            "PANEL_BODY_CHATGPT_HOME",
            "PANEL_BODY_CHATGPT_RESULT",
            "PANEL_BODY_GEMINI_HOME",
            "PANEL_BODY_GEMINI_RESULT",
            "PANEL_BODY_PERPLEXITY_HOME",
            "PANEL_BODY_PERPLEXITY_RESULT",
        ];
        return allowed.includes(value);
    }
    /**
     * Type guard to verify an unknown value is a CommunicationProtocol_PanelTransition array
     */
    static isPanelTransitionArray(val) {
        return (Array.isArray(val) &&
            val.every((t) => t &&
                typeof t === "object" &&
                "animation_trigger" in t &&
                typeof t.animation_trigger === "string" &&
                "animation_type" in t &&
                typeof t.animation_type === "string" &&
                "animation_framer_motion_attributes" in t &&
                typeof t.animation_framer_motion_attributes === "object"));
    }
    /**
     * Type guard to verify an unknown value is a CommunicationProtocol_PanelEffect array
     */
    static isPanelEffectArray(val) {
        return (Array.isArray(val) &&
            val.every((e) => e &&
                typeof e === "object" &&
                "effect_type" in e &&
                typeof e.effect_type === "string" &&
                "effect_framer_motion_attributes" in e &&
                typeof e.effect_framer_motion_attributes === "object"));
    }
    // ========================================================================
    // Utility Methods
    // ========================================================================
    /**
     * Convert a message to JSON string with proper formatting
     *
     * @param message - The chat message to convert to JSON
     * @returns Formatted JSON string
     */
    static toJsonString(message) {
        return JSON.stringify(message, null, 2);
    }
    /**
     * Create a JSON code block for prompts
     *
     * @param message - The chat message to convert to a JSON code block
     * @returns Markdown-formatted JSON code block
     */
    static toJsonBlock(message) {
        return writeProtocolFencedJsonBlock(message);
    }
    // ========================================================================
    // Helper Methods for Complex Workflows
    // ========================================================================
    /**
     * Create a complete progress bar update message
     * This creates a message with an action wrapper containing a progress bar update action
     *
     * @param options - Progress bar update message configuration
     * @returns CommunicationProtocol_ChatMessageBuilder instance with progress bar update configured
     */
    static createProgressBarUpdateMessage(options) {
        const { message_id, content_queue, message_role: message_role = "ASSISTANT", progress_bar_content_id: content_id, progress_bar_state, progress_bar_visibility, progress_bar_current_percentage, progress_bar_current_animation_duration_ms, progress_bar_next_goal_delay_ms, progress_bar_next_goal_percentage, progress_bar_next_goal_animation_duration_ms, progress_bar_message, progress_bar_icon, debug = false, } = options;
        // Create the update action
        const updateAction = this.updateProgressBarAction({
            content_id_suffix: "progress-update",
            content_id,
            progress_bar_state,
            progress_bar_visibility,
            progress_bar_current_percentage,
            progress_bar_current_animation_duration_ms,
            progress_bar_next_goal_delay_ms,
            progress_bar_next_goal_percentage,
            progress_bar_next_goal_animation_duration_ms,
            progress_bar_message,
            progress_bar_icon,
            message_id,
        }).build();
        // Create the message with action wrapper
        return this.chatMessage({
            message_id,
            message_role,
            debug,
        }).addActionWrapper({
            content_queue,
            content_id_suffix: "progress-update-wrapper",
            action: updateAction,
        });
    }
    /**
     * Create a simple progress bar update action wrapper content
     *
     * @param options - Progress bar update content configuration
     * @returns CommunicationProtocol_ChatContent with progress bar update action wrapped
     */
    static createProgressBarUpdateContent(options) {
        const { message_id, content_queue, progress_bar_content_id, progress_bar_state, progress_bar_visibility, progress_bar_current_percentage, progress_bar_current_animation_duration_ms, progress_bar_next_goal_delay_ms, progress_bar_next_goal_percentage, progress_bar_next_goal_animation_duration_ms, progress_bar_message, progress_bar_icon, } = options;
        // Create the update action
        const updateAction = this.updateProgressBarAction({
            content_id_suffix: "progress-update",
            content_id: progress_bar_content_id,
            progress_bar_state,
            progress_bar_visibility,
            progress_bar_current_percentage,
            progress_bar_current_animation_duration_ms,
            progress_bar_next_goal_delay_ms,
            progress_bar_next_goal_percentage,
            progress_bar_next_goal_animation_duration_ms,
            progress_bar_message,
            progress_bar_icon,
            message_id,
        }).build();
        // Create action wrapper content
        return this.actionWrapperContent({
            content_queue,
            content_id_suffix: "progress-update-wrapper",
            action: updateAction,
            message_id,
        }).build();
    }
    // ========================================================================
    // Quick Creation Methods
    // ========================================================================
    /**
     * Quick method to create a simple markdown message
     *
     * @param messageId - Identifier recorded on the chat message and echoed in nested content for correlation in the protocol stream.
     * @param markdown - Markdown content
     * @param role - Message role (default: "ASSISTANT")
     * @returns Complete CommunicationProtocol_ChatMessage with markdown content
     */
    static createMarkdownMessage(messageId, markdown, content_queue, role = "ASSISTANT") {
        return this.chatMessage({ message_id: messageId, message_role: role })
            .addMarkdown({
            content_queue,
            content_id_suffix: "content",
            markdown,
        })
            .build();
    }
    /**
     * Quick method to create a progress bar message
     *
     * @param messageId - Identifier recorded on the chat message and echoed in nested content for correlation in the protocol stream.
     * @param progress_bar_message - Label or status line shown to the user alongside the progress indicator.
     * @param progress_bar_current_percentage - Current progress percentage
     * @param progress_bar_state - Progress state (default: auto-determined)
     * @param message_role - Message role (default: "ASSISTANT")
     * @returns Complete CommunicationProtocol_ChatMessage with progress bar content
     */
    static createProgressBarMessage(messageId, progress_bar_message, progress_bar_current_percentage, content_queue, progress_bar_state, message_role = "ASSISTANT") {
        return this.chatMessage({ message_id: messageId, message_role: message_role })
            .addProgressBar({
            content_queue,
            content_id_suffix: "progress",
            progress_bar_message,
            progress_bar_current_percentage,
            progress_bar_state,
        })
            .build();
    }
    /**
     * Quick method to create a message with actionable cards
     *
     * @param message_id - Message ID
     * @param cards - Array of card options
     * @param message_role - Message role (default: "ASSISTANT")
     * @returns Complete CommunicationProtocol_ChatMessage with actionable cards content
     */
    static createCardsMessage(message_id, cards, content_queue, message_role = "ASSISTANT") {
        return this.chatMessage({ message_id, message_role: message_role })
            .addActionableCards({
            content_queue,
            content_id_suffix: "cards",
            actionable_cards_items: cards,
        })
            .build();
    }
    // ========================================================================
    // Compatibility Methods (Temporary during migration)
    // ========================================================================
    /**
     * Create update button action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static updateButtonAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "CHAT_ACTION",
                    action_subtype: "UPDATE_BUTTON",
                    action_id: options.action_id ?? "update-button",
                    ...options,
                };
            },
        };
    }
    /**
     * Create canvas open action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasOpenAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "CANVAS_ACTION",
                    action_subtype: "OPEN",
                    action_id: options.action_id ?? "canvas-open",
                    ...options,
                };
            },
        };
    }
    /**
     * Create canvas update action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasUpdateAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "CANVAS_ACTION",
                    action_subtype: "UPDATE",
                    action_id: options.action_id ?? "canvas-update",
                    ...options,
                };
            },
        };
    }
    /**
     * Create canvas close action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasCloseAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "CANVAS_ACTION",
                    action_subtype: "CLOSE",
                    action_id: options.action_id ?? "canvas-close",
                    ...options,
                };
            },
        };
    }
    /**
     * Create set theme action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static setThemeAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "APP_ACTION",
                    action_subtype: "SET_THEME",
                    action_id: options.action_id ?? "set-theme",
                    ...options,
                };
            },
        };
    }
    /**
     * Create thread list refresh action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static threadListRefreshAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "APP_ACTION",
                    action_subtype: "THREAD_LIST_REFRESH",
                    action_id: options.action_id ?? "thread-list-refresh",
                    ...options,
                };
            },
        };
    }
    /**
     * Create user preference update action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static userPreferenceUpdateAction(options) {
        return {
            /**
             * Materializes the legacy compatibility shim's wire action payload.
             *
             * @remarks Default `action_id` is set before spreading `options` for predictable merges.
             */
            build() {
                return {
                    action_type: "APP_ACTION",
                    action_subtype: "USER_PREFERENCE_UPDATE",
                    action_id: options.action_id ?? "user-preference-update",
                    ...options,
                };
            },
        };
    }
}
// Export as default for convenience
export default CommunicationProtocol_Builder;
//# sourceMappingURL=communication-protocol-builder.js.map