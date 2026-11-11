/**
 * @fileoverview Compile-only checks that the runtime chat types are assignable to the protocol types.
 *
 * A consumer that holds a runtime value (for example an actionable-cards content item taken from
 * the runtime message state) must be able to pass it to a function typed with the protocol
 * contract without a cast. Every assignment below is such a call site. The file is never emitted
 * and never run: it is compiled by `tsconfig.type-tests.json` as part of `npm run typecheck`, with
 * `strict` and `exactOptionalPropertyTypes` on, and it imports through the public barrels so it
 * checks the names a consumer actually sees.
 *
 * @testing npm run typecheck
 */

import type {
  ChatComms_RuntimeChat_ActionWrapperContent,
  ChatComms_RuntimeChat_ActionableCardsContent,
  ChatComms_RuntimeChat_ActionableChipsContent,
  ChatComms_RuntimeChat_AllChatContent,
  ChatComms_RuntimeChat_ButtonContent,
  ChatComms_RuntimeChat_CanvasAction,
  ChatComms_RuntimeChat_CanvasCloseAction,
  ChatComms_RuntimeChat_CanvasOpenAction,
  ChatComms_RuntimeChat_CanvasUpdateAction,
  ChatComms_RuntimeChat_ChatContentPanel,
  ChatComms_RuntimeChat_ChatMessage,
  ChatComms_RuntimeChat_MarkdownContent,
  ChatComms_RuntimeChat_ProgressBarContent,
} from "./public/runtime/chat.js";
import type {
  ChatComms_Protocol_CanvasAction,
  ChatComms_Protocol_ChatAction,
  ChatComms_Protocol_ChatContent,
  ChatComms_Protocol_ChatMessage,
} from "./public/types.js";

/** Stands for a consumer function whose parameter is typed with the protocol contract. */
declare function accept<Protocol>(value: Protocol): void;

// --- Pair 1: runtime chat content -> protocol chat content -------------------------------------

declare const actionableCardsContent: ChatComms_RuntimeChat_ActionableCardsContent;
accept<ChatComms_Protocol_ChatContent>(actionableCardsContent);

declare const markdownContent: ChatComms_RuntimeChat_MarkdownContent;
accept<ChatComms_Protocol_ChatContent>(markdownContent);

declare const progressBarContent: ChatComms_RuntimeChat_ProgressBarContent;
accept<ChatComms_Protocol_ChatContent>(progressBarContent);

declare const panelContent: ChatComms_RuntimeChat_ChatContentPanel;
accept<ChatComms_Protocol_ChatContent>(panelContent);

declare const actionableChipsContent: ChatComms_RuntimeChat_ActionableChipsContent;
accept<ChatComms_Protocol_ChatContent>(actionableChipsContent);

declare const buttonContent: ChatComms_RuntimeChat_ButtonContent;
accept<ChatComms_Protocol_ChatContent>(buttonContent);

declare const actionWrapperContent: ChatComms_RuntimeChat_ActionWrapperContent;
accept<ChatComms_Protocol_ChatContent>(actionWrapperContent);

declare const anyChatContent: ChatComms_RuntimeChat_AllChatContent;
accept<ChatComms_Protocol_ChatContent>(anyChatContent);

// --- Pair 2: runtime chat message -> protocol chat message -------------------------------------

declare const chatMessage: ChatComms_RuntimeChat_ChatMessage;
accept<ChatComms_Protocol_ChatMessage>(chatMessage);

// --- Pair 3: runtime chat action -> protocol chat action ---------------------------------------
//
// Deliberately not asserted. The runtime chat action types cannot be made assignable to the
// protocol chat action without changing the protocol contract or misdescribing runtime values:
//
// - The protocol requires `action_data.target` on every chat action. The loose validators accept
//   an action with no target, so the runtime update-button, update-progress-bar and
//   wait-for-queues payloads have no `target`, and the runtime complete-content-sequence action
//   has no `action_data` at all. The runtime send-text, begin-turn and choose-card/chip payloads
//   allow a target of "CHAT", "CANVAS" or "APP", as the loose validators do; the protocol chat
//   action allows "CHAT" or "CANVAS".
// - The runtime update-panel payload supports the "PANEL_BODY_HTML" body type and its own body
//   data shapes, which the protocol panel body type does not include.
// - The runtime chat action union also carries app actions, whose `action_type` values are not
//   protocol chat action types (the protocol has a separate app action contract).
//
// A consumer still has to narrow or map these before handing them to a protocol-typed function.

// --- Pair 4: runtime canvas action -> protocol canvas action -----------------------------------

declare const canvasOpenAction: ChatComms_RuntimeChat_CanvasOpenAction;
accept<ChatComms_Protocol_CanvasAction>(canvasOpenAction);

declare const canvasCloseAction: ChatComms_RuntimeChat_CanvasCloseAction;
accept<ChatComms_Protocol_CanvasAction>(canvasCloseAction);

declare const canvasUpdateAction: ChatComms_RuntimeChat_CanvasUpdateAction;
accept<ChatComms_Protocol_CanvasAction>(canvasUpdateAction);

declare const runtimeCanvasAction: ChatComms_RuntimeChat_CanvasAction;
accept<ChatComms_Protocol_CanvasAction>(runtimeCanvasAction);

// The same holds when a consumer supplies its own section metadata and runtime-only action fields.
declare const customCanvasAction: ChatComms_RuntimeChat_CanvasAction<
  { section_key: string },
  { received_at: number }
>;
accept<ChatComms_Protocol_CanvasAction>(customCanvasAction);

// The protocol chat action delegates canvas operations, so a runtime canvas action is one too.
accept<ChatComms_Protocol_ChatAction>(runtimeCanvasAction);
