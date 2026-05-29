---
description: "Usage examples for CHAT_MESSAGE type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for composing complete chat messages with various content types and interaction patterns. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_MESSAGE Specification](../type-specifications/CHAT_MESSAGE.md)**

# CHAT_MESSAGE Usage Examples

This document contains practical usage examples for the `CHAT_MESSAGE` type, demonstrating real-world implementation scenarios and message composition patterns.

## Core Implementation

### Basic Message Format

**Message Payload**

```json
{
  "message_id": "chatmessage-{id}",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    /* content objects */
  ]
}
```

### Optional Debug Flag

```json
{
  "debug": true
}
```

---

## Essential Patterns

### 1. Simple Confirmation Message

**Scenario**: Assistant confirms user's action and provides next steps

When a user completes an action that requires acknowledgment, the assistant should provide clear confirmation with contextual next steps. This pattern maintains conversation flow while giving users confidence their action was successful.

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
        "markdown": "Perfect! I've successfully saved your preferences. Your dashboard will now show the updated settings."
      }
    }
  ]
}
```

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'm providing clear confirmation that the user's preferences have been saved successfully, ensuring they understand the action was completed and explaining the immediate benefit applicable to example interface settings management.

_Message to be processed by the UI_

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
        "markdown": "Perfect! I've successfully saved your preferences. Your dashboard will now show the updated settings."
      }
    }
  ]
}
```
````

### 2. Information Request with Follow-up

**Scenario**: Assistant requests specific information while providing context

This pattern helps gather necessary information from users while explaining why the information is needed. It maintains transparency and helps users understand the value of providing the requested details.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-request",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "To provide you with the most accurate recommendations, I'll need to know your organization location. This helps me suggest relevant local services and compliance requirements."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-input",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Use the chat input to send your organization location, for example: London, UK."
      }
    }
  ]
}
```

### 3. Multi-Content Complex Response

**Scenario**: Assistant provides detailed information with multiple content types

When users need comprehensive information, combining different content types creates a rich, engaging experience. This pattern works well for onboarding, tutorials, or detailed explanations.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-introduction",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## Welcome to Your Dashboard Setup\n\nI'll help you configure your personalized dashboard. This process takes about 2 minutes and will refine your workflow."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 25,
        "progress_bar_current_animation_duration_ms": 1300,
        "progress_bar_next_goal_delay_ms": 350,
        "progress_bar_next_goal_percentage": 60,
        "progress_bar_next_goal_animation_duration_ms": 1700,
        "progress_bar_message": "Analyzing preferences..."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-03-next-step",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Continue Setup",
        "button_style": "primary",
        "button_state": "enabled"
      }
    }
  ]
}
```

---

## Example Interface Examples

### 4. Source URL Submission

**Scenario**: User submits their source URL for a sample workspace refinement

This pattern handles the critical first step in a sample workflow's workflow - capturing the source URL and initiating the analysis process. The response acknowledges the submission while setting expectations for the scanning process.

**Message Payload**

```json
{
  "message_id": "example-url-submission-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-url-submission-001-content-01-acknowledgment",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Excellent! I've received your source URL: **thehub.london**\n\nI'm now analyzing your website to understand your organization and create an AI-prepared workspace that will make you much more discoverable to assistants."
      }
    },
    {
      "content_id": "example-url-submission-001-content-02-scanning",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 15,
        "progress_bar_current_animation_duration_ms": 1800,
        "progress_bar_next_goal_delay_ms": 600,
        "progress_bar_next_goal_percentage": 40,
        "progress_bar_next_goal_animation_duration_ms": 2200,
        "progress_bar_message": "Scanning website content..."
      }
    }
  ]
}
```

### 5. Workspace Refinement Completion

**Scenario**: a sample interface completes workspace setup and presents results

After scanning and refinement, this pattern reveals the transformed workspace to the user. It builds excitement about the improvements while providing clear next steps for approval and publishing.

**Message Payload**

```json
{
  "message_id": "example-refinement-complete-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-refinement-complete-001-content-01-reveal",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "🎉 **Your workspace Transformation is Complete!**\n\n**The Hub - Digital Innovation Studio** now has a professionally prepared workspace that will make you **5x more discoverable** to assistants.\n\n**Key Improvements:**\n✅ Enhanced organization description with strategic keywords\n✅ Complete service offerings and specialties\n✅ Professional contact information and hours\n✅ Industry-specific refinement for technology sector\n\nReady to review your new workspace?"
      }
    },
    {
      "content_id": "example-refinement-complete-001-content-02-action",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "🎨 View My Prepared Workspace",
        "button_style": "primary",
        "button_state": "enabled"
      }
    }
  ]
}
```

---

## Implementation Guidelines

### Message ID Format

- Use descriptive prefixes: `example-`, `chatmessage-`, `system-`
- Include sequential numbering: `001`, `002`, etc.
- Format: `{prefix}-{descriptor}-{number}`

### Content Organization

- **Lead with context** - Start with explanatory markdown
- **Follow with interaction** - Add buttons, chips, or cards
- **End with actions** - Include clear next steps

### Timing Control

- Use `content_delay` for inter-item pacing
- Use `APP_ACTION_WAIT_FOR_USER_INPUT` for explicit user-gated progression
- Consider user reading time and processing needs

### Example Interface Patterns

- **Welcome messages** - Friendly, explanatory, action-oriented
- **Progress updates** - Clear status, percentage, descriptive messages
- **Completion messages** - Celebratory, comprehensive, clear next steps
- **Authentication flows** - Secure, professional, user-friendly

---

## Content Delay Patterns

The `content_delay` field enables fine-grained timing control between content items within the same queue. This allows natural-feeling animations and deliberate pacing.

### Single Content Item with Delay

**Scenario**: Display an introduction, pause for effect, then show the next message

**Message Payload**

```json
{
  "message_id": "chatmessage-delay-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-delay-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_delay": 800,
      "content_data": {
        "markdown": "I've found some interesting insights about your organization..."
      }
    },
    {
      "content_id": "chatmessage-delay-001-content-02-reveal",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Your workflow quality score is **87/100** - that's in the top 15% of organizations in your industry!"
      }
    }
  ]
}
```

### Multiple Content Items with Delay on Last Item

**Scenario**: Display a sequence of content items with a delay only on the last item to create anticipation before the next message

When building message sequences, place `content_delay` on the **last** content item to create a pause before the next message or user interaction.

**Message Payload**

```json
{
  "message_id": "chatmessage-delay-002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-delay-002-content-01-status",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## Analysis Complete\n\nI've finished analyzing your website."
      }
    },
    {
      "content_id": "chatmessage-delay-002-content-02-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_data": {
        "progress_bar_state": "COMPLETE",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 100,
        "progress_bar_message": "Analysis complete!"
      }
    },
    {
      "content_id": "chatmessage-delay-002-content-03-transition",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_delay": 1200,
      "content_data": {
        "markdown": "Let me show you the results..."
      }
    }
  ]
}
```

### Combined with content_queue for Parallel Processing

**Scenario**: Stream a website panel and reasoning panel in parallel, with delays for natural pacing

When using `content_queue` for parallel processing, `content_delay` works within each queue independently. This enables sophisticated timing patterns across multiple parallel streams.

**Message Payload**

```json
{
  "message_id": "chatmessage-parallel-delay-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-parallel-delay-001-content-01-website",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_queue": "website",
      "content_delay": 500,
      "content_width": "WIDTH_FULL",
      "content_data": {
        "panel_header_icon": "panel-icon-web",
        "panel_header_title": "example.com",
        "panel_header_description": "Loading website preview...",
        "panel_body_type": "PANEL_BODY_IMAGE",
        "panel_body_aspect_ratio": "16/9",
        "panel_body_data": {
          "image_url": "https://example.com/screenshot.png",
          "image_alt_text": "Website screenshot"
        }
      }
    },
    {
      "content_id": "chatmessage-parallel-delay-001-content-02-reasoning",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_queue": "reasoning",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "panel_header_title": "Analysis",
        "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
        "panel_body_aspect_ratio": "auto",
        "panel_body_data": {
          "markdown": "## Initial Observations\n\nExamining the website structure and content for workflow quality factors..."
        }
      }
    },
    {
      "content_id": "chatmessage-parallel-delay-001-content-03-main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_queue": "main",
      "content_delay": 1000,
      "content_data": {
        "markdown": "I'm analyzing your website now. You can see my thought process in the panel above."
      }
    }
  ]
}
```

### Staggered Reveal Pattern

**Scenario**: Reveal information progressively with intentional delays between each piece

**Message Payload**

```json
{
  "message_id": "chatmessage-staggered-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-staggered-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_delay": 600,
      "content_data": {
        "markdown": "Here's what I discovered about your AI presence:"
      }
    },
    {
      "content_id": "chatmessage-staggered-001-content-02-finding1",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_delay": 400,
      "content_data": {
        "markdown": "1. **Search Visibility**: Your organization appears in 73% of relevant AI searches"
      }
    },
    {
      "content_id": "chatmessage-staggered-001-content-03-finding2",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_delay": 400,
      "content_data": {
        "markdown": "2. **Information Accuracy**: 89% of AI-provided details are correct"
      }
    },
    {
      "content_id": "chatmessage-staggered-001-content-04-finding3",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "3. **Recommendation Rate**: You're recommended 2.3x more than industry average"
      }
    }
  ]
}
```

---

## Best Practices

### Content Delay Placement

- **Place `content_delay` on the LAST content item** when you want a pause before the next message
- The delay is applied whenever `content_delay` is present on an item
- Use delays to create natural pacing and build anticipation

### Message-Level Delay Removed

| Approach                   | Use Case                                                   |
| -------------------------- | ---------------------------------------------------------- |
| `content_delay`            | Fine-grained timing between content items within a message |
| Legacy message-level delay | Removed from API. Do not use.                              |

**Recommendation**: Use `content_delay` for timing. It provides granular control and aligns with queue-based processing.

### Use content_queue for Parallel Content Processing

When displaying multiple independent content streams (e.g., a website panel + reasoning panel + chat message):

1. Assign each stream to a different `content_queue`
2. Content in the same queue processes sequentially
3. Content in different queues processes in parallel
4. `content_delay` works independently within each queue

### Timing Guidelines

| Delay Duration | Use Case                                     |
| -------------- | -------------------------------------------- |
| 200-400ms      | Quick transitions, maintaining flow          |
| 500-800ms      | Standard pauses, allowing content to be read |
| 1000-1500ms    | Dramatic pauses, building anticipation       |
| 2000ms+        | Only for major reveals or emphasis           |

### User Interaction

- All delays are skippable by user interaction (typing, pressing Enter)
- Delays respect the processor pause state
- Consider that users may be impatient - keep total delay time reasonable
