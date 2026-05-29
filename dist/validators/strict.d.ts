/**
 * Strict validation using Zod schemas.
 */
import type { SafeParseReturnType } from "zod";
import { type ProtocolAction_Strict, type ProtocolChatMessage_Strict } from "../schemas/index.js";
/** Result of strict protocol message validation. */
export type StrictMessageParseResult = SafeParseReturnType<unknown, ProtocolChatMessage_Strict>;
/** Result of strict protocol action validation. */
export type StrictActionParseResult = SafeParseReturnType<unknown, ProtocolAction_Strict>;
/** Strictly validate a value as a canonical CHAT_MESSAGE. */
export declare function parseProtocolMessageStrict(value: unknown): StrictMessageParseResult;
/** Strictly validate a value as a canonical protocol action. */
export declare function parseProtocolActionStrict(value: unknown): StrictActionParseResult;
//# sourceMappingURL=strict.d.ts.map