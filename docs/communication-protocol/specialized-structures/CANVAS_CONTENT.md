---
description: "Specification for CANVAS_CONTENT specialized structure. Specification for CANVAS_CONTENT in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `CANVAS_CONTENT` Specification

The `CANVAS_CONTENT` is a general type representing any piece of content that can be displayed within the Canvas interface. The Canvas serves as a secondary workspace for presenting detailed information, rich media, or interactive elements. `CANVAS_CONTENT` objects define the structure and data for these visual components.

Each piece of `CANVAS_CONTENT` is defined by a `content_type`, which dictates the kind of information being presented (e.g., markdown text, a section container) and the structure of its associated `content_data`. Multiple `CANVAS_CONTENT` objects can be arranged within a canvas and managed through `CANVAS_ACTION_UPDATE` operations such as replacing or appending contents. Each specific type of `CANVAS_CONTENT` (e.g., `CANVAS_CONTENT_MARKDOWN`, `CANVAS_CONTENT_SECTION`) has its own detailed specification document.

## General Attributes

All `CANVAS_CONTENT` objects, regardless of their specific `content_type`, share the following common attributes:

- `content_id` (string, required): A unique identifier for this specific piece of content within the canvas. This ID is crucial for referencing the content, for example, when it needs to be updated or removed by a `CANVAS_ACTION_MODIFY_CONTENT` or similar action.
- `content_type` (string, required): Defines the specific type of canvas content (e.g., `"CANVAS_CONTENT_MARKDOWN"`, `"CANVAS_CONTENT_SECTION"`). This field determines the expected structure and rendering behavior of the `content_data` object.
- `content_layout_priority` (number, optional): Defines the relative priority for canvas layout positioning. Higher values appear towards the top/beginning of the canvas. Defaults to `0` if not specified. This allows for flexible content ordering without requiring explicit position management.
- `content_section_depth` (number, optional): Indicates the hierarchical depth level for nested canvas sections. Defaults to `0` (root level). Values > 0 indicate nested content, with higher numbers representing deeper nesting levels. This helps with proper visual hierarchy and indentation in complex canvas layouts.
- `content_data` (object, required): An object containing the data specific to that content type. The structure of this object is dependent on the `content_type`.

## Canvas-Specific Attributes

The `CANVAS_CONTENT` specialization adds canvas-oriented attributes that are not present in the base `CONTENT` structure:

### Layout Priority

The `content_layout_priority` attribute provides flexible content ordering:

- **Purpose**: Controls the relative positioning of content within the canvas without requiring explicit position indices
- **Values**: Any number (including negative values)
- **Behavior**: Higher values appear towards the top/beginning of the canvas
- **Use Cases**:
  - Headers and titles (high priority: 100+)
  - Main content (medium priority: 50-99)
  - Supplementary content (low priority: 0-49)
  - Footer content (negative priority: < 0)

### Section Depth

The `content_section_depth` attribute enables hierarchical content organization:

- **Purpose**: Indicates the nesting level for complex, structured canvas layouts
- **Values**: Non-negative integers (0, 1, 2, ...)
- **Behavior**: Higher values represent deeper nesting levels with appropriate visual indentation
- **Use Cases**:
  - Root sections (depth 0)
  - Subsections (depth 1)
  - Sub-subsections (depth 2+)
  - Nested content within complex documents

## JSON Schema Definition for Base `CANVAS_CONTENT`

This schema represents the common structure for any `CANVAS_CONTENT` object. The specific fields within `content_data` will vary based on the `content_type` and are defined in the schemas for those specific content types.

```json
{
  "type": "object",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this piece of content within the canvas."
    },
    "content_type": {
      "type": "string",
      "description": "Defines the specific type of canvas content (e.g., \"CANVAS_CONTENT_MARKDOWN\")."
    },
    "content_layout_priority": {
      "type": "number",
      "default": 0,
      "description": "Optional. Relative priority for canvas layout positioning. Higher values appear towards the top/beginning. Defaults to 0."
    },
    "content_section_depth": {
      "type": "number",
      "default": 0,
      "minimum": 0,
      "description": "Optional. Hierarchical depth level for nested sections. 0 = root level, higher = deeper nesting. Defaults to 0."
    },
    "content_data": {
      "type": "object",
      "description": "Content-specific data. Structure depends on content_type.",
      "additionalProperties": true
    }
  }
}
```

## Example Payloads

The following examples illustrate the general structure of a `CANVAS_CONTENT` object. For detailed `content_data` structures and more examples for each specific content type, please refer to their individual specification files.

### Example 1: Conceptual Full Content Payload Example

This shows the basic framework. The `content_data` would be further defined by the specific `content_type`.

**Content Payload**

```json
{
  "content_id": "canvas-content-unique-id-001",
  "content_type": "SPECIFIC_CANVAS_CONTENT_TYPE", // This would be a concrete type like "CANVAS_CONTENT_MARKDOWN"
  "content_layout_priority": 10, // Optional - higher priority content appears first
  "content_section_depth": 1, // Optional - indicates this is nested content (depth 1)
  "content_data": {
    // "specific_key_1": "specific_value_1", // Example of content-specific data
    // "specific_key_2": "specific_value_2"  // These fields depend on the content_type
  }
}
```

### Example 2: Full Content Payload for a Specific Type (`CANVAS_CONTENT_MARKDOWN`)

This is a common content type. The full details for `CANVAS_CONTENT_MARKDOWN` can be found in its own specification file.

**Content Payload**

```json
{
  "content_id": "canvas-markdown-intro-001",
  "content_type": "CANVAS_CONTENT_MARKDOWN",
  "content_layout_priority": 100, // High priority - appears at top of canvas
  "content_section_depth": 0, // Root level content
  "content_data": {
    "markdown": "# Welcome to the Canvas\n\nThis is a paragraph of text rendered from markdown."
  }
}
```

## Specific CANVAS_CONTENT Types

The `CANVAS_CONTENT` type is a wrapper for various specific content representations. Detailed specifications for each available `content_type` can be found in their respective documents in the type-specifications directory:

- [`CANVAS_CONTENT_MARKDOWN.md`](../type-specifications/CANVAS_CONTENT_MARKDOWN.md)
- [`CANVAS_CONTENT_SECTION.md`](../type-specifications/CANVAS_CONTENT_SECTION.md)

Additional type:

- [`CANVAS_CONTENT_HTML.md`](../type-specifications/CANVAS_CONTENT_HTML.md) — Render raw HTML content (no sanitization performed by the protocol)

Refer to these documents for the specific `content_data` structure and rendering expectations of each type.
