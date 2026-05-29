/**
 * Loose compatibility classifiers for historical stream content.
 *
 * These do not enforce strict schema validity — they accept broader inputs
 * and emit warning-level diagnostics for drift or deprecated patterns.
 */
import type { AllAction, CommunicationProtocol_ChatMessage, CommunicationProtocol_UpdatePanelActionData } from "../types/index.js";
import type { AppAction, ChatMessage, ChooseActionableCardAction, CoreConsoleActionData } from "../runtime/chat/index.js";
export interface LooseClassificationResult {
    accepted: boolean;
    warnings: string[];
}
/** Union of JSON object shapes that can appear in protocol-bearing markdown streams. */
export type ProtocolJsonCandidate = CommunicationProtocol_ChatMessage | AllAction | Record<string, unknown>;
/** Loose shape of a single content item before full protocol schema validation. */
export interface ProtocolStreamParser_ChatContentCandidate {
    content_id?: string;
    content_type: string;
    content_queue: string;
    content_data?: Record<string, unknown>;
}
/** Loose shape of a chat message candidate before full protocol schema validation. */
export interface ProtocolStreamParser_ChatMessageCandidate {
    message_id?: string;
    message_type?: string;
    message_contents?: unknown;
    debug?: boolean;
}
/** Chat message narrowed enough for historical stream parsers to iterate content items. */
export type ChatMessageWithContents = ProtocolStreamParser_ChatMessageCandidate & {
    message_contents: ProtocolStreamParser_ChatContentCandidate[];
};
/**
 * Loose chat-content classifier shared by stream consumers that must accept
 * historical protocol payloads before stricter per-content schemas are applied.
 */
export declare function classifyProtocolChatContentLoose(value: unknown): LooseClassificationResult;
/** Type guard companion for `classifyProtocolChatContentLoose`. */
export declare function isProtocolChatContentCandidateLoose(value: unknown): value is ProtocolStreamParser_ChatContentCandidate;
/**
 * Loose message classifier: checks structural shape without enforcing
 * strict role/target/content-type membership.
 */
export declare function classifyProtocolMessageLoose(value: unknown): LooseClassificationResult;
/** Type guard companion for `classifyProtocolMessageLoose`. */
export declare function isProtocolChatMessageLoose(value: unknown): value is ChatMessageWithContents & Record<string, unknown>;
/**
 * Loose stream-envelope classifier for runtime consumers that need to accept
 * historical `content_id` omissions while still requiring a chat-message
 * envelope (`CHAT_MESSAGE`, `USER`/`ASSISTANT`, `CHAT`).
 */
export declare function classifyProtocolRuntimeChatMessageLoose(value: unknown): LooseClassificationResult;
/** Type guard companion for `classifyProtocolRuntimeChatMessageLoose`. */
export declare function isProtocolRuntimeChatMessageLoose(value: unknown): value is ChatMessage;
/**
 * Loose action classifier: checks structural shape without enforcing
 * strict action_type membership. Known targets are still checked when present.
 */
export declare function classifyProtocolActionLoose(value: unknown): LooseClassificationResult;
/** Type guard companion for `classifyProtocolActionLoose`. */
export declare function isProtocolActionLoose(value: unknown): value is Record<string, unknown> & {
    action_type: string;
    action_data: Record<string, unknown>;
};
/** Narrows a loose protocol action candidate to chat-targeted actions only. */
export declare function isProtocolChatOnlyActionLoose(value: unknown): value is Record<string, unknown> & {
    action_type: string;
    action_data: Record<string, unknown> & {
        target: "CHAT";
    };
};
/** Narrows a loose protocol action candidate to panel update actions with a target content id. */
export declare function isProtocolPanelUpdateActionLoose(value: unknown): value is Record<string, unknown> & {
    action_type: "CHAT_ACTION_UPDATE_PANEL";
    action_data: CommunicationProtocol_UpdatePanelActionData;
};
/** Narrows a loose protocol action candidate to actionable-card selection actions. */
export declare function isProtocolChooseActionableCardActionLoose(value: unknown): value is ChooseActionableCardAction;
/** Narrows a loose protocol action candidate to app-level core-console actions. */
export declare function isProtocolCoreConsoleActionLoose(value: unknown): value is AppAction & {
    action_type: "APP_ACTION_CORE_CONSOLE";
    action_data: CoreConsoleActionData;
};
//# sourceMappingURL=loose.d.ts.map