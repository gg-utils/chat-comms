/**
 * @fileoverview Headless canvas state machine — pure reducer with no React/DOM dependency.
 *
 * This is reusable canvas state logic for UI consumers.
 * React hooks can delegate to this reducer via `useReducer`.
 *
 * @testing cd chat-stream-protocol && npm test
 */
/**
 * Non-wire metadata used by canvas runtimes to drop stale queued actions after navigation or
 * thread-scope changes.
 *
 * @remarks
 * This field must never be serialized into protocol streams. It is package-owned because queue
 * scoping is part of the reusable headless canvas runtime, not a product-domain payload.
 */
export interface RuntimeCanvasScopedActionMetadata {
    __canvas_scope?: string | null;
}
/** Canvas action enriched with runtime-only scope metadata. */
export type RuntimeCanvasScopedAction<Action> = Action & RuntimeCanvasScopedActionMetadata;
export interface RuntimeCanvasItem {
    canvasId: string;
    title: string | null;
    titleHref: string | null;
    state: string;
    icon: string | null;
    contents: RuntimeCanvasContent[];
    justOpened: boolean;
    generation: number;
    minimized?: boolean;
    hasModifications?: boolean;
    lastModificationType?: string;
    scrollToTopAfterFinish?: boolean;
}
export interface RuntimeCanvasContent {
    content_id: string;
    content_type: string;
    content_data: Record<string, unknown>;
    lastModificationType?: string;
}
export interface RuntimeCanvasState {
    canvases: Map<string, RuntimeCanvasItem>;
    activeCanvasId: string | null;
    isOpen: boolean;
}
/** Attach runtime-only canvas scope metadata to an action without changing its wire payload. */
export declare function createRuntimeCanvasScopedAction<Action>(options: {
    action: Action;
    scopeToken: string | null;
}): RuntimeCanvasScopedAction<Action>;
/** Read the optional runtime-only canvas scope token from an action. */
export declare function getRuntimeCanvasActionScope(action: RuntimeCanvasScopedActionMetadata): string | null | undefined;
/** Decide whether a scoped canvas action belongs to the current canvas processing scope. */
export declare function runtimeCanvasActionBelongsToScope(options: {
    action: RuntimeCanvasScopedActionMetadata;
    currentScopeToken: string | null;
}): boolean;
export type RuntimeCanvasReducerAction = {
    type: "OPEN";
    payload: RuntimeCanvasOpenPayload;
} | {
    type: "CLOSE";
    payload?: {
        canvasId?: string;
    };
} | {
    type: "CLOSE_ALL";
} | {
    type: "SET_ACTIVE";
    payload: {
        canvasId: string;
    };
} | {
    type: "UPDATE";
    payload: RuntimeCanvasUpdatePayload;
} | {
    type: "MINIMIZE";
    payload: {
        canvasId: string;
    };
} | {
    type: "RESTORE";
    payload: {
        canvasId: string;
    };
};
export interface RuntimeCanvasOpenPayload {
    canvas_id?: string;
    canvas_title_label?: string | null;
    canvas_title_href?: string | null;
    canvas_state?: string;
    canvas_icon?: string | null;
    canvas_initial_contents?: RuntimeCanvasContent[];
}
export interface RuntimeCanvasUpdatePayload {
    canvas_id?: string;
    canvas_title_label?: string;
    canvas_title_href?: string;
    canvas_contents?: RuntimeCanvasContent[];
    append_contents?: {
        canvas_insert_position: "TOP" | "BOTTOM";
        contents: RuntimeCanvasContent[];
    };
    modify_contents?: {
        target_content_id: string;
        modification_type: string;
        new_content_data: Record<string, unknown>;
    };
    remove_contents?: {
        target_content_ids: string[];
    };
    scroll_to_top_after_finish?: boolean;
}
/** Minimal canvas action payload fields needed by the headless runtime action compiler. */
export interface RuntimeCanvasCompilableActionData {
    canvas_id?: string;
    scroll_to_top_after_finish?: boolean;
}
/** Protocol canvas action shape accepted by the headless runtime action compiler. */
export interface RuntimeCanvasCompilableAction {
    action_id: string;
    action_type: "CANVAS_ACTION_OPEN" | "CANVAS_ACTION_CLOSE" | "CANVAS_ACTION_UPDATE";
    action_data: RuntimeCanvasCompilableActionData;
}
/** Headless canvas action commands emitted from protocol canvas actions. */
export type RuntimeCanvasActionCommand<Action extends RuntimeCanvasCompilableAction = RuntimeCanvasCompilableAction> = {
    type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_OPEN";
    action: Action;
    payload: Action["action_data"];
} | {
    type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_CLOSE";
    action: Action;
    canvasId: Action["action_data"]["canvas_id"];
} | {
    type: "RUNTIME_CANVAS_ACTION_COMMAND_QUEUE_UPDATE";
    action: Action;
    actionId: string;
    payload: Action["action_data"];
    shouldWaitForAnimation: true;
    scrollSettleMs: number;
};
/** Compile one protocol canvas action into a product-agnostic runtime canvas command. */
export declare function RuntimeCanvas_compileActionToCommand<Action extends RuntimeCanvasCompilableAction>(action: Action): RuntimeCanvasActionCommand<Action>;
export declare const createInitialCanvasState: () => RuntimeCanvasState;
export declare function runtimeCanvasReducer(state: RuntimeCanvasState, action: RuntimeCanvasReducerAction): RuntimeCanvasState;
//# sourceMappingURL=index.d.ts.map