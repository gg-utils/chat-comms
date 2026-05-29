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
/** Error kind emitted when a protocol producer cannot resolve the requested entity/resource. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND";
/** Error kind emitted when the protocol producer hit an internal server/application failure. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR";
/** Error kind emitted when the protocol producer or transport exceeded its timeout budget. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT";
/** Error kind emitted when the client could not reach the protocol producer. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR";
/** Error kind emitted when the received stream violates the expected protocol contract. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
/** Closed protocol error-kind vocabulary for `APP_ACTION_SET_SEND_ERROR.action_data.error_kind`. */
export const APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS = [
    APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND,
    APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR,
    APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT,
    APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR,
    APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR,
];
//# sourceMappingURL=app.js.map