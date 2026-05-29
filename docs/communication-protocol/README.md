---
description: "Overview of the Assistant ↔️ UI Communication Protocol. README and quick start guide for the Assistant ↔️ UI Communication Protocol. This file provides an overview of the protocol components, links to detailed documentation, and serves as the entry point for developers implementing the communication protocol. The protocol enables rich interactive experiences between assistants and user interfaces through structured message exchanges, interactive content types, and actionable elements."
status: implemented
last_reviewed: 2026-05-25
category: documentation
---

# Assistant ↔️ UI Communication Protocol

Documentation for the Assistant ↔️ UI Communication Protocol, enabling rich interactive experiences between assistants and user interfaces.

## Package Ownership

This documentation tree is owned by `@gg-utils/chat-comms`, the reusable package shared by protocol producers and UI consumers.

- Protocol package: `@gg-utils/chat-comms`
- GitHub repository: `git@github.com:gg-utils/chat-comms.git`
- Consumer implementations may wrap these package contracts with application-specific adapters.
- UI ingestion adapters should import this package instead of duplicating wire contracts.

## Implementation Coverage

The package currently implements the reusable protocol surface as TypeScript/ESM code:

- wire token constants, TypeScript types, option contracts, builders, and fixtures;
- Zod-backed strict validation for `CHAT_MESSAGE` envelopes plus concrete chat, canvas, and app
  content/action payloads;
- loose compatibility classifiers for historical stream payloads;
- lowercase fenced-`json` stream writing, incremental parsing, markdown segment extraction, and
  debug-block filtering;
- protocol content/action stream-summary helpers for downstream transcript compression, with
  consumer-configurable assistant action marker labels for product-specific prompt headings;
- protocol content consolidation for merging message contents and applying deferred action wrappers;
- reusable message/content/action ID sequencing plus historical-stream `content_id` normalization;
- headless chat action/content command compilers that keep protocol discriminant routing in the package
  while leaving side effects to consumers;
- concise protocol content/action summary helpers for queue and content debug traces;
- protocol image-URL discovery helpers for panel content and update-panel action wrappers, so
  preloaders can consume the package without duplicating protocol discriminant scans;
- headless queue/canvas helpers that do not depend on React, DOM APIs, Keystone, MongoDB, or product data,
  including `WAIT_FOR_QUEUES` request normalization, queue partitioning, wait-completion checks,
  protocol `content_delay` normalization, runtime canvas scope metadata, reducer semantics, and
  protocol canvas action command compilation;
- generic runtime canvas/chat action and state aliases that let consumers strongly type their own
  opaque canvas metadata without duplicating protocol-owned action, content, or state unions.

The package does **not** export Joi or Yup validators. Any Joi/Yup snippets in this documentation are
illustrative translations of the documented JSON shape, not runtime libraries shipped by
`@gg-utils/chat-comms`. The strict runtime validators in the package validate `CHAT_MESSAGE`
envelopes plus concrete `CHAT_CONTENT_*`, `CHAT_ACTION_*`, `CANVAS_CONTENT_*`, `CANVAS_ACTION_*`,
and `APP_ACTION_*` payload targets and required fields. Intentionally open extension blobs such as
`panel_body_data`, panel animation/effect objects, streaming options, and arbitrary app payload details
stay documented and typed, but are not fully refined by every nested subtype yet.

Application thread records, persistence identifiers, profile metadata, route state, and renderer
component choices remain consumer-owned. This package defines the stream/wire contract and headless
protocol helpers; consuming applications may adapt those helpers to their own thread, account,
storage, and rendering models.

Protocol stream blocks are lowercase fenced `json` blocks only. JavaScript or TypeScript code fences in
this documentation are developer examples, not protocol stream fences.

## 🧩 Understanding Protocol Components

When working with this communication protocol, you'll encounter three distinct but related concepts in the documentation:

### **Core Payload**

The essential data structure for a specific content type or action type. This represents the minimal JSON structure required to define the content or action, without any message wrapper. Core payloads focus purely on the data needed for that specific component.

**Example:**

**Content Payload**

```json
{
  "content_id": "button-001",
  "content_type": "CHAT_CONTENT_BUTTON",
  "content_data": {
    "button_text": "Click Me",
    "button_style": "BUTTON_STYLE_PRIMARY"
  }
}
```

### **Complete Assistant Message**

The full `CHAT_MESSAGE` structure that wraps core payloads in the complete message protocol. This includes message metadata (ID, type, role, target) and embeds the core payload within the `message_contents` array, representing the actual data structure sent between the assistant and UI.

**Example:**

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "button-001",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Click Me",
        "button_style": "BUTTON_STYLE_PRIMARY"
      }
    }
  ]
}
```

### **Assistant Output**

The assistant's reasoning and decision-making process before sending a message, followed by the complete message structure. This shows the assistant's internal thought process, self-identification, and explanation of what the user will be able to do with the content or action being sent.

**Example:**

```markdown
## Sending Interactive Button to User

I, the ASSISTANT, will now send a message to the USER with CHAT_CONTENT_BUTTON that allows them to trigger an action. This will allow the USER to interact with the interface by clicking the button, which will execute the associated action.

[Complete Assistant Message JSON follows...]
```

These three components work together to provide: **Core Payload** (the essential data), **Complete Assistant Message** (the protocol structure), and **Assistant Output** (the reasoning and user experience context).

## 📚 Documentation

- **[Base Structures Overview](./base-structures/README.md)** - Combined overview of all base structures
- **[Specialized Structures Overview](./specialized-structures/README.md)** - Comprehensive overview of all specialized structures
- **[Type Specifications Overview](./type-specifications/README.md)** - Complete catalog of all implementable types

## 🏗️ Protocol Architecture

The communication protocol is organized in a three-tier hierarchical structure:

### 1. Base Structures

These are the foundational conceptual structures that establish the core concepts of the protocol. They are not themselves types and do not exist as standalone entities in the protocol or UI.

- 📝 **[MESSAGE](./base-structures/MESSAGE.md)** - Base structure for all messages
- 🎨 **[CONTENT](./base-structures/CONTENT.md)** - Base structure for all content types
- ⚡ **[ACTION](./base-structures/ACTION.md)** - Base structure for all actions

### 2. Specialized Structures

These inherit from base structures and establish patterns to be further inherited by implementable types. They serve as intermediary specifications between base structures and concrete implementations.

#### 🎨 **Content Specialized Structures:**

- 💬 **[CHAT_CONTENT](./specialized-structures/CHAT_CONTENT.md)** - Contents displayed in chat messages
- 📄 **[CANVAS_CONTENT](./specialized-structures/CANVAS_CONTENT.md)** - Contents displayed in the canvas

#### ⚡ **Action Specialized Structures:**

- 💬 **[CHAT_ACTION](./specialized-structures/CHAT_ACTION.md)** - Actions for the chat interface
- 📄 **[CANVAS_ACTION](./specialized-structures/CANVAS_ACTION.md)** - Actions for the canvas workspace
- 🔧 **[APP_ACTION](./specialized-structures/APP_ACTION.md)** - Application-level actions

### 3. Type Specifications

These are the concrete, implementable types used when outputting content from the ASSISTANT to the UI.

#### 📝 Message Types

- 💬 Chat Message

  - **[CHAT_MESSAGE](./type-specifications/CHAT_MESSAGE.md)** - Core chat message structure

#### 🎨 Content Types

- 💬 Chat Content

  - **[CHAT_CONTENT_ACTION_WRAPPER](./type-specifications/CHAT_CONTENT_ACTION_WRAPPER.md)** - Action wrapper
  - **[CHAT_CONTENT_BUTTON](./type-specifications/CHAT_CONTENT_BUTTON.md)** - Interactive buttons
  - **[CHAT_CONTENT_MARKDOWN](./type-specifications/CHAT_CONTENT_MARKDOWN.md)** - Markdown text
  - **[CHAT_CONTENT_PROGRESS_BAR](./type-specifications/CHAT_CONTENT_PROGRESS_BAR.md)** - Progress indicators
  - **[CHAT_CONTENT_PANEL](./type-specifications/CHAT_CONTENT_PANEL.md)** - Panel displays
  - **[CHAT_CONTENT_ACTIONABLE_CARDS](./type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md)** - Selection interfaces
  - **[CHAT_CONTENT_ACTIONABLE_CHIPS](./type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md)** - Small action buttons

- 📄 Canvas Content

  - **[CANVAS_CONTENT_MARKDOWN](./type-specifications/CANVAS_CONTENT_MARKDOWN.md)** - Canvas markdown
  - **[CANVAS_CONTENT_SECTION](./type-specifications/CANVAS_CONTENT_SECTION.md)** - Organized sections
  - **[CANVAS_CONTENT_HTML](./type-specifications/CANVAS_CONTENT_HTML.md)** - Raw HTML content (no sanitization by protocol)

#### ⚡ Action Types

- 💬 Chat Actions

  - **[CHAT_ACTION_BEGIN_SIMULATED_TURN](./type-specifications/CHAT_ACTION_BEGIN_SIMULATED_TURN.md)** - Begin simulated turn
  - **[CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP](./type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)** - Handle chip selections
  - **[CHAT_ACTION_CHOOSE_ACTIONABLE_CARD](./type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)** - Handle card selections
  - **[CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE](./type-specifications/CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)** - Complete content sequence
  - **[CHAT_ACTION_SEND_TEXT_MESSAGE](./type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md)** - Simulate user input
  - **[CHAT_ACTION_UPDATE_BUTTON](./type-specifications/CHAT_ACTION_UPDATE_BUTTON.md)** - Update buttons
  - **[CHAT_ACTION_UPDATE_PANEL](./type-specifications/CHAT_ACTION_UPDATE_PANEL.md)** - Update panels
  - **[CHAT_ACTION_UPDATE_PROGRESS_BAR](./type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md)** - Update progress
  - **[CHAT_ACTION_WAIT_FOR_QUEUES](./type-specifications/CHAT_ACTION_WAIT_FOR_QUEUES.md)** - Wait for queues

- 📄 Canvas Actions

  - **[CANVAS_ACTION_OPEN](./type-specifications/CANVAS_ACTION_OPEN.md)** - Open canvas
  - **[CANVAS_ACTION_CLOSE](./type-specifications/CANVAS_ACTION_CLOSE.md)** - Close canvas
  - **[CANVAS_ACTION_UPDATE](./type-specifications/CANVAS_ACTION_UPDATE.md)** - Update canvas (title, contents, append, modify, remove)

- 🔧 App Actions

  - **[APP_ACTION_CORE_CONSOLE](./type-specifications/APP_ACTION_CORE_CONSOLE.md)** - Core console streaming
  - **[APP_ACTION_SET_SEND_ERROR](./type-specifications/APP_ACTION_SET_SEND_ERROR.md)** - Structured send-error surface
  - **[APP_ACTION_SET_INPUT_PLACEHOLDER](./type-specifications/APP_ACTION_SET_INPUT_PLACEHOLDER.md)** - Set input placeholder
  - **[APP_ACTION_SET_THEME](./type-specifications/APP_ACTION_SET_THEME.md)** - Set theme
  - **[APP_ACTION_THREAD_LIST_REFRESH](./type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md)** - Thread list refresh
  - **[APP_ACTION_WAIT_FOR_USER_INPUT](./type-specifications/APP_ACTION_WAIT_FOR_USER_INPUT.md)** - Wait for user interaction
  - **[APP_ACTION_USER_PREFERENCE_UPDATE](./type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md)** - User preference update

---

## Key Features

### Content Timing and Animation

The protocol provides sophisticated timing control for content delivery:

- **Content-Level Delays**: Use `content_delay` on individual content items for fine-grained inter-item timing within the same queue
- **Message-Level Delay Removed**: Legacy message-level delay is no longer supported in the protocol API
- **Message Flow Control**: `APP_ACTION_WAIT_FOR_USER_INPUT` remains supported for user-gated progression
- **Content Queues**: Use `content_queue` to enable parallel processing of independent content streams (e.g., website panels + reasoning panels)

For detailed documentation on content timing, see:

- [CONTENT Base Structure](./base-structures/CONTENT.md)
- [CHAT_CONTENT Specialized Structure](./specialized-structures/CHAT_CONTENT.md)

---

## 🛠️ Implementation Guidance

Protocol producers should use package-owned builders, schemas, validators, and stream helpers instead of hand-assembling fenced JSON strings. Application-specific prompt formatters or UI adapters may wrap this package, but those wrappers are consumer-owned and should not become part of this package's documentation contract.

- Stream writer: `@gg-utils/chat-comms/stream`
- Wire token exports: `@gg-utils/chat-comms/wire`
- Validators and schemas: `@gg-utils/chat-comms/validators` and `@gg-utils/chat-comms/schemas`

## 📁 Directory Structure

```
communication-protocol/
├── README.md                          # This file - main protocol overview
├── base-structures/
│   ├── README.md                      # Base structures overview
│   ├── ACTION.md                      # Base action structure
│   ├── CONTENT.md                     # Base content structure
│   └── MESSAGE.md                     # Base message structure
├── specialized-structures/
│   ├── README.md                      # Specialized structures overview
│   ├── APP_ACTION.md                  # Application-level actions
│   ├── CANVAS_ACTION.md               # Canvas workspace actions
│   ├── CANVAS_CONTENT.md              # Canvas content types
│   ├── CHAT_ACTION.md                 # Chat interface actions
│   └── CHAT_CONTENT.md                # Chat content types
└── type-specifications/
    ├── README.md                      # Type specifications overview with code examples
    ├── CHAT_MESSAGE.md                # Chat message implementation
    ├── APP_ACTION_CORE_CONSOLE.md     # Core console streaming action
    ├── APP_ACTION_SET_INPUT_PLACEHOLDER.md # Input placeholder action
    ├── APP_ACTION_SET_SEND_ERROR.md   # Structured send-error action
    ├── APP_ACTION_SET_THEME.md        # Theme change action
    ├── APP_ACTION_THREAD_LIST_REFRESH.md # Thread list refresh action
    ├── APP_ACTION_WAIT_FOR_USER_INPUT.md # Wait for user interaction action
    ├── APP_ACTION_USER_PREFERENCE_UPDATE.md # User preference updates
    ├── CANVAS_ACTION_CLOSE.md         # Close canvas action
    ├── CANVAS_ACTION_OPEN.md          # Open canvas action
    ├── CANVAS_ACTION_UPDATE.md        # Update canvas action
    ├── CANVAS_CONTENT_HTML.md         # Canvas HTML content
    ├── CANVAS_CONTENT_MARKDOWN.md     # Canvas markdown content
    ├── CANVAS_CONTENT_SECTION.md      # Canvas section content
    ├── CHAT_ACTION_BEGIN_SIMULATED_TURN.md # Begin simulated turn action
    ├── CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md # Card selection action
    ├── CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md # Chip selection action
    ├── CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md # Complete content sequence action
    ├── CHAT_ACTION_SEND_TEXT_MESSAGE.md # Text message simulation
    ├── CHAT_ACTION_UPDATE_BUTTON.md   # Button update action
    ├── CHAT_ACTION_UPDATE_PANEL.md    # Panel update action
    ├── CHAT_ACTION_UPDATE_PROGRESS_BAR.md # Progress bar update
    ├── CHAT_ACTION_WAIT_FOR_QUEUES.md # Queue synchronization action
    ├── CHAT_CONTENT_ACTION_WRAPPER.md # Action wrapper content
    ├── CHAT_CONTENT_ACTIONABLE_CARDS.md # Actionable cards content
    ├── CHAT_CONTENT_ACTIONABLE_CHIPS.md # Actionable chips content
    ├── CHAT_CONTENT_BUTTON.md         # Button content
    ├── CHAT_CONTENT_MARKDOWN.md       # Chat markdown content
    ├── CHAT_CONTENT_PANEL.md          # Panel content with headers and body
    └── CHAT_CONTENT_PROGRESS_BAR.md   # Progress bar content
├── type-usage-examples/               # Concrete-type examples plus scenario fixtures
│   ├── README.md
│   ├── APP_ACTION_SET_SEND_ERROR.md   # One example file per concrete action/content type
│   ├── GENERIC_STORYBOARD_ADAPTED_EXAMPLES.md
│   └── progress-bar-with-image-and-text-panels.json
└── utils/
    └── FRAMER_MOTION_ATTRIBUTES.md    # Framer Motion attribute reference
```

---

_For detailed specifications and implementation guidance, see the individual specifications linked above._
