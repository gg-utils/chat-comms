import { PROTOCOL_FENCE_LANGUAGE } from "../wire/constants.js";
/**
 * Serializes a value as a canonical protocol fenced-JSON block for stream transport.
 *
 * @param value - JSON-serializable protocol payload.
 * @param options.compact - When true, emits minified single-line JSON. Default: false.
 */
export function writeProtocolFencedJsonBlock(value, options) {
    const compact = options?.compact ?? false;
    const jsonString = compact ? JSON.stringify(value) : JSON.stringify(value, null, 2);
    return `\`\`\`${PROTOCOL_FENCE_LANGUAGE}\n${jsonString}\n\`\`\``;
}
//# sourceMappingURL=writer.js.map