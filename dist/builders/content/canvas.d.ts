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
import type { CommunicationProtocol_CanvasHtmlContentOptions, CommunicationProtocol_CanvasMarkdownContentOptions, CommunicationProtocol_CanvasSectionContentOptions } from "../../options/content-options.js";
import type { CommunicationProtocol_CanvasHtmlContent, CommunicationProtocol_CanvasMarkdownContent, CommunicationProtocol_CanvasSectionContent } from "../../types/canvas.js";
interface CanvasContentMetadata {
    toc_label?: string;
    toc_key?: string;
    section_data?: unknown;
}
type CanvasContentMetadataForSectionData<SectionData> = Omit<CanvasContentMetadata, "section_data"> & {
    section_data?: SectionData;
};
type CanvasHtmlContentForSectionData<SectionData> = Omit<CommunicationProtocol_CanvasHtmlContent, "content_data"> & {
    content_data: Omit<CommunicationProtocol_CanvasHtmlContent["content_data"], "section_data"> & CanvasContentMetadataForSectionData<SectionData>;
};
type CanvasMarkdownContentForSectionData<SectionData> = Omit<CommunicationProtocol_CanvasMarkdownContent, "content_data"> & {
    content_data: Omit<CommunicationProtocol_CanvasMarkdownContent["content_data"], "section_data"> & CanvasContentMetadataForSectionData<SectionData>;
};
type CanvasSectionContentForSectionData<SectionData> = Omit<CommunicationProtocol_CanvasSectionContent, "content_data"> & {
    content_data: Omit<CommunicationProtocol_CanvasSectionContent["content_data"], "section_data"> & CanvasContentMetadataForSectionData<SectionData>;
};
/** Fluent builder for CANVAS_CONTENT_HTML with optional navigation/extension metadata. */
export declare class CommunicationProtocol_CanvasHtmlContentBuilder<SectionData = unknown> {
    private content;
    constructor(options: CommunicationProtocol_CanvasHtmlContentOptions<SectionData>);
    html(html: string): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData>;
    tocLabel(tocLabel: string | undefined): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData>;
    tocKey(tocKey: string | undefined): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData>;
    sectionData(sectionData: SectionData): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData>;
    build(): CanvasHtmlContentForSectionData<SectionData>;
}
/** Fluent builder for CANVAS_CONTENT_MARKDOWN with optional navigation/extension metadata. */
export declare class CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData = unknown> {
    private content;
    constructor(options: CommunicationProtocol_CanvasMarkdownContentOptions<SectionData>);
    markdown(markdown: string): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData>;
    markdownStyle(markdownStyle: CommunicationProtocol_CanvasMarkdownContent["content_data"]["markdown_style"]): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData>;
    tocLabel(tocLabel: string | undefined): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData>;
    tocKey(tocKey: string | undefined): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData>;
    sectionData(sectionData: SectionData): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData>;
    build(): CanvasMarkdownContentForSectionData<SectionData>;
}
/** Fluent builder for CANVAS_CONTENT_SECTION with nested canvas content items. */
export declare class CommunicationProtocol_CanvasSectionContentBuilder<SectionData = unknown> {
    private content;
    constructor(options: CommunicationProtocol_CanvasSectionContentOptions<SectionData>);
    sectionTitle(sectionTitle: string): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    sectionCollapsed(sectionCollapsed: boolean | undefined): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    sectionContents(sectionContents: CommunicationProtocol_CanvasSectionContent["content_data"]["section_contents"]): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    addSectionContent(sectionContent: CommunicationProtocol_CanvasSectionContent["content_data"]["section_contents"][number]): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    tocLabel(tocLabel: string | undefined): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    tocKey(tocKey: string | undefined): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    sectionData(sectionData: SectionData): CommunicationProtocol_CanvasSectionContentBuilder<SectionData>;
    build(): CanvasSectionContentForSectionData<SectionData>;
}
/** Build a canonical CANVAS_CONTENT_HTML content item. */
export declare function buildProtocolCanvasHtmlContent<SectionData = unknown>(options: CommunicationProtocol_CanvasHtmlContentOptions<SectionData>): CanvasHtmlContentForSectionData<SectionData>;
/** Build a canonical CANVAS_CONTENT_MARKDOWN content item. */
export declare function buildProtocolCanvasMarkdownContent<SectionData = unknown>(options: CommunicationProtocol_CanvasMarkdownContentOptions<SectionData>): CanvasMarkdownContentForSectionData<SectionData>;
/** Build a canonical CANVAS_CONTENT_SECTION content item. */
export declare function buildProtocolCanvasSectionContent<SectionData = unknown>(options: CommunicationProtocol_CanvasSectionContentOptions<SectionData>): CanvasSectionContentForSectionData<SectionData>;
export {};
//# sourceMappingURL=canvas.d.ts.map