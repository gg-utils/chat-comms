/**
 * Incremental fenced-JSON block parser using a state machine for chunk safety.
 *
 * Only canonical lowercase `json` fences are recognized as protocol blocks.
 * Non-`json` fences (typescript, javascript, JSON uppercase) are ignored.
 */

const START_FENCE = "```json";
const END_FENCE = "```";

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
export function extractProtocolFencedJsonBlocksIncremental(
  buffer: string,
  cursor: number
): IncrementalParseResult {
  const blocks: ParsedProtocolBlock[] = [];
  let i = cursor;
  const startFenceLookbehind = START_FENCE.length - 1;

  while (i < buffer.length) {
    const start = buffer.indexOf(START_FENCE, i);
    if (start === -1) {
      return {
        blocks,
        nextCursor: Math.max(cursor, buffer.length - startFenceLookbehind),
      };
    }

    // Skip whitespace after opening fence
    let p = start + START_FENCE.length;
    while (p < buffer.length && isWhitespace(buffer[p])) {
      p++;
    }
    if (p >= buffer.length) {
      return { blocks, nextCursor: start };
    }
    if (buffer[p] !== "{" && buffer[p] !== "[") {
      // Not a JSON object/array start — skip this fence
      i = start + START_FENCE.length;
      continue;
    }

    const jsonStart = p;
    let depth = 0;
    let inString = false;
    let isEscaped = false;
    let jsonEnd: number | null = null;

    for (let j = jsonStart; j < buffer.length; j++) {
      const c = buffer[j];

      if (inString) {
        if (isEscaped) {
          isEscaped = false;
          continue;
        }
        if (c === "\\") {
          isEscaped = true;
          continue;
        }
        if (c === '"') {
          inString = false;
        }
        continue;
      }

      if (c === '"') {
        inString = true;
        continue;
      }
      if (c === "{" || c === "[") {
        depth++;
        continue;
      }
      if (c === "}" || c === "]") {
        depth--;
        if (depth === 0) {
          jsonEnd = j + 1;
          break;
        }
      }
    }

    if (jsonEnd === null) {
      // JSON is incomplete — wait for more data
      return { blocks, nextCursor: start };
    }

    // Require closing fence after JSON (allow whitespace between)
    let fencePos = jsonEnd;
    while (fencePos < buffer.length && isWhitespace(buffer[fencePos])) {
      fencePos++;
    }
    if (fencePos + END_FENCE.length > buffer.length) {
      return { blocks, nextCursor: start };
    }
    if (buffer.slice(fencePos, fencePos + END_FENCE.length) !== END_FENCE) {
      // Malformed block — skip this start fence
      i = start + START_FENCE.length;
      continue;
    }

    const raw = buffer.slice(jsonStart, jsonEnd);
    const fencedBlock = buffer.slice(start, fencePos + END_FENCE.length);
    try {
      const json: unknown = JSON.parse(raw);
      blocks.push({ json, raw, fencedBlock });
    } catch {
      // Malformed JSON — skip
    }

    i = fencePos + END_FENCE.length;
  }

  return { blocks, nextCursor: i };
}

function isWhitespace(c: string | undefined): boolean {
  return c === " " || c === "\n" || c === "\r" || c === "\t";
}
