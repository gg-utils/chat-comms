---
description: "Simplified usage examples for CHAT_CONTENT_BUTTON in the communication protocol. Focused on essential patterns and example interface use cases with consolidated examples and button styles. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_CONTENT_BUTTON Specification](../type-specifications/CHAT_CONTENT_BUTTON.md)**

# CHAT_CONTENT_BUTTON Usage Examples

Interactive buttons provide direct action triggers within chat messages, enabling users to perform operations, navigate to canvas views, or confirm decisions. Essential for a sample workflow's conversion workflows and user engagement.

## Core Implementation

### Basic Button Payload

**Content Payload**

```json
{
  "content_id": "button-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "Action Text",
    "button_icon": "icon-name",
    "button_style": "BUTTON_STYLE_PRIMARY",
    "button_state": "ENABLED",
    "button_actions": [
      {
        "action_id": "unique-action-id",
        "action_type": "ACTION_TYPE",
        "action_data": {
          /* Action-specific data */
        }
      }
    ]
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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Ready to proceed?"
      }
    },
    {
      "content_id": "action-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        /* Button configuration */
      }
    }
  ]
}
```

---

## Button Styles & States

### Style Examples

```json
// Primary Action (Main CTA)
{
  "button_text": "Continue",
  "button_style": "BUTTON_STYLE_PRIMARY",
  "button_actions": [/* Primary action */]
}

// Secondary Action (Alternative)
{
  "button_text": "Cancel",
  "button_style": "BUTTON_STYLE_SECONDARY",
  "button_actions": [/* Secondary action */]
}

// Success Action (Positive)
{
  "button_text": "Confirm",
  "button_style": "BUTTON_STYLE_SUCCESS",
  "button_icon": "check-circle",
  "button_actions": [/* Confirmation action */]
}

// Danger Action (Destructive)
{
  "button_text": "Delete",
  "button_style": "BUTTON_STYLE_DANGER",
  "button_icon": "trash",
  "button_actions": [/* Destructive action */]
}
```

### State Management

- **ENABLED**: Interactive and ready for user action
- **DISABLED**: Visible but not interactive (during processing)
- **LOADING**: Shows progress or waiting state

---

## Essential Examples

### Simple Confirmation

Basic yes/no decisions or process continuation for straightforward user interactions.

**Assistant Output**

````markdown
I'll provide a simple confirmation button to continue with the process:

**Content Payload**

```json
{
  "content_id": "continue-button",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "Continue",
    "button_style": "BUTTON_STYLE_PRIMARY",
    "button_state": "ENABLED",
    "button_actions": [
      {
        "action_id": "continue-action",
        "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
        "action_data": {
          "target": "CHAT",
          "role": "USER",
          "text": "Continue with the process"
        }
      }
    ]
  }
}
```
````

### Canvas Opening

Accessing detailed views, dashboards, or analysis results through canvas interface.

**Content Payload**

```json
{
  "content_id": "dashboard-button",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "Open Dashboard",
    "button_icon": "dashboard",
    "button_style": "BUTTON_STYLE_PRIMARY",
    "button_state": "ENABLED",
    "button_actions": [
      {
        "action_id": "open-dashboard",
        "action_type": "CANVAS_ACTION_OPEN",
        "action_data": {
          "target": "CANVAS",
          "canvas_id": "dashboard-001",
          "canvas_title_label": "Project Dashboard",
          "canvas_initial_contents": [
            {
              "content_id": "dashboard-content",
              "content_queue": "main",
              "content_type": "CANVAS_CONTENT_MARKDOWN",
              "content_data": {
                "markdown": "# Dashboard\n\nLoading your data..."
              }
            }
          ]
        }
      }
    ]
  }
}
```

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "dashboard-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Open Dashboard",
        "button_icon": "dashboard",
        "button_style": "BUTTON_STYLE_PRIMARY",
        "button_state": "ENABLED",
        "button_actions": [
          {
            "action_id": "open-dashboard",
            "action_type": "CANVAS_ACTION_OPEN",
            "action_data": {
              "target": "CANVAS",
              "canvas_id": "dashboard-001",
              "canvas_title_label": "Project Dashboard",
              "canvas_title_href": "https://example.com/dashboard",
              "canvas_initial_contents": [
                {
                  "content_id": "dashboard-content",
                  "content_queue": "main",
                  "content_type": "CANVAS_CONTENT_MARKDOWN",
                  "content_data": {
                    "markdown": "# Dashboard\n\nLoading your data..."
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll create a button to open the dashboard in a canvas view, providing users with detailed analytics in a dedicated workspace applicable to example interface dashboard functionality.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "dashboard-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Open Dashboard",
        "button_icon": "dashboard",
        "button_style": "BUTTON_STYLE_PRIMARY",
        "button_state": "ENABLED",
        "button_actions": [
          {
            "action_id": "open-dashboard",
            "action_type": "CANVAS_ACTION_OPEN",
            "action_data": {
              "target": "CANVAS",
              "canvas_id": "dashboard-001",
              "canvas_title_label": "Project Dashboard",
              "canvas_title_href": "https://example.com/dashboard",
              "canvas_initial_contents": [
                {
                  "content_id": "dashboard-content",
                  "content_queue": "main",
                  "content_type": "CANVAS_CONTENT_MARKDOWN",
                  "content_data": {
                    "markdown": "# Dashboard\n\nLoading your data..."
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```
````

### Multi-Action Button

Performing multiple related operations simultaneously with coordinated actions.

**Assistant Output**

````markdown
I'll create a button that starts a process and opens monitoring interface:

**Content Payload**

```json
{
  "content_id": "start-process-button",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "Start Process",
    "button_icon": "play-circle",
    "button_style": "BUTTON_STYLE_SUCCESS",
    "button_state": "ENABLED",
    "button_actions": [
      {
        "action_id": "send-confirmation",
        "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
        "action_data": {
          "target": "CHAT",
          "role": "USER",
          "text": "Starting automated process..."
        }
      },
      {
        "action_id": "open-monitor",
        "action_type": "CANVAS_ACTION_OPEN",
        "action_data": {
          "target": "CANVAS",
          "canvas_id": "monitor-001",
          "canvas_title_label": "Process Monitor",
          "canvas_initial_contents": [
            {
              "content_id": "monitor-status",
              "content_queue": "main",
              "content_type": "CANVAS_CONTENT_MARKDOWN",
              "content_data": {
                "markdown": "## Process Status\n\n⏳ Initializing..."
              }
            }
          ]
        }
      }
    ]
  }
}
```
````

### Workspace Creation CTA

Converting users after showing current workspace analysis with compelling call-to-action.

**Assistant Output**

````markdown
I'll create a conversion button for workspace creation after showing analysis results:

**Message Payload**

```json
{
  "message_id": "example-workspace-creation",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "workspace-issues-summary",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "As you can see, your current workspace has **critical issues**:\n\n❌ **Vague descriptions**\n❌ **Missing contact info**\n❌ **Inconsistent naming**\n❌ **No service details**\n\n**Good news:** I can fix all these issues with a prepared workspace. Ready? 🚀"
      }
    },
    {
      "content_id": "create-workspace-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Create My Refined workspace",
        "button_icon": "rocket",
        "button_style": "BUTTON_STYLE_PRIMARY",
        "button_state": "ENABLED",
        "button_actions": [
          {
            "action_id": "start-refinement",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "Yes! Create my prepared workspace - let's start the transformation!"
            }
          }
        ]
      }
    }
  ]
}
```
````

### Workspace Claim & Publish

Final conversion step after workspace refinement completion with authentication trigger.

**Assistant Output**

````markdown
I'll create the final conversion button for claiming and publishing the prepared workspace:

**Message Payload**

```json
{
  "message_id": "example-claim-workspace",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "workspace-ready",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Your workspace is Ready to Publish!**\n\n**What happens next:**\n✅ **Claim ownership** with Google Sign-In\n✅ **Review and approve** final version\n✅ **Publish instantly** to public URL\n✅ **Submit to search engines** for indexing\n\n**Ready to claim your workspace and go live?**"
      }
    },
    {
      "content_id": "claim-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "🔐 Claim & Publish Workspace",
        "button_icon": "shield-check",
        "button_style": "BUTTON_STYLE_SUCCESS",
        "button_state": "ENABLED",
        "button_actions": [
          {
            "action_id": "start-auth-flow",
            "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
            "action_data": {
              "preference_key": "auth_flow_trigger",
              "preference_value": "google_signin_for_claim",
              "preference_context": "example_workspace_claim"
            }
          }
        ]
      }
    }
  ]
}
```
````

### Canvas Workspace View

Allowing users to review current or prepared workspaces in detailed canvas interface.

**Assistant Output**

````markdown
I'll create a button to view the current workspace in a detailed canvas view:

**Content Payload**

```json
{
  "content_id": "view-workspace-button",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "📄 View Current workspace",
    "button_icon": "document-text",
    "button_style": "BUTTON_STYLE_SECONDARY",
    "button_state": "ENABLED",
    "button_actions": [
      {
        "action_id": "open-workspace-canvas",
        "action_type": "CANVAS_ACTION_OPEN",
        "action_data": {
          "target": "CANVAS",
          "canvas_id": "current-ai-workspace-001",
          "canvas_title_label": "What AI Currently Sees",
          "canvas_initial_contents": [
            {
              "content_id": "workspace-analysis",
              "content_queue": "main",
              "content_type": "CANVAS_CONTENT_MARKDOWN",
              "content_data": {
                "markdown": "# What AI Currently Sees\n\n## Your Organization Name\n\n*Generated from basic AI knowledge*\n\n---\n\n## Issues Identified\n\n❌ **Inconsistent descriptions**\n❌ **Missing contact information**\n❌ **No clear service offerings**\n❌ **Outdated website data**"
              }
            }
          ]
        }
      }
    ]
  }
}
```
````

---

## Implementation Guidelines

### Best Practices

1. **Clear Action Text**: Use action-oriented language that clearly indicates what will happen
2. **Appropriate Icons**: Include relevant icons to improve visual clarity and usability
3. **Style Consistency**: Choose styles based on action importance and user flow context
4. **State Management**: Update button states during processing to provide user feedback

### Action Types Compatibility

**Common button actions:**

- `CHAT_ACTION_SEND_TEXT_MESSAGE` - User input simulation
- `CANVAS_ACTION_OPEN` - Opening detailed views
- `APP_ACTION_USER_PREFERENCE_UPDATE` - Triggering app behaviors
- Multi-action combinations for complex workflows

### Example Interface Patterns

**Conversion Workflow Integration:**

1. **Analysis Reveal** → Workspace view buttons for transparency
2. **Problem Identification** → Primary CTA for solution
3. **Workspace Creation** → Success buttons for completion
4. **Claim & Publish** → Authentication and final conversion

**UX Considerations:**

- Use PRIMARY style for main conversion actions
- Use SECONDARY for supplementary actions (view, cancel)
- Use SUCCESS for completion and confirmation actions
- Provide immediate feedback through state changes

### Development Notes

- Buttons execute all actions simultaneously when clicked
- Failed actions should not prevent other actions from executing
- Always provide visual feedback for successful button interactions
- Consider accessibility requirements for button text and colors
- Test button behavior across different devices and screen sizes
