/**
 * @fileoverview Headless canvas state machine — pure reducer with no React/DOM dependency.
 *
 * This is reusable canvas state logic for UI consumers.
 * React hooks can delegate to this reducer via `useReducer`.
 *
 * @testing cd chat-stream-protocol && npm test
 */

import type { ProtocolAction } from "../../wire/types.js";

// ============================================================================
// Canvas state types
// ============================================================================

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
export type RuntimeCanvasScopedAction<Action> = Action &
  RuntimeCanvasScopedActionMetadata;

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
export function createRuntimeCanvasScopedAction<Action>(options: {
  action: Action;
  scopeToken: string | null;
}): RuntimeCanvasScopedAction<Action> {
  return {
    ...options.action,
    __canvas_scope: options.scopeToken,
  };
}

/** Read the optional runtime-only canvas scope token from an action. */
export function getRuntimeCanvasActionScope(
  action: RuntimeCanvasScopedActionMetadata,
): string | null | undefined {
  return action.__canvas_scope;
}

/** Decide whether a scoped canvas action belongs to the current canvas processing scope. */
export function runtimeCanvasActionBelongsToScope(options: {
  action: RuntimeCanvasScopedActionMetadata;
  currentScopeToken: string | null;
}): boolean {
  const actionScopeToken = getRuntimeCanvasActionScope(options.action);
  return !(
    options.currentScopeToken &&
    actionScopeToken &&
    actionScopeToken !== options.currentScopeToken
  );
}

// ============================================================================
// Action types
// ============================================================================

export type RuntimeCanvasReducerAction =
  | { type: "OPEN"; payload: RuntimeCanvasOpenPayload }
  | { type: "CLOSE"; payload?: { canvasId?: string } }
  | { type: "CLOSE_ALL" }
  | { type: "SET_ACTIVE"; payload: { canvasId: string } }
  | { type: "UPDATE"; payload: RuntimeCanvasUpdatePayload }
  | { type: "MINIMIZE"; payload: { canvasId: string } }
  | { type: "RESTORE"; payload: { canvasId: string } };

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
  action_type:
    | "CANVAS_ACTION_OPEN"
    | "CANVAS_ACTION_CLOSE"
    | "CANVAS_ACTION_UPDATE";
  action_data: RuntimeCanvasCompilableActionData;
}

/** Headless canvas action commands emitted from protocol canvas actions. */
export type RuntimeCanvasActionCommand<
  Action extends RuntimeCanvasCompilableAction = RuntimeCanvasCompilableAction,
> =
  | {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_OPEN";
      action: Action;
      payload: Action["action_data"];
    }
  | {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_CLOSE";
      action: Action;
      canvasId: Action["action_data"]["canvas_id"];
    }
  | {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_QUEUE_UPDATE";
      action: Action;
      actionId: string;
      payload: Action["action_data"];
      shouldWaitForAnimation: true;
      scrollSettleMs: number;
    };

/** Compile one protocol canvas action into a product-agnostic runtime canvas command. */
export function RuntimeCanvas_compileActionToCommand<
  Action extends RuntimeCanvasCompilableAction,
>(action: Action): RuntimeCanvasActionCommand<Action> {
  if (RuntimeCanvas_actionTypeMatches(action, "CANVAS_ACTION_OPEN")) {
    return {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_OPEN",
      action,
      payload: action.action_data,
    };
  }

  if (RuntimeCanvas_actionTypeMatches(action, "CANVAS_ACTION_CLOSE")) {
    return {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_CLOSE",
      action,
      canvasId: action.action_data.canvas_id,
    };
  }

  if (RuntimeCanvas_actionTypeMatches(action, "CANVAS_ACTION_UPDATE")) {
    return {
      type: "RUNTIME_CANVAS_ACTION_COMMAND_QUEUE_UPDATE",
      action,
      actionId: action.action_id,
      payload: action.action_data,
      shouldWaitForAnimation: true,
      scrollSettleMs: action.action_data.scroll_to_top_after_finish ? 2600 : 0,
    };
  }

  return RuntimeCanvas_throwUnhandledCompilableAction(action);
}

/** Narrow a compilable canvas action by its protocol `action_type` discriminant. */
function RuntimeCanvas_actionTypeMatches<
  Action extends RuntimeCanvasCompilableAction,
  ActionType extends Action["action_type"],
>(
  action: Action,
  actionType: ActionType,
): action is Extract<Action, { action_type: ActionType }> {
  return action.action_type === actionType;
}

/** Runtime error path for future canvas action tokens not yet handled by the compiler. */
function RuntimeCanvas_throwUnhandledCompilableAction(
  action: RuntimeCanvasCompilableAction,
): never {
  throw new Error(`Unhandled runtime canvas action: ${JSON.stringify(action)}`);
}

// ============================================================================
// Initial state
// ============================================================================

export const createInitialCanvasState = (): RuntimeCanvasState => ({
  canvases: new Map(),
  activeCanvasId: null,
  isOpen: false,
});

// ============================================================================
// Reducer
// ============================================================================

export function runtimeCanvasReducer(
  state: RuntimeCanvasState,
  action: RuntimeCanvasReducerAction,
): RuntimeCanvasState {
  switch (action.type) {
    case "OPEN": {
      const {
        canvas_id,
        canvas_title_label,
        canvas_title_href,
        canvas_state,
        canvas_icon,
        canvas_initial_contents,
      } = action.payload;

      const canvasId = canvas_id || `canvas-${Date.now()}`;
      const newCanvases = new Map(state.canvases);
      const existingCanvas = newCanvases.get(canvasId);

      if (existingCanvas) {
        const hasNewContents = canvas_initial_contents !== undefined;
        newCanvases.set(canvasId, {
          ...existingCanvas,
          title: canvas_title_label ?? existingCanvas.title ?? null,
          titleHref: canvas_title_href ?? existingCanvas.titleHref ?? null,
          state: canvas_state ?? existingCanvas.state,
          icon: canvas_icon ?? existingCanvas.icon,
          contents: hasNewContents
            ? canvas_initial_contents
            : existingCanvas.contents,
          justOpened: hasNewContents,
          generation: (existingCanvas.generation ?? 0) + 1,
        });
      } else {
        newCanvases.set(canvasId, {
          canvasId,
          title: canvas_title_label ?? null,
          titleHref: canvas_title_href ?? null,
          state: canvas_state ?? "DEFAULT",
          icon: canvas_icon ?? null,
          contents: canvas_initial_contents ?? [],
          justOpened: true,
          generation: 0,
        });
      }

      return {
        canvases: newCanvases,
        activeCanvasId: canvasId,
        isOpen: true,
      };
    }

    case "CLOSE": {
      const canvasIdToClose = action.payload?.canvasId ?? state.activeCanvasId;
      if (!canvasIdToClose) {
        return { ...state, isOpen: false, activeCanvasId: null };
      }
      const newCanvases = new Map(state.canvases);
      newCanvases.delete(canvasIdToClose);

      let newActiveCanvasId = state.activeCanvasId;
      let newIsOpen = state.isOpen;

      if (canvasIdToClose === state.activeCanvasId) {
        if (newCanvases.size > 0) {
          const firstKey = Array.from(newCanvases.keys())[0];
          newActiveCanvasId = firstKey ?? null;
        } else {
          newActiveCanvasId = null;
          newIsOpen = false;
        }
      }

      return {
        canvases: newCanvases,
        activeCanvasId: newActiveCanvasId,
        isOpen: newIsOpen,
      };
    }

    case "CLOSE_ALL": {
      return { canvases: new Map(), activeCanvasId: null, isOpen: false };
    }

    case "SET_ACTIVE": {
      const { canvasId } = action.payload;
      if (!state.canvases.has(canvasId)) {
        return state;
      }
      return { ...state, activeCanvasId: canvasId, isOpen: true };
    }

    case "UPDATE": {
      const {
        canvas_id,
        canvas_title_label,
        canvas_title_href,
        canvas_contents,
        append_contents,
        modify_contents,
        remove_contents,
        scroll_to_top_after_finish,
      } = action.payload;

      const canvasId = canvas_id ?? state.activeCanvasId;
      if (!canvasId) return state;

      const canvas = state.canvases.get(canvasId);
      if (!canvas) return state;

      const newCanvas = { ...canvas, justOpened: false };

      if (canvas_title_label !== undefined)
        newCanvas.title = canvas_title_label;
      if (canvas_title_href !== undefined)
        newCanvas.titleHref = canvas_title_href;
      if (canvas_contents !== undefined) newCanvas.contents = canvas_contents;

      if (append_contents) {
        const { canvas_insert_position, contents } = append_contents;
        newCanvas.contents =
          canvas_insert_position === "TOP"
            ? [...contents, ...newCanvas.contents]
            : [...newCanvas.contents, ...contents];
        newCanvas.hasModifications = true;
      }

      if (modify_contents) {
        const { target_content_id, modification_type, new_content_data } =
          modify_contents;
        newCanvas.contents = newCanvas.contents.map((content) =>
          content.content_id === target_content_id
            ? {
                ...content,
                content_data: { ...content.content_data, ...new_content_data },
                lastModificationType: modification_type,
              }
            : content,
        );
        newCanvas.hasModifications = true;
        newCanvas.lastModificationType = modification_type;
        newCanvas.scrollToTopAfterFinish = scroll_to_top_after_finish ?? false;
      }

      if (remove_contents) {
        newCanvas.contents = newCanvas.contents.filter(
          (content) =>
            !remove_contents.target_content_ids.includes(content.content_id),
        );
      }

      const newCanvases = new Map(state.canvases);
      newCanvases.set(canvasId, newCanvas);
      return { ...state, canvases: newCanvases };
    }

    case "MINIMIZE": {
      const { canvasId } = action.payload;
      const canvas = state.canvases.get(canvasId);
      if (!canvas) return state;

      const newCanvases = new Map(state.canvases);
      newCanvases.set(canvasId, { ...canvas, minimized: true });

      let newActiveCanvasId = state.activeCanvasId;
      let newIsOpen = state.isOpen;

      if (state.activeCanvasId === canvasId) {
        const remaining = Array.from(newCanvases.values()).filter(
          (c) => !c.minimized,
        );
        if (remaining.length > 0) {
          const first = remaining[0];
          newActiveCanvasId = first?.canvasId ?? null;
        } else {
          newActiveCanvasId = null;
          newIsOpen = false;
        }
      }

      return {
        canvases: newCanvases,
        activeCanvasId: newActiveCanvasId,
        isOpen: newIsOpen,
      };
    }

    case "RESTORE": {
      const { canvasId } = action.payload;
      const canvas = state.canvases.get(canvasId);
      if (!canvas) return state;

      const newCanvases = new Map(state.canvases);
      newCanvases.set(canvasId, { ...canvas, minimized: false });
      return { canvases: newCanvases, activeCanvasId: canvasId, isOpen: true };
    }

    default:
      return state;
  }
}
