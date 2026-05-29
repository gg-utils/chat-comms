---
description: "Specification for APP_ACTION specialized structure. Specification for APP_ACTION in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `APP_ACTION` Specification

The `APP_ACTION` is a general type representing an instruction for an action that affects the overall application state or behavior, rather than a specific interface like chat or canvas. These actions are typically used for global operations such as changing themes, updating user preferences, or triggering application-wide events like refreshing a list of conversations.

`APP_ACTION`s are defined by an `action_type` which dictates the specific operation and the structure of its associated `action_data`. They can be initiated by the Assistant or potentially by user interactions with global UI elements. Each specific type of `APP_ACTION` (e.g., `APP_ACTION_SET_THEME`, `APP_ACTION_USER_PREFERENCE_UPDATE`) has its own detailed specification document.

## General Attributes

All `APP_ACTION` objects, regardless of their specific `action_type`, share the following common attributes:

- `action_id` (string, required): A unique identifier for this specific action instance. This ID is crucial for tracking and referencing the action. It might be derived from a `message_id` if the action is a consequence of a message, or generated independently for UI-initiated or system-initiated app actions.
- `action_type` (string, required): Defines the specific type of app action to be performed (e.g., `"APP_ACTION_SET_THEME"`, `"APP_ACTION_THREAD_LIST_REFRESH"`). This field determines the expected structure and behavior of the `action_data` object.
- `action_data` (object, required): An object containing the data necessary to perform the action. The structure of this object is dependent on the `action_type`.
  - `target` (string, required): Specifies the primary interface or context this action is intended for. For all `APP_ACTION` types, this must be `"APP"`.
  - Additional parameters within `action_data` are specific to each `action_type` and are detailed in their respective specification documents.

## JSON Schema Definition for Base `APP_ACTION`

This schema represents the common structure for any `APP_ACTION`. The specific fields within `action_data` will vary based on the `action_type` and are defined in the schemas for those specific action types.

```json
{
  "type": "object",
  "required": ["action_id", "action_type", "action_data"],
  "properties": {
    "action_id": {
      "type": "string",
      "description": "Unique identifier for this action instance."
    },
    "action_type": {
      "type": "string",
      "description": "Defines the specific type of app action (e.g., \"APP_ACTION_SET_THEME\")."
    },
    "action_data": {
      "type": "object",
      "required": ["target"],
      "properties": {
        "target": {
          "type": "string",
          "enum": ["APP"],
          "description": "Primary interface/context for the action, must be APP for app actions."
        }
      },
      "additionalProperties": true,
      "description": "Action-specific data. Structure depends on action_type."
    }
  }
}
```

## Example Payloads

The following examples illustrate the general structure of an `APP_ACTION`. For detailed `action_data` structures and more examples for each specific action type, please refer to their individual specification files.

### Example 1: Conceptual Full Action Payload Example

This shows the basic framework. The `action_data` would be further defined by the specific `action_type`.

**Action Payload**

```json
{
  "action_id": "app-action-unique-id-001",
  "action_type": "SPECIFIC_APP_ACTION_TYPE", // This would be a concrete type like "APP_ACTION_SET_THEME"
  "action_data": {
    "target": "APP"
    // "specific_key_1": "specific_value_1", // Example of action-specific data
    // "specific_key_2": "specific_value_2"  // These fields depend on the action_type
  }
}
```

### Example 2: Full Action Payload for a Specific Type (`APP_ACTION_SET_THEME`)

This is a common action type. The full details for `APP_ACTION_SET_THEME` can be found in its own specification file.

**Action Payload**

```json
{
  "action_id": "message-123-action-set-theme-dark",
  "action_type": "APP_ACTION_SET_THEME",
  "action_data": {
    "target": "APP",
    "theme_name": "dark" // Specific to APP_ACTION_SET_THEME
  }
}
```

## Specific APP_ACTION Types

The `APP_ACTION` type is a wrapper for various specific actions. Detailed specifications for each available `action_type` can be found in their respective documents in the type-specifications directory:

- [`APP_ACTION_SET_THEME.md`](../type-specifications/APP_ACTION_SET_THEME.md)
- [`APP_ACTION_THREAD_LIST_REFRESH.md`](../type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md)
- [`APP_ACTION_USER_PREFERENCE_UPDATE.md`](../type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md)
- [`APP_ACTION_CORE_CONSOLE.md`](../type-specifications/APP_ACTION_CORE_CONSOLE.md)
- [`APP_ACTION_SET_SEND_ERROR.md`](../type-specifications/APP_ACTION_SET_SEND_ERROR.md)
- [`APP_ACTION_SET_INPUT_PLACEHOLDER.md`](../type-specifications/APP_ACTION_SET_INPUT_PLACEHOLDER.md)
- [`APP_ACTION_WAIT_FOR_USER_INPUT.md`](../type-specifications/APP_ACTION_WAIT_FOR_USER_INPUT.md)

Refer to these documents for the specific `action_data` structure and behavior of each type.
