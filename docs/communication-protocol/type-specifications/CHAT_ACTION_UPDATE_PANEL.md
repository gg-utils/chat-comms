---
description: "Type specification for CHAT_ACTION_UPDATE_PANEL in the communication protocol. Action for updating panel content headers, body content, and visual properties. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](./README.md)**

# `CHAT_ACTION_UPDATE_PANEL` Type Specification

The `CHAT_ACTION_UPDATE_PANEL` action type allows for dynamic updates to existing `CHAT_CONTENT_PANEL` content without requiring a complete re-render. This action can modify any aspect of a panel including header information, body content, aspect ratio, and visual properties.

## Core Structure

**Basic Action Payload Format**

```json
{
  "action_id": "string", // required - unique identifier for this action
  "action_type": "CHAT_ACTION_UPDATE_PANEL", // required - must be exactly this value
  "action_data": {
    "target": "CHAT", // required - must be "CHAT"
    "panel_content_id": "string", // required - content_id of the panel to update
    "panel_header_icon": "string", // optional - new header icon
    "panel_header_title": "string", // optional - new header title
    "panel_header_description": "string", // optional - new header description
    "panel_visibility": "string", // optional - panel visibility state (VISIBLE, HIDDEN)
    "panel_body_type": "string", // optional - new body type (PANEL_BODY_MARKDOWN, PANEL_BODY_REASONING_V1_MARKDOWN, or PANEL_BODY_IMAGE)
    "panel_body_aspect_ratio": "string", // optional - new aspect ratio ("auto" or "width/height" format)
    "panel_body_data": "object", // optional - new body content data
    "panel_transitions": "array", // optional - array of transition objects for panel state changes
    "panel_effects": "array" // optional - array of effect objects for visual overlays
  }
}
```

### Properties

| Property                               | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `action_id`                            | string | Yes      | Unique identifier for this specific action                                                                                                                                                                                                                                                                                                                                                                                                 |
| `action_type`                          | string | Yes      | Must be `"CHAT_ACTION_UPDATE_PANEL"`                                                                                                                                                                                                                                                                                                                                                                                                       |
| `action_data.target`                   | string | Yes      | Must be `"CHAT"` to indicate the target interface                                                                                                                                                                                                                                                                                                                                                                                          |
| `action_data.panel_content_id`         | string | Yes      | The `content_id` of the panel to update                                                                                                                                                                                                                                                                                                                                                                                                    |
| `action_data.panel_header_icon`        | string | No       | New icon for panel header                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `action_data.panel_header_title`       | string | No       | New title for panel header                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `action_data.panel_header_description` | string | No       | New description for panel header                                                                                                                                                                                                                                                                                                                                                                                                           |
| `action_data.panel_visibility`         | string | No       | Panel visibility state: `"VISIBLE"` or `"HIDDEN"`                                                                                                                                                                                                                                                                                                                                                                                          |
| `action_data.panel_body_type`          | string | No       | New body type: `"PANEL_BODY_MARKDOWN"`, `"PANEL_BODY_REASONING_V1_MARKDOWN"`, `"PANEL_BODY_IMAGE"`, `"PANEL_BODY_GOOGLE_SEARCH_HOME"`, `"PANEL_BODY_GOOGLE_SEARCH_RESULT"`, `"PANEL_BODY_GOOGLE_MAPS_HOME"`, `"PANEL_BODY_GOOGLE_MAPS_REVIEWS"`, `"PANEL_BODY_CHATGPT_HOME"`, `"PANEL_BODY_CHATGPT_RESULT"`, `"PANEL_BODY_GEMINI_HOME"`, `"PANEL_BODY_GEMINI_RESULT"`, `"PANEL_BODY_PERPLEXITY_HOME"`, or `"PANEL_BODY_PERPLEXITY_RESULT"` |
| `action_data.panel_body_aspect_ratio`  | string | No       | New aspect ratio: `"auto"` (adjusts to content) or `"width/height"` format (e.g., `"16/9"`, `"4/3"`)                                                                                                                                                                                                                                                                                                                                       |
| `action_data.panel_body_data`          | object | No       | New body content data, structure depends on `panel_body_type`                                                                                                                                                                                                                                                                                                                                                                              |
| `action_data.panel_transitions`        | array  | No       | Animation transitions for panel state changes as an array of transition objects containing `animation_trigger`, `animation_type`, and `animation_framer_motion_attributes`                                                                                                                                                                                                                                                                 |
| `action_data.panel_effects`            | array  | No       | Visual overlay effects for panel as an array of effect objects containing `effect_type`, `effect_state`, and `effect_framer_motion_attributes`. See [PANEL_EFFECT Specification](../specialized-structures/PANEL_EFFECT.md).                                                                                                                                                                                                               |

## Panel Visibility States

- **`VISIBLE`**: Panel is displayed normally and accessible to users
- **`HIDDEN`**: Panel is hidden from view but retains its content and state

## Update Requirements

At least one of the following properties must be provided for a valid update:

- `panel_header_icon`: Update the header icon
- `panel_header_title`: Update the header title
- `panel_header_description`: Update the header description
- `panel_visibility`: Control panel visibility (show/hide)
- `panel_body_type`: Change the body content type
- `panel_body_aspect_ratio`: Modify the aspect ratio
- `panel_body_data`: Update the body content
- `panel_transitions`: Update animation transitions for panel state changes

## Body Data Structures

### For PANEL_BODY_MARKDOWN

When updating to or within markdown body type:

```json
{
  "panel_body_data": {
    "markdown": "string" // required - new markdown content
  }
}
```

### For PANEL_BODY_REASONING_V1_MARKDOWN

When updating to or within reasoning markdown body type (for AI thought processes):

```json
{
  "panel_body_data": {
    "markdown": "string" // required - new reasoning markdown content
  }
}
```

### For PANEL_BODY_IMAGE

When updating to or within image body type:

```json
{
  "panel_body_data": {
    "image_url": "string", // required - new image URL
    "image_alt_text": "string", // required - new alt text
    "image_gravity": "string", // optional - new positioning
    "image_sizing": "string", // optional - new sizing behavior
    "image_animation_type": "string", // optional - new animation
    "image_animation_framer_motion_attributes": "object" // optional - new animation config
  }
}
```

### For PANEL_BODY_GOOGLE_SEARCH_HOME

When updating to or within Google Search Home body type:

```json
{
  "panel_body_data": {
    "search_query": "string" // required - new search query text that will be animated
  }
}
```

### For PANEL_BODY_GOOGLE_SEARCH_RESULT

When updating to or within Google Search Result body type:

```json
{
  "panel_body_data": {
    "google_custom_search_items": "array" // required - new array of Google Custom Search API result items
  }
}
```

### For PANEL_BODY_GOOGLE_MAPS_HOME

When updating to or within Google Maps Home body type:

```json
{
  "panel_body_data": {
    "search_query": "string" // required - new search query text that will be animated
  }
}
```

### For PANEL_BODY_GOOGLE_MAPS_REVIEWS

When updating to or within Google Maps Reviews body type:

```json
{
  "panel_body_data": {
    "reviews": "array" // required - new array of Google Places API review objects
  }
}
```

### For PANEL_BODY_CHATGPT_HOME

When updating to or within ChatGPT Home body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - new user prompt text that will be animated
  }
}
```

### For PANEL_BODY_CHATGPT_RESULT

When updating to or within ChatGPT Result body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - new markdown-formatted response from assistant
  }
}
```

### For PANEL_BODY_GEMINI_HOME

When updating to or within Gemini Home body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - new user prompt text that will be animated
  }
}
```

### For PANEL_BODY_GEMINI_RESULT

When updating to or within Gemini Result body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - new markdown-formatted Gemini response (can be streamed/updated incrementally)
  }
}
```

### For PANEL_BODY_PERPLEXITY_HOME

When updating to or within Perplexity Home body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - new user prompt text that will be animated
  }
}
```

### For PANEL_BODY_PERPLEXITY_RESULT

When updating to or within Perplexity Result body type:

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - new markdown-formatted Perplexity response (can be streamed/updated incrementally)
  }
}
```

## Panel Transitions Updates

When updating `panel_transitions`, you can modify the animation effects for different panel state changes. The structure now uses an array of transition objects with explicit triggers:

```json
{
  "panel_transitions": [
    {
      "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
      "animation_type": "ANIMATION_TYPE_EXPAND_UP",
      "animation_framer_motion_attributes": {
        "delay": 0.1,
        "duration": 1.5,
        "ease": "easeOut"
      }
    },
    {
      "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
      "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
      "animation_framer_motion_attributes": {
        "delay": 0.3,
        "duration": 3.0,
        "ease": "easeInOut"
      }
    }
  ]
}
```

### Partial Transition Updates

You can update individual transition events without affecting others:

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_FADE_IN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 0.8,
          "ease": "easeOut"
        }
      }
    ]
  }
}
```

For complete details on animation types and Framer Motion attributes, see:

- [PANEL_ANIMATION Specification](../specialized-structures/PANEL_ANIMATION.md)
- [Framer Motion Attributes Reference](../utils/FRAMER_MOTION_ATTRIBUTES.md)

## Panel Effects Updates

When updating `panel_effects`, you can set or replace visual overlay effects for the panel. Effects are defined as objects with `effect_type` and `effect_framer_motion_attributes`.

```json
{
  "panel_effects": [
    {
      "effect_type": "EFFECT_LASER_SWEEP",
      "effect_state": "EFFECT_STATE_ENABLED",
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
  ]
}
```

Use effect delays to align with body open transitions when desired. See [PANEL_EFFECT Specification](../specialized-structures/PANEL_EFFECT.md) for details.

## Update Patterns

### Header-Only Updates

Update just the header information without changing body content:

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_header_title": "Updated Analysis Results",
    "panel_header_description": "Refreshed data from latest research intelligence scan"
  }
}
```

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_header_icon": "panel-icon-ai-analysis"
  }
}
```

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_header_description": null
  }
}
```

### Panel Visibility Updates

Control panel visibility without modifying content:

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "panel-ai-search-results-123",
    "panel_visibility": "HIDDEN"
  }
}
```

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "panel-ai-search-results-123",
    "panel_visibility": "VISIBLE"
  }
}
```

### Body Content Updates

Update the panel body while preserving header information:

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_body_data": {
      "markdown": "## New Results\n\nLatest findings from the updated analysis..."
    }
  }
}
```

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_data": {
      "image_url": "https://example.com/new-screenshot.png",
      "image_alt_text": "Updated website screenshot"
    }
  }
}
```

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_body_data": {
      "image_url": "https://example.com/existing-screenshot.png",
      "image_alt_text": "Updated website screenshot",
      "image_animation_type": "IMAGE_ANIMATION_FADE_IN",
      "image_animation_framer_motion_attributes": {
        "delay": 0.3,
        "duration": 1.5,
        "ease": "easeOut"
      }
    }
  }
}
```

### Complete Panel Updates

Update multiple aspects of the panel simultaneously:

```json
{
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_header_title": "Live Website Preview",
    "panel_header_description": "Real-time capture of homepage updates",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "image_url": "https://example.com/live-capture.png",
      "image_alt_text": "Live homepage capture showing recent updates"
    }
  }
}
```

### Complete Message Example with Panel Hide Action

Here's a complete message example showing how to hide a panel using `CHAT_CONTENT_ACTION_WRAPPER`:

```json
{
  "message_id": "chatmessage-website-hide",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-website-hide",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_group_id": "891u2e9whj1njoasd98as",
      "content_data": {
        "action": {
          "action_id": "website-hide-action",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "panel-ai-search-results-123",
            "panel_header_title": null,
            "panel_visibility": "HIDDEN",
            "panel_body_type": "PANEL_BODY_MARKDOWN",
            "panel_body_data": {
              "markdown": null
            }
          }
        }
      }
    }
  ]
}
```

## JSON Schema Definition

```json
{
  "type": "object",
  "required": ["action_id", "action_type", "action_data"],
  "properties": {
    "action_id": {
      "type": "string",
      "description": "Unique identifier for this panel update action."
    },
    "action_type": {
      "type": "string",
      "enum": ["CHAT_ACTION_UPDATE_PANEL"],
      "description": "The specific type of action, which is CHAT_ACTION_UPDATE_PANEL."
    },
    "action_data": {
      "type": "object",
      "required": ["target", "panel_content_id"],
      "properties": {
        "target": {
          "type": "string",
          "enum": ["CHAT"],
          "description": "The target interface for this action, must be CHAT."
        },
        "panel_content_id": {
          "type": "string",
          "description": "The content_id of the panel to update."
        },
        "panel_header_icon": {
          "type": "string",
          "description": "New icon for the panel header."
        },
        "panel_header_title": {
          "type": "string",
          "description": "New title for the panel header."
        },
        "panel_header_description": {
          "type": "string",
          "description": "New description for the panel header."
        },
        "panel_visibility": {
          "type": "string",
          "enum": ["VISIBLE", "HIDDEN"],
          "description": "Panel visibility state. VISIBLE shows the panel, HIDDEN hides it from view."
        },
        "panel_body_type": {
          "type": "string",
          "enum": [
            "PANEL_BODY_MARKDOWN",
            "PANEL_BODY_REASONING_V1_MARKDOWN",
            "PANEL_BODY_IMAGE",
            "PANEL_BODY_GOOGLE_SEARCH_HOME",
            "PANEL_BODY_GOOGLE_SEARCH_RESULT",
            "PANEL_BODY_GOOGLE_MAPS_HOME",
            "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
            "PANEL_BODY_CHATGPT_HOME",
            "PANEL_BODY_CHATGPT_RESULT",
            "PANEL_BODY_GEMINI_HOME",
            "PANEL_BODY_GEMINI_RESULT",
            "PANEL_BODY_PERPLEXITY_HOME",
            "PANEL_BODY_PERPLEXITY_RESULT"
          ],
          "description": "New body content type for the panel."
        },
        "panel_body_aspect_ratio": {
          "type": "string",
          "pattern": "^(auto|\\d+/\\d+)$",
          "description": "New aspect ratio: 'auto' (panel height adjusts to content) or width/height format (e.g., '16/9', '4/3'). Use 'auto' for reasoning panels or variable-length content."
        },
        "panel_transitions": {
          "type": "array",
          "items": {
            "type": "object",
            "required": [
              "animation_trigger",
              "animation_type",
              "animation_framer_motion_attributes"
            ],
            "properties": {
              "animation_trigger": {
                "type": "string",
                "enum": [
                  "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
                  "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
                  "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
                  "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
                  "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED"
                ],
                "description": "Event that triggers this animation."
              },
              "animation_type": {
                "type": "string",
                "description": "Type of animation to perform."
              },
              "animation_framer_motion_attributes": {
                "type": "object",
                "description": "Framer Motion animation configuration parameters."
              }
            },
            "additionalProperties": false
          },
          "description": "Optional list of animation transitions for panel state changes."
        },
        "panel_effects": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["effect_type", "effect_framer_motion_attributes"],
            "properties": {
              "effect_type": {
                "type": "string",
                "enum": ["EFFECT_LASER_SWEEP"],
                "description": "Type of panel effect to apply."
              },
              "effect_state": {
                "type": "string",
                "enum": ["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"],
                "default": "EFFECT_STATE_ENABLED",
                "description": "Whether the effect is enabled or disabled."
              },
              "effect_framer_motion_attributes": {
                "type": "object",
                "description": "Framer Motion effect configuration (supports delay, duration, ease, repeat, repeatDelay, repeatType, opacity: { delay, duration })."
              }
            },
            "additionalProperties": false
          },
          "description": "Optional list of visual overlay effects for the panel."
        },
        "panel_body_data": {
          "type": "object",
          "description": "New body content data, structure depends on panel_body_type.",
          "oneOf": [
            {
              "properties": {
                "markdown": {
                  "type": "string",
                  "description": "Markdown content for PANEL_BODY_MARKDOWN type."
                }
              },
              "required": ["markdown"],
              "additionalProperties": false
            },
            {
              "properties": {
                "image_url": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the image resource."
                },
                "image_alt_text": {
                  "type": "string",
                  "description": "Alternative text for accessibility."
                },
                "image_gravity": {
                  "type": "string",
                  "enum": [
                    "IMAGE_GRAVITY_TOP_LEFT",
                    "IMAGE_GRAVITY_TOP_CENTER",
                    "IMAGE_GRAVITY_TOP_RIGHT",
                    "IMAGE_GRAVITY_CENTER_LEFT",
                    "IMAGE_GRAVITY_CENTER",
                    "IMAGE_GRAVITY_CENTER_RIGHT",
                    "IMAGE_GRAVITY_BOTTOM_LEFT",
                    "IMAGE_GRAVITY_BOTTOM_CENTER",
                    "IMAGE_GRAVITY_BOTTOM_RIGHT"
                  ],
                  "default": "IMAGE_GRAVITY_TOP_CENTER",
                  "description": "Image positioning within container. Defaults to IMAGE_GRAVITY_TOP_CENTER."
                },
                "image_sizing": {
                  "type": "string",
                  "enum": [
                    "IMAGE_SIZING_COVER",
                    "IMAGE_SIZING_CONTAIN",
                    "IMAGE_SIZING_FILL",
                    "IMAGE_SIZING_SCALE_DOWN",
                    "IMAGE_SIZING_STRETCH",
                    "IMAGE_SIZING_FIT_WIDTH",
                    "IMAGE_SIZING_FIT_HEIGHT"
                  ],
                  "default": "IMAGE_SIZING_COVER",
                  "description": "How image fills the container. Defaults to IMAGE_SIZING_COVER."
                },
                "image_animation_type": {
                  "type": "string",
                  "enum": [
                    "IMAGE_ANIMATION_NONE",
                    "IMAGE_ANIMATION_SCROLL_DOWN",
                    "IMAGE_ANIMATION_FADE_IN",
                    "IMAGE_ANIMATION_ZOOM_IN"
                  ],
                  "default": "IMAGE_ANIMATION_NONE",
                  "description": "Animation effect for the image. Defaults to IMAGE_ANIMATION_NONE (static display according to image_gravity and image_sizing)."
                },
                "image_animation_framer_motion_attributes": {
                  "type": "object",
                  "properties": {
                    "delay": {
                      "type": "number",
                      "description": "Animation delay in seconds."
                    },
                    "duration": {
                      "type": "number",
                      "description": "Animation duration in seconds."
                    },
                    "ease": {
                      "type": "string",
                      "description": "Animation easing function."
                    }
                  },
                  "description": "Framer Motion animation configuration. Ignored when image_animation_type is IMAGE_ANIMATION_NONE (static display)."
                }
              },
              "required": ["image_url", "image_alt_text"],
              "additionalProperties": false
            },
            {
              "properties": {
                "search_query": {
                  "type": "string",
                  "description": "Search query text for PANEL_BODY_GOOGLE_SEARCH_HOME type."
                }
              },
              "required": ["search_query"],
              "additionalProperties": false
            },
            {
              "properties": {
                "google_custom_search_items": {
                  "type": "array",
                  "description": "Array of Google Custom Search API result items for PANEL_BODY_GOOGLE_SEARCH_RESULT type."
                }
              },
              "required": ["google_custom_search_items"],
              "additionalProperties": false
            },
            {
              "properties": {
                "search_query": {
                  "type": "string",
                  "description": "Search query text for PANEL_BODY_GOOGLE_MAPS_HOME type."
                }
              },
              "required": ["search_query"],
              "additionalProperties": false
            },
            {
              "properties": {
                "reviews": {
                  "type": "array",
                  "description": "Array of Google Places API review objects for PANEL_BODY_GOOGLE_MAPS_REVIEWS type."
                }
              },
              "required": ["reviews"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "User prompt text for PANEL_BODY_CHATGPT_HOME type."
                }
              },
              "required": ["user_prompt"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "Original user prompt for PANEL_BODY_CHATGPT_RESULT type."
                },
                "assistant_response": {
                  "type": "string",
                  "description": "Markdown-formatted assistant response for PANEL_BODY_CHATGPT_RESULT type."
                }
              },
              "required": ["user_prompt", "assistant_response"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "User prompt text for PANEL_BODY_GEMINI_HOME type."
                }
              },
              "required": ["user_prompt"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "Original user prompt for PANEL_BODY_GEMINI_RESULT type."
                },
                "assistant_response": {
                  "type": "string",
                  "description": "Markdown-formatted assistant response for PANEL_BODY_GEMINI_RESULT type."
                }
              },
              "required": ["user_prompt", "assistant_response"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "User prompt text for PANEL_BODY_PERPLEXITY_HOME type."
                }
              },
              "required": ["user_prompt"],
              "additionalProperties": false
            },
            {
              "properties": {
                "user_prompt": {
                  "type": "string",
                  "description": "Original user prompt for PANEL_BODY_PERPLEXITY_RESULT type."
                },
                "assistant_response": {
                  "type": "string",
                  "description": "Markdown-formatted assistant response for PANEL_BODY_PERPLEXITY_RESULT type."
                }
              },
              "required": ["user_prompt", "assistant_response"],
              "additionalProperties": false
            }
          ]
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

## Validation Schemas

### Zod Schema

```typescript
import { z } from "zod";

const panelBodyMarkdownUpdateSchema = z.object({
  markdown: z.string(),
});

const panelBodyImageUpdateSchema = z.object({
  image_url: z.string().url(),
  image_alt_text: z.string(),
  image_gravity: z
    .enum([
      "IMAGE_GRAVITY_TOP_LEFT",
      "IMAGE_GRAVITY_TOP_CENTER",
      "IMAGE_GRAVITY_TOP_RIGHT",
      "IMAGE_GRAVITY_CENTER_LEFT",
      "IMAGE_GRAVITY_CENTER",
      "IMAGE_GRAVITY_CENTER_RIGHT",
      "IMAGE_GRAVITY_BOTTOM_LEFT",
      "IMAGE_GRAVITY_BOTTOM_CENTER",
      "IMAGE_GRAVITY_BOTTOM_RIGHT",
    ])
    .default("IMAGE_GRAVITY_TOP_CENTER")
    .optional(),
  image_sizing: z
    .enum([
      "IMAGE_SIZING_COVER",
      "IMAGE_SIZING_CONTAIN",
      "IMAGE_SIZING_FILL",
      "IMAGE_SIZING_SCALE_DOWN",
      "IMAGE_SIZING_STRETCH",
      "IMAGE_SIZING_FIT_WIDTH",
      "IMAGE_SIZING_FIT_HEIGHT",
    ])
    .default("IMAGE_SIZING_COVER")
    .optional(),
  image_animation_type: z
    .enum([
      "IMAGE_ANIMATION_NONE",
      "IMAGE_ANIMATION_SCROLL_DOWN",
      "IMAGE_ANIMATION_FADE_IN",
      "IMAGE_ANIMATION_ZOOM_IN",
    ])
    .default("IMAGE_ANIMATION_NONE")
    .optional(),
  image_animation_framer_motion_attributes: z
    .object({
      delay: z.number().optional(),
      duration: z.number().optional(),
      ease: z.string().optional(),
    })
    .optional(),
});

const panelBodyGoogleSearchHomeUpdateSchema = z.object({
  search_query: z.string(),
});

const panelBodyGoogleSearchResultUpdateSchema = z.object({
  google_custom_search_items: z.array(z.object({}).passthrough()),
});

const panelBodyGoogleMapsHomeUpdateSchema = z.object({
  search_query: z.string(),
});

const panelBodyGoogleMapsReviewsUpdateSchema = z.object({
  reviews: z.array(z.object({}).passthrough()),
});

const panelBodyChatGptHomeUpdateSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyChatGptResultUpdateSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelBodyGeminiHomeUpdateSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyGeminiResultUpdateSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelBodyPerplexityHomeUpdateSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyPerplexityResultUpdateSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelTransitionUpdateSchema = z.object({
  animation_trigger: z.enum([
    "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
    "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
    "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
    "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
    "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED",
  ]),
  animation_type: z.string(),
  animation_framer_motion_attributes: z.object({}).passthrough(),
});

const actionDataSchema = z
  .object({
    target: z.literal("CHAT"),
    panel_content_id: z.string(),
    panel_header_icon: z.string().optional(),
    panel_header_title: z.string().optional(),
    panel_header_description: z.string().optional(),
    panel_visibility: z.enum(["VISIBLE", "HIDDEN"]).optional(),
    panel_body_type: z
      .enum([
        "PANEL_BODY_MARKDOWN",
        "PANEL_BODY_REASONING_V1_MARKDOWN",
        "PANEL_BODY_IMAGE",
        "PANEL_BODY_GOOGLE_SEARCH_HOME",
        "PANEL_BODY_GOOGLE_SEARCH_RESULT",
        "PANEL_BODY_GOOGLE_MAPS_HOME",
        "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
        "PANEL_BODY_CHATGPT_HOME",
        "PANEL_BODY_CHATGPT_RESULT",
        "PANEL_BODY_GEMINI_HOME",
        "PANEL_BODY_GEMINI_RESULT",
        "PANEL_BODY_PERPLEXITY_HOME",
        "PANEL_BODY_PERPLEXITY_RESULT",
      ])
      .optional(),
    panel_body_aspect_ratio: z
      .string()
      .regex(/^\d+\/\d+$/)
      .optional(),
    panel_transitions: z.array(panelTransitionUpdateSchema).optional(),
    panel_effects: z
      .array(
        z.object({
          effect_type: z.enum(["EFFECT_LASER_SWEEP"]),
          effect_state: z
            .enum(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
            .default("EFFECT_STATE_ENABLED")
            .optional(),
          effect_framer_motion_attributes: z.object({}).passthrough(),
        })
      )
      .optional(),
    panel_body_data: z
      .union([
        panelBodyMarkdownUpdateSchema,
        panelBodyImageUpdateSchema,
        panelBodyGoogleSearchHomeUpdateSchema,
        panelBodyGoogleSearchResultUpdateSchema,
        panelBodyGoogleMapsHomeUpdateSchema,
        panelBodyGoogleMapsReviewsUpdateSchema,
        panelBodyChatGptHomeUpdateSchema,
        panelBodyChatGptResultUpdateSchema,
        panelBodyGeminiHomeUpdateSchema,
        panelBodyGeminiResultUpdateSchema,
        panelBodyPerplexityHomeUpdateSchema,
        panelBodyPerplexityResultUpdateSchema,
      ])
      .optional(),
  })
  .refine(
    (data) => {
      // At least one update field must be provided
      const updateFields = [
        "panel_header_icon",
        "panel_header_title",
        "panel_header_description",
        "panel_visibility",
        "panel_body_type",
        "panel_body_aspect_ratio",
        "panel_body_data",
        "panel_transitions",
      ];
      return updateFields.some((field) => data[field] !== undefined);
    },
    {
      message: "At least one panel update field must be provided",
    }
  );

const chatActionUpdatePanelSchema = z.object({
  action_id: z.string(),
  action_type: z.literal("CHAT_ACTION_UPDATE_PANEL"),
  action_data: actionDataSchema,
});
```

### Joi Schema

```javascript
const Joi = require("joi");

const panelBodyMarkdownUpdateSchema = Joi.object({
  markdown: Joi.string().required(),
});

const panelBodyImageUpdateSchema = Joi.object({
  image_url: Joi.string().uri().required(),
  image_alt_text: Joi.string().required(),
  image_gravity: Joi.string()
    .valid(
      "IMAGE_GRAVITY_TOP_LEFT",
      "IMAGE_GRAVITY_TOP_CENTER",
      "IMAGE_GRAVITY_TOP_RIGHT",
      "IMAGE_GRAVITY_CENTER_LEFT",
      "IMAGE_GRAVITY_CENTER",
      "IMAGE_GRAVITY_CENTER_RIGHT",
      "IMAGE_GRAVITY_BOTTOM_LEFT",
      "IMAGE_GRAVITY_BOTTOM_CENTER",
      "IMAGE_GRAVITY_BOTTOM_RIGHT"
    )
    .default("IMAGE_GRAVITY_TOP_CENTER"),
  image_sizing: Joi.string()
    .valid(
      "IMAGE_SIZING_COVER",
      "IMAGE_SIZING_CONTAIN",
      "IMAGE_SIZING_FILL",
      "IMAGE_SIZING_SCALE_DOWN",
      "IMAGE_SIZING_STRETCH",
      "IMAGE_SIZING_FIT_WIDTH",
      "IMAGE_SIZING_FIT_HEIGHT"
    )
    .default("IMAGE_SIZING_COVER"),
  image_animation_type: Joi.string()
    .valid(
      "IMAGE_ANIMATION_NONE",
      "IMAGE_ANIMATION_SCROLL_DOWN",
      "IMAGE_ANIMATION_FADE_IN",
      "IMAGE_ANIMATION_ZOOM_IN"
    )
    .default("IMAGE_ANIMATION_NONE"),
  image_animation_framer_motion_attributes: Joi.object({
    delay: Joi.number(),
    duration: Joi.number(),
    ease: Joi.string(),
  }),
});

const panelBodyGoogleSearchHomeUpdateSchema = Joi.object({
  search_query: Joi.string().required(),
});

const panelBodyGoogleSearchResultUpdateSchema = Joi.object({
  google_custom_search_items: Joi.array().required(),
});

const panelBodyGoogleMapsHomeUpdateSchema = Joi.object({
  search_query: Joi.string().required(),
});

const panelBodyGoogleMapsReviewsUpdateSchema = Joi.object({
  reviews: Joi.array().required(),
});

const panelBodyChatGptHomeUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyChatGptResultUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelBodyGeminiHomeUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyGeminiResultUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelBodyPerplexityHomeUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyPerplexityResultUpdateSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelTransitionUpdateSchema = Joi.object({
  animation_trigger: Joi.string()
    .valid(
      "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
      "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
      "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
      "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
      "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED"
    )
    .required(),
  animation_type: Joi.string().required(),
  animation_framer_motion_attributes: Joi.object().required(),
});

const actionDataSchema = Joi.object({
  target: Joi.string().valid("CHAT").required(),
  panel_content_id: Joi.string().required(),
  panel_header_icon: Joi.string(),
  panel_header_title: Joi.string(),
  panel_header_description: Joi.string(),
  panel_visibility: Joi.string().valid("VISIBLE", "HIDDEN"),
  panel_body_type: Joi.string().valid(
    "PANEL_BODY_MARKDOWN",
    "PANEL_BODY_IMAGE",
    "PANEL_BODY_GOOGLE_SEARCH_HOME",
    "PANEL_BODY_GOOGLE_SEARCH_RESULT",
    "PANEL_BODY_GOOGLE_MAPS_HOME",
    "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
    "PANEL_BODY_CHATGPT_HOME",
    "PANEL_BODY_CHATGPT_RESULT",
    "PANEL_BODY_GEMINI_HOME",
    "PANEL_BODY_GEMINI_RESULT",
    "PANEL_BODY_PERPLEXITY_HOME",
    "PANEL_BODY_PERPLEXITY_RESULT"
  ),
  panel_body_aspect_ratio: Joi.string().pattern(/^\d+\/\d+$/),
  panel_transitions: Joi.array().items(panelTransitionUpdateSchema),
  panel_effects: Joi.array().items(
    Joi.object({
      effect_type: Joi.string().valid("EFFECT_LASER_SWEEP").required(),
      effect_state: Joi.string()
        .valid("EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED")
        .default("EFFECT_STATE_ENABLED"),
      effect_framer_motion_attributes: Joi.object().required(),
    }).unknown(false)
  ),
  panel_body_data: Joi.alternatives().try(
    panelBodyMarkdownUpdateSchema,
    panelBodyImageUpdateSchema,
    panelBodyGoogleSearchHomeUpdateSchema,
    panelBodyGoogleSearchResultUpdateSchema,
    panelBodyGoogleMapsHomeUpdateSchema,
    panelBodyGoogleMapsReviewsUpdateSchema,
    panelBodyChatGptHomeUpdateSchema,
    panelBodyChatGptResultUpdateSchema,
    panelBodyGeminiHomeUpdateSchema,
    panelBodyGeminiResultUpdateSchema,
    panelBodyPerplexityHomeUpdateSchema,
    panelBodyPerplexityResultUpdateSchema
  ),
})
  .custom((value, helpers) => {
    const updateFields = [
      "panel_header_icon",
      "panel_header_title",
      "panel_header_description",
      "panel_visibility",
      "panel_body_type",
      "panel_body_aspect_ratio",
      "panel_body_data",
      "panel_transitions",
    ];

    const hasUpdate = updateFields.some((field) => value[field] !== undefined);
    if (!hasUpdate) {
      return helpers.error("custom.at-least-one-update");
    }
    return value;
  }, "At least one panel update field validation")
  .messages({
    "custom.at-least-one-update": "At least one panel update field must be provided",
  });

const chatActionUpdatePanelSchema = Joi.object({
  action_id: Joi.string().required(),
  action_type: Joi.string().valid("CHAT_ACTION_UPDATE_PANEL").required(),
  action_data: actionDataSchema.required(),
});
```

### Yup Schema

```javascript
const yup = require("yup");

const panelBodyMarkdownUpdateSchema = yup.object().shape({
  markdown: yup.string().required(),
});

const panelBodyImageUpdateSchema = yup.object().shape({
  image_url: yup.string().url().required(),
  image_alt_text: yup.string().required(),
  image_gravity: yup
    .string()
    .oneOf([
      "IMAGE_GRAVITY_TOP_LEFT",
      "IMAGE_GRAVITY_TOP_CENTER",
      "IMAGE_GRAVITY_TOP_RIGHT",
      "IMAGE_GRAVITY_CENTER_LEFT",
      "IMAGE_GRAVITY_CENTER",
      "IMAGE_GRAVITY_CENTER_RIGHT",
      "IMAGE_GRAVITY_BOTTOM_LEFT",
      "IMAGE_GRAVITY_BOTTOM_CENTER",
      "IMAGE_GRAVITY_BOTTOM_RIGHT",
    ])
    .default("IMAGE_GRAVITY_TOP_CENTER"),
  image_sizing: yup
    .string()
    .oneOf([
      "IMAGE_SIZING_COVER",
      "IMAGE_SIZING_CONTAIN",
      "IMAGE_SIZING_FILL",
      "IMAGE_SIZING_SCALE_DOWN",
      "IMAGE_SIZING_STRETCH",
      "IMAGE_SIZING_FIT_WIDTH",
      "IMAGE_SIZING_FIT_HEIGHT",
    ])
    .default("IMAGE_SIZING_COVER"),
  image_animation_type: yup
    .string()
    .oneOf([
      "IMAGE_ANIMATION_NONE",
      "IMAGE_ANIMATION_SCROLL_DOWN",
      "IMAGE_ANIMATION_FADE_IN",
      "IMAGE_ANIMATION_ZOOM_IN",
    ])
    .default("IMAGE_ANIMATION_NONE"),
  image_animation_framer_motion_attributes: yup.object().shape({
    delay: yup.number(),
    duration: yup.number(),
    ease: yup.string(),
  }),
});

const panelBodyGoogleSearchHomeUpdateSchema = yup.object().shape({
  search_query: yup.string().required(),
});

const panelBodyGoogleSearchResultUpdateSchema = yup.object().shape({
  google_custom_search_items: yup.array().required(),
});

const panelBodyGoogleMapsHomeUpdateSchema = yup.object().shape({
  search_query: yup.string().required(),
});

const panelBodyGoogleMapsReviewsUpdateSchema = yup.object().shape({
  reviews: yup.array().required(),
});

const panelBodyChatGptHomeUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyChatGptResultUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelBodyGeminiHomeUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyGeminiResultUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelBodyPerplexityHomeUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyPerplexityResultUpdateSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelTransitionUpdateSchemaYup = yup.object().shape({
  animation_trigger: yup
    .string()
    .oneOf([
      "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
      "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
      "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
      "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
      "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED",
    ])
    .required(),
  animation_type: yup.string().required(),
  animation_framer_motion_attributes: yup.object().required(),
});

const actionDataSchema = yup
  .object()
  .shape({
    target: yup.string().oneOf(["CHAT"]).required(),
    panel_content_id: yup.string().required(),
    panel_header_icon: yup.string(),
    panel_header_title: yup.string(),
    panel_header_description: yup.string(),
    panel_visibility: yup.string().oneOf(["VISIBLE", "HIDDEN"]),
    panel_body_type: yup
      .string()
      .oneOf([
        "PANEL_BODY_MARKDOWN",
        "PANEL_BODY_IMAGE",
        "PANEL_BODY_GOOGLE_SEARCH_HOME",
        "PANEL_BODY_GOOGLE_SEARCH_RESULT",
        "PANEL_BODY_GOOGLE_MAPS_HOME",
        "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
        "PANEL_BODY_CHATGPT_HOME",
        "PANEL_BODY_CHATGPT_RESULT",
        "PANEL_BODY_GEMINI_HOME",
        "PANEL_BODY_GEMINI_RESULT",
        "PANEL_BODY_PERPLEXITY_HOME",
        "PANEL_BODY_PERPLEXITY_RESULT",
      ]),
    panel_body_aspect_ratio: yup.string().matches(/^\d+\/\d+$/),
    panel_transitions: yup.array().of(panelTransitionUpdateSchemaYup),
    panel_effects: yup.array().of(
      yup
        .object()
        .shape({
          effect_type: yup.string().oneOf(["EFFECT_LASER_SWEEP"]).required(),
          effect_state: yup
            .string()
            .oneOf(["EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED"])
            .default("EFFECT_STATE_ENABLED"),
          effect_framer_motion_attributes: yup.object().required(),
        })
        .noUnknown(true)
    ),
    panel_body_data: yup.lazy((value) => {
      if (value && typeof value === "object") {
        if ("markdown" in value) return panelBodyMarkdownUpdateSchema;
        if ("image_url" in value) return panelBodyImageUpdateSchema;
        if ("search_query" in value) return panelBodyGoogleSearchHomeUpdateSchema; // Both Google Search and Maps Home use search_query
        if ("google_custom_search_items" in value) return panelBodyGoogleSearchResultUpdateSchema;
        if ("reviews" in value) return panelBodyGoogleMapsReviewsUpdateSchema;
        if ("user_prompt" in value && !("assistant_response" in value))
          return panelBodyChatGptHomeUpdateSchema;
        if ("user_prompt" in value) return panelBodyChatGptResultUpdateSchema;
      }
      return yup.mixed();
    }),
  })
  .test(
    "at-least-one-update",
    "At least one panel update field must be provided",
    function (value) {
      const updateFields = [
        "panel_header_icon",
        "panel_header_title",
        "panel_header_description",
        "panel_visibility",
        "panel_body_type",
        "panel_body_aspect_ratio",
        "panel_body_data",
        "panel_transitions",
      ];

      return updateFields.some((field) => value[field] !== undefined);
    }
  );

const chatActionUpdatePanelSchema = yup.object().shape({
  action_id: yup.string().required(),
  action_type: yup.string().oneOf(["CHAT_ACTION_UPDATE_PANEL"]).required(),
  action_data: actionDataSchema.required(),
});
```

## Content Queue Processing

When `CHAT_ACTION_UPDATE_PANEL` actions are delivered via `CHAT_CONTENT_ACTION_WRAPPER`, the wrapper's `content_queue` property determines which processing queue the action is assigned to. This enables parallel processing of panel updates alongside other content types.

### Queue Assignment

The action itself does not have a `content_queue` property. Instead, the queue is specified on the wrapping content:

```json
{
  "content_id": "action-wrapper-reasoning-update",
  "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
  "content_queue": "reasoning",
  "content_data": {
    "action": {
      "action_id": "reasoning-panel-update-001",
      "action_type": "CHAT_ACTION_UPDATE_PANEL",
      "action_data": {
        "target": "CHAT",
        "panel_content_id": "reasoning-panel-001",
        "panel_body_data": {
          "markdown": "Analyzing organization website..."
        }
      }
    }
  }
}
```

### Parallel Processing Benefits

Using named queues for panel update actions enables:

- **Parallel Panel Updates**: Multiple panels (e.g., reasoning panel, website panel) can update simultaneously
- **Non-Blocking Updates**: Panel updates in separate queues don't block each other or the main content queue
- **Coordinated Animations**: Related updates can share a queue for sequential processing

### Queue Recommendations

| Panel Type                | Recommended Queue | Rationale                                                     |
| ------------------------- | ----------------- | ------------------------------------------------------------- |
| Reasoning panels          | `"reasoning"`     | Allows streaming reasoning updates without blocking main chat |
| Website/screenshot panels | `"website"`       | Enables website screenshot updates in parallel with reasoning |
| Progress indicators       | `"main"`          | Keeps progress visible in the main content flow               |
| Error/status panels       | `"main"`          | Ensures errors are processed in order with related content    |

For detailed information about content queue processing, see [CHAT_CONTENT Queue Processing](../specialized-structures/CHAT_CONTENT.md#content-queue-processing).

## Usage Guidelines

### When to Use Panel Updates

- **Real-time Content Changes**: Update panel content as data becomes available
- **Progressive Enhancement**: Add more detail to panels as processing completes
- **Dynamic Responses**: Change panel content based on user interactions
- **Status Transitions**: Update headers and content to reflect changing states
- **Content Type Switching**: Convert between markdown and image content types
- **Panel Visibility Control**: Show or hide panels based on user interactions or system states

### Update Strategies

1. **Incremental Updates**: Update only the specific fields that have changed
2. **Header Refreshes**: Update titles and descriptions to reflect new states
3. **Content Replacement**: Replace entire body content while preserving headers
4. **Visual Enhancements**: Update aspect ratios and animations for better presentation
5. **Progressive Loading**: Start with basic content and enhance with richer details

### Best Practices

1. **Targeted Updates**: Only update the fields that actually need to change
2. **Preserve Context**: Maintain panel identity while updating content
3. **Smooth Transitions**: Use animations to make updates feel natural
4. **Error Handling**: Gracefully handle update failures with fallback content
5. **Performance**: Batch related updates to minimize re-renders

### Common Update Scenarios

- **Progress Updates**: Update descriptions to show current progress status
- **Content Refresh**: Replace outdated content with fresh information
- **Media Updates**: Switch from placeholder to actual screenshots or images
- **Error States**: Update panels to show error information when operations fail
- **Completion States**: Transform panels to show final results when processing completes

## Examples

For comprehensive usage examples and implementation patterns, see the [CHAT_ACTION_UPDATE_PANEL Usage Examples](../type-usage-examples/CHAT_ACTION_UPDATE_PANEL.md) documentation.
