/**
 * @fileoverview Protocol stream summary helpers for content/action descriptions and timeline parts.
 *
 * These helpers are transport- and product-agnostic. Consumers may provide their own markdown/LLM
 * segment extraction layer, then pass the extracted segments here to describe protocol content,
 * panel updates, assistant thought markers, and action markers in encounter order.
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run typecheck
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
import type { CommunicationProtocol_UpdatePanelActionData, PanelBodyType } from "../types/index.js";
import { type ProtocolJsonCandidate, type ProtocolStreamParser_ChatContentCandidate } from "../validators/loose.js";
/** Parsed protocol message extracted from stream output. */
export interface ProtocolStreamParser_ParsedProtocolMessage {
    messageId: string;
    contentType: string;
    markdown?: string;
    cleanText: string;
    delay?: number;
    content_id?: string;
    isDebug?: boolean;
    sourceIndex?: number;
}
/** Assistant thought extracted from stream output. */
export interface ProtocolStreamParser_ParsedAssistantThought {
    originalText: string;
    cleanText: string;
    context?: string;
    sourceIndex?: number;
}
/** Action marker extracted from stream output. */
export interface ProtocolStreamParser_ParsedAssistantAction {
    actionType: string;
    description: string;
    context?: string;
    sourceIndex?: number;
}
/** Complete parsing result including all extracted data and summary. */
export interface ProtocolStreamParser_ParsedStreamData {
    protocolMessages: ProtocolStreamParser_ParsedProtocolMessage[];
    assistantThoughts: ProtocolStreamParser_ParsedAssistantThought[];
    assistantActions: ProtocolStreamParser_ParsedAssistantAction[];
    summary: string;
    originalLength: number;
    processedLength: number;
    compressionRatio: number;
    capturedCallToAction: string | null;
}
/** Parser configuration options. */
export interface ProtocolStreamParser_ParserConfig {
    includeDebugBlocks: boolean;
    includeActionWrappers: boolean;
    includeProgressBars: boolean;
    maxSummaryLength: number;
    extractThoughts: boolean;
    extractActions: boolean;
    actionMarkerLabels: readonly string[];
}
export declare const DEFAULT_PARSER_CONFIG: ProtocolStreamParser_ParserConfig;
/** Extracts the first call-to-action marker from a protocol-adjacent stream chunk. */
export declare function ProtocolStreamParser_extractCallToAction(text: string): string | null;
/** Describes a single parsed action extracted from the protocol stream. */
export interface ProtocolStreamParser_ParsedAction {
    readonly actionId?: string;
    readonly actionType: string;
    readonly actionTarget?: string;
    readonly actionData: Record<string, unknown>;
}
/** Segment shape consumed by the generic protocol stream summary extractor. */
export type ProtocolStreamParser_Segment = {
    readonly type: "json";
    readonly content: unknown;
} | {
    readonly type: "string";
    readonly content: string;
} | {
    readonly type: "container";
    readonly content: unknown;
};
/** Discriminated union of the three part types that can appear in a parsed protocol stream. */
export type ParsedStreamPart = {
    readonly order: number;
    readonly type: "message";
    readonly payload: ProtocolStreamParser_ParsedProtocolMessage;
} | {
    readonly order: number;
    readonly type: "thought";
    readonly payload: ProtocolStreamParser_ParsedAssistantThought;
} | {
    readonly order: number;
    readonly type: "action";
    readonly payload: ProtocolStreamParser_ParsedAssistantAction;
};
/** Result returned by `ProtocolStreamParser_extractStreamPartsFromSegments`. */
export interface ProtocolStreamParser_ExtractedStreamParts {
    messages: ProtocolStreamParser_ParsedProtocolMessage[];
    thoughts: ProtocolStreamParser_ParsedAssistantThought[];
    actions: ProtocolStreamParser_ParsedAssistantAction[];
    orderedParts: ParsedStreamPart[];
}
/** Options for generic stream-part extraction from pre-tokenized segments. */
export interface ProtocolStreamParser_ExtractStreamPartsFromSegmentsOptions {
    segments: ProtocolStreamParser_Segment[];
    config: ProtocolStreamParser_ParserConfig;
    contentParser?: ProtocolStreamParser_ContentParser;
    actionParser?: ProtocolStreamParser_ActionParser;
}
/** Options for parsing raw protocol-adjacent stream output into summaries and parts. */
export interface ProtocolStreamParser_ParseStreamOutput_Options {
    /** Raw assistant stream output containing text, markers, and lowercase fenced-json protocol blocks. */
    readonly streamOutput: string;
    /** Optional parser configuration overrides merged with `DEFAULT_PARSER_CONFIG`. */
    readonly config?: Partial<ProtocolStreamParser_ParserConfig>;
}
/** Casts `value` to a record if it is a non-array object; returns `undefined` otherwise. */
export declare function asRecord(value: unknown): Record<string, unknown> | undefined;
/** Type guard for JSON object records. */
export declare function isRecord(value: unknown): value is Record<string, unknown>;
/** Returns `value` as a string if it is already a string; returns `undefined` otherwise. */
export declare function getString(value: unknown): string | undefined;
/** Returns `value` typed as `T[]` if it is an array; returns `undefined` otherwise. */
export declare function asArray<T>(value: unknown): T[] | undefined;
/** Returns `value` if it is a number; returns `undefined` otherwise. */
export declare function getNumber(value: unknown): number | undefined;
/** Returns the first non-empty string value found in `record` at one of the provided keys. */
export declare function getFirstString(record: Record<string, unknown> | undefined, keys: readonly string[]): string | undefined;
/** JSON-stringifies `value` safely; truncates to `maxLength` when provided. */
export declare function safeStringify(value: unknown, maxLength?: number): string;
/** Remove Markdown links of the form `[text](url)` while preserving their visible text. */
export declare function removeMarkdownLinks(input: string): string;
/** Normalize Markdown list markers to a stable hyphen-list form. */
export declare function normalizeMarkdownLists(input: string): string;
/** Strip Markdown formatting into clean text for summaries. */
export declare function stripMarkdown(markdown: string): string;
/** Parses individual protocol content blocks into structured summary records. */
export declare class ProtocolStreamParser_ContentParser {
    private config;
    constructor(config: ProtocolStreamParser_ParserConfig);
    /** Normalizes one chat protocol content block into a flattened message record. */
    parseProtocolContent(content: ProtocolStreamParser_ChatContentCandidate, messageId?: string, isDebug?: boolean): ProtocolStreamParser_ParsedProtocolMessage;
    /** Builds a bullet summary of actionable cards. */
    private extractCardOptions;
    /** Builds a numbered list of actionable chips. */
    private extractChipOptions;
    /** Serializes panel header, body description, and body type into a compact JSON marker. */
    extractPanelContent(contentData: Record<string, unknown>): string;
    /** Converts arbitrary panel body payloads into human-readable text. */
    describePanelBody(bodyType: PanelBodyType | string | undefined, bodyData: unknown): string;
    /** Maps panel body type tokens containing provider substrings into short labels. */
    private getPanelProviderLabel;
}
/** Converts raw protocol action records into structured parsed action descriptions. */
export declare class ProtocolStreamParser_ActionParser {
    private contentParser;
    constructor(contentParser: ProtocolStreamParser_ContentParser);
    /** Materializes a panel-update action into a synthetic parsed panel message. */
    convertPanelUpdateToMessage(actionData: CommunicationProtocol_UpdatePanelActionData): ProtocolStreamParser_ParsedProtocolMessage | null;
    /** Normalizes an untrusted wire action object into a bounded parsed action. */
    parseAction(actionValue: unknown): ProtocolStreamParser_ParsedAction | undefined;
    /** Produces a concise sentence summarizing a parsed action. */
    describeAction(action: ProtocolStreamParser_ParsedAction): string;
    /** Formats panel header, body type, and rendered body text into a stable summary string. */
    private describePanelUpdate;
}
/** Generates a human-readable summary string from ordered stream parts. */
export declare class ProtocolStreamParser_SummaryGenerator {
    private config;
    constructor(config: ProtocolStreamParser_ParserConfig);
    /** Builds a newline-joined narrative from ordered parsed stream segments. */
    generateReadableSummary(partsInOrder: ParsedStreamPart[]): string;
    private addMessagePart;
    private describePanelMessage;
    private parsePanelData;
}
/** Parses raw protocol stream text into messages, thoughts, actions, summary, and CTA capture. */
export declare class ProtocolStreamParser_Class {
    private readonly config;
    private readonly contentParser;
    private readonly actionParser;
    private readonly summaryGenerator;
    private capturedCallToAction;
    constructor(config?: Partial<ProtocolStreamParser_ParserConfig>);
    /** Returns the latest call-to-action marker captured from parsed stream output. */
    getCapturedCallToAction(): string | null;
    /** Parses a full markdown stream payload, including protocol fences and text markers. */
    parseStreamOutput(streamOutput: string): ProtocolStreamParser_ParsedStreamData;
}
/** Convenience helper for one-shot raw protocol stream parsing. */
export declare function parseStreamOutput(options: ProtocolStreamParser_ParseStreamOutput_Options): ProtocolStreamParser_ParsedStreamData;
/** Extracts ordered stream parts from pre-tokenized protocol stream segments. */
export declare function ProtocolStreamParser_extractStreamPartsFromSegments(options: ProtocolStreamParser_ExtractStreamPartsFromSegmentsOptions): ProtocolStreamParser_ExtractedStreamParts;
/** Scans a text span for assistant thought and action markers. */
export declare function ProtocolStreamParser_processStringSegment(text: string, onThought: (thought: ProtocolStreamParser_ParsedAssistantThought) => void, onAction: (action: ProtocolStreamParser_ParsedAssistantAction) => void, actionMarkerLabels?: readonly string[]): void;
/** Derives a coarse routing hint from substring keywords in thought or action text. */
export declare function ProtocolStreamParser_extractContext(text: string): string | undefined;
/** Flattens nested JSON-like values into protocol object candidates for loose validators. */
export declare function ProtocolStreamParser_flattenToProtocolObjects(value: unknown): ProtocolJsonCandidate[];
//# sourceMappingURL=summary-parser.d.ts.map