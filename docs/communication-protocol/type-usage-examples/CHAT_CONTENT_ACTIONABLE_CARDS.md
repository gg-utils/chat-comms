---
description: "Simplified usage examples for CHAT_CONTENT_ACTIONABLE_CARDS in the communication protocol. Focused on example interface use cases with consolidated examples and essential implementation patterns. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_CONTENT_ACTIONABLE_CARDS Specification](../type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md)**

# CHAT_CONTENT_ACTIONABLE_CARDS Usage Examples

Actionable cards provide selection interfaces within chat messages, displaying structured information (title, subtitle) and triggering actions when selected. Essential for a sample workflow's organization identification and workspace refinement workflows.

## Core Implementation

### Basic Card Payload

**Content Payload**

```json
{
  "content_id": "cards-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "Option Title",
        "card_subtitle": "Description or additional context",
        "card_value": "option_value",
        "card_actions": [
          /* Action objects */
        ]
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
        "markdown": "Context for the selection:"
      }
    },
    {
      "content_id": "selection-cards",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
      "content_data": {
        /* Card configuration */
      }
    }
  ]
}
```

---

## Essential Examples

### Entity Disambiguation

Multiple organizations match user input during workspace creation, requiring specific selection.

**Assistant Output**

````markdown
I'll present the matching organizations for you to choose from:

**Content Payload**

```json
{
  "content_id": "organization-disambiguation",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "The Hub - Digital Innovation Studio",
        "card_subtitle": "https://thehub.ltd • London, UK • Technology Services",
        "card_value": "thehub-digital-london",
        "card_actions": [
          {
            "action_id": "select-organization",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "My organization is The Hub - Digital Innovation Studio (https://thehub.ltd)"
            }
          }
        ]
      },
      {
        "card_title": "The Hub - Creative Co-working Space",
        "card_subtitle": "https://thehubcoworking.com • San Francisco, CA • Workspace",
        "card_value": "thehub-coworking-sf",
        "card_actions": [
          {
            "action_id": "select-organization-2",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "My organization is The Hub - Creative Co-working Space (https://thehubcoworking.com)"
            }
          }
        ]
      }
    ]
  }
}
```
````

### Workspace Management Actions

Post-onboarding workspace management options with dashboard access and workspace editing.

**Assistant Output**

````markdown
I'll provide management options for your published workspace:

**Content Payload**

```json
{
  "content_id": "workspace-management",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "📊 View Dashboard",
        "card_subtitle": "Access analytics, readiness score, and performance insights",
        "card_value": "dashboard",
        "card_actions": [
          {
            "action_id": "open-dashboard",
            "action_type": "CANVAS_ACTION_OPEN",
            "action_data": {
              "target": "CANVAS",
              "canvas_title_label": "Workspace Dashboard",
              "canvas_title_href": "https://example.com/dashboard",
              "canvas_initial_contents": [
                {
                  "content_id": "dashboard-content",
                  "content_queue": "main",
                  "content_type": "CANVAS_CONTENT_MARKDOWN",
                  "content_data": {
                    "markdown": "# Workspace Management Dashboard\n\n## Quick Stats\n- **Workspace Status:** ✅ Live & Active\n- **Workflow Quality Score:** Updating...\n- **Last Updated:** Just now"
                  }
                }
              ]
            }
          }
        ]
      },
      {
        "card_title": "🔍 Scan Another Organization",
        "card_subtitle": "Create an workspace for another organization you manage",
        "card_value": "scan_another",
        "card_actions": [
          {
            "action_id": "scan-another",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "I'd like to scan another organization for workspace refinement"
            }
          }
        ]
      },
      {
        "card_title": "📝 Edit This Workspace",
        "card_subtitle": "Make changes to your current workspace content",
        "card_value": "edit_workspace",
        "card_actions": [
          {
            "action_id": "edit-workspace",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "I want to edit my current workspace"
            }
          }
        ]
      }
    ]
  }
}
```
````

### Analysis Method Selection

Offering different analysis approaches for workspace data with canvas integration.

**Assistant Output**

````markdown
I'll offer different analysis methods for your organization data:

**Content Payload**

```json
{
  "content_id": "analysis-selection",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
  "content_data": {
    "actionable_cards_selection_mode": "SINGLE",
    "actionable_cards_selection_state": "PENDING_SELECTION",
    "actionable_cards_items": [
      {
        "card_title": "📈 Trend Analysis",
        "card_subtitle": "Identify patterns and trends over time",
        "card_value": "trend_analysis",
        "card_actions": [
          {
            "action_id": "trend-analysis",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "I want to perform trend analysis on my data"
            }
          },
          {
            "action_id": "open-trend-canvas",
            "action_type": "CANVAS_ACTION_OPEN",
            "action_data": {
              "target": "CANVAS",
              "canvas_title_label": "Trend Analysis Workspace",
              "canvas_initial_contents": [
                {
                  "content_id": "trend-header",
                  "content_queue": "main",
                  "content_type": "CANVAS_CONTENT_MARKDOWN",
                  "content_data": {
                    "markdown": "# Trend Analysis\n\nInitializing trend analysis tools..."
                  }
                }
              ]
            }
          }
        ]
      },
      {
        "card_title": "📊 Comparative Analysis",
        "card_subtitle": "Compare different segments or time periods",
        "card_value": "comparative_analysis",
        "card_actions": [
          {
            "action_id": "comparative-analysis",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "I want to perform comparative analysis on my data"
            }
          }
        ]
      }
    ]
  }
}
```
````

---

## Card Properties & Configuration

### Required Properties

- **card_title**: Primary display text
- **card_subtitle**: Secondary descriptive text
- **card_value**: Unique identifier for processing
- **card_actions**: Array of actions to execute when selected

### Optional Properties

- **card_style**: "PRIMARY" | "SECONDARY" | "TERTIARY"
- **card_state**: "ENABLED" | "DISABLED" | "LOADING"

### Selection Modes

- **SINGLE**: Only one card can be selected
- **MULTIPLE**: Multiple cards can be selected simultaneously

### Selection States

- **PENDING_SELECTION**: Awaiting user interaction
- **SELECTED**: User has made selection
- **COMPLETED**: Selection processed

---

## Action Patterns

### Text Message Actions

Most common pattern for simple selections:

**Action Payload**

```json
{
  "action_id": "unique-action-id",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "User's selection message"
  }
}
```

### Canvas Actions

For complex workflows requiring detailed interfaces:

**Action Payload**

```json
{
  "action_id": "canvas-action-id",
  "action_type": "CANVAS_ACTION_OPEN",
  "action_data": {
    "target": "CANVAS",
    "canvas_title_label": "Workspace Title",
    "canvas_initial_contents": [
      /* Content objects */
    ]
  }
}
```

### Multi-Action Cards

Execute multiple actions sequentially:

```json
{
  "card_actions": [
    {
      "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
      "action_data": {
        /* Send confirmation */
      }
    },
    {
      "action_type": "CANVAS_ACTION_OPEN",
      "action_data": {
        /* Open detailed view */
      }
    }
  ]
}
```

---

## Implementation Guidelines

### Best Practices

1. **Clear Titles**: Use descriptive, concise titles
2. **Informative Subtitles**: Provide helpful context
3. **Logical Ordering**: Arrange by importance or workflow sequence
4. **Consistent Formatting**: Maintain structure across cards
5. **Appropriate Actions**: Match user expectations
6. **Performance**: Limit to 3-8 cards to avoid overwhelming users

### Common Use Cases

- **Entity Disambiguation**: Choose between similar search results
- **Workflow Branching**: Direct conversation flow based on user choices
- **Feature Selection**: Pick features to enable or configure
- **Method Selection**: Choose analysis approaches or algorithms

### UI Behavior

- Cards render as visually distinct, selectable items
- Title displayed prominently, subtitle as secondary text
- Hover/focus states indicate interactivity
- Selection executes all associated actions in sequence
- Support for keyboard navigation and screen readers

### When to Use Cards vs. Chips

- **Use Cards**: Complex information, multiple properties, detailed descriptions
- **Use Chips**: Simple options, short text (≤8 words), quick selections

---

## Complete Message Example

**Message Payload**

```json
{
  "message_id": "entity-selection-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I found multiple organizations named **\"The Hub\"**. Which one is your organization?"
      }
    },
    {
      "content_id": "organization-cards",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
      "content_data": {
        "actionable_cards_selection_mode": "SINGLE",
        "actionable_cards_selection_state": "PENDING_SELECTION",
        "actionable_cards_items": [
          {
            "card_title": "The Hub - Digital Innovation Studio",
            "card_subtitle": "https://thehub.ltd • London, UK • Technology Services",
            "card_value": "thehub-digital-london",
            "card_actions": [
              {
                "action_id": "select-thehub-digital",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "My organization is The Hub - Digital Innovation Studio (https://thehub.ltd)"
                }
              }
            ]
          },
          {
            "card_title": "The Hub - Creative Co-working Space",
            "card_subtitle": "https://thehubcoworking.com • San Francisco, CA • Workspace",
            "card_value": "thehub-coworking-sf",
            "card_actions": [
              {
                "action_id": "select-thehub-coworking",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "My organization is The Hub - Creative Co-working Space (https://thehubcoworking.com)"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "content_id": "entity-selection-001-content-app-action-wait-for-user-input",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_width": "WIDTH_AUTO",
      "content_data": {
        "action": {
          "action_id": "entity-selection-001-action-wait-for-user-input",
          "action_type": "APP_ACTION_WAIT_FOR_USER_INPUT",
          "action_data": {}
        }
      }
    }
  ]
}
```
