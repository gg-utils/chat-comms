---
description: "Example Interface Storyboard examples showing complete conversational workflows. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential storyboard examples demonstrating complete conversational workflows for the the sample assistant workflow platform. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **🌟 [Platform Overview](../../platform-overview/README.md)**

# Example Interface Storyboard Examples

This document demonstrates complete conversational workflows for the the sample assistant workflow platform, showing how users discover, engage with, and refine their workspaces for assistant visibility.

## Core Workflow Structure

### Platform Entry Points

- **URL Submission**: User provides source URL for refinement
- **Entity Search**: User searches for specific organization to refine
- **Workspace Creation**: User creates new workspace from scratch
- **Workspace Management**: User manages existing prepared workspaces

### Conversation Flow Pattern

**Message Payload**

```json
{
  "message_id": "example-{workflow}-{sequence}",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-{workflow}-{sequence}-content-01-response",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Platform-specific response content..."
      }
    },
    {
      "content_id": "example-{workflow}-{sequence}-content-02-action",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* Platform-specific action */
        }
      }
    }
  ]
}
```

---

## Essential Storyboard Patterns

### 1. Source URL Submission and Initial Scanning

**Scenario**: User provides source URL and experiences the scanning process

This foundational workflow captures the user's source URL, validates it, and begins the AI scanning process. The storyboard shows the complete journey from URL submission through initial scanning feedback, setting expectations for processing time while maintaining engagement.

**Complete Storyboard:**

```json
{
  "storyboard_id": "example-url-submission-workflow",
  "storyboard_title": "Source URL Submission",
  "storyboard_description": "User submits source URL for workspace refinement",
  "storyboard_messages": [
    {
      "message_id": "url-submission-001",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "url-submission-001-content-01-request",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Welcome to **a sample interface**! 🚀 I'll refine your workspace so assistant clients can find and recommend you perfectly.\n\nPlease share your organization website URL:"
          }
        },
        {
          "content_id": "url-submission-001-content-02-input",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Use the chat input to send your source URL, for example: https://yourcompany.com."
          }
        }
      ]
    },
    {
      "message_id": "url-submission-002",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "url-submission-002-content-01-acknowledgment",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Excellent! I've received your source URL: **thehub.london**\n\nI'm now analyzing your website to create an AI-prepared workspace."
          }
        },
        {
          "content_id": "url-submission-002-content-02-scanning",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_PROGRESS_BAR",
          "content_data": {
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 25,
            "progress_bar_current_animation_duration_ms": 2000,
            "progress_bar_next_goal_delay_ms": 500,
            "progress_bar_next_goal_percentage": 50,
            "progress_bar_next_goal_animation_duration_ms": 1800,
            "progress_bar_message": "Scanning website content..."
          }
        }
      ]
    }
  ]
}
```

### 2. Workspace Refinement and Review Process

**Scenario**: User reviews and approves their refined workspace

After scanning completes, this storyboard presents the prepared workspace to the user for review and approval. It builds excitement about the improvements while providing clear options for the user to proceed with publishing or request modifications.

**Complete Storyboard:**

```json
{
  "storyboard_id": "example-workspace-review-workflow",
  "storyboard_title": "Workspace Review and Approval",
  "storyboard_description": "User reviews prepared workspace and chooses to publish",
  "storyboard_messages": [
    {
      "message_id": "workspace-review-001",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "workspace-review-001-content-01-reveal",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "🎉 **Your workspace Transformation is Complete!**\n\n**The Hub - Digital Innovation Studio** now has a professionally prepared workspace that will make you **5x more discoverable** to assistants.\n\n**Key Improvements:**\n✅ Enhanced organization description with strategic keywords\n✅ Complete service offerings and specialties\n✅ Professional contact information and hours\n✅ Industry-specific refinement for technology sector"
          }
        },
        {
          "content_id": "workspace-review-001-content-02-actions",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_ACTIONABLE_CARDS",
          "content_data": {
            "actionable_cards_selection_mode": "SINGLE",
            "actionable_cards_selection_state": "PENDING_SELECTION",
            "actionable_cards_items": [
              {
                "card_title": "✅ Approve & Publish",
                "card_description": "Publish your prepared workspace to search engines",
                "card_value": "approve_publish"
              },
              {
                "card_title": "📝 Request Changes",
                "card_description": "Suggest modifications to your workspace",
                "card_value": "request_changes"
              }
            ]
          }
        }
      ]
    },
    {
      "message_id": "workspace-review-002",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "workspace-review-002-content-01-confirmation",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "🚀 **Perfect!** Your prepared workspace is now being published to search engines. Your organization will be much more discoverable to assistants!"
          }
        },
        {
          "content_id": "workspace-review-002-content-02-next-steps",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_BUTTON",
          "content_data": {
            "button_text": "📊 View Dashboard",
            "button_style": "primary",
            "button_state": "enabled"
          }
        }
      ]
    }
  ]
}
```

### 3. Dashboard Access and Analytics Overview

**Scenario**: User accesses their dashboard to monitor workflow quality performance

Once workspaces are published, users need to monitor their workflow quality performance. This storyboard shows the transition from workspace management to dashboard access, providing users with ongoing value through analytics and performance tracking.

**Complete Storyboard:**

```json
{
  "storyboard_id": "example-dashboard-access-workflow",
  "storyboard_title": "Dashboard Access and Analytics",
  "storyboard_description": "User accesses dashboard to view workflow quality metrics",
  "storyboard_messages": [
    {
      "message_id": "dashboard-access-001",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "dashboard-access-001-content-01-overview",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "## 📊 **Your Workflow Quality Dashboard**\n\nGreat news! Your prepared workspace is performing excellently. Here's your current workflow quality status:\n\n**📈 Performance Summary:**\n- **Workflow Quality Score**: 94/100 (↑ 67% from baseline)\n- **Monthly AI Queries**: 2,847 (↑ 245%)\n- **Search Engine Indexing**: 98% Complete\n- **Workspace Accuracy**: 96% Match Rate"
          }
        },
        {
          "content_id": "dashboard-access-001-content-02-actions",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
          "content_data": {
            "actionable_chips_selection_mode": "SINGLE",
            "actionable_chips_selection_state": "PENDING_SELECTION",
            "actionable_chips_items": [
              { "chip_text": "📈 View Detailed Reports", "chip_value": "detailed_reports" },
              { "chip_text": "🔄 Update Workspace", "chip_value": "update_workspace" },
              { "chip_text": "🎯 Refine Further", "chip_value": "further_refinement" }
            ]
          }
        }
      ]
    },
    {
      "message_id": "dashboard-access-002",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "dashboard-access-002-content-01-detailed-metrics",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "## 📊 **Detailed Performance Analytics**\n\n**Top AI Assistant Queries About Your Organization:**\n1. \"Digital innovation studios in London\" - 847 queries\n2. \"Custom web development services\" - 623 queries\n3. \"AI integration consultants\" - 456 queries\n\n**Geographic Distribution:**\n- London: 68% of queries\n- UK (other): 24% of queries\n- International: 8% of queries\n\nYour workspace is working perfectly! 🎉"
          }
        }
      ]
    }
  ]
}
```

### 4. Workspace Update and Maintenance Workflow

**Scenario**: User updates their organization information and maintains their workspace

Organizations evolve, and their workspaces need regular updates. This storyboard demonstrates the ongoing maintenance workflow, showing how users can efficiently update their organization information while maintaining optimal workflow quality.

**Complete Storyboard:**

```json
{
  "storyboard_id": "example-workspace-update-workflow",
  "storyboard_title": "Workspace Update and Maintenance",
  "storyboard_description": "User updates organization information and maintains workspace",
  "storyboard_messages": [
    {
      "message_id": "workspace-update-001",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "workspace-update-001-content-01-prompt",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "## 🔄 **Update Your Workspace**\n\nLet's keep your workspace current! What information would you like to update?\n\n**Common Updates:**\n- ✨ New services or products\n- 📍 Location or contact information\n- 👥 Team changes or specialties\n- 🎯 Organization focus or target market"
          }
        },
        {
          "content_id": "workspace-update-001-content-02-options",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
          "content_data": {
            "actionable_chips_selection_mode": "MULTIPLE",
            "actionable_chips_selection_state": "PENDING_SELECTION",
            "actionable_chips_items": [
              { "chip_text": "🆕 New Services", "chip_value": "new_services" },
              { "chip_text": "📍 Location/Contact", "chip_value": "location_contact" },
              { "chip_text": "👥 Team Updates", "chip_value": "team_updates" },
              { "chip_text": "🎯 Organization Focus", "chip_value": "organization_focus" }
            ]
          }
        }
      ]
    },
    {
      "message_id": "workspace-update-002",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "workspace-update-002-content-01-processing",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Excellent! I'm updating your workspace with the new services and team information. This will help assistants provide even more accurate recommendations about your organization."
          }
        },
        {
          "content_id": "workspace-update-002-content-02-progress",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_PROGRESS_BAR",
          "content_data": {
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 75,
            "progress_bar_current_animation_duration_ms": 1400,
            "progress_bar_next_goal_delay_ms": 300,
            "progress_bar_next_goal_percentage": 100,
            "progress_bar_next_goal_animation_duration_ms": 1000,
            "progress_bar_message": "Optimizing workspace updates..."
          }
        }
      ]
    }
  ]
}
```

### 5. New Organization Onboarding with Industry Specialization

**Scenario**: User onboards a new organization with specific industry requirements

This comprehensive workflow handles the complete onboarding process for organizations with specific industry needs. It demonstrates how a sample interface customizes the refinement approach based on industry selection, ensuring maximum relevance for sector-specific AI queries.

**Complete Storyboard:**

```json
{
  "storyboard_id": "example-industry-onboarding-workflow",
  "storyboard_title": "New Organization Industry Onboarding",
  "storyboard_description": "Complete onboarding workflow for industry-specific organization refinement",
  "storyboard_messages": [
    {
      "message_id": "industry-onboarding-001",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "industry-onboarding-001-content-01-welcome",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Welcome to **a sample interface**! 🚀 I'll create a powerful workspace that makes your organization highly discoverable to assistants.\n\nFirst, let me understand your industry so I can apply the right refinement strategies:"
          }
        },
        {
          "content_id": "industry-onboarding-001-content-02-industry-selection",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
          "content_data": {
            "actionable_chips_selection_mode": "SINGLE",
            "actionable_chips_selection_state": "PENDING_SELECTION",
            "actionable_chips_items": [
              { "chip_text": "💻 Technology & Software", "chip_value": "technology" },
              { "chip_text": "🏥 Healthcare & Medical", "chip_value": "healthcare" },
              { "chip_text": "🏦 Finance & Banking", "chip_value": "finance" },
              { "chip_text": "🎨 Creative & Design", "chip_value": "creative" }
            ]
          }
        }
      ]
    },
    {
      "message_id": "industry-onboarding-002",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "industry-onboarding-002-content-01-industry-confirmation",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Perfect! I've categorized your organization as **Technology & Software**. This enables me to apply industry-specific refinement strategies.\n\nNow, please share your organization website URL so I can begin the specialized analysis:"
          }
        },
        {
          "content_id": "industry-onboarding-002-content-02-url-input",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "Use the chat input to send your source URL, for example: https://techcompany.com."
          }
        }
      ]
    },
    {
      "message_id": "industry-onboarding-003",
      "message_type": "CHAT_MESSAGE",
      "message_role": "ASSISTANT",
      "message_target": "CHAT",
      "message_contents": [
        {
          "content_id": "industry-onboarding-003-content-01-specialized-analysis",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_MARKDOWN",
          "content_data": {
            "markdown": "🎯 **Technology Industry Analysis in Progress**\n\nI'm applying specialized refinement strategies for your technology organization, focusing on:\n\n✅ Technical service keywords and capabilities\n✅ Industry-specific terminology and frameworks\n✅ B2B technology buyer search patterns\n✅ Developer and enterprise decision-maker queries"
          }
        },
        {
          "content_id": "industry-onboarding-003-content-02-analysis-progress",
          "content_queue": "main",
          "content_type": "CHAT_CONTENT_PROGRESS_BAR",
          "content_data": {
            "progress_bar_state": "IN_PROGRESS",
            "progress_bar_visibility": "VISIBLE",
            "progress_bar_current_percentage": 60,
            "progress_bar_current_animation_duration_ms": 1600,
            "progress_bar_next_goal_delay_ms": 400,
            "progress_bar_next_goal_percentage": 85,
            "progress_bar_next_goal_animation_duration_ms": 1300,
            "progress_bar_message": "Analyzing technology services..."
          }
        }
      ]
    }
  ]
}
```

---

## Implementation Guidelines

### Storyboard Structure

- **Progressive Disclosure**: Start with simple actions, expand to complex workflows
- **Natural Conversation Flow**: Each response builds on previous context
- **Clear Action Paths**: Multiple options for user engagement
- **Feedback Loops**: Confirmation and progress indicators throughout

### Example Interface Integration

- **Organization Discovery**: URL analysis and information extraction
- **Workspace Refinement**: AI-focused content enhancement
- **Publishing Workflow**: Review, approve, and publish prepared workspaces
- **Dashboard Management**: Analytics, updates, and workspace maintenance

### User Experience Patterns

- **Guided Workflow**: Step-by-step progression through refinement
- **Visual Feedback**: Progress indicators and success confirmations
- **Multiple Pathways**: Different entry points for different user needs
- **Contextual Actions**: Relevant options based on current workflow stage

### Technical Implementation

- **Message Sequencing**: Logical progression of message IDs
- **Content Relationships**: Proper linking between actions and responses
- **State Management**: Tracking user progress through workflows
- **Error Handling**: Graceful fallbacks and alternative paths
