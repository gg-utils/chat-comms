---
description: "Specification for APP_ACTION_WAIT_FOR_USER_INPUT."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **↩️ [APP_ACTION](../specialized-structures/APP_ACTION.md)**

# `APP_ACTION_WAIT_FOR_USER_INPUT`

Signals that processing should pause until the user provides input or interaction.

## Behavior

- `action_data.focus_target` is optional:
  - `CHAT_INPUT` focuses the chat input.
  - `CANVAS` focuses the canvas container.
  - `NONE` leaves focus unchanged.
- If `focus_target` is omitted, clients should default to `CHAT_INPUT`.
- Must be emitted as an `APP_ACTION` inside `CHAT_CONTENT_ACTION_WRAPPER`.
- Typically placed as the last content item in a message when gating the next step.

## Action Payload

```json
{
  "action_id": "msg-001-action-wait",
  "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
  "action_data": {
    "target": "APP",
    "focus_target": "CANVAS"
  }
}
```

## JSON Schema

```json
{
  "type": "object",
  "required": ["action_id", "action_type", "action_data"],
  "properties": {
    "action_id": { "type": "string" },
    "action_type": { "type": "string", "enum": ["APP_ACTION_WAIT_FOR_USER_INPUT"] },
    "action_data": {
      "type": "object",
      "properties": {
        "target": { "type": "string", "enum": ["APP"] },
        "focus_target": {
          "type": "string",
          "enum": ["CHAT_INPUT", "CANVAS", "NONE"]
        }
      },
      "additionalProperties": false
    }
  }
}
```
