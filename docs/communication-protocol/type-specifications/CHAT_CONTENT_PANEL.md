---
description: "Type specification for CHAT_CONTENT_PANEL in the communication protocol. Panel content for displaying structured information with headers and dynamic body content. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](./README.md)**

# `CHAT_CONTENT_PANEL` Type Specification

The `CHAT_CONTENT_PANEL` content type allows the creation of structured panel displays with configurable headers and dynamic body content. Panels provide a visually organized way to present information, with support for both text and image content in the body area.

## Core Structure

**Basic Payload Format**

```json
{
  "content_id": "string", // required - unique identifier for the content
  "content_type": "CHAT_CONTENT_PANEL", // required - must be exactly this value
  "content_width": "WIDTH_AUTO", // optional - defaults to WIDTH_AUTO
  "content_group_id": "string", // optional - groups content elements together
  "content_queue": "string", // optional - named queue for parallel processing, defaults to "main"
  "content_delay": "number", // optional - ms to delay after this item, before the next
  "content_data": {
    "panel_header_icon": "string", // optional - icon displayed at left of header title
    "panel_header_title": "string", // optional - main title in panel header
    "panel_header_description": "string", // optional - description below header title/icon
    "panel_visibility": "string", // optional - panel visibility state (VISIBLE, HIDDEN), defaults to VISIBLE
    "panel_body_type": "string", // required - PANEL_BODY_MARKDOWN, PANEL_BODY_REASONING_V1_MARKDOWN, PANEL_BODY_REASONING_V2_MARKDOWN, PANEL_BODY_IMAGE, PANEL_BODY_GOOGLE_SEARCH_HOME, PANEL_BODY_GOOGLE_SEARCH_RESULT, PANEL_BODY_GOOGLE_MAPS_HOME, PANEL_BODY_GOOGLE_MAPS_REVIEWS, PANEL_BODY_CHATGPT_HOME, or PANEL_BODY_CHATGPT_RESULT
    "panel_body_aspect_ratio": "string", // optional - aspect ratio like "16/9" or "auto", defaults to "16/9"
    "panel_body_data": "object", // required - content specific to panel_body_type
    "panel_transitions": "array", // optional - array of transition objects for panel state changes
    "panel_effects": "array", // optional - array of effect objects for visual overlays
    "streaming_options": "object" // optional - controls how content is streamed to the client
  }
}
```

### Properties

| Property                                | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content_id`                            | string | Yes      | Unique identifier for this content within the message                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `content_type`                          | string | Yes      | Must be `"CHAT_CONTENT_PANEL"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `content_width`                         | string | No       | Width behavior: `"WIDTH_AUTO"` or `"WIDTH_FULL"` (defaults to `"WIDTH_AUTO"`)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `content_group_id`                      | string | No       | Groups content elements together for visual and functional cohesion                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `content_queue`                         | string | No       | Named queue for parallel processing. Content in the same queue is processed sequentially, different queues run in parallel. Defaults to `"main"`. See [Content Queue Processing](../specialized-structures/CHAT_CONTENT.md#content-queue-processing).                                                                                                                                                                                                                                            |
| `content_delay`                         | number | No       | Milliseconds to delay after this content item, before the next item in the same queue. The delay is applied whenever provided. User interaction can skip the delay.                                                                                                                                                                                                                                                                                                                              |
| `content_data.panel_header_icon`        | string | No       | Icon displayed at left side of panel header title                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `content_data.panel_header_title`       | string | No       | Main title text displayed in the panel header                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `content_data.panel_header_description` | string | No       | Description text displayed below the header title and icon                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `content_data.panel_visibility`         | string | No       | Panel visibility state: `"VISIBLE"` or `"HIDDEN"` (defaults to `"VISIBLE"`)                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `content_data.panel_body_type`          | string | Yes      | Type of content in panel body: `"PANEL_BODY_MARKDOWN"`, `"PANEL_BODY_REASONING_V1_MARKDOWN"`, `"PANEL_BODY_REASONING_V2_MARKDOWN"`, `"PANEL_BODY_IMAGE"`, `"PANEL_BODY_GOOGLE_SEARCH_HOME"`, `"PANEL_BODY_GOOGLE_SEARCH_RESULT"`, `"PANEL_BODY_GOOGLE_MAPS_HOME"`, `"PANEL_BODY_GOOGLE_MAPS_REVIEWS"`, `"PANEL_BODY_CHATGPT_HOME"`, `"PANEL_BODY_CHATGPT_RESULT"`, `"PANEL_BODY_GEMINI_HOME"`, `"PANEL_BODY_GEMINI_RESULT"`, `"PANEL_BODY_PERPLEXITY_HOME"`, or `"PANEL_BODY_PERPLEXITY_RESULT"` |
| `content_data.panel_body_aspect_ratio`  | string | No       | Aspect ratio: `"auto"` (adjusts to content) or `"width/height"` format (defaults to `"16/9"`)                                                                                                                                                                                                                                                                                                                                                                                                    |
| `content_data.panel_body_data`          | object | Yes      | Body content data, structure depends on `panel_body_type`                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `content_data.panel_transitions`        | array  | No       | Animation transitions for panel state changes as an array of transition objects containing `animation_trigger`, `animation_type`, and `animation_framer_motion_attributes`                                                                                                                                                                                                                                                                                                                       |
| `content_data.panel_effects`            | array  | No       | Visual overlay effects for panel as an array of effect objects containing `effect_type`, `effect_state`, and `effect_framer_motion_attributes`. See [PANEL_EFFECT Specification](../specialized-structures/PANEL_EFFECT.md).                                                                                                                                                                                                                                                                     |
| `content_data.streaming_options`        | object | No       | Controls how content is streamed to the client, including chunk interval and duration settings                                                                                                                                                                                                                                                                                                                                                                                                   |

## Panel Header Components

### Header Icon

The `panel_header_icon` field accepts:

**Predefined Icons**

- `panel-icon-web` - General web operations
- `panel-icon-chatgpt` - ChatGPT/OpenAI operations
- `panel-icon-gemini` - Google Gemini operations
- `panel-icon-claude` - Anthropic Claude operations
- `panel-icon-perplexity` - Perplexity AI operations
- `panel-icon-deepseek` - DeepSeek operations
- `panel-icon-grok` - Grok operations
- `panel-icon-copilot` - GitHub Copilot operations
- `panel-icon-google-search` - Google Search operations
- `panel-icon-google-maps` - Google Maps operations
- `panel-icon-web-search` - Web search operations
- `panel-icon-website-crawling` - Website crawling and data extraction
- `panel-icon-data-processing` - Data analysis and processing
- `panel-icon-ai-analysis` - AI-powered analysis operations
- `panel-icon-file-upload` - File upload and management
- `panel-icon-database` - Database operations
- `panel-icon-api` - API interactions
- `panel-icon-security` - Security and authentication

**Custom Icons**

- Full URL to a custom icon image (e.g., `"https://example.com/icon.svg"`)

### Header Layout

- **Icon Position**: Left side of the header
- **Title Position**: Adjacent to icon (or left-aligned if no icon)
- **Description Position**: Below the icon and title, spanning full width

## Panel Visibility

The `panel_visibility` parameter controls whether the panel is displayed or hidden:

- **`VISIBLE`** (default): Panel is displayed normally and accessible to users
- **`HIDDEN`**: Panel is hidden from view but retains its content and state for potential future display

When a panel is hidden, it maintains its data and can be made visible again using the `CHAT_ACTION_UPDATE_PANEL` action.

## Panel Transitions

The `panel_transitions` parameter allows you to define custom animation effects for different panel state changes. It is an array of transition objects. Each transition object includes an `animation_trigger`, an `animation_type`, and an `animation_framer_motion_attributes` object.

### Supported Animation Triggers

- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE` — header becomes visible (open header)
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE` — body becomes visible (open body)
- `ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN` — body becomes hidden (close body)
- `ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN` — header becomes hidden (close header)
- `ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED` — body content finished loading (post-load effect)

### Panel Transitions Structure

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
    },
    {
      "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
      "animation_type": "ANIMATION_TYPE_COLLAPSE_UP",
      "animation_framer_motion_attributes": {
        "delay": 0.1,
        "duration": 0.3,
        "ease": "easeOut"
      }
    },
    {
      "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
      "animation_type": "ANIMATION_TYPE_COLLAPSE_DOWN",
      "animation_framer_motion_attributes": {
        "delay": 0.1,
        "duration": 0.3,
        "ease": "easeOut"
      }
    }
  ]
}
```

### Animation Types for Panel Transitions

The following `PANEL_ANIMATION` types are commonly used for panel transitions:

- **Expand Animations**: `ANIMATION_TYPE_EXPAND_UP`, `ANIMATION_TYPE_EXPAND_DOWN`
- **Collapse Animations**: `ANIMATION_TYPE_COLLAPSE_UP`, `ANIMATION_TYPE_COLLAPSE_DOWN`
- **Fade Animations**: `ANIMATION_TYPE_FADE_IN`, `ANIMATION_TYPE_FADE_OUT`
- **Slide Animations**: `ANIMATION_TYPE_SLIDE_IN_LEFT`, `ANIMATION_TYPE_SLIDE_IN_RIGHT`, `ANIMATION_TYPE_SLIDE_OUT_LEFT`, `ANIMATION_TYPE_SLIDE_OUT_RIGHT`
- **Scale/Zoom Animations**: `ANIMATION_TYPE_SCALE_IN`, `ANIMATION_TYPE_SCALE_OUT`, `ANIMATION_TYPE_ZOOM_IN`, `ANIMATION_TYPE_ZOOM_OUT`
- **Rotate Animations**: `ANIMATION_TYPE_ROTATE_IN`, `ANIMATION_TYPE_ROTATE_OUT`
- **Special Animations**: `ANIMATION_TYPE_SCROLL_DOWN`

For complete details on animation types and Framer Motion attributes, see:

- [PANEL_ANIMATION Specification](../specialized-structures/PANEL_ANIMATION.md)
- [Framer Motion Attributes Reference](../utils/FRAMER_MOTION_ATTRIBUTES.md)

### Default Behavior

When `panel_transitions` is not specified, panels use default system animations. Providing custom transitions allows for:

- **Coordinated Timing**: Stagger header and body animations for polished effects
- **Brand Consistency**: Apply consistent animation styles across your application
- **Performance Refinement**: Fine-tune animation parameters for smooth performance
- **Accessibility**: Customize animations for reduced motion preferences

## Panel Effects

The `panel_effects` parameter allows you to define visual overlay effects that complement `panel_transitions`. Effects are not tied to explicit visibility triggers and can run continuously or in repeated patterns.

### Supported Effect Types

- `EFFECT_LASER_SWEEP` — a repeating, mirrored sweep effect across the panel body area

### Panel Effects Structure

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

Effect defaults are conceptually aligned to start after the body open transition completes. For full details, see the [PANEL_EFFECT Specification](../specialized-structures/PANEL_EFFECT.md).

## Streaming Options

The `streaming_options` parameter allows fine-grained control over how panel content is streamed to the client. This is particularly useful for creating smooth, timed content delivery effects.

There are two mutually exclusive modes - use ONE mode, not both:

### Mode 1: Manual Chunking

Use `chunkInterval` + `chunkSize` for explicit control over streaming behavior.

```json
{
  "streaming_options": {
    "chunkInterval": 50,
    "chunkSize": 100
  }
}
```

### Mode 2: Duration-Based

Use `desiredTotalDuration` + `maximumDuration` for automatic chunk size calculation.

```json
{
  "streaming_options": {
    "desiredTotalDuration": 2000,
    "maximumDuration": 5000
  }
}
```

### Properties

| Property               | Type   | Required | Description                                                                                                                                           |
| ---------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chunkInterval`        | number | No       | Mode 1 (Manual Chunking): Time interval in milliseconds between each streamed chunk. Use with `chunkSize`.                                            |
| `chunkSize`            | number | No       | Mode 1 (Manual Chunking): Size of each streamed chunk in characters or units. Use with `chunkInterval`.                                               |
| `desiredTotalDuration` | number | No       | Mode 2 (Duration-Based): Target total duration in milliseconds for streaming all content. The system adjusts chunk sizes. Use with `maximumDuration`. |
| `maximumDuration`      | number | No       | Mode 2 (Duration-Based): Maximum allowed duration in milliseconds for the streaming operation. Use with `desiredTotalDuration`.                       |

> **Note**: Do not mix properties from both modes. Use either manual chunking OR duration-based streaming, not both.

### Use Cases

- **Smooth Text Animation**: Use low `chunkInterval` (10-20ms) for character-by-character text reveals
- **Progressive Image Loading**: Control the pace of image data delivery
- **Timed Reveals**: Set `desiredTotalDuration` to match other UI animations
- **Performance Safety**: Use `maximumDuration` to prevent indefinitely long streaming operations

### Example: Website Screenshot Panel with Streaming

```json
{
  "content_id": "website-screenshot-panel",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-web",
    "panel_header_title": "example.com",
    "panel_visibility": "VISIBLE",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "2.5/1",
    "streaming_options": {
      "desiredTotalDuration": 2000,
      "maximumDuration": 5000
    },
    "panel_body_data": {
      "image_url": "https://example.com/screenshot.png",
      "image_alt_text": "Website screenshot",
      "image_gravity": "IMAGE_GRAVITY_TOP_CENTER",
      "image_sizing": "IMAGE_SIZING_COVER"
    }
  }
}
```

## Panel Body Types

### PANEL_BODY_MARKDOWN

For displaying rich text content using markdown formatting.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "markdown": "string" // required - markdown-formatted content
  }
}
```

**Properties:**

- `markdown` (string, required): Markdown-formatted text content to display in the panel body

### PANEL_BODY_REASONING_V1_MARKDOWN

For displaying reasoning thoughts and step-by-step thinking during asynchronous tasks. This version is refined for **headerless panels** where all content is displayed in the body area with clean, minimal presentation.

**Key Characteristics:**

- **Headerless by default**: No panel header title displayed
- **Content-focused**: All reasoning content displayed in the body
- **Clean presentation**: Minimal UI for focused content display

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "markdown": "string" // required - markdown-formatted reasoning content
  }
}
```

**Properties:**

- `markdown` (string, required): Markdown-formatted reasoning text content to display in the panel body. Ideal for showing thought processes, step-by-step analysis, and intermediate results during asynchronous operations.

### PANEL_BODY_REASONING_V2_MARKDOWN

For displaying reasoning with **header-based progress messaging** and **accumulated body content**. Unlike V1, this version uses the panel header title to show current status/progress messages while the body accumulates the complete reasoning transcript.

**Key Characteristics:**

- **Header title for status**: The `panel_header_title` displays current progress/status messages (e.g., "Analyzing...", "Processing step 2...")
- **Accumulated body content**: The body content grows over time, accumulating the full reasoning transcript
- **Always has a header**: Required for displaying progress messages
- **Full transcript preservation**: Users can see both current status and complete reasoning history

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "markdown": "string" // required - markdown-formatted accumulated reasoning content
  }
}
```

**Properties:**

- `markdown` (string, required): Markdown-formatted reasoning text content that accumulates in the panel body. Updated progressively as reasoning steps complete.

**V1 vs V2 Comparison:**

| Feature         | V1                           | V2                                  |
| --------------- | ---------------------------- | ----------------------------------- |
| Header          | None by default (headerless) | Required (shows status messages)    |
| Status Display  | In body content              | In header title                     |
| Content Pattern | Replace or stream            | Accumulate over time                |
| Use Case        | Clean, focused content       | Progress tracking with full history |

**Example Update Pattern for V2:**

1. Create panel with initial header: "Analyzing request..."
2. Update header to "Processing step 1..." and append step 1 content to body
3. Update header to "Processing step 2..." and append step 2 content to body
4. Update header to "Analysis complete" with final content in body

### PANEL_BODY_IMAGE

For displaying images with advanced positioning and animation options.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "image_url": "string", // required - URL to the image
    "image_alt_text": "string", // required - alt text for accessibility
    "image_gravity": "string", // optional - positioning within container
    "image_sizing": "string", // optional - how image fills the container
    "image_animation_type": "string", // optional - animation effect
    "image_animation_framer_motion_attributes": "object" // optional - animation parameters
  }
}
```

**Properties:**

- `image_url` (string, required): URL to the image resource
- `image_alt_text` (string, required): Alternative text for accessibility
- `image_gravity` (string, optional): Image positioning - `"IMAGE_GRAVITY_TOP_CENTER"` (default), `"IMAGE_GRAVITY_TOP_LEFT"`, `"IMAGE_GRAVITY_TOP_RIGHT"`, `"IMAGE_GRAVITY_CENTER_LEFT"`, `"IMAGE_GRAVITY_CENTER"`, `"IMAGE_GRAVITY_CENTER_RIGHT"`, `"IMAGE_GRAVITY_BOTTOM_LEFT"`, `"IMAGE_GRAVITY_BOTTOM_CENTER"`, `"IMAGE_GRAVITY_BOTTOM_RIGHT"`
- `image_sizing` (string, optional): How image fills container - `"IMAGE_SIZING_COVER"` (default), `"IMAGE_SIZING_CONTAIN"`, `"IMAGE_SIZING_FILL"`, `"IMAGE_SIZING_SCALE_DOWN"`, `"IMAGE_SIZING_STRETCH"`, `"IMAGE_SIZING_FIT_WIDTH"`, `"IMAGE_SIZING_FIT_HEIGHT"`
- `image_animation_type` (string, optional): Animation effect - `"IMAGE_ANIMATION_NONE"` (default - displays image statically according to `image_gravity` and `image_sizing`), `"IMAGE_ANIMATION_SCROLL_DOWN"`, `"IMAGE_ANIMATION_FADE_IN"`, `"IMAGE_ANIMATION_ZOOM_IN"`
- `image_animation_framer_motion_attributes` (object, optional): Animation configuration with `delay`, `duration`, and `ease` properties. Ignored when `image_animation_type` is `"IMAGE_ANIMATION_NONE"` (image displays statically)

### PANEL_BODY_GOOGLE_SEARCH_HOME

For displaying a Google Search interface with an animated query input.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "search_query": "string" // required - search query text that will be animated when changed
  }
}
```

**Properties:**

- `search_query` (string, required): Search query text that will be displayed and animated when updated

### PANEL_BODY_GOOGLE_SEARCH_RESULT

For displaying Google Search results using an array of search result items from the Google Custom Search API.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "google_custom_search_items": "array" // required - array of Google Custom Search API result items
  }
}
```

**Properties:**

- `google_custom_search_items` (array, required): Array of Google Custom Search API result items containing titles, links, snippets, and metadata

### PANEL_BODY_GOOGLE_MAPS_HOME

For displaying a Google Maps interface with an animated query input.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "search_query": "string" // required - search query text that will be animated when changed
  }
}
```

**Properties:**

- `search_query` (string, required): Search query text that will be displayed and animated when updated

### PANEL_BODY_GOOGLE_MAPS_REVIEWS

For displaying Google Maps reviews using an array of review objects from the Google Places API.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "reviews": "array" // required - array of Google Places API review objects
  }
}
```

**Properties:**

- `reviews` (array, required): Array of Google Places API review objects containing author information, ratings, text, and metadata

### PANEL_BODY_CHATGPT_HOME

For displaying a ChatGPT interface with an animated prompt input.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - user prompt text that will be animated when changed
  }
}
```

**Properties:**

- `user_prompt` (string, required): User prompt text that will be displayed and animated when updated

### PANEL_BODY_CHATGPT_RESULT

For displaying ChatGPT conversation results with the original prompt and streaming markdown response.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - markdown-formatted response from assistant
  }
}
```

**Properties:**

- `user_prompt` (string, required): The original prompt sent by the user
- `assistant_response` (string, required): Markdown-formatted response from the assistant that can be streamed/updated incrementally

### PANEL_BODY_GEMINI_HOME

For setting a user prompt that will be displayed in a Gemini interface. The prompt text animates when changed.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - user prompt text that animates when updated
  }
}
```

**Properties:**

- `user_prompt` (string, required): User prompt text that will be displayed and animated when updated

### PANEL_BODY_GEMINI_RESULT

For displaying Gemini conversation results with the original prompt and streaming markdown response.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - markdown-formatted response from Gemini
  }
}
```

**Properties:**

- `user_prompt` (string, required): The original prompt sent by the user
- `assistant_response` (string, required): Markdown-formatted response from Gemini that can be streamed/updated incrementally

### PANEL_BODY_PERPLEXITY_HOME

For setting a user prompt that will be displayed in a Perplexity interface. The prompt text animates when changed.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string" // required - user prompt text that animates when updated
  }
}
```

**Properties:**

- `user_prompt` (string, required): User prompt text that will be displayed and animated when updated

### PANEL_BODY_PERPLEXITY_RESULT

For displaying Perplexity conversation results with the original prompt and streaming markdown response.

**Body Data Structure:**

```json
{
  "panel_body_data": {
    "user_prompt": "string", // required - original user prompt
    "assistant_response": "string" // required - markdown-formatted response from Perplexity
  }
}
```

**Properties:**

- `user_prompt` (string, required): The original prompt sent by the user
- `assistant_response` (string, required): Markdown-formatted response from Perplexity that can be streamed/updated incrementally

## Aspect Ratios

The `panel_body_aspect_ratio` accepts either the special value `"auto"` or any valid width/height ratio string in the format `"width/height"` where both width and height are positive numbers. The UI parses these values dynamically to calculate the appropriate aspect ratio.

**Special value:**

- `"auto"` - **Automatic aspect ratio**: Panel height adjusts dynamically to fit content. Ideal for reasoning panels, variable-length markdown, or any content where the height should not be constrained.

**Common aspect ratio examples:**

- `"16/9"` (default) - Widescreen format, good for videos and landscapes
- `"4/3"` - Traditional format, good for standard images
- `"1/1"` - Square format, good for workspaces and icons
- `"2/1"` - Ultra-wide format, good for banners
- `"1/2"` - Tall format, good for mobile screenshots
- `"3/2"` - Photography standard
- `"21/9"` - Cinematic format

**Additional examples:**

- `"5/4"` - Classic computer monitor ratio
- `"8/5"` - Golden ratio approximation
- `"9/16"` - Vertical video format
- `"1920/1080"` - Full HD dimensions
- Custom ratios like `"7/3"`, `"5/2"`, `"3/4"`, etc.

## JSON Schema Definition

```json
{
  "type": "object",
  "required": ["content_id", "content_type", "content_data"],
  "properties": {
    "content_id": {
      "type": "string",
      "description": "Unique identifier for this panel content."
    },
    "content_type": {
      "type": "string",
      "enum": ["CHAT_CONTENT_PANEL"],
      "description": "The specific type of content, which is CHAT_CONTENT_PANEL."
    },
    "content_width": {
      "type": "string",
      "enum": ["WIDTH_AUTO", "WIDTH_FULL"],
      "default": "WIDTH_AUTO",
      "description": "Width behavior for the panel content."
    },
    "content_group_id": {
      "type": "string",
      "description": "Optional identifier for grouping multiple content elements together."
    },
    "content_queue": {
      "type": "string",
      "default": "main",
      "description": "Named queue for parallel content processing. Content in the same queue is processed sequentially, different queues run in parallel."
    },
    "content_delay": {
      "type": "number",
      "minimum": 0,
      "description": "Milliseconds to delay after this content item, before the next item in the same queue."
    },
    "content_data": {
      "type": "object",
      "required": ["panel_body_type", "panel_body_data"],
      "properties": {
        "panel_header_icon": {
          "type": "string",
          "description": "Optional icon displayed at left side of panel header."
        },
        "panel_header_title": {
          "type": "string",
          "description": "Optional main title displayed in panel header."
        },
        "panel_header_description": {
          "type": "string",
          "description": "Optional description displayed below header title and icon."
        },
        "panel_visibility": {
          "type": "string",
          "enum": ["VISIBLE", "HIDDEN"],
          "default": "VISIBLE",
          "description": "Panel visibility state. VISIBLE shows the panel normally, HIDDEN hides it from view."
        },
        "panel_body_type": {
          "type": "string",
          "enum": [
            "PANEL_BODY_MARKDOWN",
            "PANEL_BODY_REASONING_V1_MARKDOWN",
            "PANEL_BODY_REASONING_V2_MARKDOWN",
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
          "description": "Type of content displayed in the panel body."
        },
        "panel_body_aspect_ratio": {
          "type": "string",
          "default": "16/9",
          "pattern": "^(auto|\\d+/\\d+)$",
          "description": "Aspect ratio: 'auto' (panel height adjusts to content) or width/height format (e.g., '16/9', '4/3'). Use 'auto' for reasoning panels or variable-length content."
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
        "streaming_options": {
          "type": "object",
          "description": "Controls how content is streamed to the client. Use EITHER manual chunking (chunkInterval + chunkSize) OR duration-based (desiredTotalDuration + maximumDuration), never both.",
          "properties": {
            "chunkInterval": {
              "type": "number",
              "description": "Mode 1 (Manual Chunking): Time interval in milliseconds between each streamed chunk. Use with chunkSize."
            },
            "chunkSize": {
              "type": "number",
              "description": "Mode 1 (Manual Chunking): Size of each streamed chunk in characters or units. Use with chunkInterval."
            },
            "desiredTotalDuration": {
              "type": "number",
              "description": "Mode 2 (Duration-Based): Target total duration in milliseconds for streaming all content. Use with maximumDuration."
            },
            "maximumDuration": {
              "type": "number",
              "description": "Mode 2 (Duration-Based): Maximum allowed duration in milliseconds for the streaming operation. Use with desiredTotalDuration."
            }
          }
        },
        "panel_body_data": {
          "type": "object",
          "description": "Body content data, structure depends on panel_body_type.",
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

const panelBodyMarkdownSchema = z.object({
  markdown: z.string(),
});

const panelBodyImageSchema = z.object({
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

const panelBodyGoogleSearchHomeSchema = z.object({
  search_query: z.string(),
});

const panelBodyGoogleSearchResultSchema = z.object({
  google_custom_search_items: z.array(z.object({}).passthrough()), // Allow any object structure for Google Custom Search API result items
});

const panelBodyGoogleMapsHomeSchema = z.object({
  search_query: z.string(),
});

const panelBodyGoogleMapsReviewsSchema = z.object({
  reviews: z.array(z.object({}).passthrough()), // Allow any object structure for Google Places API review objects
});

const panelBodyChatGptHomeSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyChatGptResultSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelBodyGeminiHomeSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyGeminiResultSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelBodyPerplexityHomeSchema = z.object({
  user_prompt: z.string(),
});

const panelBodyPerplexityResultSchema = z.object({
  user_prompt: z.string(),
  assistant_response: z.string(),
});

const panelTransitionSchema = z.object({
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

const contentDataSchema = z.object({
  panel_header_icon: z.string().optional(),
  panel_header_title: z.string().optional(),
  panel_header_description: z.string().optional(),
  panel_visibility: z.enum(["VISIBLE", "HIDDEN"]).default("VISIBLE").optional(),
  panel_body_type: z.enum([
    "PANEL_BODY_MARKDOWN",
    "PANEL_BODY_REASONING_V1_MARKDOWN",
    "PANEL_BODY_REASONING_V2_MARKDOWN",
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
  panel_body_aspect_ratio: z
    .string()
    .regex(/^\d+\/\d+$/)
    .default("16/9")
    .optional(),
  panel_transitions: z.array(panelTransitionSchema).optional(),
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
  panel_body_data: z.union([
    panelBodyMarkdownSchema,
    panelBodyImageSchema,
    panelBodyGoogleSearchHomeSchema,
    panelBodyGoogleSearchResultSchema,
    panelBodyGoogleMapsHomeSchema,
    panelBodyGoogleMapsReviewsSchema,
    panelBodyChatGptHomeSchema,
    panelBodyChatGptResultSchema,
    panelBodyGeminiHomeSchema,
    panelBodyGeminiResultSchema,
    panelBodyPerplexityHomeSchema,
    panelBodyPerplexityResultSchema,
  ]),
});

const chatContentPanelSchema = z.object({
  content_id: z.string(),
  content_type: z.literal("CHAT_CONTENT_PANEL"),
  content_width: z.enum(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO").optional(),
  content_group_id: z.string().optional(),
  content_queue: z.string().default("main").optional(),
  content_delay: z.number().min(0).optional(),
  content_data: contentDataSchema,
});
```

### Joi Schema

```javascript
const Joi = require("joi");

const panelBodyMarkdownSchema = Joi.object({
  markdown: Joi.string().required(),
});

const panelBodyImageSchema = Joi.object({
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

const panelBodyGoogleSearchHomeSchema = Joi.object({
  search_query: Joi.string().required(),
});

const panelBodyGoogleSearchResultSchema = Joi.object({
  google_custom_search_items: Joi.array().required(),
});

const panelBodyGoogleMapsHomeSchema = Joi.object({
  search_query: Joi.string().required(),
});

const panelBodyGoogleMapsReviewsSchema = Joi.object({
  reviews: Joi.array().required(),
});

const panelBodyChatGptHomeSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyChatGptResultSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelBodyGeminiHomeSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyGeminiResultSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelBodyPerplexityHomeSchema = Joi.object({
  user_prompt: Joi.string().required(),
});

const panelBodyPerplexityResultSchema = Joi.object({
  user_prompt: Joi.string().required(),
  assistant_response: Joi.string().required(),
});

const panelTransitionSchema = Joi.object({
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

const contentDataSchema = Joi.object({
  panel_header_icon: Joi.string(),
  panel_header_title: Joi.string(),
  panel_header_description: Joi.string(),
  panel_visibility: Joi.string().valid("VISIBLE", "HIDDEN").default("VISIBLE"),
  panel_body_type: Joi.string()
    .valid(
      "PANEL_BODY_MARKDOWN",
      "PANEL_BODY_REASONING_V1_MARKDOWN",
      "PANEL_BODY_REASONING_V2_MARKDOWN",
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
    )
    .required(),
  panel_body_aspect_ratio: Joi.string()
    .pattern(/^\d+\/\d+$/)
    .default("16/9"),
  panel_transitions: Joi.array().items(panelTransitionSchema),
  panel_effects: Joi.array().items(
    Joi.object({
      effect_type: Joi.string().valid("EFFECT_LASER_SWEEP").required(),
      effect_state: Joi.string()
        .valid("EFFECT_STATE_ENABLED", "EFFECT_STATE_DISABLED")
        .default("EFFECT_STATE_ENABLED"),
      effect_framer_motion_attributes: Joi.object().required(),
    }).unknown(false)
  ),
  panel_body_data: Joi.alternatives()
    .try(
      panelBodyMarkdownSchema,
      panelBodyImageSchema,
      panelBodyGoogleSearchHomeSchema,
      panelBodyGoogleSearchResultSchema,
      panelBodyGoogleMapsHomeSchema,
      panelBodyGoogleMapsReviewsSchema,
      panelBodyChatGptHomeSchema,
      panelBodyChatGptResultSchema,
      panelBodyGeminiHomeSchema,
      panelBodyGeminiResultSchema,
      panelBodyPerplexityHomeSchema,
      panelBodyPerplexityResultSchema
    )
    .required(),
});

const chatContentPanelSchema = Joi.object({
  content_id: Joi.string().required(),
  content_type: Joi.string().valid("CHAT_CONTENT_PANEL").required(),
  content_width: Joi.string().valid("WIDTH_AUTO", "WIDTH_FULL").default("WIDTH_AUTO"),
  content_group_id: Joi.string(),
  content_queue: Joi.string().default("main"),
  content_delay: Joi.number().min(0),
  content_data: contentDataSchema.required(),
});
```

### Yup Schema

```javascript
const yup = require("yup");

const panelBodyMarkdownSchema = yup.object().shape({
  markdown: yup.string().required(),
});

const panelBodyImageSchema = yup.object().shape({
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

const panelBodyGoogleSearchHomeSchema = yup.object().shape({
  search_query: yup.string().required(),
});

const panelBodyGoogleSearchResultSchema = yup.object().shape({
  google_custom_search_items: yup.array().required(),
});

const panelBodyGoogleMapsHomeSchema = yup.object().shape({
  search_query: yup.string().required(),
});

const panelBodyGoogleMapsReviewsSchema = yup.object().shape({
  reviews: yup.array().required(),
});

const panelBodyChatGptHomeSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyChatGptResultSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelBodyGeminiHomeSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyGeminiResultSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelBodyPerplexityHomeSchema = yup.object().shape({
  user_prompt: yup.string().required(),
});

const panelBodyPerplexityResultSchema = yup.object().shape({
  user_prompt: yup.string().required(),
  assistant_response: yup.string().required(),
});

const panelTransitionSchema = yup.object().shape({
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

const contentDataSchema = yup.object().shape({
  panel_header_icon: yup.string(),
  panel_header_title: yup.string(),
  panel_header_description: yup.string(),
  panel_visibility: yup.string().oneOf(["VISIBLE", "HIDDEN"]).default("VISIBLE"),
  panel_body_type: yup
    .string()
    .oneOf([
      "PANEL_BODY_MARKDOWN",
      "PANEL_BODY_REASONING_V1_MARKDOWN",
      "PANEL_BODY_REASONING_V2_MARKDOWN",
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
    .required(),
  panel_body_aspect_ratio: yup
    .string()
    .matches(/^\d+\/\d+$/)
    .default("16/9"),
  panel_transitions: yup.array().of(panelTransitionSchema),
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
      if ("markdown" in value) return panelBodyMarkdownSchema;
      if ("image_url" in value) return panelBodyImageSchema;
      if ("search_query" in value) return panelBodyGoogleSearchHomeSchema; // Both Google Search and Maps Home use search_query
      if ("google_custom_search_items" in value) return panelBodyGoogleSearchResultSchema;
      if ("reviews" in value) return panelBodyGoogleMapsReviewsSchema;
      if ("user_prompt" in value && "assistant_response" in value) {
        // Note: ChatGPT, Gemini, and Perplexity result types have identical structure
        // Using ChatGPT schema as they all validate the same fields
        return panelBodyChatGptResultSchema;
      }
      if ("user_prompt" in value) {
        // Note: ChatGPT, Gemini, and Perplexity home types have identical structure
        // Using ChatGPT schema as they all validate the same fields
        return panelBodyChatGptHomeSchema;
      }
    }
    return yup.mixed().required();
  }),
});

const chatContentPanelSchema = yup.object().shape({
  content_id: yup.string().required(),
  content_type: yup.string().oneOf(["CHAT_CONTENT_PANEL"]).required(),
  content_width: yup.string().oneOf(["WIDTH_AUTO", "WIDTH_FULL"]).default("WIDTH_AUTO"),
  content_group_id: yup.string(),
  content_queue: yup.string().default("main"),
  content_delay: yup.number().min(0),
  content_data: contentDataSchema.required(),
});
```

## Usage Guidelines

### When to Use Panels

- **Structured Information Display**: When you need to present information in an organized, visually appealing format
- **Content with Context**: When content benefits from a header that provides context or metadata
- **Mixed Media Presentation**: When combining text descriptions with images or other visual content
- **Grouped Operations**: When used with `content_group_id` to create logical groupings with other content elements

### Best Practices

1. **Clear Headers**: Use descriptive titles and icons that immediately convey the panel's purpose
2. **Appropriate Aspect Ratios**: Choose aspect ratios that best fit your content type
3. **Consistent Grouping**: Use `content_group_id` to logically group related panels with other content
4. **Accessibility**: Always provide meaningful `image_alt_text` for images
5. **Performance**: Refine image URLs for fast loading

### Common Use Cases

- **Data Processing Displays**: Show real-time content being processed with accompanying progress bars
- **Image Galleries**: Display images with descriptive headers and metadata
- **Status Dashboards**: Present system status information with organized headers
- **Documentation Panels**: Display code examples, API responses, or instructional content
- **Media Previews**: Show website screenshots, document previews, or other visual content

### Panel Visibility Example

Create a panel that is initially hidden and can be shown later:

```json
{
  "content_id": "hidden-analysis-panel",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_data": {
    "panel_header_title": "Detailed Analysis",
    "panel_header_description": "In-depth analysis results",
    "panel_visibility": "HIDDEN",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Analysis Results\n\nDetailed findings will be shown here when ready."
    }
  }
}
```

This panel can later be made visible using `CHAT_ACTION_UPDATE_PANEL` with `"panel_visibility": "VISIBLE"`.

## Content Delay Usage

The `content_delay` field enables inter-item timing control for creating natural-feeling animations and deliberate pacing between content items.

### Example: Panel Sequence with Delays

```json
[
  {
    "content_id": "search-panel",
    "content_type": "CHAT_CONTENT_PANEL",
    "content_delay": 1000,
    "content_data": {
      "panel_header_icon": "panel-icon-google-search",
      "panel_header_title": "Google Search",
      "panel_body_type": "PANEL_BODY_GOOGLE_SEARCH_HOME",
      "panel_body_data": {
        "search_query": "best coffee shops near me"
      }
    }
  },
  {
    "content_id": "results-panel",
    "content_type": "CHAT_CONTENT_PANEL",
    "content_data": {
      "panel_header_icon": "panel-icon-google-search",
      "panel_header_title": "Search Results",
      "panel_body_type": "PANEL_BODY_GOOGLE_SEARCH_RESULT",
      "panel_body_data": {
        "google_custom_search_items": []
      }
    }
  }
]
```

### Behavior Notes

- **Applied between items**: The delay occurs AFTER this panel finishes processing (including any streaming animations), BEFORE the next item in the same queue begins
- **Works with streaming**: When using `streaming_options`, the delay starts AFTER streaming completes
- **Skippable**: User interaction (typing, pressing Enter) skips the delay
- **Message-level delay removed**: `legacy message-level delay` is not supported; use `content_delay` for timing

## Examples

For comprehensive usage examples and implementation patterns, see the [CHAT_CONTENT_PANEL Usage Examples](../type-usage-examples/CHAT_CONTENT_PANEL.md) documentation.
