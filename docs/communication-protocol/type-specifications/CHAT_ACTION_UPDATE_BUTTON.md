---
description: "Specification for CHAT_ACTION_UPDATE_BUTTON in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for updating button properties and states within chat messages dynamically. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_UPDATE_BUTTON.md - Related Content: CHAT_CONTENT_BUTTON.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_ACTION_UPDATE_BUTTON Specification

## Specification

### Type Definition

`CHAT_ACTION_UPDATE_BUTTON` is an action type that updates the properties of an existing `CHAT_CONTENT_BUTTON` component within chat messages. This action allows dynamic modification of button text, styling, state, and associated actions without requiring a full message refresh.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CHAT_ACTION_UPDATE_BUTTON", // required - must be exactly this value
  "action_data": {
    "target": "CHAT", // required - must be "CHAT"
    "button_content_id": "string", // required - content_id of the button to update
    "button_updates": {
      "button_text": "string", // optional - new button text
      "button_icon": "string", // optional - new button icon
      "button_style": "string", // optional - new button style (BUTTON_STYLE_PRIMARY, BUTTON_STYLE_SECONDARY, etc.)
      "button_state": "string", // optional - new button state (ENABLED, DISABLED, LOADING)
      "button_actions": [] // optional - new actions array to replace existing actions
    }
  }
}
```

### Properties

| Property                        | Type   | Required | Description                                                           |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| `action_id`                     | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format |
| `action_type`                   | string | Yes      | Must be `"CHAT_ACTION_UPDATE_BUTTON"`                                 |
| `action_data.target`            | string | Yes      | Must be `"CHAT"`                                                      |
| `action_data.button_content_id` | string | Yes      | Must match the `content_id` of an existing button                     |
| `action_data.button_updates`    | object | Yes      | Object containing the properties to update                            |

## Button Styles

- **`BUTTON_STYLE_PRIMARY`**: Main call-to-action styling (typically prominent color)
- **`BUTTON_STYLE_SECONDARY`**: Secondary action styling (typically muted appearance)
- **`BUTTON_STYLE_SUCCESS`**: Positive action styling (typically green)
- **`BUTTON_STYLE_WARNING`**: Caution action styling (typically yellow/orange)
- **`BUTTON_STYLE_DANGER`**: Warning/destructive action styling (typically red)

## Button States

- **`ENABLED`**: Button is interactive and clickable
- **`DISABLED`**: Button is not interactive (grayed out)
- **`LOADING`**: Button shows loading indicator and is not clickable

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_UPDATE_BUTTON` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "button_content_id", "button_updates"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the action, must be CHAT."
    },
    "button_content_id": {
      "type": "string",
      "description": "Must match the content_id of an existing CHAT_CONTENT_BUTTON component."
    },
    "button_updates": {
      "type": "object",
      "description": "Object containing the button properties to update.",
      "minProperties": 1,
      "properties": {
        "button_text": {
          "type": "string",
          "description": "New text to display on the button."
        },
        "button_icon": {
          "type": "string",
          "description": "New icon identifier for the button."
        },
        "button_style": {
          "type": "string",
          "enum": ["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"],
          "description": "New button style/appearance."
        },
        "button_state": {
          "type": "string",
          "enum": ["ENABLED", "DISABLED", "LOADING"],
          "description": "New button interaction state."
        },
        "button_actions": {
          "type": "array",
          "description": "New actions array to replace existing button actions.",
          "items": {
            "$ref": "../../schemas.md#/definitions/BaseAction"
          }
        }
      }
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

// Assuming BaseAction is defined elsewhere
const baseActionSchema = z.object({
  action_id: z.string(),
  action_type: z.string(),
  action_data: z.object({}).passthrough(),
});

const buttonUpdatesSchema = z
  .object({
    button_text: z.string().optional(),
    button_icon: z.string().optional(),
    button_style: z
      .enum([
        "BUTTON_STYLE_PRIMARY",
        "BUTTON_STYLE_SECONDARY",
        "BUTTON_STYLE_SUCCESS",
        "BUTTON_STYLE_WARNING",
        "BUTTON_STYLE_DANGER",
      ])
      .optional(),
    button_state: z.enum(["ENABLED", "DISABLED", "LOADING"]).optional(),
    button_actions: z.array(baseActionSchema).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one button property must be provided for update",
  });

const actionDataSchema = z.object({
  target: z.enum(["CHAT"]),
  button_content_id: z.string(),
  button_updates: buttonUpdatesSchema,
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

// Assuming BaseAction is defined elsewhere
const baseActionSchema = Joi.object({
  action_id: Joi.string().required(),
  action_type: Joi.string().required(),
  action_data: Joi.object().unknown(true),
});

const buttonUpdatesSchema = Joi.object({
  button_text: Joi.string(),
  button_icon: Joi.string(),
  button_style: Joi.string().valid(
    "BUTTON_STYLE_PRIMARY",
    "BUTTON_STYLE_SECONDARY",
    "BUTTON_STYLE_SUCCESS",
    "BUTTON_STYLE_WARNING",
    "BUTTON_STYLE_DANGER"
  ),
  button_state: Joi.string().valid("ENABLED", "DISABLED", "LOADING"),
  button_actions: Joi.array().items(baseActionSchema),
}).min(1);

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  button_content_id: Joi.string().required(),
  button_updates: buttonUpdatesSchema.required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

// Assuming BaseAction is defined elsewhere
const baseActionSchema = yup.object().shape({
  action_id: yup.string().required(),
  action_type: yup.string().required(),
  action_data: yup.object(),
});

const buttonUpdatesSchema = yup
  .object()
  .shape({
    button_text: yup.string(),
    button_icon: yup.string(),
    button_style: yup.string().oneOf([
      "BUTTON_STYLE_PRIMARY",
      "BUTTON_STYLE_SECONDARY",
      "BUTTON_STYLE_SUCCESS",
      "BUTTON_STYLE_WARNING",
      "BUTTON_STYLE_DANGER",
    ]),
    button_state: yup.string().oneOf(["ENABLED", "DISABLED", "LOADING"]),
    button_actions: yup.array().of(baseActionSchema),
  })
  .test(
    "at-least-one",
    "At least one button property must be provided",
    (value) => Object.keys(value).length > 0
  );

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CHAT"]).required(),
  button_content_id: yup.string().required(),
  button_updates: buttonUpdatesSchema.required(),
});
```

### Button Update Properties

| Property         | Type   | Required | Description                                                     |
| ---------------- | ------ | -------- | --------------------------------------------------------------- |
| `button_text`    | string | No       | New text to display on the button                               |
| `button_icon`    | string | No       | New icon identifier for the button                              |
| `button_style`   | string | No       | New button style (BUTTON_STYLE_PRIMARY, BUTTON_STYLE_SECONDARY, BUTTON_STYLE_SUCCESS, BUTTON_STYLE_WARNING, BUTTON_STYLE_DANGER) |
| `button_state`   | string | No       | New button state (ENABLED, DISABLED, LOADING)                   |
| `button_actions` | array  | No       | New actions array (replaces existing actions completely)        |

### Update Requirements

At least one property must be provided in the `button_updates` object for a valid update.

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_ACTION_UPDATE_BUTTON Usage Examples](../type-usage-examples/CHAT_ACTION_UPDATE_BUTTON.md)**

## Implementation Notes

1. **Button ID Validation**: The `button_content_id` must exactly match the `content_id` of an existing `CHAT_CONTENT_BUTTON` component in the chat history. Invalid IDs will result in no-op behavior.

2. **Partial Updates**: Only include the properties you want to change in `button_updates`. Unchanged properties will retain their current values, allowing for efficient incremental updates.

3. **Action Replacement**: When updating `actions`, the entire actions array is replaced, not merged. Include all desired actions in the update, even if only one action changes.

4. **State Consistency**: Ensure button state changes are logical and consistent:

   - Don't enable buttons that should remain disabled due to system constraints
   - Use `LOADING` state for operations that take time to complete
   - Use appropriate styles to reflect the current operation status

5. **Visual Feedback**: Button updates should provide clear visual feedback about the current state and available actions to maintain good user experience.

## Button Update Validation

### Required Properties

- `target`: Must be `"CHAT"`
- `button_content_id`: Must match an existing button's content ID
- `button_updates`: Must contain at least one valid update property

### Optional Update Properties

- `button_text`: Any valid string
- `button_icon`: Valid icon identifier string
- `button_style`: One of the supported button styles
- `button_state`: One of the supported button states
- `actions`: Array of valid action objects

### Update Constraints

1. **Minimum Updates**: At least one property must be present in `button_updates`
2. **Valid Values**: All provided values must conform to their respective schemas
3. **Action Structure**: Actions in the `actions` array must follow the base action structure
4. **State Logic**: Button state changes should follow logical progressions

## Button State Transitions

### Valid State Progressions

```
ENABLED → LOADING (start operation)
ENABLED → DISABLED (disable due to conditions)

LOADING → ENABLED (operation complete, success)
LOADING → DISABLED (operation complete, no further action)
LOADING → LOADING (continue operation, update text/icon)

DISABLED → ENABLED (conditions met, re-enable)
DISABLED → LOADING (direct operation start)
```

### Invalid State Transitions

- Generally, all state transitions are technically valid, but should follow logical user experience patterns

## Visual Design Guidelines

### Button Text Updates

1. **Clear Communication**: Button text should clearly indicate the current state or available action
2. **Consistent Language**: Use consistent terminology across similar operations
3. **Progress Indication**: Include progress information in button text when appropriate
4. **Action Clarity**: Make it clear what will happen when the button is clicked

### Icon Usage

1. **Meaningful Icons**: Use icons that clearly represent the current state or action
2. **Loading Indicators**: Use spinner or similar icons for loading states
3. **Status Icons**: Use check, error, or warning icons for completion states
4. **Action Icons**: Use appropriate icons that represent the button's action

### Style Guidelines

1. **Semantic Styling**: Use button styles that match the semantic meaning of the action
2. **Visual Hierarchy**: Use BUTTON_STYLE_PRIMARY for main actions, BUTTON_STYLE_SECONDARY for alternative actions
3. **Error Communication**: Use BUTTON_STYLE_DANGER for destructive or error actions
4. **Success Indication**: Use BUTTON_STYLE_SUCCESS for positive completion states
5. **Warning States**: Use BUTTON_STYLE_WARNING for caution or time-sensitive actions

## Performance Considerations

### Update Frequency

1. **Optimal Timing**: Update buttons at appropriate intervals to provide feedback without overwhelming the UI
2. **Batch Updates**: When updating multiple buttons, consider batching updates for better performance
3. **Efficient Updates**: Only update properties that actually need to change
4. **Network Efficiency**: Consider network latency when planning update timing

### UI Performance

1. **Smooth Transitions**: Ensure button updates result in smooth visual transitions
2. **Animation Support**: Support appropriate animations for state changes
3. **Responsive Updates**: Button updates should be reflected immediately in the UI
4. **Memory Management**: Clean up resources for buttons that are no longer needed

## Error Handling Strategies

### Update Failures

1. **Invalid Button ID**: Handle cases where the button content ID doesn't exist
2. **Invalid Updates**: Validate update properties before applying changes
3. **State Conflicts**: Handle conflicts between current and requested states
4. **Network Issues**: Provide fallback behavior for network connectivity problems

### Recovery Patterns

1. **Retry Mechanisms**: Implement retry logic for failed operations
2. **Fallback States**: Provide fallback button states when updates fail
3. **Error Communication**: Use button updates to communicate errors to users
4. **State Recovery**: Restore button states after temporary failures

## Accessibility Standards

### Screen Reader Support

1. **State Announcements**: Ensure button state changes are announced to screen readers
2. **Action Descriptions**: Provide clear descriptions of button actions
3. **Loading Indicators**: Announce when buttons enter or exit loading states
4. **Error Communication**: Make error states immediately apparent to assistive technologies

### Visual Accessibility

1. **Color Independence**: Don't rely solely on color to indicate button states
2. **High Contrast**: Ensure button updates maintain appropriate contrast ratios
3. **Text Alternatives**: Provide text descriptions for icon-only buttons
4. **Focus Management**: Handle focus appropriately when button states change

## Testing Guidelines

### Functional Testing

1. **State Transitions**: Test all valid button state transition scenarios
2. **Update Validation**: Test with various combinations of update properties
3. **Error Scenarios**: Test error conditions and recovery workflows
4. **Multiple Buttons**: Test coordinated updates across multiple buttons
5. **Edge Cases**: Test with boundary values and invalid inputs

### User Experience Testing

1. **Button Clarity**: Verify that button updates clearly communicate state and actions
2. **Response Time**: Test button responsiveness under various conditions
3. **Visual Feedback**: Ensure appropriate visual feedback for all state changes
4. **Workflow Integration**: Test button updates within complete user workflows
5. **Cross-platform**: Test button behavior across different platforms and devices

### Performance Testing

1. **Update Speed**: Measure time from update trigger to UI reflection
2. **Multiple Updates**: Test performance with multiple rapid button updates
3. **Memory Usage**: Monitor memory usage during extended button update sessions
4. **Network Impact**: Measure network overhead of button update operations
5. **UI Responsiveness**: Ensure UI remains responsive during button updates

## Security Considerations

1. **Input Validation**: Validate all button update parameters before processing
2. **Access Control**: Ensure only authorized components can update specific buttons
3. **Rate Limiting**: Implement appropriate rate limiting for button update requests
4. **Content Sanitization**: Sanitize button text and other content before display
5. **Action Security**: Validate that new button actions are appropriate and authorized

## Integration Patterns

This action works effectively when combined with:

1. **CHAT_CONTENT_ACTION_WRAPPER**: Wrapping button updates for clean message flow
2. **CHAT_CONTENT_MARKDOWN**: Providing detailed status information alongside button updates
3. **CHAT_CONTENT_PROGRESS_BAR**: Showing detailed progress while updating button states
4. **CANVAS_ACTION_OPEN**: Opening canvases as button actions after state updates
5. **CHAT_ACTION_SEND_TEXT_MESSAGE**: Simulating user responses when updated buttons are clicked
6. **Multiple Button Management**: Coordinating updates across multiple related buttons

## Common Anti-Patterns

### Avoid These Practices

1. **Excessive Updates**: Don't update buttons too frequently (causes UI flickering)
2. **Inconsistent States**: Don't create illogical state transitions
3. **Missing Actions**: Don't remove all actions without providing alternatives
4. **Poor Communication**: Don't use unclear or misleading button text
5. **State Confusion**: Don't use inappropriate styles for the current state

### Best Practices Instead

1. **Meaningful Updates**: Only update when there's meaningful state change
2. **Logical Flow**: Follow logical state progression patterns
3. **Clear Actions**: Always provide clear, actionable button states
4. **User Communication**: Use clear, descriptive text and appropriate styling
5. **Consistent Experience**: Maintain consistent button behavior patterns

## Monitoring and Analytics

### Button Update Metrics

1. **Update Frequency**: Track how often buttons are updated
2. **State Distribution**: Monitor distribution of button states across workflows
3. **User Interactions**: Track user interactions with updated buttons
4. **Error Rates**: Monitor button update failure rates
5. **Performance Metrics**: Measure button update latency and responsiveness

### Refinement Insights

1. **Update Patterns**: Analyze common button update patterns for refinement
2. **User Behavior**: Understand how users interact with updated buttons
3. **Performance Bottlenecks**: Identify and address performance issues
4. **Error Analysis**: Analyze common error patterns for improvement
5. **Success Metrics**: Track successful completion of button-driven workflows
