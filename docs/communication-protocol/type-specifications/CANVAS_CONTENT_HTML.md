---
description: "Specification for CANVAS_CONTENT_HTML in the communication protocol. This file defines the complete specification and core structure for rendering raw HTML content within canvas interfaces. Security note: No sanitization is performed by the protocol for this type; consumers may apply their own sanitization policies if desired. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **↩️ Back to [Type Specifications](../README.md)**

# CANVAS_CONTENT_HTML Specification

## Specification

### Type Definition

`CANVAS_CONTENT_HTML` is a content type that renders raw HTML within canvas interfaces. It is intended for cases where HTML output is already trusted or pre-processed by the application. The protocol itself performs no sanitization.

## Example Full Content Payload

This shows an example of a complete `CANVAS_CONTENT_HTML` object.

**Content Payload**

```json
{
  "content_id": "canvas-html-example-001",
  "content_type": "CANVAS_CONTENT_HTML",
  "content_data": {
    "html": "<div><h2>Status</h2><p>All systems nominal.</p></div>"
  }
}
```

### Properties

| Property            | Type   | Required | Description                                                         |
| ------------------- | ------ | -------- | ------------------------------------------------------------------- |
| `content_id`        | string | Yes      | Unique identifier for this content within the canvas                |
| `content_type`      | string | Yes      | Must be `"CANVAS_CONTENT_HTML"`                                     |
| `content_data.html` | string | Yes      | Raw HTML string to render. No sanitization is performed by protocol |

## JSON Schema Definition for `content_data`

The `content_data` for `CANVAS_CONTENT_HTML` adheres to the following schema:

```json
{
  "type": "object",
  "required": ["html"],
  "properties": {
    "html": {
      "type": "string",
      "description": "Raw HTML content to render. No sanitization is applied by the protocol."
    }
  },
  "additionalProperties": false
}
```

## Zod Schema Definition for `content_data`

```typescript
import { z } from "zod";

const contentDataSchema = z.object({
  html: z.string(),
});
```

## Joi Schema Definition for `content_data`

```javascript
const Joi = require("joi");

const contentDataSchema = Joi.object({
  html: Joi.string().required(),
}).unknown(false);
```

## Yup Schema Definition for `content_data`

```javascript
import * as yup from "yup";

const contentDataSchema = yup.object().shape({
  html: yup.string().required(),
});
```

## Implementation Notes

1. Rendering: Consumers should render the `html` string directly into the canvas view.
2. Security: The protocol performs no sanitization. If the source is not fully trusted, consumers should apply an appropriate sanitization policy to mitigate XSS or injection risks.
3. Performance: Large HTML documents should be handled efficiently; consider virtualization or lazy rendering for very large DOM trees.
4. Accessibility: Ensure generated HTML maintains semantic structure and provides appropriate ARIA attributes where relevant.
