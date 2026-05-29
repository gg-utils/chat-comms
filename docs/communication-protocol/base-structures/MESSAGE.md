---
description: "Base specification for MESSAGE objects in the communication protocol. Base specification for MESSAGE in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Base Structures](./README.md)**

# Base `MESSAGE` Specification

The `MESSAGE` is a foundational concept in the communication protocol, representing a generic container for information exchanged between entities (e.g., User, Assistant, System). It serves as the base type from which more specific message types, such as `CHAT_MESSAGE`, are derived.

All messages, regardless of their specific purpose or content, share a common structure to identify them, define their type, and specify their intended target or context.

## General Attributes

All `MESSAGE` objects, regardless of their specific `message_type`, are expected to share the following common attributes:

- `message_id` (string, required): A unique identifier for this specific message instance. This ID is crucial for tracking, referencing, and potentially correlating the message with other events or actions.
- `message_type` (string, required): Defines the specific type of message (e.g., `"CHAT_MESSAGE"`). This field determines the expected overall structure and purpose of the message, including any specialized attributes or content it might carry.
- `message_target` (string, required): Specifies the primary interface, system, or context this message is intended for (e.g., `"CHAT"`, `"CANVAS"`, `"APP"`). This helps in routing and processing the message correctly.

While the following attributes are common in many message types (like `CHAT_MESSAGE`), their universal applicability to _all conceivable_ future message types is not strictly enforced at this base level. Specific message types will define them as required:

- `message_role` (string, optional): Indicates the originator or role associated with the message (e.g., `"USER"`, `"ASSISTANT"`, `"SYSTEM"`).
- `message_contents` (any, optional): The payload or content of the message. The structure of this attribute is highly dependent on the `message_type`. For example, in `CHAT_MESSAGE`, this is an array of `CHAT_CONTENT` objects.

## JSON Schema Definition for Base `MESSAGE`

This schema represents the common structure for any `MESSAGE`. Specific message types will extend this, particularly by defining the structure of `message_contents` and potentially adding other type-specific attributes.

```json
{
  "type": "object",
  "required": ["message_id", "message_type", "message_target"],
  "properties": {
    "message_id": {
      "type": "string",
      "description": "Unique identifier for this message instance."
    },
    "message_type": {
      "type": "string",
      "description": "Defines the specific type of message."
    },
    "message_target": {
      "type": "string",
      "description": "Primary interface, system, or context for the message (e.g., CHAT, CANVAS, APP)."
    },
    "message_role": {
      "type": "string",
      "description": "Optional. Sender or role associated with the message."
    },
    "message_contents": {
      "type": ["array", "object", "string", "number", "boolean"],
      "description": "Optional. The payload of the message. Structure depends on message_type."
    }
  },
  "additionalProperties": true
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const MessageSchema = z
  .object({
    message_id: z.string().describe("Unique identifier for this message instance."),
    message_type: z.string().describe("Defines the specific type of message."),
    message_target: z
      .string()
      .describe("Primary interface, system, or context for the message (e.g., CHAT, CANVAS, APP)."),
    message_role: z
      .string()
      .optional()
      .describe("Optional. Sender or role associated with the message."),
    message_contents: z
      .any()
      .optional()
      .describe("Optional. The payload of the message. Structure depends on message_type."),
  })
  .passthrough(); // Allows additional properties, aligning with "additionalProperties": true

export type Message = z.infer<typeof MessageSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const messageSchema = Joi.object({
  message_id: Joi.string().required().description("Unique identifier for this message instance."),
  message_type: Joi.string().required().description("Defines the specific type of message."),
  message_target: Joi.string()
    .required()
    .description(
      "Primary interface, system, or context for the message (e.g., CHAT, CANVAS, APP)."
    ),
  message_role: Joi.string()
    .optional()
    .description("Optional. Sender or role associated with the message."),
  message_contents: Joi.any()
    .optional()
    .description("Optional. The payload of the message. Structure depends on message_type."),
}).unknown(true); // Allows additional properties

// Example usage:
// const { error, value } = messageSchema.validate({ ... });
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const messageSchema = yup.object({
  message_id: yup
    .string()
    .required()
    .meta({ description: "Unique identifier for this message instance." }),
  message_type: yup
    .string()
    .required()
    .meta({ description: "Defines the specific type of message." }),
  message_target: yup.string().required().meta({
    description: "Primary interface, system, or context for the message (e.g., CHAT, CANVAS, APP).",
  }),
  message_role: yup
    .string()
    .optional()
    .meta({ description: "Optional. Sender or role associated with the message." }),
  message_contents: yup.mixed().optional().meta({
    description: "Optional. The payload of the message. Structure depends on message_type.",
  }),
  // Yup allows unknown properties by default if not explicitly stripped with .noUnknown()
});

// Example usage:
// messageSchema.validate({ ... }).then(value => { ... }).catch(err => { ... });
```

## Example Conceptual Payload

This example illustrates the general structure of a base `MESSAGE`. Specific instances would use concrete `message_type` values and corresponding structures for `message_contents` and other attributes.

**Message Payload**

```json
{
  "message_id": "generic-message-unique-id-001",
  "message_type": "SPECIFIC_CONCRETE_MESSAGE_TYPE", // e.g., "CHAT_MESSAGE"
  "message_target": "SPECIFIC_TARGET_CONTEXT" // e.g., "CHAT"
  // "message_role": "USER", // Example optional attribute
  // "message_contents": {} // Example, structure depends on message_type
}
```

## Inheritance

This base `MESSAGE` specification is inherited by more specialized message types:

- **[`CHAT_MESSAGE`](../type-specifications/CHAT_MESSAGE.md):** Messages specifically designed for chat-based interactions, typically containing `CHAT_CONTENT`.

Future message types for other purposes would also derive from this base specification. Refer to specific message type documents for details on their attributes and content structures.

## Timing Control Note

For timing between content items, use `content_delay` on individual [`CONTENT`](./CONTENT.md) objects. Message-level delay (`legacy message-level delay`) has been removed from the protocol API.

| Approach                         | Scope            | Recommended Use                         |
| -------------------------------- | ---------------- | --------------------------------------- |
| `content_delay`                  | Per-content item | Inter-item timing within a message      |
| `APP_ACTION_WAIT_FOR_USER_INPUT` | Per-message      | Pause processing until user interaction |

The `content_delay` field provides more granular control and is applied after each content item finishes processing, making it ideal for creating natural streaming animations with intentional pacing.
