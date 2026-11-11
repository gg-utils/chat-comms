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
import { PROGRESS_BAR_DEFAULTS } from "../../animation/index.js";
import { ProtocolIdUtils } from "../protocol-id-utils.js";
/**
 * Fluent builder for CHAT_CONTENT_PROGRESS_BAR with auto-ID support.
 *
 * @remarks
 * Merges caller options with PROGRESS_BAR_DEFAULTS; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_ProgressBarContentBuilder({ autoId: "p", message: "Wait", message_id: "m" }).build()`
 */
export class CommunicationProtocol_ProgressBarContentBuilder {
    content;
    /**
     * Initialize the progress bar content builder
     *
     * @param options - Configuration options for the progress bar content
     */
    constructor(options) {
        const { progress_bar_state: state, progress_bar_visibility: visibility, progress_bar_current_percentage, progress_bar_current_animation_duration_ms, progress_bar_next_goal_delay_ms, progress_bar_next_goal_percentage, progress_bar_next_goal_animation_duration_ms, progress_bar_message: message, progress_bar_icon: icon, content_width: content_width = "WIDTH_AUTO", content_group_id, content_queue, content_delay, } = options;
        // Use explicit values or defaults, never auto-determine state from percentage
        const resolvedState = state ?? PROGRESS_BAR_DEFAULTS.INCOMPLETE_STATE;
        const resolvedVisibility = visibility ?? PROGRESS_BAR_DEFAULTS.VISIBILITY;
        const resolvedPercentage = progress_bar_current_percentage ?? PROGRESS_BAR_DEFAULTS.DEFAULT_PERCENTAGE;
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CHAT_CONTENT_PROGRESS_BAR",
            content_width,
            ...(content_group_id && { content_group_id }),
            content_queue,
            ...(content_delay && { content_delay }),
            content_data: {
                progress_bar_state: resolvedState,
                progress_bar_visibility: resolvedVisibility,
                progress_bar_current_percentage: resolvedPercentage,
                progress_bar_current_animation_duration_ms: progress_bar_current_animation_duration_ms ?? PROGRESS_BAR_DEFAULTS.ANIMATION_DURATION_MS,
                progress_bar_next_goal_delay_ms: progress_bar_next_goal_delay_ms ?? PROGRESS_BAR_DEFAULTS.NEXT_GOAL_DELAY_MS,
                ...(progress_bar_next_goal_percentage !== undefined && {
                    progress_bar_next_goal_percentage,
                }),
                progress_bar_next_goal_animation_duration_ms: progress_bar_next_goal_animation_duration_ms ??
                    PROGRESS_BAR_DEFAULTS.ANIMATION_DURATION_MS,
                progress_bar_message: message,
                ...(icon !== undefined && { progress_bar_icon: icon }),
            },
        };
    }
    /**
     * Set progress bar state (IN_PROGRESS, COMPLETED)
     *
     * @param state - Progress bar state
     * @returns This builder instance for method chaining
     */
    state(state) {
        this.content.content_data.progress_bar_state = state;
        return this;
    }
    /**
     * Set current percentage (0-100)
     *
     * @param percentage - Current progress percentage
     * @returns This builder instance for method chaining
     */
    progress_bar_current_percentage(percentage) {
        // Clamp percentage to valid range
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        this.content.content_data.progress_bar_current_percentage = clampedPercentage;
        // Note: State is never automatically changed based on percentage
        // State must be explicitly set to "COMPLETED" if desired
        return this;
    }
    /**
     * Set progress bar message
     *
     * @param message - Progress message to display
     * @returns This builder instance for method chaining
     */
    message(message) {
        this.content.content_data.progress_bar_message = message;
        return this;
    }
    /**
     * Set next goal percentage (0-100)
     *
     * @param percentage - Target percentage for next goal
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_percentage(percentage) {
        // Clamp percentage to valid range
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        this.content.content_data.progress_bar_next_goal_percentage = clampedPercentage;
        return this;
    }
    /**
     * Set progress bar visibility state
     *
     * @param visibility - Visibility state (VISIBLE or HIDDEN)
     * @returns This builder instance for method chaining
     */
    visibility(visibility) {
        this.content.content_data.progress_bar_visibility = visibility;
        return this;
    }
    /**
     * Set current animation duration in milliseconds
     *
     * @param durationMs - Animation duration for current percentage change
     * @returns This builder instance for method chaining
     */
    progress_bar_current_animation_duration_ms(durationMs) {
        const validDuration = Math.max(0, durationMs);
        this.content.content_data.progress_bar_current_animation_duration_ms = validDuration;
        return this;
    }
    /**
     * Set delay before next goal animation in milliseconds
     *
     * @param delayMs - Delay before starting next goal animation
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_delay_ms(delayMs) {
        const validDelay = Math.max(0, delayMs);
        this.content.content_data.progress_bar_next_goal_delay_ms = validDelay;
        return this;
    }
    /**
     * Set next goal animation duration in milliseconds
     *
     * @param durationMs - Animation duration for next goal percentage change
     * @returns This builder instance for method chaining
     */
    progress_bar_next_goal_animation_duration_ms(durationMs) {
        const validDuration = Math.max(0, durationMs);
        this.content.content_data.progress_bar_next_goal_animation_duration_ms = validDuration;
        return this;
    }
    /**
     * Set progress bar icon
     *
     * @param icon - Icon to display (emoji or text)
     * @returns This builder instance for method chaining
     */
    icon(icon) {
        this.content.content_data.progress_bar_icon = icon;
        return this;
    }
    /**
     * Remove progress bar icon
     *
     * @returns This builder instance for method chaining
     */
    removeIcon() {
        this.content.content_data = Object.fromEntries(Object.entries(this.content.content_data).filter(([key]) => key !== "progress_bar_icon"));
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
     * Mark progress as completed (sets state to COMPLETED and percentage to 100)
     *
     * @param completionMessage - Optional message to show on completion
     * @returns This builder instance for method chaining
     */
    complete(completionMessage) {
        this.content.content_data.progress_bar_state = "COMPLETED";
        this.content.content_data.progress_bar_current_percentage = 100;
        if (completionMessage) {
            this.content.content_data.progress_bar_message = completionMessage;
        }
        return this;
    }
    /**
     * Mark progress as failed (sets state to ERROR)
     *
     * @param errorMessage - Optional error message to display
     * @returns This builder instance for method chaining
     */
    error(errorMessage) {
        this.content.content_data.progress_bar_state = "ERROR";
        if (errorMessage) {
            this.content.content_data.progress_bar_message = errorMessage;
        }
        return this;
    }
    /**
     * Pause progress (sets state to PAUSED)
     *
     * @param pauseMessage - Optional message to show when paused
     * @returns This builder instance for method chaining
     */
    pause(pauseMessage) {
        this.content.content_data.progress_bar_state = "PAUSED";
        if (pauseMessage) {
            this.content.content_data.progress_bar_message = pauseMessage;
        }
        return this;
    }
    /**
     * Cancel progress (sets state to CANCELLED)
     *
     * @param cancelMessage - Optional message to show when cancelled
     * @returns This builder instance for method chaining
     */
    cancel(cancelMessage) {
        this.content.content_data.progress_bar_state = "CANCELLED";
        if (cancelMessage) {
            this.content.content_data.progress_bar_message = cancelMessage;
        }
        return this;
    }
    /**
     * Get current progress percentage
     *
     * @returns Current progress percentage (0-100)
     */
    getCurrentPercentage() {
        return this.content.content_data.progress_bar_current_percentage;
    }
    /**
     * Get current progress state
     *
     * @returns Current progress state
     */
    getCurrentState() {
        return this.content.content_data.progress_bar_state;
    }
    /**
     * Get current progress message
     *
     * @returns Current progress message
     */
    getCurrentMessage() {
        return this.content.content_data.progress_bar_message;
    }
    /**
     * Check if progress is complete
     *
     * @returns True if state is COMPLETED or percentage is 100
     */
    isComplete() {
        return (this.content.content_data.progress_bar_state === "COMPLETED" ||
            this.content.content_data.progress_bar_current_percentage >= 100);
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
//# sourceMappingURL=progress-bar.js.map