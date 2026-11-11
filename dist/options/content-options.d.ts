/**
 * @fileoverview Option interfaces for markdown, panels, cards, chips, progress bars, and other chat content builders.
 *
 * Flow: content option types -> protocol content builders -> `message_contents` arrays on chat messages.
 *
 * @example
 * ```typescript
 * import type { CommunicationProtocol_MarkdownContentOptions } from "./content-options";
 *
 * const markdown: Pick<CommunicationProtocol_MarkdownContentOptions, "markdown" | "content_queue"> = {
 *   content_queue: "main",
 *   markdown: "# Title",
 * };
 * void markdown;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 *  * @see @gg-utils/chat-comms/docs/communication-protocol/README.md - Protocol documentation tree.
 * @see @gg-utils/chat-comms/options - Shared option exports.
 * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CanvasContent, CommunicationProtocol_ChatAction } from "../types/index.js";
import type { ActionableCardSelectionMode, ActionableCardSelectionState, ActionableChipSelectionMode, ActionableChipSelectionState, ButtonStyle, ChatButtonState, ChipState, ChipStyle, CommunicationProtocol_ActionableCardField, CommunicationProtocol_BaseActionableCardContentOptions, CommunicationProtocol_BaseActionableChipContentOptions, CommunicationProtocol_BaseContentOptions, CommunicationProtocol_BaseIdResolutionOptions, CommunicationProtocol_BasePanelOptions, CommunicationProtocol_BaseProgressOptions, MarkdownStyle, PanelBodyType, SectionStyle } from "../types/common.js";
import type { AllAction } from "../types/unions.js";
/**
 * Options for creating CHAT_CONTENT_MARKDOWN content
 *
 * Configures rich text content with markdown formatting for chat messages.
 * Supports various visual styles and automatic ID generation for easy
 * integration with the message builder pattern.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_MARKDOWN.md - Markdown Content Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_CONTENT_MARKDOWN.md - Runnable integration examples for this wire shape.
 *
 * @interface CommunicationProtocol_MarkdownContentOptions
 */
export interface CommunicationProtocol_MarkdownContentOptions extends CommunicationProtocol_BaseContentOptions {
    /**
     * Markdown-formatted text content to display
     * Supports standard markdown syntax for rich text formatting
     * @required
     */
    markdown: string;
    /**
     * Visual style variant for the markdown content
     * - DEFAULT: Standard markdown rendering
     * - COMPACT: Reduced spacing and smaller typography
     * - LARGE: Increased spacing and larger typography
     * @optional When omitted, the renderer applies the DEFAULT variant above (standard spacing and typography).
     */
    style?: MarkdownStyle;
}
/**
 * Options for creating CHAT_CONTENT_ACTIONABLE_CARDS content
 *
 * Configures card-based selection interfaces for user choices. Cards provide
 * a visually rich way to present options with titles, subtitles, and associated
 * actions. Supports both single and multiple selection modes.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - Actionable Cards Specification
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-usage-examples/CHAT_CONTENT_ACTIONABLE_CARDS.md - Runnable integration examples for this wire shape.
 *
 * @interface CommunicationProtocol_ActionableCardsOptions
 */
export interface CommunicationProtocol_ActionableCardsOptions extends CommunicationProtocol_BaseActionableCardContentOptions {
}
/**
 * Configuration for individual actionable cards
 *
 * Defines the content and behavior of a single card within an actionable cards group.
 * Actions are automatically generated if not provided, using the card's title and subtitle
 * to create appropriate user interaction simulations.
 *
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md - Actionable Cards Specification
 *
 * @interface CommunicationProtocol_CardOptions
 */
export interface CommunicationProtocol_CardOptions {
    /**
     * Primary text displayed prominently on the card
     * Should be concise and descriptive of the option
     * @required
     */
    title: string;
    /**
     * Secondary text providing additional context or description
     * Displayed below the title with less visual prominence
     * @required
     */
    subtitle: string;
    /**
     * Longer text shown under the title, written to `card_body`
     * It is separate from the subtitle and is never merged into it
     * @optional
     */
    body?: string;
    /**
     * Labelled values in display order, written to `card_fields`
     * @optional
     */
    fields?: CommunicationProtocol_ActionableCardField[];
    /**
     * Identifier of the follow-up action that choosing the card starts, written to `card_action_id`
     * Must be a non-empty string. It does not replace `actions`: the action list is still what runs
     * @optional
     */
    action_id?: string;
    /**
     * Build a card that cannot be chosen: `card_actions` is written as an empty list and no
     * choose-card action is generated, so no message ID is needed for this card
     * Cannot be combined with `actions` or `action_id`, because a card that cannot be chosen
     * starts nothing. Defaults to false, which keeps the generated choose-card action
     * @optional
     */
    display_only?: boolean;
    /**
     * Unique value identifier for this card option
     * Used in action data when the card is selected
     * @required
     */
    value: string;
    /**
     * Custom actions to execute when card is selected
     * If not provided, actions are auto-generated based on title and subtitle
     * @optional - auto-generated if not provided
     */
    actions?: CommunicationProtocol_ChatAction[];
    /**
     * Custom text to simulate as user input when card is selected
     * If not provided, defaults to "{title} {subtitle}"
     * @optional
     */
    simulated_user_message_text?: string;
}
/**
 * Options for creating CHAT_CONTENT_ACTIONABLE_CHIPS content
 */
export interface CommunicationProtocol_ActionableChipsOptions extends CommunicationProtocol_BaseActionableChipContentOptions {
}
/**
 * Configuration for individual actionable chips
 */
export interface CommunicationProtocol_ChipOptions {
    chip_text: string;
    chip_value: string;
    chip_style?: ChipStyle;
    chip_state?: ChipState;
    chip_actions?: CommunicationProtocol_ChatAction[];
    simulated_user_message_text?: string;
}
/**
 * Options for creating CHAT_CONTENT_BUTTON content
 */
export interface CommunicationProtocol_ButtonContentOptions extends CommunicationProtocol_BaseContentOptions {
    button_text: string;
    button_style?: ButtonStyle;
    button_state?: ChatButtonState;
    button_actions: CommunicationProtocol_ChatAction[];
    simulated_user_message_text?: string;
}
/**
 * Options for creating CHAT_CONTENT_PROGRESS_BAR content
 */
export interface CommunicationProtocol_ProgressBarContentOptions extends CommunicationProtocol_BaseContentOptions, CommunicationProtocol_BaseProgressOptions {
    progress_bar_message: string;
}
/**
 * Options for creating CHAT_CONTENT_ACTION_WRAPPER content
 */
export interface CommunicationProtocol_ActionWrapperContentOptions extends CommunicationProtocol_BaseContentOptions {
    action: AllAction;
}
/**
 * Options for creating CHAT_CONTENT_PANEL content
 */
export interface CommunicationProtocol_PanelContentOptions extends CommunicationProtocol_BaseContentOptions, CommunicationProtocol_BasePanelOptions {
    panel_body_type: PanelBodyType;
    panel_body_data: unknown;
}
/** Shared optional metadata that canvas renderers may use for navigation or domain extensions. */
export interface CommunicationProtocol_CanvasContentMetadataOptions<SectionData = unknown> {
    toc_label?: string;
    toc_key?: string;
    section_data?: SectionData;
}
/**
 * Options for creating CANVAS_CONTENT_MARKDOWN content
 */
export interface CommunicationProtocol_CanvasMarkdownContentOptions<SectionData = unknown> extends CommunicationProtocol_BaseIdResolutionOptions, CommunicationProtocol_CanvasContentMetadataOptions<SectionData> {
    content_id?: string;
    markdown: string;
    markdown_style?: MarkdownStyle;
    canvas_id?: string;
}
/**
 * Options for creating CANVAS_CONTENT_HTML content
 * Raw HTML content rendering (no sanitization performed at protocol level)
 */
export interface CommunicationProtocol_CanvasHtmlContentOptions<SectionData = unknown> extends CommunicationProtocol_BaseIdResolutionOptions, CommunicationProtocol_CanvasContentMetadataOptions<SectionData> {
    content_id?: string;
    html: string;
    canvas_id?: string;
}
/**
 * Options for creating CANVAS_CONTENT_SECTION content
 */
export interface CommunicationProtocol_CanvasSectionContentOptions<SectionData = unknown> extends CommunicationProtocol_BaseIdResolutionOptions, CommunicationProtocol_CanvasContentMetadataOptions<SectionData> {
    content_id?: string;
    sectionTitle: string;
    sectionCollapsed?: boolean;
    sectionStyle?: SectionStyle;
    sectionContents: CanvasContent[];
    canvas_id?: string;
}
/**
 * Simplified options for adding actionable cards via MessageBuilder
 */
export interface CommunicationProtocol_AddActionableCardsOptions {
    content_id_suffix: string;
    actionable_cards_items: CommunicationProtocol_CardOptions[];
    actionable_cards_selection_mode?: ActionableCardSelectionMode;
    actionable_cards_selection_state?: ActionableCardSelectionState;
    /** Optional delay in ms AFTER this content item finishes */
    content_delay?: number;
    /** Required queue name for explicit content processing */
    content_queue: string;
}
/**
 * Simplified options for adding actionable chips via MessageBuilder
 */
export interface CommunicationProtocol_AddActionableChipsOptions {
    content_id_suffix: string;
    actionable_chips_items: CommunicationProtocol_ChipOptions[];
    actionable_chips_selection_mode?: ActionableChipSelectionMode;
    actionable_chips_selection_state?: ActionableChipSelectionState;
    /** Optional delay in ms AFTER this content item finishes */
    content_delay?: number;
    /** Required queue name for explicit content processing */
    content_queue: string;
}
/**
 * Simplified options for adding action wrapper via MessageBuilder
 */
export interface CommunicationProtocol_AddActionWrapperOptions {
    content_id_suffix: string;
    wrapped_action: AllAction;
    /** Optional delay in ms AFTER this content item finishes */
    content_delay?: number;
    /** Required queue name for explicit content processing */
    content_queue: string;
}
//# sourceMappingURL=content-options.d.ts.map