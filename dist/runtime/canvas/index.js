/**
 * @fileoverview Headless canvas state machine — pure reducer with no React/DOM dependency.
 *
 * This is reusable canvas state logic for UI consumers.
 * React hooks can delegate to this reducer via `useReducer`.
 *
 * @testing cd chat-stream-protocol && npm test
 */
/** Attach runtime-only canvas scope metadata to an action without changing its wire payload. */
export function createRuntimeCanvasScopedAction(options) {
    return {
        ...options.action,
        __canvas_scope: options.scopeToken,
    };
}
/** Read the optional runtime-only canvas scope token from an action. */
export function getRuntimeCanvasActionScope(action) {
    return action.__canvas_scope;
}
/** Decide whether a scoped canvas action belongs to the current canvas processing scope. */
export function runtimeCanvasActionBelongsToScope(options) {
    const actionScopeToken = getRuntimeCanvasActionScope(options.action);
    return !(options.currentScopeToken &&
        actionScopeToken &&
        actionScopeToken !== options.currentScopeToken);
}
/** Compile one protocol canvas action into a product-agnostic runtime canvas command. */
export function RuntimeCanvas_compileActionToCommand(action) {
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
function RuntimeCanvas_actionTypeMatches(action, actionType) {
    return action.action_type === actionType;
}
/** Runtime error path for future canvas action tokens not yet handled by the compiler. */
function RuntimeCanvas_throwUnhandledCompilableAction(action) {
    throw new Error(`Unhandled runtime canvas action: ${JSON.stringify(action)}`);
}
// ============================================================================
// Initial state
// ============================================================================
export const createInitialCanvasState = () => ({
    canvases: new Map(),
    activeCanvasId: null,
    isOpen: false,
});
// ============================================================================
// Reducer
// ============================================================================
export function runtimeCanvasReducer(state, action) {
    switch (action.type) {
        case "OPEN": {
            const { canvas_id, canvas_title_label, canvas_title_href, canvas_state, canvas_icon, canvas_initial_contents, } = action.payload;
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
            }
            else {
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
                }
                else {
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
            const { canvas_id, canvas_title_label, canvas_title_href, canvas_contents, append_contents, modify_contents, remove_contents, scroll_to_top_after_finish, } = action.payload;
            const canvasId = canvas_id ?? state.activeCanvasId;
            if (!canvasId)
                return state;
            const canvas = state.canvases.get(canvasId);
            if (!canvas)
                return state;
            const newCanvas = { ...canvas, justOpened: false };
            if (canvas_title_label !== undefined)
                newCanvas.title = canvas_title_label;
            if (canvas_title_href !== undefined)
                newCanvas.titleHref = canvas_title_href;
            if (canvas_contents !== undefined)
                newCanvas.contents = canvas_contents;
            if (append_contents) {
                const { canvas_insert_position, contents } = append_contents;
                newCanvas.contents =
                    canvas_insert_position === "TOP"
                        ? [...contents, ...newCanvas.contents]
                        : [...newCanvas.contents, ...contents];
                newCanvas.hasModifications = true;
            }
            if (modify_contents) {
                const { target_content_id, modification_type, new_content_data } = modify_contents;
                newCanvas.contents = newCanvas.contents.map((content) => content.content_id === target_content_id
                    ? {
                        ...content,
                        content_data: { ...content.content_data, ...new_content_data },
                        lastModificationType: modification_type,
                    }
                    : content);
                newCanvas.hasModifications = true;
                newCanvas.lastModificationType = modification_type;
                newCanvas.scrollToTopAfterFinish = scroll_to_top_after_finish ?? false;
            }
            if (remove_contents) {
                newCanvas.contents = newCanvas.contents.filter((content) => !remove_contents.target_content_ids.includes(content.content_id));
            }
            const newCanvases = new Map(state.canvases);
            newCanvases.set(canvasId, newCanvas);
            return { ...state, canvases: newCanvases };
        }
        case "MINIMIZE": {
            const { canvasId } = action.payload;
            const canvas = state.canvases.get(canvasId);
            if (!canvas)
                return state;
            const newCanvases = new Map(state.canvases);
            newCanvases.set(canvasId, { ...canvas, minimized: true });
            let newActiveCanvasId = state.activeCanvasId;
            let newIsOpen = state.isOpen;
            if (state.activeCanvasId === canvasId) {
                const remaining = Array.from(newCanvases.values()).filter((c) => !c.minimized);
                if (remaining.length > 0) {
                    const first = remaining[0];
                    newActiveCanvasId = first?.canvasId ?? null;
                }
                else {
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
            if (!canvas)
                return state;
            const newCanvases = new Map(state.canvases);
            newCanvases.set(canvasId, { ...canvas, minimized: false });
            return { canvases: newCanvases, activeCanvasId: canvasId, isOpen: true };
        }
        default:
            return state;
    }
}
//# sourceMappingURL=index.js.map