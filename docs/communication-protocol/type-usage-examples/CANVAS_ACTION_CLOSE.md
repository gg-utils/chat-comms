---
description: "Usage examples for CANVAS_ACTION_CLOSE type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CANVAS_ACTION_CLOSE Specification](../type-specifications/CANVAS_ACTION_CLOSE.md)**

# CANVAS_ACTION_CLOSE Usage Examples

This document contains practical usage examples for the `CANVAS_ACTION_CLOSE` action type, demonstrating canvas dismissal scenarios with focus on example interface integration.

## Core Implementation

All canvas close actions use the same structure:

**Action Payload**

```json
{
  "action_id": "close-canvas-{context}",
  "action_type": "CANVAS_ACTION_CLOSE",
  "action_data": {
    "target": "CANVAS",
    "canvas_id": "{canvas_id}"
  }
}
```

---

## Essential Examples

### User-Initiated Canvas Close

This example demonstrates closing a canvas after user interaction, providing confirmation and ensuring the user understands the action has been completed successfully.

**Assistant Output**

````markdown
I've closed the canvas for you. You can now continue with the main conversation, and the canvas information has been saved to your session. You can always open it again later if needed.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've closed the canvas for you. You can now continue with the main conversation."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "user-initiated-canvas-close-001",
          "action_type": "CANVAS_ACTION_CLOSE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "canvas-document-001"
          }
        }
      }
    }
  ]
}
```
````

### Completion-Based Canvas Close

This example shows closing a canvas after a workflow has been completed, providing clear feedback about the successful completion and next steps.

**Assistant Output**

````markdown
Perfect! I've completed the document review and saved all changes. The canvas is now closing automatically since our work is finished. The updated document has been saved to your project, and you can find it in your files whenever you need it.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-completion",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Perfect! I've completed the document review and saved all changes. The canvas is now closing automatically since our work is finished."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "completion-based-canvas-close-002",
          "action_type": "CANVAS_ACTION_CLOSE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "canvas-document-review-002"
          }
        }
      }
    }
  ]
}
```
````

### Error Recovery Canvas Close

This example demonstrates closing a canvas when an error occurs, providing clear communication about the issue and ensuring the user can continue with their workflow.

**Assistant Output**

````markdown
I encountered an issue while processing the canvas content, so I'm closing it to prevent any further complications. Don't worry - your progress has been saved, and we can try again with a fresh canvas if needed. The main conversation is still available for any questions or assistance.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-error-explanation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I encountered an issue while processing the canvas content, so I'm closing it to prevent any further complications. Don't worry - your progress has been saved."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "error-recovery-canvas-close-003",
          "action_type": "CANVAS_ACTION_CLOSE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "canvas-processing-error-003"
          }
        }
      }
    }
  ]
}
```
````

---

## Example Interface Examples

### a sample interface Workspace Review Completion

This example demonstrates closing the canvas after completing a a sample workspace review, providing clear feedback about the refinement process completion and next steps for publishing.

**Assistant Output**

````markdown
Excellent! I've completed the comprehensive review of your workspace. The canvas is now closing as all refinement recommendations have been applied. Your workspace is now ready for publishing and will dramatically improve how assistants respond to questions about your organization.

**Message Payload**

```json
{
  "message_id": "example-workspace-review-complete-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-workspace-review-complete-001-content-01-completion",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## ✅ **Workspace Review Complete!**\n\nI've completed the comprehensive review of your workspace. All refinement recommendations have been applied, and your workspace is now ready for publishing.\n\n**What's been refined:**\n- ✅ SEO keywords and phrases\n- ✅ assistant response accuracy\n- ✅ Organization description clarity\n- ✅ Contact information formatting\n- ✅ Service offerings structure\n\n**Next step:** Ready to publish your prepared workspace!"
      }
    },
    {
      "content_id": "example-workspace-review-complete-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-close-workspace-review-canvas",
          "action_type": "CANVAS_ACTION_CLOSE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-workspace-review-canvas-001"
          }
        }
      }
    }
  ]
}
```
````

### Sample interface analytics Dashboard Close

This example shows closing a sample interface analytics canvas after the user has finished reviewing their workflow quality metrics, providing a summary of insights and offering continued support.

**Assistant Output**

````markdown
I've closed the analytics dashboard as you've reviewed all your workflow quality metrics. The insights show strong performance across major assistant clients, with your workspace generating accurate responses about your organization. I'm here to help with any questions about the data or next steps for refinement.

**Message Payload**

```json
{
  "message_id": "example-analytics-close-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-analytics-close-001-content-01-summary",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've closed the analytics dashboard as you've reviewed all your workflow quality metrics. Your workspace shows strong performance across major assistant clients."
      }
    },
    {
      "content_id": "example-analytics-close-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-close-analytics-canvas",
          "action_type": "CANVAS_ACTION_CLOSE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-analytics-dashboard-001"
          }
        }
      }
    }
  ]
}
```
````

---

## Common Use Cases

### Interactive Triggers

- User clicks close button or back navigation
- User completes a workflow or task
- User switches to a different activity

### Automatic Triggers

- Workflow completion
- Error recovery scenarios
- Time-based session expiration
- System-initiated cleanup

### Context Management

- Session preservation
- State saving before closure
- Clean resource management
- Graceful degradation

## Implementation Guidelines

### Canvas ID Management

- Use descriptive, unique canvas IDs
- Include context information in ID naming
- Ensure ID consistency across open/close actions
- Implement proper ID validation

### User Experience

- Provide clear feedback about closure
- Confirm completion of pending actions
- Offer recovery options when appropriate
- Maintain conversation flow continuity

### Error Handling

- Graceful degradation on close failures
- Clear error messaging to users
- Automatic retry mechanisms where appropriate
- Fallback to main conversation interface

### a sample interface Integration Points

- **Workspace Review**: Close after refinement completion
- **Analytics Dashboard**: Close after metrics review
- **Content Generation**: Close after content creation
- **Configuration Panels**: Close after settings updates

## Best Practices

- Always provide context about why the canvas is closing
- Confirm any important actions were completed
- Offer alternative ways to access the same functionality
- Maintain conversation continuity after closure
- Use appropriate canvas IDs for tracking and debugging
