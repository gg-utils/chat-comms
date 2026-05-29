---
description: "Specification for CHAT_ACTION_UPDATE_PROGRESS_BAR in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for updating progress bar states and values within chat messages dynamically. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_UPDATE_PROGRESS_BAR.md - Related Content: CHAT_CONTENT_PROGRESS_BAR.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_ACTION_UPDATE_PROGRESS_BAR Specification

## Specification

### Type Definition

`CHAT_ACTION_UPDATE_PROGRESS_BAR` is an action type that updates the state, percentage, and message of an existing `CHAT_CONTENT_PROGRESS_BAR` component within chat messages. This action enables real-time progress tracking for long-running operations without requiring full message refreshes.

### Example Full Action Payload

**Action Payload**

```json
{
  "action_id": "string", // required - unique identifier following {message_id}-{action_identifier} format
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR", // required - must be exactly this value
  "action_data": {
    "target": "CHAT", // required - must be "CHAT"
    "progress_bar_content_id": "string", // required - content_id of the progress bar to update
    "progress_bar_state": "string", // optional - new state (IN_PROGRESS, COMPLETED)
    "progress_bar_visibility": "string", // optional - new visibility state (VISIBLE, HIDDEN)
    "progress_bar_current_percentage": "number", // optional - current progress percentage (0-100)
    "progress_bar_current_animation_duration_ms": "number", // optional - animation duration to current percentage
    "progress_bar_next_goal_delay_ms": "number", // optional - delay before next goal animation
    "progress_bar_next_goal_percentage": "number", // optional - next milestone percentage
    "progress_bar_next_goal_animation_duration_ms": "number", // optional - animation duration to next goal
    "progress_bar_message": "string", // optional - new progress message
    "progress_bar_icon": "string" // optional - new icon for the progress bar
  }
}
```

### Properties

| Property                                                   | Type   | Required | Description                                                                   |
| ---------------------------------------------------------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `action_id`                                                | string | Yes      | Unique identifier following `{message_id}-{action_identifier}` format         |
| `action_type`                                              | string | Yes      | Must be `"CHAT_ACTION_UPDATE_PROGRESS_BAR"`                                   |
| `action_data.target`                                       | string | Yes      | Must be `"CHAT"`                                                              |
| `action_data.progress_bar_content_id`                      | string | Yes      | Must match the `content_id` of an existing progress bar                       |
| `action_data.progress_bar_state`                           | string | No       | New progress state: `"IN_PROGRESS"` or `"COMPLETED"`                          |
| `action_data.progress_bar_visibility`                      | string | No       | New visibility state: `"VISIBLE"` or `"HIDDEN"`                               |
| `action_data.progress_bar_current_percentage`              | number | No       | Current progress percentage (0-100)                                           |
| `action_data.progress_bar_current_animation_duration_ms`   | number | No       | Animation duration to reach current percentage (milliseconds) (defaults to 0) |
| `action_data.progress_bar_next_goal_delay_ms`              | number | No       | Delay before starting next goal animation (milliseconds) (defaults to 0)      |
| `action_data.progress_bar_next_goal_percentage`            | number | No       | Next milestone percentage (optional, no default)                              |
| `action_data.progress_bar_next_goal_animation_duration_ms` | number | No       | Animation duration to reach next goal (milliseconds) (defaults to 0)          |
| `action_data.progress_bar_message`                         | string | No       | New progress message text                                                     |
| `action_data.progress_bar_icon`                            | string | No       | New icon for the progress bar                                                 |

## Supported Progress States

- **`IN_PROGRESS`**: Progress bar is actively updating (default state)
- **`COMPLETED`**: Operation has finished successfully

## JSON Schema Definition for `action_data`

The `action_data` for `CHAT_ACTION_UPDATE_PROGRESS_BAR` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "progress_bar_content_id"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["CHAT"],
      "description": "Target interface for the action, must be CHAT."
    },
    "progress_bar_content_id": {
      "type": "string",
      "description": "Must match the content_id of an existing CHAT_CONTENT_PROGRESS_BAR component."
    },
    "progress_bar_state": {
      "type": "string",
      "enum": ["IN_PROGRESS", "COMPLETED"],
      "description": "New progress state for the progress bar."
    },
    "progress_bar_visibility": {
      "type": "string",
      "enum": ["VISIBLE", "HIDDEN"],
      "description": "New visibility state for the progress bar."
    },
    "progress_bar_current_percentage": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Current progress percentage (0-100)."
    },
    "progress_bar_current_animation_duration_ms": {
      "type": "number",
      "minimum": 0,
      "default": 0,
      "description": "Animation duration in milliseconds to reach current percentage. Defaults to 0."
    },
    "progress_bar_next_goal_delay_ms": {
      "type": "number",
      "minimum": 0,
      "default": 0,
      "description": "Delay in milliseconds before starting next goal animation. Defaults to 0."
    },
    "progress_bar_next_goal_percentage": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "description": "Next milestone percentage for visual feedback. No default value."
    },
    "progress_bar_next_goal_animation_duration_ms": {
      "type": "number",
      "minimum": 0,
      "default": 0,
      "description": "Animation duration in milliseconds to reach next goal percentage. Defaults to 0."
    },
    "progress_bar_message": {
      "type": "string",
      "description": "New descriptive message about the current progress status."
    },
    "progress_bar_icon": {
      "type": "string",
      "description": "New icon for the progress bar. Can be a predefined icon identifier or full URL to an icon image."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z
  .object({
    target: z.enum(["CHAT"]),
    progress_bar_content_id: z.string(),
    progress_bar_state: z.enum(["IN_PROGRESS", "COMPLETED"]).optional(),
    progress_bar_visibility: z.enum(["VISIBLE", "HIDDEN"]).optional(),
    progress_bar_current_percentage: z.number().min(0).max(100).optional(),
    progress_bar_current_animation_duration_ms: z.number().min(0).default(0).optional(),
    progress_bar_next_goal_delay_ms: z.number().min(0).default(0).optional(),
    progress_bar_next_goal_percentage: z.number().min(0).max(100).optional(),
    progress_bar_next_goal_animation_duration_ms: z.number().min(0).default(0).optional(),
    progress_bar_message: z.string().optional(),
    progress_bar_icon: z.string().optional(),
  })
  .refine(
    (data) => {
      const updateFields = [
        "progress_bar_state",
        "progress_bar_visibility",
        "progress_bar_current_percentage",
        "progress_bar_current_animation_duration_ms",
        "progress_bar_next_goal_delay_ms",
        "progress_bar_next_goal_percentage",
        "progress_bar_next_goal_animation_duration_ms",
        "progress_bar_message",
        "progress_bar_icon",
      ];
      return updateFields.some((field) => data[field] !== undefined);
    },
    {
      message: "At least one progress bar update field must be provided",
    }
  );
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  progress_bar_content_id: Joi.string().required(),
  progress_bar_state: Joi.string().valid("IN_PROGRESS", "COMPLETED"),
  progress_bar_visibility: Joi.string().valid("VISIBLE", "HIDDEN"),
  progress_bar_current_percentage: Joi.number().min(0).max(100),
  progress_bar_current_animation_duration_ms: Joi.number().min(0).default(0),
  progress_bar_next_goal_delay_ms: Joi.number().min(0).default(0),
  progress_bar_next_goal_percentage: Joi.number().min(0).max(100),
  progress_bar_next_goal_animation_duration_ms: Joi.number().min(0).default(0),
  progress_bar_message: Joi.string(),
  progress_bar_icon: Joi.string(),
})
  .custom((value, helpers) => {
    const updateFields = [
      "progress_bar_state",
      "progress_bar_visibility",
      "progress_bar_current_percentage",
      "progress_bar_current_animation_duration_ms",
      "progress_bar_next_goal_delay_ms",
      "progress_bar_next_goal_percentage",
      "progress_bar_next_goal_animation_duration_ms",
      "progress_bar_message",
      "progress_bar_icon",
    ];
    const hasUpdate = updateFields.some((field) => value[field] !== undefined);
    if (!hasUpdate) {
      return helpers.error("custom.missingUpdate");
    }
    return value;
  })
  .messages({
    "custom.missingUpdate": "At least one progress bar update field must be provided",
  });
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup
  .object()
  .shape({
    target: yup.string().oneOf(["CHAT"]).required(),
    progress_bar_content_id: yup.string().required(),
    progress_bar_state: yup.string().oneOf(["IN_PROGRESS", "COMPLETED"]),
    progress_bar_visibility: yup.string().oneOf(["VISIBLE", "HIDDEN"]),
    progress_bar_current_percentage: yup.number().min(0).max(100),
    progress_bar_current_animation_duration_ms: yup.number().min(0).default(0),
    progress_bar_next_goal_delay_ms: yup.number().min(0).default(0),
    progress_bar_next_goal_percentage: yup.number().min(0).max(100),
    progress_bar_next_goal_animation_duration_ms: yup.number().min(0).default(0),
    progress_bar_message: yup.string(),
    progress_bar_icon: yup.string(),
  })
  .test(
    "at-least-one-update",
    "At least one progress bar update field must be provided",
    function (value) {
      const updateFields = [
        "progress_bar_state",
        "progress_bar_visibility",
        "progress_bar_current_percentage",
        "progress_bar_current_animation_duration_ms",
        "progress_bar_next_goal_delay_ms",
        "progress_bar_next_goal_percentage",
        "progress_bar_next_goal_animation_duration_ms",
        "progress_bar_message",
        "progress_bar_icon",
      ];
      return updateFields.some((field) => value[field] !== undefined);
    }
  );
```

### Supported Features

- **Real-time Updates**: Instantly update progress without UI refresh
- **State Management**: Change progress states based on operation status
- **Message Updates**: Update descriptive text with current status
- **Milestone Tracking**: Set next goal percentages for visual feedback
- **Error Handling**: Reflect error states and recovery options
- **Completion Indication**: Show successful completion with final status

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_ACTION_UPDATE_PROGRESS_BAR Usage Examples](../type-usage-examples/CHAT_ACTION_UPDATE_PROGRESS_BAR.md)**

## Content Queue Processing

When `CHAT_ACTION_UPDATE_PROGRESS_BAR` actions are delivered via `CHAT_CONTENT_ACTION_WRAPPER`, the wrapper's `content_queue` property determines which processing queue the action is assigned to. This enables parallel processing of progress bar updates alongside other content types.

### Queue Assignment

The action itself does not have a `content_queue` property. Instead, the queue is specified on the wrapping content:

```json
{
  "content_id": "action-wrapper-progress-update",
  "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
  "content_queue": "main",
  "content_data": {
    "action": {
      "action_id": "chatmessage-0000001-pbu-1",
      "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
      "action_data": {
        "target": "CHAT",
        "progress_bar_content_id": "chatmessage-0000001-content-02-progress-bar",
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 50,
        "progress_bar_message": "Processing data..."
      }
    }
  }
}
```

### Queue Recommendations

Progress bar updates are typically kept in the `"main"` queue because:

- **Sequential Visibility**: Progress updates should appear in order with related chat content
- **User Feedback**: Progress indicators are primary user feedback during long operations
- **Message Context**: Progress bars are often paired with explanatory markdown content

However, if progress bars are updating independently (e.g., multiple concurrent operations), separate queues can enable parallel updates.

For detailed information about content queue processing, see [CHAT_CONTENT Queue Processing](../specialized-structures/CHAT_CONTENT.md#content-queue-processing).

## Implementation Notes

1. **Content ID Validation**: The `progress_bar_content_id` must exactly match the `content_id` of an existing `CHAT_CONTENT_PROGRESS_BAR` component. Invalid IDs will result in no-op behavior.

2. **Partial Updates**: Only include the properties you want to change. Unchanged properties will retain their current values, allowing for efficient incremental updates.

3. **Percentage Validation**: Progress percentages should be between 0 and 100. Values outside this range may cause display issues or be clamped to valid ranges.

4. **State Consistency**: Ensure state changes are logical and consistent:

   - Don't set state to `COMPLETED` with a percentage less than 100
   - Progress bars only support `IN_PROGRESS` and `COMPLETED` states
   - Use appropriate error handling outside of progress bar states

5. **Message Updates**: Progress messages should be descriptive and provide meaningful context about the current operation status.

## Update Requirements

At least one of the following properties must be provided for a valid update:

- `progress_bar_state`: Change the operational state
- `progress_bar_current_percentage`: Update the progress percentage
- `progress_bar_message`: Update the descriptive message
- `progress_bar_icon`: Update the progress bar icon

Updates with no changing properties will be ignored.

## Progress State Transitions

### Valid State Transitions

```
IN_PROGRESS → COMPLETED (normal completion)
```

### Terminal State

- `COMPLETED` → no further transitions (completed operations are final)

## Message Content Guidelines

### Progress Messages

1. **Be Descriptive**: Clearly describe what operation is currently happening
2. **Include Context**: Add relevant details like record counts, file sizes, or time estimates
3. **Use Consistent Format**: Maintain consistent message structure across similar operations
4. **Add Visual Indicators**: Use formatting to make status visually clear

### Example Message Patterns

```javascript
// Phase-based messages
"Phase 2/5: Data validation in progress (checking 15,489 records)";

// Batch processing messages
"Processing batch 15 of 25 (747 records processed)";

// File operation messages
"Uploading... 4.6 MB of 15.3 MB (30% complete)";

// Error messages
"Error at 78% - Database connection lost (batch 20/25)";

// Completion messages
"Analysis Complete! Comprehensive insights generated successfully";
```

## Performance Considerations

### Update Frequency

1. **Optimal Intervals**: Update every 1-3 seconds for good user engagement without overwhelming the UI
2. **Meaningful Changes**: Only update when progress changes by at least 1-2% to avoid excessive updates
3. **Batch Updates**: For rapid operations, batch multiple small updates into larger increments
4. **Network Efficiency**: Consider network latency when determining update frequency

### UI Performance

1. **Smooth Animation**: Ensure progress bar animations are smooth and not jarring
2. **Efficient Rendering**: Avoid triggering unnecessary UI re-renders
3. **Memory Management**: Clean up resources for completed or cancelled progress bars
4. **Responsive Updates**: Updates should be reflected in the UI within 100-200ms

## Error Handling Strategies

### Error Recovery Patterns

1. **Automatic Retry**: Implement automatic retry with exponential backoff for transient errors
2. **Manual Retry**: Provide user options to manually retry failed operations
3. **Partial Recovery**: Allow continuation from the last successful checkpoint
4. **Graceful Degradation**: Continue with reduced functionality when possible

### Error Communication

1. **Clear Error Messages**: Provide specific, actionable error descriptions
2. **Recovery Options**: Present clear paths for error resolution
3. **Context Preservation**: Maintain context about where the error occurred
4. **User Guidance**: Offer guidance on how to prevent similar errors

## Accessibility Standards

### Screen Reader Support

1. **Progress Announcements**: Ensure progress updates are announced to screen readers
2. **State Changes**: Clearly announce when progress states change
3. **Error Notifications**: Make error states immediately apparent to assistive technologies
4. **Completion Confirmation**: Provide clear completion announcements

### Visual Accessibility

1. **Color Independence**: Don't rely solely on color to indicate states
2. **High Contrast**: Ensure progress indicators are visible in high contrast modes
3. **Text Alternatives**: Provide text descriptions for visual progress indicators
4. **Consistent Styling**: Maintain consistent visual patterns across progress updates

## Testing Guidelines

### Functional Testing

1. **State Transitions**: Test all valid state transition scenarios
2. **Edge Cases**: Test with boundary values (0%, 100%, invalid percentages)
3. **Error Scenarios**: Test error conditions and recovery workflows
4. **Concurrent Updates**: Test multiple simultaneous progress bar updates
5. **Network Issues**: Test behavior under poor network conditions

### Performance Testing

1. **Update Frequency**: Test with various update frequencies to find optimal balance
2. **Long Operations**: Test with long-running operations (>10 minutes)
3. **Multiple Progress Bars**: Test with multiple active progress bars simultaneously
4. **Memory Usage**: Monitor memory usage during extended operations
5. **UI Responsiveness**: Ensure UI remains responsive during intensive updates
