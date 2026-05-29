---
description: "Specification for CHAT_CONTENT_PROGRESS_BAR in the communication protocol. This file defines the complete specification, schema definitions, and core implementation guidance for creating progress bar interfaces within chat messages to show operation status. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_CONTENT_PROGRESS_BAR.md - Update Actions: CHAT_ACTION_UPDATE_PROGRESS_BAR.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](README.md)**

# CHAT_CONTENT_PROGRESS_BAR Specification

## Specification

### Type Definition

`CHAT_CONTENT_PROGRESS_BAR` is a content type that displays a progress indicator within chat messages. It provides visual feedback for long-running operations, showing current progress, status messages, and completion states.

### Example Full Content Payload

**Content Payload**

```json
{
  "content_id": "string", // required - unique identifier for the content
  "content_type": "CHAT_CONTENT_PROGRESS_BAR", // required - must be exactly this value
  "content_width": "WIDTH_AUTO", // optional - defaults to WIDTH_AUTO
  "content_data": {
    "progress_bar_state": "string", // required - current state of the operation
    "progress_bar_visibility": "string", // optional - progress bar visibility state (VISIBLE, HIDDEN), defaults to VISIBLE
    "progress_bar_current_percentage": "number", // required - current progress (0-100)
    "progress_bar_current_animation_duration_ms": "number", // optional - animation duration to current percentage
    "progress_bar_next_goal_delay_ms": "number", // optional - delay before next goal animation
    "progress_bar_next_goal_percentage": "number", // optional - next milestone percentage
    "progress_bar_next_goal_animation_duration_ms": "number", // optional - animation duration to next goal
    "progress_bar_message": "string", // required - status message
    "progress_bar_icon": "string" // optional - icon displayed at left side of progress bar text
  }
}
```

### Properties

| Property                                                    | Type   | Required | Default         | Description                                                                                                                                                                                                                             |
| ----------------------------------------------------------- | ------ | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id`                                                | string | Yes      |                 | Unique identifier for this content within the message                                                                                                                                                                                   |
| `content_type`                                              | string | Yes      |                 | Must be `"CHAT_CONTENT_PROGRESS_BAR"`                                                                                                                                                                                                   |
| `content_width`                                             | string | No       | `"WIDTH_AUTO"`  | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"`                                                                                                                                                                                        |
| `content_queue`                                             | string | No       | `"main"`        | Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel. See [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md#content-queue-processing) for details. |
| `content_delay`                                             | number | No       |                 | Delay in milliseconds applied AFTER this content finishes processing, BEFORE the next item in the same queue.                                                                                                                             |
| `content_data.progress_bar_state`                           | string | Yes      | `"IN_PROGRESS"` | Current state: `"IN_PROGRESS"`, `"COMPLETED"`                                                                                                                                                                                           |
| `content_data.progress_bar_visibility`                      | string | No       | `"VISIBLE"`     | Visibility state: `"VISIBLE"` or `"HIDDEN"`                                                                                                                                                                                             |
| `content_data.progress_bar_current_percentage`              | number | Yes      |                 | Current progress as percentage (0-100)                                                                                                                                                                                                  |
| `content_data.progress_bar_current_animation_duration_ms`   | number | No       | `0`             | Animation duration to reach current percentage (milliseconds)                                                                                                                                                                           |
| `content_data.progress_bar_next_goal_delay_ms`              | number | No       | `0`             | Delay before starting next goal animation (milliseconds)                                                                                                                                                                                |
| `content_data.progress_bar_next_goal_percentage`            | number | No       |                 | Next milestone percentage (0-100)                                                                                                                                                                                                       |
| `content_data.progress_bar_next_goal_animation_duration_ms` | number | No       | `0`             | Animation duration to reach next goal (milliseconds)                                                                                                                                                                                    |
| `content_data.progress_bar_message`                         | string | Yes      |                 | Status message (supports markdown formatting)                                                                                                                                                                                           |
| `content_data.progress_bar_icon`                            | string | No       |                 | Icon displayed at left side of progress bar text                                                                                                                                                                                        |

## Progress States

- **`IN_PROGRESS`**: Operation is currently running (default state)
- **`COMPLETED`**: Operation has finished successfully

## Progress Bar Visibility

The `progress_bar_visibility` parameter controls whether the progress bar is displayed or hidden:

- **`VISIBLE`** (default): Progress bar is displayed normally and accessible to users
- **`HIDDEN`**: Progress bar is hidden from view but retains its content and state for potential future display

## Progress Bar Animation

Progress bars support sophisticated animation timing controls for smooth visual transitions:

### Animation Parameters

- **`progress_bar_current_animation_duration_ms`**: Time in milliseconds to animate from 0 (or previous state) to the current percentage. Controls the speed of the initial/current progress animation. **Defaults to 0** (no animation).

- **`progress_bar_next_goal_delay_ms`**: Delay in milliseconds to wait between the end of the current animation and the start of the next goal animation. Creates a pause/breathing room between animation phases. **Defaults to 0** (no delay).

- **`progress_bar_next_goal_animation_duration_ms`**: Time in milliseconds to animate from current percentage to the next goal percentage. Controls the speed of the final progress animation. **Defaults to 0** (no animation).

### Animation Flow

1. **Current Animation**: Progress animates from 0 (or previous state) to `progress_bar_current_percentage` over `progress_bar_current_animation_duration_ms`
2. **Delay Phase**: System waits for `progress_bar_next_goal_delay_ms` after current animation completes
3. **Goal Animation**: Progress animates from current percentage to `progress_bar_next_goal_percentage` over `progress_bar_next_goal_animation_duration_ms`

## Progress Bar Icon

The `progress_bar_icon` field is optional and specifies an icon to be displayed at the left side of the progress bar text. The icon value can be:

### Predefined Icons

- `progress-bar-icon-web` - General web operations
- `progress-bar-icon-chatgpt` - ChatGPT/OpenAI operations
- `progress-bar-icon-gemini` - Google Gemini operations
- `progress-bar-icon-claude` - Anthropic Claude operations
- `progress-bar-icon-perplexity` - Perplexity AI operations
- `progress-bar-icon-deepseek` - DeepSeek operations
- `progress-bar-icon-grok` - Grok operations
- `progress-bar-icon-copilot` - GitHub Copilot operations
- `progress-bar-icon-google-search` - Google Search operations
- `progress-bar-icon-google-places` - Google Places operations
- `progress-bar-icon-web-search` - Web search operations
- `progress-bar-icon-website-crawling` - Website crawling and data extraction
- `progress-bar-icon-data-processing` - Data analysis and processing
- `progress-bar-icon-ai-analysis` - AI-powered analysis operations
- `progress-bar-icon-file-upload` - File upload and management
- `progress-bar-icon-database` - Database operations
- `progress-bar-icon-api` - API interactions
- `progress-bar-icon-security` - Security and authentication

### Custom Icons

- Full URL to an icon image (e.g., `"https://example.com/icon.png"`)

When no icon is specified, the progress bar displays without an icon.

## JSON Schema Definition

The complete schema for `CHAT_CONTENT_PROGRESS_BAR` adheres to the following structure:

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
      "enum": ["CHAT_CONTENT_PROGRESS_BAR"],
      "description": "Must be CHAT_CONTENT_PROGRESS_BAR."
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
      "description": "Delay in milliseconds applied AFTER this content item finishes processing, BEFORE the next item in the same queue begins."
    },
    "content_data": {
      "type": "object",
      "required": ["progress_bar_state", "progress_bar_current_percentage", "progress_bar_message"],
      "properties": {
        "progress_bar_state": {
          "type": "string",
          "enum": ["IN_PROGRESS", "COMPLETED"],
          "default": "IN_PROGRESS",
          "description": "Current state of the operation (IN_PROGRESS, COMPLETED). Defaults to IN_PROGRESS."
        },
        "progress_bar_visibility": {
          "type": "string",
          "enum": ["VISIBLE", "HIDDEN"],
          "default": "VISIBLE",
          "description": "Visibility state of the progress bar (VISIBLE, HIDDEN). Defaults to VISIBLE."
        },
        "progress_bar_current_percentage": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Current progress as a percentage (0-100)."
        },
        "progress_bar_current_animation_duration_ms": {
          "type": "number",
          "minimum": 0,
          "default": 0,
          "description": "Optional. Animation duration in milliseconds to reach current percentage from 0 or previous state. Defaults to 0."
        },
        "progress_bar_next_goal_delay_ms": {
          "type": "number",
          "minimum": 0,
          "default": 0,
          "description": "Optional. Delay in milliseconds before starting next goal animation. Defaults to 0."
        },
        "progress_bar_next_goal_percentage": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Optional. Next milestone percentage (0-100) for multi-step processes. No default value."
        },
        "progress_bar_next_goal_animation_duration_ms": {
          "type": "number",
          "minimum": 0,
          "default": 0,
          "description": "Optional. Animation duration in milliseconds to reach next goal percentage from current percentage. Defaults to 0."
        },
        "progress_bar_message": {
          "type": "string",
          "description": "Status message describing the current activity. Supports markdown formatting."
        },
        "progress_bar_icon": {
          "type": "string",
          "description": "Optional. Icon displayed at left side of progress bar text. Can be a predefined icon identifier or full URL to an icon image."
        }
      }
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const contentDataSchema = z.object({
  progress_bar_state: z.enum(["IN_PROGRESS", "COMPLETED"]).default("IN_PROGRESS"),
  progress_bar_visibility: z.enum(["VISIBLE", "HIDDEN"]).default("VISIBLE").optional(),
  progress_bar_current_percentage: z.number().min(0).max(100),
  progress_bar_current_animation_duration_ms: z.number().min(0).default(0).optional(),
  progress_bar_next_goal_delay_ms: z.number().min(0).default(0).optional(),
  progress_bar_next_goal_percentage: z.number().min(0).max(100).optional(),
  progress_bar_next_goal_animation_duration_ms: z.number().min(0).default(0).optional(),
  progress_bar_message: z.string(),
  progress_bar_icon: z.string().optional(),
});

const chatContentProgressBarSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_PROGRESS_BAR"),
  content_width: z.enum(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO").optional(),
  content_queue: z.string().default("main").optional(),
  content_delay: z.number().optional(),
  content_data: contentDataSchema,
});
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const contentDataSchema = Joi.object({
  progress_bar_state: Joi.string()
    .valid("IN_PROGRESS", "COMPLETED")
    .default("IN_PROGRESS")
    .required(),
  progress_bar_visibility: Joi.string().valid("VISIBLE", "HIDDEN").default("VISIBLE"),
  progress_bar_current_percentage: Joi.number().min(0).max(100).required(),
  progress_bar_current_animation_duration_ms: Joi.number().min(0).default(0),
  progress_bar_next_goal_delay_ms: Joi.number().min(0).default(0),
  progress_bar_next_goal_percentage: Joi.number().min(0).max(100),
  progress_bar_next_goal_animation_duration_ms: Joi.number().min(0).default(0),
  progress_bar_message: Joi.string().required(),
  progress_bar_icon: Joi.string(),
});

const chatContentProgressBarSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_PROGRESS_BAR").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number(),
  content_data: contentDataSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const contentDataSchema = yup.object().shape({
  progress_bar_state: yup
    .string()
    .oneOf(["IN_PROGRESS", "COMPLETED"])
    .default("IN_PROGRESS")
    .required(),
  progress_bar_visibility: yup.string().oneOf(["VISIBLE", "HIDDEN"]).default("VISIBLE"),
  progress_bar_current_percentage: yup.number().min(0).max(100).required(),
  progress_bar_current_animation_duration_ms: yup.number().min(0).default(0),
  progress_bar_next_goal_delay_ms: yup.number().min(0).default(0),
  progress_bar_next_goal_percentage: yup.number().min(0).max(100),
  progress_bar_next_goal_animation_duration_ms: yup.number().min(0).default(0),
  progress_bar_message: yup.string().required(),
  progress_bar_icon: yup.string(),
});

const chatContentProgressBarSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_PROGRESS_BAR"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_queue: yup.string().default("main"),
  content_delay: yup.number(),
  content_data: contentDataSchema.required(),
});
```

### Progress Indicators

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [CHAT_CONTENT_PROGRESS_BAR Usage Examples](../type-usage-examples/CHAT_CONTENT_PROGRESS_BAR.md)**

## Dynamic Updates

To update an existing progress bar, use the `CHAT_ACTION_UPDATE_PROGRESS_BAR` action. For detailed examples and specifications, please refer to:

> **🔄 [CHAT_ACTION_UPDATE_PROGRESS_BAR Specification](CHAT_ACTION_UPDATE_PROGRESS_BAR.md)**

## Implementation Notes

1. **Progress Updates**: To update an existing progress bar, use the `CHAT_ACTION_UPDATE_PROGRESS_BAR` action.

2. **State Transitions**: Progress bars follow the simple flow: `IN_PROGRESS` → `COMPLETED`.

3. **Percentage Validation**: Ensure percentages are between 0-100. Values outside this range should be clamped.

4. **Milestone Indicators**: Use `progress_bar_next_goal_percentage` to show upcoming milestones in multi-step processes.

5. **Animation Timing**: Use the animation timing fields to create smooth, professional progress transitions with custom durations and delays.

6. **Message Formatting**: Progress messages support markdown formatting for better visual presentation.

## Expected UI Behavior

- Progress bar renders with visual progress indicator (bar, circle, etc.)
- Current percentage displayed numerically and visually
- State affects visual styling (colors, icons)
- Messages render with markdown formatting support
- Milestone indicators show upcoming goals when provided
- Smooth animations for progress updates
- Error states display with appropriate warning styling
- Completed states show success indicators

## Use Cases

- **Data Processing**: Long-running analysis, imports, exports
- **File Operations**: Uploads, downloads, conversions
- **Model Training**: AI/ML model training progress
- **Batch Jobs**: Processing multiple items sequentially
- **Installation**: Software, package, or dependency installation
- **Synchronization**: Data sync between systems
- **Report Generation**: Creating complex reports or documents
- **Backup Operations**: System or data backup processes

## Best Practices

1. **Meaningful Messages**: Provide clear, informative status messages that help users understand what's happening
2. **Regular Updates**: Update progress frequently enough to show activity but not so often as to be distracting
3. **Accurate Percentages**: Ensure progress percentages reflect actual completion status
4. **Error Handling**: Always handle errors gracefully with clear error messages
5. **Completion Feedback**: Provide clear success indication when operations complete
6. **Time Estimates**: Include estimated completion times when possible
7. **Milestone Communication**: Use milestones to break down complex processes into understandable steps
8. **Consistent Formatting**: Use consistent message formatting and emoji/icons for similar operations

## Integration Patterns

Progress bars work well when combined with:

1. **Initial Markdown**: Explaining what operation will begin
2. **Action Buttons**: Allowing pause/resume/cancel operations
3. **Final Messages**: Summarizing results upon completion
4. **Canvas Views**: Opening detailed results when complete

## Performance Considerations

- Update progress at reasonable intervals (every 1-5% change or 1-2 seconds)
- Avoid excessive updates that could impact UI performance
- Cache progress state for recovery after interruptions
- Provide meaningful feedback even when exact progress is unknown
