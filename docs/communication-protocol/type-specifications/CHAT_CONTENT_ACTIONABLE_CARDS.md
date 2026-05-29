---
description: "Specification for CHAT_CONTENT_ACTIONABLE_CARDS in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for creating actionable card interfaces within chat messages for user selections. UPDATED: This specification now uses unified card object property naming convention: - card_title (string, required): Primary title displayed on the card - card_subtitle (string, required): Secondary description text for the card - card_value (string, required): Value associated with the card for processing - card_actions (array of Action objects, required): Actions to execute when card is selected IMPORTANT: This specification currently supports SINGLE SELECTION ONLY. Multiple selection is a planned future feature that is not yet implemented. All code should be structurally prepared for the future addition of multiple selection capabilities while currently enforcing single selection behavior. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. Key dependencies and related files: - Base structures: ../base-structures/ACTION.md, ../base-structures/CONTENT.md - Related actions: ./CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md - Usage examples: ../type-usage-examples/CHAT_CONTENT_ACTIONABLE_CARDS.md - Schema definitions: ../../ignore/schemas.md @future Multiple selection mode - Planned for future implementation For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_CONTENT_ACTIONABLE_CARDS.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_CONTENT_ACTIONABLE_CARDS Specification

## Specification

### Type Definition

`CHAT_CONTENT_ACTIONABLE_CARDS` is a content type that renders a collection of interactive cards within chat messages. Cards provide a rich interface for presenting options with titles, descriptions, and associated actions. They are ideal for disambiguation, selection between complex options, or presenting detailed choices.

**⚠️ CURRENT LIMITATION**: This component currently supports single selection only. Multiple selection is planned for future implementation. Code should be designed to accommodate future multiple selection capabilities.

### Example Full Content Payload

**Content Payload**

```json
{
  "content_id": "string", // required - unique identifier for the content
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS", // required - must be exactly this value
  "content_width": "WIDTH_AUTO", // optional - defaults to WIDTH_AUTO
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE", // required - currently only "SINGLE" is supported
    "actionable_cards_selection_state": "string", // required - current selection state
    "actionable_cards_items": "array" // required - array of card objects
  }
}
```

### Properties

| Property                                        | Type   | Required | Default        | Description                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`                                    | string | Yes      |                | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`                                  | string | Yes      |                | Must be `"CHAT_CONTENT_ACTIONABLE_CARDS"`                                                                                                                                                                                               |
| `content_width`                                 | string | No       | `"WIDTH_AUTO"` | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`                                 | string | No       | `"main"`       | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`                                 | number | No       | `undefined`    | Milliseconds to delay AFTER this content finishes processing, BEFORE the next item in the same queue begins. Useful for creating natural pacing between interactive elements.                                                           |
| `content_data.actionable_cards_selection_mode`  | string | Yes      |                | Selection behavior: `"SINGLE"` (multiple selection planned for future)                                                                                                                                                                  |
| `content_data.actionable_cards_selection_state` | string | Yes      |                | Current state: `"PENDING_SELECTION"`, `"SELECTED"`, `"UNSELECTED"`                                                                                                                                                                      |
| `content_data.actionable_cards_items`           | array  | Yes      |                | Array of card objects with title, subtitle, and actions                                                                                                                                                                                 |

## Card Properties & Configuration

### Required Properties

- **card_title**: Primary display text
- **card_subtitle**: Secondary descriptive text
- **card_value**: Unique identifier for processing
- **card_actions**: Array of actions to execute when selected

### Optional Properties

- **card_style**: "PRIMARY" | "SECONDARY" | "TERTIARY"
- **card_state**: "ENABLED" | "DISABLED" | "LOADING"

### Selection Modes

- **SINGLE**: Only one card can be selected
- **MULTIPLE**: Multiple cards can be selected simultaneously

### Selection States

- **PENDING_SELECTION**: Awaiting user interaction
- **SELECTED**: User has made selection
- **COMPLETED**: Selection processed

## JSON Schema Definition

The complete schema for `CHAT_CONTENT_ACTIONABLE_CARDS` adheres to the following structure:

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
      "enum": ["CHAT_CONTENT_ACTIONABLE_CARDS"],
      "description": "Must be CHAT_CONTENT_ACTIONABLE_CARDS."
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
        "actionable_cards_selection_mode",
        "actionable_cards_selection_state",
        "actionable_cards_items"
      ],
      "properties": {
        "actionable_cards_selection_mode": {
          "type": "string",
          "enum": ["SINGLE"],
          "description": "Selection behavior: SINGLE only (multiple selection planned for future implementation)."
        },
        "actionable_cards_selection_state": {
          "type": "string",
          "enum": ["PENDING_SELECTION", "SELECTED", "UNSELECTED"],
          "description": "Current selection state."
        },
        "actionable_cards_items": {
          "type": "array",
          "description": "Array of card objects with card_title, card_subtitle, card_value, and card_actions.",
          "items": {
            "type": "object",
            "required": ["card_title", "card_subtitle", "card_value", "card_actions"],
            "properties": {
              "card_title": {
                "type": "string",
                "description": "Primary title displayed on the card."
              },
              "card_subtitle": {
                "type": "string",
                "description": "Secondary description text for the card."
              },
              "card_value": {
                "type": "string",
                "description": "Value associated with the card for processing."
              },
              "card_actions": {
                "type": "array",
                "description": "Actions to execute when card is selected.",
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
 * Base action schema for card interactions
 * @description Defines the structure of actions that can be triggered by card selection
 */
const actionSchema = z.object({
  action_id: z.string(),
  action_type: z.string(),
  action_data: z.object({}).passthrough(),
});

/**
 * Individual actionable card item schema
 * @description Defines the structure of a single card within the actionable cards component
 * @note Updated to use unified card property naming convention (card_title, card_subtitle, card_value, card_actions)
 */
const cardItemSchema = z.object({
  card_title: z.string(), // Updated: was 'title'
  card_subtitle: z.string(), // Updated: was 'subtitle'
  card_value: z.string(), // Updated: was 'value'
  card_actions: z.array(actionSchema), // Updated: was 'actions'
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CARDS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = z.object({
  actionable_cards_selection_mode: z.enum(["SINGLE"]), // Future: will include 'MULTIPLE'
  actionable_cards_selection_state: z.enum(["PENDING_SELECTION", "SELECTED", "UNSELECTED"]),
  actionable_cards_items: z.array(cardItemSchema),
});

const chatContentActionableCardsSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_ACTIONABLE_CARDS"),
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
 * Base action schema for card interactions
 * @description Defines the structure of actions that can be triggered by card selection
 */
const actionSchema = Joi.object({
  action_id: Joi.string().required(),
  action_type: Joi.string().required(),
  action_data: Joi.object().unknown(true).required(),
});

/**
 * Individual actionable card item schema
 * @description Defines the structure of a single card within the actionable cards component
 * @note Updated to use unified card property naming convention (card_title, card_subtitle, card_value, card_actions)
 */
const cardItemSchema = Joi.object({
  card_title: Joi.string().required(), // Updated: was 'title'
  card_subtitle: Joi.string().required(), // Updated: was 'subtitle'
  card_value: Joi.string().required(), // Updated: was 'value'
  card_actions: Joi.array().items(actionSchema).required(), // Updated: was 'actions'
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CARDS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = Joi.object({
  actionable_cards_selection_mode: Joi.string().valid("SINGLE").required(), // Future: will include 'MULTIPLE'
  actionable_cards_selection_state: Joi.string()
    .valid("PENDING_SELECTION", "SELECTED", "UNSELECTED")
    .required(),
  actionable_cards_items: Joi.array().items(cardItemSchema).required(),
});

const chatContentActionableCardsSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_ACTIONABLE_CARDS").required(),
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
 * Base action schema for card interactions
 * @description Defines the structure of actions that can be triggered by card selection
 */
const actionSchema = yup.object().shape({
  action_id: yup.string().required(),
  action_type: yup.string().required(),
  action_data: yup.object().required(),
});

/**
 * Individual actionable card item schema
 * @description Defines the structure of a single card within the actionable cards component
 * @note Updated to use unified card property naming convention (card_title, card_subtitle, card_value, card_actions)
 */
const cardItemSchema = yup.object().shape({
  card_title: yup.string().required(), // Updated: was 'title'
  card_subtitle: yup.string().required(), // Updated: was 'subtitle'
  card_value: yup.string().required(), // Updated: was 'value'
  card_actions: yup.array().of(actionSchema).required(), // Updated: was 'actions'
});

/**
 * Content data schema for CHAT_CONTENT_ACTIONABLE_CARDS
 * @description Currently enforces single selection behavior, but should be prepared for future multiple selection
 * @future selection_mode will support "MULTIPLE" in future releases
 */
const contentDataSchema = yup.object().shape({
  actionable_cards_selection_mode: yup.string().oneOf(["SINGLE"]).required(), // Future: will include 'MULTIPLE'
  actionable_cards_selection_state: yup
    .string()
    .oneOf(["PENDING_SELECTION", "SELECTED", "UNSELECTED"])
    .required(),
  actionable_cards_items: yup.array().of(cardItemSchema).required(),
});

const chatContentActionableCardsSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_ACTIONABLE_CARDS"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number().optional(),
  content_data: contentDataSchema.required(),
});
```

## Card Item Schema

The schema for items within `actionable_cards_items` is defined as part of the `content_data` schemas above. Each item includes:

- `card_title` (string, required) - Primary title displayed on the card
- `card_subtitle` (string, required) - Secondary description text for the card
- `card_value` (string, required) - Value associated with the card for processing
- `card_actions` (array of Action objects, required) - Actions to execute when card is selected

### Selection Modes

- **`SINGLE`**: Only one card can be selected at a time (CURRENT IMPLEMENTATION)

**🔮 FUTURE IMPLEMENTATION**: `MULTIPLE` selection mode is planned for future releases. When implemented, it will allow multiple cards to be selected simultaneously.

### Selection States

- **`PENDING_SELECTION`**: User has not yet made a selection
- **`SELECTED`**: A card has been selected (currently limited to one card at a time)
- **`UNSELECTED`**: Selection has been cleared or reset

## Usage Examples

### Using content_delay and content_queue

The `content_delay` and `content_queue` properties enable fine-grained control over timing and parallel processing of interactive card content.

**Example: Disambiguation cards with delay before follow-up message**

```json
{
  "content_id": "msg-001-content-01-cards",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_queue": "main",
  "content_delay": 800,
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "Acme Corp - San Francisco",
        "card_subtitle": "Technology company specializing in AI solutions",
        "card_value": "acme-sf",
        "card_actions": [
          {
            "action_id": "msg-001-select-acme-sf",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
            "action_data": { "selected_value": "acme-sf" }
          }
        ]
      },
      {
        "card_title": "Acme Corp - New York",
        "card_subtitle": "Financial services and consulting",
        "card_value": "acme-ny",
        "card_actions": [
          {
            "action_id": "msg-001-select-acme-ny",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
            "action_data": { "selected_value": "acme-ny" }
          }
        ]
      }
    ]
  }
}
```

In this example:

- `content_queue: "main"` processes cards in the main content queue
- `content_delay: 800` adds an 800ms pause after the cards appear, before the next content item (e.g., a helpful prompt) renders

**Example: Parallel queue for secondary content**

```json
{
  "content_id": "msg-001-content-02-tips",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_queue": "tips",
  "content_delay": 500,
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "Need help choosing?",
        "card_subtitle": "View comparison chart",
        "card_value": "show-comparison",
        "card_actions": [
          {
            "action_id": "msg-001-show-comparison",
            "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
            "action_data": {
              "target": "CHAT",
              "actionable_cards_content_id": "msg-001-content-02-tips",
              "selected_card_value": "show-comparison",
              "selected_card_title": "Need help choosing?"
            }
          }
        ]
      }
    ]
  }
}
```

Using `content_queue: "tips"` processes this card independently from the main queue, allowing it to appear in parallel with other content.

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_ACTIONABLE_CARDS Usage Examples](../type-usage-examples/CHAT_CONTENT_ACTIONABLE_CARDS.md)**

## Implementation Notes

1. **Current Single Selection Enforcement**: All card implementations currently enforce single selection behavior. When a user selects a card, any previously selected card in the same set must be deselected automatically.

2. **Future Multiple Selection Preparation**: Code should be architected to easily accommodate multiple selection when it becomes available. Consider using arrays for selected values and toggle-based selection logic.

3. **Action Execution**: All actions in a card's `card_actions` array are executed sequentially when the card is selected, while maintaining current single selection constraint.

4. **Selection Behavior**: Currently only `SINGLE` selection mode is supported. Multiple selection is planned for future implementation to provide enhanced user flexibility.

5. **State Management**: Selection state can be updated using `CHAT_ACTION_CHOOSE_ACTIONABLE_CARD` to reflect user choices, ensuring only one card is selected at a time, but data structures should support future multiple selections.

6. **Action ID Convention**: All action IDs must be prefixed with the message ID as per the protocol convention.

7. **Multi-Action Cards**: Cards can have multiple actions that execute in sequence, allowing for complex workflows while maintaining current single selection.

8. **Canvas Integration**: Cards can open canvas interfaces for detailed views while also sending chat messages, but selection remains single-only for now.

9. **Future-Ready Architecture**: Design data structures and state management to easily extend to multiple selection without major refactoring.

## Expected UI Behavior

- Cards render as visually distinct, selectable items
- Each card displays title prominently and subtitle as secondary text
- Cards have hover/focus states to indicate interactivity
- Currently only one card can be selected at a time (single selection enforcement)
- Selecting a card automatically deselects any previously selected card
- Selection state affects visual appearance with clear feedback
- Cards can be styled consistently with the overall interface theme
- Accessibility features include keyboard navigation and screen reader support
- **Future-Ready**: UI should be designed to handle multiple selections when the feature is implemented

## Use Cases

**Current Single Selection Use Cases:**

- **Disambiguation**: Choosing between similar options or search results
- **Method Selection**: Picking one analysis method, algorithm, or approach
- **Template Selection**: Choosing one project template or starting point
- **Configuration Option**: Selecting one setup option or preference
- **Report Type**: Choosing one report format or content type
- **Workflow Direction**: Directing conversation flow based on single user choice
- **Service Selection**: Choosing one service from available providers
- **Feature Option**: Picking one primary feature to enable or configure

**Future Multiple Selection Use Cases (when implemented):**

- **Multiple simultaneous selections**: Choosing several options at once
- **Multi-feature configuration**: Enabling multiple features simultaneously
- **Multiple report types**: Generating several report formats
- **Complex workflow branching**: Pursuing multiple conversation paths

## Best Practices

1. **Clear Titles**: Use descriptive, concise titles that clearly indicate what each option represents
2. **Informative Subtitles**: Provide helpful context or additional details in subtitles
3. **Logical Ordering**: Arrange cards in a logical order (alphabetical, by importance, by popularity)
4. **Consistent Formatting**: Use consistent formatting and structure across all cards
5. **Appropriate Actions**: Ensure actions match user expectations for each card
6. **Visual Hierarchy**: Use titles and subtitles to create clear information hierarchy
7. **Meaningful Feedback**: Provide clear feedback when cards are selected
8. **Accessibility**: Ensure cards work well with keyboard navigation and screen readers
9. **Performance**: Limit the number of cards to avoid overwhelming users (typically 3-6 cards for single selection)
10. **Context**: Provide sufficient context in the preceding message to explain the choice
11. **Single Selection UX**: Provide clear visual feedback when selection changes
12. **Future-Ready Design**: Structure code to easily accommodate multiple selection when available

## Multi-Action Cards

Cards can execute multiple actions in sequence, enabling complex workflows while maintaining current single selection:

1. **Send confirmation message** to chat
2. **Open detailed canvas** for advanced interaction
3. **Update application state** or preferences
4. **Trigger additional workflows** or processes

This allows for sophisticated interaction patterns while maintaining a simple single selection interface that can be expanded to multiple selection in the future.

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
selectedCard: "option1";

// Future-ready: multiple selection capable
selectedCards: ["option1"]; // Array supports both single and multiple
```
