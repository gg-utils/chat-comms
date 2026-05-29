---
description: "Usage examples for CHAT_ACTION_UPDATE_PANEL in the communication protocol. Demonstrates practical patterns for updating panel content dynamically. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)** > **🔧 [Type Specifications](../type-specifications/README.md)** > **📋 [CHAT_ACTION_UPDATE_PANEL Specification](../type-specifications/CHAT_ACTION_UPDATE_PANEL.md)**

# CHAT_ACTION_UPDATE_PANEL Usage Examples

Panel update actions provide dynamic modification capabilities for existing panel content, enabling real-time updates to headers, body content, and visual properties without requiring complete re-renders. This includes support for updating to reasoning markdown for displaying AI thought processes.

## Core Implementation

### Basic Panel Update Payload

**Action Payload**

```json
{
  "action_id": "update-panel-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "existing-panel-id",
    "panel_header_title": "Updated Analysis Results",
    "panel_body_data": {
      "markdown": "Updated content with new findings..."
    }
  }
}
```

### Message Integration

**Message Payload**

```json
{
  "message_id": "chatmessage-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "update-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-panel-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "analysis-panel",
            "panel_header_title": "Updated Analysis Results",
            "panel_header_description": "Refreshed with latest data",
            "panel_body_data": {
              "markdown": "## Latest Findings\n\nUpdated analysis shows significant improvements..."
            }
          }
        }
      }
    }
  ]
}
```

---

## Essential Examples

### Header-Only Updates

Update panel header information while preserving body content.

**Assistant Output**

````markdown
I'll update the panel header to reflect the current status:

**Action Payload**

```json
{
  "action_id": "header-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "status-panel-main",
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "AI Analysis Complete",
    "panel_header_description": "Comprehensive research intelligence scan finished",
    "panel_transitions": [
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

### Content Type Switching

Switch panel from markdown to image content while updating header.

**Assistant Output**

````markdown
I'll convert the panel to show the website preview:

**Action Payload**

```json
{
  "action_id": "content-type-switch-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-analysis-panel",
    "panel_header_title": "Website Preview",
    "panel_header_description": "Live capture of your homepage",
    "panel_body_type": "PANEL_BODY_IMAGE",
    "panel_body_aspect_ratio": "16/9",
    "panel_body_data": {
      "image_url": "https://example.com/screenshots/homepage-live.png",
      "image_alt_text": "Live homepage screenshot showing current layout and content",
      "image_gravity": "IMAGE_GRAVITY_TOP_CENTER",
      "image_sizing": "IMAGE_SIZING_COVER",
      "image_animation_type": "IMAGE_ANIMATION_FADE_IN",
      "image_animation_framer_motion_attributes": {
        "delay": 0.3,
        "duration": 1.2,
        "ease": "easeOut"
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
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_CONTENT_LOADED",
        "animation_type": "ANIMATION_TYPE_SCROLL_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.0,
          "duration": 0.3,
          "ease": "easeOut"
        }
      }
    ]
  }
}
```
````

### Update to Reasoning Markdown

**Use Case**: Converting a panel to display AI reasoning during async tasks

**Action Payload**

```json
{
  "action_id": "reasoning-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "analysis-panel-001",
    "panel_header_title": "AI Reasoning",
    "panel_header_description": "Step-by-step analysis in progress",
    "panel_body_type": "PANEL_BODY_REASONING_V1_MARKDOWN",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nAnalyzing the user's query about React performance...\n\n## Step 2: Key Areas to Investigate\n\n- Component refinement strategies\n- State management patterns\n- Bundle size reduction techniques\n\n## Step 3: Gathering Evidence\n\nResearching best practices and benchmarks..."
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_FADE_IN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 0.8,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```

### Progressive Content Updates

Update panel content progressively as more information becomes available.

**Assistant Output**

````markdown
I'll update the panel with the latest processing results:

**Action Payload**

```json
{
  "action_id": "progressive-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "data-processing-panel",
    "panel_header_description": "Processing 850/1000 records - 85% complete",
    "panel_body_data": {
      "markdown": "**Processing Status:**\n\n✅ **Completed Phases:**\n- Data validation and cleaning\n- Schema normalization\n- Duplicate detection and removal\n- Initial analysis pass\n\n🔄 **Current Phase:**\n- Advanced pattern recognition (85% complete)\n- Estimated completion: 2 minutes\n\n⏳ **Remaining Phases:**\n- Final quality assessment\n- Report generation\n\n**Key Statistics:**\n- Records processed: 850/1000\n- Issues found and resolved: 23\n- Data quality score: 94.7%"
    },
    "panel_transitions": [
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
```
````

### Error State Updates

Update panel to show error information when operations fail.

**Assistant Output**

````markdown
I need to update the panel to show an error that occurred:

**Action Payload**

```json
{
  "action_id": "error-state-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "api-connection-panel",
    "panel_header_icon": "panel-icon-security",
    "panel_header_title": "Connection Error",
    "panel_header_description": "Unable to connect to external service",
    "panel_body_data": {
      "markdown": "**Error Details:**\n\n- **Error Code:** CONNECTION_TIMEOUT\n- **Service:** External API Endpoint\n- **Timestamp:** 2024-01-15 14:45:12 UTC\n- **Retry Attempt:** 3/3\n\n**What Happened:**\nThe connection to the external service timed out after 30 seconds. This may be due to temporary network issues or service unavailability.\n\n**Next Steps:**\n1. Check your internet connection\n2. Verify service status at status.example.com\n3. Try again in a few minutes\n4. Contact support if the issue persists\n\n**Support Information:**\n- Reference ID: ERR-2024-0115-003\n- Support Email: support@example.com"
    }
  }
}
```
````

### Real-time Data Updates

Update panel with fresh data while maintaining the same structure.

**Assistant Output**

````markdown
I'll refresh the panel with the latest metrics:

**Action Payload**

```json
{
  "action_id": "metrics-refresh-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "system-metrics-panel",
    "panel_header_description": "Last updated: 2024-01-15 15:30:45 UTC",
    "panel_body_data": {
      "markdown": "**System Performance:**\n\n**Server Metrics:**\n- CPU Usage: 18% ⬇️ (was 23%)\n- Memory Usage: 1.6GB / 8GB ⬇️ (was 1.8GB)\n- Disk I/O: 45 MB/s\n- Network Traffic: 12.3 MB/s\n\n**Application Metrics:**\n- Active Sessions: 52 ⬆️ (was 47)\n- Response Time: 142ms ⬇️ (was 156ms)\n- Error Rate: 0.02% ⬇️ (was 0.03%)\n- Throughput: 1,247 req/min\n\n**Database Performance:**\n- Query Response: 8.3ms ⬇️ (was 9.1ms)\n- Active Connections: 15/100\n- Cache Hit Rate: 96.8% ⬆️ (was 95.2%)\n\n🟢 **Status:** All systems optimal"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.1,
          "duration": 1.5,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### Add Panel Effect Active (Laser Sweep)

Add a laser sweep overlay effect to an existing panel with the effect enabled immediately.

**Assistant Output**

````markdown
I'll attach the laser sweep effect to the panel and keep it active right away:

**Action Payload**

```json
{
  "action_id": "add-effect-active-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-preview-panel",
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

**Message Payload**

```json
{
  "message_id": "chatmessage-add-effect-active-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-add-effect-active-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "add-effect-active-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
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
      }
    }
  ]
}
```
````

### Add Panel Effect Disabled (Laser Sweep)

Attach the effect but keep it disabled for now, so it can be enabled later via a follow-up update.

**Assistant Output**

````markdown
I'll add the laser sweep configuration in a disabled state:

**Action Payload**

```json
{
  "action_id": "add-effect-disabled-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-preview-panel",
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

**Message Payload**

```json
{
  "message_id": "chatmessage-add-effect-disabled-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-add-effect-disabled-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "add-effect-disabled-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
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
      }
    }
  ]
}
```
````

### Enable Panel Effect After Render

Enable a previously configured effect on an existing panel (ensure visible immediately after state change).

**Assistant Output**

````markdown
I'll enable the laser sweep overlay on the website preview panel:

**Action Payload**

```json
{
  "action_id": "enable-laser-sweep-effect-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-preview-panel",
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

**Message Payload**

```json
{
  "message_id": "chatmessage-enable-effect-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-enable-effect-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "enable-laser-sweep-effect-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
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
      }
    }
  ]
}
```
````

### Disable Panel Effect After Render

Disable an effect on an existing panel without removing other content.

**Assistant Output**

````markdown
I'll disable the laser sweep overlay to reduce visual motion:

**Action Payload**

```json
{
  "action_id": "disable-laser-sweep-effect-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-preview-panel",
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

**Message Payload**

```json
{
  "message_id": "chatmessage-disable-effect-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-disable-effect-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "disable-laser-sweep-effect-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
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
      }
    }
  ]
}
```
````

### Image Updates with Animation

Update panel image with new content and animation effects.

**Assistant Output**

````markdown
I'll update the panel with a new screenshot and smooth animation:

**Action Payload**

```json
{
  "action_id": "image-update-animation-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "website-preview-panel",
    "panel_header_description": "Updated homepage design - mobile responsive view",
    "panel_body_data": {
      "image_url": "https://example.com/screenshots/mobile-homepage-v2.png",
      "image_alt_text": "Mobile responsive homepage showing updated design with improved navigation",
      "image_gravity": "IMAGE_GRAVITY_TOP_CENTER",
      "image_sizing": "IMAGE_SIZING_COVER",
      "image_animation_type": "IMAGE_ANIMATION_SCROLL_DOWN",
      "image_animation_framer_motion_attributes": {
        "delay": 0.2,
        "duration": 3.0,
        "ease": "easeInOut"
      }
    }
  }
}
```
````

### Aspect Ratio Updates

Change panel aspect ratio for better content presentation.

**Assistant Output**

`````markdown
I'll adjust the panel aspect ratio to better fit the new content:

**Action Payload**

````json
{
  "action_id": "aspect-ratio-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "documentation-panel",
    "panel_body_aspect_ratio": "2/1",
    "panel_body_data": {
      "markdown": "```json\n{\n  \"api_endpoint\": \"/api/v1/workspace-record\",\n  \"method\": \"GET\",\n  \"parameters\": {\n    \"organization_id\": \"string\",\n    \"include_metrics\": \"boolean\",\n    \"format\": \"json\"\n  },\n  \"response\": {\n    \"workspace\": {\n      \"name\": \"TechCorp Solutions\",\n      \"industry\": \"Technology Consulting\",\n      \"location\": \"San Francisco, CA\",\n      \"metrics\": {\n        \"revenue_growth\": \"23%\",\n        \"client_satisfaction\": \"4.8/5\",\n        \"market_share\": \"12%\"\n      }\n    }\n  }\n}\n```\n\n**Response Time:** 156ms | **Status:** 200 OK | **Cache:** Miss"
    }
  }
}
````
`````

`````

### Switch to Auto Aspect Ratio

Update panel to use `"auto"` aspect ratio for variable-length reasoning content.

**Assistant Output**

````markdown
I'll switch the panel to auto aspect ratio to accommodate the expanding reasoning content:

**Action Payload**

```json
{
  "action_id": "auto-aspect-ratio-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "reasoning-panel",
    "panel_body_type": "PANEL_BODY_REASONING_V1_MARKDOWN",
    "panel_body_aspect_ratio": "auto",
    "panel_body_data": {
      "markdown": "## Step 1: Understanding the Request\n\nAnalyzing the user's query about performance refinement...\n\n## Step 2: Key Areas to Investigate\n\n- Component rendering patterns\n- State management efficiency\n- Bundle size refinement\n- Network request handling\n\n## Step 3: Gathering Evidence\n\nResearching best practices from multiple sources...\n\n## Step 4: Formulating Recommendations\n\nBased on the analysis, here are the key findings..."
    }
  }
}
```
````

**Auto Aspect Ratio Benefits:**

- **`"auto"`**: Panel height adjusts dynamically to fit content without truncation
- **Ideal for**: Reasoning panels, async task updates, variable-length content
- **Use case**: When content length is unpredictable or grows over time

### Completion State Updates

Transform panel to show final results when long-running operations complete.

**Assistant Output**

````markdown
I'll update the panel to show the completed analysis results:

**Action Payload**

```json
{
  "action_id": "completion-update-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "organization-analysis-panel",
    "panel_header_icon": "panel-icon-ai-analysis",
    "panel_header_title": "Organization Analysis Complete",
    "panel_header_description": "Comprehensive analysis finished - 47 insights discovered",
    "panel_body_data": {
      "markdown": "## Analysis Complete ✅\n\n**Key Discoveries:**\n\n🎯 **Market Opportunities**\n- AI consulting services: 89% growth potential\n- Digital transformation: High demand Q2-Q4\n- Cloud migration support: 15 qualified leads identified\n\n📊 **Competitive Position**\n- Market ranking: #3 in local technology consulting\n- Differentiation score: 8.7/10\n- Brand recognition: Growing 31% annually\n\n💡 **Strategic Recommendations**\n1. **Immediate (0-3 months):** Launch AI readiness assessments\n2. **Short-term (3-6 months):** Expand cloud certification team\n3. **Medium-term (6-12 months):** Develop strategic partnerships\n\n📈 **Projected Impact**\n- Revenue increase: 25-35% within 12 months\n- Market share growth: 5-8 percentage points\n- Client satisfaction improvement: 0.3 points\n\n**Next Steps:** Review detailed recommendations and implementation timeline"
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
          "duration": 2.2,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
`````

### Google Search Query Updates

Update panel to show animated search query changes.

**Assistant Output**

````markdown
I'll update the search query with a more specific search:

**Action Payload**

```json
{
  "action_id": "update-search-query-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "google-search-home-panel",
    "panel_header_description": "Searching for more specific React performance techniques",
    "panel_body_data": {
      "search_query": "React performance refinement techniques 2024 memoization virtualization"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 1.0,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### Google Search Results Updates

Update panel to show new search results from the Google Custom Search API.

**Assistant Output**

````markdown
I'll update the panel with fresh search results:

**Action Payload**

```json
{
  "action_id": "update-search-results-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "google-search-results-panel",
    "panel_header_description": "Updated results - found 1,250,000 relevant articles",
    "panel_body_data": {
      "google_custom_search_items": [
        {
          "kind": "customsearch#result",
          "title": "Advanced React Performance Refinement Guide 2024",
          "htmlTitle": "Advanced <b>React</b> <b>Performance</b> <b>Refinement</b> Guide 2024",
          "link": "https://example.com/advanced-react-performance-2024",
          "displayLink": "example.com",
          "snippet": "Comprehensive guide covering React.memo, useMemo, useCallback, code splitting, and advanced refinement techniques for 2024.",
          "htmlSnippet": "Comprehensive guide covering React.memo, useMemo, useCallback, code splitting, and advanced <b>refinement</b> <b>techniques</b> for 2024.",
          "formattedUrl": "https://example.com/advanced-react-performance-2024",
          "htmlFormattedUrl": "https://example.com/advanced-<b>react</b>-<b>performance</b>-2024"
        },
        {
          "kind": "customsearch#result",
          "title": "React Hooks Performance Best Practices",
          "htmlTitle": "<b>React</b> Hooks <b>Performance</b> Best Practices",
          "link": "https://example.com/react-hooks-performance",
          "displayLink": "example.com",
          "snippet": "Learn how to refine React hooks for better performance with useMemo, useCallback, and custom refinement patterns.",
          "htmlSnippet": "Learn how to refine <b>React</b> hooks for better <b>performance</b> with useMemo, useCallback, and custom <b>refinement</b> patterns.",
          "formattedUrl": "https://example.com/react-hooks-performance",
          "htmlFormattedUrl": "https://example.com/<b>react</b>-hooks-<b>performance</b>"
        }
      ]
    }
  }
}
```
````

### Google Maps Search Query Updates

Update panel to show animated location search query changes.

**Assistant Output**

````markdown
I'll update the search query to focus on a specific area:

**Action Payload**

```json
{
  "action_id": "update-maps-query-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "google-maps-home-panel",
    "panel_header_description": "Searching for restaurants in the Financial District",
    "panel_body_data": {
      "search_query": "highly rated Italian restaurants Financial District San Francisco"
    }
  }
}
```
````

### Google Maps Reviews Updates

Update panel to show fresh customer reviews from Google Places API.

**Assistant Output**

````markdown
I'll update the panel with the latest customer reviews:

**Action Payload**

```json
{
  "action_id": "update-maps-reviews-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "google-maps-reviews-panel",
    "panel_header_description": "Latest reviews for Tony's Little Star Pizza - 4.6★ (847 reviews)",
    "panel_body_data": {
      "reviews": [
        {
          "author_name": "Jessica Park",
          "author_url": "https://www.google.com/maps/contrib/109264542874498072776/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocI_-8VJuQLq_DmkIC6e8nnBROqGA6ES2U_vsAnHfQupk4Q_ZQ=s128-c0x00000000-cc-rp-mo",
          "rating": 5,
          "relative_time_description": "3 days ago",
          "text": "Best deep dish pizza in the city! The crust is perfectly crispy and the toppings are fresh. Service was friendly and the atmosphere is cozy. Definitely coming back!",
          "time": 1734825890,
          "translated": false
        },
        {
          "author_name": "David Chen",
          "author_url": "https://www.google.com/maps/contrib/116567318707156861320/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVNd5v_Dxw-OUO9LUmlzdzYiRCIW6sDBrAmTiSf78FjzIvUD7mp=s128-c0x00000000-cc-rp-mo-ba3",
          "rating": 4,
          "relative_time_description": "1 week ago",
          "text": "Solid pizza place with good variety. The thin crust is excellent too. Can get busy on weekends so make a reservation. Great for groups.",
          "time": 1734221890,
          "translated": false
        },
        {
          "author_name": "Maria Rodriguez",
          "author_url": "https://www.google.com/maps/contrib/102310678819006580899/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKbr1sJloQn8TgSqwtHTtjrACToDcj_QHuxSRPFJZF5t8Y3rg=s128-c0x00000000-cc-rp-mo-ba3",
          "rating": 5,
          "relative_time_description": "5 days ago",
          "text": "Amazing pizza and great service! The staff was very accommodating with our dietary restrictions. The gluten-free options are surprisingly good. Highly recommend!",
          "time": 1734653890,
          "translated": false
        },
        {
          "author_name": "Tom Wilson",
          "author_url": "https://www.google.com/maps/contrib/102971211946723061167/reviews",
          "language": "en",
          "original_language": "en",
          "author_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUOa6xJICYMo8zSw-xt4nz3TwnKZOuAh9PftEv6CzyV1RkkdxQ=s128-c0x00000000-cc-rp-mo",
          "rating": 4,
          "relative_time_description": "2 weeks ago",
          "text": "Classic SF pizza spot. Been coming here for years and it's consistently good. The deep dish takes a while but it's worth the wait. Great local atmosphere.",
          "time": 1733617890,
          "translated": false
        }
      ]
    }
  }
}
```
````

### ChatGPT Prompt Updates

Update panel to show animated prompt changes.

**Assistant Output**

````markdown
I'll update the ChatGPT prompt with more specific requirements:

**Action Payload**

```json
{
  "action_id": "update-chatgpt-prompt-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "chatgpt-home-panel",
    "panel_header_description": "Sending refined prompt to ChatGPT",
    "panel_body_data": {
      "user_prompt": "Explain the benefits of using TypeScript in large React applications, including specific examples of type safety improvements and developer experience enhancements"
    },
    "panel_transitions": [
      {
        "animation_trigger": "ANIMATION_TRIGGER_PANEL_BODY_VISIBILITY_VISIBLE",
        "animation_type": "ANIMATION_TYPE_EXPAND_DOWN",
        "animation_framer_motion_attributes": {
          "delay": 0.2,
          "duration": 1.3,
          "ease": "easeInOut"
        }
      }
    ]
  }
}
```
````

### ChatGPT Response Streaming

Update panel to show streaming response from ChatGPT.

**Assistant Output**

`````markdown
I'll update the panel as the ChatGPT response streams in:

**Action Payload**

````json
{
  "action_id": "stream-chatgpt-response-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "chatgpt-result-panel",
    "panel_header_description": "Response streaming from ChatGPT...",
    "panel_body_data": {
      "user_prompt": "Explain the benefits of using TypeScript in large React applications, including specific examples",
      "assistant_response": "## Benefits of TypeScript in Large React Applications\n\n**Type Safety & Error Prevention**\nTypeScript catches errors at compile time, preventing runtime issues that are common in large JavaScript codebases. This is especially valuable in React applications where prop types and component interfaces become complex.\n\n**Enhanced Developer Experience**\n- **IntelliSense**: Better autocomplete and code suggestions\n- **Refactoring**: Safe renaming and restructuring of code\n- **Navigation**: Jump to definitions and find all references\n\n**Specific Examples:**\n\n1. **Component Props Validation**\n```typescript\ninterface UserCardProps {\n  user: {\n    id: number;\n    name: string;\n    email: string;\n    isActive: boolean;\n  };\n  onEdit: (userId: number) => void;\n  className?: string;\n}\n\nconst UserCard: React.FC<UserCardProps> = ({ user, onEdit, className }) => {\n  // TypeScript ensures user has all required properties\n  // and onEdit receives the correct parameter type\n};\n```\n\n2. **API Response Typing**\n```typescript\ninterface ApiResponse<T> {\n  data: T;\n  status: 'success' | 'error';\n  message?: string;\n}\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// Type-safe API calls\nconst fetchUsers = async (): Promise<ApiResponse<User[]>> => {\n  // TypeScript ensures response matches expected structure\n};\n```\n\n**Continued streaming...**"
    }
  }
}
````
`````

`````

### Gemini Prompt Updates

Update panel to animate a new Gemini prompt.

**Assistant Output**

````markdown
I'll update the Gemini panel with your new prompt:

**Action Payload**

```json
{
  "action_id": "update-gemini-prompt-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "gemini-home-panel",
    "panel_header_description": "Preparing multimodal analysis request",
    "panel_body_data": {
      "user_prompt": "Compare these two architectural patterns and suggest the best approach for a microservices system"
    }
  }
}
```
`````

### Gemini Response Streaming

Update panel to show streaming response from Gemini with multimodal capabilities.

**Assistant Output**

`````markdown
I'll update the panel as the Gemini response streams in:

**Action Payload**

````json
{
  "action_id": "stream-gemini-response-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "gemini-result-panel",
    "panel_header_description": "Multimodal analysis streaming from Gemini...",
    "panel_body_data": {
      "user_prompt": "Compare these two architectural patterns and suggest the best approach for a microservices system",
      "assistant_response": "## Architectural Pattern Comparison\n\n**Pattern 1: Event-Driven Architecture**\n\n**Pros:**\n- Loose coupling between services\n- High scalability and resilience\n- Excellent for async processing\n- Event sourcing enables audit trails\n\n**Cons:**\n- Complexity in event ordering\n- Debugging distributed events\n- Eventual consistency challenges\n\n**Pattern 2: API Gateway Pattern**\n\n**Pros:**\n- Centralized request routing\n- Simplified client interactions\n- Built-in cross-cutting concerns\n- Protocol translation capabilities\n\n**Cons:**\n- Single point of failure risk\n- Gateway bottleneck potential\n- Added latency overhead\n\n**Recommendation for Microservices:**\n\n**Hybrid Approach** - Combine both patterns:\n\n1. **API Gateway** for:\n   - External client communications\n   - Authentication/authorization\n   - Rate limiting and monitoring\n\n2. **Event-Driven** for:\n   - Internal service communication\n   - Data synchronization\n   - Asynchronous workflows\n\n**Implementation Strategy:**\n```\nClient → API Gateway → Service A\n                    ↓\n                 Event Bus\n                    ↓\n              Service B ↔ Service C\n```\n\n**Tools to Consider:**\n- Gateway: Kong, Ambassador, or AWS API Gateway\n- Events: Apache Kafka, RabbitMQ, or cloud messaging\n- Monitoring: Distributed tracing with Jaeger or Zipkin\n\n**Streaming more detailed implementation examples...**"
    }
  }
}
````
`````

`````

### Perplexity Prompt Updates

Update panel to animate a new Perplexity research prompt.

**Assistant Output**

````markdown
I'll update the Perplexity panel with your research query:

**Action Payload**

```json
{
  "action_id": "update-perplexity-prompt-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "perplexity-home-panel",
    "panel_header_description": "Preparing comprehensive research query",
    "panel_body_data": {
      "user_prompt": "What are the latest cybersecurity threats in 2024 and how are companies defending against them?"
    }
  }
}
```
`````

### Perplexity Response Streaming

Update panel to show streaming research response from Perplexity with citations.

**Assistant Output**

````markdown
I'll update the panel as the Perplexity research streams in:

**Action Payload**

```json
{
  "action_id": "stream-perplexity-response-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "perplexity-result-panel",
    "panel_header_description": "Research streaming from Perplexity with citations...",
    "panel_body_data": {
      "user_prompt": "What are the latest cybersecurity threats in 2024 and how are companies defending against them?",
      "assistant_response": "## Cybersecurity Landscape 2024\n\n### Emerging Threats\n\n**AI-Powered Attacks**\nCybercriminals are increasingly using AI to create sophisticated phishing campaigns and deepfake social engineering attacks. ChatGPT and similar tools are being weaponized to generate convincing malicious content¹.\n\n**Supply Chain Vulnerabilities**\nSoftware supply chain attacks have increased by 300% in 2024, with attackers targeting CI/CD pipelines and open-source packages². The Codecov and SolarWinds incidents have prompted renewed focus on this vector.\n\n**Cloud Security Misconfigurations**\nWith 95% of organizations using cloud services, misconfigurations remain the leading cause of data breaches. AWS S3 buckets and Azure storage accounts continue to be prime targets³.\n\n### Defense Strategies\n\n**Zero Trust Architecture**\nCompanies are rapidly adopting Zero Trust principles:\n- 78% of enterprises plan full Zero Trust implementation by 2025⁴\n- Microsoft reports 40% reduction in breaches for Zero Trust adopters⁵\n\n**AI-Driven Defense**\n- **Behavioral Analytics**: Machine learning models detect anomalous user behavior\n- **Automated Response**: SOAR platforms now respond to 60% of threats without human intervention⁶\n- **Threat Intelligence**: AI aggregates global threat data for predictive defense\n\n**Extended Detection and Response (XDR)**\nUnified security platforms providing:\n- Cross-platform visibility\n- Automated threat correlation\n- Integrated incident response workflows\n\nLeading vendors: CrowdStrike, SentinelOne, Microsoft Defender⁷\n\n**Sources:**\n¹ Cybersecurity & Infrastructure Security Agency (CISA) 2024 Report\n² Supply Chain Security Report 2024 - Sonatype\n³ Cloud Security Alliance State of Cloud Security 2024\n⁴ Zero Trust Adoption Survey - Okta 2024\n⁵ Microsoft Security Signals Report Q3 2024\n⁶ SOAR Market Analysis - Gartner 2024\n⁷ Magic Quadrant for Endpoint Protection Platforms - Gartner\n\n**Continuing with detailed implementation strategies...**"
    }
  }
}
```
````

### Content Type Conversion with New Types

Convert panel from one body type to another, including the new search and AI types.

**Assistant Output**

````markdown
I'll convert the panel from a search interface to show the actual results:

**Action Payload**

```json
{
  "action_id": "convert-search-to-results-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "search-interface-panel",
    "panel_header_title": "Search Results",
    "panel_header_description": "Found relevant results for your query",
    "panel_body_type": "PANEL_BODY_GOOGLE_SEARCH_RESULT",
    "panel_body_data": {
      "google_custom_search_items": [
        {
          "kind": "customsearch#result",
          "title": "React Performance Best Practices",
          "htmlTitle": "<b>React</b> <b>Performance</b> Best Practices",
          "link": "https://example.com/react-performance",
          "displayLink": "example.com",
          "snippet": "Complete guide to optimizing React applications for production.",
          "htmlSnippet": "Complete guide to optimizing <b>React</b> applications for production.",
          "formattedUrl": "https://example.com/react-performance",
          "htmlFormattedUrl": "https://example.com/<b>react</b>-<b>performance</b>"
        },
        {
          "kind": "customsearch#result",
          "title": "React Production Refinement Tips",
          "htmlTitle": "<b>React</b> Production <b>Refinement</b> Tips",
          "link": "https://example.com/react-production-tips",
          "displayLink": "example.com",
          "snippet": "Essential tips for deploying refined React applications in production environments.",
          "htmlSnippet": "Essential tips for deploying refined <b>React</b> applications in production environments.",
          "formattedUrl": "https://example.com/react-production-tips",
          "htmlFormattedUrl": "https://example.com/<b>react</b>-production-tips"
        }
      ]
    }
  }
}
```
````

### Panel Visibility Control

Control panel visibility to manage information density and user focus.

**Assistant Output**

````markdown
I'll hide the search results panel to reduce visual clutter:

**Action Payload**

```json
{
  "action_id": "hide-panel-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "panel-ai-search-results-123",
    "panel_visibility": "HIDDEN"
  }
}
```
````

**Message Payload**

```json
{
  "message_id": "chatmessage-website-hide",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "action-wrapper-website-hide",
      "content_queue": "main",
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

**Assistant Output**

````markdown
I'll show the panel again when you need to reference the search results:

**Action Payload**

```json
{
  "action_id": "show-panel-001",
  "action_type": "CHAT_ACTION_UPDATE_PANEL",
  "action_data": {
    "target": "CHAT",
    "panel_content_id": "panel-ai-search-results-123",
    "panel_visibility": "VISIBLE"
  }
}
```
````

---

## Implementation Guidelines

### Update Strategies

1. **Incremental Updates**: Change only the specific fields that need modification
2. **Batch Updates**: Group related changes together for smoother user experience
3. **Progressive Enhancement**: Start with basic content and add richer details over time
4. **State Transitions**: Use updates to move panels through different operational states
5. **Real-time Refresh**: Update content as new information becomes available
6. **Visibility Management**: Control panel visibility to manage information density and user focus

### Best Practices

1. **Targeted Changes**: Only update fields that actually need to change to minimize rendering overhead
2. **Preserve Identity**: Maintain panel identity and context during updates
3. **Smooth Animations**: Use appropriate animation timing for natural transitions
4. **Error Handling**: Provide graceful fallbacks when updates fail
5. **Performance Refinement**: Batch related updates to reduce UI re-renders
6. **Visibility Control**: Use `panel_visibility` to show/hide panels based on context and user needs

### Content Type Transitions

- **Markdown to Image**: Convert text-based panels to visual previews
- **Image to Markdown**: Replace images with detailed text analysis
- **Search Home to Results**: Convert search input interfaces to result displays
- **Maps Home to Reviews**: Transform location search interfaces into customer review displays
- **ChatGPT Home to Results**: Transform prompt interfaces into conversation results
- **Gemini Home to Results**: Transform multimodal prompt interfaces into analysis results
- **Perplexity Home to Results**: Transform research prompt interfaces into cited results
- **Cross-Service Transitions**: Switch between Google Search, Google Maps, ChatGPT, Gemini, and Perplexity interfaces
- **AI Service Switching**: Convert between different AI provider interfaces while maintaining context
- **Location Service Integration**: Switch between Google Search and Google Maps for location-based queries
- **Dynamic Switching**: Change content type based on data availability and user interactions
- **Fallback Content**: Provide alternative content when primary content fails to load

### Update Timing Patterns

- **Immediate Updates**: Apply changes instantly for user interactions
- **Progressive Updates**: Update content as long-running operations progress
- **Scheduled Refresh**: Update content at regular intervals for real-time data
- **Event-Driven Updates**: Update content in response to external events
- **Completion Updates**: Transform content when operations finish

### Common Update Scenarios

1. **Status Progression**: Update headers and content as operations progress
2. **Data Refresh**: Replace stale content with fresh information
3. **Error Recovery**: Update panels to show error states and recovery options
4. **Content Enhancement**: Add more detail as additional data becomes available
5. **Visual Improvements**: Update animations and layout for better presentation
6. **Search Query Refinement**: Update search panels with modified queries and animated transitions
7. **Search Result Updates**: Display new results from search APIs with updated metadata
8. **Location Search Updates**: Update Google Maps panels with refined location and entity search queries
9. **Organization Review Updates**: Display fresh customer reviews from Google Places API with updated ratings and metadata
10. **AI Prompt Evolution**: Modify prompts in ChatGPT, Gemini, and Perplexity interface panels with animated text changes
11. **Response Streaming**: Update AI result panels incrementally as responses stream in from any AI provider
12. **Gemini Multimodal Updates**: Stream complex analysis results with code examples and visual explanations
13. **Perplexity Citation Updates**: Stream research results with real-time source citations and references
14. **Service Transitions**: Convert panels between different service types (Google Search ↔ Google Maps ↔ ChatGPT ↔ Gemini ↔ Perplexity)
15. **AI Provider Switching**: Transition the same query between different AI providers while maintaining conversation context

### Animation Guidelines

1. **Subtle Effects**: Use animations to enhance, not distract from content
2. **Appropriate Timing**: Choose delays and durations that feel natural
3. **Performance Consideration**: Avoid heavy animations that impact performance
4. **Accessibility**: Ensure animations don't interfere with accessibility tools
5. **Context Sensitivity**: Match animation style to content type and update reason
6. **No Animation Default**: When `image_animation_type` is `"IMAGE_ANIMATION_NONE"` (default), the image displays statically according to `image_gravity` and `image_sizing` settings, and `image_animation_framer_motion_attributes` are ignored

### Panel Transition Updates

1. **Animation Updates**: Use `panel_transitions` (array) to modify animation behavior by trigger
2. **Selective Updates**: Include only the transitions you want to change (e.g., a single entry with the relevant `animation_trigger`)
3. **Animation Coordination**: When updating multiple panels, coordinate animation timing for smooth user experience
4. **State-Based Animations**: Use different animations based on panel state (loading, complete, error)
5. **Progressive Enhancement**: Add animations to existing panels without breaking functionality
6. **Timing Adjustments**: Fine-tune animation delays and durations based on content complexity and user feedback

---

## Advanced Patterns

### Multi-Panel Coordination

When updating related panels simultaneously, coordinate updates to maintain visual consistency and logical flow between grouped content elements.

### State Management

Track panel states to ensure updates are applied in the correct sequence and handle cases where multiple updates might conflict or overlap.

### Error Recovery

Implement robust error handling for update failures, including fallback content and retry mechanisms for critical updates.

### Performance Refinement

Refine update performance by:

- Batching related updates
- Using efficient content diffing
- Minimizing DOM manipulation
- Leveraging browser animation APIs

For complete implementation details, refer to the [CHAT_ACTION_UPDATE_PANEL Type Specification](../type-specifications/CHAT_ACTION_UPDATE_PANEL.md).

---

## Content Delay Patterns

The `content_delay` field enables fine-grained timing control between content items within the same queue. When used with `CHAT_ACTION_UPDATE_PANEL`, it allows natural pacing between sequential panel updates.

### Single Panel Update with Delay

**Scenario**: Update a panel and pause before the next content item

When updating a panel as part of a sequence, use `content_delay` on the action wrapper to create a pause before the next update or content.

**Message Payload**

```json
{
  "message_id": "chatmessage-update-delay-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "update-wrapper-delay-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_delay": 800,
      "content_data": {
        "action": {
          "action_id": "update-panel-delay-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "analysis-panel",
            "panel_header_title": "Step 1 Complete",
            "panel_header_description": "Moving to next phase...",
            "panel_body_data": {
              "markdown": "## Initial Analysis Done\n\nFoundation data collected. Proceeding to deeper analysis..."
            }
          }
        }
      }
    },
    {
      "content_id": "update-wrapper-delay-002",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-panel-delay-002",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "analysis-panel",
            "panel_header_title": "Step 2 In Progress",
            "panel_header_description": "Deep analysis underway",
            "panel_body_data": {
              "markdown": "## Deep Analysis\n\nExamining detailed patterns and correlations..."
            }
          }
        }
      }
    }
  ]
}
```

### Multiple Panel Updates with Delay on Last Item Only

**Scenario**: Perform a sequence of panel updates with a final pause before the next message

Place `content_delay` on the **last** action wrapper to create a pause after all updates complete.

**Message Payload**

```json
{
  "message_id": "chatmessage-multi-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "update-wrapper-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-header-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
            "panel_header_title": "Analysis Complete",
            "panel_header_description": "All scans finished"
          }
        }
      }
    },
    {
      "content_id": "update-wrapper-002",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "disable-effect-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
            "panel_effects": [
              {
                "effect_type": "EFFECT_LASER_SWEEP",
                "effect_state": "EFFECT_STATE_DISABLED"
              }
            ]
          }
        }
      }
    },
    {
      "content_id": "update-wrapper-003",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_delay": 1000,
      "content_data": {
        "action": {
          "action_id": "update-body-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-preview-panel",
            "panel_body_data": {
              "markdown": "## Results Ready\n\nYour comprehensive analysis is complete. Review the findings below."
            }
          }
        }
      }
    }
  ]
}
```

### Combined with content_queue for Parallel Panel Updates

**Scenario**: Update multiple panels in parallel queues with independent timing

When using `content_queue` for parallel processing, panel updates in different queues execute simultaneously. Each queue can have its own timing pattern via `content_delay`.

**Message Payload**

```json
{
  "message_id": "chatmessage-parallel-updates-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "update-website-wrapper-001",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_queue": "website",
      "content_delay": 500,
      "content_data": {
        "action": {
          "action_id": "update-website-panel-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-panel",
            "panel_header_description": "Screenshot captured",
            "panel_body_data": {
              "image_url": "https://example.com/screenshot-updated.png",
              "image_alt_text": "Updated website screenshot"
            }
          }
        }
      }
    },
    {
      "content_id": "update-website-wrapper-002",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_queue": "website",
      "content_data": {
        "action": {
          "action_id": "update-website-panel-002",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "website-panel",
            "panel_header_description": "Analysis complete"
          }
        }
      }
    },
    {
      "content_id": "update-reasoning-wrapper-001",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_queue": "reasoning",
      "content_delay": 300,
      "content_data": {
        "action": {
          "action_id": "update-reasoning-panel-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "reasoning-panel",
            "panel_header_title": "Processing...",
            "panel_body_data": {
              "markdown": "## Step 1\n\nAnalyzing website structure..."
            }
          }
        }
      }
    },
    {
      "content_id": "update-reasoning-wrapper-002",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_queue": "reasoning",
      "content_delay": 300,
      "content_data": {
        "action": {
          "action_id": "update-reasoning-panel-002",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "reasoning-panel",
            "panel_header_title": "Analyzing...",
            "panel_body_data": {
              "markdown": "## Step 2\n\nEvaluating content quality and workflow quality factors..."
            }
          }
        }
      }
    },
    {
      "content_id": "update-reasoning-wrapper-003",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_queue": "reasoning",
      "content_data": {
        "action": {
          "action_id": "update-reasoning-panel-003",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "reasoning-panel",
            "panel_header_title": "Complete",
            "panel_body_data": {
              "markdown": "## Final Assessment\n\nAll analysis phases completed. Key insights identified."
            }
          }
        }
      }
    },
    {
      "content_id": "main-content-001",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_queue": "main",
      "content_data": {
        "markdown": "I'm updating both panels simultaneously with my findings."
      }
    }
  ]
}
```

### Progressive Panel Updates with Staggered Timing

**Scenario**: Create a sequence of updates that build on each other with natural pacing

**Message Payload**

```json
{
  "message_id": "chatmessage-progressive-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "progress-wrapper-001",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_delay": 400,
      "content_data": {
        "action": {
          "action_id": "progress-update-001",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "progress-panel",
            "panel_header_description": "Phase 1: Data Collection - 25% complete",
            "panel_body_data": {
              "markdown": "**Collecting data sources...**\n\n- Website content: Gathered\n- Social workspaces: Scanning...\n- Review sites: Pending"
            }
          }
        }
      }
    },
    {
      "content_id": "progress-wrapper-002",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_delay": 400,
      "content_data": {
        "action": {
          "action_id": "progress-update-002",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "progress-panel",
            "panel_header_description": "Phase 2: Analysis - 50% complete",
            "panel_body_data": {
              "markdown": "**Analyzing collected data...**\n\n- Website content: Analyzed\n- Social workspaces: Gathered\n- Review sites: Scanning..."
            }
          }
        }
      }
    },
    {
      "content_id": "progress-wrapper-003",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_delay": 400,
      "content_data": {
        "action": {
          "action_id": "progress-update-003",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "progress-panel",
            "panel_header_description": "Phase 3: Synthesis - 75% complete",
            "panel_body_data": {
              "markdown": "**Synthesizing insights...**\n\n- Website content: Complete\n- Social workspaces: Analyzed\n- Review sites: Gathered"
            }
          }
        }
      }
    },
    {
      "content_id": "progress-wrapper-004",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "progress-update-004",
          "action_type": "CHAT_ACTION_UPDATE_PANEL",
          "action_data": {
            "target": "CHAT",
            "panel_content_id": "progress-panel",
            "panel_header_description": "Complete - 100%",
            "panel_body_data": {
              "markdown": "**All phases complete!**\n\n- Website content: Complete\n- Social workspaces: Complete\n- Review sites: Complete\n\nReady to present findings."
            }
          }
        }
      }
    }
  ]
}
```

---

## Best Practices for content_delay with Panel Updates

### Placement Guidelines

- **Place `content_delay` on the LAST content item** when you want a pause before the next message
- For sequential panel updates, place delays on intermediate items to create pacing
- The delay is applied whenever `content_delay` is present on an item

### Message-Level Delay Removed

| Approach                   | Use Case                                                   |
| -------------------------- | ---------------------------------------------------------- |
| `content_delay`            | Fine-grained timing between panel updates within a message |
| Legacy message-level delay | Removed from API. Do not use.                              |

**Recommendation**: Use `content_delay` for timing between sequential panel updates. It integrates better with animations and provides more control.

### Use content_queue for Parallel Panel Processing

When updating multiple independent panels:

1. Assign each panel's updates to a different `content_queue`
2. Updates in the same queue process sequentially (maintaining order)
3. Updates in different queues process in parallel (enabling simultaneous rendering)
4. `content_delay` works independently within each queue

### Timing Guidelines for Panel Updates

| Delay Duration | Use Case                                                |
| -------------- | ------------------------------------------------------- |
| 200-400ms      | Quick state transitions, progress increments            |
| 500-800ms      | Standard update pauses, allowing user to notice changes |
| 1000-1500ms    | Significant state changes, phase completions            |
| 2000ms+        | Only for major reveals or dramatic effect               |

### Coordinating with Panel Animations

- `content_delay` starts AFTER the panel update animation completes
- Use `panel_transitions` for the visual animation, then `content_delay` for the pause
- Consider the total perceived time: animation duration + delay

### User Interaction Considerations

- All delays are skippable by user interaction
- Keep total delay time reasonable to avoid frustrating users
- For long update sequences, consider showing a progress indicator
