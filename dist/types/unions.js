/**
 * @fileoverview Exhaustive unions of concrete messages, content blocks, and actions for narrowing across the protocol surface.
 *
 * Flow: concrete interfaces -> exported union aliases -> builder return types and client-side discriminated handling.
 *
 * @example
 * ```typescript
 * import type { AllContent, ProtocolActionType } from "./unions.js";
 *
 * declare const block: AllContent;
 * void block;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=unions.js.map