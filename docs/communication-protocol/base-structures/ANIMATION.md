---
description: "Base specification for ANIMATION objects in the communication protocol. Base specification for ANIMATION in the communication protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Base Structures](./README.md)**

# Base `ANIMATION` Specification

The `ANIMATION` is a fundamental concept in the communication protocol, representing a generic instruction for an animation effect to be performed. It serves as the base type from which more specific animation categories like `PANEL_ANIMATION` are derived.

All animations, regardless of their specific domain (chat, canvas, etc.), share a common structure to identify them and carry necessary animation configuration data. The `animation_type` field dictates the specific nature of the animation and the expected behavior of its `animation_framer_motion_attributes`.

## General Attributes

All `ANIMATION` objects, regardless of their specific `animation_type`, are expected to share the following common attributes:

- `animation_type` (string, required): Defines the specific type of animation to be performed (e.g., `"ANIMATION_TYPE_EXPAND_UP"`, `"ANIMATION_TYPE_FADE_IN"`, `"ANIMATION_TYPE_SLIDE_LEFT"`). This field determines the expected animation behavior and how the `animation_framer_motion_attributes` are interpreted.
- `animation_framer_motion_attributes` (object, required): An object containing the animation configuration parameters compatible with Framer Motion's transition system. The structure of this object follows Framer Motion's transition specification.

## Animation Framer Motion Attributes

The `animation_framer_motion_attributes` object supports all standard Framer Motion transition properties. The most commonly used properties include:

### Basic Timing Properties

- `delay` (number, optional): Time in seconds before the animation starts. Default is `0`.
- `duration` (number, optional): Length of the animation in seconds. Default varies by animation type.
- `ease` (string or array, optional): ChatComms_RuntimeChat_Easing function for the animation. Common values include:
  - `"linear"` - Constant speed throughout
  - `"easeIn"` - Slow start, fast end
  - `"easeOut"` - Fast start, slow end
  - `"easeInOut"` - Slow start and end, fast middle
  - `"circIn"`, `"circOut"`, `"circInOut"` - Circular easing
  - `"backIn"`, `"backOut"`, `"backInOut"` - Back easing with overshoot
  - Custom cubic-bezier arrays like `[0.17, 0.67, 0.83, 0.67]`

### Spring Animation Properties

- `type` (string, optional): Animation type. Values include `"spring"`, `"tween"`, `"inertia"`. Default is `"spring"`.
- `damping` (number, optional): Strength of opposing force. Higher values = less oscillation. Default is `10`.
- `stiffness` (number, optional): Stiffness of the spring. Higher values = faster animation. Default is `100`.
- `mass` (number, optional): Mass of the moving object. Higher values = slower animation. Default is `1`.

### Tween Animation Properties

- `times` (array of numbers, optional): Array of values between 0 and 1 that define keyframe positions.
- `repeatType` (string, optional): How to repeat the animation. Values: `"loop"`, `"reverse"`, `"mirror"`.
- `repeat` (number, optional): Number of times to repeat the animation. Use `Infinity` for infinite loops.

### Advanced Properties

- `velocity` (number, optional): Initial velocity of the animation.
- `restDelta` (number, optional): End animation if absolute speed drops below this value.
- `restSpeed` (number, optional): End animation if speed drops below this value.

## JSON Schema Definition for Base `ANIMATION`

This schema represents the common structure for any `ANIMATION`. Specific animation types will extend this, particularly by refining the `animation_type` enumeration and potentially adding domain-specific attributes.

```json
{
  "type": "object",
  "required": ["animation_type", "animation_framer_motion_attributes"],
  "properties": {
    "animation_type": {
      "type": "string",
      "description": "Defines the specific type of animation."
    },
    "animation_framer_motion_attributes": {
      "type": "object",
      "properties": {
        "delay": {
          "type": "number",
          "minimum": 0,
          "description": "Time in seconds before the animation starts."
        },
        "duration": {
          "type": "number",
          "minimum": 0,
          "description": "Length of the animation in seconds."
        },
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
            {
              "type": "array",
              "items": {
                "type": "number"
              },
              "minItems": 4,
              "maxItems": 4
            }
          ],
          "description": "ChatComms_RuntimeChat_Easing function for the animation. Can be a predefined string or cubic-bezier array."
        },
        "type": {
          "type": "string",
          "enum": ["spring", "tween", "inertia"],
          "description": "Type of animation. Default is 'spring'."
        },
        "damping": {
          "type": "number",
          "minimum": 0,
          "description": "Strength of opposing force for spring animations. Higher values = less oscillation."
        },
        "stiffness": {
          "type": "number",
          "minimum": 0,
          "description": "Stiffness of the spring. Higher values = faster animation."
        },
        "mass": {
          "type": "number",
          "minimum": 0,
          "description": "Mass of the moving object. Higher values = slower animation."
        },
        "velocity": {
          "type": "number",
          "description": "Initial velocity of the animation."
        },
        "restDelta": {
          "type": "number",
          "minimum": 0,
          "description": "End animation if absolute speed drops below this value."
        },
        "restSpeed": {
          "type": "number",
          "minimum": 0,
          "description": "End animation if speed drops below this value."
        },
        "times": {
          "type": "array",
          "items": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
          },
          "description": "Array of values between 0 and 1 that define keyframe positions."
        },
        "repeat": {
          "type": "number",
          "minimum": 0,
          "description": "Number of times to repeat the animation. Use Infinity for infinite loops."
        },
        "repeatType": {
          "type": "string",
          "enum": ["loop", "reverse", "mirror"],
          "description": "How to repeat the animation."
        }
      },
      "additionalProperties": false,
      "description": "Framer Motion compatible animation configuration parameters."
    }
  }
}
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const AnimationFramerMotionAttributesSchema = z
  .object({
    delay: z.number().min(0).optional().describe("Time in seconds before the animation starts."),
    duration: z.number().min(0).optional().describe("Length of the animation in seconds."),
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
      .describe(
        "ChatComms_RuntimeChat_Easing function for the animation. Can be a predefined string or cubic-bezier array."
      ),
    type: z
      .enum(["spring", "tween", "inertia"])
      .optional()
      .describe("Type of animation. Default is spring."),
    damping: z
      .number()
      .min(0)
      .optional()
      .describe("Strength of opposing force for spring animations."),
    stiffness: z
      .number()
      .min(0)
      .optional()
      .describe("Stiffness of the spring. Higher values = faster animation."),
    mass: z
      .number()
      .min(0)
      .optional()
      .describe("Mass of the moving object. Higher values = slower animation."),
    velocity: z.number().optional().describe("Initial velocity of the animation."),
    restDelta: z
      .number()
      .min(0)
      .optional()
      .describe("End animation if absolute speed drops below this value."),
    restSpeed: z
      .number()
      .min(0)
      .optional()
      .describe("End animation if speed drops below this value."),
    times: z
      .array(z.number().min(0).max(1))
      .optional()
      .describe("Array of values between 0 and 1 that define keyframe positions."),
    repeat: z.number().min(0).optional().describe("Number of times to repeat the animation."),
    repeatType: z
      .enum(["loop", "reverse", "mirror"])
      .optional()
      .describe("How to repeat the animation."),
  })
  .strict();

const AnimationSchema = z.object({
  animation_type: z.string().describe("Defines the specific type of animation."),
  animation_framer_motion_attributes: AnimationFramerMotionAttributesSchema.describe(
    "Framer Motion compatible animation configuration parameters."
  ),
});

export type Animation = z.infer<typeof AnimationSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const animationFramerMotionAttributesSchema = Joi.object({
  delay: Joi.number().min(0).description("Time in seconds before the animation starts."),
  duration: Joi.number().min(0).description("Length of the animation in seconds."),
  ease: Joi.alternatives()
    .try(
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
    )
    .description(
      "ChatComms_RuntimeChat_Easing function for the animation. Can be a predefined string or cubic-bezier array."
    ),
  type: Joi.string()
    .valid("spring", "tween", "inertia")
    .description("Type of animation. Default is spring."),
  damping: Joi.number().min(0).description("Strength of opposing force for spring animations."),
  stiffness: Joi.number()
    .min(0)
    .description("Stiffness of the spring. Higher values = faster animation."),
  mass: Joi.number()
    .min(0)
    .description("Mass of the moving object. Higher values = slower animation."),
  velocity: Joi.number().description("Initial velocity of the animation."),
  restDelta: Joi.number()
    .min(0)
    .description("End animation if absolute speed drops below this value."),
  restSpeed: Joi.number().min(0).description("End animation if speed drops below this value."),
  times: Joi.array()
    .items(Joi.number().min(0).max(1))
    .description("Array of values between 0 and 1 that define keyframe positions."),
  repeat: Joi.number().min(0).description("Number of times to repeat the animation."),
  repeatType: Joi.string()
    .valid("loop", "reverse", "mirror")
    .description("How to repeat the animation."),
}).unknown(false);

const animationSchema = Joi.object({
  animation_type: Joi.string().required().description("Defines the specific type of animation."),
  animation_framer_motion_attributes: animationFramerMotionAttributesSchema
    .required()
    .description("Framer Motion compatible animation configuration parameters."),
});

// Example usage:
// const { error, value } = animationSchema.validate({ ... });
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const animationFramerMotionAttributesSchema = yup
  .object({
    delay: yup
      .number()
      .min(0)
      .meta({ description: "Time in seconds before the animation starts." }),
    duration: yup.number().min(0).meta({ description: "Length of the animation in seconds." }),
    ease: yup
      .mixed()
      .test("ease-validation", "Invalid ease value", function (value) {
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
      })
      .meta({
        description:
          "ChatComms_RuntimeChat_Easing function for the animation. Can be a predefined string or cubic-bezier array.",
      }),
    type: yup
      .string()
      .oneOf(["spring", "tween", "inertia"])
      .meta({ description: "Type of animation. Default is spring." }),
    damping: yup
      .number()
      .min(0)
      .meta({ description: "Strength of opposing force for spring animations." }),
    stiffness: yup
      .number()
      .min(0)
      .meta({ description: "Stiffness of the spring. Higher values = faster animation." }),
    mass: yup
      .number()
      .min(0)
      .meta({ description: "Mass of the moving object. Higher values = slower animation." }),
    velocity: yup.number().meta({ description: "Initial velocity of the animation." }),
    restDelta: yup
      .number()
      .min(0)
      .meta({ description: "End animation if absolute speed drops below this value." }),
    restSpeed: yup
      .number()
      .min(0)
      .meta({ description: "End animation if speed drops below this value." }),
    times: yup
      .array()
      .of(yup.number().min(0).max(1))
      .meta({ description: "Array of values between 0 and 1 that define keyframe positions." }),
    repeat: yup.number().min(0).meta({ description: "Number of times to repeat the animation." }),
    repeatType: yup
      .string()
      .oneOf(["loop", "reverse", "mirror"])
      .meta({ description: "How to repeat the animation." }),
  })
  .strict();

const animationSchema = yup.object({
  animation_type: yup
    .string()
    .required()
    .meta({ description: "Defines the specific type of animation." }),
  animation_framer_motion_attributes: animationFramerMotionAttributesSchema
    .required()
    .meta({ description: "Framer Motion compatible animation configuration parameters." }),
});

// Example usage:
// animationSchema.validate({ ... }).then(value => { ... }).catch(err => { ... });
```

## Example Conceptual Payload

This example illustrates the general structure of a base `ANIMATION`. Specific instances would use concrete `animation_type` values and corresponding `animation_framer_motion_attributes`.

**Animation Payload**

```json
{
  "animation_type": "SPECIFIC_CONCRETE_ANIMATION_TYPE", // e.g., "ANIMATION_TYPE_EXPAND_UP"
  "animation_framer_motion_attributes": {
    "delay": 0.1,
    "duration": 1.5,
    "ease": "easeOut",
    "type": "spring",
    "damping": 10,
    "stiffness": 100
  }
}
```

## Triggers in Specialized Structures

The base `ANIMATION` specification intentionally does not define triggers or when animations should run. In specialized structures (such as `PANEL_ANIMATION` used by panel content and updates), animations are associated with explicit event triggers. Current trigger patterns used by panel transitions include:

- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE`
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE`
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN`
- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN`
- `ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED`

See the specialized [`PANEL_ANIMATION`](../specialized-structures/PANEL_ANIMATION.md) documentation for details on how triggers are paired with `animation_type` and `animation_framer_motion_attributes` within `panel_transitions` arrays.

## Animation Types

The `animation_type` field is a string that defines the specific type of animation to be performed. The exact values and their meanings are defined by the specific implementations that use this base structure.

Common animation type patterns include:

- **Expand Animations**: For growing or revealing content
- **Collapse Animations**: For shrinking or hiding content
- **Fade Animations**: For opacity-based transitions
- **Slide Animations**: For positional transitions
- **Scale Animations**: For size-based transitions
- **Rotation Animations**: For rotational effects

Specific animation type values are documented in the specialized structures that inherit from this base.

## Inheritance

This base `ANIMATION` specification is inherited by more specialized animation types:

- **[`PANEL_ANIMATION`](../specialized-structures/PANEL_ANIMATION.md):** Animations specific to panel interface elements.

Refer to these specific documents for details on their `animation_type`s and any additional attributes they may define.
