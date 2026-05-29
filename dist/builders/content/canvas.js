/**
 * @fileoverview Builds product-agnostic CANVAS_CONTENT payloads for canvas open/update actions.
 *
 * These builders own the reusable canvas content object grammar while keeping domain payloads
 * opaque through `section_data?: unknown`, so consumers can attach app-specific renderer metadata
 * without teaching the shared package about that domain.
 *
 * @example
 * ```typescript
 * import { buildProtocolCanvasHtmlContent } from "./canvas.js";
 *
 * const content = buildProtocolCanvasHtmlContent({
 *   content_id: "canvas-content-1",
 *   html: "<section>Hello</section>",
 *   toc_label: "Hello",
 * });
 * void content;
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_HTML.md - HTML canvas content contract.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_MARKDOWN.md - Markdown canvas content contract.
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CANVAS_CONTENT_SECTION.md - Section canvas content contract.
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { ProtocolIdUtils } from "../protocol-id-utils.js";
function buildCanvasContentMetadata(options) {
    const metadata = {};
    if (options.toc_label !== undefined) {
        metadata.toc_label = options.toc_label;
    }
    if (options.toc_key !== undefined) {
        metadata.toc_key = options.toc_key;
    }
    if (options.section_data !== undefined) {
        metadata.section_data = options.section_data;
    }
    return metadata;
}
/** Fluent builder for CANVAS_CONTENT_HTML with optional navigation/extension metadata. */
export class CommunicationProtocol_CanvasHtmlContentBuilder {
    content;
    constructor(options) {
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CANVAS_CONTENT_HTML",
            content_data: {
                ...buildCanvasContentMetadata(options),
                html: options.html,
            },
        };
    }
    html(html) {
        this.content.content_data.html = html;
        return this;
    }
    tocLabel(tocLabel) {
        this.content.content_data.toc_label = tocLabel;
        return this;
    }
    tocKey(tocKey) {
        this.content.content_data.toc_key = tocKey;
        return this;
    }
    sectionData(sectionData) {
        this.content.content_data.section_data = sectionData;
        return this;
    }
    build() {
        return {
            ...this.content,
            content_data: { ...this.content.content_data },
        };
    }
}
/** Fluent builder for CANVAS_CONTENT_MARKDOWN with optional navigation/extension metadata. */
export class CommunicationProtocol_CanvasMarkdownContentBuilder {
    content;
    constructor(options) {
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CANVAS_CONTENT_MARKDOWN",
            content_data: {
                ...buildCanvasContentMetadata(options),
                markdown: options.markdown,
                ...(options.markdown_style !== undefined
                    ? { markdown_style: options.markdown_style }
                    : {}),
            },
        };
    }
    markdown(markdown) {
        this.content.content_data.markdown = markdown;
        return this;
    }
    markdownStyle(markdownStyle) {
        this.content.content_data.markdown_style = markdownStyle;
        return this;
    }
    tocLabel(tocLabel) {
        this.content.content_data.toc_label = tocLabel;
        return this;
    }
    tocKey(tocKey) {
        this.content.content_data.toc_key = tocKey;
        return this;
    }
    sectionData(sectionData) {
        this.content.content_data.section_data = sectionData;
        return this;
    }
    build() {
        return {
            ...this.content,
            content_data: { ...this.content.content_data },
        };
    }
}
/** Fluent builder for CANVAS_CONTENT_SECTION with nested canvas content items. */
export class CommunicationProtocol_CanvasSectionContentBuilder {
    content;
    constructor(options) {
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CANVAS_CONTENT_SECTION",
            content_data: {
                ...buildCanvasContentMetadata(options),
                section_title: options.sectionTitle,
                section_contents: [...options.sectionContents],
                ...(options.sectionCollapsed !== undefined
                    ? { section_collapsed: options.sectionCollapsed }
                    : {}),
                ...(options.sectionStyle !== undefined
                    ? { section_style: options.sectionStyle }
                    : {}),
            },
        };
    }
    sectionTitle(sectionTitle) {
        this.content.content_data.section_title = sectionTitle;
        return this;
    }
    sectionCollapsed(sectionCollapsed) {
        this.content.content_data.section_collapsed = sectionCollapsed;
        return this;
    }
    sectionContents(sectionContents) {
        this.content.content_data.section_contents = [...sectionContents];
        return this;
    }
    addSectionContent(sectionContent) {
        this.content.content_data.section_contents = [
            ...this.content.content_data.section_contents,
            sectionContent,
        ];
        return this;
    }
    tocLabel(tocLabel) {
        this.content.content_data.toc_label = tocLabel;
        return this;
    }
    tocKey(tocKey) {
        this.content.content_data.toc_key = tocKey;
        return this;
    }
    sectionData(sectionData) {
        this.content.content_data.section_data = sectionData;
        return this;
    }
    build() {
        return {
            ...this.content,
            content_data: {
                ...this.content.content_data,
                section_contents: [...this.content.content_data.section_contents],
            },
        };
    }
}
/** Build a canonical CANVAS_CONTENT_HTML content item. */
export function buildProtocolCanvasHtmlContent(options) {
    return new CommunicationProtocol_CanvasHtmlContentBuilder(options).build();
}
/** Build a canonical CANVAS_CONTENT_MARKDOWN content item. */
export function buildProtocolCanvasMarkdownContent(options) {
    return new CommunicationProtocol_CanvasMarkdownContentBuilder(options).build();
}
/** Build a canonical CANVAS_CONTENT_SECTION content item. */
export function buildProtocolCanvasSectionContent(options) {
    return new CommunicationProtocol_CanvasSectionContentBuilder(options).build();
}
//# sourceMappingURL=canvas.js.map