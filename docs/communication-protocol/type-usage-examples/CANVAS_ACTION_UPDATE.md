---
description: "Usage examples for CANVAS_ACTION_UPDATE type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CANVAS_ACTION_UPDATE Specification](../type-specifications/CANVAS_ACTION_UPDATE.md)**

# CANVAS_ACTION_UPDATE Usage Examples

This document contains practical usage examples for the `CANVAS_ACTION_UPDATE` action type, demonstrating dynamic canvas content updates with focus on example interface integration.

## Core Implementation

All canvas update actions use the same structure:

**Action Payload**

```json
{
  "action_id": "update-canvas-{context}",
  "action_type": "CANVAS_ACTION_UPDATE",
  "action_data": {
    "target": "CANVAS",
    "canvas_id": "{canvas_id}",
    "update_type": "{update_type}",
    "canvas_contents": []
  }
}
```

---

## Essential Examples

### Content Addition Update

This example demonstrates adding new content to an existing canvas, providing real-time updates to keep information current and comprehensive without requiring users to restart their workflow.

**Assistant Output**

````markdown
I've analyzed your additional data and I'm now adding the new insights to your existing analysis canvas. This update includes the latest findings and recommendations based on the expanded dataset, keeping your workspace current and comprehensive.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've analyzed your additional data and I'm now adding the new insights to your existing analysis canvas. This update includes the latest findings and recommendations."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-canvas-add-insights",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "analysis-workspace-001",
            "update_type": "ADD_CONTENT",
            "canvas_contents": [
              {
                "content_id": "new-insights-section",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Latest Analysis Results",
                  "section_contents": [
                    {
                      "content_id": "insights-data",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## New Insights\n\nBased on the expanded dataset, several key patterns have emerged that validate our initial hypothesis while revealing new refinement opportunities."
                      }
                    }
                  ]
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

### Content Replacement Update

This example shows replacing existing content in a canvas with updated information, ensuring users always have the most current and accurate data while maintaining the context of their work session.

**Assistant Output**

````markdown
I've completed the revised analysis and I'm now updating your canvas with the corrected findings. This replaces the preliminary results with the final, verified data and recommendations based on your feedback and additional research.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000002",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000002-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I've completed the revised analysis and I'm now updating your canvas with the corrected findings. This replaces the preliminary results with the final, verified data."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-canvas-replace-results",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "analysis-workspace-001",
            "update_type": "REPLACE_CONTENT",
            "target_content_id": "preliminary-results-section",
            "canvas_contents": [
              {
                "content_id": "final-results-section",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Final Analysis Results",
                  "section_contents": [
                    {
                      "content_id": "final-data",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Final Results\n\nAfter incorporating your feedback and conducting additional research, the analysis shows significantly stronger trends and clearer actionable recommendations."
                      }
                    }
                  ]
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

### Progress Update

This example demonstrates updating a canvas to reflect workflow progress, providing users with real-time feedback about ongoing processes and maintaining transparency about task completion status.

**Assistant Output**

````markdown
Great progress! I'm updating your project canvas to reflect the completion of the data processing phase. This update shows that we've successfully completed 3 out of 5 project phases and are now moving into the analysis and recommendation phase.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Great progress! I'm updating your project canvas to reflect the completion of the data processing phase. We've successfully completed 3 out of 5 project phases."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "update-canvas-progress-tracking",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "project-tracker-001",
            "update_type": "MODIFY_CONTENT",
            "target_content_id": "progress-section",
            "canvas_contents": [
              {
                "content_id": "updated-progress-section",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Project Progress",
                  "section_contents": [
                    {
                      "content_id": "progress-status",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Progress Status: 60% Complete\n\n✅ **Phase 1**: Initial Setup - Complete\n✅ **Phase 2**: Data Collection - Complete\n✅ **Phase 3**: Data Processing - Complete\n🔄 **Phase 4**: Analysis & Insights - In Progress\n⏳ **Phase 5**: Final Recommendations - Pending\n\n**Current Focus**: Generating insights and actionable recommendations from processed data."
                      }
                    }
                  ]
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

---

## Example Interface Examples

### a sample interface Workspace Refinement Progress

This example demonstrates updating a sample workspace canvas with refinement progress, showing real-time improvements and providing clear feedback about the workflow quality enhancement process.

**Assistant Output**

````markdown
Excellent progress on your workspace refinement! I'm updating your canvas to show the completed refinement steps and the significant improvements in workflow quality scores. Your workspace is now generating much more accurate and compelling responses from assistants.

**Message Payload**

```json
{
  "message_id": "example-workspace-refinement-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-workspace-refinement-update-001-content-01-progress",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Workspace Refinement Progress Update**\n\nExcellent progress on your workspace refinement! I'm updating your canvas to show the completed refinement steps and the significant improvements in workflow quality scores.\n\n**Latest Achievement**: Your workspace is now generating much more accurate and compelling responses from assistants."
      }
    },
    {
      "content_id": "example-workspace-refinement-update-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-update-workspace-refinement-progress",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-workspace-record-001",
            "update_type": "MODIFY_CONTENT",
            "target_content_id": "refinement-progress-section",
            "canvas_contents": [
              {
                "content_id": "updated-refinement-status",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Workflow Quality Refinement Progress",
                  "section_contents": [
                    {
                      "content_id": "refinement-metrics",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Refinement Status: 85% Complete\n\n### ✅ **Completed Refinements**\n- **Organization Description**: Enhanced with industry keywords and clear value proposition\n- **Service Offerings**: Structured and detailed with specific capabilities\n- **Contact Information**: Verified and formatted for AI parsing\n- **SEO Keywords**: Integrated naturally throughout workspace content\n- **Industry Specialties**: Highlighted key expertise areas\n\n### 🔄 **In Progress**\n- **Content Review**: Final accuracy and consistency checks\n- **AI Testing**: Validating responses across ChatGPT, Claude, and Gemini\n\n### 📊 **Workflow Quality Improvements**\n- **Response Accuracy**: 92% (up from 45%)\n- **Content Completeness**: 96% (up from 32%)\n- **Contact Findability**: 100% (up from 15%)\n\n**Next Step**: Ready for final review and publishing!"
                      }
                    }
                  ]
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

### Sample interface analytics Dashboard Update

This example shows updating a sample interface analytics dashboard with real-time performance metrics, providing users with current readiness scores and actionable insights for continued refinement.

**Assistant Output**

````markdown
Your analytics dashboard is now updated with the latest workflow quality metrics! The data shows strong performance improvements across all major assistant clients, with your workspace achieving excellent readiness scores and generating highly accurate responses about your organization.

**Message Payload**

```json
{
  "message_id": "example-analytics-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-analytics-update-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 📊 **Analytics Dashboard Updated**\n\nYour analytics dashboard is now updated with the latest workflow quality metrics! The data shows strong performance improvements across all major assistant clients.\n\n**Key Highlight**: Your workspace is achieving excellent readiness scores and generating highly accurate responses about your organization."
      }
    },
    {
      "content_id": "example-analytics-update-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-update-analytics-dashboard",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-analytics-dashboard-001",
            "update_type": "REPLACE_CONTENT",
            "target_content_id": "metrics-overview-section",
            "canvas_contents": [
              {
                "content_id": "latest-metrics-section",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Latest Workflow Quality Metrics",
                  "section_contents": [
                    {
                      "content_id": "current-performance-data",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Current Performance (Last 7 Days)\n\n### 🎯 **AI Workflow Quality Scores**\n- **ChatGPT**: 94% (↑ 47% from baseline)\n- **Claude**: 91% (↑ 52% from baseline)\n- **Gemini**: 88% (↑ 41% from baseline)\n\n### 📈 **Response Quality Metrics**\n- **Accuracy**: 96% (↑ 51% improvement)\n- **Completeness**: 93% (↑ 61% improvement)\n- **Relevance**: 97% (↑ 44% improvement)\n\n### 🔍 **Search Performance**\n- **Indexing Status**: 100% indexed across major engines\n- **Workspace Views**: 1,247 (up 340% this week)\n- **Direct Access**: 89% success rate\n\n### 💡 **Refinement Opportunities**\n- Consider adding seasonal service updates\n- Expand location-based keywords for local visibility\n- Update portfolio examples quarterly\n\n**Overall Status**: 🟢 **Excellent Performance** - Your workspace is delivering outstanding workflow quality results!"
                      }
                    }
                  ]
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

### a sample interface Content Generation Update

This example demonstrates updating a sample interface content generation canvas with newly created refined content, providing users with fresh, model-ready copy that enhances their workspace visibility.

**Assistant Output**

````markdown
Perfect! I've generated new model-ready content for your workspace and I'm updating your canvas with the fresh copy. This content is specifically designed to improve how assistants understand and respond to questions about your organization, incorporating industry keywords and clear value propositions.

**Message Payload**

```json
{
  "message_id": "example-content-generation-update-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-content-generation-update-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## ✍️ **New Content Generated**\n\nPerfect! I've generated new model-ready content for your workspace and I'm updating your canvas with the fresh copy.\n\n**Content Features**: This content is specifically designed to improve how assistants understand and respond to questions about your organization, incorporating industry keywords and clear value propositions."
      }
    },
    {
      "content_id": "example-content-generation-update-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-update-generated-content",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-content-generation-001",
            "update_type": "ADD_CONTENT",
            "canvas_contents": [
              {
                "content_id": "new-refined-content-section",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Model-Ready Organization Content",
                  "section_contents": [
                    {
                      "content_id": "refined-organization-description",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Generated Content\n\n### **Organization Description (Model-Ready)**\n\n> **The Hub - Digital Innovation Studio** is a cutting-edge digital transformation consultancy specializing in AI-powered organization solutions, modern web development, and strategic technology integration. Based in London, we help organizations leverage artificial intelligence, machine learning, and advanced digital tools to refine operations, enhance customer experiences, and drive sustainable growth.\n\n### **Key Services (Structured for AI Understanding)**\n\n1. **AI Integration & Automation**\n   - Custom AI solution development\n   - Process automation and refinement\n   - Machine learning model implementation\n\n2. **Digital Transformation Consulting**\n   - Strategic technology planning\n   - Digital workflow refinement\n   - Legacy system modernization\n\n3. **Web Development & Design**\n   - Modern web applications\n   - E-commerce solutions\n   - Progressive web app development\n\n### **Industry Specializations**\n- Technology startups and scale-ups\n- Professional services firms\n- Manufacturing and logistics\n- Financial services\n\n**Contact**: Located in London, UK | Available for UK and international projects"
                      }
                    }
                  ]
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

### Progressive Workspace Reveal

This example demonstrates using the REVEAL modification type to progressively unveil workspace sections that were initially collapsed or hidden, creating a dynamic reveal experience as the assistant presents workspace information.

**Assistant Output**

````markdown
Let me show you the services section of your workspace. I'm revealing the detailed breakdown of everything your organization offers!

**Message Payload**

```json
{
  "message_id": "example-reveal-completed-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-reveal-completed-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "Let me show you the services section of your workspace. I'm revealing the detailed breakdown of everything your organization offers!"
      }
    },
    {
      "content_id": "example-reveal-completed-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-reveal-services-section",
          "action_type": "CANVAS_ACTION_UPDATE",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-workspace-record-001",
            "modify_contents": {
              "target_content_id": "workspace-services-section",
              "modification_type": "REVEAL",
              "new_content_data": {
                "section_collapsed": false,
                "section_title": "Services & Products",
                "section_contents": [
                  {
                    "content_id": "services-details",
                    "content_queue": "main",
                    "content_type": "CANVAS_CONTENT_MARKDOWN",
                    "content_data": {
                      "markdown": "## Core Services\n\n### AI Integration & Consulting\nCustom AI solution development tailored to your organization needs, including machine learning implementation and process automation.\n\n### Digital Transformation\nComprehensive digital modernization services to refine your operations and enhance customer experiences.\n\n### Web Development\nModern, responsive web applications built with cutting-edge technologies."
                    }
                  }
                ]
              },
              "streaming_options": {
                "desiredTotalDuration": 2000,
                "maximumDuration": 5000
              }
            }
          }
        }
      }
    }
  ]
}
```
````

---

## Common Use Cases

### Dynamic Content Updates

- Real-time data refreshing
- Progress tracking and status updates
- Content versioning and revisions
- Collaborative editing workflows

### Workflow State Management

- Multi-step process tracking
- Conditional content display
- User interaction responses
- Error handling and recovery

### Performance Monitoring

- Analytics dashboard updates
- Metrics visualization
- Alert and notification integration
- Historical data tracking

### Content Personalization

- User-specific content delivery
- Context-aware information display
- Preference-based customization
- Adaptive user interfaces

## Implementation Guidelines

### Update Types

- **ADD_CONTENT**: Append new content to existing canvas
- **REPLACE_CONTENT**: Replace specific content sections
- **MODIFY_CONTENT**: Update existing content in place
- **REMOVE_CONTENT**: Remove specific content sections

### Modification Types (for modify_contents)

- **REPLACE**: Completely replace the target content with new content
- **UPDATE_PROPERTIES**: Update specific properties without replacing entire content
- **APPEND_TO_CONTENT**: Add new content to the end of existing content
- **REVEAL**: Progressively reveal content that was previously hidden or collapsed

### Streaming Options (for REVEAL modification type)

When using the `REVEAL` modification type, you can optionally include `streaming_options` to control how content is progressively revealed. There are two mutually exclusive modes:

**Mode 1: Manual Chunking** (use `chunkInterval` + `chunkSize`)

- **chunkInterval**: Time interval in milliseconds between each streamed chunk (e.g., `50` for smooth reveals)
- **chunkSize**: Size of each streamed chunk in characters or units (e.g., `100` characters per chunk)

**Mode 2: Duration-Based** (use `desiredTotalDuration` + `maximumDuration`)

- **desiredTotalDuration**: Target total duration in milliseconds for streaming all content (e.g., `2000` for 2 seconds)
- **maximumDuration**: Maximum allowed duration in milliseconds as an upper bound safety limit (e.g., `5000` for 5 seconds)

> **Note**: Do not mix properties from both modes. Use either manual chunking OR duration-based streaming, not both.

### Content Targeting

- Use `target_content_id` to specify exact content for updates
- Ensure content IDs are unique and descriptive
- Plan content structure to support efficient updates
- Consider content dependencies and relationships

### Performance Refinement

- Batch related updates when possible
- Use efficient update types for specific scenarios
- Consider user experience during updates
- Implement proper error handling

### a sample interface Integration Points

- **Workspace Refinement**: Real-time progress updates during refinement
- **Analytics Dashboard**: Live metrics and performance data updates
- **Content Generation**: Fresh model-ready content delivery
- **Publishing Status**: Real-time publishing and indexing updates

## Best Practices

- Provide clear context about what is being updated
- Explain the reason for updates to maintain user understanding
- Use appropriate update types for different scenarios
- Ensure updates enhance rather than disrupt user workflow
- Maintain content consistency and quality across updates
- Consider timing and frequency of updates for optimal user experience
