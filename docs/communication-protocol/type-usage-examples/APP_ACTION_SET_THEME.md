---
description: "Usage examples for APP_ACTION_SET_THEME type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [APP_ACTION_SET_THEME Specification](../type-specifications/APP_ACTION_SET_THEME.md)**

# APP_ACTION_SET_THEME Usage Examples

This document contains practical usage examples for the `APP_ACTION_SET_THEME` action type, demonstrating theme switching scenarios in real-world applications.

## Core Implementation

All theme changes follow the same structure with different `theme_name` values:

**Action Payload**

```json
{
  "action_id": "message-123-action-set-theme-{theme}",
  "action_type": "APP_ACTION_SET_THEME",
  "action_data": {
    "target": "APP",
    "theme_name": "{theme_value}"
  }
}
```

---

## Essential Examples

### Theme Selection Interface

This example demonstrates providing users with a complete interface for selecting between the three standard theme options (dark, light, system), allowing them to customize their viewing experience through actionable chips.

**Action Payload**

```

              {
                "action_id": "set-theme-system",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "system"
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
        "markdown": "I can help you customize your viewing experience. Choose your preferred theme:"
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-theme-options",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_items": [
          {
            "chip_text": "🌙 Dark Mode",
            "chip_value": "dark",
            "chip_actions": [
              {
                "action_id": "set-theme-dark",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "dark"
                }
              }
            ]
          },
          {
            "chip_text": "☀️ Light Mode",
            "chip_value": "light",
            "chip_actions": [
              {
                "action_id": "set-theme-light",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "light"
                }
              }
            ]
          },
          {
            "chip_text": "⚙️ System Default",
            "chip_value": "system",
            "chip_actions": [
              {
                "action_id": "set-theme-system",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "system"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
```

**Full Assistant Output\***

**Assistant Output**

````markdown
_Assistant reasoning within output_
I can help you customize your viewing experience by offering theme selection options. This interface provides all three standard theme choices and explains the benefits of each option to help users make the best choice for their environment.

_Message to be processed by the UI_

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
        "markdown": "I can help you customize your viewing experience. Choose your preferred theme:"
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-theme-options",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_items": [
          {
            "chip_text": "🌙 Dark Mode",
            "chip_value": "dark",
            "chip_actions": [
              {
                "action_id": "set-theme-dark",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "dark"
                }
              }
            ]
          },
          {
            "chip_text": "☀️ Light Mode",
            "chip_value": "light",
            "chip_actions": [
              {
                "action_id": "set-theme-light",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "light"
                }
              }
            ]
          },
          {
            "chip_text": "⚙️ System Default",
            "chip_value": "system",
            "chip_actions": [
              {
                "action_id": "set-theme-system",
                "action_type": "APP_ACTION_SET_THEME",
                "action_data": {
                  "target": "APP",
                  "theme_name": "system"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
```
````

### Dark Mode Quick Switch

This example shows how to implement a quick dark mode toggle, perfect for users who frequently switch between light and dark themes based on their environment or time of day.

**Action Payload**

```json
{
  "action_id": "quick-dark-mode-switch",
  "action_type": "APP_ACTION_SET_THEME",
  "action_data": {
    "target": "APP",
    "theme_name": "dark"
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
      "content_id": "chatmessage-0000002-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Switching to dark mode for better viewing in low-light conditions. This will reduce eye strain and improve readability."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "quick-dark-mode-switch",
          "action_type": "APP_ACTION_SET_THEME",
          "action_data": {
            "target": "APP",
            "theme_name": "dark"
          }
        }
      }
    }
  ]
}
```

**Assistant Output**

````markdown
Perfect for users who want to quickly switch to dark mode for better viewing in low-light conditions. This immediate theme change provides instant visual relief and improved readability.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Switching to dark mode for better viewing in low-light conditions. This will reduce eye strain and improve readability."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "quick-dark-mode-switch",
          "action_type": "APP_ACTION_SET_THEME",
          "action_data": {
            "target": "APP",
            "theme_name": "dark"
          }
        }
      }
    }
  ]
}
```
````

### System Theme Synchronization

This example demonstrates setting the theme to follow the operating system's preference, enabling automatic switching between light and dark modes based on system settings.

**Action Payload**

```json
{
  "action_id": "sync-system-theme",
  "action_type": "APP_ACTION_SET_THEME",
  "action_data": {
    "target": "APP",
    "theme_name": "system"
  }
}
```

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-explanation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'll sync your theme with your system preferences. This means the app will automatically switch between light and dark modes based on your operating system settings."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "sync-system-theme",
          "action_type": "APP_ACTION_SET_THEME",
          "action_data": {
            "target": "APP",
            "theme_name": "system"
          }
        }
      }
    }
  ]
}
```

**Assistant Output**

````markdown
By selecting system theme synchronization, the application will automatically adjust its appearance to match your operating system's current theme setting. This ensures consistency across all your applications and automatically adapts to your device's day/night cycle if configured.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-explanation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'll sync your theme with your system preferences. This means the app will automatically switch between light and dark modes based on your operating system settings."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "sync-system-theme",
          "action_type": "APP_ACTION_SET_THEME",
          "action_data": {
            "target": "APP",
            "theme_name": "system"
          }
        }
      }
    }
  ]
}
```
````

---

## Theme Options

### Available Themes

- **`dark`** - Dark theme for reduced eye strain in low-light environments
- **`light`** - Light theme for optimal visibility in bright conditions
- **`system`** - Follows operating system theme preferences with automatic switching

### Example Interface Integration

For a sample workflow's workspace setup workflow, theme preferences can be set during onboarding or updated through the dashboard preferences. Theme changes apply immediately to both the chat interface and canvas workspace.

## Implementation Notes

- Theme changes apply globally across the application
- The `target` field must always be `"APP"` for theme actions
- Theme preference is typically persisted in user settings
- System theme automatically updates when OS preference changes
