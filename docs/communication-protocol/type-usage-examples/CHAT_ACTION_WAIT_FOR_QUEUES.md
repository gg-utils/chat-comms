---
description: "Usage examples for CHAT_ACTION_WAIT_FOR_QUEUES in the communication protocol. The examples in this file provide concrete implementation guidance and common usage patterns for coordinating parallel chat content queues. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CHAT_ACTION_WAIT_FOR_QUEUES Specification](../type-specifications/CHAT_ACTION_WAIT_FOR_QUEUES.md)**

# CHAT_ACTION_WAIT_FOR_QUEUES Usage Examples

This action type blocks the current queue until specified parallel queues reach a completion
condition. Use it to coordinate multi-queue UI sequences without relying on implicit timing.

## Core Implementation

### Basic Wait Payload

**Action Payload**

```json
{
  "action_id": "chatmessage-{id}-wait-queues",
  "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
  "action_data": {
    "target": "CHAT",
    "queue_names": ["website"],
    "wait_mode": "DRAIN",
    "timeout_ms": 45000,
    "on_timeout": "CONTINUE"
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
      "content_id": "chatmessage-{id}-content-01-markdown",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Loading the website panel before continuing..."
      },
      "content_queue": "main"
    },
    {
      "content_id": "chatmessage-{id}-content-02-wait",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "chatmessage-{id}-wait-queues",
          "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
          "action_data": {
            "target": "CHAT",
            "queue_names": ["website"],
            "wait_mode": "DRAIN",
            "timeout_ms": 45000,
            "on_timeout": "CONTINUE"
          }
        }
      },
      "content_queue": "main"
    }
  ]
}
```

---

## Essential Examples

### Wait for a Website Panel Queue to Drain

Use this when a parallel queue (e.g., `website`) should finish before the main narrative
continues.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000100-wait-website",
  "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
  "action_data": {
    "target": "CHAT",
    "queue_names": ["website"],
    "wait_mode": "DRAIN",
    "timeout_ms": 30000,
    "on_timeout": "CONTINUE"
  }
}
```

### Wait for Multiple Queues to Go Idle

Use this when you only need queues to stop actively processing (not necessarily drain).

**Action Payload**

```json
{
  "action_id": "chatmessage-0000101-wait-website-reasoning",
  "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
  "action_data": {
    "target": "CHAT",
    "queue_names": ["website", "reasoning"],
    "wait_mode": "IDLE",
    "timeout_ms": 20000,
    "on_timeout": "CONTINUE"
  }
}
```

### Wait for Specific Content IDs

Use `CONTENT_IDS` for precise synchronization when you know which updates must finish.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000102-wait-specific",
  "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
  "action_data": {
    "target": "CHAT",
    "queue_names": ["website"],
    "wait_mode": "CONTENT_IDS",
    "content_ids": [
      "chatmessage-0000102-content-website-panel",
      "chatmessage-0000102-content-website-summary"
    ],
    "timeout_ms": 30000,
    "on_timeout": "CONTINUE"
  }
}
```

### Timeout With Explicit Error

Use `on_timeout: "ERROR"` when the UI must not proceed unless the queue completes.

**Action Payload**

```json
{
  "action_id": "chatmessage-0000103-wait-critical",
  "action_type": "CHAT_ACTION_WAIT_FOR_QUEUES",
  "action_data": {
    "target": "CHAT",
    "queue_names": ["website"],
    "wait_mode": "DRAIN",
    "timeout_ms": 10000,
    "on_timeout": "ERROR"
  }
}
```

---

## Best Practices

- Place the wait action immediately after streaming dependent queue content so the wait
  reflects the correct pending set.
- Prefer `DRAIN` for deterministic sequencing; use `IDLE` when partial content can be
  acceptable.
- Use `CONTENT_IDS` when only a subset of updates needs to complete.
- Avoid waiting on the `main` queue unless a renderer explicitly requires it to prevent
  deadlocks.
