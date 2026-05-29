---
description: "Usage examples for APP_ACTION_WAIT_FOR_USER_INPUT."
---

> **📚 [Communication Protocol](../README.md)**

> **📝 [Type Usage Examples](./README.md)**

> **🔧 [Type Specification](../type-specifications/APP_ACTION_WAIT_FOR_USER_INPUT.md)**

# `APP_ACTION_WAIT_FOR_USER_INPUT` Usage Examples

## Typical End-Of-Turn Wait

```json
{
  "message_id": "msg-002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "msg-002-content-final",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I found 3 matching workspaces. Choose one to continue."
      }
    },
    {
      "content_id": "msg-002-content-wait",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-002-action-wait",
          "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
          "action_data": {
            "target": "APP",
            "focus_target": "CHAT_INPUT"
          }
        }
      }
    }
  ]
}
```

## With Actionable Chips

```json
{
  "message_id": "msg-003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "msg-003-content-chips",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "Use candidate A",
            "chip_value": "candidate_a",
            "chip_state": "ENABLED",
            "chip_actions": []
          }
        ]
      }
    },
    {
      "content_id": "msg-003-content-wait",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-003-action-wait",
          "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
          "action_data": {
            "target": "APP",
            "focus_target": "CANVAS"
          }
        }
      }
    }
  ]
}
```
