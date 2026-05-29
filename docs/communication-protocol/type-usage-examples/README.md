---
description: "README for the type-usage-examples directory. This directory contains practical usage examples extracted from type specification files to provide focused, real-world implementation guidance for developers. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

# Type Usage Examples

This directory contains practical usage examples for all type specifications in the Assistant ↔️ UI Communication Protocol. These examples demonstrate real-world implementation scenarios and various configuration patterns extracted from the main specification files.

## Purpose

The usage examples have been separated from the main specification files to:

1. **Improve Readability**: Keep specification files focused on core definitions and schemas
2. **Enhance Usability**: Provide dedicated space for comprehensive examples and patterns
3. **Better Organization**: Create clear separation between specification and implementation
4. **Easier Maintenance**: Allow independent updates to examples without affecting core specs

## Available Usage Examples

### App Actions

- **[APP_ACTION_CORE_CONSOLE](./APP_ACTION_CORE_CONSOLE.md)** - Core console streaming examples
- **[APP_ACTION_SET_SEND_ERROR](./APP_ACTION_SET_SEND_ERROR.md)** - Structured send-error examples
- **[APP_ACTION_SET_INPUT_PLACEHOLDER](./APP_ACTION_SET_INPUT_PLACEHOLDER.md)** - Input placeholder examples
- **[APP_ACTION_SET_THEME](./APP_ACTION_SET_THEME.md)** - Examples for changing application themes
- **[APP_ACTION_THREAD_LIST_REFRESH](./APP_ACTION_THREAD_LIST_REFRESH.md)** - Thread list refresh examples
- **[APP_ACTION_WAIT_FOR_USER_INPUT](./APP_ACTION_WAIT_FOR_USER_INPUT.md)** - Wait-for-input gating examples
- **[APP_ACTION_USER_PREFERENCE_UPDATE](./APP_ACTION_USER_PREFERENCE_UPDATE.md)** - Examples for updating user preferences

### Chat Content Types

- **[CHAT_CONTENT_ACTION_WRAPPER](./CHAT_CONTENT_ACTION_WRAPPER.md)** - Action wrapper examples
- **[CHAT_CONTENT_ACTIONABLE_CARDS](./CHAT_CONTENT_ACTIONABLE_CARDS.md)** - Interactive card selection examples
- **[CHAT_CONTENT_ACTIONABLE_CHIPS](./CHAT_CONTENT_ACTIONABLE_CHIPS.md)** - Interactive chip selection examples
- **[CHAT_CONTENT_BUTTON](./CHAT_CONTENT_BUTTON.md)** - Interactive button examples and patterns
- **[CHAT_CONTENT_MARKDOWN](./CHAT_CONTENT_MARKDOWN.md)** - Rich text formatting examples
- **[CHAT_CONTENT_PANEL](./CHAT_CONTENT_PANEL.md)** - Structured panel displays with headers and dynamic content
- **[CHAT_CONTENT_PROGRESS_BAR](./CHAT_CONTENT_PROGRESS_BAR.md)** - Progress visualization examples

### Canvas Content Types

- **[CANVAS_CONTENT_MARKDOWN](./CANVAS_CONTENT_MARKDOWN.md)** - Canvas markdown content examples
- **[CANVAS_CONTENT_SECTION](./CANVAS_CONTENT_SECTION.md)** - Canvas section organization examples
- **[CANVAS_CONTENT_HTML](./CANVAS_CONTENT_HTML.md)** - Canvas raw HTML content examples

### Chat Actions

- **[CHAT_ACTION_BEGIN_SIMULATED_TURN](./CHAT_ACTION_BEGIN_SIMULATED_TURN.md)** - Begin simulated turn examples
- **[CHAT_ACTION_CHOOSE_ACTIONABLE_CARD](./CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)** - Card selection action examples
- **[CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP](./CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)** - Chip selection action examples
- **[CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE](./CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md)** - Content sequence completion examples
- **[CHAT_ACTION_SEND_TEXT_MESSAGE](./CHAT_ACTION_SEND_TEXT_MESSAGE.md)** - Text message sending examples
- **[CHAT_ACTION_UPDATE_BUTTON](./CHAT_ACTION_UPDATE_BUTTON.md)** - Button update action examples
- **[CHAT_ACTION_UPDATE_PANEL](./CHAT_ACTION_UPDATE_PANEL.md)** - Panel content and header update examples
- **[CHAT_ACTION_UPDATE_PROGRESS_BAR](./CHAT_ACTION_UPDATE_PROGRESS_BAR.md)** - Progress bar update examples
- **[CHAT_ACTION_WAIT_FOR_QUEUES](./CHAT_ACTION_WAIT_FOR_QUEUES.md)** - Queue synchronization examples

### Canvas Actions

- **[CANVAS_ACTION_CLOSE](./CANVAS_ACTION_CLOSE.md)** - Canvas closure scenarios and workflows
- **[CANVAS_ACTION_OPEN](./CANVAS_ACTION_OPEN.md)** - Canvas opening patterns and initialization
- **[CANVAS_ACTION_UPDATE](./CANVAS_ACTION_UPDATE.md)** - Canvas content update operations

### Message Types

- **[CHAT_MESSAGE](./CHAT_MESSAGE.md)** - Complete message structure examples

## Example Categories

Each usage examples file contains:

### Basic Examples

Simple, straightforward implementations demonstrating core functionality.

### Advanced Examples

Complex scenarios showing multi-step workflows and edge cases.

### Style Variations

Different visual and behavioral configurations for the same type.

### Integration Examples

Real-world usage patterns within complete message flows.

### Best Practices

Recommended implementation patterns and common pitfalls to avoid.

## File Structure

Each usage examples file follows this structure:

```markdown
# [TYPE_NAME] Usage Examples

## Example 1: [Basic Use Case]

[Description and JSON payload]

## Example 2: [Advanced Use Case]

[Description and JSON payload]

## Style Examples

[Different style/state variations]

## Integration Examples

[Complete workflow examples]
```

## Navigation

### Quick Links

- [📋 All Type Specifications](../type-specifications/README.md)
- [📚 Communication Protocol Overview](../README.md)
- [🏗️ Base Structures](../base-structures/README.md)
- [🔧 Specialized Structures](../specialized-structures/README.md)

### By Category

#### Content Types

- [CHAT_CONTENT_BUTTON](./CHAT_CONTENT_BUTTON.md) - Interactive buttons
- [CHAT_CONTENT_MARKDOWN](./CHAT_CONTENT_MARKDOWN.md) - Rich text content

#### Action Types

- [APP_ACTION_SET_THEME](./APP_ACTION_SET_THEME.md) - Theme changes
- [APP_ACTION_SET_SEND_ERROR](./APP_ACTION_SET_SEND_ERROR.md) - Structured send-error surface
- [APP_ACTION_WAIT_FOR_USER_INPUT](./APP_ACTION_WAIT_FOR_USER_INPUT.md) - User-gated progression
- [APP_ACTION_USER_PREFERENCE_UPDATE](./APP_ACTION_USER_PREFERENCE_UPDATE.md) - Preference updates

#### Message Types

- [CHAT_MESSAGE](./CHAT_MESSAGE.md) - Complete messages

## Implementation Status

### ✅ Completed Files (29/29) - TASK COMPLETE!

| Specification                                                                     | Status      | Examples               | Last Updated |
| --------------------------------------------------------------------------------- | ----------- | ---------------------- | ------------ |
| [APP_ACTION_CORE_CONSOLE](APP_ACTION_CORE_CONSOLE.md)                             | ✅ Complete | Examples               | Unknown      |
| [APP_ACTION_SET_SEND_ERROR](APP_ACTION_SET_SEND_ERROR.md)                         | ✅ Complete | 2 examples             | Apr 2026     |
| [APP_ACTION_SET_INPUT_PLACEHOLDER](APP_ACTION_SET_INPUT_PLACEHOLDER.md)           | ✅ Complete | 6+ examples            | Feb 2026     |
| [APP_ACTION_SET_THEME](APP_ACTION_SET_THEME.md)                                   | ✅ Complete | 3 examples             | Nov 2024     |
| [APP_ACTION_THREAD_LIST_REFRESH](APP_ACTION_THREAD_LIST_REFRESH.md)               | ✅ Complete | Standard examples only | Nov 2024     |
| [APP_ACTION_WAIT_FOR_USER_INPUT](APP_ACTION_WAIT_FOR_USER_INPUT.md)               | ✅ Complete | 2 examples             | Feb 2026     |
| [APP_ACTION_USER_PREFERENCE_UPDATE](APP_ACTION_USER_PREFERENCE_UPDATE.md)         | ✅ Complete | 3 examples             | Nov 2024     |
| [CANVAS_ACTION_CLOSE](CANVAS_ACTION_CLOSE.md)                                     | ✅ Complete | 6+ examples            | Nov 2024     |
| [CANVAS_ACTION_OPEN](CANVAS_ACTION_OPEN.md)                                       | ✅ Complete | 10+ examples           | Nov 2024     |
| [CANVAS_ACTION_UPDATE](CANVAS_ACTION_UPDATE.md)                                   | ✅ Complete | 6+ examples            | Nov 2024     |
| [CANVAS_CONTENT_HTML](CANVAS_CONTENT_HTML.md)                                     | ✅ Complete | Examples               | Unknown      |
| [CANVAS_CONTENT_MARKDOWN](CANVAS_CONTENT_MARKDOWN.md)                             | ✅ Complete | 12+ examples           | Nov 2024     |
| [CANVAS_CONTENT_SECTION](CANVAS_CONTENT_SECTION.md)                               | ✅ Complete | 10+ examples           | Nov 2024     |
| [CHAT_ACTION_BEGIN_SIMULATED_TURN](CHAT_ACTION_BEGIN_SIMULATED_TURN.md)           | ✅ Complete | Examples               | Unknown      |
| [CHAT_ACTION_CHOOSE_ACTIONABLE_CARD](CHAT_ACTION_CHOOSE_ACTIONABLE_CARD.md)       | ✅ Complete | 8+ examples            | Nov 2024     |
| [CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP](CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP.md)       | ✅ Complete | 10+ examples           | Nov 2024     |
| [CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE](CHAT_ACTION_COMPLETE_CONTENT_SEQUENCE.md) | ✅ Complete | Examples               | Unknown      |
| [CHAT_ACTION_SEND_TEXT_MESSAGE](CHAT_ACTION_SEND_TEXT_MESSAGE.md)                 | ✅ Complete | 15+ examples           | Nov 2024     |
| [CHAT_ACTION_UPDATE_BUTTON](CHAT_ACTION_UPDATE_BUTTON.md)                         | ✅ Complete | 10+ examples           | Nov 2024     |
| [CHAT_ACTION_UPDATE_PANEL](CHAT_ACTION_UPDATE_PANEL.md)                           | ✅ Complete | 7+ examples            | Dec 2024     |
| [CHAT_ACTION_UPDATE_PROGRESS_BAR](CHAT_ACTION_UPDATE_PROGRESS_BAR.md)             | ✅ Complete | 8+ examples            | Nov 2024     |
| [CHAT_ACTION_WAIT_FOR_QUEUES](CHAT_ACTION_WAIT_FOR_QUEUES.md)                     | ✅ Complete | 4 examples             | Feb 2026     |
| [CHAT_CONTENT_ACTION_WRAPPER](CHAT_CONTENT_ACTION_WRAPPER.md)                     | ✅ Complete | Standard examples only | Nov 2024     |
| [CHAT_CONTENT_ACTIONABLE_CARDS](CHAT_CONTENT_ACTIONABLE_CARDS.md)                 | ✅ Complete | 8+ examples            | Nov 2024     |
| [CHAT_CONTENT_ACTIONABLE_CHIPS](CHAT_CONTENT_ACTIONABLE_CHIPS.md)                 | ✅ Complete | 9+ examples            | Nov 2024     |
| [CHAT_CONTENT_BUTTON](CHAT_CONTENT_BUTTON.md)                                     | ✅ Complete | 8+ examples            | Nov 2024     |
| [CHAT_CONTENT_MARKDOWN](CHAT_CONTENT_MARKDOWN.md)                                 | ✅ Complete | 5+ examples            | Nov 2024     |
| [CHAT_CONTENT_PANEL](CHAT_CONTENT_PANEL.md)                                       | ✅ Complete | 8+ examples            | Dec 2024     |
| [CHAT_CONTENT_PROGRESS_BAR](CHAT_CONTENT_PROGRESS_BAR.md)                         | ✅ Complete | 17+ examples           | Nov 2024     |
| [CHAT_MESSAGE](CHAT_MESSAGE.md)                                                   | ✅ Complete | 3 examples             | Nov 2024     |

### 🎉 ALL TYPE SPECS COVERED

**Final Status**: 100% Complete (29/29 type specifications have usage examples)

Supplemental example files:

- `GENERIC_STORYBOARD_ADAPTED_EXAMPLES.md`
- `progress-bar-with-image-and-text-panels.json`

## Usage Guidelines

### For Developers

1. **Start with Basic Examples**: Understand core functionality before exploring advanced patterns
2. **Follow Integration Examples**: See how types work together in real scenarios
3. **Review Best Practices**: Learn recommended implementation approaches
4. **Test Edge Cases**: Use advanced examples to understand boundary conditions

### For Documentation Contributors

1. **Maintain Consistency**: Follow established example format and structure
2. **Provide Context**: Include clear descriptions for each example
3. **Update Links**: Ensure cross-references remain accurate
4. **Test Examples**: Verify all JSON payloads are valid and complete

## Contributing

When adding new examples:

1. Place them in the appropriate usage examples file
2. Follow the established format and structure
3. Include clear descriptions and context
4. Update this README if adding new files
5. Ensure examples are practical and realistic

---

_This directory is part of the comprehensive Assistant ↔️ UI Communication Protocol documentation suite._
