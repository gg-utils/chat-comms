---
description: "Specification for CHAT_ACTION_SEND_TEXT_MESSAGE in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for sending text messages to the chat interface with role simulation capabilities. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_SEND_TEXT_MESSAGE.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_ACTION_SEND_TEXT_MESSAGE Specification

## Specification

### Type Definition

`CHAT_ACTION_SEND_TEXT_MESSAGE` is an action type that sends a text message to the chat interface. This action can simulate messages from both USER and ASSISTANT roles, making it useful for workflow automation, user input simulation, and system responses.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier for the action
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE", // required - must be exactly this value
  "action_data": {
    "target": "string", // required - target interface
    "role": "string", // required - role to simulate
    "text": "string" // required - message text to send
  }
}
```

### Properties

| Property             | Type   | Required | Description                                                                  |
| -------------------- | ------ | -------- | ---------------------------------------------------------------------------- |
| `action_id`          | string | Yes      | Unique identifier for this action (must follow message_id prefix convention) |
| `action_type`        | string | Yes      | Must be `"CHAT_ACTION_SEND_TEXT_MESSAGE"`                                    |
| `action_data.target` | string | Yes      | Target interface: `"CHAT"` (only CHAT is supported)                          |
| `action_data.role`   | string | Yes      | Role to simulate: `"USER"` or `"ASSISTANT"`                                  |
| `action_data.text`   | string | Yes      | Message text content to send                                                 |

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_SEND_TEXT_MESSAGE` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "role", "text"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the message, must be CHAT."
    },
    "role": {
      "type": "string",
      "enum": ["USER", "ASSISTANT"],
      "description": "Role to simulate for the message (USER or ASSISTANT)."
    },
    "text": {
      "type": "string",
      "description": "Text content of the message to send."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["CHAT"]),
  role: z.enum(["USER", "ASSISTANT"]),
  text: z.string(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  role: Joi.string().valid("USER", "ASSISTANT").required(),
  text: Joi.string().required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CHAT"]).required(),
  role: yup.string().oneOf(["USER", "ASSISTANT"]).required(),
  text: yup.string().required(),
});
```

### Target Options

- **`CHAT`**: Send message to the chat interface (primary use case)

### Role Options

- **`USER`**: Simulate message as if sent by the user (most common)
- **`ASSISTANT`**: Send message as the assistant (for system responses)

### Text Content

The `text` field supports:

- Plain text messages
- Structured data in readable format
- User selections and confirmations
- Form data and configuration details
- Workflow state transitions
- Error messages and recovery actions

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_ACTION_SEND_TEXT_MESSAGE Usage Examples](../type-usage-examples/CHAT_ACTION_SEND_TEXT_MESSAGE.md)**

## Implementation Notes

1. **Action ID Convention**: All action IDs must be prefixed with the message ID as per the protocol convention. For example: `"chatmessage-0000001-confirm-selection"`.

2. **Target Specification**: Currently only `"CHAT"` target is supported for text message actions. For canvas text display, use the `CANVAS_ACTION_UPDATE` action with markdown content.

3. **Role Simulation**:

   - Use `"USER"` role to simulate user input (most common use case)
   - Use `"ASSISTANT"` role for system messages or automated responses

4. **Text Content Guidelines**: Messages should be natural, contextual, and maintain conversation flow. Include sufficient context to make the user's intent clear.

5. **Action Chaining**: Can be combined with other actions (like `CANVAS_ACTION_OPEN`) to create complex workflows and multi-step interactions.

6. **Conversation History**: Simulated messages become part of the conversation history and should maintain consistency with the overall conversation context.

## Message Content Best Practices

### Natural Language

- Make simulated messages sound conversational and natural
- Avoid robotic or overly formal language
- Maintain consistent voice and tone throughout the conversation

### Context Preservation

- Include relevant context from the current interaction
- Reference previous selections or configurations when applicable
- Maintain continuity with the ongoing conversation

### Clear Intent

- Ensure the message clearly conveys the user's intent or action
- Be specific about what action is being taken or confirmed
- Avoid ambiguous language that could be misinterpreted

### Structured Data Format

- For complex selections, format data in readable, structured text
- Use consistent formatting for similar types of information
- Group related information logically within the message

## Common Use Cases

### Selection Confirmation

- Confirming user choices from buttons, cards, or chips
- Providing clear indication of what option was selected
- Including relevant details about the selection

### Workflow Automation

- Automating multi-step processes with user acknowledgments
- Moving between workflow states with clear communication
- Maintaining user awareness of process progression

### Form Submission

- Submitting structured data in readable format
- Confirming configuration details and settings
- Providing summary of submitted information

### Tutorial Guidance

- Guiding users through onboarding or feature tutorials
- Confirming completion of tutorial steps
- Providing context for next steps in the learning process

### Error Recovery

- Handling errors and retry scenarios with clear communication
- Providing context about what went wrong
- Offering clear paths for resolution

## Integration Patterns

This action works effectively when combined with:

1. **Interactive Content**: Buttons, chips, and cards that trigger text message actions
2. **Canvas Operations**: Opening canvases alongside sending confirmation messages
3. **Progress Updates**: Updating progress bars while confirming workflow steps
4. **Multi-step Workflows**: Chaining actions for complex organization processes
5. **Error Handling**: Providing fallback actions and recovery options

## Security Considerations

1. **Input Validation**: Validate all text content before processing to prevent injection attacks
2. **Content Sanitization**: Sanitize user input to prevent security vulnerabilities
3. **Information Disclosure**: Ensure simulated messages don't expose sensitive information inappropriately
4. **Audit Trails**: Maintain proper audit trails for simulated user actions
5. **Rate Limiting**: Implement appropriate rate limiting for automated message generation

## Performance Guidelines

1. **Message Length**: Keep messages concise while including necessary context
2. **Batch Operations**: For multiple related actions, consider batching when appropriate
3. **State Management**: Efficiently manage conversation state and history
4. **Resource Usage**: Monitor resource usage for high-frequency automated interactions

## Accessibility Standards

1. **Screen Reader Support**: Ensure simulated messages are properly announced by screen readers
2. **Visual Consistency**: Messages should maintain consistent styling with actual user messages
3. **Keyboard Navigation**: Support proper keyboard navigation and focus management
4. **Content Structure**: Use appropriate semantic structure for message content

## Error Handling

1. **Validation Failures**: Handle cases where message content fails validation
2. **Network Issues**: Provide appropriate fallbacks for network connectivity problems
3. **State Conflicts**: Handle situations where conversation state becomes inconsistent
4. **Rate Limiting**: Gracefully handle rate limiting scenarios

## Testing Guidelines

1. **Message Flow**: Test complete conversation flows including simulated messages
2. **Context Preservation**: Verify that context is properly maintained across interactions
3. **Error Scenarios**: Test error conditions and recovery workflows
4. **Integration Testing**: Test interactions with other action types and canvas operations
5. **Performance Testing**: Validate performance under various load conditions
