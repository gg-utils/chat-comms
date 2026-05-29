/**
 * @fileoverview Shared enums, panel body unions, streaming knobs, and base option shapes for the communication protocol.
 *
 * Flow: canonical literals here -> specialized types, builders, and validators import these contracts without duplication.
 *
 * @example
 * ```typescript
 * import type { MessageRole } from "./common.js";
 *
 * const role: MessageRole = "ASSISTANT";
 * void role;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/types - Shared type exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
/**
 * Runtime validator for content queue values used at producer boundaries.
 */
export function CommunicationProtocol_validatestring(options) {
    const { contentQueue, context = "communication-protocol" } = options;
    if (contentQueue.trim().length === 0) {
        throw new Error(`[${context}] contentQueue must be a non-empty string`);
    }
    return contentQueue;
}
//# sourceMappingURL=common.js.map