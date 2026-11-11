import { z } from "zod/v3";
import { PROTOCOL_APP_ACTION_TYPES, PROTOCOL_CANVAS_ACTION_TYPES, PROTOCOL_CANVAS_CONTENT_TYPES, PROTOCOL_CHAT_ACTION_TYPES, PROTOCOL_CHAT_CONTENT_TYPES, } from "../wire/constants.js";
import { APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS } from "../types/app.js";
// ============================================================================
// Message Envelope Schemas
// ============================================================================
export const ProtocolWireMessageRoleSchema = z.enum(["USER", "ASSISTANT"]);
export const ProtocolMessageTargetSchema = z.literal("CHAT");
export const ProtocolMessageTypeSchema = z.literal("CHAT_MESSAGE");
// ============================================================================
// Content Schemas
// ============================================================================
export const ProtocolChatContentTypeSchema = z.enum(PROTOCOL_CHAT_CONTENT_TYPES);
export const ProtocolContentWidthSchema = z.enum(["WIDTH_AUTO", "WIDTH_FULL"]);
export const ProtocolMarkdownStyleSchema = z.enum(["DEFAULT", "COMPACT", "LARGE"]);
export const ProtocolActionableCardSelectionModeSchema = z.enum([
    "SINGLE",
    "MULTIPLE",
]);
export const ProtocolActionableCardSelectionStateSchema = z.enum([
    "PENDING_SELECTION",
    "SELECTED",
    "UNSELECTED",
]);
export const ProtocolActionableChipSelectionModeSchema = z.enum([
    "SINGLE",
    "MULTIPLE",
]);
export const ProtocolActionableChipSelectionStateSchema = z.enum([
    "PENDING_SELECTION",
    "SELECTED",
    "DISABLED",
]);
export const ProtocolButtonStyleSchema = z.enum([
    "BUTTON_STYLE_PRIMARY",
    "BUTTON_STYLE_SECONDARY",
    "BUTTON_STYLE_SUCCESS",
    "BUTTON_STYLE_WARNING",
    "BUTTON_STYLE_DANGER",
]);
export const ProtocolChatButtonStateSchema = z.enum([
    "ENABLED",
    "DISABLED",
    "LOADING",
]);
export const ProtocolProgressBarStateSchema = z.enum([
    "IN_PROGRESS",
    "COMPLETED",
    "ERROR",
    "PAUSED",
    "CANCELLED",
]);
export const ProtocolProgressBarVisibilitySchema = z.enum([
    "VISIBLE",
    "HIDDEN",
]);
export const ProtocolPanelVisibilitySchema = z.enum([
    "VISIBLE",
    "HIDDEN",
    "COLLAPSED",
]);
export const ProtocolPanelBodyTypeSchema = z.enum([
    "PANEL_BODY_MARKDOWN",
    "PANEL_BODY_REASONING_V1_MARKDOWN",
    "PANEL_BODY_REASONING_V2_MARKDOWN",
    "PANEL_BODY_IMAGE",
    "PANEL_BODY_ACTIONABLE_CARDS",
    "PANEL_BODY_ACTIONABLE_CHIPS",
    "PANEL_BODY_GOOGLE_SEARCH_HOME",
    "PANEL_BODY_GOOGLE_SEARCH_RESULT",
    "PANEL_BODY_GOOGLE_MAPS_HOME",
    "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
    "PANEL_BODY_CHATGPT_HOME",
    "PANEL_BODY_CHATGPT_RESULT",
    "PANEL_BODY_GEMINI_HOME",
    "PANEL_BODY_GEMINI_RESULT",
    "PANEL_BODY_PERPLEXITY_HOME",
    "PANEL_BODY_PERPLEXITY_RESULT",
]);
export const ProtocolPanelBodyAspectRatioSchema = z.string().min(1);
const ProtocolBaseContentSchema = z.object({
    content_id: z.string().min(1),
    content_width: ProtocolContentWidthSchema.optional(),
    content_group_id: z.string().optional(),
    content_queue: z.string().min(1, "content_queue must be a non-empty string"),
    content_delay: z.number().positive().optional(),
});
const getProtocolActionSchema = () => ProtocolActionSchema;
const ProtocolNestedActionSchema = z.lazy(getProtocolActionSchema);
export const ProtocolChatMarkdownContentDataSchema = z
    .object({
    markdown: z.string(),
    markdown_style: ProtocolMarkdownStyleSchema.optional(),
    streaming_options: z.unknown().optional(),
})
    .passthrough();
export const ProtocolChatMarkdownContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_MARKDOWN"),
    content_data: ProtocolChatMarkdownContentDataSchema,
});
export const ProtocolChatButtonContentDataSchema = z
    .object({
    button_text: z.string(),
    button_style: ProtocolButtonStyleSchema.optional(),
    button_state: ProtocolChatButtonStateSchema.optional(),
    button_icon: z.string().optional(),
    button_actions: z.array(ProtocolNestedActionSchema),
})
    .passthrough();
export const ProtocolChatButtonContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_BUTTON"),
    content_data: ProtocolChatButtonContentDataSchema,
});
/** One labelled value shown on an actionable card. Unknown keys pass through. */
export const ProtocolChatActionableCardFieldSchema = z
    .object({
    label: z.string(),
    value: z.string(),
})
    .passthrough();
export const ProtocolChatActionableCardItemSchema = z
    .object({
    card_title: z.string(),
    card_subtitle: z.string().optional(),
    /** Longer text shown under the title. It is separate from `card_subtitle`. */
    card_body: z.string().optional(),
    /** Labelled values in display order. Array order is preserved. */
    card_fields: z.array(ProtocolChatActionableCardFieldSchema).optional(),
    /** Identifier of the follow-up action. Present only when the card can be chosen. */
    card_action_id: z.string().min(1, "card_action_id must be a non-empty string").optional(),
    card_value: z.string(),
    card_actions: z.array(ProtocolNestedActionSchema),
})
    .passthrough();
export const ProtocolChatActionableCardsContentDataSchema = z
    .object({
    actionable_cards_selection_mode: ProtocolActionableCardSelectionModeSchema,
    actionable_cards_selection_state: ProtocolActionableCardSelectionStateSchema,
    actionable_cards_items: z.array(ProtocolChatActionableCardItemSchema),
})
    .passthrough();
export const ProtocolChatActionableCardsContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_ACTIONABLE_CARDS"),
    content_data: ProtocolChatActionableCardsContentDataSchema,
});
export const ProtocolChatActionableChipItemSchema = z
    .object({
    chip_text: z.string(),
    chip_value: z.string(),
    chip_style: z.enum(["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]),
    chip_state: z.enum(["ENABLED", "DISABLED", "LOADING"]),
    chip_actions: z.array(ProtocolNestedActionSchema),
})
    .passthrough();
export const ProtocolChatActionableChipsContentDataSchema = z
    .object({
    actionable_chips_selection_mode: ProtocolActionableChipSelectionModeSchema,
    actionable_chips_selection_state: ProtocolActionableChipSelectionStateSchema,
    actionable_chips_items: z.array(ProtocolChatActionableChipItemSchema),
})
    .passthrough();
export const ProtocolChatActionableChipsContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_ACTIONABLE_CHIPS"),
    content_data: ProtocolChatActionableChipsContentDataSchema,
});
export const ProtocolChatActionWrapperContentDataSchema = z
    .object({
    action: ProtocolNestedActionSchema,
})
    .passthrough();
export const ProtocolChatActionWrapperContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_ACTION_WRAPPER"),
    content_data: ProtocolChatActionWrapperContentDataSchema,
});
export const ProtocolChatProgressBarContentDataSchema = z
    .object({
    progress_bar_state: ProtocolProgressBarStateSchema.optional(),
    progress_bar_visibility: ProtocolProgressBarVisibilitySchema.optional(),
    progress_bar_current_percentage: z.number().min(0).max(100).optional(),
    progress_bar_current_animation_duration_ms: z.number().nonnegative().optional(),
    progress_bar_next_goal_delay_ms: z.number().nonnegative().optional(),
    progress_bar_next_goal_percentage: z.number().min(0).max(100).optional(),
    progress_bar_next_goal_animation_duration_ms: z.number().nonnegative().optional(),
    progress_bar_message: z.string(),
    progress_bar_icon: z.string().optional(),
})
    .passthrough();
export const ProtocolChatProgressBarContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_PROGRESS_BAR"),
    content_data: ProtocolChatProgressBarContentDataSchema,
});
export const ProtocolChatPanelContentDataSchema = z
    .object({
    panel_header_icon: z.string().optional(),
    panel_header_favicon_url: z.string().optional(),
    panel_header_title: z.string().optional(),
    panel_header_description: z.string().optional(),
    panel_visibility: ProtocolPanelVisibilitySchema.optional(),
    panel_body_type: ProtocolPanelBodyTypeSchema,
    panel_body_aspect_ratio: ProtocolPanelBodyAspectRatioSchema.optional(),
    panel_body_data: z.unknown(),
    panel_transitions: z.array(z.record(z.string(), z.unknown())).optional(),
    panel_effects: z.array(z.record(z.string(), z.unknown())).optional(),
    streaming_options: z.unknown().optional(),
})
    .passthrough();
export const ProtocolChatPanelContentSchema = ProtocolBaseContentSchema.extend({
    content_type: z.literal("CHAT_CONTENT_PANEL"),
    content_data: ProtocolChatPanelContentDataSchema,
});
export const ProtocolChatContentSchema = z.discriminatedUnion("content_type", [
    ProtocolChatMarkdownContentSchema,
    ProtocolChatButtonContentSchema,
    ProtocolChatActionableCardsContentSchema,
    ProtocolChatActionableChipsContentSchema,
    ProtocolChatActionWrapperContentSchema,
    ProtocolChatProgressBarContentSchema,
    ProtocolChatPanelContentSchema,
]);
// ============================================================================
// Canvas Content Schemas
// ============================================================================
export const ProtocolCanvasContentTypeSchema = z.enum(PROTOCOL_CANVAS_CONTENT_TYPES);
export const ProtocolCanvasMarkdownStyleSchema = z.enum([
    "DEFAULT",
    "COMPACT",
    "LARGE",
]);
export const ProtocolCanvasSectionStyleSchema = z.enum([
    "DEFAULT",
    "BORDERED",
    "HIGHLIGHTED",
    "COMPACT",
]);
export const ProtocolCanvasContentMetadataSchema = z.object({
    toc_label: z.string().optional(),
    toc_key: z.string().optional(),
    section_data: z.unknown().optional(),
});
export const ProtocolCanvasHtmlContentDataSchema = ProtocolCanvasContentMetadataSchema.extend({
    html: z.string(),
});
export const ProtocolCanvasMarkdownContentDataSchema = ProtocolCanvasContentMetadataSchema.extend({
    markdown: z.string(),
    markdown_style: ProtocolCanvasMarkdownStyleSchema.optional(),
});
export const ProtocolCanvasHtmlContentSchema = z.object({
    content_id: z.string().min(1),
    content_type: z.literal("CANVAS_CONTENT_HTML"),
    content_data: ProtocolCanvasHtmlContentDataSchema,
});
export const ProtocolCanvasMarkdownContentSchema = z.object({
    content_id: z.string().min(1),
    content_type: z.literal("CANVAS_CONTENT_MARKDOWN"),
    content_data: ProtocolCanvasMarkdownContentDataSchema,
});
const getProtocolCanvasContentSchema = () => ProtocolCanvasContentSchema;
export const ProtocolCanvasSectionContentDataSchema = ProtocolCanvasContentMetadataSchema.extend({
    section_title: z.string().min(1),
    section_collapsed: z.boolean().optional(),
    section_style: ProtocolCanvasSectionStyleSchema.optional(),
    section_contents: z.array(z.lazy(getProtocolCanvasContentSchema)),
});
export const ProtocolCanvasSectionContentSchema = z.object({
    content_id: z.string().min(1),
    content_type: z.literal("CANVAS_CONTENT_SECTION"),
    content_data: ProtocolCanvasSectionContentDataSchema,
});
export const ProtocolCanvasContentSchema = z.lazy(() => z.union([
    ProtocolCanvasHtmlContentSchema,
    ProtocolCanvasMarkdownContentSchema,
    ProtocolCanvasSectionContentSchema,
]));
// ============================================================================
// Chat Message Schema
// ============================================================================
export const ProtocolChatMessageSchema = z.object({
    message_id: z.string().min(1),
    message_type: ProtocolMessageTypeSchema,
    message_role: ProtocolWireMessageRoleSchema,
    message_target: ProtocolMessageTargetSchema,
    debug: z.boolean().optional(),
    message_contents: z.array(ProtocolChatContentSchema).min(1, "message_contents must not be empty"),
});
// ============================================================================
// Action Schemas
// ============================================================================
export const ProtocolChatActionTypeSchema = z.enum(PROTOCOL_CHAT_ACTION_TYPES);
export const ProtocolCanvasActionTypeSchema = z.enum(PROTOCOL_CANVAS_ACTION_TYPES);
export const ProtocolAppActionTypeSchema = z.enum(PROTOCOL_APP_ACTION_TYPES);
export const ProtocolActionTypeSchema = z.union([
    ProtocolChatActionTypeSchema,
    ProtocolCanvasActionTypeSchema,
    ProtocolAppActionTypeSchema,
]);
export const ProtocolActionTargetSchema = z.enum(["CHAT", "CANVAS", "APP"]);
export const ProtocolCanvasStateSchema = z.enum([
    "DEFAULT",
    "LOADING",
    "PROCESSING",
    "ERROR",
    "SUCCESS",
]);
export const ProtocolCanvasOperationSchema = z.enum([
    "SET_CONTENTS",
    "APPEND_CONTENT",
    "MODIFY_CONTENT",
    "REMOVE_CONTENT",
]);
export const ProtocolCanvasModificationTypeSchema = z.enum([
    "REVEAL",
    "REPLACE",
    "UPDATE_PROPERTIES",
    "APPEND_TO_CONTENT",
]);
export const ProtocolCanvasStreamingOptionsSchema = z.union([
    z.object({
        chunkInterval: z.number().nonnegative(),
        chunkSize: z.number().positive(),
    }),
    z.object({
        desiredTotalDuration: z.number().positive(),
        maximumDuration: z.number().positive(),
    }),
]);
export const ProtocolCanvasAppendContentsSchema = z.object({
    canvas_insert_position: z.enum(["TOP", "BOTTOM"]),
    contents: z.array(ProtocolCanvasContentSchema),
});
export const ProtocolCanvasModifyContentsSchema = z.object({
    target_content_id: z.string().min(1),
    modification_type: ProtocolCanvasModificationTypeSchema,
    new_content_data: z.union([
        ProtocolCanvasHtmlContentDataSchema,
        ProtocolCanvasMarkdownContentDataSchema,
        ProtocolCanvasSectionContentDataSchema,
    ]),
    streaming_options: ProtocolCanvasStreamingOptionsSchema.optional(),
});
export const ProtocolCanvasRemoveContentsSchema = z.object({
    target_content_ids: z.array(z.string().min(1)).min(1),
});
export const ProtocolCanvasOpenActionDataSchema = z.object({
    target: z.literal("CANVAS"),
    canvas_id: z.string().min(1).optional(),
    canvas_title_label: z.string().optional(),
    canvas_title_href: z.string().optional(),
    canvas_state: ProtocolCanvasStateSchema.optional(),
    canvas_icon: z.string().optional(),
    canvas_initial_contents: z.array(ProtocolCanvasContentSchema).optional(),
});
export const ProtocolCanvasCloseActionDataSchema = z.object({
    target: z.literal("CANVAS"),
    canvas_id: z.string().min(1).optional(),
});
export const ProtocolCanvasUpdateActionDataSchema = z.object({
    target: z.literal("CANVAS"),
    canvas_id: z.string().min(1),
    canvas_title_label: z.string().optional(),
    canvas_title_href: z.string().optional(),
    canvas_operation: ProtocolCanvasOperationSchema.optional(),
    canvas_contents: z.array(ProtocolCanvasContentSchema).optional(),
    append_contents: ProtocolCanvasAppendContentsSchema.optional(),
    modify_contents: ProtocolCanvasModifyContentsSchema.optional(),
    remove_contents: ProtocolCanvasRemoveContentsSchema.optional(),
    scroll_to_top_after_finish: z.boolean().optional(),
});
export const ProtocolCanvasOpenActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CANVAS_ACTION_OPEN"),
    action_data: ProtocolCanvasOpenActionDataSchema,
});
export const ProtocolCanvasCloseActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CANVAS_ACTION_CLOSE"),
    action_data: ProtocolCanvasCloseActionDataSchema,
});
export const ProtocolCanvasUpdateActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CANVAS_ACTION_UPDATE"),
    action_data: ProtocolCanvasUpdateActionDataSchema,
});
export const ProtocolCanvasActionSchema = z.discriminatedUnion("action_type", [
    ProtocolCanvasOpenActionSchema,
    ProtocolCanvasCloseActionSchema,
    ProtocolCanvasUpdateActionSchema,
]);
export const ProtocolActionMessageRoleSchema = z.enum([
    "USER",
    "ASSISTANT",
    "SYSTEM",
]);
export const ProtocolChatSendTextMessageActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    role: ProtocolActionMessageRoleSchema,
    text: z.string(),
})
    .passthrough();
export const ProtocolChatChooseActionableCardActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    actionable_cards_content_id: z.string().min(1),
    selected_card_value: z.string(),
    selected_card_title: z.string(),
    selected_card_subtitle: z.string().optional(),
    simulated_user_message_text: z.string().optional(),
})
    .passthrough();
export const ProtocolChatChooseActionableChipActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    actionable_chips_content_id: z.string().min(1),
    selected_chip_value: z.string(),
    selected_chip_text: z.string(),
    selected_chip_values: z.array(z.string()).optional(),
    selected_chip_texts: z.array(z.string()).optional(),
    simulated_user_message_text: z.string().optional(),
})
    .passthrough();
export const ProtocolChatUpdateButtonActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    button_content_id: z.string().min(1),
    button_text: z.string().optional(),
    button_state: ProtocolChatButtonStateSchema.optional(),
    button_style: ProtocolButtonStyleSchema.optional(),
    button_icon: z.string().optional(),
    button_actions: z.array(ProtocolNestedActionSchema).optional(),
    button_updates: z
        .object({
        button_text: z.string().optional(),
        button_icon: z.string().optional(),
        button_style: ProtocolButtonStyleSchema.optional(),
        button_state: ProtocolChatButtonStateSchema.optional(),
        button_actions: z.array(ProtocolNestedActionSchema).optional(),
    })
        .passthrough()
        .optional(),
})
    .passthrough();
export const ProtocolChatUpdateProgressBarActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    progress_bar_content_id: z.string().min(1),
    progress_bar_state: ProtocolProgressBarStateSchema.optional(),
    progress_bar_visibility: ProtocolProgressBarVisibilitySchema.optional(),
    progress_bar_current_percentage: z.number().min(0).max(100).optional(),
    progress_bar_current_animation_duration_ms: z.number().nonnegative().optional(),
    progress_bar_next_goal_delay_ms: z.number().nonnegative().optional(),
    progress_bar_next_goal_percentage: z.number().min(0).max(100).optional(),
    progress_bar_next_goal_animation_duration_ms: z.number().nonnegative().optional(),
    progress_bar_message: z.string().optional(),
    progress_bar_icon: z.string().optional(),
})
    .passthrough();
export const ProtocolChatWaitForQueuesActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    queue_names: z.array(z.string().min(1)).min(1),
    wait_mode: z.enum(["DRAIN", "IDLE", "CONTENT_IDS"]).optional(),
    content_ids: z.array(z.string().min(1)).optional(),
    timeout_ms: z.number().positive().optional(),
    on_timeout: z.enum(["CONTINUE", "ERROR"]).optional(),
})
    .passthrough();
export const ProtocolChatUpdatePanelActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
    panel_content_id: z.string().min(1),
    panel_header_icon: z.string().optional(),
    panel_header_favicon_url: z.string().optional(),
    panel_header_title: z.string().optional(),
    panel_header_description: z.string().optional(),
    panel_visibility: ProtocolPanelVisibilitySchema.optional(),
    panel_body_type: ProtocolPanelBodyTypeSchema.optional(),
    panel_body_aspect_ratio: ProtocolPanelBodyAspectRatioSchema.optional(),
    panel_body_data: z.unknown().optional(),
    panel_scrolling_framer_motion_attributes: z.unknown().optional(),
    panel_transitions: z.array(z.record(z.string(), z.unknown())).optional(),
    panel_effects: z.array(z.record(z.string(), z.unknown())).optional(),
    streaming_options: z.unknown().optional(),
})
    .passthrough();
export const ProtocolChatTargetOnlyActionDataSchema = z
    .object({
    target: z.literal("CHAT"),
})
    .passthrough();
export const ProtocolChatSendTextMessageActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_SEND_TEXT_MESSAGE"),
    action_data: ProtocolChatSendTextMessageActionDataSchema,
});
export const ProtocolChatChooseActionableCardActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_CHOOSE_ACTIONABLE_CARD"),
    action_data: ProtocolChatChooseActionableCardActionDataSchema,
});
export const ProtocolChatChooseActionableChipActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP"),
    action_data: ProtocolChatChooseActionableChipActionDataSchema,
});
export const ProtocolChatUpdateButtonActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_UPDATE_BUTTON"),
    action_data: ProtocolChatUpdateButtonActionDataSchema,
});
export const ProtocolChatUpdateProgressBarActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_UPDATE_PROGRESS_BAR"),
    action_data: ProtocolChatUpdateProgressBarActionDataSchema,
});
export const ProtocolChatWaitForQueuesActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_WAIT_FOR_QUEUES"),
    action_data: ProtocolChatWaitForQueuesActionDataSchema,
});
export const ProtocolChatUpdatePanelActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_UPDATE_PANEL"),
    action_data: ProtocolChatUpdatePanelActionDataSchema,
});
export const ProtocolChatBeginSimulatedTurnActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_BEGIN_SIMULATED_TURN"),
    action_data: ProtocolChatTargetOnlyActionDataSchema,
});
export const ProtocolChatCompleteContentSequenceActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE"),
    action_data: ProtocolChatTargetOnlyActionDataSchema,
});
export const ProtocolChatActionSchema = z.discriminatedUnion("action_type", [
    ProtocolChatSendTextMessageActionSchema,
    ProtocolChatChooseActionableCardActionSchema,
    ProtocolChatChooseActionableChipActionSchema,
    ProtocolChatUpdateButtonActionSchema,
    ProtocolChatUpdateProgressBarActionSchema,
    ProtocolChatWaitForQueuesActionSchema,
    ProtocolChatUpdatePanelActionSchema,
    ProtocolChatBeginSimulatedTurnActionSchema,
    ProtocolChatCompleteContentSequenceActionSchema,
]);
export const ProtocolAppThemeNameSchema = z.enum(["dark", "light", "system"]);
export const ProtocolAppFocusTargetSchema = z.enum([
    "CHAT_INPUT",
    "CANVAS",
    "NONE",
]);
export const ProtocolAppCoreConsoleLevelSchema = z.enum([
    "debug",
    "info",
    "warn",
    "error",
]);
export const ProtocolRecoveryHintTypeSchema = z.enum([
    "RECOVERY_HINT_TYPE_RETRY",
    "RECOVERY_HINT_TYPE_TRY_URL",
    "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS",
    "RECOVERY_HINT_TYPE_NEW_SCAN",
]);
export const ProtocolRecoveryHintStyleSchema = z.enum([
    "RECOVERY_HINT_STYLE_PRIMARY",
    "RECOVERY_HINT_STYLE_SECONDARY",
]);
export const ProtocolErrorDiagnosticInfoSourceSchema = z.enum([
    "ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL",
    "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT",
]);
export const ProtocolAppSetThemeActionDataSchema = z
    .object({
    target: z.literal("APP"),
    theme_name: ProtocolAppThemeNameSchema,
})
    .passthrough();
export const ProtocolAppTargetOnlyActionDataSchema = z
    .object({
    target: z.literal("APP"),
})
    .passthrough();
export const ProtocolAppPreferenceUpdatesSchema = z
    .object({
    notificationsEnabled: z.boolean().optional(),
    defaultLanguage: z.string().optional(),
    themePreference: z.enum(["dark", "light", "auto"]).optional(),
    chatPreferences: z.record(z.string(), z.unknown()).optional(),
    canvasPreferences: z.record(z.string(), z.unknown()).optional(),
    accessibilityPreferences: z.record(z.string(), z.unknown()).optional(),
})
    .passthrough();
export const ProtocolAppUserPreferenceUpdateActionDataSchema = z
    .object({
    target: z.literal("APP"),
    preference_updates: ProtocolAppPreferenceUpdatesSchema,
})
    .passthrough();
export const ProtocolAppCoreConsoleActionDataSchema = z
    .object({
    target: z.literal("APP"),
    level: ProtocolAppCoreConsoleLevelSchema,
    message: z.string(),
    payload: z.unknown().optional(),
    timestamp: z.string().optional(),
    source: z.string().optional(),
})
    .passthrough();
export const ProtocolAppSetInputPlaceholderActionDataSchema = z
    .object({
    target: z.literal("APP"),
    placeholder: z.string(),
})
    .passthrough();
export const ProtocolAppWaitForUserInputActionDataSchema = z
    .object({
    target: z.literal("APP"),
    focus_target: ProtocolAppFocusTargetSchema.optional(),
})
    .passthrough();
export const ProtocolAppRecoveryHintSchema = z
    .object({
    hint_id: z.string().min(1),
    hint_type: ProtocolRecoveryHintTypeSchema,
    label: z.string(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    style: ProtocolRecoveryHintStyleSchema.optional(),
})
    .passthrough();
export const ProtocolAppErrorDiagnosticInfoSchema = z
    .object({
    diagnostic_id: z.string().optional(),
    thread_id: z.string().optional(),
    message_id: z.string().optional(),
    pipeline_name: z.string().optional(),
    source: ProtocolErrorDiagnosticInfoSourceSchema,
    timestamp: z.string().optional(),
    status_code: z.number().int().optional(),
    retry_count: z.number().int().nonnegative().optional(),
})
    .passthrough();
export const ProtocolAppSetSendErrorActionDataSchema = z
    .object({
    target: z.literal("APP"),
    error_kind: z.enum(APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS),
    message: z.string(),
    recovery_hints: z.array(ProtocolAppRecoveryHintSchema).optional(),
    diagnostics: ProtocolAppErrorDiagnosticInfoSchema.optional(),
})
    .passthrough();
export const ProtocolAppSetThemeActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_SET_THEME"),
    action_data: ProtocolAppSetThemeActionDataSchema,
});
export const ProtocolAppThreadListRefreshActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_THREAD_LIST_REFRESH"),
    action_data: ProtocolAppTargetOnlyActionDataSchema,
});
export const ProtocolAppUserPreferenceUpdateActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_USER_PREFERENCE_UPDATE"),
    action_data: ProtocolAppUserPreferenceUpdateActionDataSchema,
});
export const ProtocolAppCoreConsoleActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_CORE_CONSOLE"),
    action_data: ProtocolAppCoreConsoleActionDataSchema,
});
export const ProtocolAppSetInputPlaceholderActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_SET_INPUT_PLACEHOLDER"),
    action_data: ProtocolAppSetInputPlaceholderActionDataSchema,
});
export const ProtocolAppWaitForUserInputActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_WAIT_FOR_USER_INPUT"),
    action_data: ProtocolAppWaitForUserInputActionDataSchema,
});
export const ProtocolAppSetSendErrorActionSchema = z.object({
    action_id: z.string().min(1),
    action_type: z.literal("APP_ACTION_SET_SEND_ERROR"),
    action_data: ProtocolAppSetSendErrorActionDataSchema,
});
export const ProtocolAppActionSchema = z.discriminatedUnion("action_type", [
    ProtocolAppSetThemeActionSchema,
    ProtocolAppThreadListRefreshActionSchema,
    ProtocolAppUserPreferenceUpdateActionSchema,
    ProtocolAppCoreConsoleActionSchema,
    ProtocolAppSetInputPlaceholderActionSchema,
    ProtocolAppWaitForUserInputActionSchema,
    ProtocolAppSetSendErrorActionSchema,
]);
export const ProtocolActionSchema = z.union([
    ProtocolChatActionSchema,
    ProtocolCanvasActionSchema,
    ProtocolAppActionSchema,
]);
//# sourceMappingURL=index.js.map