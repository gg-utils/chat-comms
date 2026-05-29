/**
 * @fileoverview Canonical option objects for protocol message, content, action, canvas, and app builders.
 *
 * Consumers should import these reusable option contracts from the package instead of duplicating
 * protocol builder input shapes locally.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_ChatMessageOptions } from "@gg-utils/chat-comms/options";
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export * from "./message-options.js";
export * from "./content-options.js";
export * from "./action-options.js";
//# sourceMappingURL=index.d.ts.map