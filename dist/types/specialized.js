/**
 * @fileoverview Intermediate specialized MESSAGE, CONTENT, and ACTION contracts between base envelopes and chat/canvas/app concrete types.
 *
 * Flow: `CommunicationProtocol_Specialized*` -> chat/canvas unions -> builder `build()` outputs.
 *
 * Naming: TypeScript identifiers still carry the `CommunicationProtocol_` prefix while markdown specs use ALL_CAPS headings; keep renames coordinated across this file, unions, and the protocol docs tree.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_SpecializedMessage } from "./specialized.js";
 *
 * declare const message: CommunicationProtocol_SpecializedMessage;
 * void message.message_type;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/docs/communication-protocol/specialized-structures/README.md - Specialized structures overview.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export {};
//# sourceMappingURL=specialized.js.map