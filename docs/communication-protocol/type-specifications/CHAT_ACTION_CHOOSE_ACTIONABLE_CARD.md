---
description: "Specification for CHAT_ACTION_CHOOSE_ACTIONABLE_CARD in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for selecting cards from actionable card interfaces within chat messages. UPDATED: This specification now references unified card object property naming convention: - card_title (string, required): Primary title displayed on the card - card_subtitle (string, required): Secondary description text for the card - card_value (string, required): Value associated with the card for processing - card_actions (array of Action objects, required): Actions to execute when card is selected The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md - Related Content: CHAT_CONTENT_ACTIONABLE_CARDS.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_ACTION_CHOOSE_ACTIONABLE_CARD Specification

## Specification

### Type Definition

`CHAT_ACTION_CHOOSE_ACTIONABLE_CARD` is an action type that handles user selection from `CHAT_CONTENT_ACTIONABLE_CARDS` interfaces. This action is triggered when a user selects a card from an actionable cards component, allowing the system to process the selection and continue the conversation flow.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD", // required - must be exactly this value
  "action_data": {
    "target": "CHAT", // required - must be "CHAT"
    "actionable_cards_content_id": "string", // required - content_id of the actionable cards being selected from
    "selected_card_value": "string", // required - value of the selected card
    "selected_card_title": "string", // required - title of the selected card
    "simulated_user_message_text": "string" // required - message that appears as if typed by the user
  }
}
```

### Properties

| Property                                  | Type   | Required | Description                                                           |
| ----------------------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| `action_id`                               | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format |
| `action_type`                             | string | Yes      | Must be `"CHAT_ACTION_CHOOSE_ACTIONABLE_CARD"`                        |
| `action_data.target`                      | string | Yes      | Must be `"CHAT"`                                                      |
| `action_data.actionable_cards_content_id` | string | Yes      | Must match the `content_id` of the actionable cards component         |
| `action_data.selected_card_value`         | string | Yes      | Must correspond to the `card_value` field of the chosen card          |
| `action_data.selected_card_title`         | string | Yes      | Display title of the selected card                                    |
| `action_data.simulated_user_message_text` | string | Yes      | Message that appears in chat as if typed by the user                  |

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_CHOOSE_ACTIONABLE_CARD` adheres to the following schema:

```json
{
  "type": "object",
  "required": [
    "target",
    "actionable_cards_content_id",
    "selected_card_value",
    "selected_card_title",
    "simulated_user_message_text"
  ],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the action, must be CHAT."
    },
    "actionable_cards_content_id": {
      "type": "string",
      "description": "Must match the content_id of the CHAT_CONTENT_ACTIONABLE_CARDS component from which a card was selected."
    },
    "selected_card_value": {
      "type": "string",
      "description": "The card_value field of the selected card from the actionable cards component."
    },
    "selected_card_title": {
      "type": "string",
      "description": "The title field of the selected card for display and context."
    },
    "simulated_user_message_text": {
      "type": "string",
      "description": "Message text that will appear in the chat as if typed by the user."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["CHAT"]),
  actionable_cards_content_id: z.string(),
  selected_card_value: z.string(),
  selected_card_title: z.string(),
  simulated_user_message_text: z.string(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  actionable_cards_content_id: Joi.string().required(),
  selected_card_value: Joi.string().required(),
  selected_card_title: Joi.string().required(),
  simulated_user_message_text: Joi.string().required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CHAT"]).required(),
  actionable_cards_content_id: yup.string().required(),
  selected_card_value: yup.string().required(),
  selected_card_title: yup.string().required(),
  simulated_user_message_text: yup.string().required(),
});
```

### Supported Features

- **Single Card Selection**: Select one card from a collection
- **Value Matching**: Automatically matches selected card value with card definition
- **User Message Generation**: Creates contextual user message for chat flow
- **State Management**: Updates card selection states in the UI
- **Workflow Continuation**: Enables assistant response based on selection

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_ACTION_CHOOSE_ACTIONABLE_CARD Usage Examples](../type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)**

## Implementation Notes

1. **Content ID Matching**: The `actionable_cards_content_id` must exactly match the `content_id` of the `CHAT_CONTENT_ACTIONABLE_CARDS` component from which a card was selected. Invalid IDs will result in no-op behavior.

2. **Value Correspondence**: The `selected_card_value` must correspond to the `card_value` field of one of the card items in the actionable cards component. This ensures proper mapping between user selection and system logic.

3. **User Message Context**: The `simulated_user_message_text` provides natural conversation flow and appears in the chat as if typed by the user. This maintains conversation continuity and provides rich context for the assistant's response.

4. **Selection State Management**: After selection, the UI should update card states to reflect the choice:

   - Selected card shows clear visual indication (highlighting, checkmark, etc.)
   - Other cards become deselected in single-selection mode
   - Selection state persists until explicitly changed

5. **Rich Information Display**: Cards can display complex information including descriptions, metadata, and visual elements, making them ideal for choices that benefit from detailed context.

## Relation to `card_action_id`

A card item may carry an optional `card_action_id`. It is not the `action_id` of this action and is
not required to equal it: this action stays the entry in `card_actions` that a consumer executes
when the card is chosen, and `card_action_id` only names the follow-up action that the producer
starts afterwards. See
[Typed Optional Card Fields](./CHAT_CONTENT_ACTIONABLE_CARDS.md#typed-optional-card-fields).

## Card Selection Behavior

### Single Selection Mode

- Only one card can be selected at a time
- Selecting a new card deselects the previously selected card
- Selected card shows prominent visual indication
- Other cards return to unselected state
- Selection triggers the associated action immediately

### Selection Validation

- Verify the card with the specified value exists in the original cards array
- Ensure the card is in `ENABLED` state and can be selected
- Validate that `selected_card_title` matches the actual card title
- Confirm the user has permission to select the specific card

## Required Properties Validation

### action_data Validation

- `target`: Must be `"CHAT"`
- `actionable_cards_content_id`: Must match an existing cards component ID
- `selected_card_value`: Must match a value from the cards items array
- `selected_card_title`: Should match the title of the selected card
- `simulated_user_message_text`: Must be a non-empty string providing selection context

### Card Selection Constraints

1. **Card Existence**: Verify the card with the specified value exists
2. **Card State**: Ensure the card is in `ENABLED` state
3. **Selection Permission**: Confirm user authorization for the selection
4. **Data Consistency**: Ensure all provided values are consistent with card definition

## User Experience Guidelines

### Visual Design

1. **Clear Selection Feedback**: Provide immediate, distinctive visual feedback for selections
2. **Rich Information Display**: Leverage card space to show descriptions, metadata, and visual elements
3. **Consistent Interaction**: Maintain consistent selection behavior across different card groups
4. **Responsive Layout**: Ensure cards work well across different screen sizes and orientations

### Information Architecture

1. **Meaningful Descriptions**: Use card descriptions to provide context and help users make informed decisions
2. **Structured Metadata**: Organize additional information in a scannable, hierarchical format
3. **Visual Hierarchy**: Use styling, icons, and layout to guide user attention to key information
4. **Progressive Disclosure**: Show essential information prominently while making additional details available

## Card Content Guidelines

### Title and Description

1. **Descriptive Titles**: Use clear, concise titles that immediately convey the option's purpose
2. **Contextual Descriptions**: Provide descriptions that help users understand the implications of their choice
3. **Benefit-Focused**: Highlight the key benefits or outcomes of selecting each option
4. **Consistent Tone**: Maintain consistent writing style and tone across all card options

### Metadata and Specifications

1. **Relevant Details**: Include metadata that helps users differentiate between options
2. **Structured Information**: Organize technical specifications, pricing, or feature lists clearly
3. **Comparison-Friendly**: Present information in ways that facilitate easy comparison between options
4. **Visual Elements**: Use icons, badges, or visual indicators to enhance information clarity

## Error Handling

### Invalid Selections

1. **Non-existent Card**: Handle attempts to select cards that don't exist in the current set
2. **Disabled Cards**: Prevent selection of cards that are disabled or unavailable
3. **Invalid Component**: Handle cases where the cards component reference is invalid
4. **Permission Errors**: Manage cases where users lack permission to select specific cards

### Recovery Strategies

1. **Graceful Degradation**: Continue operation with available cards when some selections fail
2. **Clear Error Messages**: Provide specific, actionable error messages when selections fail
3. **Fallback Options**: Offer alternative selection methods when primary selections aren't available
4. **State Recovery**: Allow users to recover from error states through clear actions

## Performance Considerations

### Selection Processing

1. **Immediate Feedback**: Process card selections quickly to maintain responsive user experience
2. **Refined Rendering**: Ensure card updates don't cause performance issues or flickering
3. **State Synchronization**: Keep UI and backend state synchronized efficiently
4. **Memory Management**: Clean up resources for cards that are no longer active

### Content Loading

1. **Progressive Loading**: Load card content progressively for large sets of options
2. **Image Refinement**: Refine any images or visual elements used in cards
3. **Data Caching**: Cache card configurations to reduce repeated network requests
4. **Lazy Rendering**: Consider lazy rendering for large numbers of cards

## Accessibility Standards

### Screen Reader Support

1. **Selection Announcements**: Announce card selections and state changes to screen readers
2. **Rich Descriptions**: Provide comprehensive descriptions of card content for non-visual users
3. **Navigation Support**: Support efficient keyboard navigation through card sets
4. **Context Information**: Ensure screen readers can access all relevant card information

### Keyboard Interaction

1. **Tab Navigation**: Allow users to navigate through cards using tab keys
2. **Selection Keys**: Support Enter and Space keys for card selection
3. **Arrow Navigation**: Provide arrow key navigation within card groups
4. **Focus Management**: Maintain clear focus indicators and logical focus order

## Testing Guidelines

### Functional Testing

1. **Selection Validation**: Test card selection with valid and invalid values
2. **State Management**: Verify correct state transitions after card selections
3. **Error Scenarios**: Test error conditions and recovery workflows
4. **Integration Testing**: Test card selections within complete user workflows

### User Experience Testing

1. **Selection Clarity**: Verify that card selections are visually clear and immediate
2. **Information Comprehension**: Test that users can understand and compare card options
3. **Accessibility Testing**: Test with screen readers, keyboard navigation, and other assistive technologies
4. **Cross-Platform Testing**: Verify consistent behavior across different devices and platforms

### Performance Testing

1. **Selection Speed**: Measure time from selection action to visual feedback
2. **Large Card Sets**: Test performance with many cards and complex content
3. **Memory Usage**: Monitor memory consumption with large or long-lived card sets
4. **Network Impact**: Measure network overhead of card selection operations

## Security Considerations

1. **Input Validation**: Validate all card selection parameters before processing
2. **Access Control**: Ensure users can only select cards they're authorized to access
3. **Data Privacy**: Protect sensitive information that might be included in card metadata
4. **Selection Auditing**: Log card selections for security monitoring and compliance
5. **Content Sanitization**: Sanitize card content to prevent injection attacks

## Analytics and Monitoring

### Selection Analytics

1. **Selection Frequency**: Track which cards are selected most often
2. **Decision Patterns**: Analyze how users make choices between different options
3. **User Preferences**: Understand user preferences across different card types
4. **Conversion Tracking**: Measure how card selections impact downstream conversions

### User Behavior Insights

1. **Decision Time**: Measure how long users spend considering card options
2. **Information Usage**: Track which card information elements are most influential
3. **Error Recovery**: Monitor how users recover from selection errors
4. **Satisfaction Metrics**: Gather feedback on card selection experiences

## Integration Patterns

This action works effectively when combined with:

1. **CHAT_CONTENT_ACTIONABLE_CARDS**: The base component providing rich, selectable card interfaces
2. **CHAT_ACTION_SEND_TEXT_MESSAGE**: Following up with additional context or questions after selection
3. **CANVAS_ACTION_OPEN**: Opening detailed configuration or setup views based on card selections
4. **Sequential Workflows**: Using card selections to determine next steps in complex workflows
5. **Configuration Cascades**: Building complex configurations through multiple card selection steps
6. **Service Provisioning**: Using card selections to configure and provision services or resources

## Common Anti-Patterns

### Avoid These Practices

1. **Information Overload**: Don't pack too much information into cards, making them overwhelming
2. **Unclear Differentiation**: Don't make cards too similar, making it hard to choose between them
3. **Missing Context**: Don't provide cards without sufficient context about their implications
4. **Inconsistent Formatting**: Don't use different formatting patterns across similar card sets
5. **Poor Visual Hierarchy**: Don't bury important information in dense text blocks

### Best Practices Instead

1. **Focused Information**: Present key information prominently while keeping cards scannable
2. **Clear Differentiation**: Make the differences between options obvious and meaningful
3. **Rich Context**: Provide sufficient context for users to make informed decisions
4. **Consistent Design**: Use consistent patterns for similar types of card selections
5. **Structured Content**: Organize card content with clear visual hierarchy and spacing

## Use Case Recommendations

### When to Use Cards

- **Complex Choices**: When options require descriptions, specifications, or detailed context
- **Few Key Options**: When you have 2-4 primary choices that warrant detailed presentation
- **Service Selection**: For choosing between service plans, configurations, or packages
- **Template Selection**: When selecting from templates, frameworks, or starter configurations
- **Major Decisions**: For choices that significantly impact user workflow or outcomes

### When to Use Alternative Patterns

- **Many Simple Options**: Use chips for 5+ simple, tag-like options
- **Quick Filters**: Use chips for rapid filtering or categorization
- **Binary Choices**: Use toggle switches for simple on/off decisions
- **Text Input**: Use input fields for free-form or custom values
- **Hierarchical Options**: Use dropdowns for nested or categorized selections
