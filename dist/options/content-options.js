/**
 * @fileoverview Option interfaces for markdown, panels, cards, chips, progress bars, and other chat content builders.
 *
 * Flow: content option types -> protocol content builders -> `message_contents` arrays on chat messages.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_MarkdownContentOptions } from "./content-options";
 *
 * const markdown: Pick<CommunicationProtocol_MarkdownContentOptions, "markdown" | "content_queue"> = {
 *   content_queue: "main",
 *   markdown: "# Title",
 * };
 * void markdown;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/options - Shared option exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=content-options.js.map