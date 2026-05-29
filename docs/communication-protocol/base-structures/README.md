---
description: "Overview of base structures in the communication protocol. README for the base structures specifications. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
status: implemented
last_reviewed: 2026-01-10
category: documentation
---

> **↩️ Back to [Communication Protocol](../README.md)**

# Base Structures

This directory contains the base specifications for the fundamental concepts within the communication protocol. These are conceptual structures that establish the core concepts of the protocol and serve as parent types for specialized structures and concrete implementations.

## 📋 Overview

Base structures are the foundation layer in the protocol's three-tier architecture:

1. **Base Structures** - Foundational concepts ← _You are here_
2. **Specialized Structures** - Intermediate patterns
3. **Type Specifications** - Concrete implementations

Each base structure includes:

- Core attributes and JSON schema
- Common patterns for inheritance
- Links to specialized structures and implementations
- Foundational concepts for the protocol

## ⚡ Base Action Structure

- **[ACTION](./ACTION.md)**: The fundamental construct representing a generic instruction for an operation. It defines common structure and essential attributes shared by all action types, including [app actions](../specialized-structures/APP_ACTION.md) for application-wide settings, [canvas actions](../specialized-structures/CANVAS_ACTION.md) for workspace control, and [chat actions](../specialized-structures/CHAT_ACTION.md) for interface management.

## 🎬 Base Animation Structure

- **[ANIMATION](./ANIMATION.md)**: The fundamental construct representing a generic animation effect instruction. It defines common structure and essential attributes shared by all animation types, providing Framer Motion compatible configuration for smooth and customizable animations across the interface.

  ```json
  {
    "animation_type": "SPECIFIC_ANIMATION_TYPE",
    "animation_framer_motion_attributes": {
      "delay": 0.1,
      "duration": 1.5,
      "ease": "easeOut"
      // ... specific animation properties
    }
  }
  ```

## ✨ Base Effect Structure

- **[EFFECT](./EFFECT.md)**: The fundamental construct representing a generic visual overlay effect. It defines common structure and essential attributes shared by all effect types, providing Framer Motion compatible configuration including repeat behaviors for ambient/continuous treatments.

  ```json
  {
    "effect_type": "SPECIFIC_EFFECT_TYPE",
    "effect_state": "EFFECT_STATE_ENABLED",
    "effect_framer_motion_attributes": {
      "delay": 1.6,
      "duration": 1.5,
      "repeat": 999999,
      "repeatType": "mirror"
      // ... specific effect properties
    }
  }
  ```

## 🎨 Base Content Structure

- **[CONTENT](./CONTENT.md)**: The fundamental construct representing a generic unit of information or interactive element. It defines common structure and essential attributes shared by all content types, including [chat content](../specialized-structures/CHAT_CONTENT.md) for interactive chat elements and [canvas content](../specialized-structures/CANVAS_CONTENT.md) for workspace display.

  ```json
  {
    "content_id": "unique-content-identifier",
    "content_type": "SPECIFIC_CONTENT_TYPE",
    "content_queue": "main", // optional - for parallel processing
    "content_data": {
      // ... specific content properties
    }
  }
  ```

## 📝 Base Message Structure

- **[MESSAGE](./MESSAGE.md)**: The foundational construct representing a generic container for information exchanged between entities within the system. It defines common structure and essential attributes shared by all message types, currently implemented as [chat messages](../type-specifications/CHAT_MESSAGE.md) for user-assistant communication.

  ```json
  {
    "message_id": "unique-message-identifier",
    "message_type": "SPECIFIC_MESSAGE_TYPE",
    "message_role": "USER|ASSISTANT",
    "message_target": "CHAT|CANVAS|APP",
    "message_contents": [
      // ... array of content objects
    ]
  }
  ```

---

## 📁 Directory Structure

```
base-structures/
├── README.md      # This file - base structures overview
├── ACTION.md      # Base action structure specification
├── ANIMATION.md   # Base animation structure specification
├── EFFECT.md      # Base effect structure specification
├── CONTENT.md     # Base content structure specification
└── MESSAGE.md     # Base message structure specification
```
