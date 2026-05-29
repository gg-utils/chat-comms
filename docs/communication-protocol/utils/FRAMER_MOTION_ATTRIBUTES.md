---
description: "Comprehensive specification for Framer Motion attributes in the communication protocol. Reference guide for animation_framer_motion_attributes objects across all animation types. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

# Framer Motion Attributes Reference

This document provides a comprehensive reference for all supported Framer Motion attributes used in `animation_framer_motion_attributes` objects throughout the communication protocol. These attributes also apply to `effect_framer_motion_attributes` where relevant for overlay effects. All attributes are compatible with Framer Motion's transition system and provide fine-grained control over animation and effect behavior.

## Overview

The `animation_framer_motion_attributes` object is used across all animation types in the communication protocol to define animation timing, easing, and behavior. All attributes are optional and have sensible defaults when not specified.

## Core Timing Attributes

### `delay` (number)

- **Description**: Time in seconds before the animation starts
- **Type**: Number (≥ 0)
- **Default**: `0`
- **Example**: `0.2` (200ms delay)

### `duration` (number)

- **Description**: Length of the animation in seconds
- **Type**: Number (≥ 0)
- **Default**: Varies by animation type (typically `0.3` for UI animations)
- **Example**: `1.5` (1.5 second animation)

### `ease` (string | array)

- **Description**: ChatComms_RuntimeChat_Easing function that controls animation acceleration
- **Type**: String (predefined) or Array of 4 numbers (cubic-bezier)
- **Default**: `"easeOut"`

#### Predefined ChatComms_RuntimeChat_Easing Values:

- `"linear"` - Constant speed throughout
- `"easeIn"` - Slow start, fast end
- `"easeOut"` - Fast start, slow end (recommended for entrances)
- `"easeInOut"` - Slow start and end, fast middle
- `"circIn"` - Circular easing in
- `"circOut"` - Circular easing out
- `"circInOut"` - Circular easing in and out
- `"backIn"` - Back easing with overshoot at start
- `"backOut"` - Back easing with overshoot at end
- `"backInOut"` - Back easing with overshoot at both ends
- `"anticipate"` - Anticipate easing with slight backward motion

#### Custom Cubic-Bezier:

- **Format**: `[x1, y1, x2, y2]` where each value is between 0 and 1
- **Example**: `[0.25, 0.46, 0.45, 0.94]` (custom smooth curve)
- **Common presets**:
  - `[0.25, 0.1, 0.25, 1]` - Ease (CSS equivalent)
  - `[0.42, 0, 1, 1]` - Ease-in
  - `[0, 0, 0.58, 1]` - Ease-out
  - `[0.42, 0, 0.58, 1]` - Ease-in-out

## Animation Type Attributes

### `type` (string)

- **Description**: Specifies the animation engine to use
- **Type**: String enum
- **Default**: `"spring"`
- **Values**:
  - `"spring"` - Physics-based spring animation (natural, bouncy)
  - `"tween"` - Time-based linear interpolation (predictable timing)
  - `"inertia"` - Momentum-based animation (realistic deceleration)

## Spring Animation Attributes

These attributes only apply when `type` is `"spring"`:

### `damping` (number)

- **Description**: Strength of opposing force that reduces oscillation
- **Type**: Number (≥ 0)
- **Default**: `10`
- **Range**: `0` (no damping, infinite oscillation) to `100` (heavily damped)
- **Usage**: Higher values = less bouncy, faster settling

### `stiffness` (number)

- **Description**: Spring stiffness that affects animation speed
- **Type**: Number (≥ 0)
- **Default**: `100`
- **Range**: `1` (very slow) to `1000` (very fast)
- **Usage**: Higher values = faster animation

### `mass` (number)

- **Description**: Mass of the animated object
- **Type**: Number (≥ 0)
- **Default**: `1`
- **Range**: `0.1` (light) to `10` (heavy)
- **Usage**: Higher values = slower, more momentum

### `velocity` (number)

- **Description**: Initial velocity of the animation
- **Type**: Number (any value)
- **Default**: `0`
- **Usage**: Positive values start with forward motion, negative with backward

### `restDelta` (number)

- **Description**: End animation when absolute speed drops below this value
- **Type**: Number (≥ 0)
- **Default**: `0.01`
- **Usage**: Lower values = more precise stopping, higher values = earlier stopping

### `restSpeed` (number)

- **Description**: End animation when speed drops below this value
- **Type**: Number (≥ 0)
- **Default**: `10`
- **Usage**: Lower values = animation runs longer, higher values = stops earlier

## Tween Animation Attributes

These attributes only apply when `type` is `"tween"`:

### `times` (array)

- **Description**: Array of values between 0 and 1 defining keyframe positions
- **Type**: Array of numbers (each 0 ≤ n ≤ 1)
- **Default**: `undefined` (linear progression)
- **Example**: `[0, 0.2, 0.8, 1]` (slow start, fast middle, slow end)

## Repeat Attributes

### `repeat` (number)

- **Description**: Number of times to repeat the animation
- **Type**: Number (≥ 0)
- **Default**: `0` (no repeat)
- **Special**: Use `Infinity` for infinite loops
- **Example**: `3` (repeat 3 times after initial play)

### `repeatType` (string)

- **Description**: How the animation repeats
- **Type**: String enum
- **Default**: `"loop"`
- **Values**:
  - `"loop"` - Restart from beginning each time
  - `"reverse"` - Alternate between forward and reverse
  - `"mirror"` - Mirror the animation values on alternate iterations

### `repeatDelay` (number)

- **Description**: Delay in seconds between repeated cycles
- **Type**: Number (≥ 0)
- **Default**: `0`
- **Example**: `0.1` (100ms pause between repeats)

Note: Some JSON serializers may not support `Infinity`. If you need infinite repetition, consider a very large `repeat` value (e.g., `999999`) or handle infinity at runtime.

## Common Attribute Combinations

### Smooth Panel Expansion

```json
{
  "delay": 0.1,
  "duration": 0.6,
  "ease": "easeOut",
  "type": "spring",
  "damping": 15,
  "stiffness": 120
}
```

### Quick Fade In

```json
{
  "delay": 0,
  "duration": 0.3,
  "ease": "easeOut",
  "type": "tween"
}
```

### Bouncy Button Press

```json
{
  "delay": 0,
  "ease": "backOut",
  "type": "spring",
  "damping": 8,
  "stiffness": 200
}
```

### Typewriter Effect

```json
{
  "delay": 0.5,
  "duration": 2.0,
  "ease": "linear",
  "type": "tween"
}
```

### Pulsing Animation

```json
{
  "duration": 1.0,
  "ease": "easeInOut",
  "type": "tween",
  "repeat": "Infinity",
  "repeatType": "reverse"
}
```

## Property-level Overrides

You can override transition settings for specific animated properties using nested keys (for example, `opacity`). This is useful to coordinate per-property timing while sharing a base transition.

```json
{
  "delay": 1.6,
  "duration": 1.5,
  "ease": "easeInOut",
  "repeat": 999999,
  "repeatDelay": 0.1,
  "repeatType": "mirror",
  "opacity": { "delay": 1.6, "duration": 0 }
}
```

## Performance Considerations

### Recommended Practices:

- Use spring animations for natural, interactive elements
- Use tween animations for precise, predictable timing
- Keep durations under 1 second for most UI interactions
- Use higher damping values for professional, subtle animations
- Use lower damping values for playful, bouncy animations

### Performance Refinement:

- Avoid excessive repeat values
- Use restDelta and restSpeed to ensure clean animation completion
- Consider the cumulative effect of multiple simultaneous animations
- Test on lower-end devices to ensure smooth performance

## Accessibility Considerations

### Motion Sensitivity:

- Provide alternatives for users with motion sensitivity
- Consider using `prefers-reduced-motion` media query equivalents
- Keep essential information visible during animations
- Ensure animations don't interfere with screen readers

### Recommended Reduced Motion Settings:

```json
{
  "duration": 0.1,
  "ease": "linear",
  "type": "tween"
}
```

## Validation Schemas

### JSON Schema

```json
{
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
        {
          "type": "array",
          "items": { "type": "number" },
          "minItems": 4,
          "maxItems": 4
        }
      ]
    },
    "type": { "type": "string", "enum": ["spring", "tween", "inertia"] },
    "damping": { "type": "number", "minimum": 0 },
    "stiffness": { "type": "number", "minimum": 0 },
    "mass": { "type": "number", "minimum": 0 },
    "velocity": { "type": "number" },
    "restDelta": { "type": "number", "minimum": 0 },
    "restSpeed": { "type": "number", "minimum": 0 },
    "times": {
      "type": "array",
      "items": { "type": "number", "minimum": 0, "maximum": 1 }
    },
    "repeat": { "type": "number", "minimum": 0 },
    "repeatType": { "type": "string", "enum": ["loop", "reverse", "mirror"] }
  },
  "additionalProperties": false
}
```

## Related Documentation

- [Base ANIMATION Specification](../base-structures/ANIMATION.md)
- [PANEL_ANIMATION Specification](../specialized-structures/PANEL_ANIMATION.md)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

## Examples in Context

For comprehensive usage examples showing these attributes in real-world scenarios, see:

- [CHAT_CONTENT_PANEL Usage Examples](../type-usage-examples/CHAT_CONTENT_PANEL.md)
- [CHAT_ACTION_UPDATE_PANEL Usage Examples](../type-usage-examples/CHAT_ACTION_UPDATE_PANEL.md)

This reference ensures consistent and effective use of Framer Motion attributes across all animation implementations in the communication protocol.
