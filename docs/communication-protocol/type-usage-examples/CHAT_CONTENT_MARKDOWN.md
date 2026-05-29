---
description: "Simplified usage examples for CHAT_CONTENT_MARKDOWN in the communication protocol. Focused on essential implementation patterns with improved readability and structure. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_CONTENT_MARKDOWN Specification](../type-specifications/CHAT_CONTENT_MARKDOWN.md)**

# CHAT_CONTENT_MARKDOWN Usage Examples

Markdown content provides rich text formatting within chat messages, supporting headers, lists, tables, code blocks, links, and emphasis for comprehensive text display.

## Core Implementation

### Basic Markdown Payload

**Content Payload**

```json
{
  "content_id": "markdown-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "Your markdown content here",
    "markdown_style": "DEFAULT"
  }
}
```

### Message Integration

**Message Payload**

```json
{
  "message_id": "chatmessage-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "markdown-content",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## Welcome\n\nHello! I can help you with **bold text**, *italic text*, and `code snippets`."
      }
    }
  ]
}
```

---

## Essential Examples

### Text Formatting

Basic text formatting with emphasis, inline code, and blockquotes for clear communication.

**Assistant Output**

````markdown
I'll create formatted text content with various emphasis and formatting options:

**Content Payload**

```json
{
  "content_id": "text-formatting",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## Text Formatting Examples\n\n**Bold text** for emphasis\n*Italic text* for subtle emphasis\n`Inline code` for technical terms\n\n> Blockquotes for important information"
  }
}
```
````

### Code Block Example

JavaScript code example with syntax highlighting and explanatory text.

`
**Assistant Output**

`````markdown
I'll provide a JavaScript code example with proper syntax highlighting:

**Content Payload**

````json
{
  "content_id": "code-example",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "Here's a JavaScript example:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\n\nThis function creates personalized greetings."
  }
}
````
`````

`````

### Lists and Links

Resource organization with links and formatted lists for clear information structure.

**Assistant Output**

````markdown
I'll organize resources using lists and links for easy navigation:

**Content Payload**

```json
{
  "content_id": "lists-links",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "### Resources\n\n- [Documentation](https://docs.example.com)\n- [API Reference](https://api.example.com)\n- [Support Forum](https://forum.example.com)\n\n**Key Features:**\n1. Real-time updates\n2. Secure authentication\n3. Cross-platform support"
  }
}
```
`````

### Table Display

Performance metrics displayed in a structured table format for easy comparison.

**Assistant Output**

````markdown
I'll present performance metrics in a clear table format:

**Content Payload**

```json
{
  "content_id": "performance-table",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## Performance Metrics\n\n| Metric | Current | Target | Status |\n|--------|---------|--------|---------|\n| Response Time | 120ms | <150ms | ✅ Good |\n| Uptime | 99.9% | >99% | ✅ Good |\n| Error Rate | 0.1% | <1% | ✅ Good |"
  }
}
```
````

### Welcome Message

example interface welcome message with process explanation and call-to-action.

**Assistant Output**

````markdown
I'll create a welcoming introduction to a sample interface with clear process steps:

**Content Payload**

```json
{
  "content_id": "example-welcome",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "Welcome to **a sample interface**! 🚀\n\nI'll help you create a prepared workspace for your organization. assistant services like ChatGPT, Claude, and Gemini often have incomplete information about organizations.\n\n**Process:**\n1. **Tell me your organization** name or website\n2. **I'll scan** what assistant clients currently know\n3. **See the gaps** in your current workflow quality\n4. **Get refined** with a professional workspace\n\nEnter your organization name or website to start!"
  }
}
```
````

### Analysis Results

example interface analysis results showing critical issues found in current workflow quality.

**Assistant Output**

````markdown
I'll present the analysis results highlighting critical issues with current workflow quality:

**Content Payload**

```json
{
  "content_id": "example-analysis",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## 📊 Analysis Complete!\n\nI've analyzed **ChatGPT**, **Claude**, and **Gemini** responses about **The Hub - Digital Innovation Studio**.\n\n⚠️ **Critical Issues Found:**\n\n❌ **Vague descriptions** - \"Technology services\" lacks specificity\n❌ **Missing contact info** - No way for customers to reach you\n❌ **Inconsistent naming** - Different names across platforms\n❌ **No service details** - Unclear what you actually offer\n\nThis is what potential customers see when they ask AI about your organization. 😬"
  }
}
```
````

### Refinement Complete

example interface refinement completion celebration with comprehensive improvement list.

**Assistant Output**

````markdown
I'll celebrate the refinement completion with a comprehensive list of improvements:

**Content Payload**

```json
{
  "content_id": "example-complete",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## 🎉 **MAKEOVER COMPLETE!**\n\nYour prepared workspace is comprehensive and assistant-readable!\n\n**Improvements:**\n✅ **Clear organization summary** with compelling value proposition\n✅ **Detailed services** explaining exactly what you do\n✅ **Complete contact info** and office hours\n✅ **Professional specialties** highlighting expertise\n✅ **Social links** properly formatted\n✅ **llms.txt file** for maximum AI compatibility\n\nThe difference is transformational! 🌙➡️☀️"
  }
}
```
````

### Publishing Success

example interface publishing success notification with workspace URLs and impact summary.

**Assistant Output**

````markdown
I'll announce the successful workspace publishing with URLs and expected impact:

**Content Payload**

```json
{
  "content_id": "example-published",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## 🎉 **Your workspace is Live!**\n\n### Workspace URLs:\n🔗 **Public Workspace:** https://example.com/thehub-digital-london\n🔗 **Dashboard:** https://example.com/dashboard\n\n### Impact:\n✅ **Workspace Published** - Now live and accessible\n✅ **Search Engines Notified** - Google & Microsoft indexing\n✅ **Workflow Quality Improved** - Accurate organization information\n✅ **llms.txt Created** - model-ready metadata\n\n**Expected Results:**\n📈 Workflow Quality Score increases within 24-48 hours\n🤖 Better assistant responses about your organization\n🎯 Consistent information across all AI platforms"
  }
}
```
````

### Style Variants

Different markdown styles for various content presentation needs: compact for dense information, default for standard content, and large for emphasis.

**Assistant Output**

````markdown
I'll demonstrate the different markdown style options for various content presentation needs:

**Compact Style Payload**

```json
{
  "content_id": "compact-content",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## Quick Summary\n\n• **Performance**: 99.9% uptime\n• **Users**: 10,245 active\n• **Growth**: +23% this quarter",
    "markdown_style": "COMPACT"
  }
}
```

**Large Style Payload**

```json
{
  "content_id": "emphasized-content",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "# 🎉 Congratulations!\n\nYour **workspace refinement** is complete! You've achieved **significant improvements** in workflow quality across all major platforms.",
    "markdown_style": "LARGE"
  }
}
```

**Default Style Payload**

```json
{
  "content_id": "standard-content",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "## Standard Content\n\nThis is regular markdown content with **standard formatting** for normal chat conversations. Perfect for explanations and regular communication.",
    "markdown_style": "DEFAULT"
  }
}
```
````

---

## Implementation Guidelines

### Best Practices

1. **Structure**: Use headers to organize content logically
2. **Emphasis**: Use **bold** for key points, _italics_ for subtle emphasis
3. **Lists**: Organize information with bullet points or numbered lists
4. **Code**: Use backticks for technical terms, code blocks for examples
5. **Links**: Include relevant resources and documentation
6. **Tables**: Present data in structured, scannable format

### Common Formatting

- **Headers**: `#` Primary, `##` Secondary, `###` Tertiary
- **Emphasis**: `**bold**`, `*italic*`, `~~strikethrough~~`
- **Code**: `inline code`, `code blocks`
- **Lists**: `- bullets`, `1. numbered`
- **Links**: `[text](url)`
- **Tables**: Use `|` separators with header row

### a sample interface-Specific Patterns

- **Status Indicators**: ✅ ❌ ⚠️ 🎯 📊 🚀
- **Organization Emphasis**: **Organization Name** in bold
- **Problem/Solution**: Use ❌ for issues, ✅ for solutions
- **Progress Indicators**: 📈 📊 🎉 for positive outcomes
- **Technical Terms**: `llms.txt`, `workspace` in code formatting

### Markdown Style Selection

- **Use COMPACT**: Dense information, status summaries, quick overviews, sidebar content
- **Use DEFAULT**: Standard explanations, regular conversations, documentation
- **Use LARGE**: Important announcements, celebrations, emphasis content, headlines

### When to Use Markdown vs Other Types

- **Use Markdown**: Text-heavy content, explanations, lists, formatted information
- **Use Buttons**: Single actions or calls-to-action
- **Use Cards**: Complex choices requiring detailed information
- **Use Chips**: Simple selections or quick confirmations
- **Use Progress Bars**: Status updates and long-running operations

---

## Complete Message Example

**Message Payload**

```json
{
  "message_id": "example-welcome-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "welcome-content",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Welcome to **a sample interface**! 🚀\n\nI'll help you create a prepared workspace for your organization.\n\n**Process:**\n1. Tell me your organization name or website\n2. I'll scan what assistant clients currently know\n3. See the gaps in your current workflow quality\n4. Get refined with a professional workspace\n\nEnter your organization name or website to start!"
      }
    }
  ]
}
```

```

```
