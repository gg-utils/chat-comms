/**
 * Strict validation using Zod schemas.
 */
import { ProtocolActionSchema, ProtocolChatMessageSchema, } from "../schemas/index.js";
/** Strictly validate a value as a canonical CHAT_MESSAGE. */
export function parseProtocolMessageStrict(value) {
    return ProtocolChatMessageSchema.safeParse(value);
}
/** Strictly validate a value as a canonical protocol action. */
export function parseProtocolActionStrict(value) {
    return ProtocolActionSchema.safeParse(value);
}
//# sourceMappingURL=strict.js.map