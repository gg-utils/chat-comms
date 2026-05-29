---
description: "Specification for CHAT_CONTENT_MARKDOWN in the communication protocol. This file defines the complete specification and core structure for displaying markdown-formatted content within chat messages. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/CHAT_CONTENT_MARKDOWN.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **📝 [Usage Examples](../type-usage-examples/CHAT_CONTENT_MARKDOWN.md)**

# CHAT_CONTENT_MARKDOWN Specification

## Specification

### Type Definition

`CHAT_CONTENT_MARKDOWN` is a content type that renders markdown-formatted text within chat messages. It provides rich text display capabilities with support for headers, lists, tables, code blocks, links, emphasis, and other standard markdown features.

## Example Full Content Payload

This shows an example of a complete `CHAT_CONTENT_MARKDOWN` object.

**Content Payload**

```json
{
  "content_id": "chat-markdown-example-001",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_width": "WIDTH_AUTO",
  "content_delay": 500,
  "content_data": {
    "markdown": "# Example Chat Title\n\nThis is an **example** markdown message for chat.",
    "markdown_style": "DEFAULT"
  }
}
```

### Properties

| Property                      | Type   | Required | Default        | Description                                                                                                                                                                                                                             |
| ----------------------------- | ------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`                  | string | Yes      |                | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`                | string | Yes      |                | Must be `"CHAT_CONTENT_MARKDOWN"`                                                                                                                                                                                                       |
| `content_width`               | string | No       | `"WIDTH_AUTO"` | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`               | string | No       | `"main"`       | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`               | number | No       |                | Milliseconds to delay after this content item, before the next item in the same queue. Shows "Thinking" indicator during delay. User interaction can skip the delay.                                                                    |
| `content_data.markdown`       | string | Yes      |                | Markdown-formatted text content to display                                                                                                                                                                                              |
| `content_data.markdown_style` | string | No       | `"DEFAULT"`    | Style variant: `"DEFAULT"`, `"COMPACT"`, `"LARGE"`                                                                                                                                                                                      |

## Markdown Styles

- **`DEFAULT`**: Standard markdown rendering with normal spacing and typography
- **`COMPACT`**: Reduced spacing and smaller text for dense information display
- **`LARGE`**: Increased spacing and larger text for emphasis or readability

## JSON Schema Definition

The complete schema for `CHAT_CONTENT_MARKDOWN` adheres to the following structure:

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
      "enum": ["CHAT_CONTENT_MARKDOWN"],
      "description": "Must be CHAT_CONTENT_MARKDOWN."
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
      "minimum": 0,
      "description": "Milliseconds to delay after this content item, before the next item in the same queue. Shows 'Thinking' indicator during delay."
    },
    "content_data": {
      "type": "object",
      "required": ["markdown"],
      "properties": {
        "markdown": {
          "type": "string",
          "description": "Markdown-formatted text content to display."
        },
        "markdown_style": {
          "type": "string",
          "enum": ["DEFAULT", "COMPACT", "LARGE"],
          "default": "DEFAULT",
          "description": "Optional style variant for the markdown rendering (DEFAULT, COMPACT, LARGE)."
        }
      }
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const contentDataSchema = z.object({
  markdown: z.string(),
  markdown_style: z.enum(["DEFAULT", "COMPACT", "LARGE"]).default("DEFAULT").optional(),
});

const chatContentMarkdownSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_MARKDOWN"),
  content_width: z.enum(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO").optional(),
  content_queue: z.string().default("main").optional(),
  content_delay: z.number().min(0).optional(),
  content_data: contentDataSchema,
});
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const contentDataSchema = Joi.object({
  markdown: Joi.string().required(),
  markdown_style: Joi.string().valid("DEFAULT", "COMPACT", "LARGE").default("DEFAULT"),
});

const chatContentMarkdownSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_MARKDOWN").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number().min(0),
  content_data: contentDataSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const contentDataSchema = yup.object().shape({
  markdown: yup.string().required(),
  markdown_style: yup.string().oneOf(["DEFAULT", "COMPACT", "LARGE"]).default("DEFAULT"),
});

const chatContentMarkdownSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_MARKDOWN"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number().min(0),
  content_data: contentDataSchema.required(),
});
```

### Supported Markdown Features

- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Emphasis**: `*italic*`, `**bold**`, `***bold italic***`
- **Lists**: Ordered (`1. item`) and unordered (`- item`) lists
- **Links**: `[text](url)` and `<url>` formats
- **Code**: Inline `` `code` `` and fenced code blocks
- **Tables**: Standard markdown table syntax
- **Blockquotes**: `> quoted text`
- **Line breaks**: Double spaces or `\n` for line breaks
- **Horizontal rules**: `---` or `***`

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_MARKDOWN Usage Examples](../type-usage-examples/CHAT_CONTENT_MARKDOWN.md)**

## Implementation Notes

1. **Content Length**: While there's no strict limit, very long markdown content may impact rendering performance. Consider breaking extremely long content into multiple messages or sections.

2. **Markdown Parsing**: The UI should implement a robust markdown parser that supports standard CommonMark specifications with appropriate security measures.

3. **Style Application**: The `markdown_style` property should affect typography, spacing, and overall presentation without altering the semantic structure. Different styles should maintain content hierarchy while adapting visual presentation.

4. **Dynamic Content**: Markdown can include template variables (e.g., `${new Date().toLocaleString()}`) that should be resolved before rendering.

5. **Styling**: Rendered markdown should inherit appropriate styling from the chat interface while maintaining good readability and visual hierarchy.

6. **Security**: All markdown content should be sanitized to prevent XSS attacks, especially when user-generated content is involved.

## Best Practices

1. **Structure**: Use proper heading hierarchy (H1 → H2 → H3) for better accessibility and readability
2. **Formatting**: Use emphasis (`**bold**`, `*italic*`) sparingly for important information
3. **Lists**: Prefer unordered lists for non-sequential items, ordered lists for steps
4. **Tables**: Keep tables simple and ensure they're readable on mobile devices
5. **Code**: Use code blocks for multi-line code, inline code for short snippets
6. **Links**: Ensure all links are relevant and functional
7. **Length**: Break very long content into logical sections with clear headings
8. **Accessibility**: Include alt text for images and maintain good contrast ratios

## Content Delay Usage

The `content_delay` field enables inter-item timing control for creating natural-feeling animations and deliberate pacing between content items.

### Example: Sequential Markdown with Delays

```json
[
  {
    "content_id": "step-1",
    "content_type": "CHAT_CONTENT_MARKDOWN",
    "content_data": {
      "markdown": "Analyzing your request..."
    },
    "content_delay": 800
  },
  {
    "content_id": "step-2",
    "content_type": "CHAT_CONTENT_MARKDOWN",
    "content_data": {
      "markdown": "Here are the results:"
    },
    "content_delay": 500
  },
  {
    "content_id": "step-3",
    "content_type": "CHAT_CONTENT_MARKDOWN",
    "content_data": {
      "markdown": "**Analysis complete!**"
    }
  }
]
```

### Behavior Notes

- **Applied between items**: The delay occurs AFTER this content item finishes processing, BEFORE the next item in the same queue begins
- **Always applied**: The delay is applied whenever specified, regardless of item position in the queue
- **Skippable**: User interaction (typing, pressing Enter) skips the delay
