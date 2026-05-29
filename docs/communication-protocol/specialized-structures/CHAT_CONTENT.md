---
description: "Specification for CHAT_CONTENT specialized structure. Specification for CHAT_CONTENT in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `CHAT_CONTENT` Specification

The `CHAT_CONTENT` is a general type representing any piece of content that forms part of a `CHAT_MESSAGE`. These are the building blocks for constructing messages in the chat interface, allowing for rich and interactive communication between the User and the Assistant.

Each `CHAT_CONTENT` object is defined by a `content_type`, which specifies the kind of information being presented (e.g., markdown text, interactive buttons, actionable cards) and the structure of its associated `content_data`. A single `CHAT_MESSAGE` can contain an array of `CHAT_CONTENT` objects, allowing complex messages to be composed from multiple content elements. Each specific type of `CHAT_CONTENT` (e.g., `CHAT_CONTENT_MARKDOWN`, `CHAT_CONTENT_BUTTON`) has its own detailed specification document.

## General Attributes

All `CHAT_CONTENT` objects, regardless of their specific `content_type`, share the following common attributes:

- `content_id` (string, required): A unique identifier for this specific piece of content within a `CHAT_MESSAGE`. This ID is crucial for referencing the content, for example, when an action needs to update a specific button or progress bar identified by its `content_id`. The `content_id` should be unique within the scope of its parent `CHAT_MESSAGE`.
- `content_type` (string, required): Defines the specific type of chat content (e.g., `"CHAT_CONTENT_MARKDOWN"`, `"CHAT_CONTENT_ACTIONABLE_CARDS"`). This field determines the expected structure and rendering behavior of the `content_data` object.
- `content_width` (string, optional): Defines the width behavior for the content element. Defaults to `"WIDTH_AUTO"`. Accepted values are `"WIDTH_AUTO"` (content takes natural width) and `"WIDTH_FULL"` (content expands to full available width).
- `content_group_id` (string, optional): Groups multiple content elements together for visual and functional cohesion. Content elements with the same `content_group_id` are perceived as a single logical unit by the end-user. Defaults to `undefined` (no grouping).
- `content_queue` (string, optional): Named queue for parallel content processing. Content in the same queue is processed sequentially, while different queues run in parallel. This enables simultaneous streaming of independent content elements. Defaults to `"main"`.
- `content_delay` (number, optional): Delay in milliseconds applied AFTER this content item finishes processing, BEFORE the next item in the same queue begins. This is the preferred mechanism for inter-item timing control.
- `content_data` (object, required): An object containing the data specific to that content type. The structure of this object is dependent on the `content_type`.

## Content Width Values

The `content_width` property controls how content elements are sized within the chat interface:

### `WIDTH_AUTO` (Default)

- **Behavior**: Content takes its natural width based on its internal content
- **Use Cases**:
  - Text content that should wrap naturally
  - Buttons that size to their text content
  - Components that should be compact
  - Progress bars with dynamic text lengths
- **Layout Impact**: Content will be centered or aligned according to the UI's default content alignment

### `WIDTH_FULL`

- **Behavior**: Content expands to occupy the full available width of its container
- **Use Cases**:
  - Buttons that should span the full chat width (e.g., primary action buttons)
  - Progress bars that need maximum visibility
  - Card layouts that should use full horizontal space
  - Form elements that benefit from maximum width
- **Layout Impact**: Content stretches to fill the available horizontal space

## Content Grouping

The `content_group_id` property allows multiple content elements to be logically grouped together:

### Grouping Behavior

- **Purpose**: Creates visual and functional cohesion between related content elements
- **Perception**: Content with the same `content_group_id` appears as a single logical unit to users
- **Common Use Cases**:
  - Panel with associated progress bar
  - Image gallery with navigation controls
  - Form sections with related inputs
  - Multi-step process indicators with status displays

### Grouping Examples

- **Panel + Progress Bar**: A data processing panel (`CHAT_CONTENT_PANEL`) paired with its progress indicator (`CHAT_CONTENT_PROGRESS_BAR`)
- **Image + Controls**: An image display with associated action buttons
- **Status Dashboard**: Multiple related progress bars and status indicators

## Content Queue Processing

The `content_queue` property enables parallel processing of independent content streams. This is essential for delivering rich, multi-panel experiences where different content elements can update simultaneously without blocking each other.

### Queue Behavior

- **Sequential within queue**: Content items assigned to the same queue are processed in order, one after another
- **Parallel across queues**: Content items in different queues are processed simultaneously
- **Default queue**: When `content_queue` is not specified, content is assigned to the `"main"` queue

### Common Queue Names

| Queue Name    | Typical Use Case                                             |
| ------------- | ------------------------------------------------------------ |
| `"main"`      | Default queue for primary content (markdown, buttons, chips) |
| `"website"`   | Website screenshot panels and related updates                |
| `"reasoning"` | AI reasoning/thinking panels that stream independently       |
| `"progress"`  | Progress bars and status indicators                          |

### Use Cases

1. **Website Panel + Reasoning Panel**: Display a website screenshot in the `"website"` queue while streaming reasoning thoughts in the `"reasoning"` queue. Both panels animate and update simultaneously.

2. **Multiple Data Sources**: When fetching from multiple APIs, each data source can have its own queue, allowing results to appear as they become available.

3. **Background Processing**: Progress bars in a dedicated queue can update smoothly while primary content continues to stream.

### Example: Parallel Panel Updates

When creating a website panel and a reasoning panel that should update in parallel:

```json
// Website panel - uses "website" queue
{
  "content_id": "website-panel-001",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_queue": "website",
  "content_data": {
    "panel_header_title": "example.com",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_data": { "image_url": "...", "image_alt_text": "..." }
  }
}

// Reasoning panel - uses "reasoning" queue (runs in parallel)
{
  "content_id": "reasoning-panel-001",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_queue": "reasoning",
  "content_data": {
    "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
    "panel_body_data": { "markdown": "Analyzing the website structure..." }
  }
}
```

Both panels will be processed and rendered simultaneously because they are in different queues. Subsequent updates to either panel should use the same queue name to maintain proper sequencing within each stream.

## Content Delay Processing

The `content_delay` property provides fine-grained control over timing between content items within the same queue. Message-level delay (`legacy message-level delay`) has been removed from the protocol API.

### Delay Behavior

- **Applied between items**: The delay occurs AFTER this content item finishes processing (including any streaming animations), BEFORE the next item in the same queue begins
- **Shows "Thinking" indicator**: During the delay, `isAwaitingForDelayToEnd` is set to `true`, displaying the "Thinking..." text, spinning logo, and disabling chat input
- **Skippable**: User interaction (e.g., typing, pressing Enter) skips any pending delay
- **Respects pause state**: If the processor is paused, the delay waits for resume
- **Works with queues**: Functions correctly with parallel queue processing

### When to Use `content_delay`

| Scenario                                    | Recommended Approach                             |
| ------------------------------------------- | ------------------------------------------------ |
| Pause between content items in same message | Use `content_delay` on the item before the pause |
| Pause between separate messages             | Use `content_delay` on the last content item     |
| Natural pacing during streaming             | Use `content_delay` on intermediate items        |
| Dramatic reveal after progress indicator    | Use `content_delay` on the progress content      |

### Validation Rules

| Condition              | Behavior                                                |
| ---------------------- | ------------------------------------------------------- |
| `undefined` or `null`  | No delay applied                                        |
| `<= 0`                 | Console warning, delay skipped                          |
| `> 60000` (60 seconds) | Console warning (suspicious value), delay still applied |

### Example: Staged Content Reveal

```json
// First content item with delay
{
  "content_id": "step-1-progress",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_delay": 800,
  "content_data": {
    "progress_text": "Analyzing...",
    "progress_percent": 100
  }
}

// Second content item (appears after 800ms delay)
{
  "content_id": "step-2-result",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "Analysis complete! Here are the results..."
  }
}
```

> **Note**: `legacy message-level delay` is removed. Use `content_delay` when you need timing control before the next queued item/message.

## JSON Schema Definition for Base `CHAT_CONTENT`

This schema represents the common structure for any `CHAT_CONTENT` object. The specific fields within `content_data` will vary based on the `content_type` and are defined in the schemas for those specific content types.

```json
{
  "type": "object",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this piece of content within a CHAT_MESSAGE."
    },
    "content_type": {
      "type": "string",
      "description": "Defines the specific type of chat content (e.g., \"CHAT_CONTENT_MARKDOWN\")."
    },
    "content_width": {
      "type": "string",
      "enum": ["WIDTH_AUTO", "WIDTH_FULL"],
      "default": "WIDTH_AUTO",
      "description": "Defines the width behavior for the content element. WIDTH_AUTO allows content to take natural width, WIDTH_FULL expands content to full available width."
    },
    "content_group_id": {
      "type": "string",
      "description": "Optional identifier for grouping multiple content elements together. Content elements with the same content_group_id are perceived as a single logical unit."
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
      "description": "Content-specific data. Structure depends on content_type.",
      "additionalProperties": true
    }
  }
}
```

## Example Payloads

The following examples illustrate the general structure of a `CHAT_CONTENT` object. For detailed `content_data` structures and more examples for each specific content type, please refer to their individual specification files.

### Example 1: Conceptual Full Content Payload Example

This shows the basic framework. The `content_data` would be further defined by the specific `content_type`.

**Content Payload**

```json
{
  "content_id": "chatmessage-001-content-01",
  "content_type": "SPECIFIC_CHAT_CONTENT_TYPE", // This would be a concrete type like "CHAT_CONTENT_MARKDOWN"
  "content_width": "WIDTH_AUTO", // Optional - defaults to WIDTH_AUTO if not specified
  "content_group_id": "related-content-group", // Optional - groups content elements together
  "content_queue": "main", // Optional - defaults to "main" for sequential processing
  "content_delay": 500, // Optional - milliseconds to wait after this item before next
  "content_data": {
    // "specific_key_1": "specific_value_1", // Example of content-specific data
    // "specific_key_2": "specific_value_2"  // These fields depend on the content_type
  }
}
```

### Example 2: Full Content Payload for a Specific Type (`CHAT_CONTENT_BUTTON`)

This is a common content type. The full details for `CHAT_CONTENT_BUTTON` can be found in its own specification file.

**Content Payload**

```json
{
  "content_id": "chatmessage-001-content-02-button-confirm",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "button_text": "Confirm Purchase",
    "button_style": "BUTTON_STYLE_PRIMARY",
    "button_actions": [
      {
        "action_id": "chatmessage-001-action-confirm-purchase",
        "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
        "action_data": {
          "target": "CHAT",
          "role": "USER",
          "text": "Yes, I confirm my purchase."
        }
      }
    ]
  }
}
```

## Specific CHAT_CONTENT Types

The `CHAT_CONTENT` type is a wrapper for various specific content representations. Detailed specifications for each available `content_type` can be found in their respective documents in the type-specifications directory:

- [`CHAT_CONTENT_ACTIONABLE_CARDS.md`](../type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md)
- [`CHAT_CONTENT_ACTIONABLE_CHIPS.md`](../type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md)
- [`CHAT_CONTENT_ACTION_WRAPPER.md`](../type-specifications/CHAT_CONTENT_ACTION_WRAPPER.md)
- [`CHAT_CONTENT_BUTTON.md`](../type-specifications/CHAT_CONTENT_BUTTON.md)
- [`CHAT_CONTENT_MARKDOWN.md`](../type-specifications/CHAT_CONTENT_MARKDOWN.md)
- [`CHAT_CONTENT_PANEL.md`](../type-specifications/CHAT_CONTENT_PANEL.md)
- [`CHAT_CONTENT_PROGRESS_BAR.md`](../type-specifications/CHAT_CONTENT_PROGRESS_BAR.md)

Refer to these documents for the specific `content_data` structure and rendering expectations of each type.
