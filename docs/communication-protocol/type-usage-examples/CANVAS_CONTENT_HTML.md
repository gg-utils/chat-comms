---
description: "Usage examples for CANVAS_CONTENT_HTML type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CANVAS_CONTENT_HTML Specification](../type-specifications/CANVAS_CONTENT_HTML.md)**

# CANVAS_CONTENT_HTML Usage Examples

## Example 1: Direct Canvas Content Object

Minimal HTML content rendered in the canvas.

```json
{
  "content_id": "canvas-html-001",
  "content_queue": "main",
  "content_type": "CANVAS_CONTENT_HTML",
  "content_data": {
    "html": "<div><h2>Status</h2><p>All systems nominal.</p></div>"
  }
}
```

## Example 2: Open Canvas With HTML Content

Open a canvas with an initial HTML content block.

```json
{
  "action_type": "CANVAS_ACTION_OPEN",
  "action_data": {
    "target": "CANVAS",
    "canvas_initial_contents": [
      {
        "content_id": "intro-html",
        "content_queue": "main",
        "content_type": "CANVAS_CONTENT_HTML",
        "content_data": { "html": "<h1>Welcome</h1><p>Intro content.</p>" }
      }
    ]
  }
}
```
