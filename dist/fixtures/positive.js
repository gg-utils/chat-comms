/**
 * Golden positive fixtures for protocol validation and parity testing.
 */
export const FIXTURE_MINIMAL_CHAT_MESSAGE = {
    message_id: "fixture-msg-minimal-001",
    message_type: "CHAT_MESSAGE",
    message_role: "ASSISTANT",
    message_target: "CHAT",
    message_contents: [
        {
            content_id: "fixture-msg-minimal-001-markdown-intro",
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_queue: "main",
            content_data: { markdown: "Hello, how can I help you today?" },
        },
    ],
};
export const FIXTURE_MINIMAL_CHAT_MESSAGE_FENCED = `\`\`\`json
${JSON.stringify(FIXTURE_MINIMAL_CHAT_MESSAGE, null, 2)}
\`\`\``;
export const FIXTURE_DEBUG_MESSAGE = {
    debug: true,
    message_id: "fixture-msg-debug-001",
    message_type: "CHAT_MESSAGE",
    message_role: "ASSISTANT",
    message_target: "CHAT",
    message_contents: [
        {
            content_id: "fixture-msg-debug-001-markdown-diag",
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_queue: "main",
            content_data: { markdown: "[DEBUG] Internal pipeline diagnostic output." },
        },
    ],
};
export const FIXTURE_NON_DEBUG_MESSAGE = {
    message_id: "fixture-msg-nondebug-001",
    message_type: "CHAT_MESSAGE",
    message_role: "ASSISTANT",
    message_target: "CHAT",
    message_contents: [
        {
            content_id: "fixture-msg-nondebug-001-markdown-body",
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_queue: "main",
            content_data: { markdown: "This is visible user content." },
        },
    ],
};
export const FIXTURE_DEBUG_FENCED_BLOCK = `\`\`\`json
${JSON.stringify(FIXTURE_DEBUG_MESSAGE, null, 2)}
\`\`\``;
export const FIXTURE_NON_DEBUG_FENCED_BLOCK = `\`\`\`json
${JSON.stringify(FIXTURE_NON_DEBUG_MESSAGE, null, 2)}
\`\`\``;
export const FIXTURE_WAIT_FOR_QUEUES_DRAIN = {
    action_id: "fixture-action-wait-drain-001",
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
    action_data: {
        target: "CHAT",
        queue_names: ["website", "reasoning"],
        wait_mode: "DRAIN",
    },
};
export const FIXTURE_WAIT_FOR_QUEUES_IDLE = {
    action_id: "fixture-action-wait-idle-001",
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
    action_data: {
        target: "CHAT",
        queue_names: ["website"],
        wait_mode: "IDLE",
    },
};
export const FIXTURE_WAIT_FOR_QUEUES_CONTENT_IDS = {
    action_id: "fixture-action-wait-contentids-001",
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
    action_data: {
        target: "CHAT",
        queue_names: ["website"],
        wait_mode: "CONTENT_IDS",
        content_ids: ["content-website-panel-001", "content-website-panel-002"],
        timeout_ms: 30000,
        on_timeout: "CONTINUE",
    },
};
export const FIXTURE_CANVAS_CONTENT_HTML = {
    content_id: "fixture-canvas-html-001",
    content_type: "CANVAS_CONTENT_HTML",
    content_data: {
        html: "<div class='canvas-header'><h1>Workspace Name</h1><p>Description</p></div>",
        toc_label: "Header",
        toc_key: "header-section",
    },
};
export const FIXTURE_CANVAS_CONTENT_MARKDOWN = {
    content_id: "fixture-canvas-md-001",
    content_type: "CANVAS_CONTENT_MARKDOWN",
    content_data: {
        markdown: "## About\n\nReusable canvas markdown content.",
        markdown_style: "DEFAULT",
    },
};
export const FIXTURE_CANVAS_CONTENT_SECTION = {
    content_id: "fixture-canvas-section-001",
    content_type: "CANVAS_CONTENT_SECTION",
    content_data: {
        section_title: "Services",
        section_collapsed: false,
        section_style: "DEFAULT",
        section_contents: [
            {
                content_id: "fixture-canvas-section-child-md-001",
                content_type: "CANVAS_CONTENT_MARKDOWN",
                content_data: {
                    markdown: "### Web Development\n\nFull-stack solutions.",
                },
            },
        ],
    },
};
export const FIXTURE_CANVAS_OPEN = {
    action_id: "fixture-action-canvas-open-001",
    action_type: "CANVAS_ACTION_OPEN",
    action_data: {
        target: "CANVAS",
        canvas_id: "fixture-canvas-001",
        canvas_title_label: "Workspace Preview",
    },
};
export const FIXTURE_CANVAS_UPDATE_SET = {
    action_id: "fixture-action-canvas-update-set-001",
    action_type: "CANVAS_ACTION_UPDATE",
    action_data: {
        target: "CANVAS",
        canvas_id: "fixture-canvas-001",
        canvas_operation: "SET_CONTENTS",
    },
};
export const FIXTURE_CANVAS_UPDATE_APPEND = {
    action_id: "fixture-action-canvas-update-append-001",
    action_type: "CANVAS_ACTION_UPDATE",
    action_data: {
        target: "CANVAS",
        canvas_id: "fixture-canvas-001",
        canvas_operation: "APPEND_CONTENT",
        append_contents: {
            canvas_insert_position: "BOTTOM",
            contents: [FIXTURE_CANVAS_CONTENT_MARKDOWN],
        },
    },
};
export const FIXTURE_CANVAS_UPDATE_MODIFY = {
    action_id: "fixture-action-canvas-update-modify-001",
    action_type: "CANVAS_ACTION_UPDATE",
    action_data: {
        target: "CANVAS",
        canvas_id: "fixture-canvas-001",
        canvas_operation: "MODIFY_CONTENT",
        modify_contents: {
            target_content_id: "fixture-canvas-content-html-001",
            modification_type: "REVEAL",
            new_content_data: {
                html: "<div class='canvas-section'>Revealed content</div>",
            },
        },
    },
};
export const FIXTURE_CANVAS_CLOSE = {
    action_id: "fixture-action-canvas-close-001",
    action_type: "CANVAS_ACTION_CLOSE",
    action_data: {
        target: "CANVAS",
        canvas_id: "fixture-canvas-001",
    },
};
export const FIXTURE_APP_ACTION_CORE_CONSOLE = {
    action_id: "fixture-action-app-console-001",
    action_type: "APP_ACTION_CORE_CONSOLE",
    action_data: {
        target: "APP",
        level: "info",
        message: "Pipeline started",
        source: "pipeline:discovery",
        timestamp: "2026-05-24T18:00:00.000Z",
    },
};
export const FIXTURE_APP_ACTION_SET_THEME = {
    action_id: "fixture-action-app-theme-001",
    action_type: "APP_ACTION_SET_THEME",
    action_data: {
        target: "APP",
        theme_name: "dark",
    },
};
export const FIXTURE_APP_ACTION_SET_SEND_ERROR = {
    action_id: "fixture-action-app-senderror-001",
    action_type: "APP_ACTION_SET_SEND_ERROR",
    action_data: {
        target: "APP",
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT",
        message: "The request timed out. Please try again.",
        recovery_hints: [
            {
                hint_id: "hint-retry-001",
                hint_type: "RECOVERY_HINT_TYPE_RETRY",
                label: "Try Again",
                style: "RECOVERY_HINT_STYLE_PRIMARY",
            },
        ],
    },
};
export const FIXTURE_STREAM_TWO_BLOCKS = [
    "Here is some introduction text.\n\n",
    '```json\n{"message_type":"CHAT_MESSAGE","message_role":"ASSISTANT","message_target":"CHAT","message_id":"msg-001","message_contents":[{"content_id":"c-001","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"First block"}}]}\n```\n\n',
    "Some text between blocks.\n\n",
    '```json\n{"message_type":"CHAT_MESSAGE","message_role":"ASSISTANT","message_target":"CHAT","message_id":"msg-002","message_contents":[{"content_id":"c-002","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"Second block"}}]}\n```',
].join("");
export const FIXTURE_STREAM_SPLIT_CHUNKS = {
    chunk1: '```json\n{"message_type":"CHAT_MESSAGE","message_role":"ASSISTANT","message_target":"CHAT","message_id":"msg-split","message_contents":[{"content_id":"c-split","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"split content"}',
    chunk2: '}]}\n```',
};
export const FIXTURE_STREAM_FENCE_SPLIT = {
    chunk1: '```json\n{"message_type":"CHAT_MESSAGE","message_id":"msg-fencesplit","message_role":"ASSISTANT","message_target":"CHAT","message_contents":[{"content_id":"c-fs","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"text"}}]}\n',
    chunk2: "```\n",
};
export const FIXTURE_STREAM_NESTED_JSON = '```json\n{"message_type":"CHAT_MESSAGE","message_id":"msg-nested","message_role":"ASSISTANT","message_target":"CHAT","message_contents":[{"content_id":"c-nested","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"He said \\"hello\\" and {brackets} are fine."}}]}\n```';
export const FIXTURE_STREAM_NON_PROTOCOL_FENCE = "```typescript\nconst x: number = 42;\n```";
export const FIXTURE_STREAM_UPPERCASE_JSON = '```JSON\n{"message_type":"CHAT_MESSAGE"}\n```';
export const FIXTURE_STREAM_DEBUG_SPLIT = {
    chunk1: '```json\n{"debug":true,"message_type":"CHAT_MESSAGE","message_id":"msg-debug-split","message_role":"ASSISTANT","message_target":"CHAT","message_contents":[{"content_id":"c-dbg","content_type":"CHAT_CONTENT_MARKDOWN","content_queue":"main","content_data":{"markdown":"debug content"}',
    chunk2: '}]}\n```',
};
//# sourceMappingURL=positive.js.map