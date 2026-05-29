---
description: "Base specification for EFFECT objects in the communication protocol. Base specification for EFFECT in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Base Structures](./README.md)**

# Base `EFFECT` Specification

The `EFFECT` is a fundamental concept in the communication protocol, representing a generic instruction for a visual overlay effect that can run continuously or on repeat. It serves as the base type from which more specific effect categories like `PANEL_EFFECT` are derived.

While `ANIMATION` typically describes state-transition movements (often paired with explicit triggers in specialized structures), `EFFECT` focuses on ambient, ongoing, or repeating visual treatments that enhance UI elements.

All effects share a common structure with an `effect_type` to indicate the specific kind of effect and an `effect_framer_motion_attributes` object to configure Framer Motion-compatible parameters, including repeat behaviors.

## General Attributes

All `EFFECT` objects share the following common attributes:

- `effect_type` (string, required): Defines the specific type of effect to be applied by the implementation.
- `effect_state` (string, optional, default: `EFFECT_STATE_ENABLED`): Whether the effect is enabled or disabled. Allowed values: `EFFECT_STATE_ENABLED`, `EFFECT_STATE_DISABLED`.
- `effect_framer_motion_attributes` (object, required): Framer Motion-compatible configuration used to run the effect.

## Effect Framer Motion Attributes

The `effect_framer_motion_attributes` object supports common Framer Motion transition properties relevant to repeated/ambient effects:

- `delay` (number, optional): Time in seconds before the effect starts.
- `duration` (number, optional): Length of a single effect cycle in seconds.
- `ease` (string or array, optional): ChatComms_RuntimeChat_Easing function or cubic-bezier array. Common values include `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`, etc.
- `repeat` (number, optional): Number of times to repeat the effect. Use a large value if `Infinity` is not serializable.
- `repeatDelay` (number, optional): Delay in seconds between repeats.
- `repeatType` (string, optional): How to repeat: `"loop"`, `"reverse"`, or `"mirror"`.
- Property-level overrides (optional): For example, `opacity: { delay, duration }` to coordinate specific properties.

Implementations can extend this set with additional Framer Motion transition keys as needed.

## JSON Schema Definition for Base `EFFECT`

```json
{
  "type": "object",
  "required": ["effect_type", "effect_framer_motion_attributes"],
  "properties": {
    "effect_type": {
      "type": "string",
      "description": "Defines the specific type of effect."
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
          "additionalProperties": false
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

const EffectFramerMotionAttributesSchema = z
  .object({
    delay: z.number().min(0).optional().describe("Time in seconds before the effect starts."),
    duration: z.number().min(0).optional().describe("Length of a single effect cycle in seconds."),
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
      .optional()
      .describe("ChatComms_RuntimeChat_Easing function for the effect."),
    repeat: z.number().min(0).optional().describe("Number of times to repeat the effect."),
    repeatDelay: z.number().min(0).optional().describe("Delay in seconds between repeats."),
    repeatType: z
      .enum(["loop", "reverse", "mirror"])
      .optional()
      .describe("How to repeat the effect."),
    opacity: z
      .object({
        delay: z.number().min(0).optional(),
        duration: z.number().min(0).optional(),
      })
      .optional(),
  })
  .passthrough();

export const EffectSchema = z.object({
  effect_type: z.string().describe("Defines the specific type of effect."),
  effect_state: z
    .enum(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
    .default("EFFECT_STATE_ENABLED")
    .optional()
    .describe("Whether the effect is enabled or disabled."),
  effect_framer_motion_attributes: EffectFramerMotionAttributesSchema.describe(
    "Framer Motion compatible effect configuration parameters."
  ),
});

export type Effect = z.infer<typeof EffectSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const effectFramerMotionAttributesSchema = Joi.object({
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

const effectSchema = Joi.object({
  effect_type: Joi.string().required(),
  effect_state: Joi.string()
    .valid("EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED")
    .default("EFFECT_STATE_ENABLED"),
  effect_framer_motion_attributes: effectFramerMotionAttributesSchema.required(),
});
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const effectFramerMotionAttributesSchema = yup
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

export const effectSchema = yup.object().shape({
  effect_type: yup.string().required(),
  effect_state: yup
    .string()
    .oneOf(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
    .default("EFFECT_STATE_ENABLED"),
  effect_framer_motion_attributes: effectFramerMotionAttributesSchema.required(),
});
```

## Example Conceptual Payload

This example illustrates the general structure of a base `EFFECT`. Specific instances will use concrete `effect_type` values and corresponding `effect_framer_motion_attributes`.

**Effect Payload**

```json
{
  "effect_type": "SPECIFIC_CONCRETE_EFFECT_TYPE", // e.g., "EFFECT_LASER_SWEEP"
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

## Inheritance

This base `EFFECT` specification is inherited by more specialized effect types:

- **[`PANEL_EFFECT`](../specialized-structures/PANEL_EFFECT.md):** Effects specific to panel interface elements.

Refer to specialized documents for details on concrete `effect_type`s and any additional attributes they may define.
