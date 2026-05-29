---
description: "Usage examples for APP_ACTION_SET_SEND_ERROR."
---

> **📚 [Communication Protocol](../README.md)**

> **📝 [Type Usage Examples](./README.md)**

> **🔧 [Type Specification](../type-specifications/APP_ACTION_SET_SEND_ERROR.md)**

# `APP_ACTION_SET_SEND_ERROR` Usage Examples

## Entity Not Found With Recovery Hints

```json
{
  "message_id": "msg-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "msg-001-content-set-send-error",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-001-action-set-send-error-entity-not-found",
          "action_type": "APP_ACTION_SET_SEND_ERROR",
          "action_data": {
            "target": "APP",
            "error_kind": "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindEntityNotFound",
            "message": "I couldn't find a organization matching \"Zenthrova Industries\".",
            "recovery_hints": [
              {
                "hint_id": "entity-not-found-try-url",
                "hint_type": "RECOVERY_HINT_TYPE_TRY_URL",
                "label": "Provide a website URL instead",
                "description": "A URL usually works better than a fuzzy organization name.",
                "placeholder": "Paste a website URL like example.com",
                "style": "RECOVERY_HINT_STYLE_PRIMARY"
              },
              {
                "hint_id": "entity-not-found-clear-and-refocus",
                "hint_type": "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS",
                "label": "Try a different name or spelling",
                "description": "Use the official organization name, city, or another distinctive hint.",
                "placeholder": "Try the official organization name or add a city",
                "style": "RECOVERY_HINT_STYLE_SECONDARY"
              }
            ],
            "diagnostics": {
              "thread_id": "thread_123",
              "message_id": "msg-001",
              "pipeline_name": "search_refinement",
              "source": "ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL",
              "timestamp": "2026-04-01T09:15:00.000Z"
            }
          }
        }
      }
    },
    {
      "content_id": "msg-001-content-placeholder",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-001-action-set-input-placeholder-entity-not-found",
          "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
          "action_data": {
            "target": "APP",
            "placeholder": "Paste a website URL like example.com or try the official organization name"
          }
        }
      }
    },
    {
      "content_id": "msg-001-content-wait",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-001-action-wait",
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

## System Error With Retry

```json
{
  "message_id": "msg-002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "msg-002-content-set-send-error",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-002-action-set-send-error-system-error",
          "action_type": "APP_ACTION_SET_SEND_ERROR",
          "action_data": {
            "target": "APP",
            "error_kind": "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindSystemError",
            "message": "Something went wrong while preparing your request. Please try again.",
            "recovery_hints": [
              {
                "hint_id": "system-error-retry",
                "hint_type": "RECOVERY_HINT_TYPE_RETRY",
                "label": "Retry now",
                "description": "Try the same request again.",
                "style": "RECOVERY_HINT_STYLE_PRIMARY"
              }
            ],
            "diagnostics": {
              "message_id": "msg-002",
              "pipeline_name": "chat_orchestrator",
              "source": "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT",
              "status_code": 500
            }
          }
        }
      }
    }
  ]
}
```
