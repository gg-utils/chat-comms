---
description: "Specification for CANVAS_CONTENT_SECTION in the communication protocol. This file defines the complete specification, schema definitions, and implementation patterns for creating structured sections within canvas interfaces that can contain nested content. For usage examples, see the companion usage examples file. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](../README.md)**

# CANVAS_CONTENT_SECTION Specification

## Specification

### Type Definition

`CANVAS_CONTENT_SECTION` is a content type that creates structured sections within canvas interfaces. Sections provide visual grouping, optional collapsible behavior, and hierarchical organization for complex content layouts. Each section can contain nested content of any type, enabling the creation of sophisticated, organized displays with multiple levels of information hierarchy.

## JSON Schema Definition for `content_data`

The `content_data` for `CANVAS_CONTENT_SECTION` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["section_title", "section_contents"],
  "properties": {
    "section_title": {
      "type": "string",
      "description": "Title displayed in the section header."
    },
    "section_collapsed": {
      "type": "boolean",
      "default": false,
      "description": "Optional. Whether the section starts collapsed. Defaults to false."
    },
    "section_style": {
      "type": "string",
      "enum": ["DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT"],
      "default": "DEFAULT",
      "description": "Optional visual style variant for the section."
    },
    "section_contents": {
      "type": "array",
      "description": "Array of nested ChatComms_RuntimeChat_CanvasContent items within this section.",
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
}
```

## Zod Schema Definition for `content_data`

```typescript
import { z } from "zod";

// Define canvasContentSchema recursively to handle nested sections
const baseCanvasContentSchema = z.object({
  content_id: z.string(),
  content_type: z.string(),
  content_data: z.object({}).passthrough(),
});

type ChatComms_RuntimeChat_CanvasContent = z.infer<typeof baseCanvasContentSchema> & {
  content_data:
    | {
        section_contents?: ChatComms_RuntimeChat_CanvasContent[];
        // other content_data properties
      }
    | Record<string, unknown>; // Allows other content_data types
};

const canvasContentSchema: z.ZodType<ChatComms_RuntimeChat_CanvasContent> = baseCanvasContentSchema.extend({
  content_data: z.lazy(
    () =>
      z
        .object({
          section_title: z.string().optional(), // only for section
          section_collapsed: z.boolean().default(false).optional(), // only for section
          section_style: z
            .enum(["DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT"])
            .default("DEFAULT")
            .optional(), // only for section
          section_contents: z.array(canvasContentSchema).optional(), // only for section
        })
        .passthrough() // Allows other properties for non-section types
  ),
});

const contentDataSchema = z.object({
  section_title: z.string(),
  section_collapsed: z.boolean().default(false).optional(),
  section_style: z
    .enum(["DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT"])
    .default("DEFAULT")
    .optional(),
  section_contents: z.array(canvasContentSchema),
});
```

## Joi Schema Definition for `content_data`

```javascript
const Joi = require("joi");

// Define canvasContentSchema recursively to handle nested sections
const canvasContentSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().required(),
  content_data: Joi.alternatives()
    .try(
      Joi.lazy(() => contentDataSchema), // For nested sections
      Joi.object().unknown(true) // For other content types
    )
    .required(),
});

const contentDataSchema = Joi.object({
  section_title: Joi.string().required(),
  section_collapsed: Joi.boolean().default(false),
  section_style: Joi.string()
    .valid("DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT")
    .default("DEFAULT"),
  section_contents: Joi.array()
    .items(Joi.lazy(() => canvasContentSchema))
    .required(),
});
```

## Yup Schema Definition for `content_data`

```javascript
import * as yup from "yup";

// Define canvasContentSchema recursively to handle nested sections
const canvasContentSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().required(),
  content_data: yup.lazy((value) => {
    if (value && value.section_title !== undefined) {
      // Heuristic to check if it's a section
      return contentDataSchema;
    }
    return yup.object().required(); // For other content types
  }),
});

const contentDataSchema = yup.object().shape({
  section_title: yup.string().required(),
  section_collapsed: yup.boolean().default(false),
  section_style: yup
    .string()
    .oneOf(["DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT"])
    .default("DEFAULT"),
  section_contents: yup.array().of(canvasContentSchema).required(),
});
```

### Example Full Content Payload

**Content Payload**

```json
{
  "content_id": "string", // required - unique identifier for the section
  "content_type": "CANVAS_CONTENT_SECTION", // required - must be exactly this value
  "content_data": {
    "section_title": "string", // required - title displayed in the section header
    "section_collapsed": boolean, // optional - whether section starts collapsed (default: false)
    "section_style": "string", // optional - visual style variant
    "section_contents": [] // required - array of nested content items
  }
}
```

### Properties

| Property                         | Type    | Required | Description                                                    |
| -------------------------------- | ------- | -------- | -------------------------------------------------------------- |
| `content_id`                     | string  | Yes      | Unique identifier for this section within the canvas           |
| `content_type`                   | string  | Yes      | Must be `"CANVAS_CONTENT_SECTION"`                             |
| `content_data.section_title`     | string  | Yes      | Title displayed in the section header                          |
| `content_data.section_collapsed` | boolean | No       | Whether section starts collapsed (default: false)              |
| `content_data.section_style`     | string  | No       | Visual style variant (DEFAULT, BORDERED, HIGHLIGHTED, COMPACT) |
| `content_data.section_contents`  | array   | Yes      | Array of nested content items (any valid content type)         |

### Section Styles

- **`DEFAULT`**: Standard section with minimal visual styling
- **`BORDERED`**: Section with visible border and padding
- **`HIGHLIGHTED`**: Section with background color or emphasis styling
- **`COMPACT`**: Section with reduced spacing and smaller typography

### Supported Features

- **Hierarchical Organization**: Unlimited nesting of sections within sections
- **Collapsible Behavior**: Sections can be expanded/collapsed by users
- **Mixed Content Types**: Sections can contain any combination of content types
- **Visual Styling**: Multiple style variants for different use cases
- **Progressive Disclosure**: Show/hide detailed information as needed
- **Logical Grouping**: Organize related content into cohesive units

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CANVAS_CONTENT_SECTION Usage Examples](../type-usage-examples/CANVAS_CONTENT_SECTION.md)**

## Implementation Notes

1. **Section Hierarchy**: Sections can be nested within other sections to create complex hierarchical structures. However, limit nesting depth to maintain readability (typically 3 levels maximum).

2. **Collapse Behavior**: The `section_collapsed` property controls initial display state. Users should be able to toggle this in the UI through clickable section headers or dedicated controls.

3. **Content Organization**: Use sections to group related content logically, making complex information easier to navigate and understand.

4. **Performance Refinement**: Deep nesting should be used judiciously as it can impact rendering performance. Consider lazy loading for content-heavy sections.

5. **State Management**: Efficiently manage section collapse/expand states, potentially persisting user preferences for section visibility.

6. **Responsive Design**: Ensure sections adapt gracefully to different canvas sizes and device types, potentially adjusting nesting display on smaller screens.

## Style Guidelines

### Default Style

- Standard section appearance with minimal visual styling
- Clean separation without distracting design elements
- Ideal for general content organization and documentation

### Bordered Style

- Enhanced visual separation with visible borders and padding
- Excellent for detailed subsections and complex information hierarchies
- Helps distinguish different types of content within the same canvas

### Highlighted Style

- Special background color or emphasis styling to draw attention
- Perfect for important announcements, key metrics, or critical information
- Use sparingly to maintain visual hierarchy and prevent overwhelming users

### Compact Style

- Reduced spacing and smaller typography for dense information displays
- Useful when screen real estate is limited
- Maintains readability while conserving space

## Common Usage Patterns

### Report Structure

Organize organization reports with clear hierarchical sections:

- Executive Summary (always visible)
- Financial Performance (collapsible, bordered)
- Technical Metrics (collapsible, bordered)
- Detailed Appendices (collapsible)

### Dashboard Layout

Structure operational dashboards for progressive disclosure:

- Key Metrics Overview (highlighted, always expanded)
- Detailed Analytics (bordered, initially collapsed)
- System Status (default style)
- Alert/Warning Sections (highlighted when active)

### Documentation Organization

Create structured technical documentation:

- Overview and Getting Started (default)
- API Reference (bordered, collapsible sections)
- Examples and Tutorials (organized by topic)
- Troubleshooting (collapsible for easy access)

### Settings Panels

Organize configuration interfaces:

- Account Information (always visible)
- Notification Preferences (collapsible)
- Privacy Settings (collapsible)
- Advanced Configuration (collapsible, compact)

## Best Practices

### Content Structure

1. **Logical Grouping**: Group related content together in meaningful sections
2. **Meaningful Titles**: Use descriptive section titles that clearly indicate the contained content
3. **Appropriate Nesting**: Balance hierarchy depth with usability - avoid overly complex nesting
4. **Progressive Disclosure**: Use collapsed sections for detailed information that's not immediately needed

### Visual Design

1. **Consistent Styling**: Use section styles consistently across similar content types
2. **Visual Hierarchy**: Use different section styles to create clear information hierarchy
3. **Content Balance**: Balance collapsed and expanded sections for optimal initial presentation
4. **Responsive Behavior**: Ensure sections work well across different screen sizes

### User Experience

1. **Intuitive Navigation**: Make section structure easy to understand and navigate
2. **Clear Expectations**: Section titles should clearly indicate what content users will find
3. **State Persistence**: Consider remembering user preferences for section visibility
4. **Accessibility**: Maintain proper ARIA labels and keyboard navigation support

## Integration Patterns

Sections work effectively when combined with:

1. **Canvas Actions**: Use `CANVAS_ACTION_UPDATE` to dynamically modify section content and state
2. **Mixed Content Types**: Combine markdown, interactive elements, and other content types within sections
3. **Real-time Updates**: Update section titles and content to reflect changing system states
4. **User Interactions**: Allow users to customize section visibility and organization

## Performance Considerations

1. **Lazy Loading**: Consider lazy loading content for deeply nested or content-heavy sections
2. **Efficient Updates**: Use targeted content updates rather than full section re-rendering
3. **Memory Management**: Properly manage resources for collapsed sections with heavy content
4. **Render Refinement**: Refine rendering for sections with frequently changing content

## Error Handling

1. **Content Validation**: Validate nested content structure and handle malformed content gracefully
2. **Fallback Rendering**: Provide meaningful fallbacks when section content cannot be rendered
3. **State Recovery**: Handle cases where section state becomes inconsistent
4. **Nested Error Isolation**: Prevent errors in nested content from breaking parent sections

## Accessibility Guidelines

1. **Semantic Structure**: Use proper heading hierarchy and semantic markup
2. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
3. **Screen Reader Support**: Provide appropriate ARIA labels and descriptions
4. **Focus Management**: Handle focus properly when sections are collapsed/expanded
5. **Content Relationship**: Clearly indicate relationships between nested content sections
