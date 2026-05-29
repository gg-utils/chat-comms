---
description: "Specification for CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for selecting chips from actionable chip interfaces within chat messages. UPDATED: This specification now references unified chip object property naming convention: - chip_text (string, required): Text displayed on the chip - chip_value (string, required): Value associated with the chip for processing - chip_actions (array of Action objects, required): Actions to execute when chip is selected - chip_style (string, optional): Visual style for the chip (unchanged) - chip_state (string, optional): Interaction state of the chip (unchanged) The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md - Related Content: CHAT_CONTENT_ACTIONABLE_CHIPS.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP Specification

## Specification

### Type Definition

`CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP` is an action type that handles user selection from `CHAT_CONTENT_ACTIONABLE_CHIPS` interfaces. This action is triggered when a user selects a chip from an actionable chips component, allowing the system to process the selection and continue the conversation flow.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP", // required - must be exactly this value
  "action_data": {
    "target": "CHAT", // required - must be "CHAT"
    "actionable_chips_content_id": "string", // required - content_id of the actionable chips being selected from
    "selected_chip_value": "string", // required - value of the selected chip
    "selected_chip_text": "string", // required - display text of the selected chip
    "simulated_user_message_text": "string" // required - message that appears as if typed by the user
  }
}
```

### Properties

| Property                                  | Type   | Required | Description                                                           |
| ----------------------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| `action_id`                               | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format |
| `action_type`                             | string | Yes      | Must be `"CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP"`                        |
| `action_data.target`                      | string | Yes      | Must be `"CHAT"`                                                      |
| `action_data.actionable_chips_content_id` | string | Yes      | Must match the `content_id` of the actionable chips component         |
| `action_data.selected_chip_value`         | string | Yes      | Must correspond to the `value` field of the chosen chip               |
| `action_data.selected_chip_text`          | string | Yes      | Display text of the selected chip                                     |
| `action_data.simulated_user_message_text` | string | Yes      | Message that appears in chat as if typed by the user                  |

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP` adheres to the following schema:

```json
{
  "type": "object",
  "required": [
    "target",
    "actionable_chips_content_id",
    "selected_chip_value",
    "selected_chip_text",
    "simulated_user_message_text"
  ],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the action, must be CHAT."
    },
    "actionable_chips_content_id": {
      "type": "string",
      "description": "Must match the content_id of the CHAT_CONTENT_ACTIONABLE_CHIPS component from which a chip was selected."
    },
    "selected_chip_value": {
      "type": "string",
      "description": "The value field of the selected chip from the actionable chips component."
    },
    "selected_chip_text": {
      "type": "string",
      "description": "The text field of the selected chip for display and context."
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
  actionable_chips_content_id: z.string(),
  selected_chip_value: z.string(),
  selected_chip_text: z.string(),
  simulated_user_message_text: z.string(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  actionable_chips_content_id: Joi.string().required(),
  selected_chip_value: Joi.string().required(),
  selected_chip_text: Joi.string().required(),
  simulated_user_message_text: Joi.string().required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CHAT"]).required(),
  actionable_chips_content_id: yup.string().required(),
  selected_chip_value: yup.string().required(),
  selected_chip_text: yup.string().required(),
  simulated_user_message_text: yup.string().required(),
});
```

### Supported Features

- **Single/Multiple Selection**: Support both single and multiple chip selection modes
- **Value Matching**: Automatically matches selected chip value with chip definition
- **User Message Generation**: Creates contextual user message for chat flow
- **State Management**: Updates chip selection states in the UI
- **Workflow Continuation**: Enables assistant response based on selection
- **Compact Interface**: Provides more compact selection interface than cards

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP Usage Examples](../type-usage-examples/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)**

## Implementation Notes

1. **Content ID Matching**: The `actionable_chips_content_id` must exactly match the `content_id` of the `CHAT_CONTENT_ACTIONABLE_CHIPS` component from which a chip was selected. Invalid IDs will result in no-op behavior.

2. **Value Correspondence**: The `selected_chip_value` must correspond to the `value` field of one of the chip items in the actionable chips component. This ensures proper mapping between user selection and system logic.

3. **User Message Context**: The `simulated_user_message_text` provides natural conversation flow and appears in the chat as if typed by the user. This maintains conversation continuity and provides context for the assistant's response.

4. **State Management**: After selection, the UI should update chip states appropriately:

   - In single-selection mode: Other chips become deselected
   - In multiple-selection mode: Chips can be toggled on/off independently

5. **Selection Validation**: Ensure that the selected chip value exists in the original chip items array and is in an actionable state.

## Selection Behavior

### Single Selection Mode

- Only one chip can be selected at a time
- Selecting a new chip deselects the previously selected chip
- Selected chip shows visual indication (highlighting, checkmark, etc.)
- Other chips return to unselected state

### Multiple Selection Mode

- Multiple chips can be selected independently
- Chips can be toggled on/off without affecting other selections
- Each selected chip maintains its selected state until explicitly deselected
- Visual indicators show which chips are currently selected

## Required Properties Validation

### action_data Validation

- `target`: Must be `"CHAT"`
- `actionable_chips_content_id`: Must match an existing chips component ID
- `selected_chip_value`: Must match a value from the chips items array
- `selected_chip_text`: Should match the display text of the selected chip
- `simulated_user_message_text`: Must be a non-empty string for conversation context

### Chip Selection Validation

1. **Chip Existence**: Verify the chip with the specified value exists
2. **Chip State**: Ensure the chip is in `ENABLED` state and can be selected
3. **Selection Mode**: Respect the selection mode (SINGLE vs MULTIPLE)
4. **Consistency**: Ensure selected_chip_text matches the actual chip text

## State Management Guidelines

### UI State Updates

1. **Immediate Feedback**: Provide instant visual feedback when chip is selected
2. **State Persistence**: Maintain selection state until explicitly changed
3. **Clear Indicators**: Use consistent visual patterns for selected/unselected states
4. **Accessibility**: Ensure state changes are announced to screen readers

### Backend Processing

1. **Selection Tracking**: Track which chips have been selected for workflow logic
2. **Context Preservation**: Maintain selection context for subsequent operations
3. **Validation**: Validate selections against current chip configuration
4. **Error Handling**: Handle cases where selections become invalid

## User Experience Guidelines

### Visual Design

1. **Clear Selection States**: Use distinctive visual styling for selected chips
2. **Hover Effects**: Provide appropriate hover feedback for interactive chips
3. **Consistent Styling**: Maintain consistent chip appearance across the application
4. **Responsive Design**: Ensure chips work well on different screen sizes

### Interaction Patterns

1. **Immediate Response**: Show selection feedback immediately upon click
2. **Clear Actions**: Make it obvious which chips are selectable
3. **Selection Clarity**: Clearly indicate what happens when a chip is selected
4. **Undo Capability**: In multiple selection mode, allow deselecting chips

## Error Handling

### Invalid Selections

1. **Non-existent Chip**: Handle attempts to select chips that don't exist
2. **Disabled Chips**: Prevent selection of disabled or unavailable chips
3. **Invalid Component**: Handle cases where the chips component doesn't exist
4. **State Conflicts**: Resolve conflicts between current and requested states

### Recovery Strategies

1. **Graceful Degradation**: Continue operation with available chips when some are invalid
2. **User Notification**: Inform users when selections cannot be processed
3. **Fallback Options**: Provide alternative selection methods when needed
4. **State Reset**: Allow resetting chip selections when errors occur

## Performance Considerations

### Selection Processing

1. **Immediate Response**: Process selections quickly to maintain responsive UI
2. **Batch Updates**: Handle multiple rapid selections efficiently
3. **State Synchronization**: Keep UI and backend state synchronized
4. **Memory Management**: Clean up resources for inactive chip groups

### Network Efficiency

1. **Refined Payloads**: Send only necessary data for chip selections
2. **Debouncing**: For rapid selections, consider debouncing to reduce network calls
3. **Caching**: Cache chip configurations to reduce repeated requests
4. **Compression**: Use appropriate compression for large chip datasets

## Accessibility Standards

### Screen Reader Support

1. **Selection Announcements**: Announce when chips are selected or deselected
2. **State Communication**: Clearly communicate current selection states
3. **Action Descriptions**: Provide clear descriptions of what each chip does
4. **Navigation Support**: Support keyboard navigation through chip groups

### Keyboard Interaction

1. **Tab Navigation**: Allow tabbing through available chips
2. **Enter/Space Selection**: Support standard selection keys
3. **Arrow Navigation**: Provide arrow key navigation within chip groups
4. **Escape Handling**: Allow escaping from chip selection interfaces

## Testing Guidelines

### Functional Testing

1. **Selection Modes**: Test both single and multiple selection scenarios
2. **State Transitions**: Verify correct state changes after selections
3. **Error Conditions**: Test with invalid chips, components, and values
4. **Edge Cases**: Test with empty chip sets, disabled chips, etc.

### User Experience Testing

1. **Selection Clarity**: Verify that selections are visually clear
2. **Response Time**: Ensure selections feel immediate and responsive
3. **Accessibility**: Test with screen readers and keyboard navigation
4. **Mobile Experience**: Test chip selection on touch devices

### Integration Testing

1. **Component Integration**: Test with various chip component configurations
2. **Workflow Integration**: Verify selections trigger appropriate workflow steps
3. **State Consistency**: Ensure state remains consistent across interactions
4. **Cross-platform**: Test chip behavior across different platforms

## Security Considerations

1. **Input Validation**: Validate all chip selection parameters before processing
2. **Access Control**: Ensure users can only select chips they're authorized to use
3. **Rate Limiting**: Implement appropriate limits on rapid chip selections
4. **Content Sanitization**: Sanitize chip values and text before processing
5. **Selection Auditing**: Log chip selections for security and analytics purposes

## Analytics and Monitoring

### Selection Metrics

1. **Selection Frequency**: Track which chips are selected most often
2. **Selection Patterns**: Analyze common selection combinations
3. **User Behavior**: Understand how users interact with different chip types
4. **Conversion Rates**: Measure how selections lead to desired outcomes

### Performance Monitoring

1. **Selection Latency**: Monitor time from selection to feedback
2. **Error Rates**: Track failed or invalid selections
3. **UI Responsiveness**: Measure impact of selections on UI performance
4. **User Satisfaction**: Gather feedback on chip selection experience

## Integration Patterns

This action works effectively when combined with:

1. **CHAT_CONTENT_ACTIONABLE_CHIPS**: The base component providing selectable chips
2. **CHAT_ACTION_SEND_TEXT_MESSAGE**: Following up with additional context after selection
3. **CANVAS_ACTION_OPEN**: Opening detailed views based on chip selections
4. **Filter Chains**: Combining multiple chip selections for complex filtering
5. **Workflow Branching**: Using selections to determine subsequent conversation flow
6. **State Persistence**: Maintaining selection state across conversation turns

## Common Anti-Patterns

### Avoid These Practices

1. **Unclear Selection States**: Don't make it ambiguous which chips are selected
2. **Inconsistent Behavior**: Don't change selection behavior between similar chip groups
3. **Missing Validation**: Don't skip validation of chip selections
4. **Poor Feedback**: Don't leave users guessing whether their selection registered
5. **Overwhelming Options**: Don't present too many chips at once without organization

### Best Practices Instead

1. **Clear Visual Feedback**: Always provide immediate, clear selection feedback
2. **Consistent Patterns**: Use consistent selection behavior across the application
3. **Robust Validation**: Always validate selections against current state
4. **Responsive Feedback**: Provide immediate confirmation of selections
5. **Organized Presentation**: Group related chips and limit options per group

## Use Case Recommendations

### When to Use Chips

- **Multiple Small Options**: When you have 5+ simple options
- **Filter Applications**: For applying multiple filters or tags
- **Quick Selections**: For rapid, lightweight choices
- **Space Constraints**: When space is limited but options are needed
- **Toggleable Options**: For options that can be easily turned on/off

### When to Use Alternative Patterns

- **Complex Choices**: Use cards for options needing descriptions
- **Few Options**: Use buttons for 2-3 simple choices
- **Hierarchical Selection**: Use dropdowns for nested options
- **Text Input**: Use text fields for free-form input
- **Binary Choices**: Use toggle switches for on/off options

## Migration and Compatibility

### Version Compatibility

1. **Schema Changes**: Handle changes to chip selection schema gracefully
2. **Backward Compatibility**: Support older chip selection formats when possible
3. **Feature Detection**: Detect and adapt to different chip capabilities
4. **Graceful Degradation**: Provide fallbacks for unsupported features

### Data Migration

1. **Selection History**: Preserve selection history when updating chip configurations
2. **Value Mapping**: Handle changes to chip values and identifiers
3. **State Translation**: Convert between different selection state formats
4. **Validation Updates**: Update validation rules for new chip types
