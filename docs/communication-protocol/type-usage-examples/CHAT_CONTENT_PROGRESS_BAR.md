---
description: "Simplified usage examples for CHAT_CONTENT_PROGRESS_BAR in the communication protocol. Focused on essential patterns and example interface use cases with consolidated examples. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_CONTENT_PROGRESS_BAR Specification](../type-specifications/CHAT_CONTENT_PROGRESS_BAR.md)**

# CHAT_CONTENT_PROGRESS_BAR Usage Examples

Progress bars provide real-time feedback during long-running operations, showing completion percentage, current status, and estimated completion time. Essential for a sample workflow's multi-AI scanning and workspace refinement workflows.

## Core Implementation

### Basic Progress Bar Payload

**Content Payload**

```json
{
  "content_id": "progress-bar-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 35,
    "progress_bar_message": "Processing data...",
    "progress_bar_icon": "progress-bar-icon-web"
  }
}
```

### Message Integration

**Message Payload**

```json
{
  "message_id": "chatmessage-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "status-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Starting analysis..."
      }
    },
    {
      "content_id": "progress-bar",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 35,
        "progress_bar_message": "Processing data...",
        "progress_bar_icon": "progress-bar-icon-web"
      }
    }
  ]
}
```

---

## Progress States

### In Progress

```json
{
  "progress_bar_state": "IN_PROGRESS",
  "progress_bar_current_percentage": 65,
  "progress_bar_message": "Processing request..."
}
```

### Completed

```json
{
  "progress_bar_state": "COMPLETED",
  "progress_bar_current_percentage": 100,
  "progress_bar_message": "Analysis complete!"
}
```

### Error State

```json
{
  "progress_bar_state": "ERROR",
  "progress_bar_current_percentage": 45,
  "progress_bar_message": "Connection timeout error"
}
```

### With Milestones

```json
{
  "progress_bar_state": "IN_PROGRESS",
  "progress_bar_current_percentage": 25,
  "progress_bar_next_goal_percentage": 50,
  "progress_bar_message": "Analyzing first dataset..."
}
```

---

## Essential Examples

### File Upload Progress

File upload operations with detailed progress tracking and size information.

**Assistant Output**

````markdown
I'll show the progress of your file upload with detailed information:

**Content Payload**

```json
{
  "content_id": "upload-progress",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 67,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_message": "Uploading data file..."
  }
}
```
````

### Data Processing

Long-running data processing operations with completion rate and time estimates.

**Assistant Output**

````markdown
I'll track the progress of your data processing operation:

**Content Payload**

```json
{
  "content_id": "data-processing",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_visibility": "VISIBLE",
    "progress_bar_current_percentage": 42,
    "progress_bar_current_animation_duration_ms": 1500,
    "progress_bar_next_goal_delay_ms": 500,
    "progress_bar_next_goal_percentage": 60,
    "progress_bar_next_goal_animation_duration_ms": 2000,
    "progress_bar_message": "Processing Data",
    "progress_bar_icon": "progress-bar-icon-processing"
  }
}
```
````

### Installation Progress

Package installation with dependency tracking and completion status.

**Assistant Output**

````markdown
I'll monitor the installation progress for you:

**Content Payload**

```json
{
  "content_id": "install-progress",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_visibility": "VISIBLE",
    "progress_bar_current_percentage": 85,
    "progress_bar_current_animation_duration_ms": 1000,
    "progress_bar_next_goal_delay_ms": 200,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_next_goal_animation_duration_ms": 500,
    "progress_bar_message": "Installing dependencies..."
  }
}
```
````

### AI Model Training

Model training progress with metrics and time estimates for machine learning operations.

**Assistant Output**

````markdown
I'll track the AI model training progress with detailed metrics:

**Content Payload**

```json
{
  "content_id": "training-progress",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_visibility": "VISIBLE",
    "progress_bar_current_percentage": 78,
    "progress_bar_current_animation_duration_ms": 800,
    "progress_bar_next_goal_delay_ms": 100,
    "progress_bar_next_goal_percentage": 85,
    "progress_bar_next_goal_animation_duration_ms": 600,
    "progress_bar_message": "Training AI model..."
  }
}
```
````

### AI Assistant Scanning

example interface scanning individual assistants during workspace creation process.

**Assistant Output**

````markdown
I'll show the progress of scanning ChatGPT for your organization information:

**Content Payload**

```json
{
  "content_id": "example-scanning-chatgpt",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 25,
    "progress_bar_next_goal_percentage": 50,
    "progress_bar_message": "Gathering from ChatGPT...",
    "progress_bar_icon": "progress-bar-icon-chatgpt"
  }
}
```
````

### Multi-AI Progress

example interface progress through multiple assistant scanning phases.

**Assistant Output**

````markdown
I'll track the progress as I scan multiple assistants:

**Content Payload**

```json
{
  "content_id": "example-multi-ai-progress",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 75,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_message": "Gathering from Gemini...",
    "progress_bar_icon": "progress-bar-icon-gemini"
  }
}
```
````

### Workspace Refinement

example interface deep website scanning and workspace refinement with detailed status.

**Assistant Output**

````markdown
I'll show the progress of your workspace refinement and website scanning:

**Content Payload**

```json
{
  "content_id": "example-refinement",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 45,
    "progress_bar_next_goal_percentage": 70,
    "progress_bar_message": "Scanning website content..."
  }
}
```
````

### Publishing Progress

example interface workspace publishing with search engine submission status.

**Assistant Output**

````markdown
I'll track the progress of publishing your workspace to search engines:

**Content Payload**

```json
{
  "content_id": "example-publishing",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 85,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_message": "Submitting for indexing..."
  }
}
```
````

### Scanning Complete

example interface completion notification with transition to next phase.

**Assistant Output**

````markdown
I'll show the completion of the scanning process:

**Content Payload**

```json
{
  "content_id": "example-complete",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "COMPLETED",
    "progress_bar_current_percentage": 100,
    "progress_bar_message": "Compiling workspace..."
  }
}
```
````

### Refinement Complete

example interface refinement completion with successful transformation confirmation.

**Assistant Output**

````markdown
I'll confirm the successful completion of your workspace refinement:

**Content Payload**

```json
{
  "content_id": "example-refinement-complete",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "COMPLETED",
    "progress_bar_current_percentage": 100,
    "progress_bar_message": "Workspace refinement complete!"
  }
}
```
````

---

### Hidden Progress Bar

Progress bar created in hidden state for background processing that will be revealed later.

**Assistant Output**

````markdown
I'm starting a background analysis that I'll show you once it's ready:

**Content Payload**

```json
{
  "content_id": "background-analysis-progress",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_visibility": "HIDDEN",
    "progress_bar_current_percentage": 15,
    "progress_bar_message": "Analyzing market trends...",
    "progress_bar_icon": "progress-bar-icon-analytics"
  }
}
```

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "background-analysis-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "HIDDEN",
        "progress_bar_current_percentage": 15,
        "progress_bar_message": "Analyzing market trends...",
        "progress_bar_icon": "progress-bar-icon-analytics"
      }
    }
  ]
}
```
````

This progress bar can later be made visible using `CHAT_ACTION_UPDATE_PROGRESS_BAR` with `"progress_bar_visibility": "VISIBLE"`.

### Progress Bar with Sophisticated Animation

Multi-phase progress animation with custom timing controls for smooth visual feedback.

**Assistant Output**

````markdown
I'll show the upload progress with smooth animation phases:

**Content Payload**

```json
{
  "content_id": "upload-with-animation",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PROGRESS_BAR",
  "content_data": {
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_visibility": "VISIBLE",
    "progress_bar_current_percentage": 67,
    "progress_bar_current_animation_duration_ms": 1500,
    "progress_bar_next_goal_delay_ms": 500,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_next_goal_animation_duration_ms": 2000,
    "progress_bar_message": "Uploading document file...",
    "progress_bar_icon": "progress-bar-icon-upload"
  }
}
```

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "upload-with-animation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 67,
        "progress_bar_current_animation_duration_ms": 1500,
        "progress_bar_next_goal_delay_ms": 500,
        "progress_bar_next_goal_percentage": 100,
        "progress_bar_next_goal_animation_duration_ms": 2000,
        "progress_bar_message": "Uploading document file...",
        "progress_bar_icon": "progress-bar-icon-upload"
      }
    }
  ]
}
```
````

**Animation Flow:**

1. **Current Animation**: Progress animates from 0% to 67% over 1500ms
2. **Delay Phase**: System waits 500ms after reaching 67%
3. **Goal Animation**: Progress animates from 67% to 100% over 2000ms

## Implementation Guidelines

### Best Practices

1. **Clear Messages**: Use descriptive progress messages that explain current activity
2. **Accurate Percentages**: Update progress percentages based on actual completion
3. **Milestone Tracking**: Use next_goal_percentage for multi-phase operations
4. **Error Handling**: Provide clear error messages with actionable information
5. **Completion Feedback**: Celebrate successful completion with positive messaging

### Progress States

- **IN_PROGRESS**: Active operation with ongoing updates
- **COMPLETED**: Operation finished successfully
- **ERROR**: Operation failed with error details
- **PAUSED**: Operation temporarily stopped

### Message Formatting

- Use **bold** for important status information
- Include emojis for visual clarity and engagement
- Provide specific details (file sizes, item counts, time estimates)
- Use consistent formatting across similar operations

### Example Interface Patterns

**AI Scanning Sequence:**

1. ChatGPT scanning (25%)
2. Claude scanning (50%)
3. Gemini scanning (75%)
4. Compilation (100%)

**Workspace Creation Flow:**

1. Website scanning (0-40%)
2. Content generation (40-70%)
3. Workspace refinement (70-90%)
4. Publishing setup (90-100%)

### Performance Considerations

- Update progress every 1-3 seconds for active operations
- Avoid too frequent updates that might cause UI jank
- Include estimated time remaining for longer operations
- Provide graceful fallbacks for failed operations

### When to Use Progress Bars

- **File uploads/downloads** > 1MB
- **Data processing** > 10 seconds
- **Multi-step operations** with clear phases
- **AI model operations** with measurable progress
- **Search engine submissions** with confirmation steps

---

## Multiple Progress Bars with Visual Alignment

When rendering multiple progress bars vertically, use `WIDTH_FULL` for all progress bars to ensure proper visual alignment and consistent spacing.

**Assistant Output**

````markdown
I'll show multiple progress bars tracking different operations simultaneously:

**Message Payload**

```json
{
  "message_id": "multi-progress-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "status-header",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "markdown": "**Processing Multiple Operations**\n\nTracking progress across different tasks:"
      }
    },
    {
      "content_id": "file-upload-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 75,
        "progress_bar_message": "Uploading dataset file...",
        "progress_bar_icon": "progress-bar-icon-web"
      }
    },
    {
      "content_id": "data-processing-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 45,
        "progress_bar_message": "Processing data records...",
        "progress_bar_icon": "progress-bar-icon-web"
      }
    },
    {
      "content_id": "ai-analysis-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 20,
        "progress_bar_message": "Extracting AI features...",
        "progress_bar_icon": "progress-bar-icon-chatgpt"
      }
    },
    {
      "content_id": "model-training-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "progress_bar_state": "COMPLETED",
        "progress_bar_current_percentage": 100,
        "progress_bar_message": "Model training complete!",
        "progress_bar_icon": "progress-bar-icon-web"
      }
    }
  ]
}
```
````

### Visual Alignment Benefits

Using `WIDTH_FULL` for multiple progress bars provides:

1. **Consistent Alignment**: All progress bars start and end at the same horizontal positions
2. **Professional Appearance**: Creates a clean, organized visual hierarchy
3. **Better Readability**: Makes it easier to compare progress across different operations
4. **Responsive Design**: Ensures proper alignment across different screen sizes
5. **Visual Cohesion**: Creates a unified interface component when multiple progress indicators are needed

---

## Dynamic Update Example

**Message Payload**

```json
{
  "message_id": "progress-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-scanning-status",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_current_percentage": 33,
        "progress_bar_next_goal_percentage": 66,
        "progress_bar_message": "Scanning Claude assistant...",
        "progress_bar_icon": "progress-bar-icon-claude"
      }
    }
  ]
}
```
