---
description: "Specification for CANVAS_ACTION_CLOSE in the communication protocol. This file defines the complete specification, implementation guidance, and usage patterns for closing canvas interfaces and returning to chat-only interaction. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](../README.md)**

# CANVAS_ACTION_CLOSE Specification

## Specification

### Type Definition

`CANVAS_ACTION_CLOSE` is an action type that closes the canvas interface and returns the user to chat-only interaction. This action is used to end canvas-based workflows, free up resources, and provide clear closure to canvas activities.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CANVAS_ACTION_CLOSE", // required - must be exactly this value
  "action_data": {
    "target": "CANVAS", // required - must be "CANVAS"
    "canvas_id": "string" // optional - unique identifier for the canvas document to close
  }
}
```

### Properties

| Property                | Type   | Required | Description                                                                                                                                |
| ----------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `action_id`             | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format                                                                      |
| `action_type`           | string | Yes      | Must be `"CANVAS_ACTION_CLOSE"`                                                                                                            |
| `action_data.target`    | string | Yes      | Must be `"CANVAS"`                                                                                                                         |
| `action_data.canvas_id` | string | No       | Unique identifier for the canvas document to close. If omitted, the action applies to the currently active or most recently opened canvas. |

## JSON Schema Definition for `action_data`

The `action_data` for `CANVAS_ACTION_CLOSE` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CANVAS"],
      "description": "Target interface for the action, must be CANVAS."
    },
    "canvas_id": {
      "type": "string",
      "description": "Optional unique identifier for the canvas document to close. If omitted, applies to the active canvas."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["CANVAS"]),
  canvas_id: z.string().optional(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CANVAS").required(),
  canvas_id: Joi.string(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["CANVAS"]).required(),
  canvas_id: yup.string(),
});
```

### Supported Features

- **Interface Cleanup**: Closes canvas and returns focus to chat interface
- **Resource Management**: Frees up resources used by the canvas document
- **Workflow Completion**: Marks the end of canvas-based workflows
- **State Preservation**: Can preserve canvas state for potential future reopening
- **Graceful Transition**: Smooth transition back to chat-only interaction

### Canvas Close Behavior

- **Immediate Closure**: Canvas interface closes immediately when action is processed
- **Focus Return**: User focus returns to the chat interface
- **Memory Management**: Canvas content is removed from active memory
- **State Cleanup**: Temporary canvas state is cleared
- **URL Update**: Browser URL may update to reflect chat-only state

---

## Usage Examples

For comprehensive usage examples showing different canvas closure scenarios, error handling patterns, user confirmation workflows, and implementation best practices, see the [Usage Examples](../type-usage-examples/CANVAS_ACTION_CLOSE.md) document.

**Quick Examples**:

- **Simple Closure**: Basic task completion with immediate canvas close
- **User Confirmation**: Closure requiring user confirmation for unsaved changes
- **Automatic Closure**: Delayed closure after task completion with summary
- **Error Recovery**: Emergency closure with data preservation and recovery options
- **Scheduled Maintenance**: Planned closure with advance notice and alternatives

---

## Implementation Notes

### Document ID Validation

If `canvas_id` is provided, it must match an existing, open canvas document or the action may fail silently or log an error. If `canvas_id` is omitted, the action applies to the currently active or most recently opened canvas. The UI should gracefully handle cases where no canvas is active or available to close.

### Resource Cleanup

When a canvas is closed, all associated resources (memory, temporary files, cached data) should be properly cleaned up to prevent memory leaks and refine system performance.

### State Preservation

Consider whether canvas state should be preserved for potential future reopening or completely discarded. Implement appropriate persistence strategies based on use case requirements.

### User Experience

Provide clear feedback about what happens when the canvas closes (data saved, workflow complete, next steps available, etc.) to maintain user confidence and understanding.

### Error Handling

Handle cases gracefully where the canvas document doesn't exist, is already closed, or encounters system errors during the closure process.

### Performance Considerations

- Close canvases promptly when no longer needed to free system resources
- Implement efficient cleanup algorithms for large canvas documents
- Consider batching cleanup operations for multiple simultaneous closures

### Security Guidelines

- Verify user permissions before closing shared canvas documents
- Ensure sensitive data is properly cleared from memory after closure
- Log closure events for audit and troubleshooting purposes

---

## Expected UI Behavior

### Immediate Actions

1. **Canvas Closure**: Canvas interface closes immediately when the action is processed
2. **Focus Return**: User focus automatically returns to the chat interface
3. **Visual Transition**: Smooth animation or transition effect when closing
4. **URL Update**: Browser URL updates to reflect chat-only state

### Resource Management

1. **Memory Cleanup**: Canvas content is removed from browser memory
2. **State Reset**: Canvas-related UI state is reset to default
3. **Cache Clearing**: Temporary canvas data is cleared from local storage
4. **Event Cleanup**: Canvas-related event listeners are properly removed

### User Feedback

1. **Closure Confirmation**: Visual confirmation that canvas has closed successfully
2. **Next Steps**: Clear indication of what user can do next
3. **Data Status**: Confirmation of data save status (if applicable)
4. **Error Handling**: Appropriate error messages if closure fails

---

## Best Practices

### Communication Guidelines

1. **Clear Explanation**: Always explain why the canvas is being closed and what happens next
2. **Data Safety**: Confirm that important data has been saved before closure
3. **User Confirmation**: Ask for confirmation when closing might result in data loss
4. **Graceful Timing**: Allow users time to review final canvas content before closing

### User Experience

1. **Smooth Transitions**: Ensure closing feels natural and intentional, not abrupt
2. **Recovery Options**: Provide ways to recover from accidental closures when possible
3. **State Management**: Consider whether to preserve canvas state for future sessions
4. **Next Steps**: Provide clear guidance on available actions after closure

### Technical Implementation

1. **Resource Efficiency**: Close promptly to free up system resources and memory
2. **Error Recovery**: Have robust error handling for unexpected closure scenarios
3. **Performance**: Implement efficient cleanup processes for large or complex canvases
4. **Accessibility**: Ensure screen readers properly announce canvas closure events

### Common Use Cases

1. **Task Completion**: Close canvas when specific work or analysis is finished
2. **User Request**: Close canvas when user explicitly requests closure
3. **Workflow Transition**: Close canvas when moving to different interaction type
4. **Error Recovery**: Close canvas due to technical issues or system errors
5. **Session Management**: Close canvas for maintenance, resource limits, or security
6. **Focus Management**: Close canvas to redirect user attention back to chat interface

---

## Migration Considerations

This action type maintains compatibility with previous canvas closure mechanisms while providing enhanced control and feedback capabilities. Existing implementations should migrate gradually, ensuring proper error handling and user communication throughout the transition process.

---

_This specification is part of the Communication Protocol documentation. For related canvas actions, see [CANVAS_ACTION_OPEN](./CANVAS_ACTION_OPEN.md) and [CANVAS_ACTION_UPDATE](./CANVAS_ACTION_UPDATE.md)._
