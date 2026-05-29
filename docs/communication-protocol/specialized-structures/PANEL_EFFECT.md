---
description: "Specification for PANEL_EFFECT specialized structure. Specification for PANEL_EFFECT in the communication protocol. Panel overlay effects applied to panel interface elements. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `PANEL_EFFECT` Specification

The `PANEL_EFFECT` is a specialized type representing visual overlay effects applied to panel interface elements. It complements [`PANEL_ANIMATION`](./PANEL_ANIMATION.md) by providing continuous or repeating visual treatments that are not tied to explicit visibility triggers.

`PANEL_EFFECT` objects are used within `panel_effects` arrays to add visual polish on top of panels (e.g., sweeping highlights). These effects can run independently of open/close transitions and are configured using Framer Motion-compatible attributes.

## General Attributes

All `PANEL_EFFECT` objects contain the following attributes:

- `effect_type` (string, required): Defines the specific type of panel effect to apply
- `effect_state` (string, optional, default: `EFFECT_STATE_ENABLED`): Whether the effect is enabled or disabled. Allowed values: `EFFECT_STATE_ENABLED`, `EFFECT_STATE_DISABLED`.
- `effect_framer_motion_attributes` (object, required): Framer Motion-compatible effect configuration parameters, including support for repeat and mirroring

## Effect Types

For now, the `effect_type` field supports a single value:

- `EFFECT_LASER_SWEEP` — a repeating, mirrored sweep effect across the panel body area

Future versions may add more effect types.

## Default Effect Attributes for `EFFECT_LASER_SWEEP`

Conceptually, the default timing aligns after the panel body open transition completes:

```javascript
// Conceptual default (computed by the UI)
{
  opacity: {
    delay: bodyOpenTransitionConfig.delay + bodyOpenTransitionConfig.duration,
    duration: 0,
  },
  delay: bodyOpenTransitionConfig.delay + bodyOpenTransitionConfig.duration,
  repeatDelay: 0.1,
  duration: 1.5,
  repeat: Infinity,
  ease: 'easeInOut',
  repeatType: 'mirror'
}
```

Example with concrete numeric values (valid JSON):

```json
{
  "opacity": { "delay": 1.6, "duration": 0 },
  "delay": 1.6,
  "repeatDelay": 0.1,
  "duration": 1.5,
  "repeat": 999999,
  "ease": "easeInOut",
  "repeatType": "mirror"
}
```

Note: Use a very large `repeat` value (e.g., 999999) if your JSON serializer does not allow `Infinity`.

## JSON Schema Definition for `PANEL_EFFECT`

```json
{
  "type": "object",
  "required": ["effect_type", "effect_framer_motion_attributes"],
  "properties": {
    "effect_type": {
      "type": "string",
      "enum": ["EFFECT_LASER_SWEEP"],
      "description": "Defines the specific type of panel effect to apply."
    },
    "effect_state": {
      "type": "string",
      "enum": ["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"],
      "default": "EFFECT_STATE_ENABLED",
      "description": "Whether the effect is enabled or disabled."
    },
    "effect_framer_motion_attributes": {
      "type": "object",
      "properties": {
        "delay": { "type": "number", "minimum": 0 },
        "duration": { "type": "number", "minimum": 0 },
        "ease": {
          "oneOf": [
            {
              "type": "string",
              "enum": [
                "linear",
                "easeIn",
                "easeOut",
                "easeInOut",
                "circIn",
                "circOut",
                "circInOut",
                "backIn",
                "backOut",
                "backInOut",
                "anticipate"
              ]
            },
            { "type": "array", "items": { "type": "number" }, "minItems": 4, "maxItems": 4 }
          ]
        },
        "repeat": { "type": "number", "minimum": 0 },
        "repeatDelay": { "type": "number", "minimum": 0 },
        "repeatType": { "type": "string", "enum": ["loop", "reverse", "mirror"] },
        "opacity": {
          "type": "object",
          "properties": {
            "delay": { "type": "number", "minimum": 0 },
            "duration": { "type": "number", "minimum": 0 }
          },
          "additionalProperties": false,
          "description": "Property-level transition overrides for opacity."
        }
      },
      "additionalProperties": true,
      "description": "Framer Motion compatible effect configuration parameters."
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const PanelEffectTypeSchema = z.enum(["EFFECT_LASER_SWEEP"]);

const PanelEffectFramerMotionAttributesSchema = z
  .object({
    delay: z.number().min(0).optional(),
    duration: z.number().min(0).optional(),
    ease: z
      .union([
        z.enum([
          "linear",
          "easeIn",
          "easeOut",
          "easeInOut",
          "circIn",
          "circOut",
          "circInOut",
          "backIn",
          "backOut",
          "backInOut",
          "anticipate",
        ]),
        z.array(z.number()).length(4),
      ])
      .optional(),
    repeat: z.number().min(0).optional(),
    repeatDelay: z.number().min(0).optional(),
    repeatType: z.enum(["loop", "reverse", "mirror"]).optional(),
    opacity: z
      .object({
        delay: z.number().min(0).optional(),
        duration: z.number().min(0).optional(),
      })
      .optional(),
  })
  .passthrough();

export const PanelEffectSchema = z.object({
  effect_type: PanelEffectTypeSchema.describe("Specific type of panel effect."),
  effect_state: z
    .enum(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
    .default("EFFECT_STATE_ENABLED")
    .optional()
    .describe("Whether the effect is enabled or disabled."),
  effect_framer_motion_attributes: PanelEffectFramerMotionAttributesSchema.describe(
    "Framer Motion compatible effect configuration parameters."
  ),
});

export type ChatComms_RuntimeChat_PanelEffect = z.infer<typeof PanelEffectSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const panelEffectTypeSchema = Joi.string().valid("EFFECT_LASER_SWEEP");

const panelEffectFramerMotionAttributesSchema = Joi.object({
  delay: Joi.number().min(0),
  duration: Joi.number().min(0),
  ease: Joi.alternatives().try(
    Joi.string().valid(
      "linear",
      "easeIn",
      "easeOut",
      "easeInOut",
      "circIn",
      "circOut",
      "circInOut",
      "backIn",
      "backOut",
      "backInOut",
      "anticipate"
    ),
    Joi.array().items(Joi.number()).length(4)
  ),
  repeat: Joi.number().min(0),
  repeatDelay: Joi.number().min(0),
  repeatType: Joi.string().valid("loop", "reverse", "mirror"),
  opacity: Joi.object({
    delay: Joi.number().min(0),
    duration: Joi.number().min(0),
  }).unknown(false),
}).unknown(true);

const panelEffectSchema = Joi.object({
  effect_type: panelEffectTypeSchema.required(),
  effect_state: Joi.string()
    .valid("EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED")
    .default("EFFECT_STATE_ENABLED"),
  effect_framer_motion_attributes: panelEffectFramerMotionAttributesSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const panelEffectTypeSchema = yup.string().oneOf(["EFFECT_LASER_SWEEP"]);

const panelEffectFramerMotionAttributesSchema = yup
  .object()
  .shape({
    delay: yup.number().min(0),
    duration: yup.number().min(0),
    ease: yup.mixed().test("ease-validation", "Invalid ease value", function (value) {
      if (value === undefined) return true;
      if (typeof value === "string") {
        return [
          "linear",
          "easeIn",
          "easeOut",
          "easeInOut",
          "circIn",
          "circOut",
          "circInOut",
          "backIn",
          "backOut",
          "backInOut",
          "anticipate",
        ].includes(value);
      }
      if (Array.isArray(value)) {
        return value.length === 4 && value.every((v) => typeof v === "number");
      }
      return false;
    }),
    repeat: yup.number().min(0),
    repeatDelay: yup.number().min(0),
    repeatType: yup.string().oneOf(["loop", "reverse", "mirror"]),
    opacity: yup.object().shape({
      delay: yup.number().min(0),
      duration: yup.number().min(0),
    }),
  })
  .noUnknown(false);

export const panelEffectSchema = yup.object().shape({
  effect_type: panelEffectTypeSchema.required(),
  effect_state: yup
    .string()
    .oneOf(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
    .default("EFFECT_STATE_ENABLED"),
  effect_framer_motion_attributes: panelEffectFramerMotionAttributesSchema.required(),
});
```

## Example Payloads

### Laser Sweep Effect

```json
{
  "effect_type": "EFFECT_LASER_SWEEP",
  "effect_state": "EFFECT_STATE_ENABLED",
  "effect_framer_motion_attributes": {
    "delay": 1.6,
    "repeatDelay": 0.1,
    "duration": 1.5,
    "repeat": 999999,
    "ease": "easeInOut",
    "repeatType": "mirror",
    "opacity": { "delay": 1.6, "duration": 0 }
  }
}
```

## Usage in Panel Elements

`PANEL_EFFECT` objects are used inside `panel_effects` arrays for panel interface components:

- `CHAT_CONTENT_PANEL` — define effects when creating panel content
- `CHAT_ACTION_UPDATE_PANEL` — update effects dynamically for existing panels

Effects complement transitions and can run concurrently with `panel_transitions`.

## Best Practices

- Coordinate effect start (`delay`) to follow body open animations for harmonious visuals
- Use modest `repeatDelay` and `duration` to avoid visual fatigue
- Prefer `repeatType: 'mirror'` for back-and-forth sweeps
- Be mindful of accessibility preferences (reduced motion)

## Inheritance

`PANEL_EFFECT` is a specialized overlay configuration distinct from [`PANEL_ANIMATION`](./PANEL_ANIMATION.md), focusing on repeated/continuous visual polish rather than state-triggered transitions.
