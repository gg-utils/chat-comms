import { omitUndefined } from "../../omit-undefined.js";
import { ProtocolIdUtils } from "../protocol-id-utils.js";
import { CommunicationProtocol_UpdatePanelActionBuilder } from "../actions/chat/update-panel.js";
import { CommunicationProtocol_UpdateProgressBarActionBuilder } from "../actions/chat/update-progress-bar.js";
import { CommunicationProtocol_ActionWrapperContentBuilder } from "../content/action-wrapper.js";
import { CommunicationProtocol_ActionableCardsContentBuilder } from "../content/actionable-cards.js";
import { CommunicationProtocol_ActionableChipsContentBuilder } from "../content/actionable-chips.js";
import { CommunicationProtocol_ButtonContentBuilder } from "../content/button.js";
import { CommunicationProtocol_MarkdownContentBuilder } from "../content/markdown.js";
import { CommunicationProtocol_PanelContentBuilder } from "../content/panel.js";
import { CommunicationProtocol_ProgressBarContentBuilder } from "../content/progress-bar.js";
/**
 * Fluent orchestrator for CHAT_MESSAGE assembly with auto-ID context passing.
 *
 * @remarks
 * Mutates an internal `CommunicationProtocol_ChatMessage`; `add*` helpers forward `message_id` into nested builders when omitted.
 *
 * @example
 * `new CommunicationProtocol_ChatMessageBuilder({ message_id: "m", message_role: "ASSISTANT" }).build()`
 */
export class CommunicationProtocol_ChatMessageBuilder {
    message;
    /**
     * Initialize the chat message builder
     *
     * @param options - Configuration options for the chat message
     */
    constructor(options) {
        const { message_id: messageId, message_role: role = "ASSISTANT", contents = [], debug = false, } = options;
        this.message = {
            message_id: messageId,
            message_type: "CHAT_MESSAGE",
            message_role: role,
            message_target: "CHAT",
            message_contents: [...contents],
            ...(debug && { debug }),
        };
    }
    /**
     * Add content to the message
     *
     * @param content - Chat content to add
     * @returns This builder instance for method chaining
     */
    addContent(content) {
        this.message.message_contents.push(content);
        return this;
    }
    /**
     * Add multiple contents to the message
     *
     * @param contents - Array of chat contents to add
     * @returns This builder instance for method chaining
     */
    addContents(contents) {
        this.message.message_contents.push(...contents);
        return this;
    }
    /**
     * Create and add markdown content with auto-ID support
     *
     * @param options - Markdown content configuration options
     * @returns This builder instance for method chaining
     */
    addMarkdown(options) {
        const content = new CommunicationProtocol_MarkdownContentBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addContent(content);
    }
    /**
     * Create and add actionable cards content with direct cards array
     *
     * @param options - Actionable cards configuration options
     * @returns This builder instance for method chaining
     */
    addActionableCards(options) {
        const { content_id_suffix, actionable_cards_items, actionable_cards_selection_mode: actionable_cards_selection_mode = "SINGLE", actionable_cards_selection_state: actionable_cards_selection_state = "PENDING_SELECTION", content_delay, content_queue, } = options;
        let builder = new CommunicationProtocol_ActionableCardsContentBuilder({
            content_id_suffix,
            actionable_cards_selection_mode,
            actionable_cards_selection_state,
            content_queue,
            message_id: this.message.message_id,
        });
        // Add each card individually
        actionable_cards_items.forEach((card) => {
            builder = builder.addCard(card);
        });
        const content = builder.build();
        // Apply content_delay if provided
        if (content_delay !== undefined && content_delay > 0) {
            content.content_delay = content_delay;
        }
        return this.addContent(content);
    }
    /**
     * Create and add actionable chips content with direct chips array
     *
     * @param options - Actionable chips configuration options
     * @returns This builder instance for method chaining
     */
    addActionableChips(options) {
        const { content_id_suffix, actionable_chips_items: chips, actionable_chips_selection_mode: actionable_chips_selection_mode = "SINGLE", actionable_chips_selection_state: actionable_chips_selection_state = "PENDING_SELECTION", content_delay, content_queue, } = options;
        let builder = new CommunicationProtocol_ActionableChipsContentBuilder({
            content_id_suffix,
            actionable_chips_selection_mode,
            actionable_chips_selection_state,
            content_queue,
            message_id: this.message.message_id,
        });
        // Add each chip individually
        chips.forEach((chip) => {
            builder = builder.addChip(chip);
        });
        const content = builder.build();
        // Apply content_delay if provided
        if (content_delay !== undefined && content_delay > 0) {
            content.content_delay = content_delay;
        }
        return this.addContent(content);
    }
    /**
     * Create and add button content with auto-ID support
     *
     * @param options - Button content configuration options
     * @returns This builder instance for method chaining
     */
    addButton(options) {
        const content = new CommunicationProtocol_ButtonContentBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addContent(content);
    }
    /**
     * Create and add progress bar content with auto-ID support
     *
     * @param options - Progress bar content configuration options
     * @returns This builder instance for method chaining
     */
    addProgressBar(options) {
        const content = new CommunicationProtocol_ProgressBarContentBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addContent(content);
    }
    /**
     * Create and add action wrapper content with auto-ID support
     *
     * @param options - Action wrapper content configuration options
     * @returns This builder instance for method chaining
     */
    addActionWrapper(options) {
        const content = new CommunicationProtocol_ActionWrapperContentBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addContent(content);
    }
    /**
     * Create and add panel content with auto-ID support
     *
     * @param options - Panel content configuration options
     * @returns This builder instance for method chaining
     */
    addPanel(options) {
        const content = new CommunicationProtocol_PanelContentBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addContent(content);
    }
    /**
     * Update an existing progress bar with auto-ID support (shortcut for action wrapper)
     *
     * @param options - Progress bar update configuration options
     * @returns This builder instance for method chaining
     */
    updateProgressBar(options) {
        const { content_id_suffix: autoId = "progress-update", content_id, targetAutoId, content_queue, content_delay, progress_bar_state: state, progress_bar_visibility: visibility, progress_bar_current_percentage, progress_bar_current_animation_duration_ms, progress_bar_next_goal_delay_ms, progress_bar_next_goal_percentage, progress_bar_next_goal_animation_duration_ms, progress_bar_message: message, progress_bar_icon: icon, } = options;
        const updateAction = new CommunicationProtocol_UpdateProgressBarActionBuilder(omitUndefined({
            content_id_suffix: autoId,
            content_id: content_id ||
                ProtocolIdUtils.generateContentId(this.message.message_id, targetAutoId || autoId),
            progress_bar_state: state,
            progress_bar_visibility: visibility,
            progress_bar_current_percentage,
            progress_bar_current_animation_duration_ms,
            progress_bar_next_goal_delay_ms,
            progress_bar_next_goal_percentage,
            progress_bar_next_goal_animation_duration_ms,
            progress_bar_message: message,
            progress_bar_icon: icon,
            message_id: this.message.message_id,
        })).build();
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: autoId,
            action: updateAction,
            content_queue,
            content_delay,
        }));
    }
    /**
     * Update an existing button with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Button update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateButton(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "button-update"),
            action_type: "CHAT_ACTION_UPDATE_BUTTON",
            action_data: {
                target: "CHAT",
                button_content_id: options.content_id,
                ...(options.newButtonText !== undefined && {
                    button_text: options.newButtonText,
                }),
                ...(options.newButtonStyle !== undefined && {
                    button_style: options.newButtonStyle,
                }),
                ...(options.newButtonState !== undefined && {
                    button_state: options.newButtonState,
                }),
                ...(options.newButtonActions !== undefined && {
                    button_actions: options.newButtonActions,
                }),
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "button-update"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Update an existing panel with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Panel update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updatePanel(options) {
        const action = new CommunicationProtocol_UpdatePanelActionBuilder({
            ...options,
            message_id: this.message.message_id,
        }).build();
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "panel-update"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Open or focus a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas open configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    openCanvas(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "canvas-open"),
            action_type: "CANVAS_ACTION_OPEN",
            action_data: {
                target: "CANVAS",
                canvas_title_label: options.canvasTitle,
                ...(options.canvasTitleHref !== undefined && {
                    canvas_title_href: options.canvasTitleHref,
                }),
                ...(options.canvasInitialContents !== undefined && {
                    canvas_initial_contents: options.canvasInitialContents,
                }),
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "canvas-open"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Update a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateCanvas(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "canvas-update"),
            action_type: "CANVAS_ACTION_UPDATE",
            action_data: {
                target: "CANVAS",
                canvas_id: options.canvasDocumentId,
                ...(options.canvasTitle !== undefined && {
                    canvas_title_label: options.canvasTitle,
                }),
                ...(options.canvasTitleHref !== undefined && {
                    canvas_title_href: options.canvasTitleHref,
                }),
                ...(options.canvasOperation !== undefined && {
                    canvas_operation: options.canvasOperation,
                }),
                ...(options.canvasContents !== undefined && {
                    canvas_contents: options.canvasContents,
                }),
                ...(options.canvasContentId !== undefined && {
                    canvas_content_id: options.canvasContentId,
                }),
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "canvas-update"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Close a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas close configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    closeCanvas(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "canvas-close"),
            action_type: "CANVAS_ACTION_CLOSE",
            action_data: {
                target: "CANVAS",
                canvas_id: options.canvasDocumentId,
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "canvas-close"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Set the consumer app theme with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Theme configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setTheme(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "set-theme"),
            action_type: "APP_ACTION_SET_THEME",
            action_data: { target: "APP", theme_name: options.themeName },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "set-theme"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Stream a diagnostic line to consumer developer consoles (shortcut for action wrapper).
     *
     * @param options - Core console payload plus queue placement.
     * @returns This builder instance for method chaining.
     */
    coreConsole(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "core-console"),
            action_type: "APP_ACTION_CORE_CONSOLE",
            action_data: {
                target: "APP",
                level: options.level,
                message: options.message,
                timestamp: options.timestamp || new Date().toISOString(),
                ...(options.payload !== undefined && { payload: options.payload }),
                ...(options.source !== undefined && { source: options.source }),
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "core-console"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Set the chat input placeholder with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Placeholder configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setInputPlaceholder(options) {
        const actionIdSuffix = options.action_id_suffix
            ? `set-input-placeholder-${options.action_id_suffix}`
            : "set-input-placeholder";
        const wrapperIdSuffix = `${actionIdSuffix}-wrapper`;
        const action = {
            action_id: ProtocolIdUtils.generateActionId(this.message.message_id, actionIdSuffix),
            action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER",
            action_data: {
                target: "APP",
                placeholder: options.placeholder,
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: wrapperIdSuffix,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Surface a structured send-error state with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Send-error payload plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setSendError(options) {
        const actionIdSuffix = options.action_id_suffix
            ? `set-send-error-${options.action_id_suffix}`
            : "set-send-error";
        const wrapperIdSuffix = `${actionIdSuffix}-wrapper`;
        const actionData = {
            target: "APP",
            error_kind: options.error_kind,
            message: options.message,
            ...(options.recovery_hints
                ? { recovery_hints: options.recovery_hints }
                : {}),
            ...(options.diagnostics ? { diagnostics: options.diagnostics } : {}),
        };
        const action = {
            action_id: ProtocolIdUtils.generateActionId(this.message.message_id, actionIdSuffix),
            action_type: "APP_ACTION_SET_SEND_ERROR",
            action_data: actionData,
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: wrapperIdSuffix,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Request a thread-list refresh with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Thread-list refresh configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    refreshThreadList(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "thread-refresh"),
            action_type: "APP_ACTION_THREAD_LIST_REFRESH",
            action_data: { target: "APP" },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "thread-refresh"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Send user-preference updates with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Preference update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateUserPreferences(options) {
        const action = {
            action_id: options.action_id ||
                ProtocolIdUtils.generateActionId(this.message.message_id, options.action_id_suffix || "user-preferences"),
            action_type: "APP_ACTION_USER_PREFERENCE_UPDATE",
            action_data: {
                target: "APP",
                preference_updates: options.preferenceUpdates,
            },
        };
        return this.addActionWrapper(omitUndefined({
            content_id_suffix: `${options.action_id_suffix || "user-preferences"}-wrapper`,
            content_queue: options.content_queue,
            content_delay: options.content_delay,
            action,
        }));
    }
    /**
     * Set the message role
     *
     * @param role - Message role (USER, ASSISTANT, SYSTEM)
     * @returns This builder instance for method chaining
     */
    role(role) {
        this.message.message_role = role;
        return this;
    }
    /**
     * Enable debug mode for this message.
     *
     * @warning **PRODUCTION FILTERING: Setting `debug: true` causes the ENTIRE protocol block
     * to be FILTERED OUT in production!**
     *
     * The `filterDebugProtocolBlocks` function in `chat-completion-streaming.ts` removes ALL
     * JSON protocol blocks that contain `"debug": true` from the stream output. This means:
     *
     * - The ENTIRE message (not just a debug field) is stripped from production responses
     * - End users will NEVER see this content when the request is not in debug mode
     * - Only requests with `validatedInputs.debug === true` will receive debug blocks
     *
     * **When to use `debug: true`:**
     * - Internal diagnostics that should be hidden from production users
     * - Developer-only information for debugging purposes
     * - Verbose logging output during development
     * - Temporary debugging content that should not reach end users
     *
     * **When NOT to use `debug: true`:**
     * - Any content that should be visible to production users
     * - User-facing messages, responses, or UI elements
     * - Content that is part of the normal user experience
     *
     * @param debug - Whether to mark this message as debug-only (default: true)
     * @returns This builder instance for method chaining
     *
     * @see filterDebugProtocolBlocks in source/routes/api/chat/helpers/chat-completion-streaming.ts
     */
    debug(debug = true) {
        if (debug) {
            this.message.debug = true;
        }
        else {
            delete this.message.debug;
        }
        return this;
    }
    /**
     * Clear all contents from the message
     *
     * @returns This builder instance for method chaining
     */
    clearContents() {
        this.message.message_contents = [];
        return this;
    }
    /**
     * Surfaces the CHAT_MESSAGE `message_id` this builder forwards into nested builders for correlated IDs.
     *
     * @returns Caller-defined identifier reused as the auto-ID prefix context for attached protocol children.
     */
    getMessageId() {
        return this.message.message_id;
    }
    /**
     * Surfaces the transcript role (`message_role`) wire value for this in-flight CHAT_MESSAGE.
     *
     * @returns Protocol role literal for the speaker; matches construction input and otherwise defaults to `ASSISTANT`.
     */
    getRole() {
        return this.message.message_role;
    }
    /**
     * Get the number of contents
     *
     * @returns Number of content objects in the message
     */
    getContentCount() {
        return this.message.message_contents.length;
    }
    /**
     * Check if message has any contents
     *
     * @returns True if message has at least one content object
     */
    hasContents() {
        return this.message.message_contents.length > 0;
    }
    /**
     * Check if debug mode is enabled
     *
     * @returns True if debug information is included
     */
    isDebugEnabled() {
        return !!this.message.debug;
    }
    /**
     * Sets content_delay on the most recently added content item.
     * This is used when migrating from message-level delays to content-level delays.
     *
     * @param ms - Delay in milliseconds (must be > 0)
     * @returns This builder instance for method chaining
     *
     * @example
     * ```typescript
     * builder
     *   .addMarkdown({ content_queue: "main", content_id_suffix: "intro", markdown: "Hello" })
     *   .addMarkdown({ content_queue: "main", content_id_suffix: "body", markdown: "Content here" })
     *   .contentDelayLastContent(1000)  // Applies 1000ms delay to "body" content
     *   .build();
     * ```
     */
    contentDelayLastContent(ms) {
        const contents = this.message.message_contents;
        if (!contents || contents.length === 0) {
            return this;
        }
        if (ms <= 0) {
            return this;
        }
        const lastContent = contents[contents.length - 1];
        if (!lastContent) {
            return this;
        }
        const existingDelay = typeof lastContent.content_delay === "number"
            ? lastContent.content_delay
            : 0;
        lastContent.content_delay = existingDelay + ms;
        return this;
    }
    /**
     * Build and return the final chat message object
     *
     * @returns Immutable copy of the configured chat message
     */
    build() {
        return { ...this.message };
    }
}
//# sourceMappingURL=chat-message.js.map