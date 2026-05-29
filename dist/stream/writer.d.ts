/**
 * Serializes a value as a canonical protocol fenced-JSON block for stream transport.
 *
 * @param value - JSON-serializable protocol payload.
 * @param options.compact - When true, emits minified single-line JSON. Default: false.
 */
export declare function writeProtocolFencedJsonBlock(value: unknown, options?: {
    compact?: boolean;
}): string;
//# sourceMappingURL=writer.d.ts.map