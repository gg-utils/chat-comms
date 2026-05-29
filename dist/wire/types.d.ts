/**
 * Wire-protocol TypeScript types derived from token families.
 * These are convenience aliases — strict validation uses Zod schemas from `../schemas`.
 */
import type { PROTOCOL_APP_ACTION_TYPES, PROTOCOL_CANVAS_ACTION_TYPES, PROTOCOL_CANVAS_CONTENT_TYPES, PROTOCOL_CHAT_ACTION_TYPES, PROTOCOL_CHAT_CONTENT_TYPES } from "./constants.js";
/** Wire-only message roles (excludes core-internal SYSTEM). */
export type ProtocolWireMessageRole = "USER" | "ASSISTANT";
/** Chat message target — only "CHAT" is canonical for CHAT_MESSAGE envelopes. */
export type ProtocolMessageTarget = "CHAT";
/** Protocol action targets. */
export type ProtocolActionTarget = "CHAT" | "CANVAS" | "APP";
/** Chat content type discriminants. */
export type ProtocolChatContentType = (typeof PROTOCOL_CHAT_CONTENT_TYPES)[number];
/** Canvas content type discriminants. */
export type ProtocolCanvasContentType = (typeof PROTOCOL_CANVAS_CONTENT_TYPES)[number];
/** Chat-only action type discriminants. */
export type ProtocolChatActionType = (typeof PROTOCOL_CHAT_ACTION_TYPES)[number];
/** Canvas action type discriminants. */
export type ProtocolCanvasActionType = (typeof PROTOCOL_CANVAS_ACTION_TYPES)[number];
/** App action type discriminants. */
export type ProtocolAppActionType = (typeof PROTOCOL_APP_ACTION_TYPES)[number];
/** Aggregate action type across all domains. */
export type ProtocolActionType = ProtocolChatActionType | ProtocolCanvasActionType | ProtocolAppActionType;
/** Wire-protocol chat message envelope. */
export interface ProtocolChatMessage {
    message_id: string;
    message_type: "CHAT_MESSAGE";
    message_role: ProtocolWireMessageRole;
    message_target: ProtocolMessageTarget;
    debug?: boolean;
    message_contents: ProtocolChatContent[];
}
/** Wire-protocol chat content item. */
export interface ProtocolChatContent {
    content_id: string;
    content_type: ProtocolChatContentType;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL";
    content_group_id?: string;
    content_queue: string;
    content_delay?: number;
    content_data: Record<string, unknown>;
}
/** Wire-protocol action. */
export interface ProtocolAction {
    action_id: string;
    action_type: ProtocolActionType;
    action_data: {
        target: ProtocolActionTarget;
        [key: string]: unknown;
    };
}
//# sourceMappingURL=types.d.ts.map