---
description: "Specification for CHAT_CONTENT_ACTION_WRAPPER in the communication protocol. This file defines the complete specification and implementation guidance for wrapping action objects as content within chat messages for sequential processing. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/CHAT_CONTENT_ACTION_WRAPPER.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **📝 [Usage Examples](../type-usage-examples/CHAT_CONTENT_ACTION_WRAPPER.md)**

# CHAT_CONTENT_ACTION_WRAPPER Specification

## Specification

### Type Definition

`CHAT_CONTENT_ACTION_WRAPPER` is a specialized content type that allows action objects to be embedded as content within chat messages. This wrapper enables actions to be delivered through the primary content channel while maintaining the clear distinction between content display and action execution.

### Properties

| Property              | Type   | Required | Default        | Description                                                                                                                                                                                                                             |
| --------------------- | ------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`          | string | Yes      |                | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`        | string | Yes      |                | Must be `"CHAT_CONTENT_ACTION_WRAPPER"`                                                                                                                                                                                                 |
| `content_width`       | string | No       | `"WIDTH_AUTO"` | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`       | string | No       | `"main"`       | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`       | number | No       | `undefined`    | Milliseconds to delay AFTER this content finishes processing, BEFORE the next item in the same queue begins. Useful for creating natural pacing between action executions.                                                              |
| `content_data.action` | object | Yes      |                | The actual action object that is being wrapped. Must conform to the Base Action Schema.                                                                                                                                                 |

## Example Full Content Payload

This is an example of a `CHAT_CONTENT_ACTION_WRAPPER` content object:

**Content Payload**

```json
{
  "content_id": "chatmessage-0000001-content-03-chat-action-wrapper",
  "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
  "content_width": "WIDTH_AUTO",
  "content_data": {
    "action": {
      "action_id": "chatmessage-0000001-pbu-1",
      "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
      "action_data": {
        "target": "CHAT",
        "progress_bar_content_id": "chatmessage-0000001-content-02-progress-bar",
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 30,
        "progress_bar_current_animation_duration_ms": 1000,
        "progress_bar_next_goal_delay_ms": 200,
        "progress_bar_next_goal_percentage": 50,
        "progress_bar_next_goal_animation_duration_ms": 1500,
        "progress_bar_message": "Gathering information..."
      }
    }
  }
}
```

## JSON Schema Definition

```json
{
  "type": "object",
  "title": "Chat Content Action Wrapper Schema",
  "description": "A wrapper to allow an action object to be sent as a chat content type within a message.",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this chat action wrapper content. Follows the pattern: {message_id}-content-{number}-chat-action-wrapper",
      "examples": ["chatmessage-0000001-content-02-chat-action-wrapper"]
    },
    "content_type": {
      "type": "string",
      "enum": ["CHAT_CONTENT_ACTION_WRAPPER"],
      "description": "The specific type of content, which is CHAT_CONTENT_ACTION_WRAPPER."
    },
    "content_width": {
      "type": "string",
      "enum": ["WIDTH_AUTO", "WIDTH_FULL"],
      "default": "WIDTH_AUTO",
      "description": "Optional width behavior for the content element. Defaults to WIDTH_AUTO."
    },
    "content_queue": {
      "type": "string",
      "default": "main",
      "description": "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    },
    "content_delay": {
      "type": "number",
      "description": "Milliseconds to delay AFTER this content finishes processing, BEFORE the next item in the same queue begins."
    },
    "content_data": {
      "type": "object",
      "required": ["action"],
      "properties": {
        "action": {
          "$ref": "../../schemas.md#/definitions/BaseAction",
          "description": "The complete action object being wrapped. This must conform to the Base Action Schema."
        }
      }
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const baseActionSchema = z.object({
  action_id: z.string().regex(/^[a-zA-Z0-9_-]+-[a-zA-Z0-9_-]+$/),
  action_type: z.string(),
  action_data: z.object({}).passthrough(), // Allows any structure for action_data
});

const chatContentActionWrapperDataSchema = z.object({
  action: baseActionSchema,
});

const chatContentActionWrapperSchema = z.object({
  content_id: z.string().regex(/^[a-zA-Z0-9_-]+-content-\\d+-chat-action-wrapper$/),
  content_type: z.literal("CHAT_CONTENT_ACTION_WRAPPER"),
  content_width: z.enum(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO").optional(),
  content_queue: z.string().default("main").optional(),
  content_delay: z.number().optional(),
  content_data: chatContentActionWrapperDataSchema,
});
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const baseActionSchema = Joi.object({
  action_id: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]+-[a-zA-Z0-9_-]+$/)
    .required(),
  action_type: Joi.string().required(),
  action_data: Joi.object().unknown(true).required(), // Allows any structure for action_data
});

const chatContentActionWrapperDataSchema = Joi.object({
  action: baseActionSchema.required(),
});

const chatContentActionWrapperSchema = Joi.object({
  content_id: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]+-content-\\d+-chat-action-wrapper$/)
    .required(),
  content_type: Joi.string().valid("CHAT_CONTENT_ACTION_WRAPPER").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number().optional(),
  content_data: chatContentActionWrapperDataSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const baseActionSchema = yup.object().shape({
  action_id: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]+-[a-zA-Z0-9_-]+$/)
    .required(),
  action_type: yup.string().required(),
  action_data: yup.object().required(), // Allows any structure for action_data
});

const chatContentActionWrapperDataSchema = yup.object().shape({
  action: baseActionSchema.required(),
});

const chatContentActionWrapperSchema = yup.object().shape({
  content_id: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]+-content-\\d+-chat-action-wrapper$/)
    .required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_ACTION_WRAPPER"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number().optional(),
  content_data: chatContentActionWrapperDataSchema.required(),
});
```

**Fields:**

- `content_id` (string, required): A unique identifier for this specific chat content wrapper.
- `content_type` (string, required): Must be `"CHAT_CONTENT_ACTION_WRAPPER"`.
- `content_width` (string, optional): Width behavior for the content element. Defaults to `"WIDTH_AUTO"`. Accepted values are `"WIDTH_AUTO"` and `"WIDTH_FULL"`.
- `content_queue` (string, optional): Named queue for parallel content processing. Defaults to `"main"`. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details.
- `content_data` (object, required):
  - `action` (object, required): The actual action object that is being wrapped. This object must conform to the [Base Action Schema](../../schemas.md#base-action-schema), including `action_id`, `action_type`, and `action_data`.

## Full Message Example

This example demonstrates wrapping a `CHAT_ACTION_UPDATE_PROGRESS_BAR` action to be sent as content within a full message. This is useful when the assistant needs to send an update to an existing progress bar as a new piece of information in the chat flow.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000001-content-01-markdown",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Starting a long process..."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-progress-bar",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 0,
        "progress_bar_current_animation_duration_ms": 800,
        "progress_bar_next_goal_delay_ms": 300,
        "progress_bar_next_goal_percentage": 30,
        "progress_bar_next_goal_animation_duration_ms": 1000,
        "progress_bar_message": "Initializing..."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-03-chat-action-wrapper",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-pbu-1", // Note: action_id should be unique and linked to the message_id
          "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
          "action_data": {
            "target": "CHAT",
            "progress_bar_content_id": "chatmessage-0000001-content-02-progress-bar", // ID of the progress bar to update
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 30,
            "progress_bar_current_animation_duration_ms": 1000,
            "progress_bar_next_goal_delay_ms": 200,
            "progress_bar_next_goal_percentage": 50,
            "progress_bar_next_goal_animation_duration_ms": 1500,
            "progress_bar_message": "Gathering information..."
          }
        }
      }
    }
  ]
}
```

In this example:

1. A markdown message is sent.
2. A progress bar (`CHAT_CONTENT_PROGRESS_BAR`) is initially displayed.
3. Subsequently, a `CHAT_CONTENT_ACTION_WRAPPER` is sent. This wrapper contains a `CHAT_ACTION_UPDATE_PROGRESS_BAR` action, which targets the previously created progress bar to update its state and message.

This allows the UI to process the `CHAT_ACTION_UPDATE_PROGRESS_BAR` by finding the `CHAT_CONTENT_ACTION_WRAPPER` in the `message_contents` and then extracting the action from its `content_data`.

## When to Use

- Use `CHAT_CONTENT_ACTION_WRAPPER` when you need to send an action as a direct content item within the `message_contents` array, specifically for chat-related UI updates.
- This is particularly relevant for actions that update existing UI elements (like progress bars, buttons) and these updates are considered part of the sequential flow of content from the assistant within the chat interface.
- It should **not** be used for actions that are triggered by user interaction with other content elements (e.g., actions within a `CHAT_CONTENT_BUTTON` or `CHAT_CONTENT_ACTIONABLE_CARDS`). In those cases, the actions are already part of the content definition.

By using `CHAT_CONTENT_ACTION_WRAPPER`, the protocol maintains a clear distinction between content display and actions, while still allowing actions to be delivered through the primary content channel when necessary for chat interactions.

## Usage Examples

### Using content_delay and content_queue

The `content_delay` and `content_queue` properties enable fine-grained control over timing and parallel processing of wrapped action content.

**Example: Progress bar update with delay before next action**

```json
{
  "content_id": "msg-001-content-03-action-wrapper",
  "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
  "content_queue": "main",
  "content_delay": 1000,
  "content_data": {
    "action": {
      "action_id": "msg-001-pbu-1",
      "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
      "action_data": {
        "target": "CHAT",
        "progress_bar_content_id": "msg-001-content-02-progress-bar",
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 50,
        "progress_bar_current_animation_duration_ms": 800,
        "progress_bar_message": "Analyzing data..."
      }
    }
  }
}
```

In this example:

- `content_queue: "main"` processes the action in the main content queue
- `content_delay: 1000` adds a 1-second pause after the progress bar update executes, before the next action in the queue begins

**Example: Sequential action wrappers with paced timing**

```json
[
  {
    "content_id": "msg-001-content-04-action-wrapper",
    "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
    "content_queue": "updates",
    "content_delay": 500,
    "content_data": {
      "action": {
        "action_id": "msg-001-pbu-2",
        "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
        "action_data": {
          "target": "CHAT",
          "progress_bar_content_id": "msg-001-content-02-progress-bar",
          "progress_bar_current_percentage": 75,
          "progress_bar_message": "Processing results..."
        }
      }
    }
  },
  {
    "content_id": "msg-001-content-05-action-wrapper",
    "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
    "content_queue": "updates",
    "content_data": {
      "action": {
        "action_id": "msg-001-pbu-3",
        "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
        "action_data": {
          "target": "CHAT",
          "progress_bar_content_id": "msg-001-content-02-progress-bar",
          "progress_bar_current_percentage": 100,
          "progress_bar_state": "COMPLETED",
          "progress_bar_message": "Complete!"
        }
      }
    }
  }
]
```

In this example:

- Both wrappers use `content_queue: "updates"` to process sequentially in a dedicated queue
- The first wrapper has `content_delay: 500` to pause before the completion update
- The second wrapper (last in queue) has no delay as it's the final action

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_ACTION_WRAPPER Usage Examples](../type-usage-examples/CHAT_CONTENT_ACTION_WRAPPER.md)**
