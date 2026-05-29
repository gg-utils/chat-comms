/**
 * @fileoverview Application-level protocol actions (theme, preferences, console, send-error surfaces) that sit outside chat/canvas.
 *
 * Flow: discriminated `AppActionType` payloads -> client shell handlers and recovery UX.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_AppAction } from "./app.js";
 *
 * const setTheme: Pick<CommunicationProtocol_AppAction, "action_type"> = { action_type: "APP_ACTION_SET_THEME" };
 * void setTheme;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION specification.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_SpecializedAction } from "./specialized.js";
/** Application theme name values */
export type AppThemeName = "dark" | "light" | "system";
/** User/theme preference values */
export type ThemePreference = "dark" | "light" | "auto";
/** Focus targets for APP_ACTION_WAIT_FOR_USER_INPUT */
export type AppFocusTarget = "CHAT_INPUT" | "CANVAS" | "NONE";
/** Error kind emitted when a protocol producer cannot resolve the requested entity/resource. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND";
/** Error kind emitted when the protocol producer hit an internal server/application failure. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR";
/** Error kind emitted when the protocol producer or transport exceeded its timeout budget. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT";
/** Error kind emitted when the client could not reach the protocol producer. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR";
/** Error kind emitted when the received stream violates the expected protocol contract. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
/** Closed protocol error-kind vocabulary for `APP_ACTION_SET_SEND_ERROR.action_data.error_kind`. */
export declare const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS: readonly ["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"];
/** Error classifications for APP_ACTION_SET_SEND_ERROR */
export type AppSetSendErrorActionDataErrorKind = (typeof APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS)[number];
/** Recovery hint kinds for APP_ACTION_SET_SEND_ERROR */
export type RecoveryHintType = "RECOVERY_HINT_TYPE_RETRY" | "RECOVERY_HINT_TYPE_TRY_URL" | "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS" | "RECOVERY_HINT_TYPE_NEW_SCAN";
/** Recovery hint visual variants for APP_ACTION_SET_SEND_ERROR */
export type RecoveryHintStyle = "RECOVERY_HINT_STYLE_PRIMARY" | "RECOVERY_HINT_STYLE_SECONDARY";
/** Diagnostics source for APP_ACTION_SET_SEND_ERROR */
export type ErrorDiagnosticInfoSource = "ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL" | "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT";
/** Application-level instruction categories */
export type AppActionType = "APP_ACTION_SET_THEME" | "APP_ACTION_THREAD_LIST_REFRESH" | "APP_ACTION_USER_PREFERENCE_UPDATE" | "APP_ACTION_CORE_CONSOLE" | "APP_ACTION_SET_INPUT_PLACEHOLDER" | "APP_ACTION_WAIT_FOR_USER_INPUT" | "APP_ACTION_SET_SEND_ERROR";
/** Log level for core console messages */
export type CoreConsoleLevel = "debug" | "info" | "warn" | "error";
/**
 * Data payload for APP_ACTION_CORE_CONSOLE
 * Streams producer debug messages to the browser console.
 */
export interface CommunicationProtocol_CoreConsoleActionData {
    /** Must be "APP" for app actions */
    target: AppActionTarget;
    /** Log level - determines console method and styling */
    level: CoreConsoleLevel;
    /** Human-readable message */
    message: string;
    /** Optional JSON-serializable payload - displayed as expandable object */
    payload?: unknown;
    /** ISO 8601 timestamp */
    timestamp?: string;
    /** Source identifier (e.g., "pipeline:entity-discovery") */
    source?: string;
}
/** Valid application action targets */
export type AppActionTarget = "APP";
/** Data payload for application actions */
export interface CommunicationProtocol_AppActionData {
    /** Must be "APP" for app actions */
    target: AppActionTarget;
    /** Additional app action-specific parameters */
    [key: string]: unknown;
}
/**
 * Data payload for APP_ACTION_WAIT_FOR_USER_INPUT
 * Allows callers to provide an explicit focus target when pausing progression.
 */
export interface CommunicationProtocol_WaitForUserInputActionData extends CommunicationProtocol_AppActionData {
    /** Optional explicit focus target. Defaults to CHAT_INPUT when omitted. */
    focus_target?: AppFocusTarget;
}
/** Structured recovery hint rendered on the send-error surface. */
export interface CommunicationProtocol_RecoveryHint {
    hint_id: string;
    hint_type: RecoveryHintType;
    label: string;
    description?: string;
    placeholder?: string;
    style?: RecoveryHintStyle;
}
/** Sanitized diagnostics attached to the send-error surface. */
export interface CommunicationProtocol_ErrorDiagnosticInfo {
    diagnostic_id?: string;
    thread_id?: string;
    message_id?: string;
    pipeline_name?: string;
    source: ErrorDiagnosticInfoSource;
    timestamp?: string;
    status_code?: number;
    retry_count?: number;
}
/** Data payload for APP_ACTION_SET_SEND_ERROR. */
export interface CommunicationProtocol_SetSendErrorActionData extends CommunicationProtocol_AppActionData {
    error_kind: AppSetSendErrorActionDataErrorKind;
    message: string;
    recovery_hints?: CommunicationProtocol_RecoveryHint[];
    diagnostics?: CommunicationProtocol_ErrorDiagnosticInfo;
}
/**
 * APP_ACTION interface - specialized actions for application-level operations
 *
 * General type representing instructions for actions that affect overall application
 * state or behavior, rather than specific interfaces like chat or canvas. Used for
 * global operations such as changing themes, updating user preferences, or triggering
 * application-wide events.
 *
 * APP_ACTIONs can be initiated by the Assistant or user interactions with global UI elements.
 *
 * @remarks Closed-string tokens on nested payloads are part of the cross-client contract; extend only with taxonomy updates in lockstep.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/APP_ACTION.md - APP_ACTION Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_SET_THEME.md - Theme token payload, transitions, and how the client applies the chosen theme.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md - When the thread list must refetch, ordering guarantees, and UI refresh expectations.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md - Preference key vocabulary and how updates reconcile with persisted user settings.
 *
 * @interface CommunicationProtocol_AppAction
 * @extends CommunicationProtocol_SpecializedAction
 * @todo Implementation needed for app action builders and utilities
 */
export interface CommunicationProtocol_AppAction extends CommunicationProtocol_SpecializedAction {
    /** Specific app action type - determines action_data structure */
    action_type: AppActionType;
    /** Action data with app-specific target */
    action_data: CommunicationProtocol_AppActionData;
}
//# sourceMappingURL=app.d.ts.map