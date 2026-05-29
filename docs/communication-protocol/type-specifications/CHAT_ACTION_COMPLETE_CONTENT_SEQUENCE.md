---
description: "Specification for CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for signaling the UI that a content sequence has been completed and the UI should prepare for the next sequence of contents, displaying the assistant logo for visual separation. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **Back to [Type Specifications](README.md)**

# CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE Specification

## Specification

### Type Definition

`CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE` is an action type that signals the UI that a content sequence has been completed. The UI should prepare for the next sequence of contents, with the next content sent after this action displaying the assistant logo to visually separate previous contents from the new logical unit.

This action is useful for creating visual boundaries between logical segments of a conversation while maintaining continuity within the same message or turn.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier for the action
  "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE", // required - must be exactly this value
  "action_data": {
    "target": "CHAT" // required - always "CHAT" (constant value)
  }
}
```

### Properties

| Property             | Type   | Required | Description                                                                  |
| -------------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| `action_id`          | string | Yes      | Unique identifier for this action (must follow message_id prefix convention) |
| `action_type`        | string | Yes      | Must be `"CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE"`                            |
| `action_data.target` | string | Yes      | Always `"CHAT"`. This action only operates on the chat interface.            |

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE` adheres to the following schema:

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

The `target` field is always `"CHAT"`. This is a constant value—there are no other valid targets for this action since it exclusively controls the chat interface's content sequence behavior.

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **[CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE Usage Examples](../type-usage-examples/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)**

## Implementation Notes

1. **Action ID Convention**: All action IDs must be prefixed with the message ID as per the protocol convention. For example: `"chatmessage-0000001-complete-content-sequence"`.

2. **Target Specification**: The `target` field is always `"CHAT"`. This is a fixed value, not a choice—the action exclusively operates on the chat interface.

3. **UI Behavior**:

   - Marks the current content sequence as complete
   - Prepares the UI for the next sequence of contents
   - The next content sent after this action displays the assistant logo
   - Creates visual separation between logical units within the same turn

4. **Visual Separation**: This action creates a visual boundary by displaying the assistant logo before the next content, indicating the start of a new logical unit while maintaining continuity within the same conversation turn.

5. **Logical Grouping**: Use this action to logically group related content sequences together, making the conversation flow clearer and more organized for users.

6. **Action Chaining**: Can be combined with other content types and actions to create structured, multi-part responses with clear visual boundaries.

## Common Use Cases

### Multi-Topic Responses

- Separating different topics within a single assistant response
- Creating visual breaks between distinct pieces of information
- Organizing complex responses into logical segments

### Workflow Progress Indicators

- Marking completion of one step before starting another
- Creating visual boundaries between workflow phases
- Indicating progression through multi-step processes

### Information Hierarchy

- Separating primary content from supplementary information
- Creating visual hierarchy within long responses
- Distinguishing between different categories of content

### Follow-up Sequences

- Introducing follow-up questions or actions
- Separating initial response from additional context
- Creating clear boundaries for user decision points

## Integration Patterns

This action works effectively when combined with:

1. **Text Messages**: Grouping related markdown content into sequences
2. **Panels**: Separating panel-based content from text content
3. **Progress Updates**: Marking phase completion with visual separation
4. **Actionable Elements**: Separating informational content from interactive elements
5. **Canvas Operations**: Creating boundaries between chat and canvas-related content

## Difference from CHAT_ACTION_BEGIN_SIMULATED_TURN

While both actions create visual separation, they serve different purposes:

| Aspect          | COMPLETE_CONTENT_SEQUENCE     | BEGIN_SIMULATED_TURN       |
| --------------- | ----------------------------- | -------------------------- |
| Purpose         | Visual grouping within a turn | Start a new simulated turn |
| Screen Clearing | No                            | Yes                        |
| Scrolling       | No                            | Yes                        |
| Context         | Same turn, new logical unit   | New turn context           |
| Use Case        | Multi-part responses          | Workflow transitions       |

## Security Considerations

1. **Rate Limiting**: Implement appropriate rate limiting to prevent excessive visual separations
2. **User Context**: Ensure the action maintains user's authentication and session state
3. **State Consistency**: Verify that conversation state remains consistent after the action
4. **Audit Trails**: Log content sequence completions for debugging and analytics

## Performance Guidelines

1. **Lightweight Operation**: This action should be lightweight, only updating UI state
2. **No Content Destruction**: Previous content should remain visible and accessible
3. **Efficient Rendering**: UI should efficiently handle the logo display transition
4. **Minimal Latency**: Execute the action quickly to maintain responsive user experience

## Accessibility Standards

1. **Screen Reader Support**: Announce the logical separation appropriately for screen readers
2. **Visual Feedback**: Provide clear visual indication of the new logical unit
3. **Navigation**: Allow users to navigate between logical sections
4. **Keyboard Navigation**: Maintain proper keyboard navigation after the action

## Error Handling

1. **Action Failures**: Handle cases where the UI cannot complete the action
2. **Graceful Degradation**: Ensure the conversation can continue even if the action fails
3. **Silent Recovery**: If the action fails, continue without visual separation rather than blocking
4. **User Notification**: Generally, failures should be silent as they don't affect functionality

## Testing Guidelines

1. **Sequence Testing**: Test multiple content sequences with this action
2. **Visual Testing**: Validate the assistant logo appears correctly after the action
3. **Integration Testing**: Test interactions with other content types before and after
4. **Performance Testing**: Validate performance with multiple sequences in a single message
5. **Accessibility Testing**: Ensure screen readers announce the logical separation correctly
