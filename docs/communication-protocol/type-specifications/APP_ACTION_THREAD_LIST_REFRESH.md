---
description: "Specification for the APP_ACTION_THREAD_LIST_REFRESH action. This document details the purpose, structure, and core specification for the APP_ACTION_THREAD_LIST_REFRESH action within the Assistant ↔️ UI Communication Protocol. The file is organized with the purpose first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/APP_ACTION_THREAD_LIST_REFRESH.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

> **📝 [Usage Examples](../type-usage-examples/APP_ACTION_THREAD_LIST_REFRESH.md)**

# Action: `APP_ACTION_THREAD_LIST_REFRESH`

## Purpose

Instructs the application to refresh its primary list of user threads. This action is typically used to fetch the latest threads from the server and update the UI display accordingly. It can be triggered by direct user interaction (e.g., a "pull-to-refresh" gesture or a dedicated refresh button) or initiated by the system when it determines a refresh is necessary to ensure data consistency.

`APP_ACTION_THREAD_LIST_REFRESH` is the only thread-list refresh action type currently exposed by `@gg-utils/chat-comms/wire`. Do not emit the historical pluralized alias in new examples or implementations.

## Example Full Action Payload

Below is an example of how the `APP_ACTION_THREAD_LIST_REFRESH` action can be structured. This action might be part of a `CHAT_MESSAGE`'s `actions` array (e.g., if a button in chat triggers this) or dispatched directly by the UI based on other user interactions.

**Action Payload**

```json
{
  "action_id": "ui-initiated-001-refresh-threads",
  "action_type": "APP_ACTION_THREAD_LIST_REFRESH",
  "action_data": {
    "target": "APP"
  }
}
```

**Note on `action_id`**: The `action_id` should be unique. If this action is embedded within a `CHAT_MESSAGE` (e.g. triggered from a button), it should follow the `{message_id}-{action_identifier}` convention. If it's initiated by the UI directly without being tied to a specific message, a different unique ID scheme can be used (e.g., `ui-initiated-{timestamp/uuid}`).

## JSON Schema Definition for `action_data`

The `action_data` for `APP_ACTION_THREAD_LIST_REFRESH` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["APP"],
      "description": "Indicates that this action is directed at the application level."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["APP"]),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("APP").required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["APP"]).required(),
});
```

## Example `action_data` Payload

The `action_data` for this action specifies the target for the action.

```json
{
  "target": "APP"
}
```

**Fields:**

- `target` (String, required): Must be `"APP"`. Indicates that this action is directed at the application level.

Currently, no other specific data fields are required for this action. Future versions might include optional parameters for features such as pagination, filtering, or cache control (e.g., `"force_clear_cache": true`).

## Scenarios

- **User-Initiated Refresh:** A user pulls down on the thread list screen, triggering the UI to dispatch this action to refresh the threads.
- **System-Initiated Refresh:** After a significant background synchronization event, the system might dispatch this action to ensure the displayed thread list is up-to-date.
- **Button Trigger:** A button within a chat message or a global UI element, when clicked, triggers this action.

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [APP_ACTION_THREAD_LIST_REFRESH Usage Examples](../type-usage-examples/APP_ACTION_THREAD_LIST_REFRESH.md)**
