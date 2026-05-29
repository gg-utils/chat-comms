---
description: "Usage examples for CANVAS_ACTION_OPEN type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CANVAS_ACTION_OPEN Specification](../type-specifications/CANVAS_ACTION_OPEN.md)**

# CANVAS_ACTION_OPEN Usage Examples

This document contains practical usage examples for the `CANVAS_ACTION_OPEN` action type, demonstrating canvas workspace scenarios with focus on example interface integration.

## Core Implementation

All canvas open actions use the same structure:

**Action Payload**

```json
{
  "action_id": "open-canvas-{context}",
  "action_type": "CANVAS_ACTION_OPEN",
  "action_data": {
    "target": "CANVAS",
    "canvas_id": "{canvas_id}",
    "canvas_title_label": "{title}",
    "canvas_title_href": "{url}", // optional - makes title clickable
    "canvas_contents": []
  }
}
```

---

## Essential Examples

### Document Analysis Canvas

This example demonstrates opening a canvas for document analysis, providing the user with a dedicated workspace for reviewing and editing content in a structured environment.

**Assistant Output**

````markdown
I'll open a dedicated canvas workspace for analyzing your document. This will give us a focused environment to review the content, make edits, and apply refinements without cluttering our main conversation.

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
        "markdown": "I'll open a dedicated canvas workspace for analyzing your document. This will give us a focused environment to review the content."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-document-analysis-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "document-analysis-001",
            "canvas_title_label": "Document Analysis Workspace",
            "canvas_title_href": "https://example.com/docs/analysis",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# Document Analysis\n\nAnalyzing your document for structure, content quality, and refinement opportunities."
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

### Collaborative Planning Canvas

This example shows opening a canvas for collaborative planning sessions, providing a shared workspace where multiple ideas, tasks, and strategies can be organized and developed together.

**Assistant Output**

````markdown
Let's open a collaborative planning canvas to organize our strategy. This dedicated workspace will help us structure our ideas, create action items, and track progress without losing important details in our conversation history.

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
        "markdown": "Let's open a collaborative planning canvas to organize our strategy. This dedicated workspace will help us structure our ideas and create action items."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-planning-canvas-002",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "collaborative-planning-002",
            "canvas_title_label": "Strategic Planning Workshop",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-objectives",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Planning Objectives",
                  "section_contents": [
                    {
                      "content_id": "objectives-intro",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "## Strategic Planning Session\n\nWe'll use this canvas to develop our comprehensive strategy, organize priorities, and create actionable next steps."
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

### Data Visualization Canvas

This example demonstrates opening a canvas for data visualization and analysis, providing an interactive workspace for exploring complex datasets and creating visual representations.

**Assistant Output**

````markdown
I'm opening a specialized canvas for data visualization to help you explore and understand your dataset. This interactive workspace will allow us to create charts, analyze trends, and generate insights from your data in a more visual and organized way.

**Message Payload**

```json
{
  "message_id": "chatmessage-0000003",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "chatmessage-0000003-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "I'm opening a specialized canvas for data visualization to help you explore and understand your dataset. This interactive workspace will allow us to create charts and analyze trends."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-data-viz-canvas-003",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "data-visualization-003",
            "canvas_title_label": "Data Analysis & Visualization",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-dataset-overview",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# Data Analysis Dashboard\n\nExploring your dataset to identify patterns, trends, and insights for strategic decision making."
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

### a sample interface Workspace Canvas

This example shows opening a sample workspace canvas for comprehensive workspace refinement, providing a dedicated workspace for reviewing, editing, and refining organization information for workflow quality.

**Assistant Output**

````markdown
I'll open your workspace canvas where we can work together to refine your workspace for maximum workflow quality. This dedicated workspace will help us review your organization information, apply refinement strategies, and ensure your workspace generates accurate responses from assistants.

**Message Payload**

```json
{
  "message_id": "example-workspace-canvas-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-workspace-canvas-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Opening Your Workspace Workspace**\n\nI'll open your workspace canvas where we can work together to refine your workspace for maximum workflow quality. This dedicated workspace will help us:\n\n- ✅ Review and refine your organization information\n- ✅ Apply AI refinement strategies\n- ✅ Ensure accurate assistant responses\n- ✅ Prepare for publishing and indexing\n\n**Ready to refine your organization for the AI age?**"
      }
    },
    {
      "content_id": "example-workspace-canvas-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-open-workspace-record-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-workspace-record-001",
            "canvas_title_label": "Workspace Setup",
            "canvas_title_href": "https://example.com/thehub-digital-london",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-organization-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Workspace Overview",
                  "section_contents": [
                    {
                      "content_id": "organization-info-intro",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "# Workspace Setup\n\nOptimizing your workspace to ensure assistants provide accurate, compelling responses about your services, expertise, and unique value proposition."
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

### Sample interface analytics Dashboard Canvas

This example demonstrates opening a sample interface analytics dashboard canvas, providing comprehensive insights into workflow quality metrics, performance tracking, and refinement opportunities.

**Assistant Output**

````markdown
Let me open your workflow quality analytics dashboard where you can track how effectively your prepared workspace is performing across different assistants. This comprehensive dashboard will show you readiness scores, response accuracy, and areas for continued improvement.

**Message Payload**

```json
{
  "message_id": "example-analytics-dashboard-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-analytics-dashboard-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 📊 **Workflow Quality Analytics Dashboard**\n\nLet me open your comprehensive analytics dashboard where you can track how effectively your prepared workspace is performing across different assistants.\n\n**Dashboard Features:**\n- 📈 **Readiness Scores** across ChatGPT, Claude, and Gemini\n- 🎯 **Response Accuracy** metrics and trends\n- 🔍 **Search Performance** and indexing status\n- 💡 **Refinement Recommendations** for continued improvement"
      }
    },
    {
      "content_id": "example-analytics-dashboard-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-open-analytics-dashboard",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-analytics-dashboard-001",
            "canvas_title_label": "Workflow Quality Analytics",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-analytics-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Workflow Quality Metrics",
                  "section_contents": [
                    {
                      "content_id": "analytics-overview",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "# Workflow Quality Analytics\n\nComprehensive dashboard tracking your workspace's performance across major assistant clients and search engines."
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

### a sample interface Content Generation Canvas

This example shows opening a canvas for a sample workflow's AI content generation, providing a structured workspace for creating refined workspace content that enhances workflow quality and response accuracy.

**Assistant Output**

````markdown
I'm opening a specialized content generation canvas to help create refined content for your workspace. This workspace will help us develop compelling descriptions, keyword-rich content, and structured information that maximizes your workflow quality and ensures accurate responses from assistants.

**Message Payload**

```json
{
  "message_id": "example-content-generation-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-content-generation-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## ✍️ **Model-Ready Content Generation**\n\nI'm opening a specialized content generation canvas to help create refined content for your workspace. This workspace will help us develop:\n\n- 📝 **Compelling organization descriptions** that assistant clients can easily understand\n- 🔑 **Keyword-rich content** for maximum search visibility\n- 📋 **Structured information** that ensures accurate assistant responses\n- 🎯 **Industry-specific refinements** tailored to your organization sector"
      }
    },
    {
      "content_id": "example-content-generation-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-open-content-generation-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-content-generation-001",
            "canvas_title_label": "AI Content Generation Workshop",
            "canvas_contents": [
              {
                "content_id": "canvas-content-01-content-header",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_SECTION",
                "content_data": {
                  "section_title": "Content Refinement Workshop",
                  "section_contents": [
                    {
                      "content_id": "content-generation-intro",
                      "content_queue": "main",
                      "content_type": "CANVAS_CONTENT_MARKDOWN",
                      "content_data": {
                        "markdown": "# AI Content Generation\n\nCreating refined content that enhances your workspace's visibility and accuracy across assistants and search engines."
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

## Common Use Cases

### Complex Document Work

- Long-form content creation and editing
- Multi-section document analysis
- Collaborative content development
- Technical documentation workflows

### Visual Analytics

- Data visualization and exploration
- Performance dashboard creation
- Trend analysis and reporting
- Interactive chart development

### Project Planning

- Strategic planning sessions
- Task organization and tracking
- Resource allocation planning
- Timeline development

### Educational Content

- Tutorial creation and organization
- Learning module development
- Knowledge base construction
- Training material organization

## Implementation Guidelines

### Canvas Structure

- Use descriptive, unique canvas IDs
- Include meaningful canvas titles
- Provide initial content structure
- Plan for content organization

### Content Organization

- Use sections for logical grouping
- Include clear headers and navigation
- Provide context for each section
- Maintain consistent formatting

### User Experience

- Explain the purpose of opening the canvas
- Set clear expectations for the workflow
- Provide orientation within the canvas
- Offer navigation guidance

### a sample interface Integration Points

- **Workspace Setup**: Canvas for workspace editing and refinement
- **Analytics Dashboard**: Canvas for metrics visualization and insights
- **Content Generation**: Canvas for creating refined workspace content
- **Configuration Management**: Canvas for settings and preferences

## Best Practices

- Always explain why you're opening a canvas
- Provide context about what the canvas will contain
- Use descriptive titles that indicate the canvas purpose
- Structure initial content to guide user workflow
- Consider the user's current context and goals
- Ensure canvas content is relevant to the conversation
