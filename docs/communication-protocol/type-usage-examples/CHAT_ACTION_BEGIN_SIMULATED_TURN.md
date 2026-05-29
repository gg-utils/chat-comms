---
description: "Usage examples for CHAT_ACTION_BEGIN_SIMULATED_TURN in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for triggering UI scroll, screen clearing, and simulated turn initiation for workflow transitions. Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](../type-specifications/README.md)**

> **[CHAT_ACTION_BEGIN_SIMULATED_TURN Specification](../type-specifications/CHAT_ACTION_BEGIN_SIMULATED_TURN.md)**

# CHAT_ACTION_BEGIN_SIMULATED_TURN Usage Examples

This action type triggers the UI to scroll the chat, clear the screen, and begin a new simulated turn. It enables clean visual transitions between workflow phases and multi-phase conversations.

> **Note:** The `target` field is always `"CHAT"`. This is a constant value—the action exclusively operates on the chat interface.

## Core Implementation

### Basic Action Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-begin-simulated-turn",
  "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
  "action_data": {
    "target": "CHAT"
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
        "markdown": "Let me prepare your next steps..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_BEGIN_SIMULATED_TURN payload */
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Workflow Phase Transition

Transitioning from one workflow phase to the next.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll initiate the transition to the next workflow phase, clearing the previous context and preparing the UI for the next stage.

_Message to be processed by the UI_

```json
{
  "action_id": "chatmessage-0000001-begin-simulated-turn",
  "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
  "action_data": {
    "target": "CHAT"
  }
}
```
````

### Context Switching Between Subjects

Switching focus from one subject to another during multi-subject workflows.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll clear the current context and prepare the interface for focusing on the new subject, providing a clean visual transition for the user.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-transition",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Great! Now let's focus on the second subject..."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000002-begin-simulated-turn",
          "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    }
  ]
}
```
````

### Multi-Phase Conversation Separation

Creating visual separation between distinct phases of a guided workflow.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll create a clean visual break before starting the refinement recommendations phase, helping the user understand we're moving to a new stage of the process.

_Message to be processed by the UI_

```json
{
  "action_id": "chatmessage-0000003-begin-simulated-turn",
  "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
  "action_data": {
    "target": "CHAT"
  }
}
```
````

### Post-Task Completion Reset

Resetting the visual context after completing a major task.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll reset the interface after workspace publication is complete, preparing for any follow-up questions or new tasks the user might have.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000004",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000004-content-01-completion",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Your workspace has been published successfully! Let me prepare a fresh context for any additional questions..."
      }
    },
    {
      "content_id": "chatmessage-0000004-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000004-begin-simulated-turn",
          "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    }
  ]
}
```
````

### Combined with Follow-up Message

Beginning a simulated turn followed by an introductory message for the new phase.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll transition to the new phase and immediately provide context about what comes next, ensuring a smooth user experience through the workflow.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000005",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000005-content-01-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000005-begin-simulated-turn",
          "action_type": "CHAT_ACTION_BEGIN_SIMULATED_TURN",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    },
    {
      "content_id": "chatmessage-0000005-content-02-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Now that we've identified your organization, let's start building your workflow quality workspace. I'll guide you through the refinement process step by step."
      }
    }
  ]
}
```
````

---

## Implementation Guidelines

### Best Practices

- **Target Specification**: Always use `"CHAT"` for chat interface actions
- **Clear Purpose**: Use this action only when a visual break genuinely improves UX
- **Workflow Awareness**: Consider the user's mental model when creating transitions
- **Smooth Experience**: Ensure transitions feel natural, not disruptive

### Workflow Automation

- **Phase Transitions**: Use for major workflow stage changes
- **Context Resets**: Apply when switching between distinct topics or entities
- **Task Completion**: Consider using after completing significant tasks
- **User Guidance**: Help users understand progression through visual separation

### Integration Patterns

- **With Text Messages**: Combine with introductory messages for new phases
- **With Canvas Actions**: Chain with `CANVAS_ACTION_OPEN` for detailed views
- **With Progress Bars**: Update progress indicators alongside transitions
- **Sequential Execution**: Ensure proper ordering of combined actions

### Common Use Cases

- **Workflow Phase Changes**: Discovery to configuration, analysis to recommendations
- **Entity Context Switching**: Moving focus between different organization entities
- **Task Completions**: Resetting after publishing, saving, or completing major actions
- **Topic Transitions**: Changing conversation focus to a new subject area

---

## Best Practices

### Transition Design

- **Purposeful Usage**: Only use when visual separation adds value
- **User Context**: Consider what information the user might need to retain
- **Timing**: Execute transitions at natural conversation breakpoints
- **Consistency**: Apply similar transitions for similar workflow patterns

### Error Handling

- **Graceful Fallbacks**: Ensure conversation continues if action fails
- **State Preservation**: Critical state should survive the transition
- **Recovery Options**: Provide ways for users to access previous context if needed
- **User Communication**: Inform users appropriately if issues occur

### Performance Considerations

- **Smooth Animations**: Ensure scroll and clear are visually smooth
- **Quick Execution**: Minimize delay between action and visual result
- **Resource Cleanup**: Properly manage resources from previous context
- **State Efficiency**: Only preserve necessary state during transitions
