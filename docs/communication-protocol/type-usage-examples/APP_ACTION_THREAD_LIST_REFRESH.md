---
description: "Usage examples for APP_ACTION_THREAD_LIST_REFRESH type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [APP_ACTION_THREAD_LIST_REFRESH Specification](../type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md)**

# APP_ACTION_THREAD_LIST_REFRESH Usage Examples

This document contains practical usage examples for the `APP_ACTION_THREAD_LIST_REFRESH` action type, demonstrating conversation list refresh scenarios.

## Core Implementation

All thread list refresh actions use the same structure:

**Action Payload**

```json
{
  "action_id": "refresh-threads-{context}",
  "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
  "action_data": {
    "target": "APP"
  }
}
```

---

## Essential Examples

### User-Initiated Refresh

This example demonstrates a refresh triggered by direct user interaction, such as clicking a refresh button or performing a pull-to-refresh gesture, providing immediate feedback and updating the conversation list.

**Assistant Output**

````markdown
I'll refresh your conversation list to show the latest updates. This immediate refresh ensures you see all recent conversations and any changes that may have occurred since your last view.

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
        "markdown": "I'll refresh your conversation list to show the latest updates."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "ui-initiated-001-refresh-threads",
          "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
          "action_data": {
            "target": "APP"
          }
        }
      }
    }
  ]
}
```
````

### System-Initiated Refresh

This example shows an automatic refresh that occurs after data synchronization or system updates, ensuring the conversation list reflects the current state without requiring user intervention.

**Assistant Output**

````markdown
After synchronizing your data with the server, I'm automatically refreshing the conversation list to ensure everything is up to date. This prevents any discrepancies between your local view and the server state.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've synchronized your data with the server. Let me refresh the conversation list to ensure everything is up to date."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "system-initiated-sync-threads-001",
          "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
          "action_data": {
            "target": "APP"
          }
        }
      }
    }
  ]
}
```
````

### Authentication State Refresh

This example demonstrates refreshing the thread list after authentication changes, ensuring the user sees conversations appropriate to their current access level and permissions.

**Assistant Output**

````markdown
Following your successful authentication, I'm refreshing the conversation list to show all conversations available to your account. This ensures you have access to both personal and shared conversations based on your permissions.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-auth-complete",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Authentication successful! I'm now refreshing your conversation list to show all available conversations for your account."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "auth-state-refresh-threads",
          "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
          "action_data": {
            "target": "APP"
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

- Pull-to-refresh gestures
- Refresh button clicks
- Menu selections

### Automatic Triggers

- After data synchronization
- Following significant system updates
- During error recovery scenarios
- When returning from background

### Legacy Support

`APP_ACTION_THREAD_LIST_REFRESH` is the canonical action type. The historical pluralized alias should not be used in new protocol examples.

## Example Interface Integration

In a sample workflow's workspace setup workflow, thread list refreshes typically occur after:

- Workspace publishing completion
- Authentication state changes
- Switching between different workspaces
- Returning from canvas-based workspace editing

## Implementation Notes

- The `target` field must always be `"APP"` for thread refresh actions
- Refresh operations should handle loading states appropriately
- Consider rate limiting for user-initiated refreshes
- Provide visual feedback during refresh operations
