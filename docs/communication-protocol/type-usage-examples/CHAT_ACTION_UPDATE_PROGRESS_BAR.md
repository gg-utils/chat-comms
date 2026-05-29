---
description: "Usage examples for CHAT_ACTION_UPDATE_PROGRESS_BAR in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples for using CHAT_ACTION_UPDATE_PROGRESS_BAR to provide real-time progress feedback to users during various operations and workflows. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_UPDATE_PROGRESS_BAR Specification](../type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md)**

# CHAT_ACTION_UPDATE_PROGRESS_BAR Usage Examples

This action type dynamically updates existing progress bar content within chat messages, enabling real-time progress tracking for file uploads, data processing, installations, and other time-consuming operations.

## Core Implementation

### Basic Update Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-{action-identifier}",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "existing-progress-bar-id",
    "progress_bar_state": "IN_PROGRESS|COMPLETED",
    "progress_bar_current_percentage": 0-100,
    "progress_bar_next_goal_percentage": 0-100,
    "progress_bar_message": "Processing task...",
    "progress_bar_icon": "predefined-icon-id or full-url"
  }
}
```

### Message Integration

**Message Payload**

```json
{
  "message_id": "chatmessage-{id}",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-{id}-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Progress update: operation is proceeding..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_UPDATE_PROGRESS_BAR payload */
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Basic Progress Update

Simple progress tracking with percentage and descriptive messages for general operations.

**Assistant Output**

````markdown
I'm updating the progress bar to show current completion status:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-update-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "chatmessage-0000001-content-02-progress-bar",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 65,
    "progress_bar_message": "Processing data..."
  }
}
```
````

### File Upload Progress

Real-time file upload tracking with detailed transfer information and milestone indicators.

**Assistant Output**

````markdown
I'm updating the file upload progress to show current transfer status:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000002-upload-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "chatmessage-0000001-content-02-upload-progress",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 42,
    "progress_bar_current_animation_duration_ms": 1200,
    "progress_bar_next_goal_delay_ms": 300,
    "progress_bar_next_goal_percentage": 60,
    "progress_bar_next_goal_animation_duration_ms": 800,
    "progress_bar_message": "Uploading report file..."
  }
}
```
````

### Multi-Step Process

Progress tracking for complex workflows with step-by-step completion indicators.

**Assistant Output**

````markdown
I'm updating the installation progress to show current step completion:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000003-multistep-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "chatmessage-0000001-content-02-install-progress",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 30,
    "progress_bar_message": "Installing dependencies..."
  }
}
```
````

### Success Completion

Completion notification with success indicators and positive messaging.

**Assistant Output**

````markdown
I'm updating the progress bar to show successful completion:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000004-complete-analysis",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "chatmessage-0000001-content-02-analysis-progress",
    "progress_bar_state": "COMPLETED",
    "progress_bar_current_percentage": 100,
    "progress_bar_message": "Analysis complete!"
  }
}
```
````

### Operation Interruption

Progress update when operations need to be restarted or have encountered issues.

**Assistant Output**

````markdown
I'm updating the progress bar to show the current status and next steps:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000005-status-update",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "chatmessage-0000001-content-02-backup-progress",
    "progress_bar_current_percentage": 73,
    "progress_bar_message": "Restarting backup process..."
  }
}
```
````

### AI Assistant Scanning

example interface multi-stage assistant scanning with platform-specific progress indicators.

**Assistant Output**

````markdown
I'm updating the AI scanning progress to show which assistant is currently being queried:

**Action Payload**

```json
{
  "action_id": "example-update-scanning-progress-claude",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "example-scanning-001-content-02-progress",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 50,
    "progress_bar_current_animation_duration_ms": 1400,
    "progress_bar_next_goal_delay_ms": 400,
    "progress_bar_next_goal_percentage": 75,
    "progress_bar_next_goal_animation_duration_ms": 1100,
    "progress_bar_message": "Gathering from Claude...",
    "progress_bar_icon": "progress-bar-icon-claude"
  }
}
```
````

### Progress Bar Visibility Control

Revealing a previously hidden progress bar when ready to show progress to user.

**Assistant Output**

````markdown
Now I'll show you the background analysis progress:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000008-reveal-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "background-analysis-progress",
    "progress_bar_visibility": "VISIBLE",
    "progress_bar_current_percentage": 65,
    "progress_bar_message": "Generating insights..."
  }
}
```
````

### Deep Website Scanning

example interface comprehensive website analysis with detailed extraction progress.

**Assistant Output**

````markdown
I'm updating the website scanning progress to show detailed extraction status:

**Action Payload**

```json
{
  "action_id": "example-update-firecrawl-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "example-refinement-002-content-02-progress",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 65,
    "progress_bar_next_goal_percentage": 85,
    "progress_bar_message": "Deep-scanning website...",
    "progress_bar_icon": "progress-bar-icon-web"
  }
}
```
````

### Workspace Publishing

example interface workspace publishing with search engine submission and indexing progress.

**Assistant Output**

````markdown
I'm updating the publishing progress to show search engine submission status:

**Action Payload**

```json
{
  "action_id": "example-update-publishing-progress",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "example-publishing-001-content-02-progress",
    "progress_bar_state": "IN_PROGRESS",
    "progress_bar_current_percentage": 90,
    "progress_bar_next_goal_percentage": 100,
    "progress_bar_message": "Submitting for indexing...",
    "progress_bar_icon": "progress-bar-icon-google-search"
  }
}
```
````

### Scanning Complete

example interface final scanning completion with workspace compilation readiness.

**Assistant Output**

````markdown
I'm updating the progress bar to show completed scanning and workspace compilation status:

**Action Payload**

```json
{
  "action_id": "example-complete-scanning",
  "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
  "action_data": {
    "target": "CHAT",
    "progress_bar_content_id": "example-scanning-001-content-02-progress",
    "progress_bar_state": "COMPLETED",
    "progress_bar_current_percentage": 100,
    "progress_bar_message": "Compiling workspace..."
  }
}
```
````

---

## Progress States

- **`IN_PROGRESS`**: Operation is actively running (default state)
- **`COMPLETED`**: Operation finished successfully

---

## Implementation Guidelines

### Progressive Updates

- Use regular progress updates with meaningful percentage increments (typically 5-10%)
- Provide descriptive text about current operations
- Include specific details like file sizes, transfer rates, and completion estimates

### File Operations

- Track file operations with detailed progress including file sizes and transfer rates
- Use milestone percentages for key completion points
- Provide clear failure recovery information when errors occur

### Multi-Step Processes

- Show progress through complex workflows with step indicators
- Use clear descriptions of current activities and next steps
- Include estimated completion times when possible

### State Transitions

- Handle completion, error, and pause states with appropriate visual indicators
- Provide clear success messaging with positive reinforcement
- Include specific error information and recovery guidance

---

## Best Practices

### Progress Communication

- Provide clear, descriptive text about current operations
- Include specific details like file sizes, step numbers, or time estimates
- Use appropriate progress states to convey status accurately

### Update Frequency

- Update progress at meaningful intervals (avoid excessive updates)
- Provide significant progress increments (typically 5-10% jumps)
- Always update on state changes (completion, error, pause)

### User Experience

- Keep progress text informative and user-friendly
- Use visual indicators (states and emojis) to convey status
- Provide context about what's happening and expected duration

### Error Handling

- Update to error states immediately when problems occur
- Include specific error information in progress messages
- Maintain progress value to show completion level before failure

### Performance

- Batch progress updates when possible to reduce system load
- Use efficient update intervals to balance feedback and performance
- Minimize unnecessary re-renders with smart state management
