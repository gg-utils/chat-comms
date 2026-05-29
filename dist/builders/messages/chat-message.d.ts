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
import type { CommunicationProtocol_CanvasCloseMessageOptions, CommunicationProtocol_CanvasOpenMessageOptions, CommunicationProtocol_CanvasUpdateMessageOptions, CommunicationProtocol_CoreConsoleActionOptions, CommunicationProtocol_SetInputPlaceholderMessageOptions, CommunicationProtocol_SetSendErrorMessageOptions, CommunicationProtocol_SetThemeMessageOptions, CommunicationProtocol_ThreadListRefreshMessageOptions, CommunicationProtocol_UpdateButtonMessageOptions, CommunicationProtocol_UpdatePanelMessageOptions, CommunicationProtocol_UpdateProgressBarOptions, CommunicationProtocol_UserPreferenceUpdateMessageOptions } from "../../options/action-options.js";
import type { CommunicationProtocol_ActionWrapperContentOptions, CommunicationProtocol_AddActionableCardsOptions, CommunicationProtocol_AddActionableChipsOptions, CommunicationProtocol_ButtonContentOptions, CommunicationProtocol_MarkdownContentOptions, CommunicationProtocol_PanelContentOptions, CommunicationProtocol_ProgressBarContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatMessageOptions } from "../../options/message-options.js";
import type { CommunicationProtocol_ChatContent, CommunicationProtocol_ChatMessage } from "../../types/chat.js";
import type { MessageRole } from "../../types/common.js";
/**
 * Fluent orchestrator for CHAT_MESSAGE assembly with auto-ID context passing.
 *
 * @remarks
 * Mutates an internal `CommunicationProtocol_ChatMessage`; `add*` helpers forward `message_id` into nested builders when omitted.
 *
 * @example
 * `new CommunicationProtocol_ChatMessageBuilder({ message_id: "m", message_role: "ASSISTANT" }).build()`
 */
export declare class CommunicationProtocol_ChatMessageBuilder {
    private message;
    /**
     * Initialize the chat message builder
     *
     * @param options - Configuration options for the chat message
     */
    constructor(options: CommunicationProtocol_ChatMessageOptions);
    /**
     * Add content to the message
     *
     * @param content - Chat content to add
     * @returns This builder instance for method chaining
     */
    addContent(content: CommunicationProtocol_ChatContent): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Add multiple contents to the message
     *
     * @param contents - Array of chat contents to add
     * @returns This builder instance for method chaining
     */
    addContents(contents: CommunicationProtocol_ChatContent[]): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add markdown content with auto-ID support
     *
     * @param options - Markdown content configuration options
     * @returns This builder instance for method chaining
     */
    addMarkdown(options: Omit<CommunicationProtocol_MarkdownContentOptions, "message_id">): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add actionable cards content with direct cards array
     *
     * @param options - Actionable cards configuration options
     * @returns This builder instance for method chaining
     */
    addActionableCards(options: CommunicationProtocol_AddActionableCardsOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add actionable chips content with direct chips array
     *
     * @param options - Actionable chips configuration options
     * @returns This builder instance for method chaining
     */
    addActionableChips(options: CommunicationProtocol_AddActionableChipsOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add button content with auto-ID support
     *
     * @param options - Button content configuration options
     * @returns This builder instance for method chaining
     */
    addButton(options: Omit<CommunicationProtocol_ButtonContentOptions, "message_id">): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add progress bar content with auto-ID support
     *
     * @param options - Progress bar content configuration options
     * @returns This builder instance for method chaining
     */
    addProgressBar(options: Omit<CommunicationProtocol_ProgressBarContentOptions, "message_id">): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add action wrapper content with auto-ID support
     *
     * @param options - Action wrapper content configuration options
     * @returns This builder instance for method chaining
     */
    addActionWrapper(options: Omit<CommunicationProtocol_ActionWrapperContentOptions, "message_id">): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Create and add panel content with auto-ID support
     *
     * @param options - Panel content configuration options
     * @returns This builder instance for method chaining
     */
    addPanel(options: Omit<CommunicationProtocol_PanelContentOptions, "message_id">): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Update an existing progress bar with auto-ID support (shortcut for action wrapper)
     *
     * @param options - Progress bar update configuration options
     * @returns This builder instance for method chaining
     */
    updateProgressBar(options: CommunicationProtocol_UpdateProgressBarOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Update an existing button with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Button update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateButton(options: CommunicationProtocol_UpdateButtonMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Update an existing panel with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Panel update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updatePanel(options: CommunicationProtocol_UpdatePanelMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Open or focus a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas open configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    openCanvas(options: CommunicationProtocol_CanvasOpenMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Update a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateCanvas(options: CommunicationProtocol_CanvasUpdateMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Close a canvas workspace with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Canvas close configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    closeCanvas(options: CommunicationProtocol_CanvasCloseMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Set the consumer app theme with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Theme configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setTheme(options: CommunicationProtocol_SetThemeMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Stream a diagnostic line to consumer developer consoles (shortcut for action wrapper).
     *
     * @param options - Core console payload plus queue placement.
     * @returns This builder instance for method chaining.
     */
    coreConsole(options: CommunicationProtocol_CoreConsoleActionOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Set the chat input placeholder with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Placeholder configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setInputPlaceholder(options: CommunicationProtocol_SetInputPlaceholderMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Surface a structured send-error state with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Send-error payload plus queue placement.
     * @returns This builder instance for method chaining.
     */
    setSendError(options: CommunicationProtocol_SetSendErrorMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Request a thread-list refresh with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Thread-list refresh configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    refreshThreadList(options: CommunicationProtocol_ThreadListRefreshMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Send user-preference updates with auto-ID support (shortcut for action wrapper).
     *
     * @param options - Preference update configuration plus queue placement.
     * @returns This builder instance for method chaining.
     */
    updateUserPreferences(options: CommunicationProtocol_UserPreferenceUpdateMessageOptions): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Set the message role
     *
     * @param role - Message role (USER, ASSISTANT, SYSTEM)
     * @returns This builder instance for method chaining
     */
    role(role: MessageRole): CommunicationProtocol_ChatMessageBuilder;
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
    debug(debug?: boolean): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Clear all contents from the message
     *
     * @returns This builder instance for method chaining
     */
    clearContents(): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Surfaces the CHAT_MESSAGE `message_id` this builder forwards into nested builders for correlated IDs.
     *
     * @returns Caller-defined identifier reused as the auto-ID prefix context for attached protocol children.
     */
    getMessageId(): string;
    /**
     * Surfaces the transcript role (`message_role`) wire value for this in-flight CHAT_MESSAGE.
     *
     * @returns Protocol role literal for the speaker; matches construction input and otherwise defaults to `ASSISTANT`.
     */
    getRole(): string;
    /**
     * Get the number of contents
     *
     * @returns Number of content objects in the message
     */
    getContentCount(): number;
    /**
     * Check if message has any contents
     *
     * @returns True if message has at least one content object
     */
    hasContents(): boolean;
    /**
     * Check if debug mode is enabled
     *
     * @returns True if debug information is included
     */
    isDebugEnabled(): boolean;
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
    contentDelayLastContent(ms: number): CommunicationProtocol_ChatMessageBuilder;
    /**
     * Build and return the final chat message object
     *
     * @returns Immutable copy of the configured chat message
     */
    build(): CommunicationProtocol_ChatMessage;
}
//# sourceMappingURL=chat-message.d.ts.map