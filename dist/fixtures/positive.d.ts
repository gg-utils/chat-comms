/**
 * Golden positive fixtures for protocol validation and parity testing.
 */
import type { ProtocolAction, ProtocolChatMessage } from "../wire/types.js";
import type { CanvasContent } from "../types/index.js";
export declare const FIXTURE_MINIMAL_CHAT_MESSAGE: ProtocolChatMessage;
export declare const FIXTURE_MINIMAL_CHAT_MESSAGE_FENCED: string;
export declare const FIXTURE_DEBUG_MESSAGE: ProtocolChatMessage;
export declare const FIXTURE_NON_DEBUG_MESSAGE: ProtocolChatMessage;
export declare const FIXTURE_DEBUG_FENCED_BLOCK: string;
export declare const FIXTURE_NON_DEBUG_FENCED_BLOCK: string;
export declare const FIXTURE_WAIT_FOR_QUEUES_DRAIN: ProtocolAction;
export declare const FIXTURE_WAIT_FOR_QUEUES_IDLE: ProtocolAction;
export declare const FIXTURE_WAIT_FOR_QUEUES_CONTENT_IDS: ProtocolAction;
export declare const FIXTURE_CANVAS_CONTENT_HTML: CanvasContent;
export declare const FIXTURE_CANVAS_CONTENT_MARKDOWN: CanvasContent;
export declare const FIXTURE_CANVAS_CONTENT_SECTION: CanvasContent;
export declare const FIXTURE_CANVAS_OPEN: ProtocolAction;
export declare const FIXTURE_CANVAS_UPDATE_SET: ProtocolAction;
export declare const FIXTURE_CANVAS_UPDATE_APPEND: ProtocolAction;
export declare const FIXTURE_CANVAS_UPDATE_MODIFY: ProtocolAction;
export declare const FIXTURE_CANVAS_CLOSE: ProtocolAction;
export declare const FIXTURE_APP_ACTION_CORE_CONSOLE: ProtocolAction;
export declare const FIXTURE_APP_ACTION_SET_THEME: ProtocolAction;
export declare const FIXTURE_APP_ACTION_SET_SEND_ERROR: ProtocolAction;
export declare const FIXTURE_STREAM_TWO_BLOCKS: string;
export declare const FIXTURE_STREAM_SPLIT_CHUNKS: {
    chunk1: string;
    chunk2: string;
};
export declare const FIXTURE_STREAM_FENCE_SPLIT: {
    chunk1: string;
    chunk2: string;
};
export declare const FIXTURE_STREAM_NESTED_JSON = "```json\n{\"message_type\":\"CHAT_MESSAGE\",\"message_id\":\"msg-nested\",\"message_role\":\"ASSISTANT\",\"message_target\":\"CHAT\",\"message_contents\":[{\"content_id\":\"c-nested\",\"content_type\":\"CHAT_CONTENT_MARKDOWN\",\"content_queue\":\"main\",\"content_data\":{\"markdown\":\"He said \\\"hello\\\" and {brackets} are fine.\"}}]}\n```";
export declare const FIXTURE_STREAM_NON_PROTOCOL_FENCE = "```typescript\nconst x: number = 42;\n```";
export declare const FIXTURE_STREAM_UPPERCASE_JSON = "```JSON\n{\"message_type\":\"CHAT_MESSAGE\"}\n```";
export declare const FIXTURE_STREAM_DEBUG_SPLIT: {
    chunk1: string;
    chunk2: string;
};
//# sourceMappingURL=positive.d.ts.map