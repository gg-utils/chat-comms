---
description: "Overview of all type specifications in the communication protocol. These are the concrete, implementable types used when outputting content from the ASSISTANT to the UI. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **↩️ Back to [Communication Protocol](../README.md)**

# Type Specifications

This directory contains all the concrete, implementable types used in the Assistant ↔️ UI Communication Protocol. These types are what you'll actually use when building messages, content, and actions in your implementation.

## 📋 Overview

Type specifications are the final layer in the protocol's three-tier architecture:

1. **Base Structures** - Foundational concepts
2. **Specialized Structures** - Intermediate patterns
3. **Type Specifications** - Concrete implementations ← _You are here_

Each type specification includes:

- Complete JSON schema definition
- Required and optional properties
- Usage examples and patterns
- Implementation guidelines

## Runtime validation status

`@gg-utils/chat-comms` ships Zod-based strict validators for the shared message/action
envelopes plus concrete chat, canvas, and app content/action payload targets and required fields.
Open extension blobs such as `panel_body_data`, panel animation/effect objects, streaming options,
and arbitrary app payload details remain typed/documented but are not fully refined by every nested
subtype yet. The per-type JSON, Zod, Joi, and Yup snippets in these specification files are
documentation examples for implementers; only the package's Zod schemas under `src/schemas/` are
executable package validators today. Joi and Yup are not package dependencies or exported validation
surfaces.

## 📝 Message Types

Message types extends the [MESSAGE](../base-structures/MESSAGE.md) base structure. They are the top-level container for communicating any [CONTENT](../base-structures/CONTENT.md) and [ACTION](../base-structures/ACTION.md) elements.

- 💬 **[CHAT_MESSAGE](./CHAT_MESSAGE.md)** - Core chat message structure that wraps all chat content and actions.

  ```json
  {
    "message_id": "msg-001",
    "message_type": "CHAT_MESSAGE",
    "message_role": "ASSISTANT",
    "message_target": "CHAT",
    "message_contents": [
      {
        "content_id": "content-001",
        "content_type": "CHAT_CONTENT_MARKDOWN",
        "content_data": {
          "markdown": "Hello! How can I help you today?"
        }
      }
    ]
  }
  ```

## 🎨 Content Types

### Chat Content Types

Chat content types exend the [CHAT_CONTENT](../specialized-structures/CHAT_CONTENT.md) specialized structure. They are the content elements that are sent to be displayed in the chat interface, or to wrap actions to be performed by the chat interface.

- 💬 **[CHAT_CONTENT_MARKDOWN](./CHAT_CONTENT_MARKDOWN.md)** - Rich text content with markdown formatting.

  ```json
  {
    "content_id": "content-001",
    "content_type": "CHAT_CONTENT_MARKDOWN",
    "content_data": {
      "markdown": "## Analysis Complete\n\nYour data shows **23% growth** this quarter!",
      "markdown_style": "DEFAULT"
    }
  }
  ```

- 💬 **[CHAT_CONTENT_BUTTON](./CHAT_CONTENT_BUTTON.md)** - Interactive buttons with various states.

  ```json
  {
    "content_id": "button-001",
    "content_type": "CHAT_CONTENT_BUTTON",
    "content_data": {
      "button_text": "Download Report",
      "button_style": "BUTTON_STYLE_PRIMARY",
      "button_state": "ENABLED",
      "button_actions": [
        {
          "action_id": "download-action-001",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_title_label": "Report"
          }
        }
      ]
    }
  }
  ```

- 💬 **[CHAT_CONTENT_ACTIONABLE_CHIPS](./CHAT_CONTENT_ACTIONABLE_CHIPS.md)** - Small action buttons and tags for user selection.

  ```json
  {
    "content_id": "chips-001",
    "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
    "content_data": {
      "actionable_chips_selection_mode": "SINGLE",
      "actionable_chips_items": [
        {
          "chip_text": "Option A",
          "chip_value": "option_a",
          "chip_actions": [
            {
              "action_id": "choice-a",
              "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
              "action_data": {
                "target": "CHAT",
                "role": "USER",
                "text": "I choose Option A"
              }
            }
          ]
        }
      ]
    }
  }
  ```

- 💬 **[CHAT_CONTENT_ACTIONABLE_CARDS](./CHAT_CONTENT_ACTIONABLE_CARDS.md)** - Card-based selection interfaces for user choices.

  ```json
  {
    "content_id": "cards-001",
    "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
    "content_data": {
      "actionable_cards_selection_mode": "SINGLE",
      "actionable_cards_items": [
        {
          "card_title": "Basic Plan",
          "card_subtitle": "Perfect for small teams",
          "card_value": "basic",
          "card_actions": [
            {
              "action_id": "select-basic",
              "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
              "action_data": {
                "target": "CHAT",
                "role": "USER",
                "text": "I want the Basic Plan"
              }
            }
          ]
        }
      ]
    }
  }
  ```

- 💬 **[CHAT_CONTENT_ACTION_WRAPPER](./CHAT_CONTENT_ACTION_WRAPPER.md)** - Wrapper for actionable content elements.

  ```json
  {
    "content_id": "wrapper-001",
    "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
    "content_data": {
      "wrapper_contents": [
        {
          "content_id": "wrapped-content-001",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Click the button below to continue:"
          }
        }
      ],
      "wrapper_actions": [
        {
          "action_id": "continue-action",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_title_label": "Next Step"
          }
        }
      ]
    }
  }
  ```

- 💬 **[CHAT_CONTENT_PROGRESS_BAR](./CHAT_CONTENT_PROGRESS_BAR.md)** - Progress indicators and status bars.

  ```json
  {
    "content_id": "progress-001",
    "content_type": "CHAT_CONTENT_PROGRESS_BAR",
    "content_data": {
      "progress_bar_state": "IN_PROGRESS",
      "progress_bar_visibility": "VISIBLE",
      "progress_bar_current_percentage": 75,
      "progress_bar_current_animation_duration_ms": 1200,
      "progress_bar_next_goal_delay_ms": 300,
      "progress_bar_next_goal_percentage": 100,
      "progress_bar_next_goal_animation_duration_ms": 800,
      "progress_bar_message": "Processing request...",
      "progress_bar_icon": "progress-bar-icon-processing"
    }
  }
  ```

- 💬 **[CHAT_CONTENT_PANEL](./CHAT_CONTENT_PANEL.md)** - Structured panel displays with headers and dynamic body content. Supports multiple body types including markdown, images, search interfaces, and AI conversations.

  ```json
  {
    "content_id": "panel-001",
    "content_type": "CHAT_CONTENT_PANEL",
    "content_data": {
      "panel_header_title": "Data Analysis",
      "panel_header_description": "Real-time processing results",
      "panel_body_type": "PANEL_BODY_MARKDOWN",
      "panel_body_aspect_ratio": "16/9",
      "panel_body_data": {
        "markdown": "## Data Analysis Results\n\n**Key Metrics:**\n- Total records processed: 1,247\n- Average processing time: 234ms\n- Success rate: 99.2%\n\n**Recommendations:**\n1. Increase batch size for better performance\n2. Implement caching for frequently accessed data"
      }
    }
  }
  ```

  Additional body types include `PANEL_BODY_REASONING_V1_MARKDOWN` for AI thought processes, `PANEL_BODY_IMAGE`, `PANEL_BODY_GOOGLE_SEARCH_HOME`, `PANEL_BODY_GOOGLE_SEARCH_RESULT`, `PANEL_BODY_GOOGLE_MAPS_HOME`, `PANEL_BODY_GOOGLE_MAPS_REVIEWS`, `PANEL_BODY_CHATGPT_HOME`, `PANEL_BODY_CHATGPT_RESULT`, `PANEL_BODY_GEMINI_HOME`, `PANEL_BODY_GEMINI_RESULT`, `PANEL_BODY_PERPLEXITY_HOME`, and `PANEL_BODY_PERPLEXITY_RESULT` for specialized interfaces.

### Canvas Content Types

Canvas content types are the content elements that appear in the canvas workspace.

- 📄 **[CANVAS_CONTENT_MARKDOWN](./CANVAS_CONTENT_MARKDOWN.md)** - Markdown content for canvas display.

  ```json
  {
    "content_id": "canvas-md-001",
    "content_type": "CANVAS_CONTENT_MARKDOWN",
    "content_data": {
      "markdown": "# Project Overview\n\n## Goals\n- Increase efficiency by 25%\n- Reduce costs by 15%"
    }
  }
  ```

- 📄 **[CANVAS_CONTENT_SECTION](./CANVAS_CONTENT_SECTION.md)** - Organized content sections with headers.

  ```json
  {
    "content_id": "section-001",
    "content_type": "CANVAS_CONTENT_SECTION",
    "content_data": {
      "section_title": "Analysis Results",
      "section_style": "HIGHLIGHTED",
      "section_contents": [
        {
          "content_id": "nested-content-001",
          "content_type": "CANVAS_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Revenue increased by **23%** this quarter."
          }
        }
      ]
    }
  }
  ```

- 📄 **[CANVAS_CONTENT_HTML](./CANVAS_CONTENT_HTML.md)** - Raw HTML content for canvas display (no sanitization by protocol).

  ```json
  {
    "content_id": "canvas-html-001",
    "content_type": "CANVAS_CONTENT_HTML",
    "content_data": {
      "html": "<div><h2>Status</h2><p>All systems nominal.</p></div>"
    }
  }
  ```

## ⚡ Action Types

### Chat Action Types

Chat action types extend the [CHAT_ACTION](../specialized-structures/CHAT_ACTION.md) specialized structure. They are the actions that are sent to perform actions on the chat interface.

- 💬 **[CHAT_ACTION_SEND_TEXT_MESSAGE](./CHAT_ACTION_SEND_TEXT_MESSAGE.md)** - Simulate user text input.

  ```json
  {
    "action_id": "send-msg-001",
    "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
    "action_data": {
      "target": "CHAT",
      "role": "USER",
      "text": "I want to upgrade my subscription"
    }
  }
  ```

- 💬 **[CHAT_ACTION_UPDATE_BUTTON](./CHAT_ACTION_UPDATE_BUTTON.md)** - Update button states and properties.

  ```json
  {
    "action_id": "update-btn-001",
    "action_type": "CHAT_ACTION_UPDATE_BUTTON",
    "action_data": {
      "target": "CHAT",
      "button_content_id": "button-001",
      "button_updates": {
        "button_text": "Processing...",
        "button_state": "LOADING"
      }
    }
  }
  ```

- 💬 **[CHAT_ACTION_CHOOSE_ACTIONABLE_CARD](./CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)** - Handle user card selections.

  ```json
  {
    "action_id": "choose-card-001",
    "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
    "action_data": {
      "target": "CHAT",
      "cards_content_id": "cards-001",
      "selected_card_value": "basic"
    }
  }
  ```

- 💬 **[CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP](./CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)** - Handle user chip selections.

  ```json
  {
    "action_id": "choose-chip-001",
    "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
    "action_data": {
      "target": "CHAT",
      "chips_content_id": "chips-001",
      "selected_chip_value": "option_a"
    }
  }
  ```

- 💬 **[CHAT_ACTION_UPDATE_PROGRESS_BAR](./CHAT_ACTION_UPDATE_PROGRESS_BAR.md)** - Update progress bar values and states.

  ```json
  {
    "action_id": "update-progress-001",
    "action_type": "CHAT_ACTION_UPDATE_PROGRESS_BAR",
    "action_data": {
      "target": "CHAT",
      "progress_bar_content_id": "progress-001",
      "progress_bar_state": "COMPLETED",
      "progress_bar_visibility": "VISIBLE",
      "progress_bar_current_percentage": 100,
      "progress_bar_current_animation_duration_ms": 600,
      "progress_bar_message": "Complete!"
    }
  }
  ```

- 💬 **[CHAT_ACTION_UPDATE_PANEL](./CHAT_ACTION_UPDATE_PANEL.md)** - Update panel headers, body content, and visual properties.

  ```json
  {
    "action_id": "update-panel-001",
    "action_type": "CHAT_ACTION_UPDATE_PANEL",
    "action_data": {
      "target": "CHAT",
      "panel_content_id": "panel-001",
      "panel_header_title": "Updated Analysis",
      "panel_body_data": {
        "markdown": "## Latest Results\n\nAnalysis updated with **98% accuracy**."
      }
    }
  }
  ```

- 💬 **[CHAT_ACTION_BEGIN_SIMULATED_TURN](./CHAT_ACTION_BEGIN_SIMULATED_TURN.md)** - Begin a new simulated turn with a cleared screen.

  ```json
  {
    "action_id": "begin-simulated-001",
    "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
    "action_data": {
      "target": "CHAT"
    }
  }
  ```

- 💬 **[CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE](./CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)** - Mark a logical content sequence as complete.

  ```json
  {
    "action_id": "complete-sequence-001",
    "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
    "action_data": {
      "target": "CHAT"
    }
  }
  ```

- 💬 **[CHAT_ACTION_WAIT_FOR_QUEUES](./CHAT_ACTION_WAIT_FOR_QUEUES.md)** - Block the current queue until specified queues meet a condition.

  ```json
  {
    "action_id": "wait-queues-001",
    "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
    "action_data": {
      "target": "CHAT",
      "queue_names": ["website"],
      "wait_mode": "DRAIN",
      "timeout_ms": 30000,
      "on_timeout": "CONTINUE"
    }
  }
  ```

### Canvas Action Types

Canvas action types extend the [CANVAS_ACTION](../specialized-structures/CANVAS_ACTION.md) specialized structure. They are the actions that are sent to perform actions on the canvas interface.

- 📄 **[CANVAS_ACTION_OPEN](./CANVAS_ACTION_OPEN.md)** - Open and initialize the canvas workspace.

  ```json
  {
    "action_id": "open-canvas-001",
    "action_type": "CANVAS_ACTION_OPEN",
    "action_data": {
      "target": "CANVAS",
      "canvas_title_label": "Project Dashboard",
      "canvas_title_href": "https://example.com/dashboard",
      "canvas_initial_contents": [
        {
          "content_id": "initial-001",
          "content_type": "CANVAS_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "# Welcome to your dashboard\n\nLoading data..."
          }
        }
      ]
    }
  }
  ```

- 📄 **[CANVAS_ACTION_UPDATE](./CANVAS_ACTION_UPDATE.md)** - Update canvas content (title, contents, append, modify, remove).CANVAS_ACTION.md).

  ```json
  {
    "action_id": "update-canvas-001",
    "action_type": "CANVAS_ACTION_UPDATE",
    "action_data": {
      "target": "CANVAS",
      "canvas_id": "dashboard-001",
      "canvas_updates": {
        "canvas_title_label": "Updated Dashboard",
        "canvas_operation": "APPEND_CONTENT",
        "canvas_contents": [
          {
            "content_id": "new-content-001",
            "content_type": "CANVAS_CONTENT_MARKDOWN",
            "content_data": {
              "markdown": "## New Section\n\nAdditional analysis results..."
            }
          }
        ]
      }
    }
  }
  ```

- 📄 **[CANVAS_ACTION_CLOSE](./CANVAS_ACTION_CLOSE.md)** - Close the canvas workspace.

  ```json
  {
    "action_id": "close-canvas-001",
    "action_type": "CANVAS_ACTION_CLOSE",
    "action_data": {
      "target": "CANVAS",
      "canvas_id": "dashboard-001"
    }
  }
  ```

### App Action Types

App action types extend the [APP_ACTION](../specialized-structures/APP_ACTION.md) specialized structure. They are the actions that are sent to perform actions on the app interface.

- 🔧 **[APP_ACTION_SET_THEME](./APP_ACTION_SET_THEME.md)** - Change application theme.

  ```json
  {
    "action_id": "set-theme-001",
    "action_type": "APP_ACTION_SET_THEME",
    "action_data": {
      "target": "APP",
      "theme": "DARK"
    }
  }
  ```

- 🔧 **[APP_ACTION_CORE_CONSOLE](./APP_ACTION_CORE_CONSOLE.md)** - Stream core console logs to the browser console.

  ```json
  {
    "action_id": "core-console-001",
    "action_type": "APP_ACTION_CORE_CONSOLE",
    "action_data": {
      "target": "APP",
      "level": "info",
      "message": "Catalog sync completed",
      "payload": {
        "candidatesFound": 3
      }
    }
  }
  ```

- 🔧 **[APP_ACTION_SET_SEND_ERROR](./APP_ACTION_SET_SEND_ERROR.md)** - Set the shared structured send-error surface.

  ```json
  {
    "action_id": "set-send-error-001",
    "action_type": "APP_ACTION_SET_SEND_ERROR",
    "action_data": {
      "target": "APP",
      "error_kind": "ChatComms_RuntimeChat_AppSetSendErrorActionDataErrorKindEntityNotFound",
      "message": "I couldn't find a matching organization."
    }
  }
  ```

- 🔧 **[APP_ACTION_SET_INPUT_PLACEHOLDER](./APP_ACTION_SET_INPUT_PLACEHOLDER.md)** - Set the chat input placeholder.

  ```json
  {
    "action_id": "set-placeholder-001",
    "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
    "action_data": {
      "target": "APP",
      "placeholder": "Enter your organization name or website..."
    }
  }
  ```

- 🔧 **[APP_ACTION_THREAD_LIST_REFRESH](./APP_ACTION_THREAD_LIST_REFRESH.md)** - Refresh the conversation thread list.

  ```json
  {
    "action_id": "refresh-threads-001",
    "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
    "action_data": {
      "target": "APP"
    }
  }
  ```

````

- 🔧 **[APP_ACTION_WAIT_FOR_USER_INPUT](./APP_ACTION_WAIT_FOR_USER_INPUT.md)** - Pause progression until the user interacts.

  ```json
  {
    "action_id": "wait-input-001",
    "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
    "action_data": {}
  }
````

- 🔧 **[APP_ACTION_USER_PREFERENCE_UPDATE](./APP_ACTION_USER_PREFERENCE_UPDATE.md)** - Update user preferences and settings.

  ```json
  {
    "action_id": "update-prefs-001",
    "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
    "action_data": {
      "target": "APP",
      "preference_updates": {
        "notifications_enabled": true,
        "default_language": "en-US",
        "theme_preference": "AUTO"
      }
    }
  }
  ```

---

## 📁 Directory Structure

```
type-specifications/
├── README.md                              # This file - type specifications overview with examples
├── CHAT_MESSAGE.md                        # Chat message implementation
├── APP_ACTION_CORE_CONSOLE.md             # Core console streaming action
├── APP_ACTION_SET_SEND_ERROR.md           # Structured send-error action
├── APP_ACTION_SET_INPUT_PLACEHOLDER.md    # Input placeholder action
├── APP_ACTION_SET_THEME.md                # Theme change action
├── APP_ACTION_THREAD_LIST_REFRESH.md      # Thread list refresh action
├── APP_ACTION_WAIT_FOR_USER_INPUT.md      # Wait for user interaction action
├── APP_ACTION_USER_PREFERENCE_UPDATE.md   # User preference updates
├── CANVAS_ACTION_CLOSE.md                 # Close canvas action
├── CANVAS_ACTION_OPEN.md                  # Open canvas action
├── CANVAS_ACTION_UPDATE.md                # Update canvas action
├── CANVAS_CONTENT_HTML.md                 # Canvas HTML content
├── CANVAS_CONTENT_MARKDOWN.md             # Canvas markdown content
├── CANVAS_CONTENT_SECTION.md              # Canvas section content
├── CHAT_ACTION_BEGIN_SIMULATED_TURN.md    # Begin simulated turn action
├── CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md  # Card selection action
├── CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md  # Chip selection action
├── CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md # Complete content sequence action
├── CHAT_ACTION_SEND_TEXT_MESSAGE.md       # Text message simulation
├── CHAT_ACTION_UPDATE_BUTTON.md           # Button update action
├── CHAT_ACTION_UPDATE_PANEL.md            # Panel update action
├── CHAT_ACTION_UPDATE_PROGRESS_BAR.md     # Progress bar update
├── CHAT_ACTION_WAIT_FOR_QUEUES.md         # Queue synchronization action
├── CHAT_CONTENT_ACTION_WRAPPER.md         # Action wrapper content
├── CHAT_CONTENT_ACTIONABLE_CARDS.md       # Actionable cards content
├── CHAT_CONTENT_ACTIONABLE_CHIPS.md       # Actionable chips content
├── CHAT_CONTENT_BUTTON.md                 # Button content
├── CHAT_CONTENT_MARKDOWN.md               # Chat markdown content
├── CHAT_CONTENT_PANEL.md                  # Panel content with headers and body
└── CHAT_CONTENT_PROGRESS_BAR.md           # Progress bar content
```

---

_These type specifications represent the concrete implementations you'll use in your Assistant ↔️ UI communication protocol integration. However, check the detailed specifications for each type for more information._
