/**
 * Golden negative fixtures — must be rejected by strict validation.
 */

export const FIXTURE_INVALID_EMPTY_CONTENTS = {
  message_id: "fixture-msg-invalid-empty-001",
  message_type: "CHAT_MESSAGE",
  message_role: "ASSISTANT",
  message_target: "CHAT",
  message_contents: [],
} as const;

export const FIXTURE_INVALID_TARGET_CANVAS = {
  message_id: "fixture-msg-invalid-target-canvas-001",
  message_type: "CHAT_MESSAGE",
  message_role: "ASSISTANT",
  message_target: "CANVAS",
  message_contents: [
    {
      content_id: "fixture-content-001",
      content_type: "CHAT_CONTENT_MARKDOWN",
      content_queue: "main",
      content_data: { markdown: "This should not have CANVAS target." },
    },
  ],
} as const;

export const FIXTURE_INVALID_TARGET_APP = {
  message_id: "fixture-msg-invalid-target-app-001",
  message_type: "CHAT_MESSAGE",
  message_role: "ASSISTANT",
  message_target: "APP",
  message_contents: [
    {
      content_id: "fixture-content-002",
      content_type: "CHAT_CONTENT_MARKDOWN",
      content_queue: "main",
      content_data: { markdown: "This should not have APP target." },
    },
  ],
} as const;

export const FIXTURE_INVALID_SYSTEM_ROLE = {
  message_id: "fixture-msg-invalid-role-001",
  message_type: "CHAT_MESSAGE",
  message_role: "SYSTEM",
  message_target: "CHAT",
  message_contents: [
    {
      content_id: "c-002",
      content_type: "CHAT_CONTENT_MARKDOWN",
      content_queue: "main",
      content_data: { markdown: "x" },
    },
  ],
} as const;

export const FIXTURE_INVALID_BLANK_QUEUE = {
  message_id: "fixture-msg-invalid-blankqueue-001",
  message_type: "CHAT_MESSAGE",
  message_role: "ASSISTANT",
  message_target: "CHAT",
  message_contents: [
    {
      content_id: "fixture-content-003",
      content_type: "CHAT_CONTENT_MARKDOWN",
      content_queue: "",
      content_data: { markdown: "Content with blank queue." },
    },
  ],
} as const;

export const FIXTURE_INVALID_UNKNOWN_TARGET = {
  action_id: "fixture-action-invalid-target-001",
  action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE",
  action_data: {
    target: "UNKNOWN",
    role: "USER",
    text: "Hello",
  },
} as const;

export const FIXTURE_INVALID_UNKNOWN_TARGET_ACTION = FIXTURE_INVALID_UNKNOWN_TARGET;

export const FIXTURE_INVALID_UPPERCASE_JSON_FENCE = "```JSON\n{\"message_type\":\"CHAT_MESSAGE\"}\n```";

export const FIXTURE_INVALID_JAVASCRIPT_FENCE =
  "```javascript\n{\"message_type\":\"CHAT_MESSAGE\"}\n```";
