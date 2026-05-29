---
description: "Specification for the APP_ACTION_SET_THEME action type. This document details the purpose, structure, and core specification for the APP_ACTION_SET_THEME action within the Assistant ↔️ UI Communication Protocol. The file is organized with the purpose first, followed by a complete example payload for immediate reference, then detailed schema definitions and implementation guidance. For practical usage examples, see: ../type-usage-examples/APP_ACTION_SET_THEME.md Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](./README.md)**

# APP_ACTION_SET_THEME

## Purpose

The `APP_ACTION_SET_THEME` action is used to change the overall visual theme of the application. This allows the user or the assistant to switch between predefined themes like "dark", "light", or to defer to system settings.

## Example Full Action Payload

```json
{
  "action_type": "APP_ACTION_SET_THEME",
  "action_data": {
    "target": "APP",
    "theme_name": "dark"
  }
}
```

## Action Data Structure

The `action_data` for `APP_ACTION_SET_THEME` must contain the following properties:

- `target`: String (Enum: `"APP"`)
  - Specifies that the action targets the application itself.
- `theme_name`: String (Enum: `"dark"`, `"light"`, `"system"`)
  - Required. The name of the theme to apply.
    - `"dark"`: Applies a dark theme.
    - `"light"`: Applies a light theme.
    - `"system"`: The application theme will follow the operating system's theme setting.

## JSON Schema Definition for `action_data`

The `action_data` for `APP_ACTION_SET_THEME` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["target", "theme_name"],
  "properties": {
    "target": {
      "type": "string",
      "enum": ["APP"],
      "description": "Specifies that the action targets the application itself."
    },
    "theme_name": {
      "type": "string",
      "enum": ["dark", "light", "system"],
      "description": "The name of the theme to apply."
    }
  }
}
```

## Zod Schema Definition for `action_data`

```typescript
import { z } from "zod";

const actionDataSchema = z.object({
  target: z.enum(["APP"]),
  theme_name: z.enum(["dark", "light", "system"]),
});
```

## Joi Schema Definition for `action_data`

```javascript
const Joi = require("joi");

const actionDataSchema = Joi.object({
  target: Joi.string().valid("APP").required(),
  theme_name: Joi.string().valid("dark", "light", "system").required(),
});
```

## Yup Schema Definition for `action_data`

```javascript
import * as yup from "yup";

const actionDataSchema = yup.object().shape({
  target: yup.string().oneOf(["APP"]).required(),
  theme_name: yup.string().oneOf(["dark", "light", "system"]).required(),
});
```

## Usage Examples

For comprehensive usage examples and practical implementation scenarios, please refer to:

> **📝 [APP_ACTION_SET_THEME Usage Examples](../type-usage-examples/APP_ACTION_SET_THEME.md)**

## Considerations

- The application must have predefined "dark" and "light" themes for this action to have a visible effect.
- If `"system"` is chosen, the application should listen to system theme changes and update accordingly.
- This action typically originates from user settings within the app or could be triggered by an assistant based on user commands (e.g., "Change to dark mode").
