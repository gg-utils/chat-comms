import { describe, expect, it } from "vitest";

import {
  CommunicationProtocol_ActionableCardsContentBuilder,
  CommunicationProtocol_Builder,
  CommunicationProtocol_ChatMessageBuilder,
  CommunicationProtocol_MarkdownContentBuilder,
  ProtocolIdUtils,
  ProtocolIdUtils_SequenceManager,
  buildProtocolCanvasHtmlContent,
  buildProtocolCanvasMarkdownContent,
  buildProtocolCanvasSectionContent,
} from "./builders/index.js";
import {
  ANIMATION_TRIGGERS,
  CommunicationProtocol_Animation_validateTrigger,
  CommunicationProtocol_Animation_validateType,
  PANEL_ANIMATION_TYPES,
  PanelHeaderIcons_isPredefinedPanelHeaderIcon,
  isOpeningTrigger,
} from "./animation/index.js";
import {
  FIXTURE_ACTIONABLE_CARDS_TYPED_FIELDS_MESSAGE,
  FIXTURE_APP_ACTION_CORE_CONSOLE,
  FIXTURE_APP_ACTION_SET_SEND_ERROR,
  FIXTURE_APP_ACTION_SET_THEME,
  FIXTURE_CANVAS_CLOSE,
  FIXTURE_CANVAS_CONTENT_HTML,
  FIXTURE_CANVAS_CONTENT_MARKDOWN,
  FIXTURE_CANVAS_CONTENT_SECTION,
  FIXTURE_CANVAS_OPEN,
  FIXTURE_CANVAS_UPDATE_APPEND,
  FIXTURE_CANVAS_UPDATE_MODIFY,
  FIXTURE_CANVAS_UPDATE_SET,
  FIXTURE_DEBUG_MESSAGE,
  FIXTURE_INVALID_CARD_ACTION_ID_EMPTY,
  FIXTURE_INVALID_EMPTY_CONTENTS,
  FIXTURE_INVALID_SYSTEM_ROLE,
  FIXTURE_INVALID_TARGET_APP,
  FIXTURE_INVALID_TARGET_CANVAS,
  FIXTURE_INVALID_UNKNOWN_TARGET,
  FIXTURE_INVALID_UNKNOWN_TARGET_ACTION,
  FIXTURE_MINIMAL_CHAT_MESSAGE,
  FIXTURE_NON_DEBUG_MESSAGE,
  FIXTURE_STREAM_FENCE_SPLIT,
  FIXTURE_STREAM_NESTED_JSON,
  FIXTURE_STREAM_NON_PROTOCOL_FENCE,
  FIXTURE_STREAM_SPLIT_CHUNKS,
  FIXTURE_STREAM_TWO_BLOCKS,
  FIXTURE_STREAM_UPPERCASE_JSON,
  FIXTURE_WAIT_FOR_QUEUES_CONTENT_IDS,
  FIXTURE_WAIT_FOR_QUEUES_DRAIN,
  FIXTURE_WAIT_FOR_QUEUES_IDLE,
} from "./fixtures/index.js";
import {
  ProtocolActionSchema,
  ProtocolAppActionSchema,
  ProtocolChatActionableCardFieldSchema,
  ProtocolChatActionableCardItemSchema,
  ProtocolCanvasActionSchema,
  ProtocolCanvasContentSchema,
  ProtocolChatActionSchema,
  ProtocolChatContentSchema,
  ProtocolChatMessageSchema,
} from "./schemas/index.js";
import {
  DEFAULT_PARSER_CONFIG,
  ProtocolContentConsolidator_Class,
  ProtocolStreamParser_Class,
  ProtocolStreamParser_ContentParser,
  ProtocolStreamParser_SummaryGenerator,
  ProtocolStreamParser_extractCallToAction,
  ProtocolStreamParser_extractStreamPartsFromSegments,
  createProtocolDebugBlockFilter,
  extractConsolidatedMessageContents,
  extractProtocolFencedJsonBlocksIncremental,
  extractProtocolStreamSegmentsFromMarkdown,
  filterDebugProtocolBlocks,
  parseStreamOutput,
  stripMarkdown,
  writeProtocolFencedJsonBlock,
} from "./stream/index.js";
import {
  isProtocolActionLoose,
  isProtocolChatMessageLoose,
  isProtocolChooseActionableCardActionLoose,
  isProtocolCoreConsoleActionLoose,
  isProtocolPanelUpdateActionLoose,
  isProtocolRuntimeChatMessageLoose,
  parseProtocolActionStrict,
  parseProtocolMessageStrict,
} from "./validators/index.js";
import {
  APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT,
  APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS,
  CommunicationProtocol_validatestring,
  type CommunicationProtocol_ChatMessage,
} from "./types/index.js";
import {
  DEFAULT_CONTENT_QUEUE,
  RuntimeChat_compileActionToCommands,
  RuntimeChat_compileContentItemToCommands,
  RuntimeChat_createGeneratedContentId,
  RuntimeChat_extractImageUrlsFromPendingMessages,
  RuntimeChat_getContentSummary,
  RuntimeChat_groupPendingMessagesByImageContent,
  RuntimeChat_normalizeMessageContentIds,
  SEND_ERROR_STATE_KIND_STILL_PROCESSING,
  type RuntimeChatMessageWithOptionalContentIds,
  type RuntimeChatPendingMessageLike,
  type SendErrorState,
} from "./runtime/chat/index.js";
import {
  getRuntimeQueueWaitProcessedCount,
  isRuntimeQueueWaitComplete,
  normalizeRuntimeQueueContentDelay,
  normalizeRuntimeQueueWaitRequest,
  partitionRuntimeQueueItemsByQueue,
} from "./runtime/queue/index.js";
import { RuntimeCanvas_compileActionToCommand } from "./runtime/canvas/index.js";
import {
  APP_ACTION_TYPES,
  CHAT_CONTENT_TYPES,
  PROTOCOL_APP_ACTION_TYPES,
  PROTOCOL_CHAT_CONTENT_TYPES,
} from "./wire/index.js";

describe("schemas", () => {
  it("accepts minimal chat message", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_MINIMAL_CHAT_MESSAGE,
    );
    expect(result.success).toBe(true);
  });

  it("accepts debug message", () => {
    const result = ProtocolChatMessageSchema.safeParse(FIXTURE_DEBUG_MESSAGE);
    expect(result.success).toBe(true);
  });

  it("accepts non-debug message", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_NON_DEBUG_MESSAGE,
    );
    expect(result.success).toBe(true);
  });

  it("accepts representative action targets", () => {
    const actions = [
      FIXTURE_WAIT_FOR_QUEUES_DRAIN,
      FIXTURE_WAIT_FOR_QUEUES_IDLE,
      FIXTURE_WAIT_FOR_QUEUES_CONTENT_IDS,
      FIXTURE_CANVAS_OPEN,
      FIXTURE_CANVAS_UPDATE_SET,
      FIXTURE_CANVAS_UPDATE_APPEND,
      FIXTURE_CANVAS_UPDATE_MODIFY,
      FIXTURE_CANVAS_CLOSE,
      FIXTURE_APP_ACTION_CORE_CONSOLE,
      FIXTURE_APP_ACTION_SET_THEME,
      FIXTURE_APP_ACTION_SET_SEND_ERROR,
    ];

    for (const action of actions) {
      expect(ProtocolActionSchema.safeParse(action).success).toBe(true);
    }
  });

  it("deep-validates representative canvas content payloads", () => {
    const contents = [
      FIXTURE_CANVAS_CONTENT_HTML,
      FIXTURE_CANVAS_CONTENT_MARKDOWN,
      FIXTURE_CANVAS_CONTENT_SECTION,
    ];

    for (const content of contents) {
      expect(ProtocolCanvasContentSchema.safeParse(content).success).toBe(true);
    }
  });

  it("deep-validates representative canvas action payloads", () => {
    const actions = [
      FIXTURE_CANVAS_OPEN,
      FIXTURE_CANVAS_UPDATE_SET,
      FIXTURE_CANVAS_UPDATE_APPEND,
      FIXTURE_CANVAS_UPDATE_MODIFY,
      FIXTURE_CANVAS_CLOSE,
    ];

    for (const action of actions) {
      expect(ProtocolCanvasActionSchema.safeParse(action).success).toBe(true);
    }
  });

  it("rejects canvas actions whose payload target is not CANVAS", () => {
    const result = ProtocolCanvasActionSchema.safeParse({
      action_id: "fixture-action-invalid-canvas-target-001",
      action_type: "CANVAS_ACTION_OPEN",
      action_data: {
        target: "CHAT",
        canvas_id: "fixture-canvas-001",
      },
    });

    expect(result.success).toBe(false);
  });

  it("deep-validates chat action wrapper content payloads", () => {
    const result = ProtocolChatContentSchema.safeParse({
      content_id: "fixture-action-wrapper-001",
      content_type: "CHAT_CONTENT_ACTION_WRAPPER",
      content_queue: "main",
      content_data: {
        action: {
          action_id: "fixture-app-wait-for-user-input-001",
          action_type: "APP_ACTION_WAIT_FOR_USER_INPUT",
          action_data: {
            target: "APP",
            focus_target: "CHAT_INPUT",
          },
        },
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects chat actions whose payload target is not CHAT", () => {
    const result = ProtocolChatActionSchema.safeParse({
      action_id: "fixture-invalid-chat-target-001",
      action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
      action_data: {
        target: "APP",
        queue_names: ["main"],
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects app theme actions without canonical theme_name", () => {
    const result = ProtocolAppActionSchema.safeParse({
      action_id: "fixture-invalid-theme-001",
      action_type: "APP_ACTION_SET_THEME",
      action_data: {
        target: "APP",
        theme: "dark",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects canvas markdown content without markdown source", () => {
    const result = ProtocolCanvasContentSchema.safeParse({
      content_id: "fixture-canvas-invalid-markdown-001",
      content_type: "CANVAS_CONTENT_MARKDOWN",
      content_data: {
        markdown_style: "DEFAULT",
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty message_contents", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_INVALID_EMPTY_CONTENTS,
    );
    expect(result.success).toBe(false);
  });

  it("rejects SYSTEM role", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_INVALID_SYSTEM_ROLE,
    );
    expect(result.success).toBe(false);
  });

  it("rejects non-CHAT target", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_INVALID_TARGET_CANVAS,
    );
    expect(result.success).toBe(false);
  });

  it("rejects APP message target", () => {
    const result = ProtocolChatMessageSchema.safeParse(
      FIXTURE_INVALID_TARGET_APP,
    );
    expect(result.success).toBe(false);
  });
});

describe("actionable card typed fields", () => {
  const chooseAction = {
    action_id: "msg-cards-select-plan-a",
    action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
    action_data: {
      target: "CHAT",
      actionable_cards_content_id: "msg-cards-plans",
      selected_card_value: "plan-a",
      selected_card_title: "Sample Plan A",
    },
  };
  const baseCard = {
    card_title: "Sample Plan A",
    card_subtitle: "Short summary",
    card_value: "plan-a",
    card_actions: [chooseAction],
  };
  const cardsContent = (...cards: unknown[]) => ({
    content_id: "msg-cards-plans",
    content_type: "CHAT_CONTENT_ACTIONABLE_CARDS",
    content_queue: "main",
    content_data: {
      actionable_cards_selection_mode: "SINGLE",
      actionable_cards_selection_state: "PENDING_SELECTION",
      actionable_cards_items: cards,
    },
  });
  const cardsMessage = (...cards: unknown[]) => ({
    message_id: "msg-cards",
    message_type: "CHAT_MESSAGE",
    message_role: "ASSISTANT",
    message_target: "CHAT",
    message_contents: [cardsContent(...cards)],
  });
  const parseCard = (card: unknown) => ProtocolChatActionableCardItemSchema.safeParse(card);
  const issuePaths = (card: unknown): string[] => {
    const result = parseCard(card);
    return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
  };

  it("accepts card_body as a string and keeps it apart from card_subtitle", () => {
    const result = parseCard({ ...baseCard, card_body: "A longer description." });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.card_body).toBe("A longer description.");
    expect(result.data.card_subtitle).toBe("Short summary");
    expect(parseCard({ ...baseCard, card_body: "" }).success).toBe(true);
  });

  it("accepts card_fields as an array of label and value strings", () => {
    const fields = [
      { label: "Duration", value: "2 weeks" },
      { label: "Effort", value: "" },
    ];
    const result = parseCard({ ...baseCard, card_fields: fields });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.card_fields).toEqual(fields);
    expect(parseCard({ ...baseCard, card_fields: [] }).success).toBe(true);
    expect(ProtocolChatActionableCardFieldSchema.safeParse(fields[0]).success).toBe(true);
  });

  it("accepts card_action_id as a non-empty string", () => {
    const result = parseCard({ ...baseCard, card_action_id: "follow-up-plan-a" });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.card_action_id).toBe("follow-up-plan-a");
  });

  it("rejects card_body values that are not strings", () => {
    for (const card_body of [42, null, ["text"], { text: "x" }, true]) {
      expect(issuePaths({ ...baseCard, card_body })).toEqual(["card_body"]);
    }
  });

  it("rejects card_fields values that are not arrays of label and value strings", () => {
    for (const card_fields of ["Duration: 2 weeks", null, 7, { label: "Duration", value: "2 weeks" }]) {
      expect(issuePaths({ ...baseCard, card_fields })).toEqual(["card_fields"]);
    }
    expect(issuePaths({ ...baseCard, card_fields: ["Duration"] })).toEqual(["card_fields.0"]);
    expect(issuePaths({ ...baseCard, card_fields: [null] })).toEqual(["card_fields.0"]);
    expect(issuePaths({ ...baseCard, card_fields: [{ label: "Duration" }] })).toEqual([
      "card_fields.0.value",
    ]);
    expect(issuePaths({ ...baseCard, card_fields: [{ value: "2 weeks" }] })).toEqual([
      "card_fields.0.label",
    ]);
    expect(
      issuePaths({
        ...baseCard,
        card_fields: [
          { label: "Duration", value: "2 weeks" },
          { label: 1, value: 2 },
        ],
      }),
    ).toEqual(["card_fields.1.label", "card_fields.1.value"]);
  });

  it("rejects card_action_id values that are empty or not strings", () => {
    for (const card_action_id of ["", 12, null, ["follow-up"], { id: "follow-up" }]) {
      expect(issuePaths({ ...baseCard, card_action_id })).toEqual(["card_action_id"]);
    }
  });

  it("rejects invalid typed card fields through content, message, and strict validators", () => {
    const invalidCards = [
      { ...baseCard, card_body: 42 },
      { ...baseCard, card_fields: [{ label: "Duration" }] },
      { ...baseCard, card_action_id: "" },
    ];
    for (const card of invalidCards) {
      expect(ProtocolChatContentSchema.safeParse(cardsContent(card)).success).toBe(false);
      expect(ProtocolChatMessageSchema.safeParse(cardsMessage(card)).success).toBe(false);
      expect(parseProtocolMessageStrict(cardsMessage(card)).success).toBe(false);
    }
    expect(parseProtocolMessageStrict(FIXTURE_INVALID_CARD_ACTION_ID_EMPTY).success).toBe(false);
  });

  it("preserves card_fields order through parse and serialize", () => {
    const labels = ["Zulu", "Alpha", "Mike", "Alpha", "Bravo"];
    const card = {
      ...baseCard,
      card_fields: labels.map((label, index) => ({ label, value: `value-${index}` })),
    };
    const readLabels = (message: unknown): string[] => {
      const parsed = parseProtocolMessageStrict(message);
      if (!parsed.success) throw new Error("expected a valid message");
      const items = parsed.data.message_contents[0]?.content_data["actionable_cards_items"];
      const fields = (items as Array<{ card_fields: Array<{ label: string; value: string }> }>)[0]
        ?.card_fields;
      return (fields ?? []).map((field) => `${field.label}=${field.value}`);
    };
    const expected = labels.map((label, index) => `${label}=value-${index}`);

    const parsed = parseProtocolMessageStrict(cardsMessage(card));
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(readLabels(parsed.data)).toEqual(expected);

    const block = writeProtocolFencedJsonBlock(parsed.data);
    const extracted = extractProtocolFencedJsonBlocksIncremental(block, 0);
    expect(extracted.blocks).toHaveLength(1);
    expect(readLabels(extracted.blocks[0]?.json)).toEqual(expected);
    expect(readLabels(JSON.parse(JSON.stringify(parsed.data)))).toEqual(expected);
  });

  it("leaves a card with none of the typed fields unchanged", () => {
    const result = parseCard(baseCard);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual(baseCard);
    expect(Object.keys(result.data).sort()).toEqual(
      ["card_actions", "card_subtitle", "card_title", "card_value"].sort(),
    );

    const message = parseProtocolMessageStrict(cardsMessage(baseCard));
    expect(message.success).toBe(true);
    if (!message.success) return;
    expect(message.data).toEqual(cardsMessage(baseCard));
  });

  it("still accepts a display-only card with an empty action list and no subtitle", () => {
    const card = { card_title: "Sample Note", card_value: "note", card_actions: [] };
    const result = parseCard(card);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual(card);
  });

  it("still passes unknown card and field keys through", () => {
    const card = {
      ...baseCard,
      card_body: "A longer description.",
      card_fields: [{ label: "Duration", value: "2 weeks", sample_field_hint: "calendar" }],
      card_action_id: "follow-up-plan-a",
      sample_card_extra: { nested: [1, 2, 3] },
      card_style: "PRIMARY",
    };
    const result = parseCard(card);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual(card);

    const message = parseProtocolMessageStrict(cardsMessage(card));
    expect(message.success).toBe(true);
    if (!message.success) return;
    expect(message.data).toEqual(cardsMessage(card));
  });

  it("does not check card_action_id against card_actions", () => {
    // The schema validates each field alone; consistency between them is a producer rule.
    expect(parseCard({ ...baseCard, card_actions: [], card_action_id: "follow-up-plan-a" }).success).toBe(
      true,
    );
    expect(parseCard(baseCard).success).toBe(true);
  });

  it("validates the typed card fields fixture", () => {
    const result = parseProtocolMessageStrict(FIXTURE_ACTIONABLE_CARDS_TYPED_FIELDS_MESSAGE);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual(FIXTURE_ACTIONABLE_CARDS_TYPED_FIELDS_MESSAGE);
  });

  it("builds cards with the typed fields only when they are given", () => {
    const fields = [
      { label: "Duration", value: "2 weeks" },
      { label: "Effort", value: "Low" },
    ];
    const content = new CommunicationProtocol_ActionableCardsContentBuilder({
      content_queue: "main",
      content_id_suffix: "plans",
      message_id: "msg-cards",
    })
      .addCard({
        title: "Sample Plan A",
        subtitle: "Short summary",
        body: "A longer description.",
        fields,
        action_id: "follow-up-plan-a",
        value: "plan-a",
      })
      .addCard({ title: "Sample Plan B", subtitle: "Short summary", value: "plan-b" })
      .build();

    const items = content.content_data["actionable_cards_items"] as Array<Record<string, unknown>>;
    expect(items[0]).toMatchObject({
      card_subtitle: "Short summary",
      card_body: "A longer description.",
      card_fields: fields,
      card_action_id: "follow-up-plan-a",
    });
    expect(items[0]?.["card_fields"]).not.toBe(fields);
    expect((items[0]?.["card_actions"] as unknown[]).length).toBe(1);
    expect(Object.keys(items[1] ?? {}).sort()).toEqual(
      ["card_actions", "card_subtitle", "card_title", "card_value"].sort(),
    );
    expect(ProtocolChatContentSchema.safeParse(content).success).toBe(true);
  });

  it("refuses to build a card with an empty action_id", () => {
    const builder = new CommunicationProtocol_ActionableCardsContentBuilder({
      content_queue: "main",
      content_id_suffix: "plans",
      message_id: "msg-cards",
    });
    expect(() =>
      builder.addCard({ title: "Sample Plan A", subtitle: "Short", value: "plan-a", action_id: "" }),
    ).toThrow("non-empty");
    expect(builder.getCardCount()).toBe(0);
  });
});

describe("runtime chat command compilers", () => {
  it("compiles send-text actions into synthetic user content and send commands", () => {
    const commands = RuntimeChat_compileActionToCommands({
      action: {
        action_id: "send-1",
        action_type: "CHAT_ACTION_SEND_TEXT_MESSAGE",
        action_data: {
          target: "CHAT",
          role: "USER",
          text: "Hello",
        },
      },
      defaultContentQueue: DEFAULT_CONTENT_QUEUE,
      createSyntheticContentId: ({ reason }) => `${reason}:1`,
    });

    expect(commands).toHaveLength(2);
    expect(commands[0]?.type).toBe("RUNTIME_CHAT_ACTION_COMMAND_ADD_MESSAGE");
    expect(commands[0]).toMatchObject({
      role: "USER",
      contentItems: [
        {
          content_id:
            "RUNTIME_CHAT_SYNTHETIC_CONTENT_ID_REASON_SEND_TEXT_MESSAGE:1",
          content_type: "CHAT_CONTENT_MARKDOWN",
          content_queue: "main",
          content_data: { markdown: "Hello" },
        },
      ],
    });
    expect(commands[1]?.type).toBe("RUNTIME_CHAT_ACTION_COMMAND_SEND_MESSAGE");
    expect(commands[1]).toMatchObject({ message: "Hello" });
  });

  it("compiles app send-error actions into runtime send-error commands", () => {
    const commands = RuntimeChat_compileActionToCommands({
      action: {
        action_id: "send-error-1",
        action_type: "APP_ACTION_SET_SEND_ERROR",
        action_data: {
          target: "APP",
          error_kind: APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT,
          message: "Timed out",
        },
      },
      defaultContentQueue: DEFAULT_CONTENT_QUEUE,
      createSyntheticContentId: ({ reason }) => reason,
    });

    expect(commands).toEqual([
      {
        type: "RUNTIME_CHAT_ACTION_COMMAND_SET_SEND_ERROR",
        sendError: {
          kind: APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT,
          message: "Timed out",
          recoveryHints: [],
          source: "SEND_ERROR_STATE_SOURCE_PROTOCOL",
        },
      },
    ]);
  });

  it("compiles action-wrapper content into a process-action command", () => {
    const commands = RuntimeChat_compileContentItemToCommands({
      content_id: "wrapper-1",
      content_type: "CHAT_CONTENT_ACTION_WRAPPER",
      content_queue: DEFAULT_CONTENT_QUEUE,
      content_data: {
        action: {
          action_id: "wait-1",
          action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
          action_data: {
            target: "CHAT",
            queue_names: ["side-panel"],
          },
        },
      },
    });

    expect(commands).toHaveLength(1);
    expect(commands[0]?.type).toBe(
      "RUNTIME_CHAT_CONTENT_COMMAND_PROCESS_ACTION",
    );
    expect(commands[0]).toMatchObject({
      action: {
        action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
      },
    });
  });
});

describe("validators", () => {
  it("strict parse accepts valid message", () => {
    const result = parseProtocolMessageStrict(FIXTURE_MINIMAL_CHAT_MESSAGE);
    expect(result.success).toBe(true);
  });

  it("strict parse rejects invalid message", () => {
    const result = parseProtocolMessageStrict(FIXTURE_INVALID_EMPTY_CONTENTS);
    expect(result.success).toBe(false);
  });

  it("strict parse rejects unknown action target", () => {
    const result = parseProtocolActionStrict(
      FIXTURE_INVALID_UNKNOWN_TARGET_ACTION,
    );
    expect(result.success).toBe(false);
  });

  it("loose guards accept aggregate protocol actions but reject unknown targets", () => {
    expect(isProtocolChatMessageLoose(FIXTURE_MINIMAL_CHAT_MESSAGE)).toBe(true);
    expect(isProtocolChatMessageLoose(FIXTURE_INVALID_EMPTY_CONTENTS)).toBe(
      true,
    );
    expect(isProtocolActionLoose(FIXTURE_WAIT_FOR_QUEUES_DRAIN)).toBe(true);
    expect(isProtocolActionLoose(FIXTURE_CANVAS_OPEN)).toBe(true);
    expect(isProtocolActionLoose(FIXTURE_APP_ACTION_CORE_CONSOLE)).toBe(true);
    expect(isProtocolActionLoose(FIXTURE_INVALID_UNKNOWN_TARGET)).toBe(false);
  });

  it("runtime chat message guard keeps stream envelopes on the CHAT target", () => {
    expect(
      isProtocolRuntimeChatMessageLoose(FIXTURE_MINIMAL_CHAT_MESSAGE),
    ).toBe(true);
    expect(
      isProtocolRuntimeChatMessageLoose(FIXTURE_INVALID_EMPTY_CONTENTS),
    ).toBe(true);
    expect(isProtocolRuntimeChatMessageLoose(FIXTURE_INVALID_SYSTEM_ROLE)).toBe(
      false,
    );
    expect(
      isProtocolRuntimeChatMessageLoose(FIXTURE_INVALID_TARGET_CANVAS),
    ).toBe(false);
    expect(isProtocolRuntimeChatMessageLoose(FIXTURE_INVALID_TARGET_APP)).toBe(
      false,
    );
  });

  it("loose panel update guard validates the panel target id", () => {
    expect(
      isProtocolPanelUpdateActionLoose({
        action_id: "fixture-panel-update-001",
        action_type: "CHAT_ACTION_UPDATE_PANEL",
        action_data: {
          target: "CHAT",
          panel_content_id: "fixture-panel-content-001",
        },
      }),
    ).toBe(true);
    expect(
      isProtocolPanelUpdateActionLoose({
        action_id: "fixture-panel-update-002",
        action_type: "CHAT_ACTION_UPDATE_PANEL",
        action_data: { target: "CHAT" },
      }),
    ).toBe(false);
  });

  it("loose action-specific guards narrow actionable-card and core-console actions", () => {
    expect(
      isProtocolChooseActionableCardActionLoose({
        action_id: "fixture-card-action-001",
        action_type: "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD",
        action_data: {
          target: "CHAT",
          actionable_cards_content_id: "fixture-cards-001",
          selected_card_value: "fixture-card-value",
          selected_card_title: "Fixture Card",
          simulated_user_message_text: "Choose Fixture Card",
        },
      }),
    ).toBe(true);
    expect(
      isProtocolCoreConsoleActionLoose(FIXTURE_APP_ACTION_CORE_CONSOLE),
    ).toBe(true);
    expect(isProtocolCoreConsoleActionLoose(FIXTURE_APP_ACTION_SET_THEME)).toBe(
      false,
    );
  });
});

describe("protocol id utilities", () => {
  it("generates and resolves protocol IDs", () => {
    const messageId = ProtocolIdUtils.generateMessageId("msg");
    const contentId = ProtocolIdUtils.resolveContentId({
      message_id: messageId,
      content_id_suffix: "markdown",
    });
    const actionId = ProtocolIdUtils.resolveActionId({
      message_id: messageId,
      content_id_suffix: "send",
    });

    expect(messageId).toMatch(/^msg-/);
    expect(contentId).toMatch(
      new RegExp(`^${messageId}-content-markdown-[a-f0-9]{8}$`),
    );
    expect(actionId).toMatch(
      new RegExp(`^${messageId}-action-send-[a-f0-9]{8}$`),
    );
  });

  it("validates the basic chat message envelope shape", () => {
    expect(ProtocolIdUtils.validateMessage(FIXTURE_MINIMAL_CHAT_MESSAGE)).toBe(
      true,
    );
    expect(
      ProtocolIdUtils.validateMessage({
        ...FIXTURE_MINIMAL_CHAT_MESSAGE,
        message_target: "CANVAS",
      }),
    ).toBe(false);
  });

  it("manages reusable protocol id sequences", () => {
    const manager = new ProtocolIdUtils_SequenceManager({
      baseMessageId: "message-1",
      initialSuffix: "pipeline",
    });

    expect(manager.getCurrentMessageId()).toBe("message-1-pipeline");
    expect(manager.startNewSequence("analysis")).toBe("message-1-analysis-1");
    expect(manager.makeContentId("progress")).toBe(
      "message-1-analysis-1-progress",
    );
    expect(manager.makeActionId("update")).toBe("message-1-analysis-1-update");
    expect(manager.getSequenceCount()).toBe(1);

    manager.reset();
    expect(manager.getCurrentMessageId()).toBe("message-1");
    expect(manager.getSequenceCount()).toBe(0);
  });
});

describe("protocol builders", () => {
  it("builds markdown content and composed chat messages through package-owned builders", () => {
    const markdown = new CommunicationProtocol_MarkdownContentBuilder({
      content_queue: "main",
      content_id_suffix: "intro",
      markdown: "# Hello",
      message_id: "msg-builder-test",
    }).build();

    const message = new CommunicationProtocol_ChatMessageBuilder({
      message_id: "msg-builder-test",
      message_role: "ASSISTANT",
    })
      .addContent(markdown)
      .contentDelayLastContent(250)
      .build();

    expect(markdown.content_type).toBe("CHAT_CONTENT_MARKDOWN");
    expect(message.message_contents).toHaveLength(1);
    expect(message.message_contents[0]?.content_delay).toBe(250);
  });

  it("exposes the static communication protocol builder facade", () => {
    const message = CommunicationProtocol_Builder.createMarkdownMessage(
      "msg-facade-test",
      "Hello from facade",
      "main",
    );
    const block = CommunicationProtocol_Builder.toJsonBlock(message);

    expect(message.message_contents[0]?.content_type).toBe(
      "CHAT_CONTENT_MARKDOWN",
    );
    expect(block).toContain("```json");
    expect(block).toContain("msg-facade-test");
  });
});

describe("wire constants", () => {
  it("exports object maps and tuple families from the same protocol token set", () => {
    expect(CHAT_CONTENT_TYPES.CHAT_CONTENT_MARKDOWN).toBe(
      "CHAT_CONTENT_MARKDOWN",
    );
    expect(PROTOCOL_CHAT_CONTENT_TYPES).toContain(
      CHAT_CONTENT_TYPES.CHAT_CONTENT_MARKDOWN,
    );
    expect(APP_ACTION_TYPES.APP_ACTION_SET_SEND_ERROR).toBe(
      "APP_ACTION_SET_SEND_ERROR",
    );
    expect(PROTOCOL_APP_ACTION_TYPES).toContain(
      APP_ACTION_TYPES.APP_ACTION_SET_SEND_ERROR,
    );
  });
});

describe("protocol types", () => {
  it("exports the legacy core protocol type surface from the package", () => {
    const message: CommunicationProtocol_ChatMessage = {
      message_id: "msg-type-export-test",
      message_type: "CHAT_MESSAGE",
      message_role: "ASSISTANT",
      message_target: "CHAT",
      message_contents: [],
    };

    expect(message.message_type).toBe("CHAT_MESSAGE");
    expect(
      CommunicationProtocol_validatestring({
        contentQueue: "main",
        context: "protocol-types-test",
      }),
    ).toBe("main");
  });

  it("exports protocol send-error kinds separately from runtime-only state kinds", () => {
    expect(APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS).toContain(
      APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KIND_TIMEOUT,
    );
    expect(APP_SET_SEND_ERROR_ACTION_DATA_ERROR_KINDS).not.toContain(
      SEND_ERROR_STATE_KIND_STILL_PROCESSING,
    );

    const runtimeState: SendErrorState = {
      kind: SEND_ERROR_STATE_KIND_STILL_PROCESSING,
      message: "Still processing.",
      recoveryHints: [],
      source: "SEND_ERROR_STATE_SOURCE_TRANSPORT",
    };

    expect(runtimeState.kind).toBe(SEND_ERROR_STATE_KIND_STILL_PROCESSING);
  });
});

describe("canvas content builders", () => {
  it("builds product-agnostic canvas content payloads with opaque extension metadata", () => {
    const htmlContent = buildProtocolCanvasHtmlContent({
      content_id: "canvas-html-1",
      html: "<section>Rendered externally</section>",
      toc_label: "Rendered",
      toc_key: "rendered-section",
      section_data: { external: true },
    });
    const markdownContent = buildProtocolCanvasMarkdownContent({
      content_id: "canvas-markdown-1",
      markdown: "## Notes",
      markdown_style: "COMPACT",
    });
    const sectionContent = buildProtocolCanvasSectionContent({
      content_id: "canvas-section-1",
      sectionTitle: "Grouped",
      sectionCollapsed: false,
      sectionContents: [htmlContent, markdownContent],
    });

    expect(htmlContent.content_type).toBe("CANVAS_CONTENT_HTML");
    expect(htmlContent.content_data.toc_key).toBe("rendered-section");
    expect(markdownContent.content_data.markdown_style).toBe("COMPACT");
    expect(sectionContent.content_data.section_contents).toHaveLength(2);
  });
});

describe("animation", () => {
  it("validates package-owned triggers, animation types, and panel icons", () => {
    const trigger = ANIMATION_TRIGGERS.PANEL_BODY_VISIBILITY_VISIBLE;
    const triggerResult =
      CommunicationProtocol_Animation_validateTrigger(trigger);
    const typeResult = CommunicationProtocol_Animation_validateType(
      PANEL_ANIMATION_TYPES.ZOOM_IN,
    );

    expect(triggerResult.isValid).toBe(true);
    expect(typeResult.isValid).toBe(true);
    expect(isOpeningTrigger(trigger)).toBe(true);
    expect(
      PanelHeaderIcons_isPredefinedPanelHeaderIcon("panel-icon-chatgpt"),
    ).toBe(true);
  });

  it("rejects unknown animation tokens", () => {
    const triggerResult = CommunicationProtocol_Animation_validateTrigger(
      "ANIMATION_TRIGGER_FAKE",
    );
    const typeResult = CommunicationProtocol_Animation_validateType(
      "ANIMATION_TYPE_FAKE",
    );

    expect(triggerResult.isValid).toBe(false);
    expect(typeResult.isValid).toBe(false);
  });
});

describe("runtime chat helpers", () => {
  it("creates deterministic fallback content ids", () => {
    expect(
      RuntimeChat_createGeneratedContentId({
        messageId: "message-1",
        contentIndex: 2,
      }),
    ).toBe("runtime-chat-content-generated-id-message-1-2");
    expect(
      RuntimeChat_createGeneratedContentId({
        messageId: "message-1",
        contentIndex: 2,
        uniqueSuffix: "slot-a",
      }),
    ).toBe("runtime-chat-content-generated-id-message-1-2-slot-a");
  });

  it("normalizes missing runtime chat content ids without mutating existing content", () => {
    const message: RuntimeChatMessageWithOptionalContentIds = {
      message_id: "message-1",
      message_type: "CHAT_MESSAGE",
      message_role: "ASSISTANT",
      message_target: "CHAT",
      message_contents: [
        {
          content_type: "CHAT_CONTENT_MARKDOWN",
          content_queue: "main",
          content_data: { markdown: "Hello" },
        },
        {
          content_id: "existing-content",
          content_type: "CHAT_CONTENT_MARKDOWN",
          content_queue: "main",
          content_data: { markdown: "World" },
        },
      ],
    };

    const normalized = RuntimeChat_normalizeMessageContentIds(message);

    expect(normalized).not.toBe(message);
    expect(normalized.message_contents[0].content_id).toBe(
      "runtime-chat-content-generated-id-message-1-0",
    );
    expect(normalized.message_contents[1].content_id).toBe("existing-content");
  });

  it("returns the same runtime chat message reference when all content ids exist", () => {
    const message: RuntimeChatMessageWithOptionalContentIds = {
      message_id: "message-1",
      message_type: "CHAT_MESSAGE",
      message_role: "ASSISTANT",
      message_target: "CHAT",
      message_contents: [
        {
          content_id: "existing-content",
          content_type: "CHAT_CONTENT_MARKDOWN",
          content_queue: "main",
          content_data: { markdown: "Hello" },
        },
      ],
    };

    expect(RuntimeChat_normalizeMessageContentIds(message)).toBe(message);
  });

  it("extracts deduplicated image URLs from panel content and update-panel action wrappers", () => {
    const messages: RuntimeChatPendingMessageLike[] = [
      {
        message: {
          message_id: "message-with-images",
          message_type: "CHAT_MESSAGE",
          message_role: "ASSISTANT",
          message_target: "CHAT",
          message_contents: [
            {
              content_id: "image-panel",
              content_type: "CHAT_CONTENT_PANEL",
              content_queue: DEFAULT_CONTENT_QUEUE,
              content_data: {
                panel_body_type: "PANEL_BODY_IMAGE",
                panel_body_data: {
                  image_url: "https://example.test/image.png",
                  image_alt_text: "Example image",
                  image_gravity: "IMAGE_GRAVITY_CENTER",
                  image_sizing: "IMAGE_SIZING_COVER",
                  image_animation_type: "IMAGE_ANIMATION_NONE",
                  image_animation_framer_motion_attributes: {
                    delay: 0,
                    duration: 0,
                    ease: "linear",
                  },
                },
              },
            },
            {
              content_id: "image-update-wrapper",
              content_type: "CHAT_CONTENT_ACTION_WRAPPER",
              content_queue: DEFAULT_CONTENT_QUEUE,
              content_data: {
                action: {
                  action_id: "image-update",
                  action_type: "CHAT_ACTION_UPDATE_PANEL",
                  action_data: {
                    target: "CHAT",
                    panel_content_id: "image-panel",
                    panel_body_type: "PANEL_BODY_IMAGE",
                    panel_body_data: {
                      image_url: "https://example.test/image.png",
                      image_alt_text: "Updated image",
                      image_gravity: "IMAGE_GRAVITY_CENTER",
                      image_sizing: "IMAGE_SIZING_COVER",
                      image_animation_type: "IMAGE_ANIMATION_NONE",
                      image_animation_framer_motion_attributes: {
                        delay: 0,
                        duration: 0,
                        ease: "linear",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ];

    expect(RuntimeChat_extractImageUrlsFromPendingMessages(messages)).toEqual([
      "https://example.test/image.png",
    ]);
  });

  it("groups pending messages by protocol image content", () => {
    const withImage: RuntimeChatPendingMessageLike = {
      message: {
        message_id: "with-image",
        message_type: "CHAT_MESSAGE",
        message_role: "ASSISTANT",
        message_target: "CHAT",
        message_contents: [
          {
            content_id: "image-panel",
            content_type: "CHAT_CONTENT_PANEL",
            content_queue: DEFAULT_CONTENT_QUEUE,
            content_data: {
              panel_body_type: "PANEL_BODY_IMAGE",
              panel_body_data: {
                image_url: "https://example.test/image.png",
                image_alt_text: "Example image",
                image_gravity: "IMAGE_GRAVITY_CENTER",
                image_sizing: "IMAGE_SIZING_COVER",
                image_animation_type: "IMAGE_ANIMATION_NONE",
                image_animation_framer_motion_attributes: {
                  delay: 0,
                  duration: 0,
                  ease: "linear",
                },
              },
            },
          },
        ],
      },
    };
    const withoutImage: RuntimeChatPendingMessageLike = {
      message: {
        message_id: "without-image",
        message_type: "CHAT_MESSAGE",
        message_role: "ASSISTANT",
        message_target: "CHAT",
        message_contents: [
          {
            content_id: "markdown",
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_queue: DEFAULT_CONTENT_QUEUE,
            content_data: { markdown: "No image here" },
          },
        ],
      },
    };

    expect(
      RuntimeChat_groupPendingMessagesByImageContent([withImage, withoutImage]),
    ).toEqual({
      withImages: [withImage],
      withoutImages: [withoutImage],
    });
  });

  it("summarizes protocol content for runtime debug traces", () => {
    expect(
      RuntimeChat_getContentSummary({
        content_id: "progress",
        content_type: "CHAT_CONTENT_PROGRESS_BAR",
        content_queue: DEFAULT_CONTENT_QUEUE,
        content_data: {
          progress_bar_current_percentage: 75,
          progress_bar_message: "Collecting evidence from protocol streams",
          progress_bar_state: "IN_PROGRESS",
        },
      }),
    ).toBe('⏳ 75% "Collecting evidence from protocol strea…"');

    expect(
      RuntimeChat_getContentSummary({
        content_id: "action-wrapper",
        content_type: "CHAT_CONTENT_ACTION_WRAPPER",
        content_queue: DEFAULT_CONTENT_QUEUE,
        content_data: {
          action: {
            action_id: "wait",
            action_type: "CHAT_ACTION_WAIT_FOR_QUEUES",
            action_data: {
              target: "CHAT",
              queue_names: ["research", "summary"],
            },
          },
        },
      }),
    ).toBe("WAIT_FOR_QUEUES [research, summary]");
  });
});

describe("runtime queue helpers", () => {
  it("normalizes WAIT_FOR_QUEUES payloads by skipping the default queue", () => {
    const resolution = normalizeRuntimeQueueWaitRequest({
      actionData: {
        queue_names: ["main", "research"],
      },
      contentItems: [
        { contentId: "content-1", queueName: "research", processed: false },
        { contentId: "content-2", queueName: "main", processed: false },
      ],
    });

    expect(resolution.shouldWait).toBe(true);
    if (!resolution.shouldWait) {
      return;
    }
    expect(resolution.request.queueNames).toEqual(["research"]);
    expect(resolution.request.waitMode).toBe("DRAIN");
    expect(resolution.request.pendingContentIds).toEqual(["content-1"]);
  });

  it("marks DRAIN waits complete only after snapshot ids are processed and queues are idle", () => {
    const resolution = normalizeRuntimeQueueWaitRequest({
      actionData: {
        queue_names: ["research"],
      },
      contentItems: [
        { contentId: "content-1", queueName: "research", processed: false },
      ],
    });

    expect(resolution.shouldWait).toBe(true);
    if (!resolution.shouldWait) {
      return;
    }

    expect(
      isRuntimeQueueWaitComplete({
        request: resolution.request,
        processedContentIds: new Set(["content-1"]),
        activeQueueNames: new Set(["research"]),
      }),
    ).toBe(false);
    expect(
      isRuntimeQueueWaitComplete({
        request: resolution.request,
        processedContentIds: new Set(["content-1"]),
        activeQueueNames: new Set(),
      }),
    ).toBe(true);
  });

  it("uses explicit content_ids for CONTENT_IDS waits", () => {
    const resolution = normalizeRuntimeQueueWaitRequest({
      actionData: {
        queue_names: ["research"],
        wait_mode: "CONTENT_IDS",
        content_ids: ["content-a", "content-b"],
      },
      contentItems: [
        { contentId: "content-other", queueName: "research", processed: false },
      ],
    });

    expect(resolution.shouldWait).toBe(true);
    if (!resolution.shouldWait) {
      return;
    }
    expect(resolution.request.pendingContentIds).toEqual([
      "content-a",
      "content-b",
    ]);
    expect(
      getRuntimeQueueWaitProcessedCount({
        request: resolution.request,
        processedContentIds: new Set(["content-a"]),
      }),
    ).toBe(1);
  });

  it("partitions runtime items into default and named queues", () => {
    const partitioned = partitionRuntimeQueueItemsByQueue({
      items: [
        { id: "a", queueName: "main" },
        { id: "b", queueName: "research" },
        { id: "c", queueName: undefined },
      ],
      getQueueName: (item) => item.queueName,
    });

    expect(partitioned.defaultQueueItems.map((item) => item.id)).toEqual([
      "a",
      "c",
    ]);
    expect(
      partitioned.nonDefaultQueueItemsByName
        .get("research")
        ?.map((item) => item.id),
    ).toEqual(["b"]);
  });

  it("normalizes content_delay decisions without owning UI timers", () => {
    expect(normalizeRuntimeQueueContentDelay({ rawDelay: undefined })).toEqual({
      shouldDelay: false,
      delayMs: null,
      reason: "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_MISSING",
    });
    expect(normalizeRuntimeQueueContentDelay({ rawDelay: 0 })).toMatchObject({
      shouldDelay: false,
      delayMs: null,
      reason: "RUNTIME_QUEUE_CONTENT_DELAY_SKIP_NON_POSITIVE",
    });
    expect(
      normalizeRuntimeQueueContentDelay({
        rawDelay: 61000,
        warningThresholdMs: 60000,
      }),
    ).toMatchObject({
      shouldDelay: true,
      delayMs: 61000,
      isUnusuallyLong: true,
    });
  });
});

describe("runtime canvas helpers", () => {
  it("compiles open and close canvas actions into immediate dispatch commands", () => {
    expect(
      RuntimeCanvas_compileActionToCommand({
        action_id: "open-1",
        action_type: "CANVAS_ACTION_OPEN",
        action_data: {
          canvas_id: "canvas-1",
          canvas_title_label: "Canvas",
        },
      }),
    ).toMatchObject({
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_OPEN",
      payload: {
        canvas_id: "canvas-1",
        canvas_title_label: "Canvas",
      },
    });

    expect(
      RuntimeCanvas_compileActionToCommand({
        action_id: "close-1",
        action_type: "CANVAS_ACTION_CLOSE",
        action_data: {
          canvas_id: "canvas-1",
        },
      }),
    ).toMatchObject({
      type: "RUNTIME_CANVAS_ACTION_COMMAND_DISPATCH_CLOSE",
      canvasId: "canvas-1",
    });
  });

  it("compiles update canvas actions into queued animation-aware commands", () => {
    expect(
      RuntimeCanvas_compileActionToCommand({
        action_id: "update-1",
        action_type: "CANVAS_ACTION_UPDATE",
        action_data: {
          canvas_id: "canvas-1",
          scroll_to_top_after_finish: true,
        },
      }),
    ).toMatchObject({
      type: "RUNTIME_CANVAS_ACTION_COMMAND_QUEUE_UPDATE",
      actionId: "update-1",
      payload: {
        canvas_id: "canvas-1",
        scroll_to_top_after_finish: true,
      },
      shouldWaitForAnimation: true,
      scrollSettleMs: 2600,
    });
  });
});

describe("stream writer", () => {
  it("writes fenced JSON block", () => {
    const block = writeProtocolFencedJsonBlock({
      message_type: "CHAT_MESSAGE",
    });
    expect(block).toContain("```json");
    expect(block).toContain('"message_type": "CHAT_MESSAGE"');
    expect(block).toContain("```");
  });

  it("supports compact mode", () => {
    const block = writeProtocolFencedJsonBlock({ a: 1 }, { compact: true });
    expect(block).toContain('```json\n{"a":1}\n```');
  });
});

describe("stream segment extractor", () => {
  it("extracts lowercase fenced-json protocol blocks and surrounding text", () => {
    const segments = extractProtocolStreamSegmentsFromMarkdown(
      'Before\n```json\n{"message_type":"CHAT_MESSAGE","message_contents":[]}\n```\nAfter',
    );

    expect(segments).toHaveLength(3);
    expect(segments[0]).toEqual({ type: "string", content: "Before" });
    expect(segments[1]).toEqual({
      type: "json",
      content: {
        message_type: "CHAT_MESSAGE",
        message_contents: [],
      },
    });
    expect(segments[2]).toEqual({ type: "string", content: "After" });
  });

  it("ignores non-protocol code fences and uppercase JSON fences", () => {
    const segments = extractProtocolStreamSegmentsFromMarkdown(
      'Visible\n```javascript\n{"message_type":"CHAT_MESSAGE"}\n```\n```JSON\n{"message_type":"CHAT_MESSAGE"}\n```',
    );

    expect(segments).toEqual([{ type: "string", content: "Visible" }]);
  });

  it("recursively extracts protocol blocks inside four-backtick containers", () => {
    const segments = extractProtocolStreamSegmentsFromMarkdown(
      'Outer\n````markdown\nNested\n```json\n{"message_type":"CHAT_MESSAGE"}\n```\n````',
    );

    expect(segments).toHaveLength(2);
    expect(segments[0]).toEqual({ type: "string", content: "Outer" });
    expect(segments[1]?.type).toBe("container");
    if (segments[1]?.type !== "container") {
      return;
    }
    expect(segments[1].content).toEqual([
      { type: "string", content: "Nested" },
      { type: "json", content: { message_type: "CHAT_MESSAGE" } },
    ]);
  });
});

describe("stream summary parser", () => {
  it("strips markdown into readable summary text", () => {
    expect(stripMarkdown("# Hello **world** [link](https://example.com)")).toBe(
      "Hello world link",
    );
  });

  it("extracts chat message and text marker parts from generic segments", () => {
    const result = ProtocolStreamParser_extractStreamPartsFromSegments({
      config: DEFAULT_PARSER_CONFIG,
      segments: [
        {
          type: "json",
          content: FIXTURE_MINIMAL_CHAT_MESSAGE,
        },
        {
          type: "string",
          content: [
            "**ASSISTANT THOUGHT** - analyzing options",
            '"compare choices"',
            "## NEXT ACTION: choose one",
          ].join("\n"),
        },
      ],
    });

    expect(result.messages).toHaveLength(1);
    expect(result.thoughts).toHaveLength(1);
    expect(result.actions).toHaveLength(1);
    expect(result.orderedParts.map((part) => part.type)).toEqual([
      "message",
      "thought",
      "action",
    ]);
  });

  it("keeps product-specific action marker aliases as consumer-provided config", () => {
    const result = ProtocolStreamParser_extractStreamPartsFromSegments({
      config: {
        ...DEFAULT_PARSER_CONFIG,
        actionMarkerLabels: ["NEXT ACTION", "consumerOrchestrator"],
      },
      segments: [
        {
          type: "string",
          content: "## consumerOrchestrator: summarize the current stream",
        },
      ],
    });

    expect(result.actions).toHaveLength(1);
    expect(result.actions[0]?.actionType).toBe("consumerOrchestrator");
  });

  it("generates readable summaries from extracted stream parts", () => {
    const contentParser = new ProtocolStreamParser_ContentParser(
      DEFAULT_PARSER_CONFIG,
    );
    const summaryGenerator = new ProtocolStreamParser_SummaryGenerator(
      DEFAULT_PARSER_CONFIG,
    );
    const extracted = ProtocolStreamParser_extractStreamPartsFromSegments({
      config: DEFAULT_PARSER_CONFIG,
      contentParser,
      segments: [
        {
          type: "json",
          content: FIXTURE_MINIMAL_CHAT_MESSAGE,
        },
      ],
    });

    expect(
      summaryGenerator.generateReadableSummary(extracted.orderedParts),
    ).toContain("Assistant said to user:");
  });

  it.each([
    [
      "MUST say to the user: `Please choose one option.`",
      "Please choose one option.",
    ],
    [
      '[CALL_TO_ACTION: "Please choose one option."]',
      "Please choose one option.",
    ],
    [
      '[THOUGHT_ON_CALL_TO_ACTION: "Please choose one option."]',
      "Please choose one option.",
    ],
    [
      '[FINALIZATION: "Please choose one option."]',
      "Please choose one option.",
    ],
    [
      '[THOUGHT_ON_FINALIZATION: "Please choose one option."]',
      "Please choose one option.",
    ],
    [
      '[ASSISTANT_CLOSING: "Please choose one option."]',
      "Please choose one option.",
    ],
  ])("extracts call-to-action marker from %s", (input, expected) => {
    expect(ProtocolStreamParser_extractCallToAction(input)).toBe(expected);
  });

  it("parses raw markdown stream output through the package-owned parser facade", () => {
    const parser = new ProtocolStreamParser_Class();
    const streamOutput = [
      "MUST say to the user: `Please choose one option.`",
      writeProtocolFencedJsonBlock(FIXTURE_MINIMAL_CHAT_MESSAGE),
    ].join("\n\n");

    const result = parser.parseStreamOutput(streamOutput);

    expect(parser.getCapturedCallToAction()).toBe("Please choose one option.");
    expect(result.capturedCallToAction).toBe("Please choose one option.");
    expect(result.protocolMessages).toHaveLength(1);
    expect(result.summary).toContain("Assistant said to user:");
  });

  it("parses raw markdown stream output through the one-shot helper", () => {
    const result = parseStreamOutput({
      streamOutput: writeProtocolFencedJsonBlock(FIXTURE_MINIMAL_CHAT_MESSAGE),
    });

    expect(result.protocolMessages).toHaveLength(1);
    expect(result.originalLength).toBeGreaterThan(0);
  });

  it("consolidates protocol content and applies action wrappers", () => {
    const consolidator = new ProtocolContentConsolidator_Class();
    const result = consolidator.consolidateSegments([
      {
        type: "json",
        content: {
          message_id: "message-1",
          message_type: "CHAT_MESSAGE",
          message_role: "ASSISTANT",
          message_target: "CHAT",
          message_contents: [
            {
              content_id: "progress-1",
              content_type: "CHAT_CONTENT_PROGRESS_BAR",
              content_queue: "main",
              content_data: {
                progress_bar_current_percentage: 10,
              },
            },
            {
              content_id: "action-wrapper-1",
              content_type: "CHAT_CONTENT_ACTION_WRAPPER",
              content_queue: "main",
              content_data: {
                action: {
                  action_id: "action-1",
                  action_type: "CHAT_ACTION_UPDATE_PROGRESS_BAR",
                  action_data: {
                    target: "CHAT",
                    progress_bar_content_id: "progress-1",
                    progress_bar_current_percentage: 55,
                  },
                },
              },
            },
          ],
        },
      },
    ]);

    expect(result.contents).toHaveLength(1);
    expect(result.appliedActions).toHaveLength(1);
    expect(
      result.contents[0]?.content_data?.progress_bar_current_percentage,
    ).toBe(55);
  });

  it("consolidates protocol content from raw markdown stream output", () => {
    const contents = extractConsolidatedMessageContents(
      writeProtocolFencedJsonBlock(FIXTURE_MINIMAL_CHAT_MESSAGE),
    );

    expect(contents).toHaveLength(1);
    expect(contents[0]?.content_type).toBe("CHAT_CONTENT_MARKDOWN");
  });
});

describe("stream parser", () => {
  it("extracts single complete block", () => {
    const input = '```json\n{"message_type":"CHAT_MESSAGE"}\n```';
    const result = extractProtocolFencedJsonBlocksIncremental(input, 0);
    expect(result.blocks).toHaveLength(1);
    expect(result.blocks[0].json).toEqual({ message_type: "CHAT_MESSAGE" });
    expect(result.blocks[0].raw).toBe('{"message_type":"CHAT_MESSAGE"}');
    expect(result.blocks[0].fencedBlock).toBe(input);
    expect(result.nextCursor).toBe(input.length);
  });

  it("extracts multiple blocks", () => {
    const input = '```json\n{"a":1}\n```\n\ntext\n\n```json\n{"b":2}\n```';
    const result = extractProtocolFencedJsonBlocksIncremental(input, 0);
    expect(result.blocks).toHaveLength(2);
    expect(result.blocks[0].json).toEqual({ a: 1 });
    expect(result.blocks[1].json).toEqual({ b: 2 });
  });

  it("handles split chunks", () => {
    const chunk1 = FIXTURE_STREAM_SPLIT_CHUNKS.chunk1;
    const chunk2 = FIXTURE_STREAM_SPLIT_CHUNKS.chunk2;
    const r1 = extractProtocolFencedJsonBlocksIncremental(chunk1, 0);
    expect(r1.blocks).toHaveLength(0);
    const r2 = extractProtocolFencedJsonBlocksIncremental(
      chunk1 + chunk2,
      r1.nextCursor,
    );
    expect(r2.blocks).toHaveLength(1);
    expect(r2.nextCursor).toBe(chunk1.length + chunk2.length);
  });

  it("handles a fence split across chunks", () => {
    const chunk1 = FIXTURE_STREAM_FENCE_SPLIT.chunk1;
    const chunk2 = FIXTURE_STREAM_FENCE_SPLIT.chunk2;
    const r1 = extractProtocolFencedJsonBlocksIncremental(chunk1, 0);
    expect(r1.blocks).toHaveLength(0);
    const r2 = extractProtocolFencedJsonBlocksIncremental(
      chunk1 + chunk2,
      r1.nextCursor,
    );
    expect(r2.blocks).toHaveLength(1);
  });

  it("extracts fixture stream with two blocks", () => {
    const result = extractProtocolFencedJsonBlocksIncremental(
      FIXTURE_STREAM_TWO_BLOCKS,
      0,
    );
    expect(result.blocks).toHaveLength(2);
  });

  it("ignores non-json fences", () => {
    const result = extractProtocolFencedJsonBlocksIncremental(
      FIXTURE_STREAM_NON_PROTOCOL_FENCE,
      0,
    );
    expect(result.blocks).toHaveLength(0);
  });

  it("ignores uppercase JSON fences", () => {
    const result = extractProtocolFencedJsonBlocksIncremental(
      FIXTURE_STREAM_UPPERCASE_JSON,
      0,
    );
    expect(result.blocks).toHaveLength(0);
  });

  it("handles nested braces and escaped quotes", () => {
    const result = extractProtocolFencedJsonBlocksIncremental(
      FIXTURE_STREAM_NESTED_JSON,
      0,
    );
    expect(result.blocks).toHaveLength(1);
    expect(result.blocks[0].fencedBlock).toBe(FIXTURE_STREAM_NESTED_JSON);
  });
});

describe("stream debug filter", () => {
  it("removes debug blocks", () => {
    const input = '```json\n{"debug":true,"message_type":"CHAT_MESSAGE"}\n```';
    const result = filterDebugProtocolBlocks(input);
    expect(result).not.toContain("debug");
    expect(result.trim()).toBe("");
  });

  it("preserves non-debug blocks", () => {
    const input = '```json\n{"message_type":"CHAT_MESSAGE"}\n```';
    const result = filterDebugProtocolBlocks(input);
    expect(result).toContain("CHAT_MESSAGE");
  });

  it("handles mixed debug and non-debug blocks", () => {
    const input = [
      '```json\n{"debug":true,"message_type":"CHAT_MESSAGE","message_id":"d"}\n```',
      '```json\n{"message_type":"CHAT_MESSAGE","message_id":"n"}\n```',
    ].join("\n\n");
    const result = filterDebugProtocolBlocks(input);
    expect(result).not.toContain('"message_id":"d"');
    expect(result).toContain('"message_id":"n"');
  });

  it("statefully removes debug blocks split across chunks without leaking partial JSON", () => {
    const filter = createProtocolDebugBlockFilter();
    const first = filter.append('before\n```json\n{"debug":');
    const second = filter.append(
      'true,"message_type":"CHAT_MESSAGE"}\n```\nafter',
    );
    const flushed = filter.flush();

    expect(first).toBe("before\n");
    expect(second).toBe("\nafter");
    expect(flushed).toBe("");
  });

  it("statefully preserves non-debug protocol blocks split across chunks", () => {
    const filter = createProtocolDebugBlockFilter();
    const first = filter.append('before\n```json\n{"message_type":');
    const second = filter.append('"CHAT_MESSAGE"}\n```\nafter');
    const flushed = filter.flush();

    expect(first).toBe("before\n");
    expect(second).toBe('```json\n{"message_type":"CHAT_MESSAGE"}\n```\nafter');
    expect(flushed).toBe("");
  });

  it("holds only possible split fence suffixes for ordinary text", () => {
    const filter = createProtocolDebugBlockFilter();
    expect(filter.append("hello ``")).toBe("hello ");
    expect(filter.append(" not a fence")).toBe("`` not a fence");
    expect(filter.flush()).toBe("");
  });
});
