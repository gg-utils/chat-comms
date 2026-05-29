---
description: "Specification for CHAT_MESSAGE in the communication protocol."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **📝 [Usage Examples](../type-usage-examples/CHAT_MESSAGE.md)**

# `CHAT_MESSAGE` Specification

`CHAT_MESSAGE` is the top-level protocol message used to stream chat UI content.

## Attributes

- `message_id` (string, required): Unique identifier for this message.
- `message_type` (string, required): Must be `"CHAT_MESSAGE"`.
- `message_role` (string, required): One of `"USER" | "ASSISTANT" | "SYSTEM"`.
- `message_target` (string, required): Must be `"CHAT"`.
- `message_contents` (array, required): One or more `CHAT_CONTENT_*` items.
- `debug` (boolean, optional): Marks debug messages that the UI may filter.

## Timing And User-Gated Flow

- Use `content_delay` on content items for inter-item pacing.
- Use `APP_ACTION_WAIT_FOR_USER_INPUT` (inside `CHAT_CONTENT_ACTION_WRAPPER`) to pause progression until user interaction.

| Feature                   | Mechanism                        | Scope                     |
| ------------------------- | -------------------------------- | ------------------------- |
| Inter-item delay          | `content_delay`                  | Between content items     |
| Wait for user interaction | `APP_ACTION_WAIT_FOR_USER_INPUT` | Explicit interaction gate |

## Example Payload

```json
{
  "message_id": "msg-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "msg-001-content-intro",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Generation complete. Review and confirm."
      },
      "content_delay": 300
    },
    {
      "content_id": "msg-001-content-wait",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "msg-001-action-wait",
          "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
          "action_data": {}
        }
      }
    }
  ]
}
```

## JSON Schema

```json
{
  "type": "object",
  "required": ["message_id", "message_type", "message_role", "message_target", "message_contents"],
  "properties": {
    "message_id": { "type": "string" },
    "message_type": { "type": "string", "enum": ["CHAT_MESSAGE"] },
    "message_role": { "type": "string", "enum": ["USER", "ASSISTANT", "SYSTEM"] },
    "message_target": { "type": "string", "enum": ["CHAT"] },
    "message_contents": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["content_id", "content_type", "content_data"],
        "properties": {
          "content_id": { "type": "string" },
          "content_type": { "type": "string" },
          "content_delay": { "type": "number", "minimum": 0 },
          "content_data": { "type": "object" }
        }
      }
    },
    "debug": { "type": "boolean" }
  }
}
```

## Zod

```typescript
import { z } from "zod";

const chatContentSchema = z.object({
  content_id: z.string(),
  content_type: z.string(),
  content_delay: z.number().min(0).optional(),
  content_data: z.object({}).passthrough(),
});

export const chatMessageSchema = z.object({
  message_id: z.string(),
  message_type: z.literal("CHAT_MESSAGE"),
  message_role: z.enum(["USER", "ASSISTANT", "SYSTEM"]),
  message_target: z.literal("CHAT"),
  message_contents: z.array(chatContentSchema).min(1),
  debug: z.boolean().optional(),
});
```

## Joi

```javascript
const Joi = require("joi");

const chatContentSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().required(),
  content_delay: Joi.number().min(0),
  content_data: Joi.object().unknown(true).required(),
});

const chatMessageSchema = Joi.object({
  message_id: Joi.string().required(),
  message_type: Joi.string().valid("CHAT_MESSAGE").required(),
  message_role: Joi.string().valid("USER", "ASSISTANT", "SYSTEM").required(),
  message_target: Joi.string().valid("CHAT").required(),
  message_contents: Joi.array().items(chatContentSchema).min(1).required(),
  debug: Joi.boolean(),
});
```

## Yup

```javascript
import * as yup from "yup";

const chatContentSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().required(),
  content_delay: yup.number().min(0),
  content_data: yup.object().required(),
});

const chatMessageSchema = yup.object().shape({
  message_id: yup.string().required(),
  message_type: yup.string().oneOf(["CHAT_MESSAGE"]).required(),
  message_role: yup.string().oneOf(["USER", "ASSISTANT", "SYSTEM"]).required(),
  message_target: yup.string().oneOf(["CHAT"]).required(),
  message_contents: yup.array().of(chatContentSchema).min(1).required(),
  debug: yup.boolean(),
});
```
