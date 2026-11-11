import { z } from "zod/v3";
import type { CanvasContent, CommunicationProtocol_CanvasSectionContent, CommunicationProtocol_CanvasSectionContentData } from "../types/index.js";
export declare const ProtocolWireMessageRoleSchema: z.ZodEnum<["USER", "ASSISTANT"]>;
export type ProtocolWireMessageRole_Schema = z.infer<typeof ProtocolWireMessageRoleSchema>;
export declare const ProtocolMessageTargetSchema: z.ZodLiteral<"CHAT">;
export type ProtocolMessageTarget_Schema = z.infer<typeof ProtocolMessageTargetSchema>;
export declare const ProtocolMessageTypeSchema: z.ZodLiteral<"CHAT_MESSAGE">;
export type ProtocolMessageType_Schema = z.infer<typeof ProtocolMessageTypeSchema>;
export declare const ProtocolChatContentTypeSchema: z.ZodEnum<["CHAT_CONTENT_MARKDOWN", "CHAT_CONTENT_BUTTON", "CHAT_CONTENT_ACTIONABLE_CARDS", "CHAT_CONTENT_ACTIONABLE_CHIPS", "CHAT_CONTENT_ACTION_WRAPPER", "CHAT_CONTENT_PROGRESS_BAR", "CHAT_CONTENT_PANEL"]>;
export type ProtocolChatContentType_Schema = z.infer<typeof ProtocolChatContentTypeSchema>;
export declare const ProtocolContentWidthSchema: z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>;
export declare const ProtocolMarkdownStyleSchema: z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>;
export declare const ProtocolActionableCardSelectionModeSchema: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
export declare const ProtocolActionableCardSelectionStateSchema: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
export declare const ProtocolActionableChipSelectionModeSchema: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
export declare const ProtocolActionableChipSelectionStateSchema: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
export declare const ProtocolButtonStyleSchema: z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>;
export declare const ProtocolChatButtonStateSchema: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
export declare const ProtocolProgressBarStateSchema: z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>;
export declare const ProtocolProgressBarVisibilitySchema: z.ZodEnum<["VISIBLE", "HIDDEN"]>;
export declare const ProtocolPanelVisibilitySchema: z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>;
export declare const ProtocolPanelBodyTypeSchema: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
export declare const ProtocolPanelBodyAspectRatioSchema: z.ZodString;
export declare const ProtocolChatMarkdownContentDataSchema: z.ZodObject<{
    markdown: z.ZodString;
    markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    markdown: z.ZodString;
    markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    markdown: z.ZodString;
    markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatMarkdownContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_MARKDOWN">;
    content_data: z.ZodObject<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatButtonContentDataSchema: z.ZodObject<{
    button_text: z.ZodString;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    button_text: z.ZodString;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    button_text: z.ZodString;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatButtonContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_BUTTON">;
    content_data: z.ZodObject<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_BUTTON";
    content_data: {
        button_text: string;
        button_actions: unknown[];
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_BUTTON";
    content_data: {
        button_text: string;
        button_actions: unknown[];
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatActionableCardItemSchema: z.ZodObject<{
    card_title: z.ZodString;
    card_subtitle: z.ZodOptional<z.ZodString>;
    card_value: z.ZodString;
    card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    card_title: z.ZodString;
    card_subtitle: z.ZodOptional<z.ZodString>;
    card_value: z.ZodString;
    card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    card_title: z.ZodString;
    card_subtitle: z.ZodOptional<z.ZodString>;
    card_value: z.ZodString;
    card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatActionableCardsContentDataSchema: z.ZodObject<{
    actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
    actionable_cards_items: z.ZodArray<z.ZodObject<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
    actionable_cards_items: z.ZodArray<z.ZodObject<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
    actionable_cards_items: z.ZodArray<z.ZodObject<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        card_title: z.ZodString;
        card_subtitle: z.ZodOptional<z.ZodString>;
        card_value: z.ZodString;
        card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatActionableCardsContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CARDS">;
    content_data: z.ZodObject<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
    content_data: {
        actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
        actionable_cards_items: z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
    content_data: {
        actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
        actionable_cards_items: z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatActionableChipItemSchema: z.ZodObject<{
    chip_text: z.ZodString;
    chip_value: z.ZodString;
    chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
    chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
    chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    chip_text: z.ZodString;
    chip_value: z.ZodString;
    chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
    chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
    chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    chip_text: z.ZodString;
    chip_value: z.ZodString;
    chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
    chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
    chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatActionableChipsContentDataSchema: z.ZodObject<{
    actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
    actionable_chips_items: z.ZodArray<z.ZodObject<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
    actionable_chips_items: z.ZodArray<z.ZodObject<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
    actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
    actionable_chips_items: z.ZodArray<z.ZodObject<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        chip_text: z.ZodString;
        chip_value: z.ZodString;
        chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
        chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
        chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatActionableChipsContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CHIPS">;
    content_data: z.ZodObject<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    content_data: {
        actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
        actionable_chips_items: z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    content_data: {
        actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
        actionable_chips_items: z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatActionWrapperContentDataSchema: z.ZodObject<{
    action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatActionWrapperContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTION_WRAPPER">;
    content_data: z.ZodObject<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTION_WRAPPER";
    content_data: {
        action?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTION_WRAPPER";
    content_data: {
        action?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatProgressBarContentDataSchema: z.ZodObject<{
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodString;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodString;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodString;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatProgressBarContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_PROGRESS_BAR">;
    content_data: z.ZodObject<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_PROGRESS_BAR";
    content_data: {
        progress_bar_message: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_PROGRESS_BAR";
    content_data: {
        progress_bar_message: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatPanelContentDataSchema: z.ZodObject<{
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodUnknown;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodUnknown;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodUnknown;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatPanelContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_PANEL">;
    content_data: z.ZodObject<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_PANEL";
    content_data: {
        panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_data?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_PANEL";
    content_data: {
        panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_data?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>;
export declare const ProtocolChatContentSchema: z.ZodDiscriminatedUnion<"content_type", [z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_MARKDOWN">;
    content_data: z.ZodObject<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_BUTTON">;
    content_data: z.ZodObject<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        button_text: z.ZodString;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_BUTTON";
    content_data: {
        button_text: string;
        button_actions: unknown[];
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_BUTTON";
    content_data: {
        button_text: string;
        button_actions: unknown[];
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CARDS">;
    content_data: z.ZodObject<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
        actionable_cards_items: z.ZodArray<z.ZodObject<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
    content_data: {
        actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
        actionable_cards_items: z.objectOutputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
    content_data: {
        actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
        actionable_cards_items: z.objectInputType<{
            card_title: z.ZodString;
            card_subtitle: z.ZodOptional<z.ZodString>;
            card_value: z.ZodString;
            card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CHIPS">;
    content_data: z.ZodObject<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
        actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
        actionable_chips_items: z.ZodArray<z.ZodObject<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    content_data: {
        actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
        actionable_chips_items: z.objectOutputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
    content_data: {
        actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
        actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
        actionable_chips_items: z.objectInputType<{
            chip_text: z.ZodString;
            chip_value: z.ZodString;
            chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
            chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
            chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">[];
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_ACTION_WRAPPER">;
    content_data: z.ZodObject<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_ACTION_WRAPPER";
    content_data: {
        action?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_ACTION_WRAPPER";
    content_data: {
        action?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_PROGRESS_BAR">;
    content_data: z.ZodObject<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodString;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_PROGRESS_BAR";
    content_data: {
        progress_bar_message: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_PROGRESS_BAR";
    content_data: {
        progress_bar_message: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>, z.ZodObject<{
    content_id: z.ZodString;
    content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
    content_group_id: z.ZodOptional<z.ZodString>;
    content_queue: z.ZodString;
    content_delay: z.ZodOptional<z.ZodNumber>;
} & {
    content_type: z.ZodLiteral<"CHAT_CONTENT_PANEL">;
    content_data: z.ZodObject<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodUnknown;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    content_type: "CHAT_CONTENT_PANEL";
    content_data: {
        panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_data?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}, {
    content_type: "CHAT_CONTENT_PANEL";
    content_data: {
        panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_data?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    content_queue: string;
    content_id: string;
    content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
    content_delay?: number | undefined;
    content_group_id?: string | undefined;
}>]>;
export type ProtocolChatContent_Schema = z.infer<typeof ProtocolChatContentSchema>;
export declare const ProtocolCanvasContentTypeSchema: z.ZodEnum<["CANVAS_CONTENT_MARKDOWN", "CANVAS_CONTENT_SECTION", "CANVAS_CONTENT_HTML"]>;
export type ProtocolCanvasContentType_Schema = z.infer<typeof ProtocolCanvasContentTypeSchema>;
export declare const ProtocolCanvasMarkdownStyleSchema: z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>;
export declare const ProtocolCanvasSectionStyleSchema: z.ZodEnum<["DEFAULT", "BORDERED", "HIGHLIGHTED", "COMPACT"]>;
export declare const ProtocolCanvasContentMetadataSchema: z.ZodObject<{
    toc_label: z.ZodOptional<z.ZodString>;
    toc_key: z.ZodOptional<z.ZodString>;
    section_data: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}, {
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}>;
export declare const ProtocolCanvasHtmlContentDataSchema: z.ZodObject<{
    toc_label: z.ZodOptional<z.ZodString>;
    toc_key: z.ZodOptional<z.ZodString>;
    section_data: z.ZodOptional<z.ZodUnknown>;
} & {
    html: z.ZodString;
}, "strip", z.ZodTypeAny, {
    html: string;
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}, {
    html: string;
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}>;
export declare const ProtocolCanvasMarkdownContentDataSchema: z.ZodObject<{
    toc_label: z.ZodOptional<z.ZodString>;
    toc_key: z.ZodOptional<z.ZodString>;
    section_data: z.ZodOptional<z.ZodUnknown>;
} & {
    markdown: z.ZodString;
    markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
}, "strip", z.ZodTypeAny, {
    markdown: string;
    markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}, {
    markdown: string;
    markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
    section_data?: unknown;
    toc_label?: string | undefined;
    toc_key?: string | undefined;
}>;
export declare const ProtocolCanvasHtmlContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_type: z.ZodLiteral<"CANVAS_CONTENT_HTML">;
    content_data: z.ZodObject<{
        toc_label: z.ZodOptional<z.ZodString>;
        toc_key: z.ZodOptional<z.ZodString>;
        section_data: z.ZodOptional<z.ZodUnknown>;
    } & {
        html: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }, {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    content_type: "CANVAS_CONTENT_HTML";
    content_data: {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    content_id: string;
}, {
    content_type: "CANVAS_CONTENT_HTML";
    content_data: {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    content_id: string;
}>;
export declare const ProtocolCanvasMarkdownContentSchema: z.ZodObject<{
    content_id: z.ZodString;
    content_type: z.ZodLiteral<"CANVAS_CONTENT_MARKDOWN">;
    content_data: z.ZodObject<{
        toc_label: z.ZodOptional<z.ZodString>;
        toc_key: z.ZodOptional<z.ZodString>;
        section_data: z.ZodOptional<z.ZodUnknown>;
    } & {
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
    }, "strip", z.ZodTypeAny, {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }, {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    content_type: "CANVAS_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    content_id: string;
}, {
    content_type: "CANVAS_CONTENT_MARKDOWN";
    content_data: {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    content_id: string;
}>;
export declare const ProtocolCanvasSectionContentDataSchema: z.ZodType<CommunicationProtocol_CanvasSectionContentData>;
export declare const ProtocolCanvasSectionContentSchema: z.ZodType<CommunicationProtocol_CanvasSectionContent>;
export type ProtocolCanvasContent_Schema = CanvasContent;
export declare const ProtocolCanvasContentSchema: z.ZodType<ProtocolCanvasContent_Schema>;
export declare const ProtocolChatMessageSchema: z.ZodObject<{
    message_id: z.ZodString;
    message_type: z.ZodLiteral<"CHAT_MESSAGE">;
    message_role: z.ZodEnum<["USER", "ASSISTANT"]>;
    message_target: z.ZodLiteral<"CHAT">;
    debug: z.ZodOptional<z.ZodBoolean>;
    message_contents: z.ZodArray<z.ZodDiscriminatedUnion<"content_type", [z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_MARKDOWN">;
        content_data: z.ZodObject<{
            markdown: z.ZodString;
            markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            markdown: z.ZodString;
            markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            markdown: z.ZodString;
            markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_MARKDOWN";
        content_data: {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_MARKDOWN";
        content_data: {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_BUTTON">;
        content_data: z.ZodObject<{
            button_text: z.ZodString;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodString;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodString;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_BUTTON";
        content_data: {
            button_text: string;
            button_actions: unknown[];
            button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
            button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
            button_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_BUTTON";
        content_data: {
            button_text: string;
            button_actions: unknown[];
            button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
            button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
            button_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CARDS">;
        content_data: z.ZodObject<{
            actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
            actionable_cards_items: z.ZodArray<z.ZodObject<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
            actionable_cards_items: z.ZodArray<z.ZodObject<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            actionable_cards_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_cards_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "UNSELECTED"]>;
            actionable_cards_items: z.ZodArray<z.ZodObject<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
        content_data: {
            actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
            actionable_cards_items: z.objectOutputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
        content_data: {
            actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
            actionable_cards_items: z.objectInputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_ACTIONABLE_CHIPS">;
        content_data: z.ZodObject<{
            actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
            actionable_chips_items: z.ZodArray<z.ZodObject<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
            actionable_chips_items: z.ZodArray<z.ZodObject<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            actionable_chips_selection_mode: z.ZodEnum<["SINGLE", "MULTIPLE"]>;
            actionable_chips_selection_state: z.ZodEnum<["PENDING_SELECTION", "SELECTED", "DISABLED"]>;
            actionable_chips_items: z.ZodArray<z.ZodObject<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">>, "many">;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
        content_data: {
            actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
            actionable_chips_items: z.objectOutputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
        content_data: {
            actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
            actionable_chips_items: z.objectInputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_ACTION_WRAPPER">;
        content_data: z.ZodObject<{
            action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            action: z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_ACTION_WRAPPER";
        content_data: {
            action?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_ACTION_WRAPPER";
        content_data: {
            action?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_PROGRESS_BAR">;
        content_data: z.ZodObject<{
            progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
            progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
            progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_message: z.ZodString;
            progress_bar_icon: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
            progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
            progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_message: z.ZodString;
            progress_bar_icon: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
            progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
            progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
            progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
            progress_bar_message: z.ZodString;
            progress_bar_icon: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_PROGRESS_BAR";
        content_data: {
            progress_bar_message: string;
            progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
            progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
            progress_bar_current_percentage?: number | undefined;
            progress_bar_current_animation_duration_ms?: number | undefined;
            progress_bar_next_goal_delay_ms?: number | undefined;
            progress_bar_next_goal_percentage?: number | undefined;
            progress_bar_next_goal_animation_duration_ms?: number | undefined;
            progress_bar_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_PROGRESS_BAR";
        content_data: {
            progress_bar_message: string;
            progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
            progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
            progress_bar_current_percentage?: number | undefined;
            progress_bar_current_animation_duration_ms?: number | undefined;
            progress_bar_next_goal_delay_ms?: number | undefined;
            progress_bar_next_goal_percentage?: number | undefined;
            progress_bar_next_goal_animation_duration_ms?: number | undefined;
            progress_bar_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>, z.ZodObject<{
        content_id: z.ZodString;
        content_width: z.ZodOptional<z.ZodEnum<["WIDTH_AUTO", "WIDTH_FULL"]>>;
        content_group_id: z.ZodOptional<z.ZodString>;
        content_queue: z.ZodString;
        content_delay: z.ZodOptional<z.ZodNumber>;
    } & {
        content_type: z.ZodLiteral<"CHAT_CONTENT_PANEL">;
        content_data: z.ZodObject<{
            panel_header_icon: z.ZodOptional<z.ZodString>;
            panel_header_favicon_url: z.ZodOptional<z.ZodString>;
            panel_header_title: z.ZodOptional<z.ZodString>;
            panel_header_description: z.ZodOptional<z.ZodString>;
            panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
            panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
            panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
            panel_body_data: z.ZodUnknown;
            panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            panel_header_icon: z.ZodOptional<z.ZodString>;
            panel_header_favicon_url: z.ZodOptional<z.ZodString>;
            panel_header_title: z.ZodOptional<z.ZodString>;
            panel_header_description: z.ZodOptional<z.ZodString>;
            panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
            panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
            panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
            panel_body_data: z.ZodUnknown;
            panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            panel_header_icon: z.ZodOptional<z.ZodString>;
            panel_header_favicon_url: z.ZodOptional<z.ZodString>;
            panel_header_title: z.ZodOptional<z.ZodString>;
            panel_header_description: z.ZodOptional<z.ZodString>;
            panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
            panel_body_type: z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>;
            panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
            panel_body_data: z.ZodUnknown;
            panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
            streaming_options: z.ZodOptional<z.ZodUnknown>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        content_type: "CHAT_CONTENT_PANEL";
        content_data: {
            panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
            panel_header_icon?: string | undefined;
            panel_transitions?: Record<string, unknown>[] | undefined;
            panel_effects?: Record<string, unknown>[] | undefined;
            panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
            panel_body_aspect_ratio?: string | undefined;
            panel_header_favicon_url?: string | undefined;
            panel_header_title?: string | undefined;
            panel_header_description?: string | undefined;
            panel_body_data?: unknown;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }, {
        content_type: "CHAT_CONTENT_PANEL";
        content_data: {
            panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
            panel_header_icon?: string | undefined;
            panel_transitions?: Record<string, unknown>[] | undefined;
            panel_effects?: Record<string, unknown>[] | undefined;
            panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
            panel_body_aspect_ratio?: string | undefined;
            panel_header_favicon_url?: string | undefined;
            panel_header_title?: string | undefined;
            panel_header_description?: string | undefined;
            panel_body_data?: unknown;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    message_id: string;
    message_role: "USER" | "ASSISTANT";
    message_contents: ({
        content_type: "CHAT_CONTENT_MARKDOWN";
        content_data: {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_BUTTON";
        content_data: {
            button_text: string;
            button_actions: unknown[];
            button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
            button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
            button_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
        content_data: {
            actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
            actionable_cards_items: z.objectOutputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
        content_data: {
            actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
            actionable_chips_items: z.objectOutputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTION_WRAPPER";
        content_data: {
            action?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_PROGRESS_BAR";
        content_data: {
            progress_bar_message: string;
            progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
            progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
            progress_bar_current_percentage?: number | undefined;
            progress_bar_current_animation_duration_ms?: number | undefined;
            progress_bar_next_goal_delay_ms?: number | undefined;
            progress_bar_next_goal_percentage?: number | undefined;
            progress_bar_next_goal_animation_duration_ms?: number | undefined;
            progress_bar_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_PANEL";
        content_data: {
            panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
            panel_header_icon?: string | undefined;
            panel_transitions?: Record<string, unknown>[] | undefined;
            panel_effects?: Record<string, unknown>[] | undefined;
            panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
            panel_body_aspect_ratio?: string | undefined;
            panel_header_favicon_url?: string | undefined;
            panel_header_title?: string | undefined;
            panel_header_description?: string | undefined;
            panel_body_data?: unknown;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    })[];
    message_type: "CHAT_MESSAGE";
    message_target: "CHAT";
    debug?: boolean | undefined;
}, {
    message_id: string;
    message_role: "USER" | "ASSISTANT";
    message_contents: ({
        content_type: "CHAT_CONTENT_MARKDOWN";
        content_data: {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_BUTTON";
        content_data: {
            button_text: string;
            button_actions: unknown[];
            button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
            button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
            button_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTIONABLE_CARDS";
        content_data: {
            actionable_cards_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_cards_selection_state: "PENDING_SELECTION" | "SELECTED" | "UNSELECTED";
            actionable_cards_items: z.objectInputType<{
                card_title: z.ZodString;
                card_subtitle: z.ZodOptional<z.ZodString>;
                card_value: z.ZodString;
                card_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTIONABLE_CHIPS";
        content_data: {
            actionable_chips_selection_mode: "SINGLE" | "MULTIPLE";
            actionable_chips_selection_state: "DISABLED" | "PENDING_SELECTION" | "SELECTED";
            actionable_chips_items: z.objectInputType<{
                chip_text: z.ZodString;
                chip_value: z.ZodString;
                chip_style: z.ZodEnum<["CHIP_STYLE_PRIMARY", "CHIP_STYLE_SECONDARY"]>;
                chip_state: z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>;
                chip_actions: z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">;
            }, z.ZodTypeAny, "passthrough">[];
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_ACTION_WRAPPER";
        content_data: {
            action?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_PROGRESS_BAR";
        content_data: {
            progress_bar_message: string;
            progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
            progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
            progress_bar_current_percentage?: number | undefined;
            progress_bar_current_animation_duration_ms?: number | undefined;
            progress_bar_next_goal_delay_ms?: number | undefined;
            progress_bar_next_goal_percentage?: number | undefined;
            progress_bar_next_goal_animation_duration_ms?: number | undefined;
            progress_bar_icon?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    } | {
        content_type: "CHAT_CONTENT_PANEL";
        content_data: {
            panel_body_type: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT";
            panel_header_icon?: string | undefined;
            panel_transitions?: Record<string, unknown>[] | undefined;
            panel_effects?: Record<string, unknown>[] | undefined;
            panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
            panel_body_aspect_ratio?: string | undefined;
            panel_header_favicon_url?: string | undefined;
            panel_header_title?: string | undefined;
            panel_header_description?: string | undefined;
            panel_body_data?: unknown;
            streaming_options?: unknown;
        } & {
            [k: string]: unknown;
        };
        content_queue: string;
        content_id: string;
        content_width?: "WIDTH_AUTO" | "WIDTH_FULL" | undefined;
        content_delay?: number | undefined;
        content_group_id?: string | undefined;
    })[];
    message_type: "CHAT_MESSAGE";
    message_target: "CHAT";
    debug?: boolean | undefined;
}>;
export type ProtocolChatMessage_Schema = z.infer<typeof ProtocolChatMessageSchema>;
export declare const ProtocolChatActionTypeSchema: z.ZodEnum<["CHAT_ACTION_SEND_TEXT_MESSAGE", "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD", "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP", "CHAT_ACTION_UPDATE_BUTTON", "CHAT_ACTION_UPDATE_PROGRESS_BAR", "CHAT_ACTION_WAIT_FOR_QUEUES", "CHAT_ACTION_UPDATE_PANEL", "CHAT_ACTION_BEGIN_SIMULATED_TURN", "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE"]>;
export declare const ProtocolCanvasActionTypeSchema: z.ZodEnum<["CANVAS_ACTION_OPEN", "CANVAS_ACTION_CLOSE", "CANVAS_ACTION_UPDATE"]>;
export declare const ProtocolAppActionTypeSchema: z.ZodEnum<["APP_ACTION_SET_THEME", "APP_ACTION_THREAD_LIST_REFRESH", "APP_ACTION_USER_PREFERENCE_UPDATE", "APP_ACTION_CORE_CONSOLE", "APP_ACTION_SET_INPUT_PLACEHOLDER", "APP_ACTION_WAIT_FOR_USER_INPUT", "APP_ACTION_SET_SEND_ERROR"]>;
export declare const ProtocolActionTypeSchema: z.ZodUnion<[z.ZodEnum<["CHAT_ACTION_SEND_TEXT_MESSAGE", "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD", "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP", "CHAT_ACTION_UPDATE_BUTTON", "CHAT_ACTION_UPDATE_PROGRESS_BAR", "CHAT_ACTION_WAIT_FOR_QUEUES", "CHAT_ACTION_UPDATE_PANEL", "CHAT_ACTION_BEGIN_SIMULATED_TURN", "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE"]>, z.ZodEnum<["CANVAS_ACTION_OPEN", "CANVAS_ACTION_CLOSE", "CANVAS_ACTION_UPDATE"]>, z.ZodEnum<["APP_ACTION_SET_THEME", "APP_ACTION_THREAD_LIST_REFRESH", "APP_ACTION_USER_PREFERENCE_UPDATE", "APP_ACTION_CORE_CONSOLE", "APP_ACTION_SET_INPUT_PLACEHOLDER", "APP_ACTION_WAIT_FOR_USER_INPUT", "APP_ACTION_SET_SEND_ERROR"]>]>;
export type ProtocolActionType_Schema = z.infer<typeof ProtocolActionTypeSchema>;
export declare const ProtocolActionTargetSchema: z.ZodEnum<["CHAT", "CANVAS", "APP"]>;
export declare const ProtocolCanvasStateSchema: z.ZodEnum<["DEFAULT", "LOADING", "PROCESSING", "ERROR", "SUCCESS"]>;
export declare const ProtocolCanvasOperationSchema: z.ZodEnum<["SET_CONTENTS", "APPEND_CONTENT", "MODIFY_CONTENT", "REMOVE_CONTENT"]>;
export declare const ProtocolCanvasModificationTypeSchema: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
export declare const ProtocolCanvasStreamingOptionsSchema: z.ZodUnion<[z.ZodObject<{
    chunkInterval: z.ZodNumber;
    chunkSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    chunkInterval: number;
    chunkSize: number;
}, {
    chunkInterval: number;
    chunkSize: number;
}>, z.ZodObject<{
    desiredTotalDuration: z.ZodNumber;
    maximumDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    desiredTotalDuration: number;
    maximumDuration: number;
}, {
    desiredTotalDuration: number;
    maximumDuration: number;
}>]>;
export declare const ProtocolCanvasAppendContentsSchema: z.ZodObject<{
    canvas_insert_position: z.ZodEnum<["TOP", "BOTTOM"]>;
    contents: z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">;
}, "strip", z.ZodTypeAny, {
    contents: CanvasContent[];
    canvas_insert_position: "TOP" | "BOTTOM";
}, {
    contents: CanvasContent[];
    canvas_insert_position: "TOP" | "BOTTOM";
}>;
export declare const ProtocolCanvasModifyContentsSchema: z.ZodObject<{
    target_content_id: z.ZodString;
    modification_type: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
    new_content_data: z.ZodUnion<[z.ZodObject<{
        toc_label: z.ZodOptional<z.ZodString>;
        toc_key: z.ZodOptional<z.ZodString>;
        section_data: z.ZodOptional<z.ZodUnknown>;
    } & {
        html: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }, {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }>, z.ZodObject<{
        toc_label: z.ZodOptional<z.ZodString>;
        toc_key: z.ZodOptional<z.ZodString>;
        section_data: z.ZodOptional<z.ZodUnknown>;
    } & {
        markdown: z.ZodString;
        markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
    }, "strip", z.ZodTypeAny, {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }, {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    }>, z.ZodType<CommunicationProtocol_CanvasSectionContentData<unknown>, z.ZodTypeDef, CommunicationProtocol_CanvasSectionContentData<unknown>>]>;
    streaming_options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        chunkInterval: z.ZodNumber;
        chunkSize: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        chunkInterval: number;
        chunkSize: number;
    }, {
        chunkInterval: number;
        chunkSize: number;
    }>, z.ZodObject<{
        desiredTotalDuration: z.ZodNumber;
        maximumDuration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        desiredTotalDuration: number;
        maximumDuration: number;
    }, {
        desiredTotalDuration: number;
        maximumDuration: number;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    target_content_id: string;
    modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
    new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    } | {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    streaming_options?: {
        chunkInterval: number;
        chunkSize: number;
    } | {
        desiredTotalDuration: number;
        maximumDuration: number;
    } | undefined;
}, {
    target_content_id: string;
    modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
    new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
        html: string;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    } | {
        markdown: string;
        markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
        section_data?: unknown;
        toc_label?: string | undefined;
        toc_key?: string | undefined;
    };
    streaming_options?: {
        chunkInterval: number;
        chunkSize: number;
    } | {
        desiredTotalDuration: number;
        maximumDuration: number;
    } | undefined;
}>;
export declare const ProtocolCanvasRemoveContentsSchema: z.ZodObject<{
    target_content_ids: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    target_content_ids: string[];
}, {
    target_content_ids: string[];
}>;
export declare const ProtocolCanvasOpenActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CANVAS">;
    canvas_id: z.ZodOptional<z.ZodString>;
    canvas_title_label: z.ZodOptional<z.ZodString>;
    canvas_title_href: z.ZodOptional<z.ZodString>;
    canvas_state: z.ZodOptional<z.ZodEnum<["DEFAULT", "LOADING", "PROCESSING", "ERROR", "SUCCESS"]>>;
    canvas_icon: z.ZodOptional<z.ZodString>;
    canvas_initial_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
}, "strip", z.ZodTypeAny, {
    target: "CANVAS";
    canvas_id?: string | undefined;
    canvas_title_label?: string | undefined;
    canvas_title_href?: string | undefined;
    canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
    canvas_icon?: string | undefined;
    canvas_initial_contents?: CanvasContent[] | undefined;
}, {
    target: "CANVAS";
    canvas_id?: string | undefined;
    canvas_title_label?: string | undefined;
    canvas_title_href?: string | undefined;
    canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
    canvas_icon?: string | undefined;
    canvas_initial_contents?: CanvasContent[] | undefined;
}>;
export declare const ProtocolCanvasCloseActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CANVAS">;
    canvas_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    target: "CANVAS";
    canvas_id?: string | undefined;
}, {
    target: "CANVAS";
    canvas_id?: string | undefined;
}>;
export declare const ProtocolCanvasUpdateActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CANVAS">;
    canvas_id: z.ZodString;
    canvas_title_label: z.ZodOptional<z.ZodString>;
    canvas_title_href: z.ZodOptional<z.ZodString>;
    canvas_operation: z.ZodOptional<z.ZodEnum<["SET_CONTENTS", "APPEND_CONTENT", "MODIFY_CONTENT", "REMOVE_CONTENT"]>>;
    canvas_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
    append_contents: z.ZodOptional<z.ZodObject<{
        canvas_insert_position: z.ZodEnum<["TOP", "BOTTOM"]>;
        contents: z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">;
    }, "strip", z.ZodTypeAny, {
        contents: CanvasContent[];
        canvas_insert_position: "TOP" | "BOTTOM";
    }, {
        contents: CanvasContent[];
        canvas_insert_position: "TOP" | "BOTTOM";
    }>>;
    modify_contents: z.ZodOptional<z.ZodObject<{
        target_content_id: z.ZodString;
        modification_type: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
        new_content_data: z.ZodUnion<[z.ZodObject<{
            toc_label: z.ZodOptional<z.ZodString>;
            toc_key: z.ZodOptional<z.ZodString>;
            section_data: z.ZodOptional<z.ZodUnknown>;
        } & {
            html: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        }, {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        }>, z.ZodObject<{
            toc_label: z.ZodOptional<z.ZodString>;
            toc_key: z.ZodOptional<z.ZodString>;
            section_data: z.ZodOptional<z.ZodUnknown>;
        } & {
            markdown: z.ZodString;
            markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
        }, "strip", z.ZodTypeAny, {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        }, {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        }>, z.ZodType<CommunicationProtocol_CanvasSectionContentData<unknown>, z.ZodTypeDef, CommunicationProtocol_CanvasSectionContentData<unknown>>]>;
        streaming_options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            chunkInterval: z.ZodNumber;
            chunkSize: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            chunkInterval: number;
            chunkSize: number;
        }, {
            chunkInterval: number;
            chunkSize: number;
        }>, z.ZodObject<{
            desiredTotalDuration: z.ZodNumber;
            maximumDuration: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            desiredTotalDuration: number;
            maximumDuration: number;
        }, {
            desiredTotalDuration: number;
            maximumDuration: number;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        target_content_id: string;
        modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
        new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        } | {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        };
        streaming_options?: {
            chunkInterval: number;
            chunkSize: number;
        } | {
            desiredTotalDuration: number;
            maximumDuration: number;
        } | undefined;
    }, {
        target_content_id: string;
        modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
        new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        } | {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        };
        streaming_options?: {
            chunkInterval: number;
            chunkSize: number;
        } | {
            desiredTotalDuration: number;
            maximumDuration: number;
        } | undefined;
    }>>;
    remove_contents: z.ZodOptional<z.ZodObject<{
        target_content_ids: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        target_content_ids: string[];
    }, {
        target_content_ids: string[];
    }>>;
    scroll_to_top_after_finish: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    target: "CANVAS";
    canvas_id: string;
    canvas_title_label?: string | undefined;
    canvas_title_href?: string | undefined;
    canvas_contents?: CanvasContent[] | undefined;
    canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
    append_contents?: {
        contents: CanvasContent[];
        canvas_insert_position: "TOP" | "BOTTOM";
    } | undefined;
    modify_contents?: {
        target_content_id: string;
        modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
        new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        } | {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        };
        streaming_options?: {
            chunkInterval: number;
            chunkSize: number;
        } | {
            desiredTotalDuration: number;
            maximumDuration: number;
        } | undefined;
    } | undefined;
    remove_contents?: {
        target_content_ids: string[];
    } | undefined;
    scroll_to_top_after_finish?: boolean | undefined;
}, {
    target: "CANVAS";
    canvas_id: string;
    canvas_title_label?: string | undefined;
    canvas_title_href?: string | undefined;
    canvas_contents?: CanvasContent[] | undefined;
    canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
    append_contents?: {
        contents: CanvasContent[];
        canvas_insert_position: "TOP" | "BOTTOM";
    } | undefined;
    modify_contents?: {
        target_content_id: string;
        modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
        new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
            html: string;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        } | {
            markdown: string;
            markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
            section_data?: unknown;
            toc_label?: string | undefined;
            toc_key?: string | undefined;
        };
        streaming_options?: {
            chunkInterval: number;
            chunkSize: number;
        } | {
            desiredTotalDuration: number;
            maximumDuration: number;
        } | undefined;
    } | undefined;
    remove_contents?: {
        target_content_ids: string[];
    } | undefined;
    scroll_to_top_after_finish?: boolean | undefined;
}>;
export declare const ProtocolCanvasOpenActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_OPEN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_state: z.ZodOptional<z.ZodEnum<["DEFAULT", "LOADING", "PROCESSING", "ERROR", "SUCCESS"]>>;
        canvas_icon: z.ZodOptional<z.ZodString>;
        canvas_initial_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}>;
export declare const ProtocolCanvasCloseActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_CLOSE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}>;
export declare const ProtocolCanvasUpdateActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodString;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_operation: z.ZodOptional<z.ZodEnum<["SET_CONTENTS", "APPEND_CONTENT", "MODIFY_CONTENT", "REMOVE_CONTENT"]>>;
        canvas_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
        append_contents: z.ZodOptional<z.ZodObject<{
            canvas_insert_position: z.ZodEnum<["TOP", "BOTTOM"]>;
            contents: z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">;
        }, "strip", z.ZodTypeAny, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }>>;
        modify_contents: z.ZodOptional<z.ZodObject<{
            target_content_id: z.ZodString;
            modification_type: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
            new_content_data: z.ZodUnion<[z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                html: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                markdown: z.ZodString;
                markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            }, "strip", z.ZodTypeAny, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodType<CommunicationProtocol_CanvasSectionContentData<unknown>, z.ZodTypeDef, CommunicationProtocol_CanvasSectionContentData<unknown>>]>;
            streaming_options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                chunkInterval: z.ZodNumber;
                chunkSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                chunkInterval: number;
                chunkSize: number;
            }, {
                chunkInterval: number;
                chunkSize: number;
            }>, z.ZodObject<{
                desiredTotalDuration: z.ZodNumber;
                maximumDuration: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }>>;
        remove_contents: z.ZodOptional<z.ZodObject<{
            target_content_ids: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            target_content_ids: string[];
        }, {
            target_content_ids: string[];
        }>>;
        scroll_to_top_after_finish: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}>;
export declare const ProtocolCanvasActionSchema: z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_OPEN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_state: z.ZodOptional<z.ZodEnum<["DEFAULT", "LOADING", "PROCESSING", "ERROR", "SUCCESS"]>>;
        canvas_icon: z.ZodOptional<z.ZodString>;
        canvas_initial_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_CLOSE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodString;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_operation: z.ZodOptional<z.ZodEnum<["SET_CONTENTS", "APPEND_CONTENT", "MODIFY_CONTENT", "REMOVE_CONTENT"]>>;
        canvas_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
        append_contents: z.ZodOptional<z.ZodObject<{
            canvas_insert_position: z.ZodEnum<["TOP", "BOTTOM"]>;
            contents: z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">;
        }, "strip", z.ZodTypeAny, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }>>;
        modify_contents: z.ZodOptional<z.ZodObject<{
            target_content_id: z.ZodString;
            modification_type: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
            new_content_data: z.ZodUnion<[z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                html: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                markdown: z.ZodString;
                markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            }, "strip", z.ZodTypeAny, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodType<CommunicationProtocol_CanvasSectionContentData<unknown>, z.ZodTypeDef, CommunicationProtocol_CanvasSectionContentData<unknown>>]>;
            streaming_options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                chunkInterval: z.ZodNumber;
                chunkSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                chunkInterval: number;
                chunkSize: number;
            }, {
                chunkInterval: number;
                chunkSize: number;
            }>, z.ZodObject<{
                desiredTotalDuration: z.ZodNumber;
                maximumDuration: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }>>;
        remove_contents: z.ZodOptional<z.ZodObject<{
            target_content_ids: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            target_content_ids: string[];
        }, {
            target_content_ids: string[];
        }>>;
        scroll_to_top_after_finish: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}>]>;
export type ProtocolCanvasAction_Schema = z.infer<typeof ProtocolCanvasActionSchema>;
export declare const ProtocolActionMessageRoleSchema: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
export declare const ProtocolChatSendTextMessageActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
    text: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
    text: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
    text: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatChooseActionableCardActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    actionable_cards_content_id: z.ZodString;
    selected_card_value: z.ZodString;
    selected_card_title: z.ZodString;
    selected_card_subtitle: z.ZodOptional<z.ZodString>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    actionable_cards_content_id: z.ZodString;
    selected_card_value: z.ZodString;
    selected_card_title: z.ZodString;
    selected_card_subtitle: z.ZodOptional<z.ZodString>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    actionable_cards_content_id: z.ZodString;
    selected_card_value: z.ZodString;
    selected_card_title: z.ZodString;
    selected_card_subtitle: z.ZodOptional<z.ZodString>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatChooseActionableChipActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    actionable_chips_content_id: z.ZodString;
    selected_chip_value: z.ZodString;
    selected_chip_text: z.ZodString;
    selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    actionable_chips_content_id: z.ZodString;
    selected_chip_value: z.ZodString;
    selected_chip_text: z.ZodString;
    selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    actionable_chips_content_id: z.ZodString;
    selected_chip_value: z.ZodString;
    selected_chip_text: z.ZodString;
    selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    simulated_user_message_text: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatUpdateButtonActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    button_content_id: z.ZodString;
    button_text: z.ZodOptional<z.ZodString>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    button_updates: z.ZodOptional<z.ZodObject<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    button_content_id: z.ZodString;
    button_text: z.ZodOptional<z.ZodString>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    button_updates: z.ZodOptional<z.ZodObject<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    button_content_id: z.ZodString;
    button_text: z.ZodOptional<z.ZodString>;
    button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
    button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
    button_icon: z.ZodOptional<z.ZodString>;
    button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    button_updates: z.ZodOptional<z.ZodObject<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        button_text: z.ZodOptional<z.ZodString>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatUpdateProgressBarActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    progress_bar_content_id: z.ZodString;
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodOptional<z.ZodString>;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    progress_bar_content_id: z.ZodString;
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodOptional<z.ZodString>;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    progress_bar_content_id: z.ZodString;
    progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
    progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
    progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
    progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
    progress_bar_message: z.ZodOptional<z.ZodString>;
    progress_bar_icon: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatWaitForQueuesActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    queue_names: z.ZodArray<z.ZodString, "many">;
    wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
    content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    timeout_ms: z.ZodOptional<z.ZodNumber>;
    on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    queue_names: z.ZodArray<z.ZodString, "many">;
    wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
    content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    timeout_ms: z.ZodOptional<z.ZodNumber>;
    on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    queue_names: z.ZodArray<z.ZodString, "many">;
    wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
    content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    timeout_ms: z.ZodOptional<z.ZodNumber>;
    on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatUpdatePanelActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
    panel_content_id: z.ZodString;
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodOptional<z.ZodUnknown>;
    panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
    panel_content_id: z.ZodString;
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodOptional<z.ZodUnknown>;
    panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
    panel_content_id: z.ZodString;
    panel_header_icon: z.ZodOptional<z.ZodString>;
    panel_header_favicon_url: z.ZodOptional<z.ZodString>;
    panel_header_title: z.ZodOptional<z.ZodString>;
    panel_header_description: z.ZodOptional<z.ZodString>;
    panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
    panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
    panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
    panel_body_data: z.ZodOptional<z.ZodUnknown>;
    panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
    panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    streaming_options: z.ZodOptional<z.ZodUnknown>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatTargetOnlyActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"CHAT">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"CHAT">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"CHAT">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolChatSendTextMessageActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_SEND_TEXT_MESSAGE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}>;
export declare const ProtocolChatChooseActionableCardActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CARD">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}>;
export declare const ProtocolChatChooseActionableChipActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}>;
export declare const ProtocolChatUpdateButtonActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_BUTTON">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}>;
export declare const ProtocolChatUpdateProgressBarActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PROGRESS_BAR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}>;
export declare const ProtocolChatWaitForQueuesActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_WAIT_FOR_QUEUES">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}>;
export declare const ProtocolChatUpdatePanelActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PANEL">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}>;
export declare const ProtocolChatBeginSimulatedTurnActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_BEGIN_SIMULATED_TURN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}>;
export declare const ProtocolChatCompleteContentSequenceActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}>;
export declare const ProtocolChatActionSchema: z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_SEND_TEXT_MESSAGE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CARD">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_BUTTON">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PROGRESS_BAR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_WAIT_FOR_QUEUES">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PANEL">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_BEGIN_SIMULATED_TURN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}>]>;
export type ProtocolChatAction_Schema = z.infer<typeof ProtocolChatActionSchema>;
export declare const ProtocolAppThemeNameSchema: z.ZodEnum<["dark", "light", "system"]>;
export declare const ProtocolAppFocusTargetSchema: z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>;
export declare const ProtocolAppCoreConsoleLevelSchema: z.ZodEnum<["debug", "info", "warn", "error"]>;
export declare const ProtocolRecoveryHintTypeSchema: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
export declare const ProtocolRecoveryHintStyleSchema: z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>;
export declare const ProtocolErrorDiagnosticInfoSourceSchema: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
export declare const ProtocolAppSetThemeActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    theme_name: z.ZodEnum<["dark", "light", "system"]>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    theme_name: z.ZodEnum<["dark", "light", "system"]>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    theme_name: z.ZodEnum<["dark", "light", "system"]>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppTargetOnlyActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppPreferenceUpdatesSchema: z.ZodObject<{
    notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
    defaultLanguage: z.ZodOptional<z.ZodString>;
    themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
    chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
    defaultLanguage: z.ZodOptional<z.ZodString>;
    themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
    chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
    defaultLanguage: z.ZodOptional<z.ZodString>;
    themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
    chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppUserPreferenceUpdateActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    preference_updates: z.ZodObject<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    preference_updates: z.ZodObject<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    preference_updates: z.ZodObject<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
        defaultLanguage: z.ZodOptional<z.ZodString>;
        themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
        chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppCoreConsoleActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    level: z.ZodEnum<["debug", "info", "warn", "error"]>;
    message: z.ZodString;
    payload: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    level: z.ZodEnum<["debug", "info", "warn", "error"]>;
    message: z.ZodString;
    payload: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    level: z.ZodEnum<["debug", "info", "warn", "error"]>;
    message: z.ZodString;
    payload: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppSetInputPlaceholderActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    placeholder: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    placeholder: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    placeholder: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppWaitForUserInputActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppRecoveryHintSchema: z.ZodObject<{
    hint_id: z.ZodString;
    hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    hint_id: z.ZodString;
    hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    hint_id: z.ZodString;
    hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppErrorDiagnosticInfoSchema: z.ZodObject<{
    diagnostic_id: z.ZodOptional<z.ZodString>;
    thread_id: z.ZodOptional<z.ZodString>;
    message_id: z.ZodOptional<z.ZodString>;
    pipeline_name: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
    timestamp: z.ZodOptional<z.ZodString>;
    status_code: z.ZodOptional<z.ZodNumber>;
    retry_count: z.ZodOptional<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    diagnostic_id: z.ZodOptional<z.ZodString>;
    thread_id: z.ZodOptional<z.ZodString>;
    message_id: z.ZodOptional<z.ZodString>;
    pipeline_name: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
    timestamp: z.ZodOptional<z.ZodString>;
    status_code: z.ZodOptional<z.ZodNumber>;
    retry_count: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    diagnostic_id: z.ZodOptional<z.ZodString>;
    thread_id: z.ZodOptional<z.ZodString>;
    message_id: z.ZodOptional<z.ZodString>;
    pipeline_name: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
    timestamp: z.ZodOptional<z.ZodString>;
    status_code: z.ZodOptional<z.ZodNumber>;
    retry_count: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppSetSendErrorActionDataSchema: z.ZodObject<{
    target: z.ZodLiteral<"APP">;
    error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
    message: z.ZodString;
    recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    diagnostics: z.ZodOptional<z.ZodObject<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    target: z.ZodLiteral<"APP">;
    error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
    message: z.ZodString;
    recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    diagnostics: z.ZodOptional<z.ZodObject<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    target: z.ZodLiteral<"APP">;
    error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
    message: z.ZodString;
    recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        hint_id: z.ZodString;
        hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    diagnostics: z.ZodOptional<z.ZodObject<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        diagnostic_id: z.ZodOptional<z.ZodString>;
        thread_id: z.ZodOptional<z.ZodString>;
        message_id: z.ZodOptional<z.ZodString>;
        pipeline_name: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
        timestamp: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        retry_count: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ProtocolAppSetThemeActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_THEME">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}>;
export declare const ProtocolAppThreadListRefreshActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_THREAD_LIST_REFRESH">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}>;
export declare const ProtocolAppUserPreferenceUpdateActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_USER_PREFERENCE_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}>;
export declare const ProtocolAppCoreConsoleActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_CORE_CONSOLE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}>;
export declare const ProtocolAppSetInputPlaceholderActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_INPUT_PLACEHOLDER">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}>;
export declare const ProtocolAppWaitForUserInputActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_WAIT_FOR_USER_INPUT">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}>;
export declare const ProtocolAppSetSendErrorActionSchema: z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_SEND_ERROR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}>;
export declare const ProtocolAppActionSchema: z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_THEME">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_THREAD_LIST_REFRESH">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_USER_PREFERENCE_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_CORE_CONSOLE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_INPUT_PLACEHOLDER">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_WAIT_FOR_USER_INPUT">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_SEND_ERROR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}>]>;
export type ProtocolAppAction_Schema = z.infer<typeof ProtocolAppActionSchema>;
export declare const ProtocolActionSchema: z.ZodUnion<[z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_SEND_TEXT_MESSAGE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        role: z.ZodEnum<["USER", "ASSISTANT", "SYSTEM"]>;
        text: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}, {
    action_id: string;
    action_data: {
        text: string;
        target: "CHAT";
        role: "USER" | "ASSISTANT" | "SYSTEM";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CARD">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_cards_content_id: z.ZodString;
        selected_card_value: z.ZodString;
        selected_card_title: z.ZodString;
        selected_card_subtitle: z.ZodOptional<z.ZodString>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_cards_content_id: string;
        selected_card_value: string;
        selected_card_title: string;
        simulated_user_message_text?: string | undefined;
        selected_card_subtitle?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        actionable_chips_content_id: z.ZodString;
        selected_chip_value: z.ZodString;
        selected_chip_text: z.ZodString;
        selected_chip_values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selected_chip_texts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        simulated_user_message_text: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        actionable_chips_content_id: string;
        selected_chip_value: string;
        selected_chip_text: string;
        simulated_user_message_text?: string | undefined;
        selected_chip_values?: string[] | undefined;
        selected_chip_texts?: string[] | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_BUTTON">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        button_content_id: z.ZodString;
        button_text: z.ZodOptional<z.ZodString>;
        button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
        button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
        button_icon: z.ZodOptional<z.ZodString>;
        button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        button_updates: z.ZodOptional<z.ZodObject<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectOutputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        button_content_id: string;
        button_text?: string | undefined;
        button_state?: "ENABLED" | "DISABLED" | "LOADING" | undefined;
        button_style?: "BUTTON_STYLE_PRIMARY" | "BUTTON_STYLE_SECONDARY" | "BUTTON_STYLE_SUCCESS" | "BUTTON_STYLE_WARNING" | "BUTTON_STYLE_DANGER" | undefined;
        button_icon?: string | undefined;
        button_actions?: unknown[] | undefined;
        button_updates?: z.objectInputType<{
            button_text: z.ZodOptional<z.ZodString>;
            button_icon: z.ZodOptional<z.ZodString>;
            button_style: z.ZodOptional<z.ZodEnum<["BUTTON_STYLE_PRIMARY", "BUTTON_STYLE_SECONDARY", "BUTTON_STYLE_SUCCESS", "BUTTON_STYLE_WARNING", "BUTTON_STYLE_DANGER"]>>;
            button_state: z.ZodOptional<z.ZodEnum<["ENABLED", "DISABLED", "LOADING"]>>;
            button_actions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodType<unknown, z.ZodTypeDef, unknown>>, "many">>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_BUTTON";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PROGRESS_BAR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        progress_bar_content_id: z.ZodString;
        progress_bar_state: z.ZodOptional<z.ZodEnum<["IN_PROGRESS", "COMPLETED", "ERROR", "PAUSED", "CANCELLED"]>>;
        progress_bar_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN"]>>;
        progress_bar_current_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_current_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_delay_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_percentage: z.ZodOptional<z.ZodNumber>;
        progress_bar_next_goal_animation_duration_ms: z.ZodOptional<z.ZodNumber>;
        progress_bar_message: z.ZodOptional<z.ZodString>;
        progress_bar_icon: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        progress_bar_content_id: string;
        progress_bar_state?: "IN_PROGRESS" | "COMPLETED" | "ERROR" | "PAUSED" | "CANCELLED" | undefined;
        progress_bar_visibility?: "VISIBLE" | "HIDDEN" | undefined;
        progress_bar_current_percentage?: number | undefined;
        progress_bar_current_animation_duration_ms?: number | undefined;
        progress_bar_next_goal_delay_ms?: number | undefined;
        progress_bar_next_goal_percentage?: number | undefined;
        progress_bar_next_goal_animation_duration_ms?: number | undefined;
        progress_bar_message?: string | undefined;
        progress_bar_icon?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_WAIT_FOR_QUEUES">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        queue_names: z.ZodArray<z.ZodString, "many">;
        wait_mode: z.ZodOptional<z.ZodEnum<["DRAIN", "IDLE", "CONTENT_IDS"]>>;
        content_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeout_ms: z.ZodOptional<z.ZodNumber>;
        on_timeout: z.ZodOptional<z.ZodEnum<["CONTINUE", "ERROR"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        queue_names: string[];
        wait_mode?: "DRAIN" | "IDLE" | "CONTENT_IDS" | undefined;
        content_ids?: string[] | undefined;
        timeout_ms?: number | undefined;
        on_timeout?: "ERROR" | "CONTINUE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_WAIT_FOR_QUEUES";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_UPDATE_PANEL">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
        panel_content_id: z.ZodString;
        panel_header_icon: z.ZodOptional<z.ZodString>;
        panel_header_favicon_url: z.ZodOptional<z.ZodString>;
        panel_header_title: z.ZodOptional<z.ZodString>;
        panel_header_description: z.ZodOptional<z.ZodString>;
        panel_visibility: z.ZodOptional<z.ZodEnum<["VISIBLE", "HIDDEN", "COLLAPSED"]>>;
        panel_body_type: z.ZodOptional<z.ZodEnum<["PANEL_BODY_MARKDOWN", "PANEL_BODY_REASONING_V1_MARKDOWN", "PANEL_BODY_REASONING_V2_MARKDOWN", "PANEL_BODY_IMAGE", "PANEL_BODY_ACTIONABLE_CARDS", "PANEL_BODY_ACTIONABLE_CHIPS", "PANEL_BODY_GOOGLE_SEARCH_HOME", "PANEL_BODY_GOOGLE_SEARCH_RESULT", "PANEL_BODY_GOOGLE_MAPS_HOME", "PANEL_BODY_GOOGLE_MAPS_REVIEWS", "PANEL_BODY_CHATGPT_HOME", "PANEL_BODY_CHATGPT_RESULT", "PANEL_BODY_GEMINI_HOME", "PANEL_BODY_GEMINI_RESULT", "PANEL_BODY_PERPLEXITY_HOME", "PANEL_BODY_PERPLEXITY_RESULT"]>>;
        panel_body_aspect_ratio: z.ZodOptional<z.ZodString>;
        panel_body_data: z.ZodOptional<z.ZodUnknown>;
        panel_scrolling_framer_motion_attributes: z.ZodOptional<z.ZodUnknown>;
        panel_transitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        panel_effects: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
        streaming_options: z.ZodOptional<z.ZodUnknown>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
        panel_content_id: string;
        panel_header_icon?: string | undefined;
        panel_transitions?: Record<string, unknown>[] | undefined;
        panel_effects?: Record<string, unknown>[] | undefined;
        panel_visibility?: "VISIBLE" | "HIDDEN" | "COLLAPSED" | undefined;
        panel_body_aspect_ratio?: string | undefined;
        panel_header_favicon_url?: string | undefined;
        panel_header_title?: string | undefined;
        panel_header_description?: string | undefined;
        panel_body_type?: "PANEL_BODY_MARKDOWN" | "PANEL_BODY_REASONING_V1_MARKDOWN" | "PANEL_BODY_REASONING_V2_MARKDOWN" | "PANEL_BODY_IMAGE" | "PANEL_BODY_ACTIONABLE_CARDS" | "PANEL_BODY_ACTIONABLE_CHIPS" | "PANEL_BODY_GOOGLE_SEARCH_HOME" | "PANEL_BODY_GOOGLE_SEARCH_RESULT" | "PANEL_BODY_GOOGLE_MAPS_HOME" | "PANEL_BODY_GOOGLE_MAPS_REVIEWS" | "PANEL_BODY_CHATGPT_HOME" | "PANEL_BODY_CHATGPT_RESULT" | "PANEL_BODY_GEMINI_HOME" | "PANEL_BODY_GEMINI_RESULT" | "PANEL_BODY_PERPLEXITY_HOME" | "PANEL_BODY_PERPLEXITY_RESULT" | undefined;
        panel_body_data?: unknown;
        panel_scrolling_framer_motion_attributes?: unknown;
        streaming_options?: unknown;
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_UPDATE_PANEL";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_BEGIN_SIMULATED_TURN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_BEGIN_SIMULATED_TURN";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CHAT">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"CHAT">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}, {
    action_id: string;
    action_data: {
        target: "CHAT";
    } & {
        [k: string]: unknown;
    };
    action_type: "CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE";
}>]>, z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_OPEN">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_state: z.ZodOptional<z.ZodEnum<["DEFAULT", "LOADING", "PROCESSING", "ERROR", "SUCCESS"]>>;
        canvas_icon: z.ZodOptional<z.ZodString>;
        canvas_initial_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_state?: "DEFAULT" | "LOADING" | "PROCESSING" | "ERROR" | "SUCCESS" | undefined;
        canvas_icon?: string | undefined;
        canvas_initial_contents?: CanvasContent[] | undefined;
    };
    action_type: "CANVAS_ACTION_OPEN";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_CLOSE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }, {
        target: "CANVAS";
        canvas_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id?: string | undefined;
    };
    action_type: "CANVAS_ACTION_CLOSE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"CANVAS_ACTION_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"CANVAS">;
        canvas_id: z.ZodString;
        canvas_title_label: z.ZodOptional<z.ZodString>;
        canvas_title_href: z.ZodOptional<z.ZodString>;
        canvas_operation: z.ZodOptional<z.ZodEnum<["SET_CONTENTS", "APPEND_CONTENT", "MODIFY_CONTENT", "REMOVE_CONTENT"]>>;
        canvas_contents: z.ZodOptional<z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">>;
        append_contents: z.ZodOptional<z.ZodObject<{
            canvas_insert_position: z.ZodEnum<["TOP", "BOTTOM"]>;
            contents: z.ZodArray<z.ZodType<CanvasContent, z.ZodTypeDef, CanvasContent>, "many">;
        }, "strip", z.ZodTypeAny, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }, {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        }>>;
        modify_contents: z.ZodOptional<z.ZodObject<{
            target_content_id: z.ZodString;
            modification_type: z.ZodEnum<["REVEAL", "REPLACE", "UPDATE_PROPERTIES", "APPEND_TO_CONTENT"]>;
            new_content_data: z.ZodUnion<[z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                html: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodObject<{
                toc_label: z.ZodOptional<z.ZodString>;
                toc_key: z.ZodOptional<z.ZodString>;
                section_data: z.ZodOptional<z.ZodUnknown>;
            } & {
                markdown: z.ZodString;
                markdown_style: z.ZodOptional<z.ZodEnum<["DEFAULT", "COMPACT", "LARGE"]>>;
            }, "strip", z.ZodTypeAny, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }, {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            }>, z.ZodType<CommunicationProtocol_CanvasSectionContentData<unknown>, z.ZodTypeDef, CommunicationProtocol_CanvasSectionContentData<unknown>>]>;
            streaming_options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                chunkInterval: z.ZodNumber;
                chunkSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                chunkInterval: number;
                chunkSize: number;
            }, {
                chunkInterval: number;
                chunkSize: number;
            }>, z.ZodObject<{
                desiredTotalDuration: z.ZodNumber;
                maximumDuration: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }, {
                desiredTotalDuration: number;
                maximumDuration: number;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }, {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        }>>;
        remove_contents: z.ZodOptional<z.ZodObject<{
            target_content_ids: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            target_content_ids: string[];
        }, {
            target_content_ids: string[];
        }>>;
        scroll_to_top_after_finish: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }, {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "CANVAS";
        canvas_id: string;
        canvas_title_label?: string | undefined;
        canvas_title_href?: string | undefined;
        canvas_contents?: CanvasContent[] | undefined;
        canvas_operation?: "SET_CONTENTS" | "APPEND_CONTENT" | "MODIFY_CONTENT" | "REMOVE_CONTENT" | undefined;
        append_contents?: {
            contents: CanvasContent[];
            canvas_insert_position: "TOP" | "BOTTOM";
        } | undefined;
        modify_contents?: {
            target_content_id: string;
            modification_type: "REPLACE" | "UPDATE_PROPERTIES" | "APPEND_TO_CONTENT" | "REVEAL";
            new_content_data: CommunicationProtocol_CanvasSectionContentData<unknown> | {
                html: string;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            } | {
                markdown: string;
                markdown_style?: "DEFAULT" | "COMPACT" | "LARGE" | undefined;
                section_data?: unknown;
                toc_label?: string | undefined;
                toc_key?: string | undefined;
            };
            streaming_options?: {
                chunkInterval: number;
                chunkSize: number;
            } | {
                desiredTotalDuration: number;
                maximumDuration: number;
            } | undefined;
        } | undefined;
        remove_contents?: {
            target_content_ids: string[];
        } | undefined;
        scroll_to_top_after_finish?: boolean | undefined;
    };
    action_type: "CANVAS_ACTION_UPDATE";
}>]>, z.ZodDiscriminatedUnion<"action_type", [z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_THEME">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        theme_name: z.ZodEnum<["dark", "light", "system"]>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        theme_name: "system" | "dark" | "light";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_THEME";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_THREAD_LIST_REFRESH">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}, {
    action_id: string;
    action_data: {
        target: "APP";
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_THREAD_LIST_REFRESH";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_USER_PREFERENCE_UPDATE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        preference_updates: z.ZodObject<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            notificationsEnabled: z.ZodOptional<z.ZodBoolean>;
            defaultLanguage: z.ZodOptional<z.ZodString>;
            themePreference: z.ZodOptional<z.ZodEnum<["dark", "light", "auto"]>>;
            chatPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            canvasPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            accessibilityPreferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        preference_updates: {
            notificationsEnabled?: boolean | undefined;
            defaultLanguage?: string | undefined;
            themePreference?: "auto" | "dark" | "light" | undefined;
            chatPreferences?: Record<string, unknown> | undefined;
            canvasPreferences?: Record<string, unknown> | undefined;
            accessibilityPreferences?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_USER_PREFERENCE_UPDATE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_CORE_CONSOLE">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        level: z.ZodEnum<["debug", "info", "warn", "error"]>;
        message: z.ZodString;
        payload: z.ZodOptional<z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        message: string;
        level: "debug" | "info" | "warn" | "error";
        timestamp?: string | undefined;
        payload?: unknown;
        source?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_CORE_CONSOLE";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_INPUT_PLACEHOLDER">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        placeholder: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        placeholder: string;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_INPUT_PLACEHOLDER";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_WAIT_FOR_USER_INPUT">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        focus_target: z.ZodOptional<z.ZodEnum<["CHAT_INPUT", "CANVAS", "NONE"]>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        focus_target?: "CANVAS" | "CHAT_INPUT" | "NONE" | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_WAIT_FOR_USER_INPUT";
}>, z.ZodObject<{
    action_id: z.ZodString;
    action_type: z.ZodLiteral<"APP_ACTION_SET_SEND_ERROR">;
    action_data: z.ZodObject<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        target: z.ZodLiteral<"APP">;
        error_kind: z.ZodEnum<["APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR", "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR"]>;
        message: z.ZodString;
        recovery_hints: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">>, "many">>;
        diagnostics: z.ZodOptional<z.ZodObject<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectOutputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectOutputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}, {
    action_id: string;
    action_data: {
        target: "APP";
        error_kind: "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_ENTITY_NOT_FOUND" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_SYSTEM_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_NETWORK_ERROR" | "APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_PROTOCOL_ERROR";
        message: string;
        recovery_hints?: z.objectInputType<{
            hint_id: z.ZodString;
            hint_type: z.ZodEnum<["RECOVERY_HINT_TYPE_RETRY", "RECOVERY_HINT_TYPE_TRY_URL", "RECOVERY_HINT_TYPE_CLEAR_AND_REFOCUS", "RECOVERY_HINT_TYPE_NEW_SCAN"]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodEnum<["RECOVERY_HINT_STYLE_PRIMARY", "RECOVERY_HINT_STYLE_SECONDARY"]>>;
        }, z.ZodTypeAny, "passthrough">[] | undefined;
        diagnostics?: z.objectInputType<{
            diagnostic_id: z.ZodOptional<z.ZodString>;
            thread_id: z.ZodOptional<z.ZodString>;
            message_id: z.ZodOptional<z.ZodString>;
            pipeline_name: z.ZodOptional<z.ZodString>;
            source: z.ZodEnum<["ERROR_DIAGNOSTIC_INFO_SOURCE_PROTOCOL", "ERROR_DIAGNOSTIC_INFO_SOURCE_TRANSPORT"]>;
            timestamp: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            retry_count: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } & {
        [k: string]: unknown;
    };
    action_type: "APP_ACTION_SET_SEND_ERROR";
}>]>]>;
export type ProtocolAction_Schema = z.infer<typeof ProtocolActionSchema>;
export type ProtocolChatMessage_Strict = z.infer<typeof ProtocolChatMessageSchema>;
export type ProtocolChatContent_Strict = z.infer<typeof ProtocolChatContentSchema>;
export type ProtocolCanvasContent_Strict = ProtocolCanvasContent_Schema;
export type ProtocolCanvasAction_Strict = ProtocolCanvasAction_Schema;
export type ProtocolAction_Strict = z.infer<typeof ProtocolActionSchema>;
//# sourceMappingURL=index.d.ts.map