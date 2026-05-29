---
description: "Specification for PANEL_ANIMATION specialized structure. Specification for PANEL_ANIMATION in the communication protocol. Animation effects specifically designed for panel interface elements. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **📚 [Communication Protocol](../../README.md)**

> **↩️ Back to [Specialized Structures](./README.md)**

# `PANEL_ANIMATION` Specification

The `PANEL_ANIMATION` is a specialized type representing animation effects specifically designed for panel interface elements. It extends the base [ANIMATION](../base-structures/ANIMATION.md) structure to provide panel-specific animation behaviors for transitions, state changes, and visual effects.

`PANEL_ANIMATION` objects are used to define smooth transitions and visual effects for panel elements such as headers, bodies, and their opening/closing behaviors. They leverage Framer Motion's animation capabilities to create polished user experiences within panel interfaces.

## General Attributes

All `PANEL_ANIMATION` objects inherit the common attributes from the base `ANIMATION` structure:

- `animation_type` (string, required): Defines the specific type of panel animation to be performed. This field determines the expected animation behavior and visual effect.
- `animation_framer_motion_attributes` (object, required): An object containing Framer Motion-compatible animation configuration parameters. The structure follows the base `ANIMATION` specification with full support for all Framer Motion transition properties.

## Panel Animation Types

The `animation_type` field for `PANEL_ANIMATION` accepts string values that define the specific animation behavior for panel interface elements. The exact supported values depend on the context and implementation where the animation is used.

Common categories of panel animations include:

### Panel State Animations

- **Expand animations** for revealing panel content (opening transitions)
- **Collapse animations** for hiding panel content (closing transitions)

### Panel Component Animations

- **Header animations** for panel header transitions
- **Body animations** for panel body content transitions
- **Combined animations** for coordinated header and body effects

### Transition Timing

- **Staggered animations** with different delays for header and body components
- **Synchronized animations** for simultaneous transitions
- **Sequential animations** for ordered transition sequences

Specific `animation_type` values and their usage are documented in the type specifications that implement `PANEL_ANIMATION` objects, such as `CHAT_CONTENT_PANEL` and `CHAT_ACTION_UPDATE_PANEL`.

Package-supported panel animation type tokens are:

- `ANIMATION_TYPE_EXPAND_UP`
- `ANIMATION_TYPE_EXPAND_DOWN`
- `ANIMATION_TYPE_COLLAPSE_UP`
- `ANIMATION_TYPE_COLLAPSE_DOWN`
- `ANIMATION_TYPE_FADE_IN`
- `ANIMATION_TYPE_FADE_OUT`
- `ANIMATION_TYPE_SLIDE_IN_LEFT`
- `ANIMATION_TYPE_SLIDE_IN_RIGHT`
- `ANIMATION_TYPE_SLIDE_OUT_LEFT`
- `ANIMATION_TYPE_SLIDE_OUT_RIGHT`
- `ANIMATION_TYPE_SCROLL_DOWN`
- `ANIMATION_TYPE_ZOOM_IN`
- `ANIMATION_TYPE_ZOOM_OUT`
- `ANIMATION_TYPE_SCALE_IN`
- `ANIMATION_TYPE_SCALE_OUT`
- `ANIMATION_TYPE_ROTATE_IN`
- `ANIMATION_TYPE_ROTATE_OUT`

## JSON Schema Definition for `PANEL_ANIMATION`

This schema extends the base `ANIMATION` schema for panel-specific animations:

```json
{
  "type": "object",
  "required": ["animation_type", "animation_framer_motion_attributes"],
  "properties": {
    "animation_type": {
      "type": "string",
      "description": "Defines the specific type of panel animation to be performed. Supported values depend on the implementation context."
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

## Triggered Usage Examples (within panel_transitions arrays)

Panel transitions associate a `PANEL_ANIMATION` with an explicit trigger. Common triggers:

- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE`
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE`
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN`
- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN`
- `ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED`

Example entries inside a `panel_transitions` array:

```json
[
  {
    "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
    "animation_type": "ANIMATION_TYPE_EXPAND_UP",
    "animation_framer_motion_attributes": { "delay": 0.1, "duration": 0.8, "ease": "easeOut" }
  },
  {
    "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
    "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
    "animation_framer_motion_attributes": { "delay": 0.2, "duration": 1.5, "ease": "easeInOut" }
  },
  {
    "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED",
    "animation_type": "ANIMATION_TYPE_SCROLL_DOWN",
    "animation_framer_motion_attributes": { "delay": 0.0, "duration": 0.3, "ease": "easeOut" }
  }
]
```

## Zod Schema Definition

```typescript
import { z } from "zod";

const PanelAnimationTypeSchema = z.string();

const PanelAnimationFramerMotionAttributesSchema = z
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

const PanelAnimationSchema = z.object({
  animation_type: PanelAnimationTypeSchema.describe(
    "Defines the specific type of panel animation to be performed."
  ),
  animation_framer_motion_attributes: PanelAnimationFramerMotionAttributesSchema.describe(
    "Framer Motion compatible animation configuration parameters."
  ),
});

export type PanelAnimation = z.infer<typeof PanelAnimationSchema>;
```

## Joi Schema Definition

```javascript
const Joi = require("joi");

const panelAnimationTypeSchema = Joi.string();

const panelAnimationFramerMotionAttributesSchema = Joi.object({
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

const panelAnimationSchema = Joi.object({
  animation_type: panelAnimationTypeSchema
    .required()
    .description("Defines the specific type of panel animation to be performed."),
  animation_framer_motion_attributes: panelAnimationFramerMotionAttributesSchema
    .required()
    .description("Framer Motion compatible animation configuration parameters."),
});

// Example usage:
// const { error, value } = panelAnimationSchema.validate({ ... });
```

## Yup Schema Definition

```javascript
import * as yup from "yup";

const panelAnimationTypeSchema = yup.string();

const panelAnimationFramerMotionAttributesSchema = yup
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

const panelAnimationSchema = yup.object({
  animation_type: panelAnimationTypeSchema
    .required()
    .meta({ description: "Defines the specific type of panel animation to be performed." }),
  animation_framer_motion_attributes: panelAnimationFramerMotionAttributesSchema
    .required()
    .meta({ description: "Framer Motion compatible animation configuration parameters." }),
});

// Example usage:
// panelAnimationSchema.validate({ ... }).then(value => { ... }).catch(err => { ... });
```

## Example Payloads

The following examples illustrate common `PANEL_ANIMATION` configurations for different panel transition scenarios:

### Panel Header Expand Animation

```json
{
  "animation_type": "ANIMATION_TYPE_EXPAND_UP",
  "animation_framer_motion_attributes": {
    "delay": 0.1,
    "duration": 1.5,
    "ease": "easeOut",
    "type": "spring",
    "damping": 15,
    "stiffness": 120
  }
}
```

### Panel Body Expand Animation

```json
{
  "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
  "animation_framer_motion_attributes": {
    "delay": 0.3,
    "duration": 3.0,
    "ease": "easeInOut",
    "type": "spring",
    "damping": 12,
    "stiffness": 100
  }
}
```

### Panel Collapse Animation

```json
{
  "animation_type": "ANIMATION_TYPE_COLLAPSE_UP",
  "animation_framer_motion_attributes": {
    "delay": 0.1,
    "duration": 0.3,
    "ease": "easeOut",
    "type": "tween"
  }
}
```

## Usage in Panel Elements

`PANEL_ANIMATION` objects are used inside `panel_transitions` arrays for panel interface components that support animation configuration:

- **Panel Transitions**: Used in `panel_transitions` arrays for `CHAT_CONTENT_PANEL` and `CHAT_ACTION_UPDATE_PANEL`, each entry including an `animation_trigger`, `animation_type`, and `animation_framer_motion_attributes`
- **Header Animations**: Applied when triggers reflect header visibility changes
- **Body Animations**: Applied when triggers reflect body visibility changes
- **State Changes**: Smooth transitions between different panel states via explicit triggers

## Best Practices

### Animation Timing

- Use shorter durations (0.2-0.5s) for quick panel state changes
- Use medium durations (0.5-1.5s) for panel opening transitions
- Use longer durations (1.0-3.0s) for complex content reveals
- Coordinate timing between header and body animations for polished effects

### ChatComms_RuntimeChat_Easing Functions

- Use `easeOut` for panel opening animations (elements entering)
- Use `easeIn` for panel closing animations (elements leaving)
- Use `easeInOut` for reversible transitions
- Use spring animations for natural, bouncy panel effects

### Performance Considerations

- Avoid excessive `repeat` values that could impact performance
- Use `restDelta` and `restSpeed` to ensure animations complete cleanly
- Consider the cumulative effect of multiple simultaneous panel animations
- Stagger animations with appropriate delays to prevent visual overload

### Accessibility

- Provide reduced motion alternatives for users with motion sensitivity
- Ensure animations don't interfere with screen readers
- Keep essential panel information visible during transitions
- Use appropriate timing that doesn't feel rushed or sluggish

## Inheritance

This specialized `PANEL_ANIMATION` structure extends the base [`ANIMATION`](../base-structures/ANIMATION.md) specification with panel-specific animation behaviors and timing considerations.

Refer to the base `ANIMATION` documentation for additional details on the underlying animation system and Framer Motion integration.
