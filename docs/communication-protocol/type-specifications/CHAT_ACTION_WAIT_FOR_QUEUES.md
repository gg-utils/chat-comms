---
description: "Specification for CHAT_ACTION_WAIT_FOR_QUEUES in the communication protocol. This file defines the complete specification, schema definitions, and implementation guidance for blocking the current queue until one or more named content queues reach a target state. The file is organized with the type definition first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For comprehensive usage examples and practical implementation scenarios, see: - Usage Examples: ../type-usage-examples/CHAT_ACTION_WAIT_FOR_QUEUES.md Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **Back to [Type Specifications](README.md)**

# CHAT_ACTION_WAIT_FOR_QUEUES

Blocks the **current queue** from advancing until one or more **named content queues**
reach a specified completion condition. This enables explicit dependencies between
parallel content queues (e.g., waiting for a website panel queue to finish before
continuing the main queue).

---

## Purpose

The chat system supports **parallel content queues** (e.g., `main`, `website`,
`reasoning`) to allow concurrent rendering. By default, the main queue does **not**
wait for parallel queues. `CHAT_ACTION_WAIT_FOR_QUEUES` introduces an explicit
barrier so the caller can enforce ordering when needed.

Typical use case:

- The **website panel** is streamed on the `website` queue while the main queue
  continues with narrative content.
- Insert `CHAT_ACTION_WAIT_FOR_QUEUES` on the **main** queue to **block** until
  the website queue completes.

---

## Action Structure

```json
{
  "action_id": "wait-website-queue",
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

---

## Fields

- `queue_names` (string[], required)

  - Names of content queues to wait for. Example: `["website", "reasoning"]`.

- `wait_mode` ("DRAIN" | "IDLE" | "CONTENT_IDS", optional; default: "DRAIN")

  - `DRAIN`: Wait until all **currently pending** content for those queues has
    been processed, and those queues are no longer active.
  - `IDLE`: Wait until queues are **not actively processing** (does not guarantee
    their pending content has completed).
  - `CONTENT_IDS`: Wait until specific content IDs are processed (requires
    `content_ids`).

- `content_ids` (string[], required if `wait_mode` = "CONTENT_IDS")

  - Explicit content IDs to wait for.

- `timeout_ms` (number, optional)

  - Time in milliseconds to wait before applying `on_timeout` behavior.

- `on_timeout` ("CONTINUE" | "ERROR", optional; default: "CONTINUE")
  - `CONTINUE`: proceed even if the queues are not done.
  - `ERROR`: throw an error in the action processor.

---

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, see:

> **[CHAT_ACTION_WAIT_FOR_QUEUES Usage Examples](../type-usage-examples/CHAT_ACTION_WAIT_FOR_QUEUES.md)**

---

## Notes & Best Practices

- **Place immediately after** streaming the dependent queue content, so the
  barrier reflects the correct set of pending items.
- Avoid waiting on `main` unless explicitly needed to prevent deadlocks.
- Use `CONTENT_IDS` if you need precise synchronization for a known subset of
  content updates.

---

## Related

- `CHAT_ACTION_UPDATE_PROGRESS_BAR`
- `CHAT_ACTION_UPDATE_PANEL`
- `content_queue` protocol option (parallel queue processing)
