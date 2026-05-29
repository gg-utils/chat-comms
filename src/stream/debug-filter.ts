/**
 * Chunk-safe debug block filter using parsed JSON inspection.
 *
 * Replaces substring-based `"debug": true` detection with actual JSON parsing
 * to avoid false positives from nested text containing that substring.
 */

import { PROTOCOL_FENCE_LANGUAGE } from "../wire/constants.js";

const FENCE_PATTERN_START = `\`\`\`${PROTOCOL_FENCE_LANGUAGE}`;
const FENCE_PATTERN_END = "```";

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

type ProtocolFenceScanResult =
  | { status: "complete"; raw: string; fencedBlock: string; nextIndex: number }
  | { status: "incomplete" }
  | { status: "malformed"; recoveryIndex: number };

/**
 * Filters out debug protocol blocks from streamed content.
 *
 * A protocol block is removed if parsing its JSON yields an object with `debug === true`.
 * Non-protocol fences and malformed JSON are passed through unchanged.
 *
 * @param content - Raw stream content that may contain fenced JSON blocks.
 * @returns Content with debug blocks removed.
 */
export function filterDebugProtocolBlocks(content: string): string {
  // Use a regex to find all lowercase json fenced blocks
  const pattern = new RegExp(
    `\`\`\`${PROTOCOL_FENCE_LANGUAGE}\\s*\\n([\\s\\S]*?)\\n\`\`\``,
    "g",
  );

  return content.replace(pattern, (match, jsonContent: string) => {
    try {
      const parsed: unknown = JSON.parse(jsonContent);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "debug" in parsed &&
        (parsed as Record<string, unknown>)["debug"] === true
      ) {
        return "";
      }
    } catch {
      // Not valid JSON — pass through
    }
    return match;
  });
}

/** Creates a stateful, chunk-safe debug protocol block filter for streaming writers. */
export function createProtocolDebugBlockFilter(): ProtocolDebugBlockFilter {
  let pendingContent = "";

  const append = (chunk: string): string => {
    pendingContent += chunk;
    let filteredOutput = "";

    while (pendingContent.length > 0) {
      const startIndex = pendingContent.indexOf(FENCE_PATTERN_START);

      if (startIndex === -1) {
        const pendingPrefixLength =
          getProtocolFencePrefixSuffixLength(pendingContent);
        const safeOutputEnd = pendingContent.length - pendingPrefixLength;
        filteredOutput += pendingContent.slice(0, safeOutputEnd);
        pendingContent = pendingContent.slice(safeOutputEnd);
        return filteredOutput;
      }

      filteredOutput += pendingContent.slice(0, startIndex);
      const scanResult = scanProtocolFenceBlock(pendingContent, startIndex);

      if (scanResult.status === "incomplete") {
        pendingContent = pendingContent.slice(startIndex);
        return filteredOutput;
      }

      if (scanResult.status === "malformed") {
        filteredOutput += pendingContent.slice(
          startIndex,
          scanResult.recoveryIndex,
        );
        pendingContent = pendingContent.slice(scanResult.recoveryIndex);
        continue;
      }

      if (!isDebugProtocolJsonBlock(scanResult.raw)) {
        filteredOutput += scanResult.fencedBlock;
      }
      pendingContent = pendingContent.slice(scanResult.nextIndex);
    }

    return filteredOutput;
  };

  const flush = (): string => {
    const flushedContent = pendingContent;
    pendingContent = "";
    return flushedContent;
  };

  const reset = (): void => {
    pendingContent = "";
  };

  const getPendingContent = (): string => pendingContent;

  return { append, flush, reset, getPendingContent };
}

function scanProtocolFenceBlock(
  content: string,
  startIndex: number,
): ProtocolFenceScanResult {
  let cursor = startIndex + FENCE_PATTERN_START.length;
  while (cursor < content.length && isProtocolWhitespace(content[cursor])) {
    cursor++;
  }

  if (cursor >= content.length) {
    return { status: "incomplete" };
  }

  if (content[cursor] !== "{" && content[cursor] !== "[") {
    return {
      status: "malformed",
      recoveryIndex: startIndex + FENCE_PATTERN_START.length,
    };
  }

  const jsonStartIndex = cursor;
  const jsonEndIndex = findCompleteJsonEndIndex(content, jsonStartIndex);
  if (jsonEndIndex === null) {
    return { status: "incomplete" };
  }

  let fenceIndex = jsonEndIndex;
  while (
    fenceIndex < content.length &&
    isProtocolWhitespace(content[fenceIndex])
  ) {
    fenceIndex++;
  }

  if (fenceIndex + FENCE_PATTERN_END.length > content.length) {
    return { status: "incomplete" };
  }

  if (
    content.slice(fenceIndex, fenceIndex + FENCE_PATTERN_END.length) !==
    FENCE_PATTERN_END
  ) {
    return {
      status: "malformed",
      recoveryIndex: startIndex + FENCE_PATTERN_START.length,
    };
  }

  const nextIndex = fenceIndex + FENCE_PATTERN_END.length;
  return {
    status: "complete",
    raw: content.slice(jsonStartIndex, jsonEndIndex),
    fencedBlock: content.slice(startIndex, nextIndex),
    nextIndex,
  };
}

function findCompleteJsonEndIndex(
  content: string,
  jsonStartIndex: number,
): number | null {
  let depth = 0;
  let isInsideString = false;
  let isEscaped = false;

  for (let cursor = jsonStartIndex; cursor < content.length; cursor++) {
    const character = content[cursor];

    if (isInsideString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }
      if (character === "\\") {
        isEscaped = true;
        continue;
      }
      if (character === '"') {
        isInsideString = false;
      }
      continue;
    }

    if (character === '"') {
      isInsideString = true;
      continue;
    }
    if (character === "{" || character === "[") {
      depth++;
      continue;
    }
    if (character === "}" || character === "]") {
      depth--;
      if (depth === 0) {
        return cursor + 1;
      }
    }
  }

  return null;
}

function isDebugProtocolJsonBlock(rawJson: string): boolean {
  try {
    const parsed: unknown = JSON.parse(rawJson);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      "debug" in parsed &&
      parsed["debug"] === true
    );
  } catch {
    return false;
  }
}

function isProtocolWhitespace(character: string | undefined): boolean {
  return (
    character === " " ||
    character === "\n" ||
    character === "\r" ||
    character === "\t"
  );
}

function getProtocolFencePrefixSuffixLength(content: string): number {
  const maxCandidateLength = Math.min(
    content.length,
    FENCE_PATTERN_START.length - 1,
  );

  for (
    let candidateLength = maxCandidateLength;
    candidateLength > 0;
    candidateLength--
  ) {
    if (
      FENCE_PATTERN_START.startsWith(
        content.slice(content.length - candidateLength),
      )
    ) {
      return candidateLength;
    }
  }

  return 0;
}

// Re-export fence constants for consumers
export { FENCE_PATTERN_START, FENCE_PATTERN_END };
