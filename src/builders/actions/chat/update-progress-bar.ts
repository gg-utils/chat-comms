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
import { ProtocolIdUtils } from "../../protocol-id-utils.js";

/**
 * Fluent builder for CHAT_ACTION_UPDATE_PROGRESS_BAR with auto-ID support.
 *
 * @remarks
 * Clamps percentages to 0–100; omits unset optional fields from `action_data`; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_UpdateProgressBarActionBuilder({ autoId: "p", content_id: "c", message_id: "m" }).progress_bar_current_percentage(50).build()`
 */
export class CommunicationProtocol_UpdateProgressBarActionBuilder {
  private action: CommunicationProtocol_ChatAction;

  /**
   * Initialize the update progress bar action builder
   *
   * @param options - Configuration options for the update progress bar action
   */
  constructor(options: CommunicationProtocol_UpdateProgressBarActionOptions) {
    const {
      content_id,
      progress_bar_state: state,
      progress_bar_visibility: visibility,
      progress_bar_current_percentage,
      progress_bar_current_animation_duration_ms,
      progress_bar_next_goal_delay_ms,
      progress_bar_next_goal_percentage,
      progress_bar_next_goal_animation_duration_ms: nextGoalAnimationDurationMs,
      progress_bar_message: message,
      progress_bar_icon: icon,
    } = options;

    this.action = {
      action_id: ProtocolIdUtils.resolveActionId(options),
      action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR",
      action_data: {
        target: "CHAT",
        progress_bar_content_id: content_id,
        ...(state !== undefined && { progress_bar_state: state }),
        ...(visibility !== undefined && { progress_bar_visibility: visibility }),
        ...(progress_bar_current_percentage !== undefined && {
          progress_bar_current_percentage,
        }),
        ...(progress_bar_current_animation_duration_ms !== undefined && {
          progress_bar_current_animation_duration_ms,
        }),
        ...(progress_bar_next_goal_delay_ms !== undefined && {
          progress_bar_next_goal_delay_ms,
        }),
        ...(progress_bar_next_goal_percentage !== undefined && {
          progress_bar_next_goal_percentage,
        }),
        ...(nextGoalAnimationDurationMs !== undefined && {
          progress_bar_next_goal_animation_duration_ms: nextGoalAnimationDurationMs,
        }),
        ...(message !== undefined && { progress_bar_message: message }),
        ...(icon !== undefined && { progress_bar_icon: icon }),
      },
    };
  }

  /**
   * Set progress bar state (IN_PROGRESS, COMPLETED)
   *
   * @param state - New progress bar state
   * @returns This builder instance for method chaining
   */
  state(state: ProgressBarState): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_state = state;
    return this;
  }

  /**
   * Set current percentage (0-100)
   *
   * @param percentage - Current progress percentage
   * @returns This builder instance for method chaining
   */
  progress_bar_current_percentage(
    percentage: number
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    // Clamp percentage to valid range
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    this.action.action_data.progress_bar_current_percentage = clampedPercentage;

    // Note: State is never automatically changed based on percentage
    // State must be explicitly set to "COMPLETED" if desired

    return this;
  }

  /**
   * Set next goal percentage (0-100)
   *
   * @param percentage - Target percentage for next goal
   * @returns This builder instance for method chaining
   */
  progress_bar_next_goal_percentage(
    percentage: number
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    // Clamp percentage to valid range
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    this.action.action_data.progress_bar_next_goal_percentage = clampedPercentage;
    return this;
  }

  /**
   * Set progress bar visibility state
   *
   * @param visibility - Visibility state (VISIBLE or HIDDEN)
   * @returns This builder instance for method chaining
   */
  visibility(
    visibility: ProgressBarVisibilityState
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_visibility = visibility;
    return this;
  }

  /**
   * Set current animation duration in milliseconds
   *
   * @param durationMs - Animation duration for current percentage change
   * @returns This builder instance for method chaining
   */
  progress_bar_current_animation_duration_ms(
    durationMs: number
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    const validDuration = Math.max(0, durationMs);
    this.action.action_data.progress_bar_current_animation_duration_ms = validDuration;
    return this;
  }

  /**
   * Set delay before next goal animation in milliseconds
   *
   * @param delayMs - Delay before starting next goal animation
   * @returns This builder instance for method chaining
   */
  progress_bar_next_goal_delay_ms(
    delayMs: number
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    const validDelay = Math.max(0, delayMs);
    this.action.action_data.progress_bar_next_goal_delay_ms = validDelay;
    return this;
  }

  /**
   * Set next goal animation duration in milliseconds
   *
   * @param durationMs - Animation duration for next goal percentage change
   * @returns This builder instance for method chaining
   */
  nextGoalAnimationDurationMs(
    durationMs: number
  ): CommunicationProtocol_UpdateProgressBarActionBuilder {
    const validDuration = Math.max(0, durationMs);
    this.action.action_data.progress_bar_next_goal_animation_duration_ms = validDuration;
    return this;
  }

  /**
   * Set progress bar message
   *
   * @param message - Progress message to display
   * @returns This builder instance for method chaining
   */
  message(message: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_message = message;
    return this;
  }

  /**
   * Set progress bar icon
   *
   * @param icon - Icon to display (emoji or text)
   * @returns This builder instance for method chaining
   */
  icon(icon: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_icon = icon;
    return this;
  }

  /**
   * Strips the icon field from serialized action data so the UI omits a previously set icon.
   *
   * @returns This builder instance for method chaining
   */
  removeIcon(): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data = Object.fromEntries(
      Object.entries(this.action.action_data).filter(([key]) => key !== "progress_bar_icon")
    ) as typeof this.action.action_data;
    return this;
  }

  /**
   * Mark progress as completed (convenience method)
   *
   * @param completionMessage - Optional completion message
   * @returns This builder instance for method chaining
   */
  complete(completionMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_state = "COMPLETED";
    this.action.action_data.progress_bar_current_percentage = 100;
    if (completionMessage) {
      this.action.action_data.progress_bar_message = completionMessage;
    }
    return this;
  }

  /**
   * Mark progress as failed (convenience method)
   *
   * @param errorMessage - Optional error message
   * @returns This builder instance for method chaining
   */
  error(errorMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_state = "ERROR";
    if (errorMessage) {
      this.action.action_data.progress_bar_message = errorMessage;
    }
    return this;
  }

  /**
   * Pause progress (convenience method)
   *
   * @param pauseMessage - Optional pause message
   * @returns This builder instance for method chaining
   */
  pause(pauseMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_state = "PAUSED";
    if (pauseMessage) {
      this.action.action_data.progress_bar_message = pauseMessage;
    }
    return this;
  }

  /**
   * Cancel progress (convenience method)
   *
   * @param cancelMessage - Optional cancellation message
   * @returns This builder instance for method chaining
   */
  cancel(cancelMessage?: string): CommunicationProtocol_UpdateProgressBarActionBuilder {
    this.action.action_data.progress_bar_state = "CANCELLED";
    if (cancelMessage) {
      this.action.action_data.progress_bar_message = cancelMessage;
    }
    return this;
  }

  /**
   * Get the target content ID
   *
   * @returns Content ID of the progress bar being updated
   */
  getContentId(): string {
    return this.action.action_data.progress_bar_content_id as string;
  }

  /**
   * Get current percentage (if set)
   *
   * @returns Current percentage or undefined
   */
  getCurrentPercentage(): number | undefined {
    return this.action.action_data.progress_bar_current_percentage;
  }

  /**
   * Get current state (if set)
   *
   * @returns Current state or undefined
   */
  getCurrentState(): string | undefined {
    return this.action.action_data.progress_bar_state;
  }

  /**
   * Get current message (if set)
   *
   * @returns Current message or undefined
   */
  getCurrentMessage(): string | undefined {
    return this.action.action_data.progress_bar_message;
  }

  /**
   * Check if this action will complete the progress
   *
   * @returns True if state is COMPLETED or percentage is 100
   */
  willComplete(): boolean {
    return (
      this.action.action_data.progress_bar_state === "COMPLETED" ||
      (this.action.action_data.progress_bar_current_percentage as number) >= 100
    );
  }

  /**
   * Build and return the final chat action object
   *
   * @returns Immutable copy of the configured chat action
   */
  build(): CommunicationProtocol_ChatAction {
    return { ...this.action };
  }
}
