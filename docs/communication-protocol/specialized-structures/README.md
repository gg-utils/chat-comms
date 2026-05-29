---
description: "Overview of specialized structures in the communication protocol. README for the specialized structures specifications. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **↩️ Back to [Communication Protocol](../README.md)**

# Specialized Structures

This directory contains the specialized structures that inherit from the base structures and establish patterns to be further inherited by implementable types. These are conceptual structures that serve as intermediary specifications between base structures and concrete implementations.

## 📋 Overview

Specialized structures are the middle layer in the protocol's three-tier architecture:

1. **Base Structures** - Foundational concepts
2. **Specialized Structures** - Intermediate patterns ← _You are here_
3. **Type Specifications** - Concrete implementations

Each specialized structure includes:

- Inheritance from base structures
- Common patterns for related types
- Structural guidelines for implementations
- Links to concrete type specifications

## ⚡ Action Specialized Structures

Action specialized structures extend the [ACTION](../base-structures/ACTION.md) base structure and are implemented by the [type specifications](../type-specifications/README.md).

- **[APP_ACTION](./APP_ACTION.md)**: Application-level actions are typically used to control application-wide settings or trigger application-level events. App actions are used to [set the theme](../type-specifications/APP_ACTION_SET_THEME.md), [refresh the thread list](../type-specifications/APP_ACTION_THREAD_LIST_REFRESH.md), and [update user preferences](../type-specifications/APP_ACTION_USER_PREFERENCE_UPDATE.md).

  ```json
  {
    "action_id": "app-action-identifier",
    "action_type": "APP_ACTION_SPECIFIC_TYPE",
    "action_data": {
      "target": "APP"
      // ... specific app action properties
    }
  }
  ```

- **[CANVAS_ACTION](./CANVAS_ACTION.md)**: Actions related to the canvas, a secondary workspace for displaying detailed information. These actions control [opening](../type-specifications/CANVAS_ACTION_OPEN.md), [updating](../type-specifications/CANVAS_ACTION_UPDATE.md), and [closing](../type-specifications/CANVAS_ACTION_CLOSE.md) canvas content.

  ```json
  {
    "action_id": "canvas-action-identifier",
    "action_type": "CANVAS_ACTION_SPECIFIC_TYPE",
    "action_data": {
      "target": "CANVAS",
      "canvas_id": "canvas-doc-id"
      // ... specific canvas action properties
    }
  }
  ```

- **[CHAT_ACTION](./CHAT_ACTION.md)**: Actions that are initiated from or directly affect the chat interface. These actions are used to [send text messages](../type-specifications/CHAT_ACTION_SEND_TEXT_MESSAGE.md), [update buttons](../type-specifications/CHAT_ACTION_UPDATE_BUTTON.md), [update panels](../type-specifications/CHAT_ACTION_UPDATE_PANEL.md), [choose actionable cards](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md), [choose actionable chips](../type-specifications/CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md), and [update progress bars](../type-specifications/CHAT_ACTION_UPDATE_PROGRESS_BAR.md).

## 🎬 Animation Specialized Structures

Animation specialized structures extend the [ANIMATION](../base-structures/ANIMATION.md) base structure.

- **[PANEL_ANIMATION](./PANEL_ANIMATION.md)**: Animation effects specifically designed for panel interface elements. These animations provide smooth transitions and visual effects for panel components such as headers, bodies, opening/closing behaviors, and state changes, leveraging Framer Motion's animation capabilities.

  ```json
  {
    "animation_type": "ANIMATION_TYPE_EXPAND_UP",
    "animation_framer_motion_attributes": {
      "delay": 0.1,
      "duration": 1.5,
      "ease": "easeOut"
      // ... specific animation properties
    }
  }
  ```

## ✨ Effect Specialized Structures

Effect specialized structures define overlay visual effects that complement animations.

- **[PANEL_EFFECT](./PANEL_EFFECT.md)**: Visual overlay effects for panels, configured with Framer Motion attributes. Currently supports `EFFECT_LASER_SWEEP` for a mirrored, repeating sweep across panel body areas.
  ```json
  {
    "effect_type": "EFFECT_LASER_SWEEP",
    "effect_framer_motion_attributes": {
      "delay": 1.6,
      "repeatDelay": 0.1,
      "duration": 1.5,
      "repeat": 999999,
      "ease": "easeInOut",
      "repeatType": "mirror",
      "opacity": { "delay": 1.6, "duration": 0 }
    }
  }
  ```

## 🎨 Content Specialized Structures

Content specialized structures extend the [CONTENT](../base-structures/CONTENT.md) base structure.

- **[CHAT_CONTENT](./CHAT_CONTENT.md)**: Various types of content that can be displayed within the chat interface. These content types include [markdown text](../type-specifications/CHAT_CONTENT_MARKDOWN.md), [interactive buttons](../type-specifications/CHAT_CONTENT_BUTTON.md), [actionable chips](../type-specifications/CHAT_CONTENT_ACTIONABLE_CHIPS.md), [actionable cards](../type-specifications/CHAT_CONTENT_ACTIONABLE_CARDS.md), [action wrappers](../type-specifications/CHAT_CONTENT_ACTION_WRAPPER.md), [panels](../type-specifications/CHAT_CONTENT_PANEL.md), and [progress bars](../type-specifications/CHAT_CONTENT_PROGRESS_BAR.md).

  ```json
  {
    "content_id": "chat-content-identifier",
    "content_type": "CHAT_CONTENT_SPECIFIC_TYPE",
    "content_data": {
      // ... specific chat content properties
    }
  }
  ```

- **[CANVAS_CONTENT](./CANVAS_CONTENT.md)**: Different types of content that can be displayed on the canvas. Canvas content types include [markdown text](../type-specifications/CANVAS_CONTENT_MARKDOWN.md) and [organized sections](../type-specifications/CANVAS_CONTENT_SECTION.md) for structuring information within the canvas workspace.

  ```json
  {
    "content_id": "canvas-content-identifier",
    "content_type": "CANVAS_CONTENT_SPECIFIC_TYPE",
    "content_data": {
      // ... specific canvas content properties
    }
  }
  ```

---

## 📁 Directory Structure

```
specialized-structures/
├── README.md                  # This file - specialized structures overview
├── APP_ACTION.md              # Application actions specification
├── CANVAS_ACTION.md           # Canvas actions specification
├── CHAT_ACTION.md             # Chat actions specification
├── PANEL_ANIMATION.md         # Panel animations specification
├── CANVAS_CONTENT.md          # Canvas content specification
└── CHAT_CONTENT.md            # Chat content specification
```
