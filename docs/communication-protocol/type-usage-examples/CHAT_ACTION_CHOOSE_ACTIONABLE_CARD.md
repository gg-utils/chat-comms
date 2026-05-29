---
description: "Usage examples for CHAT_ACTION_CHOOSE_ACTIONABLE_CARD in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for handling user selections from actionable cards, enabling programmatic processing of card choices. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_CHOOSE_ACTIONABLE_CARD Specification](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)**

# CHAT_ACTION_CHOOSE_ACTIONABLE_CARD Usage Examples

This action type handles user selections from actionable cards, enabling programmatic processing of card choices and allowing the assistant to respond to specific selections. Cards provide richer information than chips and are ideal for complex choices that benefit from descriptions and additional context.

## Core Implementation

### Basic Action Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-{action-identifier}",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "existing-cards-content-id",
    "selected_card_value": "card_value",
    "selected_card_title": "Card Title",
    "simulated_user_message_text": "User's selection message"
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
      "content_id": "chatmessage-{id}-content-01-response",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'll process your selection..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_CHOOSE_ACTIONABLE_CARD payload */
        }
      }
    }
  ]
}
```

---

## Essential Patterns

### 1. Simple Service Selection

**Scenario**: User selects from available service options

This pattern handles basic option selection where users need to choose from predefined services or packages. The assistant acknowledges the selection and provides confirmation with next steps, maintaining clear communication about the user's choice.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-select-service",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "chatmessage-0000001-content-02-services",
    "selected_card_value": "premium_service",
    "selected_card_title": "Premium Service",
    "simulated_user_message_text": "I want to select the Premium Service package"
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
      "content_id": "chatmessage-0000001-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Excellent choice! The Premium Service package offers the best value and features. I'll set that up for you now."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-select-service",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
          "action_data": {
            "target": "CHAT",
            "actionable_cards_content_id": "chatmessage-0000001-content-02-services",
            "selected_card_value": "premium_service",
            "selected_card_title": "Premium Service",
            "simulated_user_message_text": "I want to select the Premium Service package"
          }
        }
      }
    }
  ]
}
```

### 2. Project Template Selection

**Scenario**: User chooses from complex configuration options

When users need to select from detailed options that require more information than simple chips can provide, actionable cards offer rich descriptions and context. This pattern works well for template selection, service packages, or configuration choices.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000002-select-template",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "chatmessage-0000002-content-01-templates",
    "selected_card_value": "agile_project_template",
    "selected_card_title": "Agile Project Template",
    "simulated_user_message_text": "I want to use the Agile Project Template for my software development project"
  }
}
```

---

## Example Interface Examples

### 3. Entity Disambiguation Selection

**Scenario**: User selects their specific organization from multiple similar options

When a sample workflow's entity search returns multiple results with similar names, this pattern helps users identify and select their exact organization. The rich card format allows for detailed organization information (location, URL, description) that helps users make the correct choice.

**Action Payload**

```json
{
  "action_id": "example-choose-organization-disambiguation",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "example-disambiguation-001-content-02-organization-options",
    "selected_card_value": "thehub_london_ec2a",
    "selected_card_title": "The Hub - Digital Innovation Studio (London)",
    "simulated_user_message_text": "I want to refine this workspace: The Hub - Digital Innovation Studio in London EC2A 4NE"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-organization-selected-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-organization-selected-001-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Perfect! I've confirmed you want to refine **The Hub - Digital Innovation Studio** in London. This is the right organization - I can see they specialize in custom web development and AI integration."
      }
    },
    {
      "content_id": "example-organization-selected-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-organization-disambiguation",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
          "action_data": {
            "target": "CHAT",
            "actionable_cards_content_id": "example-disambiguation-001-content-02-organization-options",
            "selected_card_value": "thehub_london_ec2a",
            "selected_card_title": "The Hub - Digital Innovation Studio (London)",
            "simulated_user_message_text": "I want to refine this workspace: The Hub - Digital Innovation Studio in London EC2A 4NE"
          }
        }
      }
    }
  ]
}
```

### 4. Workspace Management Action Selection

**Scenario**: User chooses dashboard management actions

After workspace refinement, users need access to various management functions. This pattern provides clear options for dashboard access, workspace updates, and analytics viewing, helping users navigate their prepared workspace management effectively.

**Action Payload**

```json
{
  "action_id": "example-choose-workspace-management-action",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "example-management-001-content-02-action-options",
    "selected_card_value": "view_dashboard",
    "selected_card_title": "📊 View Dashboard",
    "simulated_user_message_text": "I want to view my workspace management dashboard"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-dashboard-request-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-dashboard-request-001-content-01-opening",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Great choice! I'll open your workspace management dashboard where you can monitor workflow quality scores, track indexing progress, and manage your workspaces."
      }
    },
    {
      "content_id": "example-dashboard-request-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-workspace-management-action",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
          "action_data": {
            "target": "CHAT",
            "actionable_cards_content_id": "example-management-001-content-02-action-options",
            "selected_card_value": "view_dashboard",
            "selected_card_title": "📊 View Dashboard",
            "simulated_user_message_text": "I want to view my workspace management dashboard"
          }
        }
      }
    }
  ]
}
```

### 5. Workspace Approval and Publishing

**Scenario**: User approves their prepared workspace for publication

This critical workflow step allows users to review and approve their prepared workspace before it goes live. The pattern handles the final approval decision and initiates the publishing process, providing clear confirmation of the user's commitment to proceed.

**Action Payload**

```json
{
  "action_id": "example-choose-makeover-approval",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
  "action_data": {
    "target": "CHAT",
    "actionable_cards_content_id": "example-approval-001-content-02-approval-options",
    "selected_card_value": "approve_and_publish",
    "selected_card_title": "✅ Approve & Publish Workspace",
    "simulated_user_message_text": "Yes, I approve this prepared workspace and want to publish it"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-makeover-approved-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-makeover-approved-001-content-01-celebration",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "🎉 **Fantastic!** Your prepared workspace looks amazing and you've approved it for publishing. I'll now submit it to search engines and make your organization discoverable to assistants worldwide!"
      }
    },
    {
      "content_id": "example-makeover-approved-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-makeover-approval",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
          "action_data": {
            "target": "CHAT",
            "actionable_cards_content_id": "example-approval-001-content-02-approval-options",
            "selected_card_value": "approve_and_publish",
            "selected_card_title": "✅ Approve & Publish Workspace",
            "simulated_user_message_text": "Yes, I approve this prepared workspace and want to publish it"
          }
        }
      }
    }
  ]
}
```

---

## Implementation Guidelines

### Card Selection Patterns

- **Entity Disambiguation** - Multiple similar organizations requiring clarification
- **Service Selection** - Complex offerings with detailed descriptions
- **Approval Workflows** - Important decisions requiring explicit confirmation
- **Management Actions** - Dashboard and administrative functions

### Example Interface Integration

- **Organization Identification** - Disambiguate between similar organization names
- **Workspace Management** - Dashboard access and workspace maintenance
- **Publishing Workflow** - Approval and publication of prepared workspaces
- **Enhancement Selection** - Service upgrades and feature additions

### Best Practices

- Use descriptive `selected_card_title` that matches the card content
- Provide clear `simulated_user_message_text` for natural conversation flow
- Include relevant context in response messages for user confirmation
- Handle selection responses with appropriate next steps or confirmations
