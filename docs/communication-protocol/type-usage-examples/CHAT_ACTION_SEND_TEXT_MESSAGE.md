---
description: "Usage examples for CHAT_ACTION_SEND_TEXT_MESSAGE in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for simulating user text input within chat interfaces to enable automated workflows and conversation continuations. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_SEND_TEXT_MESSAGE Specification](../type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md)**

# CHAT_ACTION_SEND_TEXT_MESSAGE Usage Examples

This action type simulates user text input within the chat interface, enabling automated workflows, confirmations, and seamless conversation continuations.

## Core Implementation

### Basic Action Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-{action-identifier}",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "message content"
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
      "content_id": "chatmessage-{id}-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'll send your response..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_SEND_TEXT_MESSAGE payload */
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Simple User Confirmation

Basic yes/no confirmations and simple responses for workflow automation.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll send your confirmation to proceed with the analysis, enabling seamless workflow automation for the user's decision.

_Message to be processed by the UI_

```json
{
  "action_id": "chatmessage-0000001-confirm-selection",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "Yes, I'd like to proceed with the analysis"
  }
}
```
````

### Complex Selection with Context

Detailed selections with configuration parameters for comprehensive system setup.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll send your detailed configuration selection to set up the e-commerce analytics platform, automating the complex selection process for better user experience.

_Message to be processed by the UI_

```json
{
  "action_id": "chatmessage-0000002-select-configuration",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "Configure E-commerce Analytics Platform with Enterprise Integration: all standard features plus premium support, advanced machine learning insights, custom integrations, and priority support for production environment"
  }
}
```
````

### Source URL Submission

example interface initial organization identification for workflow quality scanning workflow.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll submit your source URL to start the workflow quality analysis, initiating a sample workflow's comprehensive source scanning workflow.

_Message to be processed by the UI_

```json
{
  "message_id": "example-url-submitted-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-url-submitted-001-content-01-confirmation",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Perfect! I'll analyze **https://thehub.ltd** and start gathering information about your organization from multiple assistants."
      }
    },
    {
      "content_id": "example-url-submitted-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-submit-organization-url",
          "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
          "action_data": {
            "target": "CHAT",
            "role": "USER",
            "text": "https://thehub.ltd"
          }
        }
      }
    }
  ]
}
```
````

### Workspace Refinement Confirmation

example interface confirming workspace creation and publishing workflow initiation.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll confirm your request to create and publish your prepared workspace, advancing through a sample workflow's workspace refinement workflow seamlessly.

_Message to be processed by the UI_

```json
{
  "action_id": "example-confirm-refinement",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "Yes, please create my prepared workspace and publish it"
  }
}
```
````

### Organization Information Correction

example interface updating organization details during workspace refinement process.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll update your organization information with the corrected details, ensuring accuracy in a sample workflow's workspace refinement process.

_Message to be processed by the UI_

```json
{
  "action_id": "example-correct-organization-name",
  "action_type": "CHAT_ACTION_SEND_TEXT_MESSAGE",
  "action_data": {
    "target": "CHAT",
    "role": "USER",
    "text": "Actually, the full organization name is 'The Hub - Digital Innovation Studio'"
  }
}
```
````

---

## Implementation Guidelines

### Best Practices

- **Role Consistency**: Always use `"USER"` for simulating user input
- **Target Specification**: Always use `"CHAT"` for chat interface actions
- **Natural Language**: Make messages conversational and contextual
- **Clear Intent**: Ensure user's intent is obvious from message content

### Workflow Automation

- **Confirmations**: Enable single-click confirmations for multi-step processes
- **Selections**: Automate complex option selections with detailed context
- **Corrections**: Allow easy correction of organization information
- **Context Preservation**: Include relevant context from current interaction

### Integration Patterns

- **Canvas Opening**: Combine with `CANVAS_ACTION_OPEN` for detailed views
- **Button Updates**: Chain with `CHAT_ACTION_UPDATE_BUTTON` for status changes
- **Progress Tracking**: Integrate with `CHAT_ACTION_UPDATE_PROGRESS_BAR` for workflows
- **Maintain Continuity**: Ensure messages flow naturally with conversation

### Common Use Cases

- **Quick Confirmations**: Yes/No decisions and simple acknowledgments
- **Complex Selections**: Detailed configuration choices and multi-parameter options
- **Organization Data Entry**: URL submissions and organization information updates
- **Workflow Progression**: Moving conversations forward through automated responses

---

## Best Practices

### Message Design

- **Natural Language**: Use conversational, non-robotic language
- **Structured Data**: Format complex information clearly
- **Consistent Voice**: Maintain consistent tone throughout
- **Clear Purpose**: Make each message's intent immediately obvious

### Error Handling

- **Recovery Actions**: Provide clear paths for error recovery
- **Retry Mechanisms**: Include retry options for failed operations
- **Context Preservation**: Maintain conversation state during error recovery
- **Graceful Degradation**: Handle failures without breaking workflow

### Performance Considerations

- **Efficient Processing**: Minimize processing time for simple confirmations
- **Batch Operations**: Group related actions when possible
- **State Management**: Efficiently manage conversation state transitions
- **Response Timing**: Consider timing of automated responses in user experience
