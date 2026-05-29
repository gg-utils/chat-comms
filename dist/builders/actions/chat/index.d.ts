/**
 * @fileoverview Barrel for chat-scoped protocol action builders (text simulation, progress bar updates, panel updates).
 *
 * Downstream code should import concrete builders from here or from `../content/index.ts` when mixing actions with content.
 *
 * @example
 * ```typescript
 * import {
 *   CommunicationProtocol_SendTextMessageActionBuilder,
 *   CommunicationProtocol_UpdatePanelActionBuilder,
 * } from "./index";
 *
 * void CommunicationProtocol_SendTextMessageActionBuilder;
 * void CommunicationProtocol_UpdatePanelActionBuilder;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export { CommunicationProtocol_SendTextMessageActionBuilder } from "./send-text-message.js";
export { CommunicationProtocol_UpdateProgressBarActionBuilder } from "./update-progress-bar.js";
export { CommunicationProtocol_UpdatePanelActionBuilder } from "./update-panel.js";
//# sourceMappingURL=index.d.ts.map