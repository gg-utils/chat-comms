---
description: "Usage examples for CHAT_CONTENT_ACTIONABLE_CHIPS type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol, specifically tailored for the the example assistant application workflow automation platform. This file contains essential examples focused on practical use cases where users need to make quick single selections from a set of options without the visual weight of full cards. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_CONTENT_ACTIONABLE_CHIPS Specification](../type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md)**

# CHAT_CONTENT_ACTIONABLE_CHIPS Usage Examples

This action type provides quick and efficient single selections from a set of options, ideal for simple confirmations, category selections, and workflow decisions.

## Core Implementation

### Basic Chip Content

**Content Payload**

```json
{
  "content_id": "chips-{id}",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
  "content_data": {
    "actionable_chips_selection_mode": "SINGLE",
    "actionable_chips_selection_state": "PENDING_SELECTION",
    "actionable_chips_items": [
      {
        "chip_text": "Option Text",
        "chip_value": "option_value",
        "chip_actions": [
          {
            "action_id": "action-id",
            "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
            "action_data": {
              "target": "CHAT",
              "role": "USER",
              "text": "User selection message"
            }
          }
        ]
      }
    ]
  }
}
```

---

## Essential Examples

### Simple Yes/No Confirmation

Basic confirmation chips for quick binary decisions in workflows.

**Action Payload**

```

             {
                "action_id": "partial-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "That's partially correct, but needs clarification"
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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need to confirm this information with you. Please select one of the options below:"
      }
    },
    {
      "content_id": "chips-001-simple",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "Yes",
            "chip_value": "yes",
            "chip_actions": [
              {
                "action_id": "confirm-yes",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "Yes"
                }
              }
            ]
          },
          {
            "chip_text": "No",
            "chip_value": "no",
            "chip_actions": [
              {
                "action_id": "confirm-no",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "No"
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

### Styled Approval Workflow

Professional approval workflow with styled chips for different actions and visual emphasis.

**Assistant Output**
```markdown
I need your approval for this proposal. Please choose one of the options below:

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "approval-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need your approval for this proposal. Please choose one of the options below:"
      }
    },
    {
      "content_id": "chips-002-styled",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Approve",
            "chip_value": "approve",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "approve-action",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "chips-002-styled",
                  "selected_chip_value": "approve",
                  "selected_chip_text": "✅ Approve",
                  "simulated_user_message_text": "I approve"
                }
              }
            ]
          },
          {
            "chip_text": "📝 Request Changes",
            "chip_value": "request_changes",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "changes-action",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "chips-002-styled",
                  "selected_chip_value": "request_changes",
                  "selected_chip_text": "📝 Request Changes",
                  "simulated_user_message_text": "I want to request changes"
                }
              }
            ]
          },
          {
            "chip_text": "❌ Reject",
            "chip_value": "reject",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "reject-action",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "I reject this proposal"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Organization Type Selection

example interface organization categorization with intuitive icons and clear labeling.

**Assistant Output**

```markdown
I need to categorize your organization type to provide the best workspace refinement. Please select the category that best matches your organization:

**Message Payload**

```json
{
  "message_id": "example-organization-type-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "organization-type-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need to categorize your organization type to provide the best workspace refinement. Please select the category that best matches your organization:"
      }
    },
    {
      "content_id": "example-organization-types",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "🏢 Technology Services",
            "chip_value": "technology_services",
            "chip_actions": [
              {
                "action_id": "select-tech-services",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "technology_services",
                  "selected_chip_text": "🏢 Technology Services",
                  "simulated_user_message_text": "I choose Technology Services"
                }
              }
            ]
          },
          {
            "chip_text": "🍽️ Restaurant",
            "chip_value": "restaurant",
            "chip_actions": [
              {
                "action_id": "select-restaurant",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "restaurant",
                  "selected_chip_text": "🍽️ Restaurant",
                  "simulated_user_message_text": "I choose Restaurant"
                }
              }
            ]
          },
          {
            "chip_text": "🛍️ Retail Store",
            "chip_value": "retail_store",
            "chip_actions": [
              {
                "action_id": "select-retail",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "retail_store",
                  "selected_chip_text": "🛍️ Retail Store",
                  "simulated_user_message_text": "I choose Retail Store"
                }
              }
            ]
          },
          {
            "chip_text": "💼 Professional Services",
            "chip_value": "professional_services",
            "chip_actions": [
              {
                "action_id": "select-professional",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "professional_services",
                  "selected_chip_text": "💼 Professional Services",
                  "simulated_user_message_text": "I choose Professional Services"
                }
              }
            ]
          },
          {
            "chip_text": "🎯 Other",
            "chip_value": "other",
            "chip_actions": [
              {
                "action_id": "select-other",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "other",
                  "selected_chip_text": "🎯 Other",
                  "simulated_user_message_text": "I choose Other"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Workspace Approval Workflow

Final approval step for a sample workflow's workspace refinement process with clear success and warning styling.

**Assistant Output**

```markdown
Welcome! You are now the verified owner of your workspace. Take one final look at your prepared workspace, then approve it for publishing:

**Message Payload**

```json
{
  "message_id": "example-approval-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "approval-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## ✅ **Authentication Successful!**\n\nWelcome! You are now the verified owner of your workspace.\n\n### Final Step: Approve & Publish\n\nTake one final look at your prepared workspace, then approve it for publishing."
      }
    },
    {
      "content_id": "example-approval-chips",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Approve & Publish",
            "chip_value": "approve_publish",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "approve-publish",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-approval-chips",
                  "selected_chip_value": "approve_publish",
                  "selected_chip_text": "✅ Approve & Publish",
                  "simulated_user_message_text": "I approve and want to publish my workspace"
                }
              }
            ]
          },
          {
            "chip_text": "📝 Request Changes",
            "chip_value": "request_changes",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "request-changes",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-approval-chips",
                  "selected_chip_value": "request_changes",
                  "selected_chip_text": "📝 Request Changes",
                  "simulated_user_message_text": "I want to request changes to my workspace"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Organization Information Verification

a sample workflow's information verification system with clear yes/no/partial options for accuracy checking.

```markdown
I found specific information about your services. Can you confirm this accuracy so I can improve your workspace?

**Message Payload**

```json
{
  "message_id": "example-verification-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "verification-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I found that you offer **custom software development for healthcare providers**. Can you confirm this so I can improve your workspace?"
      }
    },
    {
      "content_id": "example-verification-chips",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Yes, that's correct",
            "chip_value": "confirm_healthcare",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "confirm-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "Yes, we offer custom software development for healthcare providers"
                }
              }
            ]
          },
          {
            "chip_text": "❌ No, that's wrong",
            "chip_value": "deny_healthcare",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "deny-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "No, that's not accurate about our services"
                }
              }
            ]
          },
          {
            "chip_text": "⚠️ Partially correct",
            "chip_value": "partial_healthcare",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "partial-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "That's partially correct, but needs clarification"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

**Full Assistant Output\***

**Assistant Output**

````markdown
_Assistant reasoning within output_
I need to confirm this information with you. Please select one of the options below:

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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need to confirm this information with you. Please select one of the options below:"
      }
    },
    {
      "content_id": "chips-001-simple",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "Yes",
            "chip_value": "yes",
            "chip_actions": [
              {
                "action_id": "confirm-yes",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "Yes"
                }
              }
            ]
          },
          {
            "chip_text": "No",
            "chip_value": "no",
            "chip_actions": [
              {
                "action_id": "confirm-no",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "No"
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

````

### Styled Approval Workflow

Professional approval workflow with styled chips for different actions and visual emphasis.

**Assistant Output**

```markdown
I need your approval for this proposal. Please choose one of the options below:

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "approval-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need your approval for this proposal. Please choose one of the options below:"
      }
    },
    {
      "content_id": "chips-002-styled",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Approve",
            "chip_value": "approve",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "approve-action",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "chips-002-styled",
                  "selected_chip_value": "approve",
                  "selected_chip_text": "✅ Approve",
                  "simulated_user_message_text": "I approve"
                }
              }
            ]
          },
          {
            "chip_text": "📝 Request Changes",
            "chip_value": "request_changes",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "changes-action",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "chips-002-styled",
                  "selected_chip_value": "request_changes",
                  "selected_chip_text": "📝 Request Changes",
                  "simulated_user_message_text": "I want to request changes"
                }
              }
            ]
          },
          {
            "chip_text": "❌ Reject",
            "chip_value": "reject",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "reject-action",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "I reject this proposal"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Organization Type Selection

example interface organization categorization with intuitive icons and clear labeling.

**Assistant Output**

```markdown
I need to categorize your organization type to provide the best workspace refinement. Please select the category that best matches your organization:

**Message Payload**

```json
{
  "message_id": "example-organization-type-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "organization-type-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need to categorize your organization type to provide the best workspace refinement. Please select the category that best matches your organization:"
      }
    },
    {
      "content_id": "example-organization-types",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "🏢 Technology Services",
            "chip_value": "technology_services",
            "chip_actions": [
              {
                "action_id": "select-tech-services",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "technology_services",
                  "selected_chip_text": "🏢 Technology Services",
                  "simulated_user_message_text": "I choose Technology Services"
                }
              }
            ]
          },
          {
            "chip_text": "🍽️ Restaurant",
            "chip_value": "restaurant",
            "chip_actions": [
              {
                "action_id": "select-restaurant",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "restaurant",
                  "selected_chip_text": "🍽️ Restaurant",
                  "simulated_user_message_text": "I choose Restaurant"
                }
              }
            ]
          },
          {
            "chip_text": "🛍️ Retail Store",
            "chip_value": "retail_store",
            "chip_actions": [
              {
                "action_id": "select-retail",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "retail_store",
                  "selected_chip_text": "🛍️ Retail Store",
                  "simulated_user_message_text": "I choose Retail Store"
                }
              }
            ]
          },
          {
            "chip_text": "💼 Professional Services",
            "chip_value": "professional_services",
            "chip_actions": [
              {
                "action_id": "select-professional",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "professional_services",
                  "selected_chip_text": "💼 Professional Services",
                  "simulated_user_message_text": "I choose Professional Services"
                }
              }
            ]
          },
          {
            "chip_text": "🎯 Other",
            "chip_value": "other",
            "chip_actions": [
              {
                "action_id": "select-other",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-organization-types",
                  "selected_chip_value": "other",
                  "selected_chip_text": "🎯 Other",
                  "simulated_user_message_text": "I choose Other"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Workspace Approval Workflow

Final approval step for a sample workflow's workspace refinement process with clear success and warning styling.

**Assistant Output**

```markdown
Welcome! You are now the verified owner of your workspace. Take one final look at your prepared workspace, then approve it for publishing:

**Message Payload**

```json
{
  "message_id": "example-approval-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "approval-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## ✅ **Authentication Successful!**\n\nWelcome! You are now the verified owner of your workspace.\n\n### Final Step: Approve & Publish\n\nTake one final look at your prepared workspace, then approve it for publishing."
      }
    },
    {
      "content_id": "example-approval-chips",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Approve & Publish",
            "chip_value": "approve_publish",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "approve-publish",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-approval-chips",
                  "selected_chip_value": "approve_publish",
                  "selected_chip_text": "✅ Approve & Publish",
                  "simulated_user_message_text": "I approve and want to publish my workspace"
                }
              }
            ]
          },
          {
            "chip_text": "📝 Request Changes",
            "chip_value": "request_changes",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "request-changes",
                "action_type": "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "actionable_chips_content_id": "example-approval-chips",
                  "selected_chip_value": "request_changes",
                  "selected_chip_text": "📝 Request Changes",
                  "simulated_user_message_text": "I want to request changes to my workspace"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

````

### Organization Information Verification

a sample workflow's information verification system with clear yes/no/partial options for accuracy checking.

**Assistant Output**

```markdown
I found specific information about your services. Can you confirm this accuracy so I can improve your workspace?

**Message Payload**

```json
{
  "message_id": "example-verification-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "verification-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I found that you offer **custom software development for healthcare providers**. Can you confirm this so I can improve your workspace?"
      }
    },
    {
      "content_id": "example-verification-chips",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "✅ Yes, that's correct",
            "chip_value": "confirm_healthcare",
            "chip_style": "CHIP_STYLE_PRIMARY",
            "chip_actions": [
              {
                "action_id": "confirm-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "Yes, we offer custom software development for healthcare providers"
                }
              }
            ]
          },
          {
            "chip_text": "❌ No, that's wrong",
            "chip_value": "deny_healthcare",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "deny-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "No, that's not accurate about our services"
                }
              }
            ]
          },
          {
            "chip_text": "⚠️ Partially correct",
            "chip_value": "partial_healthcare",
            "chip_style": "CHIP_STYLE_SECONDARY",
            "chip_actions": [
              {
                "action_id": "partial-healthcare-services",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "That's partially correct, but needs clarification"
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
````

**Full Assistant Output\***

**Assistant Output**

````markdown
_Assistant reasoning within output_
I need to confirm this information with you. Please select one of the options below:

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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I need to confirm this information with you. Please select one of the options below:"
      }
    },
    {
      "content_id": "chips-001-simple",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "actionable_chips_selection_mode": "SINGLE",
        "actionable_chips_selection_state": "PENDING_SELECTION",
        "actionable_chips_items": [
          {
            "chip_text": "Yes",
            "chip_value": "yes",
            "chip_actions": [
              {
                "action_id": "confirm-yes",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "Yes"
                }
              }
            ]
          },
          {
            "chip_text": "No",
            "chip_value": "no",
            "chip_actions": [
              {
                "action_id": "confirm-no",
                "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
                "action_data": {
                  "target": "CHAT",
                  "role": "USER",
                  "text": "No"
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

```

---

## Implementation Guidelines

### Best Practices

- **Concise Text**: Keep chip text short and descriptive (1-3 words ideal)
- **Clear Purpose**: Each chip should have a distinct, understandable purpose
- **Logical Grouping**: Group related chips together conceptually
- **Reasonable Limits**: Don't overwhelm users (typically 3-8 chips)
- **Appropriate Styles**: Use styles that match semantic meaning
- **Single Selection**: Current implementation supports single selection only

### Chip Styles

- **SUCCESS**: Positive confirmations, approval actions
- **WARNING**: Caution actions, partial confirmations
- **DANGER**: Negative actions, rejections
- **Default**: Standard options without special emphasis

### Common Use Cases

- **Quick Confirmations**: Yes/No decisions
- **Category Selection**: Organization types, service categories
- **Status Updates**: Priority levels, availability options
- **Workflow Branching**: Directing conversation flow based on choices

### When to Use Chips vs Cards

- **Use Chips**: Simple options, quick selections, short text
- **Use Cards**: Complex information, detailed descriptions, significant choices

---

## Best Practices

### Content Guidelines

- Keep chip text concise and action-oriented
- Use consistent visual styles across related chips
- Provide clear, descriptive labels for accessibility
- Group logically related options together

### Action Design

- Use appropriate action types for expected behavior
- Provide meaningful feedback for user selections
- Handle errors gracefully with clear recovery options
- Chain actions logically to guide users through workflows

### Performance

- Limit chip count to prevent overwhelming users
- Use efficient action processing to minimize response time
- Consider mobile-friendly sizing and touch targets
- Test keyboard navigation and screen reader compatibility

```

```

```
