---
description: "Usage examples for APP_ACTION_SET_INPUT_PLACEHOLDER type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant <-> UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-02-04
category: documentation
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](../type-specifications/README.md)**

> **[APP_ACTION_SET_INPUT_PLACEHOLDER Specification](../type-specifications/APP_ACTION_SET_INPUT_PLACEHOLDER.md)**

# APP_ACTION_SET_INPUT_PLACEHOLDER Usage Examples

This document contains practical usage examples for the `APP_ACTION_SET_INPUT_PLACEHOLDER` action type, demonstrating how to set contextual placeholder text in the chat input field.

---

## Producer Usage

### Basic Placeholder Setting

```typescript
// Import your application-specific protocol formatter or the package stream writer.

// Within a pipeline or handler
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-123" })
  .addMarkdown({
    content_id_suffix: "greeting",
    markdown: "Welcome! Let's get started.",
  })
  .setInputPlaceholder({
    placeholder: "Enter a topic, URL, or identifier...",
  })
  .protocolEnd()
  .build();
```

### With Custom Action ID Suffix

```typescript
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-456" })
  .addMarkdown({
    content_id_suffix: "prompt",
    markdown: "What would you like to work on today?",
  })
  .setInputPlaceholder({
    placeholder: "Type a name, URL, or project identifier...",
    action_id_suffix: "onboarding",
  })
  .protocolEnd()
  .build();
```

### Multiple Protocol Blocks with Placeholder

```typescript
const formatter = application protocol formatter.create()
  // First block: greeting
  .protocolStart({ message_id: "msg-789" })
  .addMarkdown({
    content_id_suffix: "greeting",
    markdown: "Hi, welcome to the workflow.",
    content_delay: 1000,
  })
  .protocolEnd()
  // Second block: explanation
  .protocolStart({ message_id: "msg-789" })
  .addMarkdown({
    content_id_suffix: "explanation",
    markdown: "Let's build the _best answers AI can provide_ about your subject.",
    content_delay: 1000,
  })
  .protocolEnd()
  // Third block: call to action with placeholder
  .protocolStart({ message_id: "msg-789" })
  .addMarkdown({
    content_id_suffix: "cta",
    markdown: "Just tell me what you want to work on.",
  })
  .setInputPlaceholder({
    placeholder: "Enter a topic, URL, or identifier...",
  })
  .protocolEnd()
  .build();
```

---

## Action Payload Examples

### Basic Placeholder

**Action Payload**

```json
{
  "action_id": "msg-123-action-set-input-placeholder",
  "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "action_data": {
    "target": "APP",
    "placeholder": "Enter your organization name or website..."
  }
}
```

### With Custom Action ID Suffix

**Action Payload**

```json
{
  "action_id": "msg-456-action-set-input-placeholder-onboarding",
  "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "action_data": {
    "target": "APP",
    "placeholder": "Type the name of your company, product, or project..."
  }
}
```

### Search Refinement Context

**Action Payload**

```json
{
  "action_id": "msg-discovery-action-set-input-placeholder",
  "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "action_data": {
    "target": "APP",
    "placeholder": "Search for a organization by name or location..."
  }
}
```

### Content Editing Context

**Action Payload**

```json
{
  "action_id": "msg-edit-action-set-input-placeholder",
  "action_type": "APP_ACTION_SET_INPUT_PLACEHOLDER",
  "action_data": {
    "target": "APP",
    "placeholder": "Describe the change you'd like to make..."
  }
}
```

---

## Integration with a new-thread workflow

The `APP_ACTION_SET_INPUT_PLACEHOLDER` action is commonly used after the initial greeting to guide new users. Here is how it integrates with a generic new-thread workflow:

```typescript
// Import your application-specific protocol formatter or the package stream writer.

import type { WorkflowContext } from "../types";

/**
 * Example of streaming response with input placeholder
 * Based on a generic new-thread workflow pattern
 */
async function streamResponseWithPlaceholder(
  stream: (content: string) => Promise<void>,
  context: WorkflowContext,
  jsonOutput: {
    greeting: string;
    service_explanation: string;
    CALL_TO_ACTION: string;
  }
): Promise<void> {
  const messageId = context.getDefaultMessageId();

  const responseBuilder = application protocol formatter.create()
    // Stream greeting
    .protocolStart({ message_id: messageId })
    .addMarkdown({
      content_id_suffix: "greeting",
      markdown: jsonOutput.greeting,
      content_delay: 1000,
    })
    .protocolEnd()
    // Stream service explanation
    .protocolStart({ message_id: messageId })
    .addMarkdown({
      content_id_suffix: "explanation",
      markdown: jsonOutput.service_explanation,
      content_delay: 1000,
    })
    .protocolEnd()
    // Stream call to action with placeholder
    .protocolStart({ message_id: messageId })
    .addMarkdown({
      content_id_suffix: "cta",
      markdown: jsonOutput.CALL_TO_ACTION,
    })
    .setInputPlaceholder({
      placeholder: "Enter a topic, URL, or identifier...",
    })
    .protocolEnd();

  await stream(responseBuilder.build());
}
```

---

## Producer Workflow Example

This example shows how the placeholder action integrates into a generic search-refinement workflow:

```typescript
// Import your application-specific protocol formatter or the package stream writer.

import type { WorkflowRunOptions, WorkflowRunReturn } from "../types";

export async function runSearchRefinementPrompt(
  options: WorkflowRunOptions
): WorkflowRunReturn {
  const { message_id, context, stream } = options;

  // After an ambiguous search, prompt the user for more specific input
  const formatter = application protocol formatter.create()
    .protocolStart({ message_id })
    .addMarkdown({
      content_id_suffix: "refinement-prompt",
      markdown: "I found several matches. Could you be more specific?",
    })
    .setInputPlaceholder({
      placeholder: "Add a location, URL, or other distinguishing detail...",
      action_id_suffix: "search-refinement",
    })
    .protocolEnd();

  await stream(formatter.build());

  return { formattedOutput: formatter.build() };
}
```

---

## Contextual Placeholder Examples

### By Workflow State

| Workflow State       | Placeholder Text                                     |
| -------------------- | ---------------------------------------------------- |
| Initial Interaction  | "Enter a topic, URL, or identifier..."              |
| Search Refinement    | "Search by name, location, or URL..."               |
| Disambiguation       | "Add more details to help identify the right one..." |
| Document Generation  | "Any specific details to include?"                  |
| Content Editing      | "Describe the change you'd like to make..."        |
| General Conversation | "Ask me anything about this workflow..."            |

### By User Context

```typescript
function getContextualPlaceholder(context: WorkflowContext): string {
  const { workflowState, userSessionSummary } = context;

  // New user - guide to enter an initial subject.
  if (userSessionSummary?.isFirstThread) {
    return "Enter a topic, URL, or identifier...";
  }

  // Returning user with saved artifacts - offer more options.
  if (userSessionSummary?.savedArtifactCount > 0) {
    return "Open an existing item or start a new one...";
  }

  // Based on current workflow state.
  switch (workflowState?.kind) {
    case "search-refinement":
      return "Search by name, location, or URL...";
    case "content-editing":
      return "Describe the change you'd like to make...";
    case "general-conversation":
      return "Ask me anything...";
    default:
      return "Enter a topic, URL, or identifier...";
  }
}
```

---

## Troubleshooting

### Placeholder Not Appearing

1. **Check protocol structure**: Ensure `setInputPlaceholder()` is called within a `protocolStart()`/`protocolEnd()` block
2. **Verify action wrapping**: The action must be wrapped in `CHAT_CONTENT_ACTION_WRAPPER`
3. **Check consumer processing**: Verify the consumer UI is processing `APP_ACTION_SET_INPUT_PLACEHOLDER` actions

### Placeholder Resets Unexpectedly

- This is expected behavior — placeholders reset to default when the user sends a message
- If you need persistent guidance, consider using markdown text instead

### Multiple Placeholders in One Response

- Only the last placeholder action takes effect
- Structure your response to send the placeholder at the end

## Implementation Notes

- The placeholder action is wrapped in `CHAT_CONTENT_ACTION_WRAPPER` like other actions
- The `action_id_suffix` parameter allows custom IDs for easier tracking
- The action is processed synchronously — no animation or delay
- The placeholder text should be kept concise for optimal display across devices
