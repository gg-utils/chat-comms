---
description: "Specification for CANVAS_ACTION_UPDATE in the communication protocol. This file defines the complete specification, basic usage patterns, and comprehensive examples for updating various aspects of the canvas, including its title, entire contents, appending new content, or modifying existing content. This action consolidates functionality from previous, more specific canvas actions. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](./README.md)**

# `CANVAS_ACTION_UPDATE` Specification

## Specification

### Type Definition

`CANVAS_ACTION_UPDATE` is a versatile action type used to perform various updates to a canvas document. It can set the canvas title, replace its entire contents, append new content elements, or modify existing content elements. This action type is the current canvas update vocabulary for all title and content mutations.

## JSON Schema Definition for `action_data`

The `action_data` for `CANVAS_ACTION_UPDATE` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "canvas_id"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CANVAS"],
      "description": "Target interface for the action, must be CANVAS."
    },
    "canvas_id": {
      "type": "string",
      "description": "Unique identifier for the target canvas document."
    },
    "canvas_title_label": {
      "type": "string",
      "description": "Optional. If provided, sets or updates the title of the canvas."
    },
    "canvas_title_href": {
      "type": "string",
      "description": "Optional. If provided, makes the canvas title clickable, opening the specified URL when clicked. Can be used alongside canvas_title_label to create a clickable title link."
    },
    "canvas_contents": {
      "type": "array",
      "description": "Optional. If provided, completely replaces all canvas contents with this new array of ChatComms_RuntimeChat_CanvasContent objects. An empty array clears the canvas.",
      "items": {
        "type": "object",
        "description": "A ChatComms_RuntimeChat_CanvasContent object. Refer to ChatComms_RuntimeChat_CanvasContent type definitions for structure.",
        "required": ["content_id", "content_type", "content_data"],
        "properties": {
          "content_id": { "type": "string" },
          "content_type": { "type": "string" },
          "content_data": { "type": "object" }
        }
      }
    },
    "append_contents": {
      "type": "object",
      "description": "Optional. If provided, appends new content elements to the canvas.",
      "required": ["canvas_insert_position", "contents"],
      "properties": {
        "canvas_insert_position": {
          "type": "string",
          "enum": ["TOP", "BOTTOM"],
          "description": "Position to insert content elements: TOP or BOTTOM."
        },
        "contents": {
          "type": "array",
          "description": "An array of ChatComms_RuntimeChat_CanvasContent objects to append.",
          "items": {
            "type": "object",
            "description": "A ChatComms_RuntimeChat_CanvasContent object. Refer to ChatComms_RuntimeChat_CanvasContent type definitions for structure.",
            "required": ["content_id", "content_type", "content_data"],
            "properties": {
              "content_id": { "type": "string" },
              "content_type": { "type": "string" },
              "content_data": { "type": "object" }
            }
          }
        }
      }
    },
    "modify_contents": {
      "type": "object",
      "description": "Optional. If provided, modifies existing content within the canvas. Corresponds to the previous CANVAS_ACTION_MODIFY_CONTENTS.",
      "required": ["target_content_id", "modification_type", "new_content_data"],
      "properties": {
        "target_content_id": {
          "type": "string",
          "description": "content_id of the specific canvas content element to modify."
        },
        "modification_type": {
          "type": "string",
          "enum": ["REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT", "REVEAL"],
          "description": "Type of modification to perform. REPLACE: Completely replace the target content. UPDATE_PROPERTIES: Update specific properties without replacing entire content. APPEND_TO_CONTENT: Add new content to the end of existing content. REVEAL: Progressively reveal content that was previously hidden or collapsed."
        },
        "new_content_data": {
          "type": "object",
          "description": "New content data to apply to the target element. The structure depends on the modification_type and the target content's type."
        },
        "streaming_options": {
          "type": "object",
          "description": "Optional. Streaming options for REVEAL modification type. Controls how content is progressively revealed. Use EITHER manual chunking (chunkInterval + chunkSize) OR duration-based (desiredTotalDuration + maximumDuration), never both.",
          "properties": {
            "chunkInterval": {
              "type": "number",
              "description": "Mode 1 (Manual Chunking): Time interval in milliseconds between each streamed chunk. Use with chunkSize."
            },
            "chunkSize": {
              "type": "number",
              "description": "Mode 1 (Manual Chunking): Size of each streamed chunk in characters or units. Use with chunkInterval."
            },
            "desiredTotalDuration": {
              "type": "number",
              "description": "Mode 2 (Duration-Based): Target total duration in milliseconds for streaming all content. Use with maximumDuration."
            },
            "maximumDuration": {
              "type": "number",
              "description": "Mode 2 (Duration-Based): Maximum allowed duration in milliseconds for the streaming operation. Use with desiredTotalDuration."
            }
          }
        }
      }
    },
    "remove_contents": {
      "type": "object",
      "description": "Optional. If provided, removes existing content elements from the canvas.",
      "required": ["target_content_ids"],
      "properties": {
        "target_content_ids": {
          "type": "array",
          "description": "An array of content_ids of the specific canvas content elements to remove.",
          "items": {
            "type": "string"
          }
        }
      }
    }
  },
  "additionalProperties": false,
  "description": "Action data for updating canvas title, contents, appending content elements, modifying content, or removing content elements. At least one of canvas_title_label, canvas_contents, append_contents, modify_contents, or remove_contents should be provided to make the action meaningful."
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const canvasContentSchema = z.object({
  content_id: z.string(),
  content_type: z.string(),
  content_data: z.object({}).passthrough(),
});

const actionDataSchema = z
  .object({
    target: z.enum(["CANVAS"]),
    canvas_id: z.string(),
    canvas_title_label: z.string().optional(),
    canvas_title_href: z.string().optional(),
    canvas_contents: z.array(canvasContentSchema).optional(),
    append_contents: z
      .object({
        canvas_insert_position: z.enum(["TOP", "BOTTOM"]),
        contents: z.array(canvasContentSchema),
      })
      .optional(),
    modify_contents: z
      .object({
        target_content_id: z.string(),
        modification_type: z.enum(["REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT", "REVEAL"]),
        new_content_data: z.object({}).passthrough(),
        streaming_options: z
          .object({
            chunkInterval: z.number().optional(),
            chunkSize: z.number().optional(),
            desiredTotalDuration: z.number().optional(),
            maximumDuration: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    remove_contents: z
      .object({
        target_content_ids: z.array(z.string()),
      })
      .optional(),
  })
  .refine(
    (data) =>
      data.canvas_title_label !== undefined ||
      data.canvas_contents !== undefined ||
      data.append_contents !== undefined ||
      data.modify_contents !== undefined ||
      data.remove_contents !== undefined,
    {
      message:
        "At least one of canvas_title_label, canvas_contents, append_contents, modify_contents, or remove_contents must be provided.",
    }
  );
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const canvasContentSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().required(),
  content_data: Joi.object().unknown(true).required(),
});

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CANVAS").required(),
  canvas_id: Joi.string().required(),
  canvas_title_label: Joi.string(),
  canvas_title_href: Joi.string(),
  canvas_contents: Joi.array().items(canvasContentSchema),
  append_contents: Joi.object({
    canvas_insert_position: Joi.string().valid("TOP", "BOTTOM").required(),
    contents: Joi.array().items(canvasContentSchema).required(),
  }),
  modify_contents: Joi.object({
    target_content_id: Joi.string().required(),
    modification_type: Joi.string()
      .valid("REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT", "REVEAL")
      .required(),
    new_content_data: Joi.object().unknown(true).required(),
    streaming_options: Joi.object({
      chunkInterval: Joi.number(),
      chunkSize: Joi.number(),
      desiredTotalDuration: Joi.number(),
      maximumDuration: Joi.number(),
    }),
  }),
  remove_contents: Joi.object({
    target_content_ids: Joi.array().items(Joi.string()).required(),
  }),
})
  .or(
    "canvas_title_label",
    "canvas_contents",
    "append_contents",
    "modify_contents",
    "remove_contents"
  )
  .messages({
    "object.missing":
      "At least one of canvas_title_label, canvas_contents, append_contents, modify_contents, or remove_contents must be provided.",
  });
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const canvasContentSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().required(),
  content_data: yup.object().required(),
});

const actionDataSchema = yup
  .object()
  .shape({
    target: yup.string().oneOf(["CANVAS"]).required(),
    canvas_id: yup.string().required(),
    canvas_title_label: yup.string(),
    canvas_title_href: yup.string(),
    canvas_contents: yup.array().of(canvasContentSchema),
    append_contents: yup.object().shape({
      canvas_insert_position: yup.string().oneOf(["TOP", "BOTTOM"]).required(),
      contents: yup.array().of(canvasContentSchema).required(),
    }),
    modify_contents: yup.object().shape({
      target_content_id: yup.string().required(),
      modification_type: yup
        .string()
        .oneOf(["REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT", "REVEAL"])
        .required(),
      new_content_data: yup.object().required(),
      streaming_options: yup.object().shape({
        chunkInterval: yup.number(),
        chunkSize: yup.number(),
        desiredTotalDuration: yup.number(),
        maximumDuration: yup.number(),
      }),
    }),
    remove_contents: yup.object().shape({
      target_content_ids: yup.array().of(yup.string()).required(),
    }),
  })
  .test(
    "at-least-one-action",
    "At least one of canvas_title_label, canvas_contents, append_contents, modify_contents, or remove_contents must be provided.",
    (value) =>
      value.canvas_title_label !== undefined ||
      value.canvas_contents !== undefined ||
      value.append_contents !== undefined ||
      value.modify_contents !== undefined ||
      value.remove_contents !== undefined
  );
```

### Example Full Action Payload

```json
// This is a conceptual example; specific examples for each operation type are below.
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CANVAS_ACTION_UPDATE", // required - must be exactly this value
  "action_data": {
    "target": "CANVAS", // required - must be "CANVAS"
    "canvas_id": "string" // required - unique identifier for the canvas document
    // At least one of the following optional fields must be present:
    // "canvas_title_label": "string",
    // "canvas_title_href": "string",
    // "canvas_contents": [],
    // "append_contents": { ... },
    // "modify_contents": { ... },
    // "remove_contents": { ... }
  }
}
```

### Properties

| Property                         | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action_id`                      | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `action_type`                    | string | Yes      | Must be `"CANVAS_ACTION_UPDATE"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `action_data.target`             | string | Yes      | Must be `"CANVAS"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `action_data.canvas_id`          | string | Yes      | Unique identifier for the target canvas document                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `action_data.canvas_title_label` | string | No       | Optional. If provided, sets or updates the title of the canvas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `action_data.canvas_title_href`  | string | No       | Optional. If provided, makes the canvas title clickable, opening the specified URL when clicked. Can be used alongside `canvas_title_label` to create a clickable title link.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `action_data.canvas_contents`    | array  | No       | Optional. Array of `ChatComms_RuntimeChat_CanvasContent` objects. If provided, completely replaces all existing canvas contents. An empty array clears the canvas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `action_data.append_contents`    | object | No       | Optional. Object containing `canvas_insert_position` (`"TOP"` or `"BOTTOM"`) and `contents` (an array of `ChatComms_RuntimeChat_CanvasContent` objects). If provided, appends the new content elements to the canvas at the specified position.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `action_data.modify_contents`    | object | No       | Optional. Object containing `target_content_id`, `modification_type`, `new_content_data`, and optionally `streaming_options`. If provided, modifies an existing content element within the canvas. `modification_type` must be one of: `"REPLACE"` (completely replace content), `"UPDATE_PROPERTIES"` (update specific properties), `"APPEND_TO_CONTENT"` (add to existing content), or `"REVEAL"` (progressively reveal hidden/collapsed content). `new_content_data` structure depends on the `modification_type` and target content. When using `"REVEAL"`, `streaming_options` can control reveal timing with `chunkInterval`, `chunkSize`, `desiredTotalDuration`, and `maximumDuration`. |
| `action_data.remove_contents`    | object | No       | Optional. Object containing `target_content_ids` (an array of strings). If provided, removes the specified content elements from the canvas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### Supported Operations

One or more of the following operations can be performed by a single `CANVAS_ACTION_UPDATE` message, though typically one operation is performed per action:

1.  **Set Title**: Updates the title of the canvas.
    - Achieved by providing the `canvas_title_label` field.
    - Optionally, provide `canvas_title_href` to make the title clickable, opening a URL when clicked.
2.  **Set Contents**: Replaces the entire content of the canvas.
    - Achieved by providing the `canvas_contents` array.
3.  **Append Contents**: Adds new content elements to the top or bottom of the canvas.
    - Achieved by providing the `append_contents` object.
4.  **Modify Contents**: Modifies an existing content element within the canvas.
    - Achieved by providing the `modify_contents` object.
5.  **Remove Contents**: Removes existing content elements from the canvas.
    - Achieved by providing the `remove_contents` object.

---

## Usage Examples

For comprehensive usage examples showing different canvas update patterns, implementation best practices, and real-world scenarios, see the [Usage Examples](../type-usage-examples/CANVAS_ACTION_UPDATE.md) document.

**Quick Examples**:

- **Title Update**: Set `canvas_title_label` to update canvas title
- **Content Replacement**: Use `canvas_contents` array to replace all content
- **Progressive Building**: Use `append_contents` with `"BOTTOM"` position for incremental content
- **Status Updates**: Use `modify_contents` with `"REPLACE"` for targeted updates
- **Progressive Reveal**: Use `modify_contents` with `"REVEAL"` for unveiling content sections
- **Cleanup**: Use `remove_contents` with content IDs to remove elements

### HTML Content Examples

Items in `canvas_contents` and `append_contents.contents` may include `CANVAS_CONTENT_HTML`:

```json
{
  "action_type": "CANVAS_ACTION_UPDATE",
  "action_data": {
    "target": "CANVAS",
    "canvas_id": "canvas-doc-001",
    "append_contents": {
      "canvas_insert_position": "BOTTOM",
      "contents": [
        {
          "content_id": "footer-html",
          "content_type": "CANVAS_CONTENT_HTML",
          "content_data": { "html": "<footer>© 2025 a sample interface</footer>" }
        }
      ]
    }
  }
}
```

---

## Implementation Notes

### Operation Exclusivity

While the schema allows multiple optional fields (e.g., `canvas_title_label` and `canvas_contents`) to be present, implementations should define clear precedence or behavior if multiple operations are specified in a single action. Typically, an action instance will focus on one specific type of update (title, full content, append, modify, or remove). The primary goal of this unification is to have a single action _type_, not necessarily to combine all operations into every single message.

### Field Validation

At least one of the optional operational fields (`canvas_title_label`, `canvas_contents`, `append_contents`, `modify_contents`, `remove_contents`) must be provided for the action to be meaningful. This should be enforced by schema validation where possible (e.g., using `oneOf`, `anyOf`, or custom validation logic in Zod/Joi/Yup).

### Content Data Structure

The structure of `new_content_data` within `modify_contents` is highly dependent on the `modification_type` and the type of the `ChatComms_RuntimeChat_CanvasContent` being modified. Implementers must ensure this data is appropriate for the target.

### Error Handling

If a `target_content_id` for modification or removal is not found, or if `canvas_id` is invalid, the action should be handled gracefully, ideally with an error communicated back if the protocol supports it. For `remove_contents`, if some `target_content_ids` are found and others are not, the found ones should be removed, and the missing ones could be ignored or reported.

### Performance Considerations

- Use `modify_contents` for small, targeted changes rather than full content replacement
- Consider UI transition effects when replacing large amounts of content
- Implement efficient diff algorithms for content updates

### Security Guidelines

- Validate all content data before processing
- Sanitize user-provided content to prevent XSS attacks
- Verify canvas document access permissions before updates

---

## UI Behavior

The UI behavior will depend on which optional fields are populated in the `action_data`:

- **canvas_title_label**: The canvas title bar should update smoothly
- **canvas_contents**: The entire content area should be replaced with appropriate transition
- **append_contents**: New content elements should be added to TOP or BOTTOM with animation
- **modify_contents**: The targeted existing content element should change according to the `modification_type` and `new_content_data`
- **remove_contents**: The targeted content elements should be removed with appropriate fade-out effects

Transitions and updates should be as smooth as possible to maintain a good user experience.

---

## Best Practices

### Clarity of Intent

Prefer sending separate `CANVAS_ACTION_UPDATE` messages if performing distinct operations (e.g., setting a title, then later appending content) unless a simultaneous update is semantically desired.

### Granularity

For `modify_contents`, use the most specific `modification_type` possible to ensure efficient updates and better user experience.

### Idempotency

Where possible, design operations to be idempotent, especially for `set_contents` or `modify_contents` with `REPLACE` modification type.

### User Feedback

For significant changes like `set_contents`, ensure the user is aware that the canvas view is being completely refreshed through appropriate loading states or notifications.

### Migration Considerations

Use the fields on this action instead of documenting separate title/content mutation action types. This unified approach keeps the canvas action vocabulary small while retaining title, replace, append, modify, and remove operations.

---

_This specification is part of the Communication Protocol documentation. For related canvas actions, see [CANVAS_ACTION_OPEN](./CANVAS_ACTION_OPEN.md) and [CANVAS_ACTION_CLOSE](./CANVAS_ACTION_CLOSE.md)._
