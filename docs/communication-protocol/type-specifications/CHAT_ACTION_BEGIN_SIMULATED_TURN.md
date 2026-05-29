---
description: "Specification for CHAT_ACTION_BEGIN_SIMULATED_TURN in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for triggering the UI to scroll the chat, clear the screen, and begin a new simulated turn. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_BEGIN_SIMULATED_TURN.md Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **Back to [Type Specifications](README.md)**

# CHAT_ACTION_BEGIN_SIMULATED_TURN Specification

## Specification

### Type Definition

`CHAT_ACTION_BEGIN_SIMULATED_TURN` is an action type that triggers the UI to scroll the chat interface, clear the screen, and begin a new simulated turn. This action is useful for workflow transitions, context switching, and multi-phase conversations where a clean visual separation is needed between conversation phases.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier for the action
  "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN", // required - must be exactly this value
  "action_data": {
    "target": "CHAT" // required - always "CHAT" (constant value)
  }
}
```

### Properties

| Property             | Type   | Required | Description                                                                  |
| -------------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| `action_id`          | string | Yes      | Unique identifier for this action (must follow message_id prefix convention) |
| `action_type`        | string | Yes      | Must be `"CHAT_ACTION_BEGIN_SIMULATED_TURN"`                                 |
| `action_data.target` | string | Yes      | Always `"CHAT"`. This action only operates on the chat interface.            |

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_BEGIN_SIMULATED_TURN` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the action, must be CHAT."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["CHAT"]),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CHAT"]).required(),
});
```

### Target Value

The `target` field is always `"CHAT"`. This is a constant value—there are no other valid targets for this action since it exclusively controls the chat interface's scroll and turn behavior.

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **[CHAT_ACTION_BEGIN_SIMULATED_TURN Usage Examples](../type-usage-examples/CHAT_ACTION_BEGIN_SIMULATED_TURN.md)**

## Implementation Notes

1. **Action ID Convention**: All action IDs must be prefixed with the message ID as per the protocol convention. For example: `"chatmessage-0000001-begin-simulated-turn"`.

2. **Target Specification**: The `target` field is always `"CHAT"`. This is a fixed value, not a choice—the action exclusively operates on the chat interface.

3. **UI Behavior**:

   - Scrolls the chat interface to create visual separation
   - Clears the visible screen content
   - Initiates a new simulated turn context

4. **Workflow Transitions**: This action is particularly useful when transitioning between major phases of a conversation, such as moving from entity discovery to workspace generation.

5. **Visual Separation**: Provides a clean break between conversation phases, improving user experience during complex multi-step workflows.

6. **Action Chaining**: Can be combined with other actions (like `CHAT_ACTION_SEND_TEXT_MESSAGE` or `CANVAS_ACTION_OPEN`) to create seamless workflow transitions.

## Common Use Cases

### Workflow Phase Transitions

- Moving from discovery to configuration phase
- Transitioning between major workflow stages
- Starting a new context after completing a task

### Context Switching

- Switching between different entity contexts
- Changing focus from one topic to another
- Resetting the visual context for new interactions

### Multi-Phase Conversations

- Separating distinct phases of a guided workflow
- Creating visual breaks between conversation sections
- Indicating progression through multi-step processes

### Clean State Initialization

- Preparing the UI for a new sequence of interactions
- Resetting the visual context for fresh user engagement
- Establishing clear boundaries between conversation topics

## Integration Patterns

This action works effectively when combined with:

1. **Text Messages**: Sending introductory messages for the new phase
2. **Canvas Operations**: Opening canvases alongside the simulated turn
3. **Progress Updates**: Updating progress indicators for workflow advancement
4. **Panel Updates**: Refreshing panel content for the new context
5. **Button Updates**: Resetting or updating button states for new interactions

## Security Considerations

1. **Rate Limiting**: Implement appropriate rate limiting to prevent excessive screen clearing
2. **User Context**: Ensure the action maintains user's authentication and session state
3. **State Consistency**: Verify that conversation state remains consistent after the action
4. **Audit Trails**: Log simulated turn initiations for debugging and analytics

## Performance Guidelines

1. **Smooth Transitions**: Ensure scroll and clear animations are smooth and non-jarring
2. **State Preservation**: Efficiently preserve necessary state while clearing visual context
3. **Resource Management**: Clean up any resources associated with the previous context
4. **Responsive Timing**: Execute the action quickly to maintain responsive user experience

## Accessibility Standards

1. **Screen Reader Support**: Announce the context change appropriately for screen readers
2. **Focus Management**: Properly manage focus after the simulated turn begins
3. **Visual Feedback**: Provide clear visual indication of the transition
4. **Keyboard Navigation**: Maintain proper keyboard navigation after the action

## Error Handling

1. **Action Failures**: Handle cases where the UI cannot complete the action
2. **State Recovery**: Provide mechanisms to recover if the action fails mid-execution
3. **Graceful Degradation**: Ensure the conversation can continue even if the action fails
4. **User Notification**: Inform users appropriately if the visual transition cannot be completed

## Testing Guidelines

1. **Transition Testing**: Test complete workflow transitions using this action
2. **State Verification**: Verify that all necessary state is preserved after the action
3. **Visual Testing**: Validate the scroll and clear behavior across different screen sizes
4. **Integration Testing**: Test interactions with other action types before and after
5. **Performance Testing**: Validate performance under various load conditions
