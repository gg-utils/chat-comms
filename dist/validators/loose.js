/**
 * Loose compatibility classifiers for historical stream content.
 *
 * These do not enforce strict schema validity — they accept broader inputs
 * and emit warning-level diagnostics for drift or deprecated patterns.
 */
function isProtocolRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isKnownProtocolActionTarget(value) {
    return value === "CHAT" || value === "CANVAS" || value === "APP";
}
function isKnownProtocolWireRole(value) {
    return value === "USER" || value === "ASSISTANT";
}
/**
 * Loose chat-content classifier shared by stream consumers that must accept
 * historical protocol payloads before stricter per-content schemas are applied.
 */
export function classifyProtocolChatContentLoose(value) {
    if (!isProtocolRecord(value)) {
        return { accepted: false, warnings: ["content item is not an object"] };
    }
    if (value["content_id"] !== undefined &&
        typeof value["content_id"] !== "string") {
        return {
            accepted: false,
            warnings: ["content item has non-string content_id"],
        };
    }
    if (typeof value["content_type"] !== "string") {
        return { accepted: false, warnings: ["content item missing content_type"] };
    }
    if (typeof value["content_queue"] !== "string" ||
        value["content_queue"].trim().length === 0) {
        return {
            accepted: false,
            warnings: ["content item has empty or missing content_queue"],
        };
    }
    if (value["content_data"] !== undefined &&
        !isProtocolRecord(value["content_data"])) {
        return {
            accepted: false,
            warnings: ["content item has non-object content_data"],
        };
    }
    return { accepted: true, warnings: [] };
}
/** Type guard companion for `classifyProtocolChatContentLoose`. */
export function isProtocolChatContentCandidateLoose(value) {
    return classifyProtocolChatContentLoose(value).accepted;
}
/**
 * Loose message classifier: checks structural shape without enforcing
 * strict role/target/content-type membership.
 */
export function classifyProtocolMessageLoose(value) {
    const warnings = [];
    if (!isProtocolRecord(value)) {
        return { accepted: false, warnings: ["Value is not an object"] };
    }
    if (!Array.isArray(value["message_contents"])) {
        return { accepted: false, warnings: ["message_contents is not an array"] };
    }
    // Allow empty contents with warning (historical compatibility)
    if (value["message_contents"].length === 0) {
        warnings.push("message_contents is empty (strict validation would reject)");
    }
    // Validate each content item has content_type and content_queue
    for (const item of value["message_contents"]) {
        const result = classifyProtocolChatContentLoose(item);
        if (!result.accepted) {
            return result;
        }
        warnings.push(...result.warnings);
    }
    return { accepted: true, warnings };
}
/** Type guard companion for `classifyProtocolMessageLoose`. */
export function isProtocolChatMessageLoose(value) {
    return classifyProtocolMessageLoose(value).accepted;
}
/**
 * Loose stream-envelope classifier for runtime consumers that need to accept
 * historical `content_id` omissions while still requiring a chat-message
 * envelope (`CHAT_MESSAGE`, `USER`/`ASSISTANT`, `CHAT`).
 */
export function classifyProtocolRuntimeChatMessageLoose(value) {
    const messageResult = classifyProtocolMessageLoose(value);
    if (!messageResult.accepted) {
        return messageResult;
    }
    if (!isProtocolRecord(value)) {
        return { accepted: false, warnings: ["Value is not an object"] };
    }
    if (value["message_type"] !== "CHAT_MESSAGE") {
        return { accepted: false, warnings: ["message_type is not CHAT_MESSAGE"] };
    }
    if (!isKnownProtocolWireRole(value["message_role"])) {
        return {
            accepted: false,
            warnings: ["message_role is not USER or ASSISTANT"],
        };
    }
    if (value["message_target"] !== "CHAT") {
        return { accepted: false, warnings: ["message_target is not CHAT"] };
    }
    return messageResult;
}
/** Type guard companion for `classifyProtocolRuntimeChatMessageLoose`. */
export function isProtocolRuntimeChatMessageLoose(value) {
    return classifyProtocolRuntimeChatMessageLoose(value).accepted;
}
/**
 * Loose action classifier: checks structural shape without enforcing
 * strict action_type membership. Known targets are still checked when present.
 */
export function classifyProtocolActionLoose(value) {
    if (!isProtocolRecord(value)) {
        return { accepted: false, warnings: ["Value is not an object"] };
    }
    if (typeof value["action_type"] !== "string" ||
        value["action_type"].trim().length === 0) {
        return { accepted: false, warnings: ["Missing or non-string action_type"] };
    }
    if (!isProtocolRecord(value["action_data"])) {
        return { accepted: false, warnings: ["Missing or non-object action_data"] };
    }
    const target = value["action_data"]["target"];
    if (target !== undefined && typeof target !== "string") {
        return {
            accepted: false,
            warnings: ["action_data.target is not a string"],
        };
    }
    if (typeof target === "string" && !isKnownProtocolActionTarget(target)) {
        return {
            accepted: false,
            warnings: [`unknown action_data.target "${target}"`],
        };
    }
    return { accepted: true, warnings: [] };
}
/** Type guard companion for `classifyProtocolActionLoose`. */
export function isProtocolActionLoose(value) {
    return classifyProtocolActionLoose(value).accepted;
}
/** Narrows a loose protocol action candidate to chat-targeted actions only. */
export function isProtocolChatOnlyActionLoose(value) {
    if (!isProtocolActionLoose(value)) {
        return false;
    }
    const targetValue = value.action_data["target"];
    return targetValue === undefined || targetValue === "CHAT";
}
/** Narrows a loose protocol action candidate to panel update actions with a target content id. */
export function isProtocolPanelUpdateActionLoose(value) {
    if (!isProtocolActionLoose(value)) {
        return false;
    }
    if (value.action_type !== "CHAT_ACTION_UPDATE_PANEL") {
        return false;
    }
    return typeof value.action_data["panel_content_id"] === "string";
}
/** Narrows a loose protocol action candidate to actionable-card selection actions. */
export function isProtocolChooseActionableCardActionLoose(value) {
    if (!isProtocolActionLoose(value)) {
        return false;
    }
    return (value.action_type === "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD" &&
        typeof value.action_data["selected_card_value"] === "string");
}
/** Narrows a loose protocol action candidate to app-level core-console actions. */
export function isProtocolCoreConsoleActionLoose(value) {
    if (!isProtocolActionLoose(value)) {
        return false;
    }
    const level = value.action_data["level"];
    return (value.action_type === "APP_ACTION_CORE_CONSOLE" &&
        (value.action_data["target"] === undefined ||
            value.action_data["target"] === "APP") &&
        (level === "debug" ||
            level === "info" ||
            level === "warn" ||
            level === "error") &&
        typeof value.action_data["message"] === "string");
}
//# sourceMappingURL=loose.js.map