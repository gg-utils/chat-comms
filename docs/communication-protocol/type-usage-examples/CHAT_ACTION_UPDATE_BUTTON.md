---
description: "Usage examples for CHAT_ACTION_UPDATE_BUTTON in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for dynamically updating existing button content within chat messages to provide interactive evolving experiences. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_UPDATE_BUTTON Specification](../type-specifications/CHAT_ACTION_UPDATE_BUTTON.md)**

# CHAT_ACTION_UPDATE_BUTTON Usage Examples

This action type dynamically updates existing button content within chat messages, enabling real-time modification of button properties including text, style, state, icons, and actions.

## Core Implementation

### Basic Update Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-{action-identifier}",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "existing-button-content-id",
    "button_updates": {
      "button_text": "new text",
      "button_style": "BUTTON_STYLE_PRIMARY|BUTTON_STYLE_SECONDARY|BUTTON_STYLE_DANGER|BUTTON_STYLE_SUCCESS|BUTTON_STYLE_WARNING",
      "button_state": "ENABLED|DISABLED|LOADING",
      "button_icon": "icon-name",
      "button_actions": [
        /* new actions array */
      ]
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
      "content_id": "chatmessage-{id}-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'll update the button to reflect the new status..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_UPDATE_BUTTON payload */
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Basic Text and Style Update

Simple content changes and visual updates for completed operations.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-update-text",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "chatmessage-0000001-content-02-action-button",
    "button_updates": {
      "button_text": "Processing Complete ✅",
      "button_style": "BUTTON_STYLE_SUCCESS",
      "button_icon": "check-circle"
    }
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
      "content_id": "chatmessage-0000001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Processing completed successfully! I'm updating the button to reflect this."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-update-text",
          "action_type": "CHAT_ACTION_UPDATE_BUTTON",
          "action_data": {
            "target": "CHAT",
            "button_content_id": "chatmessage-0000001-content-02-action-button",
            "button_updates": {
              "button_text": "Processing Complete ✅",
              "button_style": "BUTTON_STYLE_SUCCESS",
              "button_icon": "check-circle"
            }
          }
        }
      }
    }
  ]
}
```

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'm updating the button to show successful completion with appropriate styling, providing clear visual feedback to the user that the operation completed successfully, applicable to example interface workflow confirmations.

_Message to be processed by the UI_

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
        "markdown": "Processing completed successfully! I'm updating the button to reflect this."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-update-text",
          "action_type": "CHAT_ACTION_UPDATE_BUTTON",
          "action_data": {
            "target": "CHAT",
            "button_content_id": "chatmessage-0000001-content-02-action-button",
            "button_updates": {
              "button_text": "Processing Complete ✅",
              "button_style": "BUTTON_STYLE_SUCCESS",
              "button_icon": "check-circle"
            }
          }
        }
      }
    }
  ]
}
```
````

### Loading State Management

Setting button to loading state during processing operations.

**Assistant Output**

````markdown
I'm updating the button to show loading state while processing:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000002-set-loading",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "chatmessage-0000001-content-02-action-button",
    "button_updates": {
      "button_text": "Processing...",
      "button_state": "LOADING",
      "button_icon": "spinner"
    }
  }
}
```
````

### Error State with Retry

Error handling with retry functionality and updated button actions.

**Assistant Output**

````markdown
I'm updating the button to show error state and provide retry functionality:

**Action Payload**

```json
{
  "action_id": "chatmessage-0000003-set-error",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "chatmessage-0000001-content-02-process-button",
    "button_updates": {
      "button_text": "Retry Processing",
      "button_style": "BUTTON_STYLE_DANGER",
      "button_state": "ENABLED",
      "button_icon": "refresh",
      "button_actions": [
        {
          "action_id": "chatmessage-0000003-retry-process",
          "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
          "action_data": {
            "target": "CHAT",
            "role": "USER",
            "text": "Retry data processing after connection error"
          }
        }
      ]
    }
  }
}
```
````

### Workspace Refinement Starting

example interface workspace refinement workflow button state when starting refinement.

**Assistant Output**

````markdown
I'm updating the button to show refinement is starting and set loading state:

**Action Payload**

```json
{
  "action_id": "example-update-refinement-button",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "example-cta-001-content-02-main-button",
    "button_updates": {
      "button_text": "🚀 Optimizing Your Workspace...",
      "button_state": "LOADING",
      "button_style": "BUTTON_STYLE_PRIMARY",
      "button_icon": "spinner"
    }
  }
}
```
````

### Workspace Publishing Success

example interface successful workspace publishing with new action for viewing live workspace.

**Assistant Output**

````markdown
I'm updating the button to show successful publishing and provide access to live workspace:

**Action Payload**

```json
{
  "action_id": "example-update-publishing-success-button",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "example-publish-001-content-02-publish-button",
    "button_updates": {
      "button_text": "🎉 Workspace Published Successfully!",
      "button_state": "ENABLED",
      "button_style": "BUTTON_STYLE_SUCCESS",
      "button_icon": "check-circle",
      "button_actions": [
        {
          "action_id": "example-view-live-workspace",
          "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
          "action_data": {
            "preference_key": "external_link",
            "preference_value": "https://example.com/thehub-digital-london"
          }
        }
      ]
    }
  }
}
```
````

### Dashboard Access Update

example interface complex state transitions with new actions for management dashboard access.

**Assistant Output**

````markdown
I'm updating the button to provide dashboard access with canvas opening functionality:

**Action Payload**

```json
{
  "action_id": "example-update-dashboard-button",
  "action_type": "CHAT_ACTION_UPDATE_BUTTON",
  "action_data": {
    "target": "CHAT",
    "button_content_id": "example-management-001-content-02-dashboard-button",
    "button_updates": {
      "button_text": "📊 Open Management Dashboard",
      "button_state": "ENABLED",
      "button_style": "BUTTON_STYLE_SECONDARY",
      "button_icon": "dashboard",
      "button_actions": [
        {
          "action_id": "example-open-dashboard-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-dashboard-001",
            "canvas_title_label": "Workspace Management Dashboard",
            "canvas_title_href": "https://example.com/dashboard",
            "canvas_state": "DEFAULT"
          }
        }
      ]
    }
  }
}
```
````

---

## Button States and Styles

### States

- **`ENABLED`**: Interactive and clickable
- **`DISABLED`**: Not interactive, grayed out
- **`LOADING`**: Shows loading indicator, not clickable

### Styles

- **`PRIMARY`**: Main call-to-action, prominent color
- **`SECONDARY`**: Supporting action, muted appearance
- **`DANGER`**: Warning/destructive actions, typically red
- **`SUCCESS`**: Positive actions, typically green
- **`WARNING`**: Caution actions, typically yellow/orange

---

## Implementation Guidelines

### Process Status Updates

- Update buttons to reflect current operation state
- Provide visual feedback about loading, completion, or error states
- Use appropriate icons and colors to convey meaning

### Dynamic Action Changes

- Update button actions based on context changes
- Allow the same button to serve different purposes as workflows progress
- Maintain logical flow between button state transitions

### Error Recovery

- Transform buttons into retry mechanisms when errors occur
- Provide clear paths for users to recover from failures
- Include descriptive error messaging in button text

### Workflow Progression

- Update buttons to reflect the next appropriate action
- Guide users through multi-step workflows with clear progression
- Maintain consistency in button behavior and styling

---

## Best Practices

### State Management

- Always update button state to match current process status
- Use loading states for time-consuming operations
- Provide clear visual indicators for success and error states

### User Experience

- Make button text descriptive and action-oriented
- Use appropriate colors and icons to convey meaning
- Disable buttons when actions are not available

### Action Updates

- Update button actions to match current context
- Provide meaningful fallback actions for error scenarios
- Chain actions logically to guide users through workflows

### Performance

- Update only necessary properties to minimize UI reflow
- Batch multiple updates when possible
- Use consistent timing for state transitions
