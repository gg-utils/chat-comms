/**
 * Chunk-safe debug block filter using parsed JSON inspection.
 *
 * Replaces substring-based `"debug": true` detection with actual JSON parsing
 * to avoid false positives from nested text containing that substring.
 */
declare const FENCE_PATTERN_START: string;
declare const FENCE_PATTERN_END = "```";
export interface ProtocolDebugBlockFilter {
    /** Appends a stream chunk and returns the safe-to-forward filtered output. */
    append(chunk: string): string;
    /** Releases any incomplete buffered content at stream end. */
    flush(): string;
    /** Clears pending buffered content without emitting it. */
    reset(): void;
    /** Returns the currently buffered incomplete stream suffix. */
    getPendingContent(): string;
}
/**
 * Filters out debug protocol blocks from streamed content.
 *
 * A protocol block is removed if parsing its JSON yields an object with `debug === true`.
 * Non-protocol fences and malformed JSON are passed through unchanged.
 *
 * @param content - Raw stream content that may contain fenced JSON blocks.
 * @returns Content with debug blocks removed.
 */
export declare function filterDebugProtocolBlocks(content: string): string;
/** Creates a stateful, chunk-safe debug protocol block filter for streaming writers. */
export declare function createProtocolDebugBlockFilter(): ProtocolDebugBlockFilter;
export { FENCE_PATTERN_START, FENCE_PATTERN_END };
//# sourceMappingURL=debug-filter.d.ts.map