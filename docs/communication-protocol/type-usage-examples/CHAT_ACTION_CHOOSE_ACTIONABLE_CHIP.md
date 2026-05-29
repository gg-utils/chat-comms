---
description: "Usage examples for CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for handling user selections from actionable chips, enabling programmatic processing of chip choices. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP Specification](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)**

# CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP Usage Examples

This action type handles user selections from actionable chips, enabling programmatic processing of chip choices and allowing the assistant to respond to specific selections. It provides a compact, tag-like interface for user choices and maintains natural conversation flow.

## Core Implementation

### Basic Action Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-{action-identifier}",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "existing-chips-content-id",
    "selected_chip_value": "chip_value",
    "selected_chip_text": "Chip Text",
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
          /* CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP payload */
        }
      }
    }
  ]
}
```

---

## Essential Patterns

### 1. Simple Choice Selection

**Scenario**: User selects from basic options

This pattern handles straightforward yes/no decisions or simple categorical choices. The assistant acknowledges the selection and provides appropriate follow-up, maintaining conversation flow while processing the user's decision.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000001-select-option",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "chatmessage-0000001-content-02-options",
    "selected_chip_value": "option_a",
    "selected_chip_text": "Option A",
    "simulated_user_message_text": "I choose Option A"
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
        "markdown": "Perfect! You've selected Option A. I'll proceed with that choice and set up your preferences accordingly."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-select-option",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
          "action_data": {
            "target": "CHAT",
            "actionable_chips_content_id": "chatmessage-0000001-content-02-options",
            "selected_chip_value": "option_a",
            "selected_chip_text": "Option A",
            "simulated_user_message_text": "I choose Option A"
          }
        }
      }
    }
  ]
}
```

### 2. Multi-Selection Category Filter

**Scenario**: User selects multiple items from available options

When users need to choose multiple items from a list (like interests, features, or categories), this pattern allows for flexible selection. The multi-selection approach works well for customization, filtering, or preference gathering.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000002-select-categories",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "chatmessage-0000002-content-02-categories",
    "selected_chip_values": ["tech", "design", "marketing"],
    "selected_chip_texts": ["Technology", "Design", "Marketing"],
    "simulated_user_message_text": "I'm interested in Technology, Design, and Marketing"
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
      "content_id": "chatmessage-0000002-content-01-acknowledgment",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Great selection! I've noted your interests in Technology, Design, and Marketing. I'll customize your recommendations based on these preferences."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000002-select-categories",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
          "action_data": {
            "target": "CHAT",
            "actionable_chips_content_id": "chatmessage-0000002-content-02-categories",
            "selected_chip_values": ["tech", "design", "marketing"],
            "selected_chip_texts": ["Technology", "Design", "Marketing"],
            "simulated_user_message_text": "I'm interested in Technology, Design, and Marketing"
          }
        }
      }
    }
  ]
}
```

---

## Example Interface Examples

### 3. Organization Industry Selection

**Scenario**: User selects their organization industry for refinement

When setting up workspaces, users need to specify their industry for targeted refinement. This pattern allows users to choose from relevant industry categories, helping a sample interface provide industry-specific AI refinement strategies.

**Action Payload**

```json
{
  "action_id": "example-choose-organization-industry",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "example-industry-001-content-02-industry-categories",
    "selected_chip_value": "technology",
    "selected_chip_text": "Technology & Software",
    "simulated_user_message_text": "My organization is in Technology & Software"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-industry-selected-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-industry-selected-001-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Perfect! I've categorized your organization as **Technology & Software**. This helps me apply industry-specific refinement strategies that make your organization more discoverable to assistants looking for tech solutions."
      }
    },
    {
      "content_id": "example-industry-selected-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-organization-industry",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
          "action_data": {
            "target": "CHAT",
            "actionable_chips_content_id": "example-industry-001-content-02-industry-categories",
            "selected_chip_value": "technology",
            "selected_chip_text": "Technology & Software",
            "simulated_user_message_text": "My organization is in Technology & Software"
          }
        }
      }
    }
  ]
}
```

### 4. Workspace Review Preferences

**Scenario**: User selects preferences for workspace review process

During the workspace refinement review, users can customize how they want to receive and interact with their prepared workspace. This pattern allows for personalized review experiences based on user preferences.

**Action Payload**

```json
{
  "action_id": "example-choose-review-preferences",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "example-review-001-content-02-review-options",
    "selected_chip_values": ["detailed_explanation", "live_demo"],
    "selected_chip_texts": ["Detailed Explanation", "Live Demo"],
    "simulated_user_message_text": "I want a detailed explanation and live demo of my prepared workspace"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-review-preferences-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-review-preferences-001-content-01-acknowledgment",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Excellent choices! I'll provide you with a detailed explanation of all the refinements I've made, plus a live demo showing how assistants will now discover and describe your organization. This will help you understand the full value of your new workspace."
      }
    },
    {
      "content_id": "example-review-preferences-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-review-preferences",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
          "action_data": {
            "target": "CHAT",
            "actionable_chips_content_id": "example-review-001-content-02-review-options",
            "selected_chip_values": ["detailed_explanation", "live_demo"],
            "selected_chip_texts": ["Detailed Explanation", "Live Demo"],
            "simulated_user_message_text": "I want a detailed explanation and live demo of my prepared workspace"
          }
        }
      }
    }
  ]
}
```

### 5. Contact Method Selection

**Scenario**: User chooses preferred contact method for follow-up

After workspace refinement, users may want to receive updates or support through their preferred communication channels. This pattern handles contact preference selection with clear options for different communication methods.

**Action Payload**

```json
{
  "action_id": "example-choose-contact-method",
  "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
  "action_data": {
    "target": "CHAT",
    "actionable_chips_content_id": "example-contact-001-content-02-contact-options",
    "selected_chip_value": "email",
    "selected_chip_text": "📧 Email Updates",
    "simulated_user_message_text": "I prefer to receive updates via email"
  }
}
```

**Message Payload**

```json
{
  "message_id": "example-contact-method-selected-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-contact-method-selected-001-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Perfect! I've set your preference for email updates. You'll receive notifications about your workspace's workflow quality improvements, indexing progress, and monthly performance reports directly to your inbox."
      }
    },
    {
      "content_id": "example-contact-method-selected-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-choose-contact-method",
          "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
          "action_data": {
            "target": "CHAT",
            "actionable_chips_content_id": "example-contact-001-content-02-contact-options",
            "selected_chip_value": "email",
            "selected_chip_text": "📧 Email Updates",
            "simulated_user_message_text": "I prefer to receive updates via email"
          }
        }
      }
    }
  ]
}
```

---

## Implementation Guidelines

### Chip Selection Patterns

- **Category Selection** - Quick filtering and categorization
- **Quick Actions** - Single-click operations and confirmations
- **Organization Classification** - Industry and service type identification
- **Approval Workflows** - Fast approval/rejection decisions

### Example Interface Integration

- **Organization Type Classification** - Industry categorization for refinement
- **Service Enhancement** - Feature highlighting and selection
- **Publishing Approval** - Quick workflow approvals
- **Workspace Management** - Dashboard navigation and settings

### Best Practices

- Use concise, descriptive `selected_chip_text` for clarity
- Provide clear `simulated_user_message_text` for natural conversation
- Handle chip selections with immediate feedback and confirmation
- Group related chips logically for better user experience
- Use emojis and visual indicators for quick recognition

### Chip Properties Reference

- `chip_text` (string, required): Text displayed on the chip
- `chip_value` (string, required): Value associated with the chip for processing
- `chip_actions` (array, required): Actions to execute when chip is selected
- `chip_style` (string, optional): Visual style for the chip
- `chip_state` (string, optional): Interaction state of the chip
