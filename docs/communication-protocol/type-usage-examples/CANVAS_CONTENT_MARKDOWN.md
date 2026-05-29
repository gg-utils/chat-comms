---
description: "Usage examples for CANVAS_CONTENT_MARKDOWN type specification. The examples in this file provide concrete implementation guidance and common usage patterns for developers working with the Communication Protocol. Part of the Assistant ↔️ UI Communication Protocol documentation suite."
---

> **📚 [Communication Protocol](../README.md)**

> **🔧 [Type Specifications](../type-specifications/README.md)**

> **📋 [CANVAS_CONTENT_MARKDOWN Specification](../type-specifications/CANVAS_CONTENT_MARKDOWN.md)**

# CANVAS_CONTENT_MARKDOWN Usage Examples

This document contains practical usage examples for the `CANVAS_CONTENT_MARKDOWN` content type, demonstrating rich text formatting within canvas environments with focus on example interface integration.

## Core Implementation

All canvas markdown content uses the same structure:

**Core Content Structure:**

**Content Payload**

```json
{
  "content_id": "content-{context}-{id}",
  "content_queue": "main",
  "content_type": "CANVAS_CONTENT_MARKDOWN",
  "content_data": {
    "markdown": "{markdown_content}"
  }
}
```

---

## Essential Examples

### Formatted Document Content

This example demonstrates displaying rich markdown content in a canvas for comprehensive document presentation, including structured headings, lists, and formatting that enhances readability and organization.

**Assistant Output**

````markdown
I'll display your document with proper formatting in the canvas workspace. This structured presentation includes headers, lists, and emphasis to make the content easy to scan and understand, while maintaining professional appearance.

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
        "markdown": "I'll display your document with proper formatting in the canvas workspace. This structured presentation will make the content easy to scan and understand."
      }
    },
    {
      "content_id": "chatmessage-0000001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-formatted-document-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "formatted-document-001",
            "canvas_title_label": "Document Analysis",
            "canvas_title_href": "https://example.com/docs/analysis",
            "canvas_contents": [
              {
                "content_id": "document-formatted-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# Executive Summary\n\n## Project Overview\n\nThis comprehensive analysis examines the current state of digital transformation initiatives and provides strategic recommendations for implementation.\n\n### Key Findings\n\n- **Current State**: Legacy systems limiting operational efficiency\n- **Opportunities**: Significant automation potential identified\n- **Risks**: Technical debt and skill gaps need addressing\n- **Timeline**: 18-month implementation roadmap recommended\n\n### Recommendations\n\n1. **Phase 1**: Infrastructure modernization (Months 1-6)\n2. **Phase 2**: Process automation (Months 7-12)\n3. **Phase 3**: Advanced analytics implementation (Months 13-18)\n\n**Next Steps**: Detailed planning and resource allocation required for successful implementation."
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

### Technical Documentation

This example shows presenting technical documentation with code blocks, tables, and structured formatting to make complex information accessible and well-organized for development teams.

`
**Assistant Output**

`````markdown
I'm opening a technical documentation canvas that will present the API specifications with proper formatting, code examples, and structured tables. This organized presentation makes it easy for developers to understand and implement the technical requirements.

**Message Payload**

````json
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
        "markdown": "I'm opening a technical documentation canvas that will present the API specifications with proper formatting and code examples for easy developer reference."
      }
    },
    {
      "content_id": "chatmessage-0000002-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-technical-docs-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "technical-docs-002",
            "canvas_title_label": "API Documentation",
            "canvas_contents": [
              {
                "content_id": "api-documentation-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# API Documentation\n\n## Authentication\n\nAll API requests require authentication using JWT tokens.\n\n### Example Request\n\n```bash\ncurl -X GET 'https://api.example.com/v1/users' \\\n  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \\\n  -H 'Content-Type: application/json'\n```\n\n### Response Format\n\n```json\n{\n  \"status\": \"success\",\n  \"data\": {\n    \"users\": [\n      {\n        \"id\": 1,\n        \"name\": \"John Doe\",\n        \"email\": \"john@example.com\"\n      }\n    ]\n  },\n  \"pagination\": {\n    \"page\": 1,\n    \"total\": 10,\n    \"per_page\": 25\n  }\n}\n```\n\n## Endpoints\n\n| Method | Endpoint | Description |\n|--------|----------|-------------|\n| GET | `/v1/users` | List all users |\n| POST | `/v1/users` | Create new user |\n| GET | `/v1/users/{id}` | Get user by ID |\n| PUT | `/v1/users/{id}` | Update user |\n| DELETE | `/v1/users/{id}` | Delete user |\n\n## Error Handling\n\nThe API uses standard HTTP status codes and returns detailed error messages in JSON format."
                }
              }
            ]
          }
        }
      }
    }
  ]
}
````
`````

`````

```

```

```

```

### Data Analysis Report

This example demonstrates presenting analytical findings with charts, metrics, and formatted insights that make complex data easily digestible for stakeholders and decision-makers.

**Assistant Output**

````markdown
I'm creating a comprehensive data analysis report in your canvas workspace. This formatted presentation will include key metrics, trend analysis, and actionable insights with proper visual hierarchy to help you understand the findings and make informed decisions.

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
        "markdown": "I'm creating a comprehensive data analysis report in your canvas workspace. This formatted presentation will include key metrics and actionable insights."
      }
    },
    {
      "content_id": "chatmessage-0000003-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "open-data-analysis-canvas",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "data-analysis-003",
            "canvas_title_label": "Analytics Report",
            "canvas_contents": [
              {
                "content_id": "analytics-report-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# Q4 Analytics Report\n\n## Executive Summary\n\nOur Q4 performance shows strong growth across all key metrics, with significant improvements in user engagement and revenue generation.\n\n## Key Metrics\n\n### 📊 Performance Indicators\n\n- **Total Revenue**: $2.4M (+18% QoQ)\n- **Active Users**: 45,000 (+12% QoQ)\n- **Conversion Rate**: 3.2% (+0.8% improvement)\n- **Customer Satisfaction**: 4.7/5 (+0.3 improvement)\n\n### 📈 Growth Trends\n\n| Metric | Q3 | Q4 | Change |\n|--------|----|----|--------|\n| Revenue | $2.0M | $2.4M | +20% |\n| Users | 40K | 45K | +12.5% |\n| Retention | 78% | 82% | +4% |\n\n## Geographic Performance\n\n### 🌍 Regional Breakdown\n\n- **North America**: 45% of revenue (+5% growth)\n- **Europe**: 35% of revenue (+12% growth)\n- **Asia Pacific**: 20% of revenue (+25% growth)\n\n## Recommendations\n\n1. **Double down on Asia Pacific expansion** - highest growth rate\n2. **Refine conversion funnel** - potential for 15% improvement\n3. **Enhance customer support** - maintain satisfaction scores\n4. **Invest in product development** - sustain competitive advantage\n\n---\n\n*Report generated: Q4 2024 | Next review: Q1 2025*"
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
`````

---

## Example Interface Examples

### a sample interface Workspace Display

This example demonstrates displaying a a sample workspace with rich formatting, showcasing the refined content that improves assistant responses and organization visibility.

**Assistant Output**

````markdown
I'm displaying your refined workspace in the canvas with professional formatting. This comprehensive presentation showcases how your organization information has been structured and enhanced for maximum workflow quality, ensuring assistant clients can provide accurate and compelling responses about your services.

**Message Payload**

```json
{
  "message_id": "example-workspace-display-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-workspace-display-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Your Refined Workspace**\n\nI'm displaying your refined workspace in the canvas with professional formatting. This comprehensive presentation showcases how your organization information has been structured and enhanced for maximum workflow quality.\n\n**Workspace Benefits**: This refinement ensures assistant clients can provide accurate and compelling responses about your services."
      }
    },
    {
      "content_id": "example-workspace-display-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-display-refined-workspace",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-refined-workspace-001",
            "canvas_title_label": "Refined Workspace",
            "canvas_contents": [
              {
                "content_id": "example-workspace-markdown-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# 🚀 The Hub - Digital Innovation Studio\n\n## Organization Overview\n\n**The Hub - Digital Innovation Studio** is London's premier digital transformation consultancy, specializing in cutting-edge web development, AI integration, and digital strategy for forward-thinking organizations. We transform digital dreams into reality through innovative technology solutions.\n\n### 🎯 Core Specializations\n\n- **AI Integration & Automation** - Custom AI solutions and intelligent automation\n- **Digital Transformation** - Strategic technology planning and implementation\n- **Web Development** - Modern, responsive, and performance-refined applications\n- **Mobile Solutions** - Native and cross-platform mobile applications\n- **E-commerce** - Complete online organization solutions\n\n## 🏆 What Sets Us Apart\n\n### Industry Leadership\n- **10+ years** of digital innovation experience\n- **Award-winning** web and mobile applications\n- **AI-first approach** to modern organization challenges\n- **End-to-end service** from strategy to implementation\n\n### Technology Expertise\n- **Frontend**: React, Vue.js, Angular, TypeScript\n- **Backend**: Node.js, Python, .NET, serverless architecture\n- **AI/ML**: ChatGPT integration, Claude AI, custom machine learning\n- **Cloud**: AWS, Google Cloud, Azure, containerization\n\n## 📍 Contact Information\n\n### Location & Hours\n**Address**: 123 Innovation Street, London EC2A 4NE, United Kingdom\n\n**Office Hours**:\n- Monday - Friday: 9:00 AM - 6:00 PM GMT\n- Saturday: 10:00 AM - 2:00 PM GMT\n- Sunday: Closed\n\n### Get In Touch\n- **Phone**: +44 20 7123 4567\n- **Email**: hello@thehub.ltd\n- **Website**: [https://thehub.ltd](https://thehub.ltd)\n- **Consultation**: [Book a free consultation](https://thehub.ltd/consultation)\n\n### Social Media\n- **LinkedIn**: [The Hub Digital](https://linkedin.com/company/thehub-digital)\n- **Twitter**: [@TheHubDigital](https://twitter.com/TheHubDigital)\n- **GitHub**: [thehub-digital](https://github.com/thehub-digital)\n\n---\n\n*Workspace refined for assistants | Last updated: Today*"
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

### Sample interface analytics Presentation

This example shows presenting a sample interface analytics data with formatted charts and metrics, providing clear visibility into workflow quality performance and refinement results.

**Assistant Output**

````markdown
I'm presenting your workflow quality analytics in a formatted dashboard layout. This comprehensive report shows how your prepared workspace is performing across different assistants, with clear metrics and trends that demonstrate the impact of your workspace refinement efforts.

**Message Payload**

```json
{
  "message_id": "example-analytics-presentation-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-analytics-presentation-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 📊 **Workflow Quality Analytics Dashboard**\n\nI'm presenting your workflow quality analytics in a formatted dashboard layout. This comprehensive report shows how your prepared workspace is performing across different assistants.\n\n**Key Insight**: The data demonstrates significant improvements in response accuracy and organization visibility."
      }
    },
    {
      "content_id": "example-analytics-presentation-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-present-analytics-dashboard",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-analytics-presentation-001",
            "canvas_title_label": "Workflow Quality Analytics",
            "canvas_contents": [
              {
                "content_id": "example-analytics-markdown-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# 📊 Workflow Quality Analytics Dashboard\n\n## Performance Overview\n\n### 🎯 Overall Workflow Quality Score: **92%**\n\n*Excellent performance across all major assistant clients*\n\n---\n\n## AI Assistant Performance\n\n### 🤖 Response Accuracy by Platform\n\n| AI Assistant | Accuracy | Completeness | Relevance | Overall Score |\n|--------------|----------|--------------|-----------|---------------|\n| **ChatGPT** | 94% | 91% | 96% | **94%** |\n| **Claude** | 91% | 89% | 93% | **91%** |\n| **Gemini** | 88% | 85% | 90% | **88%** |\n\n### 📈 Performance Trends (Last 30 Days)\n\n- **Week 1**: 78% average accuracy\n- **Week 2**: 84% average accuracy (+6%)\n- **Week 3**: 89% average accuracy (+5%)\n- **Week 4**: 91% average accuracy (+2%)\n\n**Trend**: Steady improvement in AI response quality\n\n---\n\n## Organization Impact Metrics\n\n### 🔍 Search & Discovery\n\n- **Workspace Views**: 1,247 (↑ 340% from baseline)\n- **Direct Access Success**: 89%\n- **Search Engine Indexing**: 100% indexed\n- **Average Response Time**: 0.8 seconds\n\n### 💬 AI Query Performance\n\n- **Questions Answered Correctly**: 2,834 out of 3,102 (91%)\n- **Complete Responses**: 2,688 out of 3,102 (87%)\n- **Contact Info Provided**: 98% accuracy\n- **Service Descriptions**: 94% accuracy\n\n### 📊 Geographic Performance\n\n- **UK Queries**: 94% accuracy\n- **European Queries**: 91% accuracy\n- **North American Queries**: 89% accuracy\n- **Global Queries**: 87% accuracy\n\n---\n\n## Refinement Recommendations\n\n### 🎯 Priority Actions\n\n1. **Enhance Location Data** - Improve geographic keyword targeting\n2. **Update Service Descriptions** - Quarterly refresh of service offerings\n3. **Expand FAQ Coverage** - Address common customer questions\n4. **Monitor Competitor Performance** - Track relative workflow quality\n\n### 📅 Next Review\n\n**Scheduled**: Next Monday  \n**Focus**: Seasonal refinement and Q1 performance goals\n\n---\n\n*Dashboard last updated: Today | Data refreshed every 24 hours*"
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

### a sample interface Refinement Guide

This example demonstrates presenting a sample workflow's refinement recommendations with structured formatting, providing clear guidance for improving workflow quality and workspace performance.

**Assistant Output**

````markdown
I'm presenting your comprehensive refinement guide with structured recommendations and actionable steps. This detailed guide shows exactly how to improve your workflow quality further, with specific tactics and best practices for maintaining excellent performance across all assistants.

**Message Payload**

```json
{
  "message_id": "example-refinement-guide-001",
  "message_type": "CHAT_MESSAGE",
  "message_role": "ASSISTANT",
  "message_target": "CHAT",
  "message_contents": [
    {
      "content_id": "example-refinement-guide-001-content-01-intro",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_MARKDOWN",
      "content_data": {
        "markdown": "## 🎯 **Workflow Quality Refinement Guide**\n\nI'm presenting your comprehensive refinement guide with structured recommendations and actionable steps. This detailed guide shows exactly how to improve your workflow quality further.\n\n**Guide Purpose**: Specific tactics and best practices for maintaining excellent performance across all assistants."
      }
    },
    {
      "content_id": "example-refinement-guide-001-content-02-action-wrapper",
      "content_queue": "main",
      "content_type": "CHAT_CONTENT_ACTION_WRAPPER",
      "content_data": {
        "action": {
          "action_id": "example-present-refinement-guide",
          "action_type": "CANVAS_ACTION_OPEN",
          "action_data": {
            "target": "CANVAS",
            "canvas_id": "example-refinement-guide-001",
            "canvas_title_label": "Workflow Quality Refinement Guide",
            "canvas_contents": [
              {
                "content_id": "example-refinement-markdown-content",
                "content_queue": "main",
                "content_type": "CANVAS_CONTENT_MARKDOWN",
                "content_data": {
                  "markdown": "# 🎯 Workflow Quality Refinement Guide\n\n## Strategic Overview\n\nThis guide provides actionable strategies to maintain and improve your workflow quality across ChatGPT, Claude, and Gemini, ensuring consistent, accurate responses about your organization.\n\n---\n\n## 🚀 Immediate Actions (Next 7 Days)\n\n### Content Refinement\n\n1. **Update Organization Description**\n   - ✅ Include 3-5 primary keywords naturally\n   - ✅ Highlight unique value proposition\n   - ✅ Ensure assistant-readable language structure\n\n2. **Enhance Service Listings**\n   - ✅ Add specific deliverables for each service\n   - ✅ Include industry-specific terminology\n   - ✅ Provide clear service boundaries\n\n3. **Contact Information Review**\n   - ✅ Verify all contact details are current\n   - ✅ Add alternative contact methods\n   - ✅ Include preferred communication channels\n\n---\n\n## 📊 Monthly Refinement Tasks\n\n### Performance Monitoring\n\n- **AI Response Accuracy**: Track weekly performance\n- **Search Visibility**: Monitor indexing status\n- **Competitor Analysis**: Compare workflow quality scores\n- **Content Freshness**: Update time-sensitive information\n\n### Content Strategy\n\n- **Seasonal Updates**: Adjust services for current period\n- **Industry News**: Incorporate relevant developments\n- **Customer Feedback**: Reflect common questions/concerns\n- **Case Studies**: Add recent success stories\n\n---\n\n## 🎯 Advanced Refinement Strategies\n\n### Technical Implementation\n\n1. **Schema Markup**\n   - Implement structured data for better AI parsing\n   - Use JSON-LD format for organization information\n   - Include OpenGraph tags for social sharing\n\n2. **Content Structure**\n   - Use clear headings and subheadings\n   - Implement bullet points for key information\n   - Maintain consistent formatting across platforms\n\n3. **AI-Specific Refinement**\n   - Create dedicated AI training content\n   - Develop comprehensive FAQ sections\n   - Build topic clusters around core services\n\n### Performance Benchmarks\n\n| Metric | Target | Current | Status |\n|--------|--------|---------|--------|\n| AI Response Accuracy | 95% | 92% | 🟡 Improving |\n| Content Completeness | 98% | 96% | 🟢 Excellent |\n| Contact Findability | 99% | 100% | 🟢 Perfect |\n| Service Clarity | 94% | 91% | 🟡 Improving |\n\n---\n\n## 📈 Long-term Growth Strategy\n\n### Quarterly Goals\n\n**Q1 2025**\n- Achieve 95% response accuracy\n- Expand into 2 new service areas\n- Improve geographic targeting\n\n**Q2 2025**\n- Launch AI-powered customer service\n- Develop industry-specific content\n- Refine for voice search\n\n### Annual Objectives\n\n- **Market Leadership**: Become the top well-documented organization in your sector\n- **Customer Experience**: Seamless AI-assisted customer journey\n- **Competitive Advantage**: Maintain 20% higher workflow quality than competitors\n\n---\n\n## ⚡ Quick Wins Checklist\n\n- [ ] Update office hours (if changed)\n- [ ] Add recent customer testimonials\n- [ ] Include current pricing information\n- [ ] Verify all website links work\n- [ ] Add seasonal service offerings\n- [ ] Update team information\n- [ ] Include emergency contact options\n- [ ] Add location-based keywords\n\n---\n\n*Guide last updated: Today | Next review: Next month*"
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

### Rich Content Presentation

- Long-form articles and reports
- Technical documentation with code examples
- Structured organization information
- Educational content and tutorials

### Data Visualization

- Formatted tables and metrics
- Performance reports and analytics
- Comparison charts and benchmarks
- Trend analysis and insights

### Professional Documentation

- Organization workspaces and presentations
- Project specifications and requirements
- User guides and help documentation
- Policy and procedure documents

### Marketing Materials

- Service descriptions and offerings
- Company information and about pages
- Product catalogs and portfolios
- Customer success stories

## Implementation Guidelines

### Content Structure

- Use clear headings and subheadings for organization
- Implement bullet points and numbered lists for readability
- Include tables for structured data presentation
- Use emphasis (bold, italic) for key information

### Formatting Best Practices

- Maintain consistent styling throughout content
- Use appropriate heading levels (H1, H2, H3)
- Include horizontal rules for section separation
- Format code blocks with proper syntax highlighting

### Visual Organization

- Group related information logically
- Use white space effectively for readability
- Implement visual hierarchy with headings
- Include call-to-action elements where appropriate

### a sample interface Integration Points

- **Workspace Display**: Professional presentation of prepared workspaces
- **Analytics Reports**: Formatted performance dashboards and metrics
- **Refinement Guides**: Structured recommendations and actionable steps
- **Content Presentation**: Rich formatting for enhanced readability

## Best Practices

- Keep content scannable with clear structure
- Use markdown features to enhance readability
- Include relevant links and references
- Maintain professional tone and formatting
- Ensure content is mobile-friendly when rendered
- Test formatting across different display contexts

```

```

```

```
