---
description: "Specification for CHAT_CONTENT_BUTTON in the communication protocol. This file defines the complete specification and core structure for creating actionable buttons within chat messages. UPDATED: This specification now uses unified button property naming convention: - button_actions (array of Action objects, required): Actions to execute when button is clicked For practical usage examples, see: ../type-usage-examples/CHAT_CONTENT_BUTTON.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **📝 [Usage Examples](../type-usage-examples/CHAT_CONTENT_BUTTON.md)**

# CHAT_CONTENT_BUTTON Specification

## Specification

### Type Definition

`CHAT_CONTENT_BUTTON` is a content type that renders an interactive button within chat messages. Buttons provide a clean, intuitive way for users to trigger actions without typing commands, and can open canvas interfaces, send messages, or execute other actions.

## Example Full Content Payload

**Content Payload**

```json
{
  "content_id": "button-example-001",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_width": "WIDTH_AUTO",
  "content_data": {
    "button_text": "Open Canvas",
    "button_actions": [
      {
        "action_id": "button-action-001",
        "action_type": "CANVAS_ACTION_OPEN",
        "action_data": {
          "target": "CANVAS",
          "canvas_id": "doc-123"
        }
      }
    ],
    "button_style": "BUTTON_STYLE_PRIMARY"
  }
}
```

### Properties

| Property                       | Type    | Required | Default        | Description                                                                                                                                                                                                                             |
| ------------------------------ | ------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`                   | string  | Yes      |                | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`                 | string  | Yes      |                | Must be `"CHAT_CONTENT_BUTTON"`                                                                                                                                                                                                         |
| `content_width`                | string  | No       | `"WIDTH_AUTO"` | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`                | string  | No       | `"main"`       | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`                | number  | No       |                | Delay in milliseconds applied AFTER this content finishes processing, BEFORE the next item in the same queue.                                                                                                                             |
| `content_data.button_text`     | string  | Yes      |                | The text to display on the button                                                                                                                                                                                                       |
| `content_data.button_actions`  | array   | Yes      |                | Array of actions to execute when the button is clicked                                                                                                                                                                                  |
| `content_data.button_style`    | string  | No       |                | Visual style: BUTTON_STYLE_PRIMARY, BUTTON_STYLE_SECONDARY, BUTTON_STYLE_SUCCESS, BUTTON_STYLE_WARNING, BUTTON_STYLE_DANGER                                                                                                           |
| `content_data.button_disabled` | boolean | No       | `false`        | Whether the button is disabled                                                                                                                                                                                                          |

## JSON Schema Definition

The complete schema for `CHAT_CONTENT_BUTTON` adheres to the following structure:

```json
{
  "type": "object",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this content within the message."
    },
    "content_type": {
      "type": "string",
      "enum": ["CHAT_CONTENT_BUTTON"],
      "description": "Must be CHAT_CONTENT_BUTTON."
    },
    "content_width": {
      "type": "string",
      "enum": ["WIDTH_AUTO", "WIDTH_FULL"],
      "default": "WIDTH_AUTO",
      "description": "Width behavior for the content element."
    },
    "content_queue": {
      "type": "string",
      "default": "main",
      "description": "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    },
    "content_delay": {
      "type": "number",
      "description": "Delay in milliseconds applied AFTER this content item finishes processing, BEFORE the next item in the same queue begins."
    },
    "content_data": {
      "type": "object",
      "required": ["button_text", "button_actions"],
      "properties": {
        "button_text": {
          "type": "string",
          "description": "The text to display on the button."
        },
        "button_actions": {
          "type": "array",
          "description": "Array of actions to execute when the button is clicked.",
          "items": {
            "type": "object",
            "required": ["action_id", "action_type", "action_data"],
            "properties": {
              "action_id": {
                "type": "string",
                "description": "Unique identifier for this specific action instance"
              },
              "action_type": { "type": "string" },
              "action_data": { "type": "object" }
            }
          }
        },
        "button_style": {
          "type": "string",
          "enum": ["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"],
          "description": "Optional visual style for the button."
        },
        "button_disabled": {
          "type": "boolean",
          "default": false,
          "description": "Optional. Whether the button is disabled."
        }
      }
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

/**
 * Base action schema for button interactions
 * @description Defines the structure of actions that can be triggered by button clicks
 */
const actionSchema = z.object({
  action_id: z.string(),
  action_type: z.string(),
  action_data: z.object({}).passthrough(),
});

/**
 * Content data schema for CHAT_CONTENT_BUTTON
 * @description Uses unified button property naming convention (button_actions)
 */
const contentDataSchema = z.object({
  button_text: z.string(),
  button_actions: z.array(actionSchema),
  button_style: z
    .enum([
      "BUTTON_STYLE_PRIMARY",
      "BUTTON_STYLE_SECONDARY",
      "BUTTON_STYLE_SUCCESS",
      "BUTTON_STYLE_WARNING",
      "BUTTON_STYLE_DANGER",
    ])
    .optional(),
  button_disabled: z.boolean().optional(),
});

const chatContentButtonSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_BUTTON"),
  content_width: z.enum(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO").optional(),
  content_queue: z.string().default("main").optional(),
  content_delay: z.number().optional(),
  content_data: contentDataSchema,
});
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

/**
 * Base action schema for button interactions
 * @description Defines the structure of actions that can be triggered by button clicks
 */
const actionSchema = Joi.object({
  action_id: Joi.string().required(),
  action_type: Joi.string().required(),
  action_data: Joi.object().unknown(true).required(),
});

/**
 * Content data schema for CHAT_CONTENT_BUTTON
 * @description Uses unified button property naming convention (button_actions)
 */
const contentDataSchema = Joi.object({
  button_text: Joi.string().required(),
  button_actions: Joi.array().items(actionSchema).required(),
  button_style: Joi.string().valid(
    "BUTTON_STYLE_PRIMARY",
    "BUTTON_STYLE_SECONDARY",
    "BUTTON_STYLE_SUCCESS",
    "BUTTON_STYLE_WARNING",
    "BUTTON_STYLE_DANGER"
  ),
  button_disabled: Joi.boolean(),
});

const chatContentButtonSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_BUTTON").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number(),
  content_data: contentDataSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

/**
 * Base action schema for button interactions
 * @description Defines the structure of actions that can be triggered by button clicks
 */
const actionSchema = yup.object().shape({
  action_id: yup.string().required(),
  action_type: yup.string().required(),
  action_data: yup.object().required(),
});

/**
 * Content data schema for CHAT_CONTENT_BUTTON
 * @description Uses unified button property naming convention (button_actions)
 */
const contentDataSchema = yup.object().shape({
  button_text: yup.string().required(),
  button_actions: yup.array().of(actionSchema).required(),
  button_style: yup.string().oneOf([
    "BUTTON_STYLE_PRIMARY",
    "BUTTON_STYLE_SECONDARY",
    "BUTTON_STYLE_SUCCESS",
    "BUTTON_STYLE_WARNING",
    "BUTTON_STYLE_DANGER",
  ]),
  button_disabled: yup.boolean(),
});

const chatContentButtonSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_BUTTON"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number(),
  content_data: contentDataSchema.required(),
});
```

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_BUTTON Usage Examples](../type-usage-examples/CHAT_CONTENT_BUTTON.md)**

## Implementation Notes

1. **Button Actions**: The `button_actions` array can contain any valid action types (CHAT*ACTION*_, CANVAS*ACTION*_, APP*ACTION*\*). All actions execute sequentially when the button is clicked.
2. **Styling**: Button styles should map to appropriate visual representations in the UI
3. **Accessibility**: Ensure buttons are keyboard accessible and have proper ARIA labels
4. **State Management**: Disabled buttons should not trigger actions and should be visually distinct

## Button Styles

- **BUTTON_STYLE_PRIMARY**: Main call-to-action buttons (prominent styling)
- **BUTTON_STYLE_SECONDARY**: Secondary actions (less prominent styling)
- **BUTTON_STYLE_SUCCESS**: Positive actions (green/success coloring)
- **BUTTON_STYLE_WARNING**: Caution actions (yellow/warning coloring)
- **BUTTON_STYLE_DANGER**: Destructive actions (red/danger coloring)

## Best Practices

1. Use clear, actionable button text that describes what will happen
2. Choose appropriate button styles that match the action's importance and type
3. Avoid having too many buttons in a single message to prevent choice paralysis
4. Use disabled state sparingly and provide clear indication why a button is disabled
5. Ensure button actions are meaningful and provide appropriate feedback to users
