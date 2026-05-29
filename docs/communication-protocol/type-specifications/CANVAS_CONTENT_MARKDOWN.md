---
description: "Specification for CANVAS_CONTENT_MARKDOWN in the communication protocol. This file defines the complete specification and core structure for rendering markdown-formatted content within canvas interfaces. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](../README.md)**

# CANVAS_CONTENT_MARKDOWN Specification

## Specification

### Type Definition

`CANVAS_CONTENT_MARKDOWN` is a content type that renders markdown-formatted text within canvas interfaces. It provides rich text formatting capabilities including headers, lists, links, code blocks, tables, and other markdown elements. This content type is essential for displaying structured documents, reports, and formatted information in the canvas.

## Example Full Content Payload

This shows an example of a complete `CANVAS_CONTENT_MARKDOWN` object.

**Content Payload**

```json
{
  "content_id": "canvas-markdown-example-001",
  "content_type": "CANVAS_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "# Example Title\n\nThis is **example** markdown content.",
    "markdown_style": "DEFAULT"
  }
}
```

### Properties

| Property                      | Type   | Required | Description                                          |
| ----------------------------- | ------ | -------- | ---------------------------------------------------- |
| `content_id`                  | string | Yes      | Unique identifier for this content within the canvas |
| `content_type`                | string | Yes      | Must be `"CANVAS_CONTENT_MARKDOWN"`                  |
| `content_data.markdown`       | string | Yes      | Markdown-formatted text content to render            |
| `content_data.markdown_style` | string | No       | Style variant: `"DEFAULT"`, `"COMPACT"`, `"LARGE"`   |

## Markdown Styles

- **`DEFAULT`**: Standard markdown rendering with normal spacing and typography
- **`COMPACT`**: Reduced spacing and smaller text for dense information display
- **`LARGE`**: Increased spacing and larger text for emphasis or readability

## JSON Schema Definition for `content_data`

The `content_data` for `CANVAS_CONTENT_MARKDOWN` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["markdown"],
  "properties": {
    "markdown": {
      "type": "string",
      "description": "Markdown-formatted text content to render."
    },
    "markdown_style": {
      "type": "string",
      "enum": ["DEFAULT", "COMPACT", "LARGE"],
      "default": "DEFAULT",
      "description": "Optional style variant for the markdown rendering (DEFAULT, COMPACT, LARGE)."
    }
  }
}
```

## Zod Schema Definition for `content_data`

```typescript
import { z } from "zod";

const contentDataSchema = z.object({
  markdown: z.string(),
  markdown_style: z.enum(["DEFAULT", "COMPACT", "LARGE"]).default("DEFAULT").optional(),
});
```

## Joi Schema Definition for `content_data`

```javascript
const Joi = require("joi");

const contentDataSchema = Joi.object({
  markdown: Joi.string().required(),
  markdown_style: Joi.string().valid("DEFAULT", "COMPACT", "LARGE").default("DEFAULT"),
});
```

## Yup Schema Definition for `content_data`

```javascript
import * as yup from "yup";

const contentDataSchema = yup.object().shape({
  markdown: yup.string().required(),
  markdown_style: yup.string().oneOf(["DEFAULT", "COMPACT", "LARGE"]).default("DEFAULT"),
});
```

### Supported Markdown Features

The markdown content supports standard markdown syntax including:

- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Text Formatting**: `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``
- **Lists**: Ordered (`1. item`) and unordered (`- item`) lists
- **Links**: `[text](url)` and reference-style links
- **Images**: `![alt](url)` (when supported by the implementation)
- **Code Blocks**: ``` fenced code blocks with syntax highlighting
- **Tables**: Markdown table syntax with pipes
- **Blockquotes**: `> quoted text`
- **Horizontal Rules**: `---` or `***`
- **Line Breaks**: Double space or double newline for breaks

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CANVAS_CONTENT_MARKDOWN Usage Examples](../type-usage-examples/CANVAS_CONTENT_MARKDOWN.md)**

## Implementation Notes

1. **Markdown Parsing**: Canvas implementations should support standard markdown syntax with proper rendering of all common elements including headers, lists, links, code blocks, tables, blockquotes, and horizontal rules.

2. **Style Application**: The `markdown_style` property should affect typography, spacing, and overall presentation without altering the semantic structure. Different styles should maintain content hierarchy while adapting visual presentation.

3. **Performance Refinement**: Large markdown documents should be rendered efficiently, potentially with lazy loading for very long content. Consider virtualization for extremely large documents.

4. **Accessibility Compliance**: Rendered markdown should maintain proper heading hierarchy and semantic structure for screen readers. Ensure proper ARIA labels and keyboard navigation support.

5. **Responsive Design**: Markdown content should adapt gracefully to different canvas sizes and device types. Tables should handle overflow with horizontal scrolling when necessary.

6. **Code Highlighting**: Code blocks should support syntax highlighting when possible, with fallback to monospace formatting. Language detection should be automatic or based on specified language tags.

7. **Security Considerations**: Sanitize markdown content to prevent XSS attacks. Be cautious with HTML elements and external links within markdown content.

8. **Content Management**: Provide mechanisms for updating markdown content dynamically without full re-rendering when possible.

## Best Practices

### Content Structure

- Use proper heading hierarchy (H1 → H2 → H3) for document organization
- Balance text density with white space for optimal readability
- Structure lists logically with parallel construction
- Choose appropriate markdown elements for their semantic meaning

### Performance Guidelines

- Consider breaking very long documents into sections or multiple content blocks
- Refine rendering for large tables that may need horizontal scrolling
- Implement efficient style switching that doesn't cause layout thrashing
- Cache parsed markdown when content doesn't change frequently

### Style Selection

- **DEFAULT**: Standard spacing and typography, ideal for general documentation and reports
- **COMPACT**: Reduced spacing for dense information displays, dashboards, and status summaries
- **LARGE**: Increased spacing for presentations, key announcements, and enhanced readability

### Integration Patterns

Canvas markdown content works effectively when combined with:

1. **Section Headers**: Using CANVAS_CONTENT_SECTION for organized layouts
2. **Interactive Elements**: Buttons and actions for document interaction
3. **Data Visualization**: Charts and graphs alongside textual content
4. **Navigation**: Table of contents and document structure guides

## Common Use Cases

- **Technical Documentation**: API guides, user manuals, troubleshooting guides
- **Organization Reports**: Analysis reports, research findings, status updates
- **Project Management**: Meeting notes, project updates, team communications
- **Reference Materials**: FAQs, knowledge bases, best practices documentation
- **Content Publishing**: Articles, blog posts, educational materials
- **Dashboard Displays**: Status summaries, metric descriptions, system information

## Error Handling

- **Invalid Markdown**: Gracefully handle malformed markdown syntax with appropriate fallbacks
- **Large Content**: Implement loading states and error boundaries for large documents
- **Rendering Failures**: Provide meaningful error messages when markdown cannot be processed
- **Style Conflicts**: Handle cases where style properties conflict with content requirements

## Extensibility

Consider supporting:

- **Custom Markdown Extensions**: Project-specific markdown syntax extensions
- **Theme Integration**: Consistent styling with application theme systems
- **Plugin Architecture**: Support for additional markdown processors or renderers
- **Content Validation**: Schema validation for markdown content before rendering
