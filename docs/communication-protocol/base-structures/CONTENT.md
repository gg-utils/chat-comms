---
description: "Base specification for CONTENT objects in the communication protocol. Base specification for CONTENT in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Base Structures](./README.md)**

# Base `CONTENT` Specification

The `CONTENT` is a fundamental concept in the communication protocol, representing a generic unit of information or an interactive element. It serves as the base type from which more specific content categories like `CANVAS_CONTENT` and `CHAT_CONTENT` are derived.

All content objects, regardless of where they are displayed (e.g., canvas, chat message), share a common structure to identify them and encapsulate their specific data. The `content_type` field dictates the nature of the content and the expected structure of its `content_data`.

## General Attributes

All `CONTENT` objects, regardless of their specific `content_type`, are expected to share the following common attributes:

- `content_id` (string, required): A unique identifier for this specific piece of content. This ID is crucial for referencing the content, for example, when it needs to be updated or interacted with. The scope of uniqueness (e.g., within a message, within a canvas document) might be further defined by inheriting types.
- `content_type` (string, required): Defines the specific type of content (e.g., `"CHAT_CONTENT_MARKDOWN"`, `"CANVAS_CONTENT_SECTION"`). This field determines the expected structure, rendering behavior, and interaction model of the `content_data` object.
- `content_queue` (string, optional): Named queue for parallel content processing. Content in the same queue is processed sequentially, while different queues run in parallel. This enables simultaneous streaming of independent content elements (e.g., a website screenshot panel in the `"website"` queue while reasoning updates continue in the `"main"` queue). Defaults to `"main"` if not specified.
- `content_delay` (number, optional): Delay in milliseconds applied AFTER this content item finishes processing. This delay is ALWAYS applied when specified, regardless of item position in the queue. During the delay, the "Thinking..." indicator is shown and chat input is disabled. This is the preferred mechanism for inter-item timing control.
- `content_data` (object, required): An object containing the data specific to that content type. The structure of this object is dependent on the `content_type`.

## JSON Schema Definition for Base `CONTENT`

This schema represents the common structure for any `CONTENT` object. Specific content types will extend this, particularly the `content_data` and by providing a specific enumeration of `content_type` values.

```json
{
  "type": "object",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this piece of content."
    },
    "content_type": {
      "type": "string",
      "description": "Defines the specific type of content."
    },
    "content_queue": {
      "type": "string",
      "default": "main",
      "description": "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    },
    "content_delay": {
      "type": "number",
      "description": "Delay in milliseconds applied AFTER this content item finishes processing. Shows 'Thinking' indicator during delay. Message-level delay is removed; use content_delay for timing."
    },
    "content_data": {
      "type": "object",
      "description": "Content-specific data. Structure depends on content_type.",
      "additionalProperties": true
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const ContentDataSchema = z
  .object({
    // Base ContentData is generic; specific content types will define their own data structures.
    // .passthrough() allows any additional properties, aligning with "additionalProperties": true
  })
  .passthrough();

const ContentSchema = z.object({
  content_id: z.string().describe("Unique identifier for this piece of content."),
  content_type: z.string().describe("Defines the specific type of content."),
  content_queue: z
    .string()
    .default("main")
    .optional()
    .describe(
      "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    ),
  content_delay: z
    .number()
    .optional()
    .describe(
      "Delay in milliseconds applied AFTER this content item finishes processing. Message-level delay is removed; use content_delay for timing."
    ),
  content_data: ContentDataSchema.describe(
    "Content-specific data. Structure depends on content_type."
  ),
});

export type Content = z.infer<typeof ContentSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const contentDataSchema = Joi.object({
  // Base ContentData is generic; specific content types will define their own data structures.
}).unknown(true); // Allows additional properties, aligning with "additionalProperties": true

const contentSchema = Joi.object({
  content_id: Joi.string().required().description("Unique identifier for this piece of content."),
  content_type: Joi.string().required().description("Defines the specific type of content."),
  content_queue: Joi.string()
    .default("main")
    .description(
      "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    ),
  content_delay: Joi.number().description(
    "Delay in milliseconds applied AFTER this content item finishes processing. Message-level delay is removed; use content_delay for timing."
  ),
  content_data: contentDataSchema
    .required()
    .description("Content-specific data. Structure depends on content_type."),
});

// Example usage:
// const { error, value } = contentSchema.validate({ ... });
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const contentDataSchema = yup
  .object({
    // Base ContentData is generic; specific content types will define their own data structures.
    // Yup allows unknown keys by default if no specific fields are defined,
    // or if specific fields are defined, unknown ones are stripped unless configured otherwise.
    // For a truly open object like this, not defining fields is simplest.
  })
  .default(undefined);

const contentSchema = yup.object({
  content_id: yup
    .string()
    .required()
    .meta({ description: "Unique identifier for this piece of content." }),
  content_type: yup
    .string()
    .required()
    .meta({ description: "Defines the specific type of content." }),
  content_queue: yup.string().default("main").meta({
    description:
      "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel.",
  }),
  content_delay: yup.number().meta({
    description:
      "Delay in milliseconds applied AFTER this content item finishes processing. Message-level delay is removed; use content_delay for timing.",
  }),
  content_data: contentDataSchema
    .required()
    .meta({ description: "Content-specific data. Structure depends on content_type." }),
});

// Example usage:
// contentSchema.validate({ ... }).then(value => { ... }).catch(err => { ... });
```

## Example Conceptual Payload

This example illustrates the general structure of a base `CONTENT` object. Specific instances would use concrete `content_type` values and corresponding `content_data`.

**Content Payload**

```json
{
  "content_id": "generic-content-unique-id-001",
  "content_type": "SPECIFIC_CONCRETE_CONTENT_TYPE", // e.g., "CHAT_CONTENT_MARKDOWN"
  "content_queue": "main", // optional - defaults to "main"
  "content_delay": 500, // optional - milliseconds to wait after this item
  "content_data": {
    // "specific_key_1": "specific_value_1",
    // "specific_key_2": "specific_value_2"
  }
}
```

## Inheritance

This base `CONTENT` specification is inherited by more specialized content types:

- **[`CANVAS_CONTENT`](../specialized-structures/CANVAS_CONTENT.md):** Content types designed for display within the Canvas interface.
- **[`CHAT_CONTENT`](../specialized-structures/CHAT_CONTENT.md):** Content types designed for inclusion in Chat messages.

Refer to these specific documents for details on their `content_type`s and `content_data` structures.
