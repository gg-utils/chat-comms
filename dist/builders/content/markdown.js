/**
 * @fileoverview Builds CHAT_CONTENT_MARKDOWN payloads for styled markdown blocks inside chat messages.
 *
 * Markdown travels as raw string plus `markdown_style`; callers choose width and queue hints alongside ProtocolIdUtils-backed `content_id`.
 *
 * @example
 * ```typescript
 * import { CommunicationProtocol_MarkdownContentBuilder } from "./markdown.js";
 *
 * const content = new CommunicationProtocol_MarkdownContentBuilder({
 *   content_queue: "main",
 *   content_id_suffix: "intro",
 *   markdown: "# Hello\n\n**Bold** copy.",
 *   style: "DEFAULT",
 *   message_id: "msg-70",
 * })
 *   .style("LARGE")
 *   .build();
 * ```
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @see @gg-utils/chat-comms/docs/communication-protocol/type-specifications/CHAT_CONTENT_MARKDOWN.md - markdown content contract
 * @see @gg-utils/chat-comms/builders - Package builder facade.
 *  * @documentation reviewed=2026-04-13 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import { ProtocolIdUtils } from "../protocol-id-utils.js";
/**
 * Fluent builder for CHAT_CONTENT_MARKDOWN with auto-ID support.
 *
 * @remarks
 * Persists markdown + style on `content_data`; `build()` returns a shallow copy.
 *
 * @example
 * `new CommunicationProtocol_MarkdownContentBuilder({ autoId: "md", markdown: "# Hi", message_id: "m" }).build()`
 */
export class CommunicationProtocol_MarkdownContentBuilder {
    content;
    /**
     * Initialize the markdown content builder
     *
     * @param options - Configuration options for the markdown content
     */
    constructor(options) {
        const { markdown, style = "DEFAULT", content_width: content_width = "WIDTH_AUTO", content_queue, content_delay, message_id, } = options;
        this.content = {
            content_id: ProtocolIdUtils.resolveContentId(options),
            content_type: "CHAT_CONTENT_MARKDOWN",
            content_width,
            content_queue,
            ...(content_delay && { content_delay }),
            content_data: {
                markdown,
                markdown_style: style,
            },
        };
    }
    /**
     * Set markdown style (DEFAULT, COMPACT, LARGE)
     *
     * @param style - Visual style variant for the markdown content
     * @returns This builder instance for method chaining
     */
    style(style) {
        this.content.content_data.markdown_style = style;
        return this;
    }
    /**
     * Set content width (WIDTH_AUTO, WIDTH_FULL)
     *
     * @param width - Width behavior for content rendering
     * @returns This builder instance for method chaining
     */
    content_width(width) {
        this.content.content_width = width;
        return this;
    }
    /**
     * Build and return the final chat content object
     *
     * @returns Immutable copy of the configured chat content
     */
    build() {
        return { ...this.content };
    }
}
//# sourceMappingURL=markdown.js.map