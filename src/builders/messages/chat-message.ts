import { omitUndefined } from "../../omit-undefined.js";
/**
 * @fileoverview Builds CHAT_MESSAGE structures by composing chat content builders with shared ProtocolIdUtils context.
 *
 * Prefer `CommunicationProtocol_Builder` facades for one-liners; use this class when you need fine-grained sequencing, delays, or mixed content stacks.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ChatMessageBuilder } from "./chat-message.js";
 *
 * const message = new CommunicationProtocol_ChatMessageBuilder({
 *   message_id: "msg-400",
 *   message_role: "ASSISTANT",
 * })
 *   .addMarkdown({
 *     content_queue: "main",
 *     content_id_suffix: "intro",
 *     markdown: "# Pick next step",
 *   })
 *   .build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_MESSAGE.md - CHAT_MESSAGE contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

import type {
  CommunicationProtocol_CanvasCloseMessageOptions,
  CommunicationProtocol_CanvasOpenMessageOptions,
  CommunicationProtocol_CanvasUpdateMessageOptions,
  CommunicationProtocol_CoreConsoleActionOptions,
  CommunicationProtocol_SetInputPlaceholderMessageOptions,
  CommunicationProtocol_SetSendErrorMessageOptions,
  CommunicationProtocol_SetThemeMessageOptions,
  CommunicationProtocol_ThreadListRefreshMessageOptions,
  CommunicationProtocol_UpdateButtonMessageOptions,
  CommunicationProtocol_UpdatePanelMessageOptions,
  CommunicationProtocol_UpdateProgressBarOptions,
  CommunicationProtocol_UserPreferenceUpdateMessageOptions,
} from "../../options/action-options.js";
import type {
  CommunicationProtocol_ActionWrapperContentOptions,
  CommunicationProtocol_AddActionableCardsOptions,
  CommunicationProtocol_AddActionableChipsOptions,
  CommunicationProtocol_ButtonContentOptions,
  CommunicationProtocol_MarkdownContentOptions,
  CommunicationProtocol_PanelContentOptions,
  CommunicationProtocol_ProgressBarContentOptions,
} from "../../options/content-options.js";
import type { CommunicationProtocol_ChatMessageOptions } from "../../options/message-options.js";
import type {
  CommunicationProtocol_AppAction,
  CommunicationProtocol_SetSendErrorActionData,
} from "../../types/app.js";
import type { CommunicationProtocol_CanvasAction } from "../../types/canvas.js";
import type {
  CommunicationProtocol_ChatAction,
  CommunicationProtocol_ChatContent,
  CommunicationProtocol_ChatMessage,
} from "../../types/chat.js";
import type { MessageRole } from "../../types/common.js";
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
  private message: CommunicationProtocol_ChatMessage;

  /**
   * Initialize the chat message builder
   *
   * @param options - Configuration options for the chat message
   */
  constructor(options: CommunicationProtocol_ChatMessageOptions) {
    const {
      message_id: messageId,
      message_role: role = "ASSISTANT",
      contents = [],
      debug = false,
    } = options;

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
  addContent(
    content: CommunicationProtocol_ChatContent,
  ): CommunicationProtocol_ChatMessageBuilder {
    this.message.message_contents.push(content);
    return this;
  }

  /**
   * Add multiple contents to the message
   *
   * @param contents - Array of chat contents to add
   * @returns This builder instance for method chaining
   */
  addContents(
    contents: CommunicationProtocol_ChatContent[],
  ): CommunicationProtocol_ChatMessageBuilder {
    this.message.message_contents.push(...contents);
    return this;
  }

  /**
   * Create and add markdown content with auto-ID support
   *
   * @param options - Markdown content configuration options
   * @returns This builder instance for method chaining
   */
  addMarkdown(
    options: Omit<CommunicationProtocol_MarkdownContentOptions, "message_id">,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  addActionableCards(
    options: CommunicationProtocol_AddActionableCardsOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const {
      content_id_suffix,
      actionable_cards_items,
      actionable_cards_selection_mode:
        actionable_cards_selection_mode = "SINGLE",
      actionable_cards_selection_state:
        actionable_cards_selection_state = "PENDING_SELECTION",
      content_delay,
      content_queue,
    } = options;

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
  addActionableChips(
    options: CommunicationProtocol_AddActionableChipsOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const {
      content_id_suffix,
      actionable_chips_items: chips,
      actionable_chips_selection_mode:
        actionable_chips_selection_mode = "SINGLE",
      actionable_chips_selection_state:
        actionable_chips_selection_state = "PENDING_SELECTION",
      content_delay,
      content_queue,
    } = options;

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
  addButton(
    options: Omit<CommunicationProtocol_ButtonContentOptions, "message_id">,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  addProgressBar(
    options: Omit<
      CommunicationProtocol_ProgressBarContentOptions,
      "message_id"
    >,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  addActionWrapper(
    options: Omit<
      CommunicationProtocol_ActionWrapperContentOptions,
      "message_id"
    >,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  addPanel(
    options: Omit<CommunicationProtocol_PanelContentOptions, "message_id">,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  updateProgressBar(
    options: CommunicationProtocol_UpdateProgressBarOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const {
      content_id_suffix: autoId = "progress-update",
      content_id,
      targetAutoId,
      content_queue,
      content_delay,
      progress_bar_state: state,
      progress_bar_visibility: visibility,
      progress_bar_current_percentage,
      progress_bar_current_animation_duration_ms,
      progress_bar_next_goal_delay_ms,
      progress_bar_next_goal_percentage,
      progress_bar_next_goal_animation_duration_ms,
      progress_bar_message: message,
      progress_bar_icon: icon,
    } = options;

    const updateAction =
      new CommunicationProtocol_UpdateProgressBarActionBuilder(omitUndefined({
        content_id_suffix: autoId,
        content_id:
          content_id ||
          ProtocolIdUtils.generateContentId(
            this.message.message_id,
            targetAutoId || autoId,
          ),
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
  updateButton(
    options: CommunicationProtocol_UpdateButtonMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_ChatAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "button-update",
        ),
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
  updatePanel(
    options: CommunicationProtocol_UpdatePanelMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
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
  openCanvas(
    options: CommunicationProtocol_CanvasOpenMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_CanvasAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "canvas-open",
        ),
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
  updateCanvas(
    options: CommunicationProtocol_CanvasUpdateMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_CanvasAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "canvas-update",
        ),
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
  closeCanvas(
    options: CommunicationProtocol_CanvasCloseMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_CanvasAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "canvas-close",
        ),
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
  setTheme(
    options: CommunicationProtocol_SetThemeMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_AppAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "set-theme",
        ),
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
  coreConsole(
    options: CommunicationProtocol_CoreConsoleActionOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_AppAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "core-console",
        ),
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
  setInputPlaceholder(
    options: CommunicationProtocol_SetInputPlaceholderMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const actionIdSuffix = options.action_id_suffix
      ? `set-input-placeholder-${options.action_id_suffix}`
      : "set-input-placeholder";
    const wrapperIdSuffix = `${actionIdSuffix}-wrapper`;
    const action: CommunicationProtocol_AppAction = {
      action_id: ProtocolIdUtils.generateActionId(
        this.message.message_id,
        actionIdSuffix,
      ),
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
  setSendError(
    options: CommunicationProtocol_SetSendErrorMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const actionIdSuffix = options.action_id_suffix
      ? `set-send-error-${options.action_id_suffix}`
      : "set-send-error";
    const wrapperIdSuffix = `${actionIdSuffix}-wrapper`;
    const actionData: CommunicationProtocol_SetSendErrorActionData = {
      target: "APP",
      error_kind: options.error_kind,
      message: options.message,
      ...(options.recovery_hints
        ? { recovery_hints: options.recovery_hints }
        : {}),
      ...(options.diagnostics ? { diagnostics: options.diagnostics } : {}),
    };
    const action: CommunicationProtocol_AppAction = {
      action_id: ProtocolIdUtils.generateActionId(
        this.message.message_id,
        actionIdSuffix,
      ),
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
  refreshThreadList(
    options: CommunicationProtocol_ThreadListRefreshMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_AppAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "thread-refresh",
        ),
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
  updateUserPreferences(
    options: CommunicationProtocol_UserPreferenceUpdateMessageOptions,
  ): CommunicationProtocol_ChatMessageBuilder {
    const action: CommunicationProtocol_AppAction = {
      action_id:
        options.action_id ||
        ProtocolIdUtils.generateActionId(
          this.message.message_id,
          options.action_id_suffix || "user-preferences",
        ),
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
  role(role: MessageRole): CommunicationProtocol_ChatMessageBuilder {
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
  debug(debug: boolean = true): CommunicationProtocol_ChatMessageBuilder {
    if (debug) {
      this.message.debug = true;
    } else {
      delete this.message.debug;
    }
    return this;
  }

  /**
   * Clear all contents from the message
   *
   * @returns This builder instance for method chaining
   */
  clearContents(): CommunicationProtocol_ChatMessageBuilder {
    this.message.message_contents = [];
    return this;
  }

  /**
   * Surfaces the CHAT_MESSAGE `message_id` this builder forwards into nested builders for correlated IDs.
   *
   * @returns Caller-defined identifier reused as the auto-ID prefix context for attached protocol children.
   */
  getMessageId(): string {
    return this.message.message_id;
  }

  /**
   * Surfaces the transcript role (`message_role`) wire value for this in-flight CHAT_MESSAGE.
   *
   * @returns Protocol role literal for the speaker; matches construction input and otherwise defaults to `ASSISTANT`.
   */
  getRole(): string {
    return this.message.message_role;
  }

  /**
   * Get the number of contents
   *
   * @returns Number of content objects in the message
   */
  getContentCount(): number {
    return this.message.message_contents.length;
  }

  /**
   * Check if message has any contents
   *
   * @returns True if message has at least one content object
   */
  hasContents(): boolean {
    return this.message.message_contents.length > 0;
  }

  /**
   * Check if debug mode is enabled
   *
   * @returns True if debug information is included
   */
  isDebugEnabled(): boolean {
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
  contentDelayLastContent(
    ms: number,
  ): CommunicationProtocol_ChatMessageBuilder {
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
    const existingDelay =
      typeof lastContent.content_delay === "number"
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
  build(): CommunicationProtocol_ChatMessage {
    return { ...this.message };
  }
}
