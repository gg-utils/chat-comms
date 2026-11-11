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

import type {
  CommunicationProtocol_CanvasContentMetadataOptions,
  CommunicationProtocol_CanvasHtmlContentOptions,
  CommunicationProtocol_CanvasMarkdownContentOptions,
  CommunicationProtocol_CanvasSectionContentOptions,
} from "../../options/content-options.js";
import type {
  CommunicationProtocol_CanvasHtmlContent,
  CommunicationProtocol_CanvasMarkdownContent,
  CommunicationProtocol_CanvasSectionContent,
} from "../../types/canvas.js";
import { ProtocolIdUtils } from "../protocol-id-utils.js";

interface CanvasContentMetadata {
  toc_label?: string | undefined;
  toc_key?: string | undefined;
  section_data?: unknown;
}

type CanvasContentMetadataForSectionData<SectionData> = Omit<
  CanvasContentMetadata,
  "section_data"
> & {
  section_data?: SectionData;
};

type CanvasHtmlContentForSectionData<SectionData> = Omit<
  CommunicationProtocol_CanvasHtmlContent,
  "content_data"
> & {
  content_data: Omit<
    CommunicationProtocol_CanvasHtmlContent["content_data"],
    "section_data"
  > &
    CanvasContentMetadataForSectionData<SectionData>;
};

type CanvasMarkdownContentForSectionData<SectionData> = Omit<
  CommunicationProtocol_CanvasMarkdownContent,
  "content_data"
> & {
  content_data: Omit<
    CommunicationProtocol_CanvasMarkdownContent["content_data"],
    "section_data"
  > &
    CanvasContentMetadataForSectionData<SectionData>;
};

type CanvasSectionContentForSectionData<SectionData> = Omit<
  CommunicationProtocol_CanvasSectionContent,
  "content_data"
> & {
  content_data: Omit<
    CommunicationProtocol_CanvasSectionContent["content_data"],
    "section_data"
  > &
    CanvasContentMetadataForSectionData<SectionData>;
};

function buildCanvasContentMetadata<SectionData>(
  options: CommunicationProtocol_CanvasContentMetadataOptions<SectionData>,
): CanvasContentMetadataForSectionData<SectionData> {
  const metadata: CanvasContentMetadataForSectionData<SectionData> = {};

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
export class CommunicationProtocol_CanvasHtmlContentBuilder<
  SectionData = unknown,
> {
  private content: CanvasHtmlContentForSectionData<SectionData>;

  constructor(options: CommunicationProtocol_CanvasHtmlContentOptions<SectionData>) {
    this.content = {
      content_id: ProtocolIdUtils.resolveContentId(options),
      content_type: "CANVAS_CONTENT_HTML",
      content_data: {
        ...buildCanvasContentMetadata(options),
        html: options.html,
      },
    };
  }

  html(html: string): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData> {
    this.content.content_data.html = html;
    return this;
  }

  tocLabel(
    tocLabel: string | undefined,
  ): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData> {
    this.content.content_data.toc_label = tocLabel;
    return this;
  }

  tocKey(
    tocKey: string | undefined,
  ): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData> {
    this.content.content_data.toc_key = tocKey;
    return this;
  }

  sectionData(
    sectionData: SectionData,
  ): CommunicationProtocol_CanvasHtmlContentBuilder<SectionData> {
    this.content.content_data.section_data = sectionData;
    return this;
  }

  build(): CanvasHtmlContentForSectionData<SectionData> {
    return {
      ...this.content,
      content_data: { ...this.content.content_data },
    };
  }
}

/** Fluent builder for CANVAS_CONTENT_MARKDOWN with optional navigation/extension metadata. */
export class CommunicationProtocol_CanvasMarkdownContentBuilder<
  SectionData = unknown,
> {
  private content: CanvasMarkdownContentForSectionData<SectionData>;

  constructor(options: CommunicationProtocol_CanvasMarkdownContentOptions<SectionData>) {
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

  markdown(
    markdown: string,
  ): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData> {
    this.content.content_data.markdown = markdown;
    return this;
  }

  markdownStyle(
    markdownStyle: CommunicationProtocol_CanvasMarkdownContent["content_data"]["markdown_style"],
  ): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData> {
    this.content.content_data.markdown_style = markdownStyle;
    return this;
  }

  tocLabel(
    tocLabel: string | undefined,
  ): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData> {
    this.content.content_data.toc_label = tocLabel;
    return this;
  }

  tocKey(
    tocKey: string | undefined,
  ): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData> {
    this.content.content_data.toc_key = tocKey;
    return this;
  }

  sectionData(
    sectionData: SectionData,
  ): CommunicationProtocol_CanvasMarkdownContentBuilder<SectionData> {
    this.content.content_data.section_data = sectionData;
    return this;
  }

  build(): CanvasMarkdownContentForSectionData<SectionData> {
    return {
      ...this.content,
      content_data: { ...this.content.content_data },
    };
  }
}

/** Fluent builder for CANVAS_CONTENT_SECTION with nested canvas content items. */
export class CommunicationProtocol_CanvasSectionContentBuilder<
  SectionData = unknown,
> {
  private content: CanvasSectionContentForSectionData<SectionData>;

  constructor(options: CommunicationProtocol_CanvasSectionContentOptions<SectionData>) {
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

  sectionTitle(
    sectionTitle: string,
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.section_title = sectionTitle;
    return this;
  }

  sectionCollapsed(
    sectionCollapsed: boolean | undefined,
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.section_collapsed = sectionCollapsed;
    return this;
  }

  sectionContents(
    sectionContents: CommunicationProtocol_CanvasSectionContent["content_data"]["section_contents"],
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.section_contents = [...sectionContents];
    return this;
  }

  addSectionContent(
    sectionContent: CommunicationProtocol_CanvasSectionContent["content_data"]["section_contents"][number],
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.section_contents = [
      ...this.content.content_data.section_contents,
      sectionContent,
    ];
    return this;
  }

  tocLabel(
    tocLabel: string | undefined,
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.toc_label = tocLabel;
    return this;
  }

  tocKey(
    tocKey: string | undefined,
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.toc_key = tocKey;
    return this;
  }

  sectionData(
    sectionData: SectionData,
  ): CommunicationProtocol_CanvasSectionContentBuilder<SectionData> {
    this.content.content_data.section_data = sectionData;
    return this;
  }

  build(): CanvasSectionContentForSectionData<SectionData> {
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
export function buildProtocolCanvasHtmlContent<SectionData = unknown>(
  options: CommunicationProtocol_CanvasHtmlContentOptions<SectionData>,
): CanvasHtmlContentForSectionData<SectionData> {
  return new CommunicationProtocol_CanvasHtmlContentBuilder(options).build();
}

/** Build a canonical CANVAS_CONTENT_MARKDOWN content item. */
export function buildProtocolCanvasMarkdownContent<SectionData = unknown>(
  options: CommunicationProtocol_CanvasMarkdownContentOptions<SectionData>,
): CanvasMarkdownContentForSectionData<SectionData> {
  return new CommunicationProtocol_CanvasMarkdownContentBuilder(options).build();
}

/** Build a canonical CANVAS_CONTENT_SECTION content item. */
export function buildProtocolCanvasSectionContent<SectionData = unknown>(
  options: CommunicationProtocol_CanvasSectionContentOptions<SectionData>,
): CanvasSectionContentForSectionData<SectionData> {
  return new CommunicationProtocol_CanvasSectionContentBuilder(options).build();
}
