/**
 * @fileoverview Canonical protocol type surface for message, content, action, canvas, app, and shared option contracts.
 *
 * The reusable package owns these protocol contracts. Consumers should import this subpath directly
 * instead of duplicating local protocol declarations.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_ChatMessage } from "@gg-utils/chat-comms/types";
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export * from "./common.js";
export * from "./base.js";
export * from "./specialized.js";
export * from "./canvas.js";
export * from "./app.js";
export * from "./chat.js";
export * from "./unions.js";
export type { AnimationTrigger, AnimationTriggerCategory, AnimationType, CommunicationProtocol_FramerMotionAttributes, CommunicationProtocol_PanelEffect, CommunicationProtocol_PanelTransition, EffectState, FramerMotionEasing, FramerMotionRepeatType, FramerMotionType, PanelAnimationCategory, PanelBodyAspectRatio, PanelEffectType, PanelHeaderIcon, PanelIconCategory, } from "./animation.js";
//# sourceMappingURL=index.d.ts.map