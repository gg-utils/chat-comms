---
description: "Usage examples for APP_ACTION_CORE_CONSOLE type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](../type-specifications/README.md)**

> **[APP_ACTION_CORE_CONSOLE Specification](../type-specifications/APP_ACTION_CORE_CONSOLE.md)**

# APP_ACTION_CORE_CONSOLE Usage Examples

This document contains practical usage examples for the `APP_ACTION_CORE_CONSOLE` action type, demonstrating how to stream producer diagnostics to the browser console.

## Setup

### Producer Activation

Enable producer console streaming with an application-specific flag:

```bash
# .env or .env.local
PROTOCOL_PRODUCER_ENABLE_CONSOLE_STREAMING=true
```

When this flag is `false` (default), producer diagnostic formatter calls should be no-ops.

### Frontend Activation

In the browser developer console, enable the debug flag:

```javascript
// Enable core console display
protocolDebug.coreConsole.enable();

// Check if enabled
protocolDebug.coreConsole.isEnabled(); // true

// Disable when done
protocolDebug.coreConsole.disable();

// Or toggle
protocolDebug.coreConsole.toggle();
```

Alternatively, set the environment variable:

```bash
# .env.local (consumer UI)
PROTOCOL_CONSUMER_ENABLE_CONSOLE_STREAMING=true
```

---

## Producer Usage

### Basic Message Logging

```typescript
// Import your application-specific protocol formatter or the package stream writer.

// Within a pipeline or handler
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-123" })
  .coreConsole({
    level: "info",
    message: "Pipeline execution started",
  })
  .protocolEnd()
  .build();
```

### Logging with Payload Data

```typescript
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-456" })
  .coreConsole({
    level: "debug",
    message: "Entity candidates found",
    payload: {
      query: "coffee shop san francisco",
      candidateCount: 5,
      topMatch: {
        label: "Example Coffee",
        confidence: 0.95,
      },
    },
  })
  .protocolEnd()
  .build();
```

### Error Logging with Context

```typescript
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-789" })
  .coreConsole({
    level: "error",
    message: "LLM request failed after retries",
    payload: {
      model: "gpt-4",
      attempts: 3,
      lastError: "Rate limit exceeded",
      requestId: "req-abc-123",
    },
    action_id_suffix: "llm-error",
  })
  .protocolEnd()
  .build();
```

### Multiple Log Levels in Sequence

```typescript
const formatter = application protocol formatter.create()
  .protocolStart({ message_id: "msg-pipeline" })

  // Start of operation
  .coreConsole({
    level: "info",
    message: "Document generation started",
    payload: { subjectId: "subject-123" },
  })

  // Detailed debug info
  .coreConsole({
    level: "debug",
    message: "Blueprint sections to generate",
    payload: { sections: ["hero", "faq-intro", "faq-general"] },
  })

  // Warning about slow operation
  .coreConsole({
    level: "warn",
    message: "LLM response slower than expected",
    payload: { elapsed: 5200, threshold: 3000 },
  })

  .protocolEnd()
  .build();
```

---

## Action Payload Examples

### Info Level - Operation Status

**Action Payload**

```json
{
  "action_id": "msg-123-action-core-console",
  "action_type": "APP_ACTION_CORE_CONSOLE",
  "action_data": {
    "target": "APP",
    "level": "info",
    "message": "Catalog sync completed",
    "timestamp": "2026-02-03T10:30:45.123Z",
    "payload": {
      "recordId": "record-abc123",
      "recordLabel": "Acme Corporation",
      "followUpSkipped": true
    }
  }
}
```

### Debug Level - Verbose Details

**Action Payload**

```json
{
  "action_id": "msg-456-action-core-console",
  "action_type": "APP_ACTION_CORE_CONSOLE",
  "action_data": {
    "target": "APP",
    "level": "debug",
    "message": "LLM prompt constructed",
    "timestamp": "2026-02-03T10:30:46.001Z",
    "payload": {
      "model": "gpt-4-turbo",
      "promptTokens": 1250,
      "systemPromptLength": 450,
      "userPromptLength": 800
    }
  }
}
```

### Warn Level - Potential Issues

**Action Payload**

```json
{
  "action_id": "msg-789-action-core-console",
  "action_type": "APP_ACTION_CORE_CONSOLE",
  "action_data": {
    "target": "APP",
    "level": "warn",
    "message": "Fallback model used due to rate limiting",
    "timestamp": "2026-02-03T10:30:47.500Z",
    "payload": {
      "primaryModel": "gpt-4",
      "fallbackModel": "gpt-3.5-turbo",
      "retryCount": 2
    }
  }
}
```

### Error Level - Failures

**Action Payload**

```json
{
  "action_id": "msg-error-action-core-console",
  "action_type": "APP_ACTION_CORE_CONSOLE",
  "action_data": {
    "target": "APP",
    "level": "error",
    "message": "Document section generation failed",
    "timestamp": "2026-02-03T10:30:48.999Z",
    "payload": {
      "section": "summary",
      "error": "JSON parse error in LLM response",
      "rawResponse": "{ invalid json...",
      "documentId": "document-xyz"
    }
  }
}
```

---

## Console Output Examples

When messages are received, the frontend renders them in the browser console with styling:

### Info Message

```
[PROTOCOL-PRODUCER INFO] Catalog sync completed
  {recordId: "record-abc123", recordLabel: "Acme Corporation", ...}
```

### Debug Message (collapsed by default)

```
[PROTOCOL-PRODUCER DEBUG] LLM prompt constructed
  > {model: "gpt-4-turbo", promptTokens: 1250, ...}
```

### Warning Message

```
[PROTOCOL-PRODUCER WARN] Fallback model used due to rate limiting
  {primaryModel: "gpt-4", fallbackModel: "gpt-3.5-turbo", retryCount: 2}
```

### Error Message

```
[PROTOCOL-PRODUCER ERROR] Document section generation failed
  {section: "summary", error: "JSON parse error in model response", ...}
```

---

## Producer Workflow Example

This example shows how console logging integrates into a producer workflow:

```typescript
// Import your application-specific protocol formatter or the package stream writer.

import type { WorkflowRunOptions, WorkflowRunReturn } from "../types";

export async function runCatalogWorkflow(options: WorkflowRunOptions): WorkflowRunReturn {
  const { message_id, userQuery } = options;

  const formatter = application protocol formatter.create().protocolStart({ message_id });

  // Log pipeline start
  formatter.coreConsole({
    level: "info",
    message: "Catalog workflow started",
    payload: { userQuery },
  });

  // Perform search
  const searchResults = await performCatalogSearch(userQuery);

  formatter.coreConsole({
    level: "debug",
    message: "Search results received",
    payload: {
      resultCount: searchResults.length,
      topResults: searchResults.slice(0, 3).map((r) => r.name),
    },
  });

  // Check for disambiguation
  if (searchResults.length > 1) {
    formatter.coreConsole({
      level: "warn",
      message: "Multiple candidates found - disambiguation required",
      payload: {
        candidates: searchResults.map((r) => ({
          name: r.name,
          confidence: r.confidence,
        })),
      },
    });
  }

  // Add visible content for user
  formatter.markdown({ markdown: "I found some options..." }).protocolEnd();

  return {
    formattedOutput: formatter.build(),
  };
}
```

---

## Troubleshooting

### Messages Not Appearing

1. **Check backend flag**: Ensure `PROTOCOL_PRODUCER_ENABLE_CONSOLE_STREAMING=true`
2. **Check consumer flag**: Run your consumer debug toggle, such as `protocolDebug.coreConsole.isEnabled()`; it should return `true`
3. **Check console filter**: Browser console may be filtering by log level (show "Verbose" to see debug)
4. **Verify protocol parsing**: Check that `APP_ACTION_CORE_CONSOLE` actions are in the stream

### Too Many Messages

- Use `debug` level for verbose output (easily filtered in browser)
- Consider conditional logging based on specific debug flags
- Remove or reduce logging before deploying to staging

## Implementation Notes

- Core console actions are wrapped in `CHAT_CONTENT_ACTION_WRAPPER` like other actions
- Messages include auto-generated timestamps if not provided
- The `action_id_suffix` parameter allows custom IDs for easier tracking
- Payload objects should be JSON-serializable (no circular references)
