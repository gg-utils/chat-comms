/**
 * @fileoverview Product-agnostic markdown-to-protocol segment extraction for stream summaries.
 *
 * The protocol transport accepts lowercase fenced `json` blocks only. Other code fences are
 * ignored as developer/code content, while surrounding prose remains available as string segments
 * for summary generation. Four-or-more-backtick container fences are recursively scanned so
 * markdown examples can contain canonical triple-backtick protocol blocks without escaping them.
 *
 * @testing cd chat-stream-protocol && npm test
 */
import type { ProtocolStreamParser_Segment } from "./summary-parser.js";
/** Extract package-owned protocol stream segments from raw markdown/text stream output. */
export declare function extractProtocolStreamSegmentsFromMarkdown(content: string): ProtocolStreamParser_Segment[];
//# sourceMappingURL=segment-extractor.d.ts.map