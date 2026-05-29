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
export declare const PANEL_HEADER_ICONS: {
    readonly CHATGPT: "panel-icon-chatgpt";
    readonly GEMINI: "panel-icon-gemini";
    readonly CLAUDE: "panel-icon-claude";
    readonly PERPLEXITY: "panel-icon-perplexity";
    readonly DEEPSEEK: "panel-icon-deepseek";
    readonly GROK: "panel-icon-grok";
    readonly COPILOT: "panel-icon-copilot";
    readonly WEB: "panel-icon-web";
    readonly GOOGLE_SEARCH: "panel-icon-google-search";
    readonly GOOGLE_MAPS: "panel-icon-google-maps";
    readonly WEB_SEARCH: "panel-icon-web-search";
    readonly WEBSITE_CRAWLING: "panel-icon-website-crawling";
    readonly DATA_PROCESSING: "panel-icon-data-processing";
    readonly AI_ANALYSIS: "panel-icon-ai-analysis";
    readonly DATABASE: "panel-icon-database";
    readonly API: "panel-icon-api";
    readonly FILE_UPLOAD: "panel-icon-file-upload";
    readonly SECURITY: "panel-icon-security";
};
export declare const PREDEFINED_PANEL_ICONS: ("panel-icon-chatgpt" | "panel-icon-gemini" | "panel-icon-claude" | "panel-icon-perplexity" | "panel-icon-deepseek" | "panel-icon-grok" | "panel-icon-copilot" | "panel-icon-web" | "panel-icon-google-search" | "panel-icon-google-maps" | "panel-icon-web-search" | "panel-icon-website-crawling" | "panel-icon-data-processing" | "panel-icon-ai-analysis" | "panel-icon-database" | "panel-icon-api" | "panel-icon-file-upload" | "panel-icon-security")[];
export type PredefinedPanelHeaderIcon = (typeof PANEL_HEADER_ICONS)[keyof typeof PANEL_HEADER_ICONS];
/** Panel header icon wire value. URLs are accepted for custom icons. */
export type PanelHeaderIcon = PredefinedPanelHeaderIcon | string;
export type PanelIconCategory = "ai" | "search" | "data" | "system";
export declare function PanelHeaderIcons_isPredefinedPanelHeaderIcon(icon: string): icon is PredefinedPanelHeaderIcon;
export declare function getPanelIconsByCategory(category: PanelIconCategory): {
    CHATGPT: "panel-icon-chatgpt";
    GEMINI: "panel-icon-gemini";
    CLAUDE: "panel-icon-claude";
    PERPLEXITY: "panel-icon-perplexity";
    DEEPSEEK: "panel-icon-deepseek";
    GROK: "panel-icon-grok";
    COPILOT: "panel-icon-copilot";
    WEB?: undefined;
    GOOGLE_SEARCH?: undefined;
    GOOGLE_MAPS?: undefined;
    WEB_SEARCH?: undefined;
    WEBSITE_CRAWLING?: undefined;
    DATA_PROCESSING?: undefined;
    AI_ANALYSIS?: undefined;
    DATABASE?: undefined;
    API?: undefined;
    FILE_UPLOAD?: undefined;
    SECURITY?: undefined;
} | {
    WEB: "panel-icon-web";
    GOOGLE_SEARCH: "panel-icon-google-search";
    GOOGLE_MAPS: "panel-icon-google-maps";
    WEB_SEARCH: "panel-icon-web-search";
    WEBSITE_CRAWLING: "panel-icon-website-crawling";
    CHATGPT?: undefined;
    GEMINI?: undefined;
    CLAUDE?: undefined;
    PERPLEXITY?: undefined;
    DEEPSEEK?: undefined;
    GROK?: undefined;
    COPILOT?: undefined;
    DATA_PROCESSING?: undefined;
    AI_ANALYSIS?: undefined;
    DATABASE?: undefined;
    API?: undefined;
    FILE_UPLOAD?: undefined;
    SECURITY?: undefined;
} | {
    DATA_PROCESSING: "panel-icon-data-processing";
    AI_ANALYSIS: "panel-icon-ai-analysis";
    DATABASE: "panel-icon-database";
    API: "panel-icon-api";
    CHATGPT?: undefined;
    GEMINI?: undefined;
    CLAUDE?: undefined;
    PERPLEXITY?: undefined;
    DEEPSEEK?: undefined;
    GROK?: undefined;
    COPILOT?: undefined;
    WEB?: undefined;
    GOOGLE_SEARCH?: undefined;
    GOOGLE_MAPS?: undefined;
    WEB_SEARCH?: undefined;
    WEBSITE_CRAWLING?: undefined;
    FILE_UPLOAD?: undefined;
    SECURITY?: undefined;
} | {
    FILE_UPLOAD: "panel-icon-file-upload";
    SECURITY: "panel-icon-security";
    CHATGPT?: undefined;
    GEMINI?: undefined;
    CLAUDE?: undefined;
    PERPLEXITY?: undefined;
    DEEPSEEK?: undefined;
    GROK?: undefined;
    COPILOT?: undefined;
    WEB?: undefined;
    GOOGLE_SEARCH?: undefined;
    GOOGLE_MAPS?: undefined;
    WEB_SEARCH?: undefined;
    WEBSITE_CRAWLING?: undefined;
    DATA_PROCESSING?: undefined;
    AI_ANALYSIS?: undefined;
    DATABASE?: undefined;
    API?: undefined;
};
export declare const ANIMATION_TRIGGERS: {
    readonly PANEL_HEADER_VISIBILITY_VISIBLE: "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE";
    readonly PANEL_BODY_VISIBILITY_VISIBLE: "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE";
    readonly PANEL_BODY_VISIBILITY_HIDDEN: "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN";
    readonly PANEL_HEADER_VISIBILITY_HIDDEN: "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN";
    readonly PANEL_BODY_CONTENT_LOADED: "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED";
};
export declare const PANEL_ANIMATION_TYPES: {
    readonly EXPAND_UP: "ANIMATION_TYPE_EXPAND_UP";
    readonly EXPAND_DOWN: "ANIMATION_TYPE_EXPAND_DOWN";
    readonly COLLAPSE_UP: "ANIMATION_TYPE_COLLAPSE_UP";
    readonly COLLAPSE_DOWN: "ANIMATION_TYPE_COLLAPSE_DOWN";
    readonly FADE_IN: "ANIMATION_TYPE_FADE_IN";
    readonly FADE_OUT: "ANIMATION_TYPE_FADE_OUT";
    readonly SLIDE_IN_LEFT: "ANIMATION_TYPE_SLIDE_IN_LEFT";
    readonly SLIDE_IN_RIGHT: "ANIMATION_TYPE_SLIDE_IN_RIGHT";
    readonly SLIDE_OUT_LEFT: "ANIMATION_TYPE_SLIDE_OUT_LEFT";
    readonly SLIDE_OUT_RIGHT: "ANIMATION_TYPE_SLIDE_OUT_RIGHT";
    readonly SCROLL_DOWN: "ANIMATION_TYPE_SCROLL_DOWN";
    readonly ZOOM_IN: "ANIMATION_TYPE_ZOOM_IN";
    readonly ZOOM_OUT: "ANIMATION_TYPE_ZOOM_OUT";
    readonly SCALE_IN: "ANIMATION_TYPE_SCALE_IN";
    readonly SCALE_OUT: "ANIMATION_TYPE_SCALE_OUT";
    readonly ROTATE_IN: "ANIMATION_TYPE_ROTATE_IN";
    readonly ROTATE_OUT: "ANIMATION_TYPE_ROTATE_OUT";
};
export declare const PANEL_VISIBILITY_STATES: {
    readonly VISIBLE: "VISIBLE";
    readonly HIDDEN: "HIDDEN";
};
export declare const PANEL_BODY_COMMON_ASPECT_RATIOS: {
    readonly WIDESCREEN: "16/9";
    readonly TRADITIONAL: "4/3";
    readonly SQUARE: "1/1";
    readonly ULTRA_WIDE: "2/1";
    readonly TALL: "1/2";
    readonly PHOTOGRAPHY: "3/2";
    readonly CINEMATIC: "21/9";
    readonly VERTICAL_VIDEO: "9/16";
    readonly FULL_HD: "1920/1080";
    readonly FOUR_K: "3840/2160";
};
export declare const EFFECT_STATES: {
    readonly ENABLED: "EFFECT_STATE_ENABLED";
    readonly DISABLED: "EFFECT_STATE_DISABLED";
};
export declare const PANEL_EFFECT_TYPES: {
    readonly LASER_SWEEP: "EFFECT_LASER_SWEEP";
};
declare const ANIMATION_TRIGGER_VALUES: ("ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE" | "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE" | "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN" | "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN" | "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED")[];
declare const PANEL_ANIMATION_TYPE_VALUES: ("ANIMATION_TYPE_EXPAND_UP" | "ANIMATION_TYPE_EXPAND_DOWN" | "ANIMATION_TYPE_COLLAPSE_UP" | "ANIMATION_TYPE_COLLAPSE_DOWN" | "ANIMATION_TYPE_FADE_IN" | "ANIMATION_TYPE_FADE_OUT" | "ANIMATION_TYPE_SLIDE_IN_LEFT" | "ANIMATION_TYPE_SLIDE_IN_RIGHT" | "ANIMATION_TYPE_SLIDE_OUT_LEFT" | "ANIMATION_TYPE_SLIDE_OUT_RIGHT" | "ANIMATION_TYPE_SCROLL_DOWN" | "ANIMATION_TYPE_ZOOM_IN" | "ANIMATION_TYPE_ZOOM_OUT" | "ANIMATION_TYPE_SCALE_IN" | "ANIMATION_TYPE_SCALE_OUT" | "ANIMATION_TYPE_ROTATE_IN" | "ANIMATION_TYPE_ROTATE_OUT")[];
declare const PANEL_VISIBILITY_STATE_VALUES: ("VISIBLE" | "HIDDEN")[];
declare const EFFECT_STATE_VALUES: ("EFFECT_STATE_ENABLED" | "EFFECT_STATE_DISABLED")[];
declare const PANEL_EFFECT_TYPE_VALUES: "EFFECT_LASER_SWEEP"[];
export type AnimationTrigger = (typeof ANIMATION_TRIGGER_VALUES)[number];
export type AnimationTriggerCategory = "opening" | "closing" | "content";
export type AnimationType = (typeof PANEL_ANIMATION_TYPE_VALUES)[number];
export type PanelAnimationCategory = "expand" | "collapse" | "fade" | "slide" | "scale" | "rotate" | "special";
export type FramerMotionEasing = "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | [number, number, number, number];
export type FramerMotionType = "spring" | "tween" | "inertia";
export type FramerMotionRepeatType = "loop" | "reverse" | "mirror";
export type PanelVisibilityState = (typeof PANEL_VISIBILITY_STATE_VALUES)[number];
export type PanelBodyAspectRatio = "auto" | "16/9" | "4/3" | "1/1" | "2/1" | "1/2" | "3/2" | "21/9" | "5/4" | "8/5" | "9/16" | "1920/1080" | "2560/1440" | "3840/2160" | string;
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
export declare function AnimationTypes_isPredefinedPanelIcon(icon: string): boolean;
export declare function AnimationTypes_isValidAspectRatio(ratio: string): boolean;
export declare function AnimationTypes_isCubicBezierEasing(easing: FramerMotionEasing): easing is [number, number, number, number];
export declare function getAnimationTriggersByCategory(category: AnimationTriggerCategory): ("ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE" | "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE")[] | ("ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN" | "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN")[] | "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED"[];
export declare function getAnimationTypesByCategory(category: PanelAnimationCategory): {
    UP: "ANIMATION_TYPE_EXPAND_UP";
    DOWN: "ANIMATION_TYPE_EXPAND_DOWN";
    IN?: undefined;
    OUT?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
    ZOOM_IN?: undefined;
    ZOOM_OUT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    UP: "ANIMATION_TYPE_COLLAPSE_UP";
    DOWN: "ANIMATION_TYPE_COLLAPSE_DOWN";
    IN?: undefined;
    OUT?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
    ZOOM_IN?: undefined;
    ZOOM_OUT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    IN: "ANIMATION_TYPE_FADE_IN";
    OUT: "ANIMATION_TYPE_FADE_OUT";
    UP?: undefined;
    DOWN?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
    ZOOM_IN?: undefined;
    ZOOM_OUT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    IN_LEFT: "ANIMATION_TYPE_SLIDE_IN_LEFT";
    IN_RIGHT: "ANIMATION_TYPE_SLIDE_IN_RIGHT";
    OUT_LEFT: "ANIMATION_TYPE_SLIDE_OUT_LEFT";
    OUT_RIGHT: "ANIMATION_TYPE_SLIDE_OUT_RIGHT";
    UP?: undefined;
    DOWN?: undefined;
    IN?: undefined;
    OUT?: undefined;
    ZOOM_IN?: undefined;
    ZOOM_OUT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    IN: "ANIMATION_TYPE_SCALE_IN";
    OUT: "ANIMATION_TYPE_SCALE_OUT";
    ZOOM_IN: "ANIMATION_TYPE_ZOOM_IN";
    ZOOM_OUT: "ANIMATION_TYPE_ZOOM_OUT";
    UP?: undefined;
    DOWN?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    IN: "ANIMATION_TYPE_ROTATE_IN";
    OUT: "ANIMATION_TYPE_ROTATE_OUT";
    UP?: undefined;
    DOWN?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
    ZOOM_IN?: undefined;
    ZOOM_OUT?: undefined;
    SCROLL_DOWN?: undefined;
    SCALE_IN?: undefined;
    SCALE_OUT?: undefined;
    ROTATE_IN?: undefined;
    ROTATE_OUT?: undefined;
} | {
    SCROLL_DOWN: "ANIMATION_TYPE_SCROLL_DOWN";
    ZOOM_IN: "ANIMATION_TYPE_ZOOM_IN";
    ZOOM_OUT: "ANIMATION_TYPE_ZOOM_OUT";
    SCALE_IN: "ANIMATION_TYPE_SCALE_IN";
    SCALE_OUT: "ANIMATION_TYPE_SCALE_OUT";
    ROTATE_IN: "ANIMATION_TYPE_ROTATE_IN";
    ROTATE_OUT: "ANIMATION_TYPE_ROTATE_OUT";
    UP?: undefined;
    DOWN?: undefined;
    IN?: undefined;
    OUT?: undefined;
    IN_LEFT?: undefined;
    IN_RIGHT?: undefined;
    OUT_LEFT?: undefined;
    OUT_RIGHT?: undefined;
};
export declare function isOpeningTrigger(trigger: string): boolean;
export declare function isClosingTrigger(trigger: string): boolean;
export declare function isContentTrigger(trigger: string): boolean;
export declare const PROGRESS_BAR_DEFAULTS: {
    readonly INCOMPLETE_STATE: "IN_PROGRESS";
    readonly COMPLETE_STATE: "COMPLETED";
    readonly COMPLETED_PERCENTAGE: 100;
    readonly DEFAULT_PERCENTAGE: 0;
    readonly VISIBILITY: "VISIBLE";
    readonly ANIMATION_DURATION_MS: 0;
    readonly NEXT_GOAL_DELAY_MS: 0;
};
export declare const PANEL_DEFAULTS: {
    readonly VISIBILITY: "VISIBLE";
    readonly BODY_ASPECT_RATIO: "16/9";
    readonly CONTENT_WIDTH: "WIDTH_AUTO";
    readonly IMAGE_ANIMATION: {
        readonly TYPE: "IMAGE_ANIMATION_NONE";
        readonly GRAVITY: "IMAGE_GRAVITY_TOP_CENTER";
        readonly SIZING: "IMAGE_SIZING_COVER";
    };
};
export declare const PANEL_ANIMATION_DEFAULTS: {
    readonly PANEL_ANIMATION_TYPES: {
        readonly PANEL_OPEN_HEADER: "ANIMATION_TYPE_EXPAND_UP";
        readonly PANEL_OPEN_BODY: "ANIMATION_TYPE_EXPAND_DOWN";
        readonly PANEL_CLOSE_HEADER: "ANIMATION_TYPE_COLLAPSE_DOWN";
        readonly PANEL_CLOSE_BODY: "ANIMATION_TYPE_COLLAPSE_UP";
    };
    readonly FRAMER_MOTION: {
        readonly PANEL_OPEN_HEADER: {
            readonly delay: 0.1;
            readonly duration: 1.5;
            readonly ease: "easeOut";
        };
        readonly PANEL_OPEN_BODY: {
            readonly delay: 0.3;
            readonly duration: 3;
            readonly ease: "easeInOut";
        };
        readonly PANEL_CLOSE_HEADER: {
            readonly delay: 0.1;
            readonly duration: 0.3;
            readonly ease: "easeOut";
        };
        readonly PANEL_CLOSE_BODY: {
            readonly delay: 0.1;
            readonly duration: 0.3;
            readonly ease: "easeOut";
        };
    };
};
export declare class CommunicationProtocol_Animation_ValidationError extends Error {
    readonly property: string;
    readonly value: unknown;
    readonly context?: string | undefined;
    constructor(message: string, property: string, value: unknown, context?: string | undefined);
}
export interface CommunicationProtocol_Animation_ValidationResult {
    isValid: boolean;
    errors: CommunicationProtocol_Animation_ValidationError[];
    warnings: string[];
}
export declare function CommunicationProtocol_validatePanelHeaderIcon(icon: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Animation_validateTrigger(trigger: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Animation_validateType(animationType: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Animation_validateFramerMotionEasing(easing: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Animation_validateFramerMotionAttributes(attributes: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Animation_validatePanelTransition(transition: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_PanelBody_validatePanelTransitions(transitions: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function validatePanelEffect(effect: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function validatePanelEffects(effects: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_validatePanelVisibility(visibility: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio(aspectRatio: unknown, context?: string): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Panel_validatePanelAnimationConfig(panelConfig: UnknownRecord): CommunicationProtocol_Animation_ValidationResult;
export declare function CommunicationProtocol_Panel_createValidationSummary(result: CommunicationProtocol_Animation_ValidationResult): string;
export declare const CommunicationProtocol_AnimationValidationError: typeof CommunicationProtocol_Animation_ValidationError;
export declare const validatePanelHeaderIcon: typeof CommunicationProtocol_validatePanelHeaderIcon;
export declare const validateAnimationTrigger: typeof CommunicationProtocol_Animation_validateTrigger;
export declare const validateAnimationType: typeof CommunicationProtocol_Animation_validateType;
export declare const validateFramerMotionEasing: typeof CommunicationProtocol_Animation_validateFramerMotionEasing;
export declare const validateFramerMotionAttributes: typeof CommunicationProtocol_Animation_validateFramerMotionAttributes;
export declare const validatePanelTransition: typeof CommunicationProtocol_Animation_validatePanelTransition;
export declare const validatePanelTransitions: typeof CommunicationProtocol_PanelBody_validatePanelTransitions;
export declare const validatePanelVisibility: typeof CommunicationProtocol_validatePanelVisibility;
export declare const validatePanelBodyAspectRatio: typeof CommunicationProtocol_PanelBody_validatePanelBodyAspectRatio;
export declare const validatePanelAnimationConfig: typeof CommunicationProtocol_Panel_validatePanelAnimationConfig;
export declare const createValidationSummary: typeof CommunicationProtocol_Panel_createValidationSummary;
export {};
//# sourceMappingURL=index.d.ts.map