/**
 * Golden negative fixtures — must be rejected by strict validation.
 */
export declare const FIXTURE_INVALID_EMPTY_CONTENTS: {
    readonly message_id: "fixture-msg-invalid-empty-001";
    readonly message_type: "CHAT_MESSAGE";
    readonly message_role: "ASSISTANT";
    readonly message_target: "CHAT";
    readonly message_contents: readonly [];
};
export declare const FIXTURE_INVALID_TARGET_CANVAS: {
    readonly message_id: "fixture-msg-invalid-target-canvas-001";
    readonly message_type: "CHAT_MESSAGE";
    readonly message_role: "ASSISTANT";
    readonly message_target: "CANVAS";
    readonly message_contents: readonly [{
        readonly content_id: "fixture-content-001";
        readonly content_type: "CHAT_CONTENT_MARKDOWN";
        readonly content_queue: "main";
        readonly content_data: {
            readonly markdown: "This should not have CANVAS target.";
        };
    }];
};
export declare const FIXTURE_INVALID_TARGET_APP: {
    readonly message_id: "fixture-msg-invalid-target-app-001";
    readonly message_type: "CHAT_MESSAGE";
    readonly message_role: "ASSISTANT";
    readonly message_target: "APP";
    readonly message_contents: readonly [{
        readonly content_id: "fixture-content-002";
        readonly content_type: "CHAT_CONTENT_MARKDOWN";
        readonly content_queue: "main";
        readonly content_data: {
            readonly markdown: "This should not have APP target.";
        };
    }];
};
export declare const FIXTURE_INVALID_SYSTEM_ROLE: {
    readonly message_id: "fixture-msg-invalid-role-001";
    readonly message_type: "CHAT_MESSAGE";
    readonly message_role: "SYSTEM";
    readonly message_target: "CHAT";
    readonly message_contents: readonly [{
        readonly content_id: "c-002";
        readonly content_type: "CHAT_CONTENT_MARKDOWN";
        readonly content_queue: "main";
        readonly content_data: {
            readonly markdown: "x";
        };
    }];
};
export declare const FIXTURE_INVALID_BLANK_QUEUE: {
    readonly message_id: "fixture-msg-invalid-blankqueue-001";
    readonly message_type: "CHAT_MESSAGE";
    readonly message_role: "ASSISTANT";
    readonly message_target: "CHAT";
    readonly message_contents: readonly [{
        readonly content_id: "fixture-content-003";
        readonly content_type: "CHAT_CONTENT_MARKDOWN";
        readonly content_queue: "";
        readonly content_data: {
            readonly markdown: "Content with blank queue.";
        };
    }];
};
export declare const FIXTURE_INVALID_UNKNOWN_TARGET: {
    readonly action_id: "fixture-action-invalid-target-001";
    readonly action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
    readonly action_data: {
        readonly target: "UNKNOWN";
        readonly role: "USER";
        readonly text: "Hello";
    };
};
export declare const FIXTURE_INVALID_UNKNOWN_TARGET_ACTION: {
    readonly action_id: "fixture-action-invalid-target-001";
    readonly action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
    readonly action_data: {
        readonly target: "UNKNOWN";
        readonly role: "USER";
        readonly text: "Hello";
    };
};
export declare const FIXTURE_INVALID_UPPERCASE_JSON_FENCE = "```JSON\n{\"message_type\":\"CHAT_MESSAGE\"}\n```";
export declare const FIXTURE_INVALID_JAVASCRIPT_FENCE = "```javascript\n{\"message_type\":\"CHAT_MESSAGE\"}\n```";
//# sourceMappingURL=negative.d.ts.map