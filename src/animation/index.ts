/**
 * @fileoverview Protocol-owned panel animation, effect, icon, default, and validation helpers.
 *
 * This module is runtime-agnostic: it does not import React, Framer Motion, app loggers,
 * persistence libraries, or producer/consumer application code. Protocol producers use these
 * constants before emitting JSON, and protocol consumers use the same constants while rendering.
 *
 * @example
 * ```typescript
 * import {
 *   ANIMATION_TRIGGERS,
 *   CommunicationProtocol_Animation_validateTrigger,
 * } from "@gg-utils/chat-comms/animation";
 *
 * const result = CommunicationProtocol_Animation_validateTrigger(
 *   ANIMATION_TRIGGERS.PANEL_BODY_CONTENT_LOADED
 * );
 * void result.isValid;
 * ```
 */

type UnknownRecord = Record<string, unknown>;

function isUnknownRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringMember<const Values extends readonly string[]>(
  values: Values,
  value: string
): value is Values[number] {
  return values.some(item => item === value);
}

// ============================================================================
// Panel Header Icon Constants and Types
// ============================================================================

export const PANEL_HEADER_ICONS = {
  CHATGPT: "panel-icon-chatgpt",
  GEMINI: "panel-icon-gemini",
  CLAUDE: "panel-icon-claude",
  PERPLEXITY: "panel-icon-perplexity",
  DEEPSEEK: "panel-icon-deepseek",
  GROK: "panel-icon-grok",
  COPILOT: "panel-icon-copilot",
  WEB: "panel-icon-web",
  GOOGLE_SEARCH: "panel-icon-google-search",
  GOOGLE_MAPS: "panel-icon-google-maps",
  WEB_SEARCH: "panel-icon-web-search",
  WEBSITE_CRAWLING: "panel-icon-website-crawling",
  DATA_PROCESSING: "panel-icon-data-processing",
  AI_ANALYSIS: "panel-icon-ai-analysis",
  DATABASE: "panel-icon-database",
  API: "panel-icon-api",
  FILE_UPLOAD: "panel-icon-file-upload",
  SECURITY: "panel-icon-security",
} as const;

export const PREDEFINED_PANEL_ICONS = Object.values(PANEL_HEADER_ICONS);

export type PredefinedPanelHeaderIcon =
  (typeof PANEL_HEADER_ICONS)[keyof typeof PANEL_HEADER_ICONS];

/** Panel header icon wire value. URLs are accepted for custom icons. */
export type PanelHeaderIcon = string;

export type PanelIconCategory = "ai" | "search" | "data" | "system";

export function PanelHeaderIcons_isPredefinedPanelHeaderIcon(
  icon: string
): icon is PredefinedPanelHeaderIcon {
  return isStringMember(PREDEFINED_PANEL_ICONS, icon);
}

export function getPanelIconsByCategory(category: PanelIconCategory) {
  switch (category) {
    case "ai":
      return {
        CHATGPT: PANEL_HEADER_ICONS.CHATGPT,
        GEMINI: PANEL_HEADER_ICONS.GEMINI,
        CLAUDE: PANEL_HEADER_ICONS.CLAUDE,
        PERPLEXITY: PANEL_HEADER_ICONS.PERPLEXITY,
        DEEPSEEK: PANEL_HEADER_ICONS.DEEPSEEK,
        GROK: PANEL_HEADER_ICONS.GROK,
        COPILOT: PANEL_HEADER_ICONS.COPILOT,
      };
    case "search":
      return {
        WEB: PANEL_HEADER_ICONS.WEB,
        GOOGLE_SEARCH: PANEL_HEADER_ICONS.GOOGLE_SEARCH,
        GOOGLE_MAPS: PANEL_HEADER_ICONS.GOOGLE_MAPS,
        WEB_SEARCH: PANEL_HEADER_ICONS.WEB_SEARCH,
        WEBSITE_CRAWLING: PANEL_HEADER_ICONS.WEBSITE_CRAWLING,
      };
    case "data":
      return {
        DATA_PROCESSING: PANEL_HEADER_ICONS.DATA_PROCESSING,
        AI_ANALYSIS: PANEL_HEADER_ICONS.AI_ANALYSIS,
        DATABASE: PANEL_HEADER_ICONS.DATABASE,
        API: PANEL_HEADER_ICONS.API,
      };
    case "system":
      return {
        FILE_UPLOAD: PANEL_HEADER_ICONS.FILE_UPLOAD,
        SECURITY: PANEL_HEADER_ICONS.SECURITY,
      };
  }
}

// ============================================================================
// Animation Constants and Types
// ============================================================================

export const ANIMATION_TRIGGERS = {
  PANEL_HEADER_VISIBILITY_VISIBLE: "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
  PANEL_BODY_VISIBILITY_VISIBLE: "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
  PANEL_BODY_VISIBILITY_HIDDEN: "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
  PANEL_HEADER_VISIBILITY_HIDDEN: "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
  PANEL_BODY_CONTENT_LOADED: "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED",
} as const;

export const PANEL_ANIMATION_TYPES = {
  EXPAND_UP: "ANIMATION_TYPE_EXPAND_UP",
  EXPAND_DOWN: "ANIMATION_TYPE_EXPAND_DOWN",
  COLLAPSE_UP: "ANIMATION_TYPE_COLLAPSE_UP",
  COLLAPSE_DOWN: "ANIMATION_TYPE_COLLAPSE_DOWN",
  FADE_IN: "ANIMATION_TYPE_FADE_IN",
  FADE_OUT: "ANIMATION_TYPE_FADE_OUT",
  SLIDE_IN_LEFT: "ANIMATION_TYPE_SLIDE_IN_LEFT",
  SLIDE_IN_RIGHT: "ANIMATION_TYPE_SLIDE_IN_RIGHT",
  SLIDE_OUT_LEFT: "ANIMATION_TYPE_SLIDE_OUT_LEFT",
  SLIDE_OUT_RIGHT: "ANIMATION_TYPE_SLIDE_OUT_RIGHT",
  SCROLL_DOWN: "ANIMATION_TYPE_SCROLL_DOWN",
  ZOOM_IN: "ANIMATION_TYPE_ZOOM_IN",
  ZOOM_OUT: "ANIMATION_TYPE_ZOOM_OUT",
  SCALE_IN: "ANIMATION_TYPE_SCALE_IN",
  SCALE_OUT: "ANIMATION_TYPE_SCALE_OUT",
  ROTATE_IN: "ANIMATION_TYPE_ROTATE_IN",
  ROTATE_OUT: "ANIMATION_TYPE_ROTATE_OUT",
} as const;

export const PANEL_VISIBILITY_STATES = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
} as const;

export const PANEL_BODY_COMMON_ASPECT_RATIOS = {
  WIDESCREEN: "16/9",
  TRADITIONAL: "4/3",
  SQUARE: "1/1",
  ULTRA_WIDE: "2/1",
  TALL: "1/2",
  PHOTOGRAPHY: "3/2",
  CINEMATIC: "21/9",
  VERTICAL_VIDEO: "9/16",
  FULL_HD: "1920/1080",
  FOUR_K: "3840/2160",
} as const;

export const EFFECT_STATES = {
  ENABLED: "EFFECT_STATE_ENABLED",
  DISABLED: "EFFECT_STATE_DISABLED",
} as const;

export const PANEL_EFFECT_TYPES = {
  LASER_SWEEP: "EFFECT_LASER_SWEEP",
} as const;

const ANIMATION_TRIGGER_VALUES = Object.values(ANIMATION_TRIGGERS);
const PANEL_ANIMATION_TYPE_VALUES = Object.values(PANEL_ANIMATION_TYPES);
const PANEL_VISIBILITY_STATE_VALUES = Object.values(PANEL_VISIBILITY_STATES);
const EFFECT_STATE_VALUES = Object.values(EFFECT_STATES);
const PANEL_EFFECT_TYPE_VALUES = Object.values(PANEL_EFFECT_TYPES);

export type AnimationTrigger = (typeof ANIMATION_TRIGGER_VALUES)[number];
export type AnimationTriggerCategory = "opening" | "closing" | "content";
export type AnimationType = (typeof PANEL_ANIMATION_TYPE_VALUES)[number];
export type PanelAnimationCategory =
  | "expand"
  | "collapse"
  | "fade"
  | "slide"
  | "scale"
  | "rotate"
  | "special";

export type FramerMotionEasing =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | [number, number, number, number];

export type FramerMotionType = "spring" | "tween" | "inertia";
export type FramerMotionRepeatType = "loop" | "reverse" | "mirror";
export type PanelVisibilityState = (typeof PANEL_VISIBILITY_STATE_VALUES)[number];

export type PanelBodyAspectRatio =
  string;

export interface CommunicationProtocol_FramerMotionAttributes {
  delay?: number;
  duration?: number;
  repeatDelay?: number;
  ease?: FramerMotionEasing;
  type?: FramerMotionType;
  damping?: number;
  stiffness?: number;
  mass?: number;
  velocity?: number;
  restDelta?: number;
  restSpeed?: number;
  times?: number[];
  repeat?: number;
  repeatType?: FramerMotionRepeatType;
  opacity?: number | Record<string, unknown>;
}

export interface CommunicationProtocol_PanelTransition {
  animation_trigger: AnimationTrigger;
  animation_type: AnimationType;
  animation_framer_motion_attributes: CommunicationProtocol_FramerMotionAttributes;
}

export type EffectState = (typeof EFFECT_STATE_VALUES)[number];
export type PanelEffectType = (typeof PANEL_EFFECT_TYPE_VALUES)[number];

export interface CommunicationProtocol_PanelEffect {
  effect_type: PanelEffectType;
  effect_state?: EffectState;
  effect_framer_motion_attributes: CommunicationProtocol_FramerMotionAttributes;
}

export function AnimationTypes_isPredefinedPanelIcon(icon: string): boolean {
  return PanelHeaderIcons_isPredefinedPanelHeaderIcon(icon);
}

export function AnimationTypes_isValidAspectRatio(ratio: string): boolean {
  if (ratio === "auto") {
    return true;
  }
  return /^\d+\/\d+$/.test(ratio);
}

export function AnimationTypes_isCubicBezierEasing(
  easing: FramerMotionEasing
): easing is [number, number, number, number] {
  return (
    Array.isArray(easing) && easing.length === 4 && easing.every(value => typeof value === "number")
  );
}

export function getAnimationTriggersByCategory(category: AnimationTriggerCategory) {
  switch (category) {
    case "opening":
      return [
        ANIMATION_TRIGGERS.PANEL_HEADER_VISIBILITY_VISIBLE,
        ANIMATION_TRIGGERS.PANEL_BODY_VISIBILITY_VISIBLE,
      ];
    case "closing":
      return [
        ANIMATION_TRIGGERS.PANEL_BODY_VISIBILITY_HIDDEN,
        ANIMATION_TRIGGERS.PANEL_HEADER_VISIBILITY_HIDDEN,
      ];
    case "content":
      return [ANIMATION_TRIGGERS.PANEL_BODY_CONTENT_LOADED];
  }
}

export function getAnimationTypesByCategory(category: PanelAnimationCategory) {
  switch (category) {
    case "expand":
      return { UP: PANEL_ANIMATION_TYPES.EXPAND_UP, DOWN: PANEL_ANIMATION_TYPES.EXPAND_DOWN };
    case "collapse":
      return {
        UP: PANEL_ANIMATION_TYPES.COLLAPSE_UP,
        DOWN: PANEL_ANIMATION_TYPES.COLLAPSE_DOWN,
      };
    case "fade":
      return { IN: PANEL_ANIMATION_TYPES.FADE_IN, OUT: PANEL_ANIMATION_TYPES.FADE_OUT };
    case "slide":
      return {
        IN_LEFT: PANEL_ANIMATION_TYPES.SLIDE_IN_LEFT,
        IN_RIGHT: PANEL_ANIMATION_TYPES.SLIDE_IN_RIGHT,
        OUT_LEFT: PANEL_ANIMATION_TYPES.SLIDE_OUT_LEFT,
        OUT_RIGHT: PANEL_ANIMATION_TYPES.SLIDE_OUT_RIGHT,
      };
    case "scale":
      return {
        IN: PANEL_ANIMATION_TYPES.SCALE_IN,
        OUT: PANEL_ANIMATION_TYPES.SCALE_OUT,
        ZOOM_IN: PANEL_ANIMATION_TYPES.ZOOM_IN,
        ZOOM_OUT: PANEL_ANIMATION_TYPES.ZOOM_OUT,
      };
    case "rotate":
      return { IN: PANEL_ANIMATION_TYPES.ROTATE_IN, OUT: PANEL_ANIMATION_TYPES.ROTATE_OUT };
    case "special":
      return {
        SCROLL_DOWN: PANEL_ANIMATION_TYPES.SCROLL_DOWN,
        ZOOM_IN: PANEL_ANIMATION_TYPES.ZOOM_IN,
        ZOOM_OUT: PANEL_ANIMATION_TYPES.ZOOM_OUT,
        SCALE_IN: PANEL_ANIMATION_TYPES.SCALE_IN,
        SCALE_OUT: PANEL_ANIMATION_TYPES.SCALE_OUT,
        ROTATE_IN: PANEL_ANIMATION_TYPES.ROTATE_IN,
        ROTATE_OUT: PANEL_ANIMATION_TYPES.ROTATE_OUT,
      };
  }
}

export function isOpeningTrigger(trigger: string): boolean {
  return (
    trigger === ANIMATION_TRIGGERS.PANEL_HEADER_VISIBILITY_VISIBLE ||
    trigger === ANIMATION_TRIGGERS.PANEL_BODY_VISIBILITY_VISIBLE
  );
}

export function isClosingTrigger(trigger: string): boolean {
  return (
    trigger === ANIMATION_TRIGGERS.PANEL_BODY_VISIBILITY_HIDDEN ||
    trigger === ANIMATION_TRIGGERS.PANEL_HEADER_VISIBILITY_HIDDEN
  );
}

export function isContentTrigger(trigger: string): boolean {
  return trigger === ANIMATION_TRIGGERS.PANEL_BODY_CONTENT_LOADED;
}

// ============================================================================
// Protocol Defaults
// ============================================================================

export const PROGRESS_BAR_DEFAULTS = {
  INCOMPLETE_STATE: "IN_PROGRESS",
  COMPLETE_STATE: "COMPLETED",
  COMPLETED_PERCENTAGE: 100,
  DEFAULT_PERCENTAGE: 0,
  VISIBILITY: "VISIBLE",
  ANIMATION_DURATION_MS: 0,
  NEXT_GOAL_DELAY_MS: 0,
} as const;

export const PANEL_DEFAULTS = {
  VISIBILITY: "VISIBLE",
  BODY_ASPECT_RATIO: "16/9",
  CONTENT_WIDTH: "WIDTH_AUTO",
  IMAGE_ANIMATION: {
    TYPE: "IMAGE_ANIMATION_NONE",
    GRAVITY: "IMAGE_GRAVITY_TOP_CENTER",
    SIZING: "IMAGE_SIZING_COVER",
  },
} as const;

export const PANEL_ANIMATION_DEFAULTS = {
  PANEL_ANIMATION_TYPES: {
    PANEL_OPEN_HEADER: "ANIMATION_TYPE_EXPAND_UP",
    PANEL_OPEN_BODY: "ANIMATION_TYPE_EXPAND_DOWN",
    PANEL_CLOSE_HEADER: "ANIMATION_TYPE_COLLAPSE_DOWN",
    PANEL_CLOSE_BODY: "ANIMATION_TYPE_COLLAPSE_UP",
  },
  FRAMER_MOTION: {
    PANEL_OPEN_HEADER: { delay: 0.1, duration: 1.5, ease: "easeOut" },
    PANEL_OPEN_BODY: { delay: 0.3, duration: 3.0, ease: "easeInOut" },
    PANEL_CLOSE_HEADER: { delay: 0.1, duration: 0.3, ease: "easeOut" },
    PANEL_CLOSE_BODY: { delay: 0.1, duration: 0.3, ease: "easeOut" },
  },
} as const;

// ============================================================================
// Validation
// ============================================================================

export class CommunicationProtocol_Animation_ValidationError extends Error {
  constructor(
    message: string,
    public readonly property: string,
    public readonly value: unknown,
    public readonly context?: string
  ) {
    super(message);
    this.name = "CommunicationProtocol_Animation_ValidationError";
  }
}

export interface CommunicationProtocol_Animation_ValidationResult {
  isValid: boolean;
  errors: CommunicationProtocol_Animation_ValidationError[];
  warnings: string[];
}

function createValidResult(
  errors: CommunicationProtocol_Animation_ValidationError[],
  warnings: string[]
): CommunicationProtocol_Animation_ValidationResult {
  return { isValid: errors.length === 0, errors, warnings };
}

export function CommunicationProtocol_validatePanelHeaderIcon(
  icon: unknown,
  context = "panel_header_icon"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (typeof icon !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel header icon must be a string, got ${typeof icon}`,
        context,
        icon
      )
    );
    return createValidResult(errors, warnings);
  }

  if (PanelHeaderIcons_isPredefinedPanelHeaderIcon(icon)) {
    return createValidResult(errors, warnings);
  }

  try {
    new URL(icon);
    return createValidResult(errors, warnings);
  } catch {
    const iconSuffix = icon.replace("panel-icon-", "");
    const similarIcons = PREDEFINED_PANEL_ICONS.filter(predefined =>
      predefined.includes(iconSuffix)
    );

    if (similarIcons.length > 0) {
      warnings.push(`Icon "${icon}" not found. Did you mean one of: ${similarIcons.join(", ")}?`);
    }

    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel header icon must be either a predefined icon constant or a valid URL. Got: "${icon}"`,
        context,
        icon,
        `Available predefined icons: ${PREDEFINED_PANEL_ICONS.slice(0, 5).join(", ")}...`
      )
    );
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Animation_validateTrigger(
  trigger: unknown,
  context = "animation_trigger"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (typeof trigger !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Animation trigger must be a string, got ${typeof trigger}`,
        context,
        trigger
      )
    );
    return createValidResult(errors, warnings);
  }

  if (!isStringMember(ANIMATION_TRIGGER_VALUES, trigger)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid animation trigger: "${trigger}"`,
        context,
        trigger,
        `Valid triggers: ${ANIMATION_TRIGGER_VALUES.join(", ")}`
      )
    );
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Animation_validateType(
  animationType: unknown,
  context = "animation_type"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (typeof animationType !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Animation type must be a string, got ${typeof animationType}`,
        context,
        animationType
      )
    );
    return createValidResult(errors, warnings);
  }

  if (!isStringMember(PANEL_ANIMATION_TYPE_VALUES, animationType)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid animation type: "${animationType}"`,
        context,
        animationType,
        `Valid types: ${PANEL_ANIMATION_TYPE_VALUES.join(", ")}`
      )
    );
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Animation_validateFramerMotionEasing(
  easing: unknown,
  context = "ease"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];
  const validEasings = [
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
  ] as const;

  if (typeof easing === "string") {
    if (isStringMember(validEasings, easing)) {
      return createValidResult(errors, warnings);
    }
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid easing string: "${easing}"`,
        context,
        easing,
        `Valid easings: ${validEasings.join(", ")}`
      )
    );
    return createValidResult(errors, warnings);
  }

  if (Array.isArray(easing)) {
    if (easing.length !== 4) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `Cubic-bezier array must have exactly 4 elements, got ${easing.length}`,
          context,
          easing
        )
      );
      return createValidResult(errors, warnings);
    }

    const invalidIndex = easing.findIndex(item => typeof item !== "number");
    if (invalidIndex !== -1) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `Cubic-bezier array element ${invalidIndex} must be a number`,
          context,
          easing
        )
      );
    }
    return createValidResult(errors, warnings);
  }

  errors.push(
    new CommunicationProtocol_Animation_ValidationError(
      `Easing must be either a string or cubic-bezier array [x1, y1, x2, y2], got ${typeof easing}`,
      context,
      easing
    )
  );
  return createValidResult(errors, warnings);
}

function appendFramerMotionAttributesNumericPropErrors(options: {
  attrs: UnknownRecord;
  context: string;
  errors: CommunicationProtocol_Animation_ValidationError[];
}): void {
  const { attrs, context, errors } = options;
  const numericProps = [
    "delay",
    "duration",
    "damping",
    "stiffness",
    "mass",
    "restDelta",
    "restSpeed",
  ];

  for (const prop of numericProps) {
    if (!(prop in attrs)) {
      continue;
    }
    const value = attrs[prop];
    if (typeof value !== "number") {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `${prop} must be a number, got ${typeof value}`,
          `${context}.${prop}`,
          value
        )
      );
    } else if (value < 0) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `${prop} must be >= 0, got ${String(value)}`,
          `${context}.${prop}`,
          value
        )
      );
    }
  }
}

function appendFramerMotionAttributesTimesErrors(options: {
  attrs: UnknownRecord;
  context: string;
  errors: CommunicationProtocol_Animation_ValidationError[];
}): void {
  const { attrs, context, errors } = options;
  if (!("times" in attrs)) {
    return;
  }
  const { times } = attrs;
  if (!Array.isArray(times)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `times must be an array, got ${typeof times}`,
        `${context}.times`,
        times
      )
    );
    return;
  }

  for (let i = 0; i < times.length; i++) {
    const value: unknown = times[i];
    if (typeof value !== "number" || value < 0 || value > 1) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `times[${i}] must be a number between 0 and 1, got ${String(value)}`,
          `${context}.times[${i}]`,
          value
        )
      );
    }
  }
}

export function CommunicationProtocol_Animation_validateFramerMotionAttributes(
  attributes: unknown,
  context = "animation_framer_motion_attributes"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (!isUnknownRecord(attributes)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Framer Motion attributes must be an object, got ${typeof attributes}`,
        context,
        attributes
      )
    );
    return createValidResult(errors, warnings);
  }

  appendFramerMotionAttributesNumericPropErrors({ attrs: attributes, context, errors });

  if ("ease" in attributes) {
    const result = CommunicationProtocol_Animation_validateFramerMotionEasing(
      attributes.ease,
      `${context}.ease`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if ("type" in attributes) {
    const validTypes = ["spring", "tween", "inertia"] as const;
    const { type } = attributes;
    if (typeof type !== "string" || !isStringMember(validTypes, type)) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `Invalid animation type: "${String(type)}"`,
          `${context}.type`,
          type,
          `Valid types: ${validTypes.join(", ")}`
        )
      );
    }
  }

  if ("repeatType" in attributes) {
    const validRepeatTypes = ["loop", "reverse", "mirror"] as const;
    const { repeatType } = attributes;
    if (typeof repeatType !== "string" || !isStringMember(validRepeatTypes, repeatType)) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `Invalid repeat type: "${String(repeatType)}"`,
          `${context}.repeatType`,
          repeatType,
          `Valid repeat types: ${validRepeatTypes.join(", ")}`
        )
      );
    }
  }

  if ("repeat" in attributes) {
    const { repeat } = attributes;
    if (typeof repeat !== "number" || repeat < 0) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `repeat must be a number >= 0, got ${String(repeat)}`,
          `${context}.repeat`,
          repeat
        )
      );
    }
  }

  if ("repeatDelay" in attributes) {
    const { repeatDelay } = attributes;
    if (typeof repeatDelay !== "number" || repeatDelay < 0) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `repeatDelay must be a number >= 0, got ${String(repeatDelay)}`,
          `${context}.repeatDelay`,
          repeatDelay
        )
      );
    }
  }

  appendFramerMotionAttributesTimesErrors({ attrs: attributes, context, errors });
  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Animation_validatePanelTransition(
  transition: unknown,
  context = "panel_transition"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (!isUnknownRecord(transition)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel transition must be an object, got ${typeof transition}`,
        context,
        transition
      )
    );
    return createValidResult(errors, warnings);
  }

  if (!("animation_trigger" in transition)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        "Panel transition missing required property: animation_trigger",
        `${context}.animation_trigger`,
        transition
      )
    );
  } else {
    const result = CommunicationProtocol_Animation_validateTrigger(
      transition.animation_trigger,
      `${context}.animation_trigger`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if (!("animation_type" in transition)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        "Panel transition missing required property: animation_type",
        `${context}.animation_type`,
        transition
      )
    );
  } else {
    const result = CommunicationProtocol_Animation_validateType(
      transition.animation_type,
      `${context}.animation_type`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if (!("animation_framer_motion_attributes" in transition)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        "Panel transition missing required property: animation_framer_motion_attributes",
        `${context}.animation_framer_motion_attributes`,
        transition
      )
    );
  } else {
    const result = CommunicationProtocol_Animation_validateFramerMotionAttributes(
      transition.animation_framer_motion_attributes,
      `${context}.animation_framer_motion_attributes`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_PanelBody_validatePanelTransitions(
  transitions: unknown,
  context = "panel_transitions"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (!Array.isArray(transitions)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel transitions must be an array, got ${typeof transitions}`,
        context,
        transitions
      )
    );
    return createValidResult(errors, warnings);
  }

  for (let i = 0; i < transitions.length; i++) {
    const result = CommunicationProtocol_Animation_validatePanelTransition(
      transitions[i],
      `${context}[${i}]`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  const triggers = transitions
    .map(transition => {
      if (isUnknownRecord(transition) && typeof transition.animation_trigger === "string") {
        return transition.animation_trigger;
      }
      return null;
    })
    .filter((trigger): trigger is string => trigger !== null);

  if (new Set(triggers).size < triggers.length) {
    warnings.push(
      "Duplicate animation triggers found in panel_transitions. Each trigger should typically appear only once."
    );
  }

  return createValidResult(errors, warnings);
}

export function validatePanelEffect(
  effect: unknown,
  context = "panel_effect"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (!isUnknownRecord(effect)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel effect must be an object, got ${typeof effect}`,
        context,
        effect
      )
    );
    return createValidResult(errors, warnings);
  }

  if (!("effect_type" in effect)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        "Panel effect missing required property: effect_type",
        `${context}.effect_type`,
        effect
      )
    );
  } else if (typeof effect.effect_type !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `effect_type must be a string, got ${typeof effect.effect_type}`,
        `${context}.effect_type`,
        effect.effect_type
      )
    );
  } else if (!isStringMember(PANEL_EFFECT_TYPE_VALUES, effect.effect_type)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid effect_type: "${effect.effect_type}"`,
        `${context}.effect_type`,
        effect.effect_type,
        `Valid types: ${PANEL_EFFECT_TYPE_VALUES.join(", ")}`
      )
    );
  }

  if ("effect_state" in effect && effect.effect_state != null) {
    if (typeof effect.effect_state !== "string") {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `effect_state must be a string, got ${typeof effect.effect_state}`,
          `${context}.effect_state`,
          effect.effect_state
        )
      );
    } else if (!isStringMember(EFFECT_STATE_VALUES, effect.effect_state)) {
      errors.push(
        new CommunicationProtocol_Animation_ValidationError(
          `Invalid effect_state: "${effect.effect_state}"`,
          `${context}.effect_state`,
          effect.effect_state,
          `Valid states: ${EFFECT_STATE_VALUES.join(", ")}`
        )
      );
    }
  }

  if (!("effect_framer_motion_attributes" in effect)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        "Panel effect missing required property: effect_framer_motion_attributes",
        `${context}.effect_framer_motion_attributes`,
        effect
      )
    );
  } else {
    const result = CommunicationProtocol_Animation_validateFramerMotionAttributes(
      effect.effect_framer_motion_attributes,
      `${context}.effect_framer_motion_attributes`
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return createValidResult(errors, warnings);
}

export function validatePanelEffects(
  effects: unknown,
  context = "panel_effects"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (effects == null) {
    return createValidResult(errors, warnings);
  }

  if (!Array.isArray(effects)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel effects must be an array, got ${typeof effects}`,
        context,
        effects
      )
    );
    return createValidResult(errors, warnings);
  }

  for (let i = 0; i < effects.length; i++) {
    const result = validatePanelEffect(effects[i], `${context}[${i}]`);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_validatePanelVisibility(
  visibility: unknown,
  context = "panel_visibility"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (typeof visibility !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel visibility must be a string, got ${typeof visibility}`,
        context,
        visibility
      )
    );
    return createValidResult(errors, warnings);
  }

  if (!isStringMember(PANEL_VISIBILITY_STATE_VALUES, visibility)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid panel visibility state: "${visibility}"`,
        context,
        visibility,
        `Valid states: ${PANEL_VISIBILITY_STATE_VALUES.join(", ")}`
      )
    );
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio(
  aspectRatio: unknown,
  context = "panel_body_aspect_ratio"
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if (typeof aspectRatio !== "string") {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Panel body aspect ratio must be a string, got ${typeof aspectRatio}`,
        context,
        aspectRatio
      )
    );
    return createValidResult(errors, warnings);
  }

  const commonRatios = Object.values(PANEL_BODY_COMMON_ASPECT_RATIOS);
  if (isStringMember(commonRatios, aspectRatio)) {
    return createValidResult(errors, warnings);
  }

  if (!/^\d+\/\d+$/.test(aspectRatio)) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Invalid aspect ratio format: "${aspectRatio}". Must be in "width/height" format.`,
        context,
        aspectRatio,
        `Common ratios: ${commonRatios.slice(0, 5).join(", ")}...`
      )
    );
    return createValidResult(errors, warnings);
  }

  const [widthText, heightText] = aspectRatio.split("/");
  const width = Number(widthText);
  const height = Number(heightText);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    errors.push(
      new CommunicationProtocol_Animation_ValidationError(
        `Aspect ratio width and height must be positive numbers, got "${aspectRatio}"`,
        context,
        aspectRatio
      )
    );
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Panel_validatePanelAnimationConfig(
  panelConfig: UnknownRecord
): CommunicationProtocol_Animation_ValidationResult {
  const errors: CommunicationProtocol_Animation_ValidationError[] = [];
  const warnings: string[] = [];

  if ("panel_header_icon" in panelConfig && panelConfig.panel_header_icon != null) {
    const result = CommunicationProtocol_validatePanelHeaderIcon(panelConfig.panel_header_icon);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if ("panel_visibility" in panelConfig && panelConfig.panel_visibility != null) {
    const result = CommunicationProtocol_validatePanelVisibility(panelConfig.panel_visibility);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if ("panel_body_aspect_ratio" in panelConfig && panelConfig.panel_body_aspect_ratio != null) {
    const result = CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio(
      panelConfig.panel_body_aspect_ratio
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if ("panel_transitions" in panelConfig && panelConfig.panel_transitions != null) {
    const result = CommunicationProtocol_PanelBody_validatePanelTransitions(
      panelConfig.panel_transitions
    );
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  if ("panel_effects" in panelConfig && panelConfig.panel_effects != null) {
    const result = validatePanelEffects(panelConfig.panel_effects);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return createValidResult(errors, warnings);
}

export function CommunicationProtocol_Panel_createValidationSummary(
  result: CommunicationProtocol_Animation_ValidationResult
): string {
  const lines: string[] = [];

  lines.push(`Validation Result: ${result.isValid ? "✅ VALID" : "❌ INVALID"}`);

  if (result.errors.length > 0) {
    lines.push(`\nErrors (${result.errors.length}):`);
    result.errors.forEach((error, index) => {
      lines.push(`  ${index + 1}. [${error.property}] ${error.message}`);
      if (error.context) {
        lines.push(`     Context: ${error.context}`);
      }
    });
  }

  if (result.warnings.length > 0) {
    lines.push(`\nWarnings (${result.warnings.length}):`);
    result.warnings.forEach((warning, index) => {
      lines.push(`  ${index + 1}. ${warning}`);
    });
  }

  return lines.join("\n");
}

export const CommunicationProtocol_AnimationValidationError =
  CommunicationProtocol_Animation_ValidationError;
export const validatePanelHeaderIcon = CommunicationProtocol_validatePanelHeaderIcon;
export const validateAnimationTrigger = CommunicationProtocol_Animation_validateTrigger;
export const validateAnimationType = CommunicationProtocol_Animation_validateType;
export const validateFramerMotionEasing =
  CommunicationProtocol_Animation_validateFramerMotionEasing;
export const validateFramerMotionAttributes =
  CommunicationProtocol_Animation_validateFramerMotionAttributes;
export const validatePanelTransition = CommunicationProtocol_Animation_validatePanelTransition;
export const validatePanelTransitions = CommunicationProtocol_PanelBody_validatePanelTransitions;
export const validatePanelVisibility = CommunicationProtocol_validatePanelVisibility;
export const validatePanelBodyAspectRatio =
  CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio;
export const validatePanelAnimationConfig =
  CommunicationProtocol_Panel_validatePanelAnimationConfig;
export const createValidationSummary = CommunicationProtocol_Panel_createValidationSummary;
