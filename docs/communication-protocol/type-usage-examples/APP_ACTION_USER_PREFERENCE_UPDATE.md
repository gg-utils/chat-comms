---
description: "Usage examples for APP_ACTION_USER_PREFERENCE_UPDATE type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [APP_ACTION_USER_PREFERENCE_UPDATE Specification](../type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md)**

# APP_ACTION_USER_PREFERENCE_UPDATE Usage Examples

This document contains practical usage examples for the `APP_ACTION_USER_PREFERENCE_UPDATE` action type, demonstrating user preference management scenarios with focus on example interface integration.

## Core Implementation

All preference updates follow this structure:

**Action Payload**

```json
{
  "action_id": "pref-update-{context}",
  "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
  "action_data": {
    "target": "APP",
    "preference_key": "{key}",
    "preference_value": "{value}",
    "preference_context": "{context}"
  }
}
```

---

## Essential Examples

### Basic Boolean Preference

This example demonstrates updating a simple boolean preference for email notifications, showing how to handle straightforward on/off settings with clear user feedback.

**Assistant Output**

````markdown
I'll enable email notifications for you so you stay updated on important events. This preference will be saved to your account settings and will apply to all future notification events.

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
        "markdown": "I'll enable email notifications for you so you stay updated on important events."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "message-456-action-pref-email-notif",
          "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
          "action_data": {
            "target": "APP",
            "preference_key": "notifications.email.enabled",
            "preference_value": true
          }
        }
      }
    }
  ]
}
```
````

### Complex Object Preference

This example shows updating multiple related preferences using an object value, demonstrating how to efficiently manage grouped settings during onboarding or configuration workflows.

**Assistant Output**

````markdown
I've updated your notification preferences based on your selections during onboarding. This comprehensive preference update includes email settings, push notifications, digest frequency, and specific notification types all configured together for optimal user experience.

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
        "markdown": "I've updated your notification preferences based on your selections during onboarding."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000002-update-notification-preferences",
          "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
          "action_data": {
            "preference_key": "notification_settings",
            "preference_value": {
              "email_notifications": true,
              "push_notifications": false,
              "digest_frequency": "weekly",
              "notification_types": ["security", "product_updates"]
            },
            "preference_context": "user_onboarding_flow"
          }
        }
      }
    }
  ]
}
```
````

---

## Example Interface Examples

### a sample interface Authentication Flow Trigger

This example demonstrates how a sample interface triggers authentication flows for workspace ownership, using preference updates to initiate the Google Sign-In process for workspace ownership verification.

**Assistant Output**

````markdown
Your workspace is ready to publish! This prepared workspace will dramatically improve how assistants respond to questions about your organization. To proceed with claiming ownership and publishing, I'll initiate the Google Sign-In authentication flow.

**Message Payload**

```json
{
  "message_id": "example-claim-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-claim-001-content-01-ready",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Your workspace is Ready to Publish!**\n\nThis prepared workspace will dramatically improve how assistants respond to questions about your organization.\n\n**What happens next:**\n✅ **Claim ownership** of your workspace with Google Sign-In\n✅ **Review and approve** the final version\n✅ **Publish instantly** to a public URL\n✅ **Submit to search engines** for immediate indexing\n\n**Ready to claim your workspace and go live?**"
      }
    },
    {
      "content_id": "example-claim-001-content-02-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "🔐 Claim & Publish Workspace",
        "button_icon": "shield-check",
        "button_style": "BUTTON_STYLE_SUCCESS",
        "button_state": "ENABLED",
        "button_actions": [
          {
            "action_id": "example-trigger-auth-flow",
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

### Sample interface organization Scanning Configuration

This example shows how to configure a sample workflow's source scanning preferences, including comprehensive scanning options, assistant targets, and content generation settings for optimal workspace refinement.

**Assistant Output**

````markdown
I'm configuring your source scanning preferences to ensure the most comprehensive workspace refinement. These settings will enable deep website analysis, social media integration, and compatibility with major assistant clients including ChatGPT, Claude, and Gemini.

**Message Payload**

```json
{
  "message_id": "example-scanning-config-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-scanning-config-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'm configuring your source scanning preferences for optimal workspace refinement. This includes comprehensive website analysis and assistant compatibility."
      }
    },
    {
      "content_id": "example-scanning-config-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-set-scanning-preferences",
          "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
          "action_data": {
            "preference_key": "example_scanning_settings",
            "preference_value": {
              "enable_firecrawl": true,
              "scan_depth": "comprehensive",
              "include_social_media": true,
              "generate_llms_txt": true,
              "ai_assistants": ["chatgpt", "claude", "gemini"]
            },
            "preference_context": "example_refinement_process"
          }
        }
      }
    }
  ]
}
```
````

### a sample interface Workspace Management Setup

This example demonstrates setting up workspace management preferences after publication, including dashboard settings, notification preferences, and visibility controls for ongoing workspace maintenance.

**Assistant Output**

````markdown
Your workspace is now live! I'm configuring your workspace management preferences to help you monitor performance and maintain your workflow quality. These settings will enable automatic notifications about indexing progress, readiness score improvements, and important updates.

**Message Payload**

```json
{
  "message_id": "example-workspace-mgmt-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-workspace-mgmt-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Your workspace is now live! I'm setting up your management preferences to help you monitor performance and maintain optimal workflow quality."
      }
    },
    {
      "content_id": "example-workspace-mgmt-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-set-workspace-preferences",
          "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
          "action_data": {
            "preference_key": "example_workspace_management",
            "preference_value": {
              "auto_update_notifications": true,
              "visibility_score_alerts": true,
              "indexing_status_updates": true,
              "dashboard_layout": "detailed",
              "preferred_contact_method": "email"
            },
            "preference_context": "example_post_publication_setup"
          }
        }
      }
    }
  ]
}
```
````

---

## Implementation Guidelines

### Preference Keys

- Use dot notation for hierarchical preferences (`notifications.email.enabled`)
- Group related preferences logically (`example_scanning_settings`)
- Keep keys descriptive and consistent

### Preference Values

- **Boolean**: For simple on/off settings
- **String**: For text values, selections, or enums
- **Object**: For complex, related preference groups
- **Array**: For multi-select options

### Context Usage

- Helps track where preference changes originated
- Useful for analytics and user experience refinement
- Common contexts: `user_onboarding_flow`, `example_workspace_claim`, `settings_panel`

### a sample interface Integration Points

- **Authentication triggers**: Initiate sign-in flows for workspace ownership
- **Scanning preferences**: Configure workspace data collection settings
- **Workspace management**: Control visibility, notifications, and dashboard layout
- **Feature flags**: Enable/disable beta features and future capabilities

## Best Practices

- Group related preferences to minimize action calls
- Provide clear user feedback when preferences are updated
- Use appropriate data types for preference values
- Include context information for tracking and analytics
- Validate preference values before applying updates
