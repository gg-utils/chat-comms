/**
 * @fileoverview Builds CHAT_ACTION_UPDATE_PROGRESS_BAR payloads to update an existing progress bar (percentage, state, visibility, messaging, animation timing).
 *
 * Percentage clamping runs in fluent setters; completion state is never inferred from percentage alone—callers set `state` explicitly when needed.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_UpdateProgressBarActionBuilder } from "./update-progress-bar.js";
 *
 * const action = new CommunicationProtocol_UpdateProgressBarActionBuilder({
 *   autoId: "pb-step",
 *   content_id: "progress-setup",
 *   progress_bar_current_percentage: 40,
 *   state: "IN_PROGRESS",
 *   message_id: "msg-77",
 * }).build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md - update progress bar contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_UpdateProgressBarActionOptions } from "../../../options/action-options.js";
import type { CommunicationProtocol_ChatAction } from "../../../types/chat.js";
import type { ProgressBarState, ProgressBarVisibilityState } from "../../../types/common.js";
/**
 * Fluent builder for CHAT_ACTION_UPDATE_PROGRESS_BAR with auto-ID support.
 *
 * @remarks
 * Clamps percentages to 0–100; omits unset optional fields from `action_data`; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_UpdateProgressBarActionBuilder({ autoId: "p", content_id: "c", message_id: "m" }).progress_bar_current_percentage(50).build()`
 */
export declare class CommunicationProtocol_UpdateProgressBarActionBuilder {
    private action;
    /**
     * Initialize the update progress bar action builder
     *
     * @param options - Configuration options for the update progress bar action
     */
    constructor(options: CommunicationProtocol_UpdateProgressBarActionOptions);
    /**
     * Set progress bar state (IN_PROGRESS, COMPLETED)
     *
     * @param state - New progress bar state
     * @returns This builder instance for method chaining
     */
    state(state: ProgressBarState): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set current percentage (0-100)
     *
     * @param percentage - Current progress percentage
     * @returns This builder instance for method chaining
     */
    progress_bar_current_percentage(percentage: number): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set next goal percentage (0-100)
     *
     * @param percentage - Target percentage for next goal
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_percentage(percentage: number): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set progress bar visibility state
     *
     * @param visibility - Visibility state (VISIBLE or HIDDEN)
     * @returns This builder instance for method chaining
     */
    visibility(visibility: ProgressBarVisibilityState): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set current animation duration in milliseconds
     *
     * @param durationMs - Animation duration for current percentage change
     * @returns This builder instance for method chaining
     */
    progress_bar_current_animation_duration_ms(durationMs: number): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set delay before next goal animation in milliseconds
     *
     * @param delayMs - Delay before starting next goal animation
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_delay_ms(delayMs: number): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set next goal animation duration in milliseconds
     *
     * @param durationMs - Animation duration for next goal percentage change
     * @returns This builder instance for method chaining
     */
    nextGoalAnimationDurationMs(durationMs: number): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set progress bar message
     *
     * @param message - Progress message to display
     * @returns This builder instance for method chaining
     */
    message(message: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Set progress bar icon
     *
     * @param icon - Icon to display (emoji or text)
     * @returns This builder instance for method chaining
     */
    icon(icon: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Strips the icon field from serialized action data so the UI omits a previously set icon.
     *
     * @returns This builder instance for method chaining
     */
    removeIcon(): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Mark progress as completed (convenience method)
     *
     * @param completionMessage - Optional completion message
     * @returns This builder instance for method chaining
     */
    complete(completionMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Mark progress as failed (convenience method)
     *
     * @param errorMessage - Optional error message
     * @returns This builder instance for method chaining
     */
    error(errorMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Pause progress (convenience method)
     *
     * @param pauseMessage - Optional pause message
     * @returns This builder instance for method chaining
     */
    pause(pauseMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Cancel progress (convenience method)
     *
     * @param cancelMessage - Optional cancellation message
     * @returns This builder instance for method chaining
     */
    cancel(cancelMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder;
    /**
     * Get the target content ID
     *
     * @returns Content ID of the progress bar being updated
     */
    getContentId(): string;
    /**
     * Get current percentage (if set)
     *
     * @returns Current percentage or undefined
     */
    getCurrentPercentage(): number | undefined;
    /**
     * Get current state (if set)
     *
     * @returns Current state or undefined
     */
    getCurrentState(): string | undefined;
    /**
     * Get current message (if set)
     *
     * @returns Current message or undefined
     */
    getCurrentMessage(): string | undefined;
    /**
     * Check if this action will complete the progress
     *
     * @returns True if state is COMPLETED or percentage is 100
     */
    willComplete(): boolean;
    /**
     * Build and return the final chat action object
     *
     * @returns Immutable copy of the configured chat action
     */
    build(): CommunicationProtocol_ChatAction;
}
//# sourceMappingURL=update-progress-bar.d.ts.map