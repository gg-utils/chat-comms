---
description: "Usage examples for CHAT_CONTENT_PANEL in the communication protocol. Demonstrates practical implementation patterns for panel content with headers and dynamic bodies. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_CONTENT_PANEL Specification](../type-specifications/CHAT_CONTENT_PANEL.md)**

# CHAT_CONTENT_PANEL Usage Examples

Panel content provides structured displays with configurable headers and dynamic body content. Panels excel at presenting organized information with visual hierarchy, supporting markdown text, reasoning markdown for async thoughts, image content, and various interactive service integrations in the body area.

## Core Implementation

### Basic Panel Payload

**Content Payload**

```json
{
  "content_id": "panel-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_data": {
    "panel_header_title": "Data Processing",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_data": {
      "markdown": "Processing your data files..."
    }
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
      "content_id": "intro-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Let me show you the current status:"
      }
    },
    {
      "content_id": "status-panel",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_data": {
        "panel_header_icon": "panel-icon-data-processing",
        "panel_header_title": "Data Processing",
        "panel_header_description": "Analyzing your uploaded dataset",
        "panel_body_type": "PANEL_BODY_MARKDOWN",
        "panel_body_aspect_ratio": "16/9",
        "panel_body_data": {
          "markdown": "**Processing Status:**\n\n- Files parsed: 3/5\n- Records processed: 1,247\n- Estimated completion: 2 minutes"
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Markdown Panel with Full Header

Panel displaying rich text content with complete header information.

**Assistant Output**

````markdown
I'll display the analysis results in a structured panel:

**Content Payload**

```json
{
  "content_id": "analysis-results-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "AI Analysis Results",
    "panel_header_description": "Comprehensive analysis of your organization data",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_aspect_ratio": "4/3",
    "panel_body_data": {
      "markdown": "## Key Findings\n\n**Market Opportunities:**\n- Digital transformation services: 85% growth potential\n- Cloud migration consulting: High demand in Q2-Q3\n- AI implementation: Growing 23% quarterly\n\n**Competitive Analysis:**\n- Direct competitors: 12 identified\n- Market share opportunity: 15-20%\n- Differentiation factors: Expertise in AI/ML\n\n**Recommendations:**\n1. Focus on AI-driven solutions\n2. Expand cloud consulting team\n3. Develop strategic partnerships"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 1.2,
          "ease": "easeOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.4,
          "duration": 2.5,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### Image Panel with Animation

Panel displaying an image with advanced positioning and animation effects.

**Assistant Output**

````markdown
I'll show you a preview of your website with smooth animation:

**Content Payload**

```json
{
  "content_id": "website-preview-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-web-search",
    "panel_header_title": "Website Preview",
    "panel_header_description": "Live capture of your homepage",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "16/9",
    "streaming_options": {
      "desiredTotalDuration": 2000,
      "maximumDuration": 5000
    },
    "panel_body_data": {
      "image_url": "https://example.com/screenshots/homepage-capture.png",
      "image_alt_text": "Homepage screenshot showing navigation, hero section, and service overview",
      "image_gravity": "IMAGE_GRAVITY_TOP_CENTER",
      "image_sizing": "IMAGE_SIZING_COVER",
      "image_animation_type": "IMAGE_ANIMATION_SCROLL_DOWN",
      "image_animation_framer_motion_attributes": {
        "delay": 0.5,
        "duration": 2.5,
        "ease": "easeInOut"
      }
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 0.8,
          "ease": "easeOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 1.5,
          "ease": "easeInOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_HIDDEN",
        "animation_type": "ANIMATION_TYPE_COLLAPSE_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 0.4,
          "ease": "easeIn"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_HIDDEN",
        "animation_type": "ANIMATION_TYPE_COLLAPSE_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 0.3,
          "ease": "easeIn"
        }
      }
    ]
  }
}
```
````

### Panel with Laser Sweep Effect Enabled

Panel created with a continuous laser sweep overlay effect enabled immediately.

**Assistant Output**

````markdown
I'll add a subtle sweeping highlight over the panel body and keep it active:

**Content Payload**

```json
{
  "content_id": "website-preview-panel-effect-enabled",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-web-search",
    "panel_header_title": "Website Preview",
    "panel_header_description": "Live capture with visual sweep",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "image_url": "https://example.com/screenshots/homepage-capture.png",
      "image_alt_text": "Homepage screenshot"
    },
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
}
```
````

### Panel with Laser Sweep Effect Disabled

Panel created with the laser sweep overlay configured but disabled (to be enabled later by an update action).

**Assistant Output**

````markdown
I'll configure the sweeping highlight but ship it disabled initially:

**Content Payload**

```json
{
  "content_id": "website-preview-panel-effect-disabled",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-web-search",
    "panel_header_title": "Website Preview",
    "panel_header_description": "Live capture with effect ready to enable",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "image_url": "https://example.com/screenshots/homepage-capture.png",
      "image_alt_text": "Homepage screenshot"
    },
    "panel_effects": [
      {
        "effect_type": "EFFECT_LASER_SWEEP",
        "effect_state": "EFFECT_STATE_DISABLED",
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
}
```
````

### Panel with Streaming Options

Panel with custom streaming options for controlled content delivery timing.

**Assistant Output**

````markdown
I'll display the website screenshot with smooth, timed streaming:

**Content Payload**

```json
{
  "content_id": "streamed-website-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-web",
    "panel_header_title": "smegstoreamsterdam.nl",
    "panel_header_description": "Live website capture",
    "panel_visibility": "VISIBLE",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "2.5/1",
    "streaming_options": {
      "desiredTotalDuration": 2000,
      "maximumDuration": 5000
    },
    "panel_body_data": {
      "image_url": "https://assets.example.com/smeg-home-page.png",
      "image_alt_text": "Smeg home page showcasing Italian design and premium appliances",
      "image_gravity": "IMAGE_GRAVITY_TOP_CENTER",
      "image_sizing": "IMAGE_SIZING_COVER",
      "image_animation_type": "IMAGE_ANIMATION_NONE"
    }
  }
}
```
````

**Streaming Options Explanation:**

- **`chunkInterval: 15`**: Content is delivered in chunks every 15 milliseconds for smooth updates
- **`desiredTotalDuration: 2000`**: The system aims to complete streaming within 2 seconds
- **`maximumDuration: 2800`**: Hard limit of 2.8 seconds prevents excessively long streaming

This configuration creates a smooth, controlled reveal effect that matches the panel's entrance animations.

---

### Reasoning Panel with Auto Aspect Ratio

Panel using `"auto"` aspect ratio for AI reasoning content that adjusts height dynamically to fit variable-length content.

**Assistant Output**

````markdown
I'll show my reasoning process with an auto-adjusting panel:

**Content Payload**

```json
{
  "content_id": "reasoning-auto-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "AI Reasoning",
    "panel_header_description": "Step-by-step analysis in progress",
    "panel_visibility": "VISIBLE",
    "panel_body_type": "PANEL_BODY_REASONING_V1_MARKDOWN",
    "panel_body_aspect_ratio": "auto",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nAnalyzing the user's query about organization performance...\n\n## Step 2: Key Areas to Investigate\n\n- Revenue trends and growth patterns\n- Customer acquisition metrics\n- Market positioning analysis\n- Competitive landscape assessment\n\n## Step 3: Gathering Evidence\n\nResearching best practices and benchmarks from multiple sources..."
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 1.5,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

**Auto Aspect Ratio Explanation:**

- **`"auto"`**: Panel height adjusts automatically to fit content without fixed constraints
- **Ideal for**: Reasoning panels, variable-length markdown, async task updates
- **Benefits**: No content truncation, natural scrolling, adapts to content length dynamically

---

### Grouped Panel with Progress Bar

Panel grouped with a progress bar for cohesive status display.

**Assistant Output**

````markdown
I'll show the web search process with grouped content:

**Message Payload**

```json
{
  "message_id": "web-search-status",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "web-search-panel",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_width": "WIDTH_FULL",
      "content_group_id": "web-search-group",
      "content_data": {
        "panel_header_icon": "panel-icon-web-search",
        "panel_header_title": "Web Search",
        "panel_header_description": "Searching for relevant organization information",
        "panel_body_type": "PANEL_BODY_MARKDOWN",
        "panel_body_aspect_ratio": "16/9",
        "panel_body_data": {
          "markdown": "**Search Results Found:**\n\n1. Company website analysis\n2. Industry reports and trends\n3. Competitor landscape data\n4. Market positioning insights\n5. Technology stack information\n\n**Sources:** Google, Bing, specialized databases\n**Quality Score:** 94% relevance"
        },
        "panel_transitions": [
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_UP",
            "animation_framer_motion_attributes": {
              "delay": 0.1,
              "duration": 1.0,
              "ease": "easeOut"
            }
          },
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
            "animation_framer_motion_attributes": {
              "delay": 0.3,
              "duration": 2.0,
              "ease": "easeInOut"
            }
          }
        ]
      }
    },
    {
      "content_id": "web-search-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PROGRESS_BAR",
      "content_width": "WIDTH_FULL",
      "content_group_id": "web-search-group",
      "content_data": {
        "progress_bar_state": "IN_PROGRESS",
        "progress_bar_visibility": "VISIBLE",
        "progress_bar_current_percentage": 75,
        "progress_bar_current_animation_duration_ms": 1100,
        "progress_bar_next_goal_delay_ms": 250,
        "progress_bar_next_goal_percentage": 100,
        "progress_bar_next_goal_animation_duration_ms": 900,
        "progress_bar_message": "Processing web sources...",
        "progress_bar_icon": "progress-bar-icon-web"
      }
    }
  ]
}
```
````

### API Documentation Panel

Panel displaying technical documentation or API responses.

**Assistant Output**

`````markdown
I'll display the API response in a structured format:

**Content Payload**

````json
{
  "content_id": "api-response-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-api",
    "panel_header_title": "API Response",
    "panel_header_description": "GET /api/v1/workspace-record",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_aspect_ratio": "2/1",
    "panel_body_data": {
      "markdown": "```json\n{\n  \"id\": \"organization-123\",\n  \"name\": \"TechCorp Solutions\",\n  \"industry\": \"Technology Consulting\",\n  \"location\": {\n    \"city\": \"San Francisco\",\n    \"state\": \"CA\",\n    \"country\": \"USA\"\n  },\n  \"services\": [\n    \"Cloud Migration\",\n    \"AI Implementation\",\n    \"Digital Transformation\"\n  ],\n  \"founded\": 2018,\n  \"employees\": \"50-100\",\n  \"status\": \"active\"\n}\n```\n\n**Response Time:** 245ms  \n**Status:** 200 OK"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 0.8,
          "ease": "easeOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 1.8,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
````
`````

### Multi-Panel Dashboard

Multiple panels working together to create a comprehensive dashboard view.

**Assistant Output**

````markdown
I'll create a comprehensive status dashboard with multiple panels:

**Message Payload**

```json
{
  "message_id": "dashboard-view",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "dashboard-header",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "markdown": "## System Status Dashboard\n\nReal-time monitoring of all active processes:"
      }
    },
    {
      "content_id": "system-metrics-panel",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_width": "WIDTH_FULL",
      "content_group_id": "dashboard-metrics",
      "content_data": {
        "panel_header_icon": "panel-icon-database",
        "panel_header_title": "System Metrics",
        "panel_header_description": "Current performance indicators",
        "panel_body_type": "PANEL_BODY_MARKDOWN",
        "panel_body_aspect_ratio": "3/2",
        "panel_body_data": {
          "markdown": "**Performance Metrics:**\n\n- CPU Usage: 23%\n- Memory Usage: 1.8GB / 8GB\n- Active Connections: 47\n- Response Time: 156ms\n\n**Status:** All systems operational ✓"
        },
        "panel_transitions": [
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_UP",
            "animation_framer_motion_attributes": {
              "delay": 0.1,
              "duration": 0.9,
              "ease": "easeOut"
            }
          },
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
            "animation_framer_motion_attributes": {
              "delay": 0.25,
              "duration": 1.8,
              "ease": "easeInOut"
            }
          }
        ]
      }
    },
    {
      "content_id": "security-status-panel",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_width": "WIDTH_FULL",
      "content_group_id": "dashboard-security",
      "content_data": {
        "panel_header_icon": "panel-icon-security",
        "panel_header_title": "Security Status",
        "panel_header_description": "Authentication and access monitoring",
        "panel_body_type": "PANEL_BODY_MARKDOWN",
        "panel_body_aspect_ratio": "3/2",
        "panel_body_data": {
          "markdown": "**Security Overview:**\n\n- Active Sessions: 12\n- Failed Login Attempts: 0 (last 24h)\n- SSL Certificate: Valid until Dec 2024\n- Last Security Scan: 2 hours ago\n\n**Status:** Secure ✓"
        },
        "panel_transitions": [
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_UP",
            "animation_framer_motion_attributes": {
              "delay": 0.15,
              "duration": 0.9,
              "ease": "easeOut"
            }
          },
          {
            "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
            "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
            "animation_framer_motion_attributes": {
              "delay": 0.35,
              "duration": 1.8,
              "ease": "easeInOut"
            }
          }
        ]
      }
    }
  ]
}
```
````

### Hidden Panel with Visibility Control

Panel that starts hidden and can be revealed through user interaction or system events.

**Assistant Output**

````markdown
I'll create a detailed analysis panel that's initially hidden to keep the interface clean:

**Content Payload**

```json
{
  "content_id": "detailed-analysis-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "Detailed Analysis Report",
    "panel_header_description": "Comprehensive research intelligence findings",
    "panel_visibility": "HIDDEN",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "markdown": "## Research Intelligence Analysis\n\n### Key Findings\n\n🎯 **Market Opportunities**\n- AI consulting services: 89% growth potential\n- Digital transformation: High demand Q2-Q4\n- Cloud migration support: 15 qualified leads identified\n\n📊 **Competitive Analysis**\n- Market ranking: #3 in local technology consulting\n- Differentiation score: 8.7/10\n- Brand recognition: Growing 31% annually\n\n💰 **Financial Projections**\n- Revenue increase: 25-35% within 12 months\n- ROI on AI investments: 180% projected\n- Cost savings through automation: $125K annually\n\n### Strategic Recommendations\n\n1. **Immediate Actions (0-3 months)**\n   - Launch AI readiness assessment service\n   - Develop strategic partnership with cloud providers\n   - Enhance team certifications in emerging technologies\n\n2. **Short-term Goals (3-6 months)**\n   - Expand service offerings to include AI implementation\n   - Establish thought leadership through content marketing\n   - Build specialized teams for high-demand services\n\n3. **Long-term Vision (6-12 months)**\n   - Position as regional leader in AI transformation\n   - Develop proprietary tools and methodologies\n   - Scale operations to support projected growth\n\n**Next Steps:** Review recommendations with leadership team and prioritize implementation based on resource availability."
    }
  }
}
```
````

**Message Payload**

```json
{
  "message_id": "hidden-panel-demo",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "summary-text",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've completed the organization analysis. The summary shows promising growth opportunities. A detailed report is available but hidden to keep the interface clean."
      }
    },
    {
      "content_id": "show-details-button",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_BUTTON",
      "content_data": {
        "button_text": "Show Detailed Analysis",
        "button_style": "BUTTON_STYLE_PRIMARY",
        "button_actions": [
          {
            "action_id": "reveal-analysis-panel",
            "action_type": "CHAT_ACTION_UPDATE_PANEL",
            "action_data": {
              "target": "CHAT",
              "panel_content_id": "detailed-analysis-panel",
              "panel_visibility": "VISIBLE"
            }
          }
        ]
      }
    },
    {
      "content_id": "detailed-analysis-panel",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_width": "WIDTH_FULL",
      "content_data": {
        "panel_header_icon": "panel-icon-ai-analysis",
        "panel_header_title": "Detailed Analysis Report",
        "panel_header_description": "Comprehensive research intelligence findings",
        "panel_visibility": "HIDDEN",
        "panel_body_type": "PANEL_BODY_MARKDOWN",
        "panel_body_aspect_ratio": "16/9",
        "panel_body_data": {
          "markdown": "## Research Intelligence Analysis\n\n*Content shown above in previous example*"
        }
      }
    }
  ]
}
```

### Google Search Home Panel

Panel displaying a Google Search interface with animated query input.

**Assistant Output**

````markdown
I'll set up a Google Search interface for your query:

**Content Payload**

```json
{
  "content_id": "google-search-home-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-google-search",
    "panel_header_title": "Google Search",
    "panel_header_description": "Preparing to search the web for relevant information",
    "panel_body_type": "PANEL_BODY_GOOGLE_SEARCH_HOME",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "search_query": "best practices for React performance refinement 2024"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 0.7,
          "ease": "easeOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.25,
          "duration": 1.2,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### Google Search Results Panel

Panel displaying actual Google Search results from the Google Custom Search API.

**Assistant Output**

````markdown
Here are the search results from Google:

**Content Payload**

```json
{
  "content_id": "google-search-results-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-google-search",
    "panel_header_title": "Search Results",
    "panel_header_description": "Found 847,000 results for \"React performance refinement\"",
    "panel_body_type": "PANEL_BODY_GOOGLE_SEARCH_RESULT",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "google_custom_search_items": [
        {
          "kind": "customsearch#result",
          "title": "React Performance Refinement: Best Practices and Techniques",
          "htmlTitle": "<b>React</b> <b>Performance</b> <b>Refinement</b>: Best Practices and Techniques",
          "link": "https://example.com/react-performance-guide",
          "displayLink": "example.com",
          "snippet": "Learn how to refine React applications for better performance. Includes tips on code splitting, memoization, and virtual DOM refinement.",
          "htmlSnippet": "Learn how to refine <b>React</b> applications for better <b>performance</b>. Includes tips on code splitting, memoization, and virtual DOM <b>refinement</b>.",
          "formattedUrl": "https://example.com/react-performance-guide",
          "htmlFormattedUrl": "https://example.com/<b>react</b>-<b>performance</b>-guide"
        },
        {
          "kind": "customsearch#result",
          "title": "Advanced React Refinement Techniques 2024",
          "htmlTitle": "Advanced <b>React</b> <b>Refinement</b> Techniques 2024",
          "link": "https://example.com/advanced-react-2024",
          "displayLink": "example.com",
          "snippet": "Comprehensive guide covering React.memo, useMemo, useCallback, code splitting, and advanced refinement techniques for 2024.",
          "htmlSnippet": "Comprehensive guide covering React.memo, useMemo, useCallback, code splitting, and advanced <b>refinement</b> <b>techniques</b> for 2024.",
          "formattedUrl": "https://example.com/advanced-react-2024",
          "htmlFormattedUrl": "https://example.com/advanced-<b>react</b>-2024"
        }
      ]
    }
  }
}
```
````

### ChatGPT Home Panel

Panel displaying a ChatGPT interface with animated prompt input.

**Assistant Output**

````markdown
I'll set up a ChatGPT interface for your conversation:

**Content Payload**

```json
{
  "content_id": "chatgpt-home-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-chatgpt",
    "panel_header_title": "ChatGPT",
    "panel_header_description": "Preparing to send your prompt to ChatGPT",
    "panel_body_type": "PANEL_BODY_CHATGPT_HOME",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Explain the benefits of using TypeScript in large React applications"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_HEADER_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_UP",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 0.8,
          "ease": "easeOut"
        }
      },
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.3,
          "duration": 1.5,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### ChatGPT Result Panel

Panel displaying ChatGPT conversation with original prompt and streaming response.

**Assistant Output**

````markdown
Here's the response from ChatGPT:

**Content Payload**

```json
{
  "content_id": "chatgpt-result-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-chatgpt",
    "panel_header_title": "ChatGPT Response",
    "panel_header_description": "Answer about TypeScript benefits in React applications",
    "panel_body_type": "PANEL_BODY_CHATGPT_RESULT",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Explain the benefits of using TypeScript in large React applications",
      "assistant_response": "## Benefits of TypeScript in Large React Applications\n\n**Type Safety & Error Prevention**\nTypeScript catches errors at compile time, preventing runtime issues that are common in large JavaScript codebases. This is especially valuable in React applications where prop types and component interfaces become complex.\n\n**Enhanced Developer Experience**\n- **IntelliSense**: Better autocomplete and code suggestions\n- **Refactoring**: Safe renaming and restructuring of code\n- **Navigation**: Jump to definitions and find all references\n\n**Code Documentation**\nTypeScript serves as living documentation. Interfaces and type definitions make it clear what props components expect and what data structures are used throughout the application.\n\n**Team Collaboration**\nIn large teams, TypeScript ensures everyone follows the same contracts and interfaces, reducing miscommunication and integration issues.\n\n**Maintainability**\nAs applications grow, TypeScript makes it easier to:\n- Understand legacy code\n- Make confident changes\n- Identify breaking changes early\n\n**Integration Benefits**\n- Works seamlessly with modern React features (hooks, context, etc.)\n- Excellent support in popular tools like VS Code\n- Strong ecosystem with typed libraries (@types packages)\n\nFor large React applications, the initial setup investment pays dividends in reduced bugs, improved developer productivity, and easier maintenance."
    }
  }
}
```
````

### Gemini Home Panel

Panel displaying a Gemini interface with animated prompt input.

**Assistant Output**

````markdown
I'll set up a Gemini interface for your conversation:

**Content Payload**

```json
{
  "content_id": "gemini-home-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-gemini",
    "panel_header_title": "Gemini",
    "panel_header_description": "Google's advanced multimodal assistant",
    "panel_body_type": "PANEL_BODY_GEMINI_HOME",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Analyze this code and suggest improvements"
    }
  }
}
```
````

### Gemini Result Panel

Panel displaying Gemini conversation with original prompt and multimodal response.

**Assistant Output**

`````markdown
Here's the response from Gemini:

**Content Payload**

````json
{
  "content_id": "gemini-result-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-gemini",
    "panel_header_title": "Gemini Response",
    "panel_header_description": "Code analysis and refinement suggestions",
    "panel_body_type": "PANEL_BODY_GEMINI_RESULT",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Analyze this code and suggest improvements",
      "assistant_response": "## Code Analysis Results\n\n**Overall Assessment**: The code structure is well-organized, but there are several refinement opportunities.\n\n**Key Improvements**:\n\n1. **Memory Refinement**\n   - Use `useMemo` for expensive calculations\n   - Implement `React.memo` for component memoization\n   - Consider lazy loading for large components\n\n2. **Performance Enhancements**\n   - Debounce user input handlers\n   - Virtualize long lists\n   - Refine re-render cycles\n\n3. **Type Safety**\n   - Add stricter TypeScript interfaces\n   - Use discriminated unions for state management\n   - Implement proper error boundaries\n\n**Code Example**:\n```typescript\nconst refinedComponent = React.memo(({ data }: Props) => {\n  const processedData = useMemo(() => \n    expensiveCalculation(data), [data]\n  );\n  return <div>{processedData}</div>;\n});\n```\n\n**Estimated Impact**: These changes could improve performance by 40-60% and reduce bundle size by ~15%."
    }
  }
}
````
`````

`````

### Perplexity Home Panel

Panel displaying a Perplexity interface with animated prompt input.

**Assistant Output**

````markdown
I'll set up a Perplexity interface for your research:

**Content Payload**

```json
{
  "content_id": "perplexity-home-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-perplexity",
    "panel_header_title": "Perplexity",
    "panel_header_description": "AI-powered research and answer engine",
    "panel_body_type": "PANEL_BODY_PERPLEXITY_HOME",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Latest developments in quantum computing 2024"
    }
  }
}
```
`````

### Perplexity Result Panel

Panel displaying Perplexity research results with citations and comprehensive analysis.

**Assistant Output**

````markdown
Here are the research results from Perplexity:

**Content Payload**

```json
{
  "content_id": "perplexity-result-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-perplexity",
    "panel_header_title": "Perplexity Research Results",
    "panel_header_description": "Latest quantum computing developments with sources",
    "panel_body_type": "PANEL_BODY_PERPLEXITY_RESULT",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "user_prompt": "Latest developments in quantum computing 2024",
      "assistant_response": "## Quantum Computing Breakthroughs in 2024\n\n**Major Developments**:\n\n### IBM's 1000+ Qubit Processors\nIBM announced their roadmap to 1000+ qubit quantum processors, with the **Heron** processor achieving significant error reduction compared to previous generations¹.\n\n### Google's Quantum Error Correction\nGoogle demonstrated a major milestone in quantum error correction, showing that their surface code can suppress errors below the threshold needed for practical quantum computing².\n\n### Commercial Applications\n- **Financial Modeling**: JPMorgan Chase deployed quantum algorithms for portfolio refinement³\n- **Drug Discovery**: Roche partnered with Cambridge Quantum Computing for molecular simulation⁴\n- **Logistics**: Volkswagen implemented quantum routing refinement in live traffic systems⁵\n\n### Investment and Market Growth\n- Global quantum computing market reached $1.3 billion in 2024⁶\n- Over $2.4 billion in venture funding across 47 quantum startups⁷\n\n**Sources**:\n¹ IBM Research - Quantum Network Updates 2024\n² Nature - Quantum Error Correction Milestone\n³ JPMorgan Quantum Research Division\n⁴ Roche-Cambridge QC Partnership Announcement\n⁵ Volkswagen Digital Innovation Lab\n⁶ Quantum Computing Market Report 2024\n⁷ Quantum Tech Investment Tracker"
    }
  }
}
```
````

### Google Maps Home Panel

Panel displaying a Google Maps interface with animated search query input.

**Assistant Output**

````markdown
I'll set up a Google Maps interface for your location search:

**Content Payload**

```json
{
  "content_id": "google-maps-home-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-google-maps",
    "panel_header_title": "Google Maps",
    "panel_header_description": "Searching for local organization information",
    "panel_body_type": "PANEL_BODY_GOOGLE_MAPS_HOME",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "search_query": "best coffee shops near downtown San Francisco"
    }
  }
}
```
````

### Google Maps Reviews Panel

Panel displaying Google Maps reviews using data from the Google Places API.

**Assistant Output**

````markdown
Here are the customer reviews from Google Maps:

**Content Payload**

```json
{
  "content_id": "google-maps-reviews-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-google-maps",
    "panel_header_title": "Customer Reviews",
    "panel_header_description": "Reviews from Google Maps for Blue Bottle Coffee",
    "panel_body_type": "PANEL_BODY_GOOGLE_MAPS_REVIEWS",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "reviews": [
        {
          "author_name": "Sarah Chen",
          "author_url": "https://www.google.com/maps/contrib/109264542874498072776/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocI_-8VJuQLq_DmkIC6e8nnBROqGA6ES2U_vsAnHfQupk4Q_ZQ=s128-c0x00000000-cc-rp-mo",
          "rating": 5,
          "relative_time_description": "2 weeks ago",
          "text": "Excellent coffee and friendly staff! The pour-over was perfectly brewed and the atmosphere is great for working. Highly recommend the single origin options.",
          "time": 1734567890,
          "translated": false
        },
        {
          "author_name": "Mike Rodriguez",
          "author_url": "https://www.google.com/maps/contrib/116567318707156861320/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVNd5v_Dxw-OUO9LUmlzdzYiRCIW6sDBrAmTiSf78FjzIvUD7mp=s128-c0x00000000-cc-rp-mo-ba3",
          "rating": 4,
          "relative_time_description": "1 month ago",
          "text": "Good coffee but can get quite busy during morning rush. The baristas know their craft well. WiFi is reliable for remote work.",
          "time": 1731975890,
          "translated": false
        },
        {
          "author_name": "Emma Thompson",
          "author_url": "https://www.google.com/maps/contrib/102310678819006580899/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKbr1sJloQn8TgSqwtHTtjrACToDcj_QHuxSRPFJZF5t8Y3rg=s128-c0x00000000-cc-rp-mo-ba3",
          "rating": 5,
          "relative_time_description": "3 weeks ago",
          "text": "Love this place! Great selection of beans and the staff is always happy to explain the different brewing methods. The pastries are fresh and delicious too.",
          "time": 1733777890,
          "translated": false
        }
      ]
    }
  }
}
```
````

### Error State Panel

Panel displaying error information with appropriate styling and context.

**Assistant Output**

````markdown
I need to show you an error that occurred during processing:

**Content Payload**

```json
{
  "content_id": "error-panel",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-security",
    "panel_header_title": "Processing Error",
    "panel_header_description": "An error occurred while processing your request",
    "panel_body_type": "PANEL_BODY_MARKDOWN",
    "panel_body_aspect_ratio": "4/3",
    "panel_body_data": {
      "markdown": "**Error Details:**\n\n- **Error Code:** API_TIMEOUT_ERROR\n- **Message:** Request timeout after 30 seconds\n- **Timestamp:** 2024-01-15 14:30:25 UTC\n- **Request ID:** req_abc123xyz\n\n**Recommended Actions:**\n\n1. Check your internet connection\n2. Verify API endpoint availability\n3. Try again in a few minutes\n4. Contact support if issue persists\n\n**Support Reference:** #ERROR-2024-0115-001"
    }
  }
}
```
````

### Reasoning Markdown Panel (V1 - Headerless)

**Use Case**: Displaying AI thought process during asynchronous tasks with clean, headerless presentation

**Key Characteristics**: V1 focuses on content-only display without header messaging. All reasoning content is displayed directly in the body area.

**Content Payload**

```json
{
  "content_id": "reasoning-panel-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_data": {
    "panel_header_title": "AI Reasoning",
    "panel_header_description": "Step-by-step analysis in progress",
    "panel_body_type": "PANEL_BODY_REASONING_V1_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications.\n\n## Step 2: Key Areas to Analyze\n\n- Type safety and error prevention\n- Developer experience improvements\n- Code maintainability\n- Team collaboration benefits\n\n## Step 3: Gathering Evidence\n\nResearching official documentation and community feedback..."
    }
  }
}
```

**Message Integration**

```json
{
  "message_id": "chatmessage-reasoning-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "reasoning-panel-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_PANEL",
      "content_data": {
        "panel_header_title": "AI Reasoning",
        "panel_header_description": "Step-by-step analysis in progress",
        "panel_body_type": "PANEL_BODY_REASONING_V1_MARKDOWN",
        "panel_body_data": {
          "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications.\n\n## Step 2: Key Areas to Analyze\n\n- Type safety and error prevention\n- Developer experience improvements\n- Code maintainability\n- Team collaboration benefits\n\n## Step 3: Gathering Evidence\n\nResearching official documentation and community feedback..."
        },
        "streaming_options": {
          "manualChunking": {
            "chunkSize": 150,
            "chunkInterval": 500
          }
        }
      }
    }
  ]
}
```

### Reasoning Markdown Panel (V2 - Header Progress with Accumulated Body)

**Use Case**: Displaying AI reasoning with header-based progress messaging and accumulated body content

**Key Characteristics**: V2 uses the panel header title to show current status/progress messages while the body accumulates the complete reasoning transcript. Users can see both current status and full history.

**Initial Panel Creation**

```json
{
  "content_id": "reasoning-v2-panel-001",
  "content_queue": "main",
  "content_type": "CHAT_CONTENT_PANEL",
  "content_width": "WIDTH_FULL",
  "content_data": {
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "Analyzing your request...",
    "panel_header_description": "AI reasoning in progress",
    "panel_visibility": "VISIBLE",
    "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
    "panel_body_aspect_ratio": "auto",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications."
    }
  }
}
```

**Update 1: Header shows step 2 status, body accumulates content**

```json
{
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "content_id": "reasoning-v2-panel-001",
    "content_queue": "main",
    "panel_header_title": "Processing step 2 of 4...",
    "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications.\n\n## Step 2: Key Areas to Analyze\n\n- Type safety and error prevention\n- Developer experience improvements\n- Code maintainability\n- Team collaboration benefits"
    }
  }
}
```

**Update 2: Header shows step 3 status, body continues accumulating**

```json
{
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "content_id": "reasoning-v2-panel-001",
    "content_queue": "main",
    "panel_header_title": "Gathering evidence...",
    "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications.\n\n## Step 2: Key Areas to Analyze\n\n- Type safety and error prevention\n- Developer experience improvements\n- Code maintainability\n- Team collaboration benefits\n\n## Step 3: Gathering Evidence\n\nResearching official documentation and community feedback..."
    }
  }
}
```

**Final Update: Header shows completion, body has full transcript**

```json
{
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "content_id": "reasoning-v2-panel-001",
    "content_queue": "main",
    "panel_header_title": "Analysis complete",
    "panel_body_type": "PANEL_BODY_REASONING_V2_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nThe user is asking about TypeScript benefits in React applications.\n\n## Step 2: Key Areas to Analyze\n\n- Type safety and error prevention\n- Developer experience improvements\n- Code maintainability\n- Team collaboration benefits\n\n## Step 3: Gathering Evidence\n\nResearching official documentation and community feedback...\n\n## Step 4: Conclusion\n\nTypeScript provides significant benefits for large React applications including compile-time error detection, improved IDE support, and better code maintainability."
    }
  }
}
```

**V1 vs V2 Usage Guidelines:**

| Scenario                                 | Use V1 | Use V2 |
| ---------------------------------------- | ------ | ------ |
| Clean, minimal UI preferred              | ✓      |        |
| Need to show progress status in header   |        | ✓      |
| Content replaces entirely on each update | ✓      |        |
| Content accumulates over time            |        | ✓      |
| Users need to see full reasoning history |        | ✓      |
| Headerless presentation required         | ✓      |        |

---

## Implementation Guidelines

### Panel Header Best Practices

1. **Meaningful Icons**: Choose icons that clearly represent the panel's content type
2. **Concise Titles**: Use clear, descriptive titles that immediately convey purpose
3. **Helpful Descriptions**: Provide context that helps users understand the panel's content
4. **Consistent Styling**: Maintain consistent header styles across related panels

### Body Content Guidelines

1. **Appropriate Body Types**:
   - Use `PANEL_BODY_MARKDOWN` for text content and documentation
   - Use `PANEL_BODY_REASONING_V1_MARKDOWN` for displaying AI thought processes with headerless, content-focused presentation
   - Use `PANEL_BODY_REASONING_V2_MARKDOWN` for displaying AI reasoning with header-based progress messaging and accumulated body content
   - Use `PANEL_BODY_IMAGE` for visual content and screenshots
   - Use `PANEL_BODY_GOOGLE_SEARCH_HOME` for animated search input interfaces
   - Use `PANEL_BODY_GOOGLE_SEARCH_RESULT` for displaying Google Custom Search API results
   - Use `PANEL_BODY_GOOGLE_MAPS_HOME` for animated location/entity search interfaces
   - Use `PANEL_BODY_GOOGLE_MAPS_REVIEWS` for displaying Google Places API review data
   - Use `PANEL_BODY_CHATGPT_HOME`, `PANEL_BODY_GEMINI_HOME`, and `PANEL_BODY_PERPLEXITY_HOME` for animated AI prompt interfaces
   - Use `PANEL_BODY_CHATGPT_RESULT`, `PANEL_BODY_GEMINI_RESULT`, and `PANEL_BODY_PERPLEXITY_RESULT` for AI conversation displays with user prompts and responses
2. **Optimal Aspect Ratios**: Select ratios that best fit your content and layout requirements
3. **Accessible Images**: Always provide meaningful `image_alt_text` for images
4. **Performance Refinement**: Use refined images and consider loading times
5. **Animation Consistency**: Ensure search query and chat prompt animations feel natural and responsive
6. **API Response Handling**: For search results, pass through the complete Google Custom Search API response object

### Content Grouping

1. **Logical Grouping**: Use `content_group_id` to group related panels and progress bars
2. **Visual Cohesion**: Grouped content should feel like a single functional unit
3. **Consistent Width**: Use `WIDTH_FULL` for grouped content to maintain alignment
4. **Related Functionality**: Group panels that work together (e.g., status panel + progress bar)

### Panel Visibility Management

1. **Strategic Hiding**: Use `panel_visibility: "HIDDEN"` to manage information density and avoid overwhelming users
2. **Progressive Disclosure**: Start with essential panels visible and reveal additional details on demand
3. **Context-Sensitive Display**: Show panels based on user actions, workflow progress, or system states
4. **Clean Interfaces**: Hide secondary panels initially to maintain focus on primary content
5. **User Control**: Provide buttons or actions to let users show/hide panels as needed
6. **State Preservation**: Hidden panels retain their content and can be revealed without data loss

### Common Use Cases

- **Status Displays**: Show system status, processing results, or operational metrics
- **Content Previews**: Display website screenshots, document previews, or media content
- **Documentation**: Present API responses, code examples, or technical information
- **Error Handling**: Show error details with context and recommended actions
- **Progress Tracking**: Combine with progress bars for comprehensive status updates
- **Progressive Disclosure**: Use hidden panels to manage interface complexity and reveal details on demand
- **Conditional Display**: Show panels based on user permissions, workflow states, or system conditions
- **Search Interfaces**: Use `PANEL_BODY_GOOGLE_SEARCH_HOME` to create animated search input experiences
- **Search Results**: Display search results with `PANEL_BODY_GOOGLE_SEARCH_RESULT` for rich result formatting
- **Location Search**: Use `PANEL_BODY_GOOGLE_MAPS_HOME` for animated location and entity search interfaces
- **Organization Reviews**: Display customer reviews with `PANEL_BODY_GOOGLE_MAPS_REVIEWS` for Google Places API review data
- **AI Conversations**: Use `PANEL_BODY_CHATGPT_HOME`, `PANEL_BODY_GEMINI_HOME`, and `PANEL_BODY_PERPLEXITY_HOME` for animated prompt inputs and `PANEL_BODY_CHATGPT_RESULT`, `PANEL_BODY_GEMINI_RESULT`, and `PANEL_BODY_PERPLEXITY_RESULT` for conversation displays
- **External Service Integration**: Show results from various AI services and search engines in consistent panel formats

### Animation and Interaction

1. **Smooth Animations**: Use subtle animations to enhance user experience without distraction
2. **Appropriate Timing**: Set reasonable delays and durations for animations
3. **Performance Consideration**: Avoid heavy animations that might impact performance
4. **Accessibility**: Ensure animations don't interfere with accessibility requirements
5. **No Animation Default**: When `image_animation_type` is `"IMAGE_ANIMATION_NONE"` (default), the image displays statically according to `image_gravity` and `image_sizing` settings, and `image_animation_framer_motion_attributes` are ignored

### Panel Transition Animations

1. **Coordinated Sequences**: Use `panel_transitions` to create smooth opening and closing animations
2. **Staggered Timing**: Implement header-first opening (0.1-0.3s delay) and body-first closing patterns
3. **Animation Types**: Use `ANIMATION_TYPE_EXPAND_UP/DOWN` for opening and `ANIMATION_TYPE_COLLAPSE_UP/DOWN` for closing
4. **Framer Motion Integration**: Configure `animation_framer_motion_attributes` with appropriate delay, duration, and easing
5. **Visual Hierarchy**: Animations should guide user attention and create logical content flow
6. **Consistent Patterns**: Maintain consistent animation timing and styles across related panels

---

## Advanced Patterns

### Real-time Updates

Panels can be updated in real-time using the `CHAT_ACTION_UPDATE_PANEL` action to modify header information, body content, or visual properties without recreating the entire panel structure.

### Responsive Design

Panels automatically adapt to different screen sizes, with aspect ratios maintaining visual consistency across devices. The `content_width` property helps control how panels scale within the chat interface.

### Integration with Other Content Types

Panels work seamlessly with other content types, especially when grouped using `content_group_id`. Common combinations include:

- Panel + Progress Bar (status updates)
- Panel + Buttons (interactive content)
- Panel + Action Chips (quick actions)
- Multiple Panels (dashboard views)

For complete implementation details, refer to the [CHAT_CONTENT_PANEL Type Specification](../type-specifications/CHAT_CONTENT_PANEL.md).
