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
import type { CommunicationProtocol_ActionableCardsOptions, CommunicationProtocol_ActionableChipsOptions, CommunicationProtocol_ActionWrapperContentOptions, CommunicationProtocol_ButtonContentOptions, CommunicationProtocol_ChatMessageOptions, CommunicationProtocol_MarkdownContentOptions, CommunicationProtocol_PanelContentOptions, CommunicationProtocol_ProgressBarContentOptions, CommunicationProtocol_SendTextMessageActionOptions, CommunicationProtocol_UpdatePanelActionOptions, CommunicationProtocol_UpdateProgressBarActionOptions } from "../options/index.js";
import type { CommunicationProtocol_ChatContent, CommunicationProtocol_ChatMessage } from "../types/chat.js";
import type { MessageRole, ProgressBarState, ProgressBarVisibilityState } from "../types/common.js";
/**
 * Structural legacy options for update panel compatibility.
 * Mirrors the deprecated Prompting_PromptBuilder type without importing it,
 * preventing deprecation lint warnings while preserving behavior.
 */
interface CommunicationProtocol_LegacyUpdatePanelActionOptionsCompat {
    action_id?: string;
    action_id_suffix?: string;
    content_id: string;
    content_queue: string;
    panel_header_icon?: string;
    panel_header_favicon_url?: string;
    panel_header_title?: string;
    panel_header_description?: string;
    panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED";
    panel_body_type?: string;
    panel_body_aspect_ratio?: string;
    panel_body_data?: unknown;
    panel_transitions?: unknown;
    panel_effects?: unknown;
    message_id?: string;
}
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
export declare class CommunicationProtocol_Builder {
    /**
     * Create a new chat message with auto-ID context
     *
     * @param options - Chat message configuration options
     * @returns CommunicationProtocol_ChatMessageBuilder instance for fluent configuration
     */
    static chatMessage(options: CommunicationProtocol_ChatMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create markdown content with auto-ID support
     *
     * @param options - Markdown content configuration options
     * @returns CommunicationProtocol_MarkdownContentBuilder instance for fluent configuration
     */
    static markdownContent(options: CommunicationProtocol_MarkdownContentOptions): CommunicationProtocol_MarkdownContentBuilder;
    /**
     * Create actionable cards content with auto-ID support
     *
     * @param options - Actionable cards configuration options
     * @returns CommunicationProtocol_ActionableCardsContentBuilder instance for fluent configuration
     */
    static actionableCardsContent(options: CommunicationProtocol_ActionableCardsOptions): CommunicationProtocol_ActionableCardsContentBuilder;
    /**
     * Create actionable chips content with auto-ID support
     *
     * @param options - Actionable chips configuration options
     * @returns CommunicationProtocol_ActionableChipsContentBuilder instance for fluent configuration
     */
    static actionableChipsContent(options: CommunicationProtocol_ActionableChipsOptions): CommunicationProtocol_ActionableChipsContentBuilder;
    /**
     * Create button content with auto-ID support
     *
     * @param options - Button content configuration options
     * @returns CommunicationProtocol_ButtonContentBuilder instance for fluent configuration
     */
    static buttonContent(options: CommunicationProtocol_ButtonContentOptions): CommunicationProtocol_ButtonContentBuilder;
    /**
     * Create progress bar content with auto-ID support
     *
     * @param options - Progress bar content configuration options
     * @returns CommunicationProtocol_ProgressBarContentBuilder instance for fluent configuration
     */
    static progressBarContent(options: CommunicationProtocol_ProgressBarContentOptions): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Create action wrapper content with auto-ID support
     *
     * @param options - Action wrapper content configuration options
     * @returns CommunicationProtocol_ActionWrapperContentBuilder instance for fluent configuration
     */
    static actionWrapperContent(options: CommunicationProtocol_ActionWrapperContentOptions): CommunicationProtocol_ActionWrapperContentBuilder;
    /**
     * Create panel content with auto-ID support
     *
     * @param options - Panel content configuration options
     * @returns CommunicationProtocol_PanelContentBuilder instance for fluent configuration
     */
    static panelContent(options: CommunicationProtocol_PanelContentOptions): CommunicationProtocol_PanelContentBuilder;
    /**
     * Create send text message action with auto-ID support
     *
     * @param options - Send text message action configuration options
     * @returns CommunicationProtocol_SendTextMessageActionBuilder instance for fluent configuration
     */
    static sendTextMessageAction(options: CommunicationProtocol_SendTextMessageActionOptions): CommunicationProtocol_SendTextMessageActionBuilder;
    /**
     * Create update progress bar action with auto-ID support
     *
     * @param options - Update progress bar action configuration options
     * @returns CommunicationProtocol_UpdateProgressBarActionBuilder instance for fluent configuration
     */
    static updateProgressBarAction(options: CommunicationProtocol_UpdateProgressBarActionOptions): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Create update panel action with auto-ID support
     *
     * @param options - Update panel action configuration options
     * @returns CommunicationProtocol_UpdatePanelActionBuilder instance for fluent configuration
     */
    static updatePanelAction(options: CommunicationProtocol_UpdatePanelActionOptions): CommunicationProtocol_UpdatePanelActionBuilder;
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
    static updatePanelActionCompat(options: CommunicationProtocol_UpdatePanelActionOptions | CommunicationProtocol_LegacyUpdatePanelActionOptionsCompat): CommunicationProtocol_UpdatePanelActionBuilder;
    /**
     * Type guard for PanelBodyType string values
     */
    private static isPanelBodyType;
    /**
     * Type guard to verify an unknown value is a CommunicationProtocol_PanelTransition array
     */
    private static isPanelTransitionArray;
    /**
     * Type guard to verify an unknown value is a CommunicationProtocol_PanelEffect array
     */
    private static isPanelEffectArray;
    /**
     * Convert a message to JSON string with proper formatting
     *
     * @param message - The chat message to convert to JSON
     * @returns Formatted JSON string
     */
    static toJsonString(message: CommunicationProtocol_ChatMessage): string;
    /**
     * Create a JSON code block for prompts
     *
     * @param message - The chat message to convert to a JSON code block
     * @returns Markdown-formatted JSON code block
     */
    static toJsonBlock(message: CommunicationProtocol_ChatMessage): string;
    /**
     * Create a complete progress bar update message
     * This creates a message with an action wrapper containing a progress bar update action
     *
     * @param options - Progress bar update message configuration
     * @returns CommunicationProtocol_ChatMessageBuilder instance with progress bar update configured
     */
    static createProgressBarUpdateMessage(options: {
        message_id: string;
        content_queue: string;
        message_role?: MessageRole;
        progress_bar_content_id: string;
        progress_bar_state?: ProgressBarState;
        progress_bar_visibility?: ProgressBarVisibilityState;
        progress_bar_current_percentage?: number;
        progress_bar_current_animation_duration_ms?: number;
        progress_bar_next_goal_delay_ms?: number;
        progress_bar_next_goal_percentage?: number;
        progress_bar_next_goal_animation_duration_ms?: number;
        progress_bar_message?: string;
        progress_bar_icon?: string;
        debug?: boolean;
    }): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create a simple progress bar update action wrapper content
     *
     * @param options - Progress bar update content configuration
     * @returns CommunicationProtocol_ChatContent with progress bar update action wrapped
     */
    static createProgressBarUpdateContent(options: {
        message_id: string;
        content_queue: string;
        progress_bar_content_id: string;
        progress_bar_state?: ProgressBarState;
        progress_bar_visibility?: ProgressBarVisibilityState;
        progress_bar_current_percentage?: number;
        progress_bar_current_animation_duration_ms?: number;
        progress_bar_next_goal_delay_ms?: number;
        progress_bar_next_goal_percentage?: number;
        progress_bar_next_goal_animation_duration_ms?: number;
        progress_bar_message?: string;
        progress_bar_icon?: string;
    }): CommunicationProtocol_ChatContent;
    /**
     * Quick method to create a simple markdown message
     *
     * @param messageId - Identifier recorded on the chat message and echoed in nested content for correlation in the protocol stream.
     * @param markdown - Markdown content
     * @param role - Message role (default: "ASSISTANT")
     * @returns Complete CommunicationProtocol_ChatMessage with markdown content
     */
    static createMarkdownMessage(messageId: string, markdown: string, content_queue: string, role?: MessageRole): CommunicationProtocol_ChatMessage;
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
    static createProgressBarMessage(messageId: string, progress_bar_message: string, progress_bar_current_percentage: number, content_queue: string, progress_bar_state?: ProgressBarState, message_role?: MessageRole): CommunicationProtocol_ChatMessage;
    /**
     * Quick method to create a message with actionable cards
     *
     * @param message_id - Message ID
     * @param cards - Array of card options
     * @param message_role - Message role (default: "ASSISTANT")
     * @returns Complete CommunicationProtocol_ChatMessage with actionable cards content
     */
    static createCardsMessage(message_id: string, cards: Array<{
        title: string;
        subtitle: string;
        value: string;
    }>, content_queue: string, message_role?: MessageRole): CommunicationProtocol_ChatMessage;
    /**
     * Create update button action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static updateButtonAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "CHAT_ACTION";
            action_subtype: "UPDATE_BUTTON";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create canvas open action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasOpenAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "CANVAS_ACTION";
            action_subtype: "OPEN";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create canvas update action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasUpdateAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "CANVAS_ACTION";
            action_subtype: "UPDATE";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create canvas close action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static canvasCloseAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "CANVAS_ACTION";
            action_subtype: "CLOSE";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create set theme action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static setThemeAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "APP_ACTION";
            action_subtype: "SET_THEME";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create thread list refresh action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static threadListRefreshAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "APP_ACTION";
            action_subtype: "THREAD_LIST_REFRESH";
            action_id: string;
            [key: string]: unknown;
        };
    };
    /**
     * Create user preference update action (compatibility method)
     * @deprecated This method provides basic compatibility during migration
     *
     * TODO: Replace with a strongly typed builder and remove this shim once
     * migration off legacy prompt builder flows is complete.
     */
    static userPreferenceUpdateAction(options: {
        action_id?: string;
        [key: string]: unknown;
    }): {
        build(): {
            action_type: "APP_ACTION";
            action_subtype: "USER_PREFERENCE_UPDATE";
            action_id: string;
            [key: string]: unknown;
        };
    };
}
export default CommunicationProtocol_Builder;
//# sourceMappingURL=communication-protocol-builder.d.ts.map