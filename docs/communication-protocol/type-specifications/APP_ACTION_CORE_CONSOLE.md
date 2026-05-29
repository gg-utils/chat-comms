---
description: "Specification for the APP_ACTION_CORE_CONSOLE action type. This document details the purpose, structure, and core specification for the APP_ACTION_CORE_CONSOLE action within the Assistant <-> UI Communication Protocol. The file is organized with the purpose first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/APP_ACTION_CORE_CONSOLE.md Part of the Assistant <-> UI Communication Protocol documentation suite."
---

> **[Communication Protocol](../README.md)**

> **[Type Specifications](./README.md)**

# APP_ACTION_CORE_CONSOLE

## Purpose

The `APP_ACTION_CORE_CONSOLE` action streams structured producer diagnostics directly to the browser's developer console. This enables real-time debugging of producer workflow execution, model interactions, and server-side operations without requiring direct server log access.

Key use cases:

- **Workflow debugging**: Track execution flow through producer-side jobs, handoffs, and background workflows
- **LLM troubleshooting**: Log prompt/response details and token usage during development
- **Performance monitoring**: Emit timing information for critical operations
- **Error diagnostics**: Stream detailed error context to developers in real-time

## Example Full Action Payload

```json
{
  "action_type": "APP_ACTION_CORE_CONSOLE",
  "action_data": {
    "target": "APP",
    "level": "info",
    "message": "Catalog sync completed",
    "timestamp": "2026-02-03T10:30:45.123Z",
    "payload": {
      "recordId": "record-abc123",
      "recordsProcessed": 3,
      "followUpRequired": true
    }
  }
}
```

## Action Data Structure

The `action_data` for `APP_ACTION_CORE_CONSOLE` must contain the following properties:

- `target`: String (Enum: `"APP"`)
  - Specifies that the action targets the application itself.
- `level`: String (Enum: `"debug"`, `"info"`, `"warn"`, `"error"`)
  - Required. The log level that determines:
    - Console method used (`console.debug`, `console.info`, `console.warn`, `console.error`)
    - Visual styling in the browser console
    - Filtering behavior (browsers can filter by log level)
- `message`: String
  - Required. Human-readable message describing the event.
- `timestamp`: String (ISO 8601 format)
  - Optional. When the event occurred on the backend. Auto-generated if not provided.
- `payload`: Any JSON-serializable value
  - Optional. Additional structured data to display as an expandable object in the console.
- `source`: String
  - Optional. Identifier for the message origin (e.g., `"job:catalog-sync"`, `"model:provider"`).

## JSON Schema Definition for `action_data`

The `action_data` for `APP_ACTION_CORE_CONSOLE` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "level", "message"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["APP"],
      "description": "Specifies that the action targets the application itself."
    },
    "level": {
      "type": "string",
      "enum": ["debug", "info", "warn", "error"],
      "description": "Log level determining console method and styling."
    },
    "message": {
      "type": "string",
      "description": "Human-readable message describing the event."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp of when the event occurred."
    },
    "payload": {
      "description": "Optional JSON-serializable data displayed as expandable object."
    },
    "source": {
      "type": "string",
      "description": "Identifier for the message origin."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["APP"]),
  level: z.enum(["debug", "info", "warn", "error"]),
  message: z.string(),
  timestamp: z.string().datetime().optional(),
  payload: z.unknown().optional(),
  source: z.string().optional(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("APP").required(),
  level: Joi.string().valid("debug", "info", "warn", "error").required(),
  message: Joi.string().required(),
  timestamp: Joi.string().isoDate().optional(),
  payload: Joi.any().optional(),
  source: Joi.string().optional(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["APP"]).required(),
  level: yup.string().oneOf(["debug", "info", "warn", "error"]).required(),
  message: yup.string().required(),
  timestamp: yup.string().optional(),
  payload: yup.mixed().optional(),
  source: yup.string().optional(),
});
```

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **[APP_ACTION_CORE_CONSOLE Usage Examples](../type-usage-examples/APP_ACTION_CORE_CONSOLE.md)**

## Considerations

### Enabling the Feature

This action type should be guarded by explicit opt-in controls on both producer and consumer sides:

1. **Producer**: Enable an application-specific producer diagnostics flag, such as `PROTOCOL_PRODUCER_ENABLE_CONSOLE_STREAMING=true`.

   - When disabled (default), `the consumer's debug-log formatter` is a no-op
   - This prevents diagnostics from being streamed to production users by default

2. **Consumer UI**: Expose an application-specific runtime toggle, such as `protocolDebug.coreConsole.enable()`.
   - Messages are only displayed when this flag is enabled
   - Consumers may also expose their own environment variable or settings-panel toggle

### Security Considerations

- **Never use in production**: This feature can expose sensitive implementation details
- **No sensitive data**: Avoid including PII, API keys, or credentials in payloads
- **Guard conditionally**: Backend streaming is disabled by default for safety

### Performance Considerations

- Messages are streamed inline with other protocol content
- Excessive logging can increase response payload size
- Use `debug` level for verbose output that should be easily filtered

### Console Output Styling

The consumer UI renders messages with visual styling based on level:

| Level   | Console Method    | Styling                       |
| ------- | ----------------- | ----------------------------- |
| `debug` | `console.debug()` | Gray, collapsed by default    |
| `info`  | `console.info()`  | Blue info icon                |
| `warn`  | `console.warn()`  | Yellow warning triangle       |
| `error` | `console.error()` | Red error styling, stack-like |

Messages are prefixed with `[PROTOCOL-PRODUCER {LEVEL}]` for easy identification and filtering.
