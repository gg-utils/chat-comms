/**
 * @fileoverview Builds CHAT_CONTENT_PROGRESS_BAR payloads for initial progress UI before follow-up update actions stream in.
 *
 * Defaults come from PROGRESS_BAR_DEFAULTS; percentage clamping and explicit state rules mirror CHAT_ACTION_UPDATE_PROGRESS_BAR.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_ProgressBarContentBuilder } from "./progress-bar.js";
 *
 * const content = new CommunicationProtocol_ProgressBarContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "setup-bar",
 *   progress_bar_message: "Preparing workspace…",
 *   progress_bar_current_percentage: 10,
 *   progress_bar_state: "IN_PROGRESS",
 *   message_id: "msg-90",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_PROGRESS_BAR.md - progress bar content contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_ProgressBarContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_ChatContent } from "../../types/chat.js";
import type { ContentWidth, ProgressBarState, ProgressBarVisibilityState } from "../../types/common.js";
/**
 * Fluent builder for CHAT_CONTENT_PROGRESS_BAR with auto-ID support.
 *
 * @remarks
 * Merges caller options with PROGRESS_BAR_DEFAULTS; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ProgressBarContentBuilder({ autoId: "p", message: "Wait", message_id: "m" }).build()`
 */
export declare class CommunicationProtocol_ProgressBarContentBuilder {
    private content;
    /**
     * Initialize the progress bar content builder
     *
     * @param options - Configuration options for the progress bar content
     */
    constructor(options: CommunicationProtocol_ProgressBarContentOptions);
    /**
     * Set progress bar state (IN_PROGRESS, COMPLETED)
     *
     * @param state - Progress bar state
     * @returns This builder instance for method chaining
     */
    state(state: ProgressBarState): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set current percentage (0-100)
     *
     * @param percentage - Current progress percentage
     * @returns This builder instance for method chaining
     */
    progress_bar_current_percentage(percentage: number): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set progress bar message
     *
     * @param message - Progress message to display
     * @returns This builder instance for method chaining
     */
    message(message: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set next goal percentage (0-100)
     *
     * @param percentage - Target percentage for next goal
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_percentage(percentage: number): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set progress bar visibility state
     *
     * @param visibility - Visibility state (VISIBLE or HIDDEN)
     * @returns This builder instance for method chaining
     */
    visibility(visibility: ProgressBarVisibilityState): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set current animation duration in milliseconds
     *
     * @param durationMs - Animation duration for current percentage change
     * @returns This builder instance for method chaining
     */
    progress_bar_current_animation_duration_ms(durationMs: number): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set delay before next goal animation in milliseconds
     *
     * @param delayMs - Delay before starting next goal animation
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_delay_ms(delayMs: number): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set next goal animation duration in milliseconds
     *
     * @param durationMs - Animation duration for next goal percentage change
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_animation_duration_ms(durationMs: number): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set progress bar icon
     *
     * @param icon - Icon to display (emoji or text)
     * @returns This builder instance for method chaining
     */
    icon(icon: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Remove progress bar icon
     *
     * @returns This builder instance for method chaining
     */
    removeIcon(): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width: ContentWidth): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Mark progress as completed (sets state to COMPLETED and percentage to 100)
     *
     * @param completionMessage - Optional message to show on completion
     * @returns This builder instance for method chaining
     */
    complete(completionMessage?: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Mark progress as failed (sets state to ERROR)
     *
     * @param errorMessage - Optional error message to display
     * @returns This builder instance for method chaining
     */
    error(errorMessage?: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Pause progress (sets state to PAUSED)
     *
     * @param pauseMessage - Optional message to show when paused
     * @returns This builder instance for method chaining
     */
    pause(pauseMessage?: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Cancel progress (sets state to CANCELLED)
     *
     * @param cancelMessage - Optional message to show when cancelled
     * @returns This builder instance for method chaining
     */
    cancel(cancelMessage?: string): CommunicationProtocol_ProgressBarContentBuilder;
    /**
     * Get current progress percentage
     *
     * @returns Current progress percentage (0-100)
     */
    getCurrentPercentage(): number;
    /**
     * Get current progress state
     *
     * @returns Current progress state
     */
    getCurrentState(): string;
    /**
     * Get current progress message
     *
     * @returns Current progress message
     */
    getCurrentMessage(): string;
    /**
     * Check if progress is complete
     *
     * @returns True if state is COMPLETED or percentage is 100
     */
    isComplete(): boolean;
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build(): CommunicationProtocol_ChatContent;
}
//# sourceMappingURL=progress-bar.d.ts.map