/**
 * @fileoverview Runtime chat protocol types for messages, content, actions, and canvas state.
 *
 * This package module owns the reusable chat runtime type surface that was previously
 * duplicated inside an initial UI consumer. It re-exports canonical wire types and adds generic
 * client/runtime extensions (content_source_*, raw_content, opaque metadata, etc.) without
 * depending on any consuming product's domain model. Canvas queue scope metadata lives in
 * `@gg-utils/chat-comms/runtime/canvas`.
 *
 * @example
 * ```typescript
 * import type { ChatMessage } from "@gg-utils/chat-comms/runtime/chat";
 *
 * const message: ChatMessage = {
 *   message_id: "msg_123",
 *   message_type: "CHAT_MESSAGE",
 *   message_role: "ASSISTANT",
 *   message_target: "CHAT",
 *   message_contents: [],
 * };
 * ```
 * @testing TypeScript compile: cd chat-stream-protocol && npm run typecheck
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export { APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT, APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS, } from "../../types/app.js";
// Base interface for chat content
/**
 * Default queue name for content processing.
 * Content without an explicit queue is processed in the main queue.
 */
export const DEFAULT_CONTENT_QUEUE = "main";
/**
 * Runtime validator for queue values used by queue processors/debuggers.
 */
export function ChatTypes_validateContentQueue(options) {
    const { contentQueue, context = "chat-types" } = options;
    if (contentQueue.trim().length === 0) {
        throw new Error(`[${context}] contentQueue must be a non-empty string`);
    }
    return contentQueue;
}
/**
 * Creates a protocol-owned fallback content id for historical messages that omitted `content_id`.
 *
 * @remarks
 * The default id is deterministic per message and content slot. Consumers that need additional
 * uniqueness can pass a namespace-safe `uniqueSuffix`.
 */
export function RuntimeChat_createGeneratedContentId(options) {
    const messageId = options.messageId.trim().length > 0 ? options.messageId : "unknown-message";
    const uniqueSuffix = options.uniqueSuffix?.trim();
    if (uniqueSuffix && uniqueSuffix.length > 0) {
        return `runtime-chat-content-generated-id-${messageId}-${options.contentIndex}-${uniqueSuffix}`;
    }
    return `runtime-chat-content-generated-id-${messageId}-${options.contentIndex}`;
}
/**
 * Normalizes loose historical chat messages by filling missing `content_id` fields.
 *
 * @remarks
 * The function is immutable: when no content ids are missing, it returns the original message
 * reference; otherwise it returns a shallow-cloned message with cloned content items only for the
 * entries that required generated ids.
 */
export function RuntimeChat_normalizeMessageContentIds(message, options = {}) {
    if (RuntimeChat_messageHasContentIds(message)) {
        return message;
    }
    const normalizedMessageContents = [];
    for (const [contentIndex, content] of message.message_contents.entries()) {
        if (RuntimeChat_hasContentId(content)) {
            normalizedMessageContents.push(content);
            continue;
        }
        const messageId = typeof message.message_id === "string"
            ? message.message_id
            : "unknown-message";
        const contentId = options.createContentId?.({
            messageId,
            contentIndex,
            content,
        }) ??
            RuntimeChat_createGeneratedContentId({
                messageId,
                contentIndex,
            });
        normalizedMessageContents.push({
            ...content,
            content_id: contentId,
        });
    }
    return {
        ...message,
        message_contents: normalizedMessageContents,
    };
}
function RuntimeChat_messageHasContentIds(message) {
    return message.message_contents.every(RuntimeChat_hasContentId);
}
function RuntimeChat_hasContentId(content) {
    return (typeof content.content_id === "string" &&
        content.content_id.trim().length > 0);
}
/** UI/runtime-only send-error state kind for in-flight retry/recovery interactions. */
export const SEND_ERROR_STATE_KIND_STILL_PROCESSING = "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_STILL_PROCESSING";
/** Compile one protocol action into product-agnostic runtime commands. */
export function RuntimeChat_compileActionToCommands(options) {
    const { action, defaultContentQueue, createSyntheticContentId } = options;
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_SEND_TEXT_MESSAGE")) {
        const userContentItem = {
            content_id: createSyntheticContentId({
                reason: "RUNTIME_CHAT_SYNTHETIC_CONTENT_ID_REASON_SEND_TEXT_MESSAGE",
                action,
            }),
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_queue: defaultContentQueue,
            content_data: { markdown: action.action_data.text },
        };
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_ADD_MESSAGE",
                role: "USER",
                contentItems: [userContentItem],
            },
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_SEND_MESSAGE",
                message: action.action_data.text,
                userActions: [action],
            },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_BEGIN_SIMULATED_TURN")) {
        return [{ type: "RUNTIME_CHAT_ACTION_COMMAND_CREATE_NEW_TURN" }];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE")) {
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_MARK_NEXT_CONTENT_ITEM_AS_SEQUENCE_START",
            },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_UPDATE_PROGRESS_BAR")) {
        return [
            { type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_PROGRESS_BAR", action },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_UPDATE_BUTTON")) {
        return [{ type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_BUTTON", action }];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_UPDATE_PANEL")) {
        return [{ type: "RUNTIME_CHAT_ACTION_COMMAND_UPDATE_PANEL", action }];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD")) {
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_SEND_MESSAGE",
                message: action.action_data.simulated_user_message_text,
                userActions: [action],
            },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP")) {
        const commands = [];
        if (action.action_data.simulated_user_message_text) {
            commands.push({
                type: "RUNTIME_CHAT_ACTION_COMMAND_ADD_MESSAGE",
                role: "USER",
                contentItems: [
                    {
                        content_id: createSyntheticContentId({
                            reason: "RUNTIME_CHAT_SYNTHETIC_CONTENT_ID_REASON_CHOOSE_ACTIONABLE_CHIP",
                            action,
                        }),
                        content_type: "CHAT_CONTENT_MARKDOWN",
                        content_queue: defaultContentQueue,
                        content_data: {
                            markdown: action.action_data.simulated_user_message_text,
                        },
                    },
                ],
                insertAfterContentId: action.action_data.actionable_chips_content_id,
            });
        }
        commands.push({
            type: "RUNTIME_CHAT_ACTION_COMMAND_SEND_MESSAGE",
            message: action.action_data.simulated_user_message_text,
            userActions: [action],
        });
        return commands;
    }
    if (RuntimeChat_actionTypeMatches(action, "CHAT_ACTION_WAIT_FOR_QUEUES")) {
        return [{ type: "RUNTIME_CHAT_ACTION_COMMAND_WAIT_FOR_QUEUES", action }];
    }
    if (RuntimeChat_actionTypeMatches(action, "APP_ACTION_THREAD_LIST_REFRESH")) {
        return [{ type: "RUNTIME_CHAT_ACTION_COMMAND_REFRESH_THREADS" }];
    }
    if (RuntimeChat_actionTypeMatches(action, "APP_ACTION_SET_THEME") ||
        RuntimeChat_actionTypeMatches(action, "APP_ACTION_USER_PREFERENCE_UPDATE") ||
        RuntimeChat_actionTypeMatches(action, "APP_ACTION_CORE_CONSOLE")) {
        return [];
    }
    if (RuntimeChat_actionTypeMatches(action, "APP_ACTION_SET_INPUT_PLACEHOLDER")) {
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_SET_INPUT_PLACEHOLDER",
                placeholder: action.action_data.placeholder,
            },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "APP_ACTION_WAIT_FOR_USER_INPUT")) {
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_WAIT_FOR_USER_INTERACTION",
                focusTarget: action.action_data.focus_target,
            },
        ];
    }
    if (RuntimeChat_actionTypeMatches(action, "APP_ACTION_SET_SEND_ERROR")) {
        return [
            {
                type: "RUNTIME_CHAT_ACTION_COMMAND_SET_SEND_ERROR",
                sendError: {
                    kind: action.action_data.error_kind,
                    message: action.action_data.message,
                    recoveryHints: action.action_data.recovery_hints ?? [],
                    diagnostics: action.action_data.diagnostics,
                    source: "SEND_ERROR_STATE_SOURCE_PROTOCOL",
                },
            },
        ];
    }
    if (RuntimeChat_isCanvasPassThroughAction(action)) {
        return [
            { type: "RUNTIME_CHAT_ACTION_COMMAND_PROCESS_CANVAS_ACTION", action },
        ];
    }
    return RuntimeChat_throwUnhandledCompilableAction(action);
}
/** Narrow a compilable action by its protocol `action_type` discriminant. */
function RuntimeChat_actionTypeMatches(action, actionType) {
    return action.action_type === actionType;
}
/** Narrow a compilable action to the opaque canvas action pass-through family. */
function RuntimeChat_isCanvasPassThroughAction(action) {
    return (action.action_type === "CANVAS_ACTION_OPEN" ||
        action.action_type === "CANVAS_ACTION_UPDATE" ||
        action.action_type === "CANVAS_ACTION_CLOSE");
}
/** Runtime error path for future action tokens not yet handled by the compiler. */
function RuntimeChat_throwUnhandledCompilableAction(action) {
    throw new Error(`Unhandled runtime chat action: ${JSON.stringify(action)}`);
}
/** Compile one protocol content item into product-agnostic runtime content commands. */
export function RuntimeChat_compileContentItemToCommands(content) {
    switch (content.content_type) {
        case "CHAT_CONTENT_PROGRESS_BAR":
            return [
                {
                    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_PROGRESS_BAR",
                    content,
                },
            ];
        case "CHAT_CONTENT_MARKDOWN":
            return [
                { type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_MARKDOWN", content },
            ];
        case "CHAT_CONTENT_PANEL":
            return [{ type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_PANEL", content }];
        case "CHAT_CONTENT_ACTIONABLE_CARDS":
            return [
                {
                    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTIONABLE_CARDS",
                    content,
                },
            ];
        case "CHAT_CONTENT_ACTIONABLE_CHIPS":
            return [
                {
                    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTIONABLE_CHIPS",
                    content,
                },
            ];
        case "CHAT_CONTENT_BUTTON":
            return [{ type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_BUTTON" }];
        case "CHAT_CONTENT_ACTION_WRAPPER":
            return [
                {
                    type: "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTION",
                    action: content.content_data.action,
                },
            ];
        default:
            return RuntimeChat_assertNever(content);
    }
}
/**
 * Produces a concise, human-readable protocol content summary for logs and debug traces.
 */
export function RuntimeChat_getContentSummary(content) {
    switch (content.content_type) {
        case "CHAT_CONTENT_MARKDOWN": {
            const markdown = content.content_data.markdown;
            if (!markdown) {
                return "empty markdown";
            }
            return RuntimeChat_truncateSummaryText(markdown.replace(/\s+/g, " ").trim(), 60);
        }
        case "CHAT_CONTENT_PROGRESS_BAR": {
            const { progress_bar_message, progress_bar_current_percentage, progress_bar_state, } = content.content_data;
            const icon = progress_bar_state === "COMPLETED" ? "✓" : "⏳";
            return `${icon} ${progress_bar_current_percentage}% "${RuntimeChat_truncateSummaryText(progress_bar_message, 40)}"`;
        }
        case "CHAT_CONTENT_PANEL": {
            const { panel_header_title, panel_body_type } = content.content_data;
            const title = panel_header_title
                ? `"${RuntimeChat_truncateSummaryText(panel_header_title, 30)}"`
                : "untitled";
            return `${panel_body_type} ${title}`;
        }
        case "CHAT_CONTENT_ACTION_WRAPPER":
            return RuntimeChat_getActionSummary(content.content_data.action);
        case "CHAT_CONTENT_ACTIONABLE_CARDS": {
            const items = content.content_data.actionable_cards_items;
            const firstTitle = items[0]?.card_title;
            const firstTitleSummary = firstTitle
                ? ` (first: "${RuntimeChat_truncateSummaryText(firstTitle, 25)}")`
                : "";
            return `${items.length} card${items.length !== 1 ? "s" : ""}${firstTitleSummary}`;
        }
        case "CHAT_CONTENT_ACTIONABLE_CHIPS": {
            const items = content.content_data.actionable_chips_items;
            const chipTexts = items
                .slice(0, 3)
                .map((chip) => chip.chip_text)
                .join(", ");
            return `${items.length} chip${items.length !== 1 ? "s" : ""}: ${RuntimeChat_truncateSummaryText(chipTexts, 40)}`;
        }
        case "CHAT_CONTENT_BUTTON": {
            const { button_text, button_state } = content.content_data;
            return `"${RuntimeChat_truncateSummaryText(button_text, 30)}" [${button_state}]`;
        }
        default:
            return RuntimeChat_assertNever(content);
    }
}
/** Produces a concise action summary for action-wrapper content debug traces. */
function RuntimeChat_getActionSummary(action) {
    const actionType = action.action_type
        .replace("CHAT_ACTION_", "")
        .replace("CANVAS_ACTION_", "");
    switch (action.action_type) {
        case "CHAT_ACTION_UPDATE_PROGRESS_BAR": {
            const message = action.action_data.progress_bar_message;
            return `${actionType}${message ? ` "${RuntimeChat_truncateSummaryText(message, 30)}"` : ""}`;
        }
        case "CHAT_ACTION_UPDATE_PANEL": {
            const title = action.action_data.panel_header_title;
            return `${actionType} → ${action.action_data.panel_content_id}${title ? ` "${RuntimeChat_truncateSummaryText(title, 25)}"` : ""}`;
        }
        case "CHAT_ACTION_WAIT_FOR_QUEUES": {
            const queues = action.action_data.queue_names.join(", ");
            return `${actionType} [${queues}]`;
        }
        case "CANVAS_ACTION_OPEN": {
            const title = action.action_data.canvas_title_label;
            return `${actionType}${title ? ` "${RuntimeChat_truncateSummaryText(title, 30)}"` : ""}`;
        }
        case "CANVAS_ACTION_UPDATE":
            return `${actionType} → ${action.action_data.canvas_id}`;
        default:
            return actionType;
    }
}
/** Truncates debug summary text to a maximum length with an ellipsis suffix. */
function RuntimeChat_truncateSummaryText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.slice(0, maxLength - 1)}…`;
}
/** Extracts deduplicated image URLs from a chat message's protocol content items. */
export function RuntimeChat_extractImageUrlsFromMessage(message) {
    const imageUrls = message.message_contents.flatMap((content) => RuntimeChat_extractImageUrlsFromContent(content));
    return RuntimeChat_dedupeStrings(imageUrls);
}
/** Extracts deduplicated image URLs from one queued/pending protocol message. */
export function RuntimeChat_extractImageUrlsFromPendingMessage(pendingMessage) {
    return RuntimeChat_extractImageUrlsFromMessage(pendingMessage.message);
}
/** Extracts deduplicated image URLs from many queued/pending protocol messages. */
export function RuntimeChat_extractImageUrlsFromPendingMessages(pendingMessages) {
    const imageUrls = pendingMessages.flatMap((pendingMessage) => RuntimeChat_extractImageUrlsFromPendingMessage(pendingMessage));
    return RuntimeChat_dedupeStrings(imageUrls);
}
/** Extracts image URLs from one protocol content item. */
export function RuntimeChat_extractImageUrlsFromContent(content) {
    switch (content.content_type) {
        case "CHAT_CONTENT_PANEL":
            return RuntimeChat_extractImageUrlsFromPanelBodyData(content.content_data.panel_body_data);
        case "CHAT_CONTENT_ACTION_WRAPPER":
            return RuntimeChat_extractImageUrlsFromAction(content.content_data.action);
        default:
            return [];
    }
}
/** Extracts image URLs from one protocol action payload. */
export function RuntimeChat_extractImageUrlsFromAction(action) {
    switch (action.action_type) {
        case "CHAT_ACTION_UPDATE_PANEL":
            return RuntimeChat_extractImageUrlsFromPanelBodyData(action.action_data.panel_body_data);
        default:
            return [];
    }
}
/**
 * Partitions queued/pending messages by whether protocol panel payloads contain image URLs.
 */
export function RuntimeChat_groupPendingMessagesByImageContent(messages) {
    const withImages = [];
    const withoutImages = [];
    for (const message of messages) {
        if (RuntimeChat_extractImageUrlsFromPendingMessage(message).length > 0) {
            withImages.push(message);
        }
        else {
            withoutImages.push(message);
        }
    }
    return { withImages, withoutImages };
}
/** Extracts one image URL from any panel body payload that exposes an `image_url` string. */
function RuntimeChat_extractImageUrlsFromPanelBodyData(panelBodyData) {
    const imageUrl = RuntimeChat_getImageUrlFromUnknown(panelBodyData);
    return imageUrl === null ? [] : [imageUrl];
}
/** Reads an `image_url` property from loose historical panel body payloads. */
function RuntimeChat_getImageUrlFromUnknown(value) {
    if (!RuntimeChat_isRecord(value)) {
        return null;
    }
    const imageUrl = value.image_url;
    if (typeof imageUrl !== "string" || imageUrl.length === 0) {
        return null;
    }
    return imageUrl;
}
/** Runtime object guard used by protocol payload scanners. */
function RuntimeChat_isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Deduplicates string lists while preserving first-seen order. */
function RuntimeChat_dedupeStrings(values) {
    return Array.from(new Set(values));
}
/** Exhaustiveness guard for package-owned runtime chat compilers. */
function RuntimeChat_assertNever(value) {
    throw new Error(`Unhandled runtime chat protocol value: ${JSON.stringify(value)}`);
}
//# sourceMappingURL=index.js.map