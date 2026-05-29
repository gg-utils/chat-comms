/**
 * @fileoverview Barrel for chat and canvas content builders.
 *
 * Content builders own reusable protocol payload construction; product-specific rendering
 * extensions must stay in opaque payload slots such as canvas `section_data`.
 *
 * @example
 * ```typescript
 * import {
 *   CommunicationProtocol_MarkdownContentBuilder,
 *   CommunicationProtocol_PanelContentBuilder,
 * } from "./index";
 *
 * void CommunicationProtocol_MarkdownContentBuilder;
 * void CommunicationProtocol_PanelContentBuilder;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */

// ============================================================================
// Chat Content Builders
// ============================================================================

export { CommunicationProtocol_MarkdownContentBuilder } from "./markdown.js";
export { CommunicationProtocol_ActionableCardsContentBuilder } from "./actionable-cards.js";
export { CommunicationProtocol_ActionableChipsContentBuilder } from "./actionable-chips.js";
export { CommunicationProtocol_ButtonContentBuilder } from "./button.js";
export { CommunicationProtocol_ProgressBarContentBuilder } from "./progress-bar.js";
export { CommunicationProtocol_ActionWrapperContentBuilder } from "./action-wrapper.js";
export { CommunicationProtocol_PanelContentBuilder } from "./panel.js";

// ============================================================================
// Canvas Content Builders
// ============================================================================

export {
  CommunicationProtocol_CanvasHtmlContentBuilder,
  CommunicationProtocol_CanvasMarkdownContentBuilder,
  CommunicationProtocol_CanvasSectionContentBuilder,
  buildProtocolCanvasHtmlContent,
  buildProtocolCanvasMarkdownContent,
  buildProtocolCanvasSectionContent,
} from "./canvas.js";
