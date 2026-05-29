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

interface ProtocolStreamSegmentExtractor_OpeningFence {
  start: number;
  bodyStart: number;
  fenceLength: number;
  language: string;
}

interface ProtocolStreamSegmentExtractor_ClosingFence {
  bodyEnd: number;
  matchEnd: number;
}

/** Extract package-owned protocol stream segments from raw markdown/text stream output. */
export function extractProtocolStreamSegmentsFromMarkdown(
  content: string,
): ProtocolStreamParser_Segment[] {
  const segments: ProtocolStreamParser_Segment[] = [];
  let cursor = 0;

  while (cursor < content.length) {
    const openingFence = findNextOpeningFence(content, cursor);
    if (openingFence === null) {
      appendStringSegment(segments, content.slice(cursor));
      break;
    }

    appendStringSegment(segments, content.slice(cursor, openingFence.start));

    const closingFence = findClosingFence(
      content,
      openingFence.bodyStart,
      openingFence.fenceLength,
    );
    if (closingFence === null) {
      appendStringSegment(segments, content.slice(openingFence.start));
      break;
    }

    const blockContent = content
      .slice(openingFence.bodyStart, closingFence.bodyEnd)
      .trim();

    if (openingFence.fenceLength >= 4) {
      segments.push({
        type: "container",
        content: extractProtocolStreamSegmentsFromMarkdown(blockContent),
      });
    } else if (openingFence.language === "json") {
      segments.push({
        type: "json",
        content: parseProtocolJsonBlockContent(blockContent),
      });
    }

    cursor = closingFence.matchEnd;
  }

  return segments;
}

function appendStringSegment(
  segments: ProtocolStreamParser_Segment[],
  content: string,
): void {
  const trimmedContent = content.trim();
  if (trimmedContent.length > 0) {
    segments.push({ type: "string", content: trimmedContent });
  }
}

function parseProtocolJsonBlockContent(blockContent: string): unknown {
  try {
    return JSON.parse(blockContent);
  } catch {
    return blockContent;
  }
}

function findNextOpeningFence(
  content: string,
  startIndex: number,
): ProtocolStreamSegmentExtractor_OpeningFence | null {
  let cursor = Math.max(0, startIndex);

  while (cursor < content.length) {
    if (cursor > 0 && content[cursor - 1] !== "\n") {
      const nextLineBreak = content.indexOf("\n", cursor);
      if (nextLineBreak === -1) {
        return null;
      }
      cursor = nextLineBreak + 1;
      continue;
    }

    const openingFence = parseOpeningFenceAtLineStart(content, cursor);
    if (openingFence !== null) {
      return openingFence;
    }

    const nextLineBreak = content.indexOf("\n", cursor);
    if (nextLineBreak === -1) {
      return null;
    }
    cursor = nextLineBreak + 1;
  }

  return null;
}

function parseOpeningFenceAtLineStart(
  content: string,
  lineStart: number,
): ProtocolStreamSegmentExtractor_OpeningFence | null {
  let cursor = skipHorizontalWhitespace(content, lineStart);
  const fenceStart = cursor;

  while (cursor < content.length && content[cursor] === "`") {
    cursor += 1;
  }

  const fenceLength = cursor - fenceStart;
  if (fenceLength < 3) {
    return null;
  }

  const lineEnd = content.indexOf("\n", cursor);
  if (lineEnd === -1) {
    return null;
  }

  return {
    start: lineStart,
    bodyStart: lineEnd + 1,
    fenceLength,
    language: content.slice(cursor, lineEnd).trim(),
  };
}

function findClosingFence(
  content: string,
  bodyStart: number,
  fenceLength: number,
): ProtocolStreamSegmentExtractor_ClosingFence | null {
  let lineStart = bodyStart;

  while (lineStart <= content.length) {
    const closingEnd = consumeClosingFenceLine(content, lineStart, fenceLength);
    if (closingEnd !== null) {
      const bodyEnd = lineStart > bodyStart ? lineStart - 1 : lineStart;
      return { bodyEnd, matchEnd: closingEnd };
    }

    const nextLineBreak = content.indexOf("\n", lineStart);
    if (nextLineBreak === -1) {
      return null;
    }
    lineStart = nextLineBreak + 1;
  }

  return null;
}

function consumeClosingFenceLine(
  content: string,
  lineStart: number,
  fenceLength: number,
): number | null {
  let cursor = skipHorizontalWhitespace(content, lineStart);
  let backtickCount = 0;

  while (cursor < content.length && content[cursor] === "`") {
    backtickCount += 1;
    cursor += 1;
  }

  if (backtickCount < fenceLength) {
    return null;
  }

  cursor = skipHorizontalWhitespace(content, cursor);
  if (cursor === content.length) {
    return cursor;
  }
  if (content[cursor] === "\n") {
    return cursor + 1;
  }
  return null;
}

function skipHorizontalWhitespace(content: string, startIndex: number): number {
  let cursor = startIndex;
  while (
    cursor < content.length &&
    (content[cursor] === " " || content[cursor] === "\t")
  ) {
    cursor += 1;
  }
  return cursor;
}
