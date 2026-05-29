---
description: "Usage examples for CHAT_CONTENT_ACTION_WRAPPER in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples for embedding actions within chat message content, providing a structured approach to trigger UI updates, canvas operations, and other system behaviors. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_CONTENT_ACTION_WRAPPER Specification](../type-specifications/CHAT_CONTENT_ACTION_WRAPPER.md)**

# CHAT_CONTENT_ACTION_WRAPPER Usage Examples

This content type enables embedding actions within chat message content, providing a structured approach to trigger UI updates, canvas operations, and other system behaviors automatically when messages are processed.

## Core Implementation

### Basic Action Wrapper

**Content Payload**

```json
{
  "content_id": "action-wrapper-{id}",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
  "content_data": {
    "action": {
      "action_id": "unique-action-id",
      "action_type": "ACTION_TYPE",
      "action_data": {
        /* Action-specific data */
      }
    }
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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Context for the action:"
      }
    },
    {
      "content_id": "action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* Action configuration */
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Progress Bar Update

Real-time progress updates during scanning or processing operations.

**Assistant Output**

````markdown
I'm updating the progress of your current operation. The progress bar will show the new completion percentage:

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "progress-update-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Processing your request..."
      }
    },
    {
      "content_id": "progress-update-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-progress",
          "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
          "action_data": {
            "target": "CHAT",
            "progress_bar_content_id": "scanning-progress-bar",
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 30,
            "progress_bar_current_animation_duration_ms": 1100,
            "progress_bar_next_goal_delay_ms": 250,
            "progress_bar_next_goal_percentage": 55,
            "progress_bar_next_goal_animation_duration_ms": 1400,
            "progress_bar_message": "Gathering information..."
          }
        }
      }
    }
  ]
}
```
````

### Canvas Opening

Opening analysis results or workspace views with detailed information displays.

**Assistant Output**

````markdown
I'm opening a detailed analysis canvas for you to review the complete results:

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "canvas-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Analysis complete! Opening detailed results view..."
      }
    },
    {
      "content_id": "canvas-open-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-results-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "results-001",
            "canvas_title_label": "Analysis Results",
            "canvas_title_href": "https://example.com/results",
            "canvas_initial_contents": [
              {
                "content_id": "results-summary",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# Analysis Complete\n\nProcessing finished successfully."
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```
````

### UI State Update

Updating button states or other UI elements to reflect current operation status.

**Assistant Output**

````markdown
I'm updating the button state to show that processing is in progress:

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "ui-update-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Starting the process..."
      }
    },
    {
      "content_id": "ui-update-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "disable-button",
          "action_type": "CHAT_ACTION_UPDATE_BUTTON",
          "action_data": {
            "target": "CHAT",
            "button_content_id": "process-button",
            "button_state": "DISABLED",
            "button_text": "Processing..."
          }
        }
      }
    }
  ]
}
```
````

### Workspace Analysis Reveal

example interface opening current workspace analysis after scanning completion to show identified issues.

**Assistant Output**

````markdown
I've completed scanning ChatGPT, Claude, and Gemini. Here's what AI currently sees about your organization - notice the critical gaps that need refinement:

**Message Payload**

```json
{
  "message_id": "example-analysis-reveal",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "analysis-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 📊 Analysis Complete!\n\nI've scanned ChatGPT, Claude, and Gemini. Here's what AI currently sees about **Your Organization**.\n\n⚠️ **Notice the gaps** - this is why you need workspace refinement."
      }
    },
    {
      "content_id": "workspace-canvas-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-current-workspace",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "current-ai-workspace-001",
            "canvas_title_label": "What AI Currently Sees",
            "canvas_icon": "eye",
            "canvas_initial_contents": [
              {
                "content_id": "workspace-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# What AI Currently Sees\n\n## Your Organization Name\n\n*Generated from basic AI knowledge*\n\n---"
                }
              },
              {
                "content_id": "workspace-issues",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "## Issues Identified\n\n❌ **Inconsistent descriptions**\n❌ **Missing contact info**\n❌ **Unclear services**\n❌ **Outdated data**"
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```
````

### Real-time Scanning Progress

example interface updating progress during multi-AI scanning workflow to show current AI being processed.

**Assistant Output**

````markdown
I'm currently scanning AI platforms for your organization information. The progress bar shows which assistant is being queried:

**Message Payload**

```json
{
  "message_id": "example-scanning-progress",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "progress-status",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Scanning AI platforms for your organization information..."
      }
    },
    {
      "content_id": "scanning-progress-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-scanning-progress",
          "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
          "action_data": {
            "target": "CHAT",
            "progress_bar_content_id": "ai-scanning-progress",
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 75,
            "progress_bar_current_animation_duration_ms": 900,
            "progress_bar_next_goal_delay_ms": 200,
            "progress_bar_next_goal_percentage": 100,
            "progress_bar_next_goal_animation_duration_ms": 600,
            "progress_bar_message": "Scanning Gemini..."
          }
        }
      }
    }
  ]
}
```
````

### Prepared Workspace Reveal

example interface revealing the prepared workspace after completion with transformation from basic to professional format.

**Assistant Output**

````markdown
Workspace refinement is complete! I'm now updating your workspace display to show the transformed, professional version:

**Message Payload**

```json
{
  "message_id": "example-workspace-refined",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "refinement-complete",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "🚀 **Workspace refinement complete!** Your organization now has a professional AI presence."
      }
    },
    {
      "content_id": "reveal-refined-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "reveal-refined-workspace",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "current-ai-workspace-001",
            "canvas_title_label": "🚀 Your Refined workspace",
            "canvas_state": "SUCCESS",
            "canvas_icon": "sparkles",
            "canvas_new_contents": [
              {
                "content_id": "refined-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# 🚀 Your Refined workspace\n\n## Your Organization Name\n\n*Professional AI-prepared workspace*\n\n---"
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```
````

---

## Implementation Guidelines

### Best Practices

- **Single Responsibility**: Each action wrapper should contain exactly one action
- **Unique IDs**: Always use unique action_id values to prevent conflicts
- **Clear Context**: Provide meaningful context in surrounding markdown content
- **Error Handling**: Include fallback content when actions might fail

### Action Types Compatibility

**Commonly wrapped actions:**

- `CHAT_ACTION_UPDATE_PROGRESS_BAR` - Progress updates
- `CANVAS_ACTION_OPEN` - Canvas operations
- `CANVAS_ACTION_UPDATE` - Canvas modifications
- `CHAT_ACTION_UPDATE_BUTTON` - UI state changes

### Example Interface Patterns

**Workflow Integration:**

1. Scanning progress updates during analysis
2. Canvas reveals for current vs. prepared artifacts
3. Real-time UI updates during generation
4. State management for workflow progression

### Performance Considerations

- Embed actions only when immediate execution is required
- Use action wrappers for time-sensitive updates
- Consider user experience impact of automatic actions
- Test action execution timing in production scenarios

### Development Notes

- Action wrappers execute immediately when the message is processed
- Failed actions should not break the overall message flow
- Always provide user feedback for successful action execution
- Consider accessibility when triggering automatic UI changes

---

## Best Practices

### Action Wrapper Design

- Keep action wrappers focused on single, specific operations
- Use descriptive action IDs that clearly indicate purpose
- Provide context through surrounding markdown content
- Handle action failures gracefully without disrupting message flow

### User Experience

- Use action wrappers for operations that enhance user experience
- Avoid overusing automatic actions that might confuse users
- Provide clear feedback when actions are executed
- Consider timing and sequence of multiple actions

### Performance

- Execute actions efficiently to minimize response delays
- Use action wrappers sparingly to avoid overwhelming the system
- Test action execution across different devices and network conditions
- Monitor action success rates and handle failures appropriately
