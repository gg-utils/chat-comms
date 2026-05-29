---
description: "Specification for the APP_ACTION_SET_INPUT_PLACEHOLDER action type. This document details the purpose, structure, and core specification for the APP_ACTION_SET_INPUT_PLACEHOLDER action within the Assistant <-> UI Communication Protocol. The file is organized with the purpose first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/APP_ACTION_SET_INPUT_PLACEHOLDER.md Part of the Assistant <-> UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-02-04
category: documentation
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](./README.md)**

# APP_ACTION_SET_INPUT_PLACEHOLDER

## Purpose

The `APP_ACTION_SET_INPUT_PLACEHOLDER` action sets a custom placeholder text for the chat input field. This is used to provide contextual prompts to users, guiding them on what information to enter next based on the current conversation state.

Key use cases:

- **Onboarding guidance**: After the initial greeting, prompt users to "Enter a topic, URL, or identifier..."
- **Search refinement**: Guide users to provide specific details like "Type a name, location, or URL..."
- **Content editing**: Prompt for specific edits like "Describe the change you'd like to make..."
- **Contextual hints**: Provide relevant input suggestions based on the current workflow state

The placeholder is **transient** — it resets to the default ("Reply") when the user sends a message.

## Example Full Action Payload

```json
{
  "action_id": "msg-123-action-set-input-placeholder",
  "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "action_data": {
    "target": "APP",
    "placeholder": "Enter a topic, URL, or identifier..."
  }
}
```

## Action Data Structure

The `action_data` for `APP_ACTION_SET_INPUT_PLACEHOLDER` must contain the following properties:

- `target`: String (Enum: `"APP"`)
  - Required. Specifies that the action targets the application itself.
- `placeholder`: String
  - Required. The placeholder text to display in the chat input field. Should be concise and actionable.

## JSON Schema Definition for `action_data`

The `action_data` for `APP_ACTION_SET_INPUT_PLACEHOLDER` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "placeholder"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["APP"],
      "description": "Specifies that the action targets the application itself."
    },
    "placeholder": {
      "type": "string",
      "description": "The placeholder text to display in the chat input field."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["APP"]),
  placeholder: z.string(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("APP").required(),
  placeholder: Joi.string().required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["APP"]).required(),
  placeholder: yup.string().required(),
});
```

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **[APP_ACTION_SET_INPUT_PLACEHOLDER Usage Examples](../type-usage-examples/APP_ACTION_SET_INPUT_PLACEHOLDER.md)**

## Considerations

### Transient Nature

The placeholder text is **not persisted** — it only affects the current UI state:

1. **Single-use**: The placeholder resets to the default value ("Reply") after the user sends a message
2. **No state storage**: The placeholder is not stored in the database or conversation history
3. **Session-scoped**: If the user refreshes the page, the placeholder returns to the default

### Best Practices

1. **Keep it short**: Placeholder text should be concise (ideally under 60 characters) to fit comfortably in the input field
2. **Be specific**: Use action-oriented language that tells the user exactly what to enter
3. **Match context**: Ensure the placeholder aligns with the current workflow state
4. **Use sparingly**: Only set custom placeholders when the context genuinely benefits from guidance

### Timing Considerations

- Send the placeholder action at the end of your response, after all content has been streamed
- The action is processed immediately — there's no animation or delay
- If multiple placeholder actions are sent in the same response, only the last one takes effect

### Example Placeholder Text

| Context               | Placeholder Text                            |
| --------------------- | ------------------------------------------- |
| Initial greeting      | "Enter a topic, URL, or identifier..."       |
| Search refinement     | "Type a name, location, or URL..."          |
| Content editing       | "Describe the change you'd like to make..." |
| General conversation  | "Ask me anything about this workflow..."    |
