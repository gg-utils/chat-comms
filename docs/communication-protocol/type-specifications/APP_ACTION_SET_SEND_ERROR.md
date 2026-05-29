---
description: "Specification for APP_ACTION_SET_SEND_ERROR."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **↩️ [APP_ACTION](../specialized-structures/APP_ACTION.md)**

# `APP_ACTION_SET_SEND_ERROR`

Sets the shared structured send-error surface in the client. This action is used for known
failures such as no-match outcomes and for sanitized system failures that should appear in the
chat send-error UI.

## Behavior

- `action_data.error_kind` is required and must use the fully prefixed token set.
- `action_data.message` is the user-facing message rendered in the send-error surface.
- `action_data.recovery_hints` is optional and controls the recovery buttons/chips shown in the UI.
- `action_data.diagnostics` is optional and must contain only sanitized metadata.
- Must be emitted as an `APP_ACTION` inside `CHAT_CONTENT_ACTION_WRAPPER`.
- Does not replace `APP_ACTION_WAIT_FOR_USER_INPUT` when the turn should pause for user input.

## Supported Closed-String Tokens

### `error_kind`

- `ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindEntityNotFound`
- `ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindSystemError`
- `ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindTimeout`
- `ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindNetworkError`
- `ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindProtocolError`

### `recovery_hints[].hint_type`

- `RECOVERY_HINT_TYPE_RETRY`
- `RECOVERY_HINT_TYPE_TRY_URL`
- `RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS`
- `RECOVERY_HINT_TYPE_NEW_SCAN`

### `recovery_hints[].style`

- `RECOVERY_HINT_STYLE_PRIMARY`
- `RECOVERY_HINT_STYLE_SECONDARY`

### `diagnostics.source`

- `ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL`
- `ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT`

## Action Payload

```json
{
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
```

## JSON Schema

```json
{
  "type": "object",
  "required": ["action_id", "action_type", "action_data"],
  "properties": {
    "action_id": { "type": "string" },
    "action_type": { "type": "string", "enum": ["APP_ACTION_SET_SEND_ERROR"] },
    "action_data": {
      "type": "object",
      "required": ["target", "error_kind", "message"],
      "properties": {
        "target": { "type": "string", "enum": ["APP"] },
        "error_kind": {
          "type": "string",
          "enum": [
            "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindEntityNotFound",
            "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindSystemError",
            "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindTimeout",
            "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindNetworkError",
            "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindProtocolError"
          ]
        },
        "message": { "type": "string" },
        "recovery_hints": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["hint_id", "hint_type", "label"],
            "properties": {
              "hint_id": { "type": "string" },
              "hint_type": {
                "type": "string",
                "enum": [
                  "RECOVERY_HINT_TYPE_RETRY",
                  "RECOVERY_HINT_TYPE_TRY_URL",
                  "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS",
                  "RECOVERY_HINT_TYPE_NEW_SCAN"
                ]
              },
              "label": { "type": "string" },
              "description": { "type": "string" },
              "placeholder": { "type": "string" },
              "style": {
                "type": "string",
                "enum": ["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]
              }
            },
            "additionalProperties": false
          }
        },
        "diagnostics": {
          "type": "object",
          "required": ["source"],
          "properties": {
            "diagnostic_id": { "type": "string" },
            "thread_id": { "type": "string" },
            "message_id": { "type": "string" },
            "pipeline_name": { "type": "string" },
            "source": {
              "type": "string",
              "enum": [
                "ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL",
                "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"
              ]
            },
            "timestamp": { "type": "string" },
            "status_code": { "type": "number" },
            "retry_count": { "type": "number" }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  }
}
```
