/**
 * Incremental fenced-JSON block parser using a state machine for chunk safety.
 *
 * Only canonical lowercase `json` fences are recognized as protocol blocks.
 * Non-`json` fences (typescript, javascript, JSON uppercase) are ignored.
 */
export interface ParsedProtocolBlock {
    /** The parsed JSON value (object or array). */
    json: unknown;
    /** The raw JSON string between fences. */
    raw: string;
    /** Complete canonical fenced block, including opening and closing fences. */
    fencedBlock: string;
}
export interface IncrementalParseResult {
    /** Successfully parsed complete protocol blocks. */
    blocks: ParsedProtocolBlock[];
    /** Cursor position for the next parse call. */
    nextCursor: number;
}
/**
 * Extracts all complete fenced JSON blocks from a buffer starting at cursor.
 *
 * State-machine approach: tracks brace/bracket depth, string escaping,
 * and fence boundaries character-by-character for chunk-split safety.
 */
export declare function extractProtocolFencedJsonBlocksIncremental(buffer: string, cursor: number): IncrementalParseResult;
//# sourceMappingURL=parser.d.ts.map