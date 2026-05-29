---
description: "Usage examples for CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. This file contains essential examples and practical implementation scenarios for signaling content sequence completion and preparing the UI for a new logical unit with assistant logo. Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](../type-specifications/README.md)**

> **[CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE Specification](../type-specifications/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)**

# CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE Usage Examples

This action type signals the UI that a content sequence has been completed. The UI prepares for the next sequence of contents, displaying the assistant logo before the next content to visually separate it from previous contents.

> **Note:** The `target` field is always `"CHAT"`. This is a constant value—the action exclusively operates on the chat interface.

## Core Implementation

### Basic Action Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-complete-content-sequence",
  "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
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
        "markdown": "Here's the first part of my response..."
      }
    },
    {
      "content_id": "chatmessage-{id}-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          /* CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE payload */
        }
      }
    },
    {
      "content_id": "chatmessage-{id}-content-03-followup",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Now for the next logical section..."
      }
    }
  ]
}
```

---

## Essential Examples

### Multi-Topic Response

Separating distinct topics within a single assistant response.

**TypeScript Builder Pattern**

```typescript
application protocol formatter.create()
  .protocolStart({
    message_id: this.messageId,
    debug: this.config.DEBUG,
  })
  .addMarkdown({
    content_id_suffix: "organization-hours-info",
    markdown: "**Office Hours**\n\nYour organization is open Monday through Friday, 9 AM to 5 PM.",
  })
  .addActionWrapper({
    content_id_suffix: "sequence-separator-1",
    action: {
      action_id: `${this.messageId}-complete-sequence-1`,
      action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
      action_data: {
        target: "CHAT",
      },
    },
  })
  .addMarkdown({
    content_id_suffix: "contact-info",
    markdown: "**Contact Information**\n\nYou can be reached at info@example.com.",
  })
  .protocolEnd()
  .build();
```

**JSON Output**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000001-content-organization-hours-info",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "**Office Hours**\n\nYour organization is open Monday through Friday, 9 AM to 5 PM."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-sequence-separator-1",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000001-complete-sequence-1",
          "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    },
    {
      "content_id": "chatmessage-0000001-content-contact-info",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "**Contact Information**\n\nYou can be reached at info@example.com."
      }
    }
  ]
}
```

### Workflow Step Completion

Marking completion of workflow steps with visual separation.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll separate the analysis results from the recommendations, creating a clear visual boundary between the completed analysis and the new recommendations section.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-analysis",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## Analysis Complete\n\nI've analyzed your workspace and identified 3 areas for improvement."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000002-complete-sequence",
          "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    },
    {
      "content_id": "chatmessage-0000002-content-03-recommendations",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## Recommendations\n\nHere are my specific recommendations for each area..."
      }
    }
  ]
}
```
````

### Information with Action Items

Separating informational content from actionable items.

**Assistant Output**

````markdown
_Assistant reasoning within output_
I'll provide the summary first, then create a visual separation before presenting the action buttons, making it clear where information ends and choices begin.

_Message to be processed by the UI_

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-summary",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I found **5 organizations** matching your search criteria. Each has been verified and includes complete contact information."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-separator",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-0000003-complete-sequence",
          "action_type": "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
          "action_data": {
            "target": "CHAT"
          }
        }
      }
    },
    {
      "content_id": "chatmessage-0000003-content-03-actions",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTIONABLE_CHIPS",
      "content_data": {
        "chips": [
          { "text": "View All Results", "value": "view_all" },
          { "text": "Refine Search", "value": "refine" },
          { "text": "Export List", "value": "export" }
        ]
      }
    }
  ]
}
```
````

### Multiple Logical Sections

Creating multiple visual boundaries within a comprehensive response.

**TypeScript Builder Pattern**

```typescript
application protocol formatter.create()
  .protocolStart({
    message_id: this.messageId,
    debug: this.config.DEBUG,
  })
  // Section 1: Overview
  .addMarkdown({
    content_id_suffix: "overview",
    markdown: "## Overview\n\nHere's a summary of your workspace status.",
  })
  .addActionWrapper({
    content_id_suffix: "separator-1",
    action: {
      action_id: `${this.messageId}-complete-sequence-1`,
      action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
      action_data: { target: "CHAT" },
    },
  })
  // Section 2: Details
  .addMarkdown({
    content_id_suffix: "details",
    markdown: "## Details\n\nLet me explain each area in more depth.",
  })
  .addActionWrapper({
    content_id_suffix: "separator-2",
    action: {
      action_id: `${this.messageId}-complete-sequence-2`,
      action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE",
      action_data: { target: "CHAT" },
    },
  })
  // Section 3: Next Steps
  .addMarkdown({
    content_id_suffix: "next-steps",
    markdown: "## Next Steps\n\nHere's what I recommend doing next.",
  })
  .protocolEnd()
  .build();
```

---

## Implementation Guidelines

### Best Practices

- **Target Specification**: Always use `"CHAT"` for chat interface actions
- **Purposeful Usage**: Use this action only when visual separation genuinely improves UX
- **Logical Boundaries**: Place separators at natural boundaries between content types
- **Consistent Patterns**: Apply similar separation patterns for similar content structures

### Content Organization

- **Topic Separation**: Use between distinct topics in a single response
- **Phase Markers**: Mark transitions between workflow phases
- **Category Boundaries**: Separate different categories of information
- **Action Preparation**: Separate informational content from interactive elements

### Integration Patterns

- **With Markdown**: Separate markdown sections with different purposes
- **With Panels**: Create boundaries between panel and text content
- **With Progress Bars**: Separate progress indicators from main content
- **With Actionable Elements**: Distinguish between information and choices

### Common Use Cases

- **Multi-Part Responses**: Comprehensive answers with multiple sections
- **Step Completion**: Marking workflow step boundaries
- **Information Hierarchy**: Separating primary from supplementary content
- **User Decision Points**: Separating context from choices

---

## Best Practices

### Visual Design

- **Purposeful Separation**: Only use when it adds clarity
- **Consistent Application**: Apply uniformly across similar scenarios
- **Logical Grouping**: Group related content before separating
- **User Expectations**: Match separation to user's mental model

### Error Handling

- **Graceful Degradation**: Content should remain readable if action fails
- **Silent Failures**: Don't block content delivery on separator failure
- **State Preservation**: Maintain conversation state regardless of action result
- **Recovery**: Continue normally if the UI can't process the action

### Performance Considerations

- **Lightweight**: Keep the action processing minimal
- **No Blocking**: Don't block subsequent content on action completion
- **Efficient Rendering**: UI should handle multiple separators efficiently
- **Batch Processing**: Consider batching multiple sequences when possible
