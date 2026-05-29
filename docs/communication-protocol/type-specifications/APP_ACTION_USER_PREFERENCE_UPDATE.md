---
description: "Specification for the APP_ACTION_USER_PREFERENCE_UPDATE action type. This document details the purpose, structure, and core specification for the APP_ACTION_USER_PREFERENCE_UPDATE action within the Assistant ↔️ UI Communication Protocol. The file is organized with the purpose first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/APP_ACTION_USER_PREFERENCE_UPDATE.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

# APP_ACTION_USER_PREFERENCE_UPDATE

## Purpose

The `APP_ACTION_USER_PREFERENCE_UPDATE` action is used to modify general user-specific application preferences. This allows for dynamic changes to settings like notification preferences, layout choices, or other customizable aspects of the application experience.

## Example Full Action Payload

```json
{
  "action_type": "APP_ACTION_USER_PREFERENCE_UPDATE",
  "action_data": {
    "target": "APP",
    "preference_key": "notifications.enabled",
    "preference_value": true
  }
}
```

## Action Data Structure

The `action_data` for `APP_ACTION_USER_PREFERENCE_UPDATE` must contain the following properties:

- `target`: String (Enum: `"APP"`)
  - Specifies that the action targets the application itself.
- `preference_key`: String
  - Required. A unique key identifying the preference to be updated (e.g., `"notifications.enabled"`, `"workspace.layout.density"`, `"accessibility.fontSize"`).
  - It's recommended to use a namespaced string format (e.g., `feature.setting`) for clarity.
- `preference_value`: Any
  - Required. The new value for the specified preference. The data type of this value depends on the preference being set (e.g., boolean, string, number, object).

## JSON Schema Definition for `action_data`

The `action_data` for `APP_ACTION_USER_PREFERENCE_UPDATE` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "preference_key", "preference_value"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["APP"],
      "description": "Specifies that the action targets the application itself."
    },
    "preference_key": {
      "type": "string",
      "description": "A unique key identifying the preference to be updated (e.g., \"notifications.enabled\", \"workspace.layout.density\", \"accessibility.fontSize\")."
    },
    "preference_value": {
      "type": ["string", "number", "boolean", "object", "array", "null"],
      "description": "The new value for the specified preference."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["APP"]),
  preference_key: z.string(),
  preference_value: z.any(),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("APP").required(),
  preference_key: Joi.string().required(),
  preference_value: Joi.any().required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["APP"]).required(),
  preference_key: yup.string().required(),
  preference_value: yup.mixed().required(),
});
```

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [APP_ACTION_USER_PREFERENCE_UPDATE Usage Examples](../type-usage-examples/APP_ACTION_USER_PREFERENCE_UPDATE.md)**

## Considerations

- The application is responsible for interpreting the `preference_key` and handling the `preference_value` appropriately, including type validation and applying the change.
- Unknown `preference_key`s should ideally be handled gracefully (e.g., logged, ignored) rather than causing errors.
- This action allows for a flexible way to manage a wide range of user settings. The specific keys and expected value types should be well-documented by the application implementing this protocol.
- Changes made through this action should typically be persisted by the application so they are retained across sessions.
