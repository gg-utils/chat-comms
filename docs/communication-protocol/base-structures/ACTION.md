---
description: "Base specification for ACTION objects in the communication protocol. Base specification for ACTION in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Base Structures](./README.md)**

# Base `ACTION` Specification

The `ACTION` is a fundamental concept in the communication protocol, representing a generic instruction for an operation to be performed. It serves as the base type from which more specific action categories like `APP_ACTION`, `CANVAS_ACTION`, and `CHAT_ACTION` are derived.

All actions, regardless of their specific domain (app, canvas, chat), share a common structure to identify them and carry necessary data. The `action_type` field dictates the specific nature of the action and the expected structure of its `action_data`.

## General Attributes

All `ACTION` objects, regardless of their specific `action_type`, are expected to share the following common attributes:

- `action_id` (string, required): A unique identifier for this specific action instance. This ID is crucial for tracking, referencing, and potentially correlating the action with other events or messages.
- `action_type` (string, required): Defines the specific type of action to be performed (e.g., `"APP_ACTION_SET_THEME"`, `"CANVAS_ACTION_OPEN"`, `"CHAT_ACTION_SEND_TEXT_MESSAGE"`). This field determines the expected structure and behavior of the `action_data` object.
- `action_data` (object, required): An object containing the data necessary to perform the action. The structure of this object is dependent on the `action_type`.
  - `target` (string, required): Specifies the primary interface or context this action is intended for. Must be one of: `"APP"`, `"CANVAS"`, `"CHAT"`. Specialized action types may further restrict this to a single value appropriate for their domain.

## JSON Schema Definition for Base `ACTION`

This schema represents the common structure for any `ACTION`. Specific action types will extend this, particularly the `action_data` and potentially refining the `action_type` enumeration.

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
      "description": "Defines the specific type of action."
    },
    "action_data": {
      "type": "object",
      "required": ["target"],
      "properties": {
        "target": {
          "type": "string",
          "enum": ["APP", "CANVAS", "CHAT"],
          "description": "Primary interface/context for the action. Must be one of: APP, CANVAS, CHAT."
        }
      },
      "additionalProperties": true,
      "description": "Action-specific data. Structure depends on action_type."
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const ActionDataSchema = z
  .object({
    target: z
      .enum(["APP", "CANVAS", "CHAT"])
      .describe("Primary interface/context for the action. Must be one of: APP, CANVAS, CHAT."),
  })
  .passthrough(); // Allows additional properties

const ActionSchema = z.object({
  action_id: z.string().describe("Unique identifier for this action instance."),
  action_type: z.string().describe("Defines the specific type of action."),
  action_data: ActionDataSchema.describe("Action-specific data. Structure depends on action_type."),
});

export type Action = z.infer<typeof ActionSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string()
    .valid("APP", "CANVAS", "CHAT")
    .required()
    .description("Primary interface/context for the action. Must be one of: APP, CANVAS, CHAT."),
}).unknown(true); // Allows additional properties

const actionSchema = Joi.object({
  action_id: Joi.string().required().description("Unique identifier for this action instance."),
  action_type: Joi.string().required().description("Defines the specific type of action."),
  action_data: actionDataSchema
    .required()
    .description("Action-specific data. Structure depends on action_type."),
});

// Example usage:
// const { error, value } = actionSchema.validate({ ... });
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const actionDataSchema = yup
  .object({
    target: yup.string().oneOf(["APP", "CANVAS", "CHAT"]).required().meta({
      description: "Primary interface/context for the action. Must be one of: APP, CANVAS, CHAT.",
    }),
    // For additional properties, Yup typically relies on `noUnknown(false)` at the object level
    // or more complex setups if specific unknown keys need validation.
    // By default, Yup strips unknown properties. For allowing them:
    // one might not define them explicitly if they don't need validation,
    // or use .test() for more complex scenarios.
    // For simplicity, we'll assume additional properties are allowed and don't need specific Yup validation here.
  })
  .default(undefined); // .default(undefined) helps if the object itself is optional and not provided

const actionSchema = yup.object({
  action_id: yup
    .string()
    .required()
    .meta({ description: "Unique identifier for this action instance." }),
  action_type: yup
    .string()
    .required()
    .meta({ description: "Defines the specific type of action." }),
  action_data: actionDataSchema
    .required()
    .meta({ description: "Action-specific data. Structure depends on action_type." }),
});

// Example usage:
// actionSchema.validate({ ... }).then(value => { ... }).catch(err => { ... });
```

## Example Conceptual Payload

This example illustrates the general structure of a base `ACTION`. Specific instances would use concrete `action_type` values and corresponding `action_data`.

**Action Payload**

```json
{
  "action_id": "generic-action-unique-id-001",
  "action_type": "SPECIFIC_CONCRETE_ACTION_TYPE", // e.g., "APP_ACTION_SET_THEME"
  "action_data": {
    "target": "SPECIFIC_TARGET_CONTEXT" // e.g., "APP"
    // "specific_key_1": "specific_value_1",
    // "specific_key_2": "specific_value_2"
  }
}
```

## Inheritance

This base `ACTION` specification is inherited by more specialized action types:

- **[`APP_ACTION`](../specialized-structures/APP_ACTION.md):** Actions that affect the overall application state or behavior.
- **[`CANVAS_ACTION`](../specialized-structures/CANVAS_ACTION.md):** Actions related to the Canvas interface.
- **[`CHAT_ACTION`](../specialized-structures/CHAT_ACTION.md):** Actions related to the Chat interface.

Refer to these specific documents for details on their `action_type`s and `action_data` structures.
