---
description: "Specification for CHAT_ACTION specialized structure. Specification for CHAT_ACTION in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `CHAT_ACTION` Specification

The `CHAT_ACTION` is a general type representing an instruction for an action to be performed within or related to the chat interface. These actions can range from simulating user input (like sending a message or selecting an option) to directly manipulating UI elements (like updating a button's state, updating panel content, or a progress bar).

`CHAT_ACTION`s are typically defined by an `action_type` which dictates the specific operation and the structure of its associated `action_data`. They are often embedded within `CHAT_CONTENT` objects (e.g., as part of an actionable card or chip) inside a `CHAT_MESSAGE`, but can also be dispatched independently to control or update chat UI components. Each specific type of `CHAT_ACTION` (e.g., `CHAT_ACTION_SEND_TEXT_MESSAGE`, `CHAT_ACTION_CHOOSE_ACTIONABLE_CARD`) has its own detailed specification document.

## General Attributes

All `CHAT_ACTION` objects, regardless of their specific `action_type`, share the following common attributes:

- `action_id` (string, required): A unique identifier for this specific action instance. This ID is crucial for tracking and referencing the action, and is often derived from the `message_id` or `content_id` of the originating message or content element.
- `action_type` (string, required): Defines the specific type of chat action to be performed (e.g., `"CHAT_ACTION_SEND_TEXT_MESSAGE"`, `"CHAT_ACTION_UPDATE_BUTTON"`). This field determines the expected structure and behavior of the `action_data` object.
- `action_data` (object, required): An object containing the data necessary to perform the action. The structure of this object is dependent on the `action_type`.
  - `target` (string, required): Specifies the primary interface or context this action is intended for. For all `CHAT_ACTION` types, this is typically `"CHAT"`.
  - Additional parameters within `action_data` are specific to each `action_type` and are detailed in their respective specification documents.

## JSON Schema Definition for Base `CHAT_ACTION`

This schema represents the common structure for any `CHAT_ACTION`. The specific fields within `action_data` will vary based on the `action_type` and are defined in the schemas for those specific action types.

```json
{
  "type": "object",
  "required": ["action_id", "action_type", "action_data"],
  "properties": {
    "action_id": {
      "type": "string",
      "description": "Unique identifier for this action instance. Often derived from message_id or content_id."
    },
    "action_type": {
      "type": "string",
      "description": "Defines the specific type of chat action (e.g., \"CHAT_ACTION_SEND_TEXT_MESSAGE\")."
    },
    "action_data": {
      "type": "object",
      "required": ["target"],
      "properties": {
        "target": {
          "type": "string",
          "enum": ["CHAT"],
          "description": "Primary interface/context for the action, typically CHAT for chat actions."
        }
      },
      "additionalProperties": true,
      "description": "Action-specific data. Structure depends on action_type."
    }
  }
}
```

## Example Payloads

The following examples illustrate the general structure of a `CHAT_ACTION`. For detailed `action_data` structures and more examples for each specific action type, please refer to their individual specification files.

### Example 1: Conceptual Full Action Payload Example

This shows the basic framework. The `action_data` would be further defined by the specific `action_type`.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-action-01",
  "action_type": "SPECIFIC_CHAT_ACTION_TYPE", // This would be a concrete type like "CHAT_ACTION_SEND_TEXT_MESSAGE"
  "action_data": {
    "target": "CHAT"
    // "specific_key_1": "specific_value_1", // Example of action-specific data
    // "specific_key_2": "specific_value_2"  // These fields depend on the action_type
  }
}
```

### Example 2: Full Action Payload for a Specific Type (`CHAT_ACTION_SEND_TEXT_MESSAGE`)

This is a common action type. The full details for `CHAT_ACTION_SEND_TEXT_MESSAGE` can be found in its own specification file.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-send-confirm",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER", // Specific to CHAT_ACTION_SEND_TEXT_MESSAGE
    "text": "Yes, I confirm." // Specific to CHAT_ACTION_SEND_TEXT_MESSAGE
  }
}
```

## Specific CHAT_ACTION Types

The `CHAT_ACTION` type is a wrapper for various specific actions. Detailed specifications for each available `action_type` can be found in their respective documents in the type-specifications directory:

- [`CHAT_ACTION_BEGIN_SIMULATED_TURN.md`](../type-specifications/CHAT_ACTION_BEGIN_SIMULATED_TURN.md)
- [`CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md`](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)
- [`CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md`](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)
- [`CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md`](../type-specifications/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)
- [`CHAT_ACTION_SEND_TEXT_MESSAGE.md`](../type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md)
- [`CHAT_ACTION_UPDATE_BUTTON.md`](../type-specifications/CHAT_ACTION_UPDATE_BUTTON.md)
- [`CHAT_ACTION_UPDATE_PANEL.md`](../type-specifications/CHAT_ACTION_UPDATE_PANEL.md)
- [`CHAT_ACTION_UPDATE_PROGRESS_BAR.md`](../type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md)
- [`CHAT_ACTION_WAIT_FOR_QUEUES.md`](../type-specifications/CHAT_ACTION_WAIT_FOR_QUEUES.md)

Refer to these documents for the specific `action_data` structure and behavior of each type.
