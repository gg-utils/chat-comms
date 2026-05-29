---
description: "Specification for CHAT_CONTENT_ACTIONABLE_CHIPS in the communication protocol. This file defines the complete specification, schema definitions, and core implementation guidance for creating actionable chip interfaces within chat messages for quick selections. UPDATED: This specification now uses unified chip object property naming convention: - chip_text (string, required): Text displayed on the chip - chip_value (string, required): Value associated with the chip for processing - chip_actions (array of Action objects, required): Actions to execute when chip is selected - chip_style (string, optional): Visual style for the chip (unchanged) - chip_state (string, optional): Interaction state of the chip (unchanged) IMPORTANT: This specification currently supports SINGLE SELECTION ONLY. Multiple selection is a planned future feature that is not yet implemented. All code should be structurally prepared for the future addition of multiple selection capabilities while currently enforcing single selection behavior. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. Key dependencies and related files: - Base structures: ../base-structures/ACTION.md, ../base-structures/CONTENT.md - Related actions: ./CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md - Usage examples: ../type-usage-examples/CHAT_CONTENT_ACTIONABLE_CHIPS.md - Schema definitions: ../../ignore/schemas.md @future Multiple selection mode - Planned for future implementation Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_CONTENT_ACTIONABLE_CHIPS Specification

## Specification

### Type Definition

`CHAT_CONTENT_ACTIONABLE_CHIPS` is a content type that renders small, compact actionable buttons (chips) within chat messages. Chips provide a quick and efficient way for users to make selections from a set of options without the visual weight of full cards. They are ideal for categories, tags, quick filters, or simple choices.

**⚠️ CURRENT LIMITATION**: This component currently supports single selection only. Multiple selection is planned for future implementation. Code should be designed to accommodate future multiple selection capabilities.

### Example Full Content Payload

**Content Payload**

```json
{
  "content_id": "string", // required - unique identifier for the content
  "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS", // required - must be exactly this value
  "content_width": "WIDTH_AUTO", // optional - defaults to WIDTH_AUTO
  "content_data": {
    "actionable_chips_selection_mode": "SINGLE", // required - currently only "SINGLE" is supported
    "actionable_chips_selection_state": "string", // required - current selection state
    "actionable_chips_items": "array" // required - array of chip objects
  }
}
```

### Properties

| Property                                        | Type   | Required | Default        | Description                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`                                    | string | Yes      |                | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`                                  | string | Yes      |                | Must be `"CHAT_CONTENT_ACTIONABLE_CHIPS"`                                                                                                                                                                                               |
| `content_width`                                 | string | No       | `"WIDTH_AUTO"` | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`                                 | string | No       | `"main"`       | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`                                 | number | No       | `undefined`    | Milliseconds to delay AFTER this content finishes processing, BEFORE the next item in the same queue begins. Useful for creating natural pacing between interactive elements.                                                           |
| `content_data.actionable_chips_selection_mode`  | string | Yes      |                | Selection behavior: `"SINGLE"` (multiple selection planned for future)                                                                                                                                                                  |
| `content_data.actionable_chips_selection_state` | string | Yes      |                | Current state: `"PENDING_SELECTION"`, `"SELECTED"`, `"UNSELECTED"`                                                                                                                                                                      |
| `content_data.actionable_chips_items`           | array  | Yes      |                | Array of chip objects with text, value, style, and actions                                                                                                                                                                              |

## Chip Item Schema

The schema for items within `actionable_chips_items` is defined as part of the `content_data` schemas above. Each item includes:

- `chip_text` (string, required) - Text displayed on the chip
- `chip_value` (string, required) - Value associated with the chip for processing
- `chip_style` (string, optional) - Visual style for the chip
- `chip_state` (string, optional) - Interaction state of the chip
- `chip_actions` (array of Action objects, required) - Actions to execute when chip is selected

### Selection Modes

- **`SINGLE`**: Only one chip can be selected at a time (CURRENT IMPLEMENTATION)

**🔮 FUTURE IMPLEMENTATION**: `MULTIPLE` selection mode is planned for future releases. When implemented, it will allow multiple chips to be selected simultaneously.

### Selection States

- **`PENDING_SELECTION`**: User has not yet made a selection
- **`SELECTED`**: A chip has been selected (currently limited to one chip at a time)
- **`UNSELECTED`**: Selection has been cleared or reset

### Chip Styles

- **`CHIP_STYLE_PRIMARY`**: Primary brand color, for main actions
- **`CHIP_STYLE_SECONDARY`**: Secondary styling, for alternative actions

### Chip States

- **`ENABLED`**: Chip is interactive and can be selected
- **`DISABLED`**: Chip is non-interactive and appears grayed out
- **`SELECTED`**: Chip is currently selected (visual feedback shown)

## JSON Schema Definition

The complete schema for `CHAT_CONTENT_ACTIONABLE_CHIPS` adheres to the following structure:

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
      "enum": ["CHAT_CONTENT_ACTIONABLE_CHIPS"],
      "description": "Must be CHAT_CONTENT_ACTIONABLE_CHIPS."
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
      "description": "Milliseconds to delay AFTER this content finishes processing, BEFORE the next item in the same queue begins."
    },
    "content_data": {
      "type": "object",
      "required": [
        "actionable_chips_selection_mode",
        "actionable_chips_selection_state",
        "actionable_chips_items"
      ],
      "properties": {
        "actionable_chips_selection_mode": {
          "type": "string",
          "enum": ["SINGLE"],
          "description": "Selection behavior: SINGLE only (multiple selection planned for future implementation)."
        },
        "actionable_chips_selection_state": {
          "type": "string",
          "enum": ["PENDING_SELECTION", "SELECTED", "UNSELECTED"],
          "description": "Current selection state of the chips interface."
        },
        "actionable_chips_items": {
          "type": "array",
          "description": "Array of chip items available for selection.",
          "items": {
            "type": "object",
            "required": ["chip_text", "chip_value", "chip_actions"],
            "properties": {
              "chip_text": {
                "type": "string",
                "description": "Text displayed on the chip."
              },
              "chip_value": {
                "type": "string",
                "description": "Value associated with the chip for processing."
              },
              "chip_style": {
                "type": "string",
                "enum": ["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"],
                "default": "CHIP_STYLE_SECONDARY",
                "description": "Optional visual style for the chip."
              },
              "chip_state": {
                "type": "string",
                "enum": ["ENABLED", "DISABLED", "SELECTED"],
                "default": "ENABLED",
                "description": "Optional interaction state of the chip."
              },
              "chip_actions": {
                "type": "array",
                "description": "Actions to execute when chip is selected.",
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
              }
            }
          }
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
 * Base action schema for chip interactions
 * @description Defines the structure of actions that can be triggered by chip selection
 */
const baseActionSchema = z.object({
  action_id: z.string(),
  action_type: z.string(),
  action_data: z.object({}).passthrough(),
});

/**
 * Individual actionable chip item schema
 * @description Defines the structure of a single chip within the actionable chips component
 * @note Currently single selection only - design should accommodate future multiple selection
 * @note Updated to use unified chip property naming convention (chip_text, chip_value, chip_actions)
 */
const actionableChipItemSchema = z.object({
  chip_text: z.string(),
  chip_value: z.string(),
  chip_style: z
    .enum(["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"])
    .default("CHIP_STYLE_SECONDARY")
    .optional(),
  chip_state: z.enum(["ENABLED", "DISABLED", "SELECTED"]).default("ENABLED").optional(),
  chip_actions: z.array(baseActionSchema),
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CHIPS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = z.object({
  actionable_chips_selection_mode: z.enum(["SINGLE"]), // Future: will include 'MULTIPLE'
  actionable_chips_selection_state: z.enum(["PENDING_SELECTION", "SELECTED", "UNSELECTED"]),
  actionable_chips_items: z.array(actionableChipItemSchema),
});

const chatContentActionableChipsSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_ACTIONABLE_CHIPS"),
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
 * Base action schema for chip interactions
 * @description Defines the structure of actions that can be triggered by chip selection
 */
const baseActionSchema = Joi.object({
  action_id: Joi.string().required(),
  action_type: Joi.string().required(),
  action_data: Joi.object().unknown(true),
});

/**
 * Individual actionable chip item schema
 * @description Defines the structure of a single chip within the actionable chips component
 * @note Currently single selection only - design should accommodate future multiple selection
 * @note Updated to use unified chip property naming convention (chip_text, chip_value, chip_actions)
 */
const actionableChipItemSchema = Joi.object({
  chip_text: Joi.string().required(),
  chip_value: Joi.string().required(),
  chip_style: Joi.string()
    .valid("CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY")
    .default("CHIP_STYLE_SECONDARY"),
  chip_state: Joi.string().valid("ENABLED", "DISABLED", "SELECTED").default("ENABLED"),
  chip_actions: Joi.array().items(baseActionSchema).required(),
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CHIPS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = Joi.object({
  actionable_chips_selection_mode: Joi.string().valid("SINGLE").required(), // Future: will include 'MULTIPLE'
  actionable_chips_selection_state: Joi.string()
    .valid("PENDING_SELECTION", "SELECTED", "UNSELECTED")
    .required(),
  actionable_chips_items: Joi.array().items(actionableChipItemSchema).required(),
});

const chatContentActionableChipsSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_ACTIONABLE_CHIPS").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number().optional(),
  content_data: contentDataSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

/**
 * Base action schema for chip interactions
 * @description Defines the structure of actions that can be triggered by chip selection
 */
const baseActionSchema = yup.object().shape({
  action_id: yup.string().required(),
  action_type: yup.string().required(),
  action_data: yup.object(),
});

/**
 * Individual actionable chip item schema
 * @description Defines the structure of a single chip within the actionable chips component
 * @note Currently single selection only - design should accommodate future multiple selection
 * @note Updated to use unified chip property naming convention (chip_text, chip_value, chip_actions)
 */
const actionableChipItemSchema = yup.object().shape({
  chip_text: yup.string().required(),
  chip_value: yup.string().required(),
  chip_style: yup
    .string()
    .oneOf(["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"])
    .default("CHIP_STYLE_SECONDARY"),
  chip_state: yup.string().oneOf(["ENABLED", "DISABLED", "SELECTED"]).default("ENABLED"),
  chip_actions: yup.array().of(baseActionSchema).required(),
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CHIPS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = yup.object().shape({
  actionable_chips_selection_mode: yup.string().oneOf(["SINGLE"]).required(), // Future: will include 'MULTIPLE'
  actionable_chips_selection_state: yup
    .string()
    .oneOf(["PENDING_SELECTION", "SELECTED", "UNSELECTED"])
    .required(),
  actionable_chips_items: yup.array().of(actionableChipItemSchema).required(),
});

const chatContentActionableChipsSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_ACTIONABLE_CHIPS"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number().optional(),
  content_data: contentDataSchema.required(),
});
```

## Usage Examples

### Using content_delay and content_queue

The `content_delay` and `content_queue` properties enable fine-grained control over timing and parallel processing of interactive chip content.

**Example: Quick action chips with delay for visual pacing**

```json
{
  "content_id": "msg-001-content-01-chips",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
  "content_queue": "main",
  "content_delay": 500,
  "content_data": {
    "actionable_chips_selection_mode": "SINGLE",
    "actionable_chips_selection_state": "PENDING_SELECTION",
    "actionable_chips_items": [
      {
        "chip_text": "Yes, continue",
        "chip_value": "continue",
        "chip_style": "CHIP_STYLE_PRIMARY",
        "chip_actions": [
          {
            "action_id": "msg-001-continue",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
            "action_data": { "selected_value": "continue" }
          }
        ]
      },
      {
        "chip_text": "No, start over",
        "chip_value": "restart",
        "chip_style": "CHIP_STYLE_SECONDARY",
        "chip_actions": [
          {
            "action_id": "msg-001-restart",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
            "action_data": { "selected_value": "restart" }
          }
        ]
      },
      {
        "chip_text": "Learn more",
        "chip_value": "info",
        "chip_style": "CHIP_STYLE_SECONDARY",
        "chip_actions": [
          {
            "action_id": "msg-001-info",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
            "action_data": { "selected_value": "info" }
          }
        ]
      }
    ]
  }
}
```

In this example:

- `content_queue: "main"` processes chips in the main content queue
- `content_delay: 500` adds a 500ms pause after the chips appear, creating a natural pacing before subsequent content

**Example: Parallel queue for category filters**

```json
{
  "content_id": "msg-001-content-02-filters",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
  "content_queue": "filters",
  "content_delay": 300,
  "content_data": {
    "actionable_chips_selection_mode": "SINGLE",
    "actionable_chips_selection_state": "PENDING_SELECTION",
    "actionable_chips_items": [
      {
        "chip_text": "Technology",
        "chip_value": "tech",
        "chip_style": "CHIP_STYLE_SECONDARY",
        "chip_actions": [
          {
            "action_id": "msg-001-filter-tech",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
            "action_data": {
              "target": "CHAT",
              "actionable_chips_content_id": "msg-001-content-01-filters",
              "selected_chip_value": "tech",
              "selected_chip_text": "Technology"
            }
          }
        ]
      },
      {
        "chip_text": "Healthcare",
        "chip_value": "health",
        "chip_style": "CHIP_STYLE_SECONDARY",
        "chip_actions": [
          {
            "action_id": "msg-001-filter-health",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
            "action_data": {
              "target": "CHAT",
              "actionable_chips_content_id": "msg-001-content-01-filters",
              "selected_chip_value": "health",
              "selected_chip_text": "Healthcare"
            }
          }
        ]
      }
    ]
  }
}
```

Using `content_queue: "filters"` processes these chips independently from the main queue, allowing filter chips to appear in parallel with primary content.

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_ACTIONABLE_CHIPS Usage Examples](../type-usage-examples/CHAT_CONTENT_ACTIONABLE_CHIPS.md)**

## Implementation Notes

1. **Current Single Selection Enforcement**: All chip implementations currently enforce single selection behavior. When a user selects a chip, any previously selected chip in the same set must be deselected automatically.

2. **Future Multiple Selection Preparation**: Code should be architected to easily accommodate multiple selection when it becomes available. Consider using arrays for selected values and toggle-based selection logic.

3. **Visual Styling**: The supported CHIP_STYLE_PRIMARY and CHIP_STYLE_SECONDARY chip styles provide visual hierarchy within the current single selection constraint.

4. **State Management**: Chip states must be managed to ensure only one chip can be in the "SELECTED" state at any given time, but the data structure should support multiple selections in the future.

5. **Action Execution**: Each chip can trigger multiple actions when selected, but selection behavior remains single-only for now.

6. **Action ID Convention**: All action IDs must be prefixed with the message ID as per the protocol convention.

7. **Responsive Design**: Chips should wrap to multiple lines when space is limited while maintaining current single selection behavior.

8. **Future-Ready Architecture**: Design data structures and state management to easily extend to multiple selection without major refactoring.

## Expected UI Behavior

- Chips render as small, rounded, clickable elements
- Text displays clearly within each chip
- Chips use CHIP_STYLE_PRIMARY or CHIP_STYLE_SECONDARY styling based on `chip_style`
- Disabled chips appear grayed out and are non-interactive
- Currently only one chip can be selected at a time (single selection enforcement)
- Selecting a chip automatically deselects any previously selected chip
- Selected chips show clear visual feedback (highlight, check mark, etc.)
- Hover/focus states provide interaction feedback
- Keyboard navigation allows selection via Enter/Space
- Chips wrap to new lines when horizontal space is limited
- **Future-Ready**: UI should be designed to handle multiple selections when the feature is implemented

## Use Cases

**Current Single Selection Use Cases:**

- **Quick Preferences**: Choosing one preference from multiple options
- **Category Selection**: Selecting a single category from available options
- **Rating/Feedback**: Providing a single rating or feedback choice
- **Priority Levels**: Setting a single priority level for tasks
- **Time Ranges**: Selecting a single time period for analysis
- **Quick Actions**: Choosing one action from available options
- **Binary Choices**: Yes/No, On/Off, Enable/Disable decisions
- **Single Option Filtering**: Applying one filter criteria at a time

**Future Multiple Selection Use Cases (when implemented):**

- **Multiple tag selection**: Applying multiple tags to content
- **Multiple feature toggles**: Enabling multiple features simultaneously
- **Multiple filter criteria**: Applying several filters at once
- **Multi-category selection**: Choosing from multiple categories

## Best Practices

1. **Concise Text**: Keep chip text short and descriptive (ideally 1-3 words)
2. **Logical Grouping**: Group related chips together conceptually
3. **Appropriate Styles**: Use chip styles that match the semantic meaning
4. **Clear States**: Make disabled and selected states visually obvious
5. **Reasonable Limits**: Don't overwhelm users with too many chips (typically 3-8 for single selection)
6. **Consistent Sizing**: Maintain consistent chip sizes within a group
7. **Accessible Labels**: Ensure chip text is descriptive and accessible
8. **Visual Hierarchy**: Use styles to create clear importance hierarchy
9. **Responsive Layout**: Ensure chips work well on different screen sizes
10. **Clear Actions**: Make sure chip actions match user expectations
11. **Single Selection UX**: Provide clear visual feedback when selection changes
12. **Future-Ready Design**: Structure code to easily accommodate multiple selection when available

## Comparison with Cards

**Use Chips When:**

- Options are simple and don't need detailed descriptions
- Space is limited
- Quick single selection is prioritized (currently)
- Options are categories, tags, or simple choices

**Use Cards When:**

- Options need detailed descriptions or context
- Visual distinction between options is important
- Complex actions or workflows are involved
- Each option represents a significant choice or direction

## Future Implementation Guide

**Preparing for Multiple Selection:**

1. **Data Structure Design**: Use arrays or sets for tracking selected items
2. **State Management**: Design state to handle both single and multiple selections
3. **UI Components**: Create components that can toggle between selection modes
4. **Action Handling**: Plan for actions that can process multiple selections
5. **Validation Logic**: Prepare validation that works for both modes
6. **User Feedback**: Design clear feedback for multiple selection states

**Example Future-Ready State Structure:**

```javascript
// Current: single selection
selectedChip: "option1";

// Future-ready: multiple selection capable
selectedChips: ["option1"]; // Array supports both single and multiple
```
