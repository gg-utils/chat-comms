import { omitUndefined } from "../omit-undefined.js";
import { isProtocolPanelUpdateActionLoose, isProtocolChatMessageLoose, } from "../validators/loose.js";
import { extractProtocolStreamSegmentsFromMarkdown } from "./segment-extractor.js";
export const DEFAULT_PARSER_CONFIG = {
    includeDebugBlocks: false,
    includeActionWrappers: false,
    includeProgressBars: false,
    maxSummaryLength: 20000,
    extractThoughts: true,
    extractActions: true,
    actionMarkerLabels: ["NEXT ACTION"],
};
const PROTOCOL_STREAM_CALL_TO_ACTION_PATTERNS = [
    /MUST say to the user:\s*`([^`]+)`/i,
    /\[CALL_TO_ACTION:\s*"([^"]+)"\]/i,
    /\[THOUGHT_ON_CALL_TO_ACTION:\s*"([^"]+)"\]/i,
    /\[FINALIZATION:\s*"([^"]+)"\]/i,
    /\[THOUGHT_ON_FINALIZATION:\s*"([^"]+)"\]/i,
    /\[ASSISTANT_CLOSING:\s*"([^"]+)"\]/i,
];
/** Extracts the first call-to-action marker from a protocol-adjacent stream chunk. */
export function ProtocolStreamParser_extractCallToAction(text) {
    for (const pattern of PROTOCOL_STREAM_CALL_TO_ACTION_PATTERNS) {
        const match = pattern.exec(text);
        if (match?.[1]) {
            return match[1].trim();
        }
    }
    return null;
}
/** Casts `value` to a record if it is a non-array object; returns `undefined` otherwise. */
export function asRecord(value) {
    if (!isRecord(value))
        return undefined;
    return value;
}
/** Type guard for JSON object records. */
export function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Returns `value` as a string if it is already a string; returns `undefined` otherwise. */
export function getString(value) {
    return typeof value === "string" ? value : undefined;
}
/** Returns `value` typed as `T[]` if it is an array; returns `undefined` otherwise. */
export function asArray(value) {
    if (Array.isArray(value))
        return value;
    return undefined;
}
/** Returns `value` if it is a number; returns `undefined` otherwise. */
export function getNumber(value) {
    return typeof value === "number" ? value : undefined;
}
/** Returns the first non-empty string value found in `record` at one of the provided keys. */
export function getFirstString(record, keys) {
    if (!record)
        return undefined;
    for (const key of keys) {
        const value = record[key];
        if (typeof value === "string" && value)
            return value;
    }
    return undefined;
}
/** JSON-stringifies `value` safely; truncates to `maxLength` when provided. */
export function safeStringify(value, maxLength) {
    try {
        const json = JSON.stringify(value) ?? String(value);
        if (maxLength !== undefined && json.length > maxLength) {
            return `${json.slice(0, maxLength)}...`;
        }
        return json;
    }
    catch {
        return "[Complex action data]";
    }
}
/** Remove Markdown links of the form `[text](url)` while preserving their visible text. */
export function removeMarkdownLinks(input) {
    if (input.indexOf("[") === -1)
        return input;
    const length = input.length;
    let result = "";
    let index = 0;
    while (index < length) {
        const characterCode = input.charCodeAt(index);
        if (characterCode === 91) {
            const endBracket = input.indexOf("]", index + 1);
            if (endBracket !== -1 &&
                endBracket + 1 < length &&
                input.charCodeAt(endBracket + 1) === 40) {
                const endParen = input.indexOf(")", endBracket + 2);
                if (endParen !== -1) {
                    result += input.slice(index + 1, endBracket);
                    index = endParen + 1;
                    continue;
                }
            }
        }
        result += input[index] ?? "";
        index += 1;
    }
    return result;
}
/** Normalize Markdown list markers to a stable hyphen-list form. */
export function normalizeMarkdownLists(input) {
    const lines = input.split(/\r?\n/);
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        const line = lines[lineIndex];
        if (line === undefined)
            continue;
        const length = line.length;
        let index = 0;
        while (index < length &&
            (line.charCodeAt(index) === 32 || line.charCodeAt(index) === 9)) {
            index += 1;
        }
        if (index >= length)
            continue;
        const bullet = line[index];
        if (bullet === "-" || bullet === "*" || bullet === "+") {
            let bodyIndex = index + 1;
            let spaceCount = 0;
            while (bodyIndex < length && line.charCodeAt(bodyIndex) === 32) {
                bodyIndex += 1;
                spaceCount += 1;
            }
            if (spaceCount > 0) {
                lines[lineIndex] = `${line.slice(0, index)}- ${line.slice(bodyIndex)}`;
                continue;
            }
        }
        let digitIndex = index;
        let hasDigits = false;
        while (digitIndex < length &&
            line.charCodeAt(digitIndex) >= 48 &&
            line.charCodeAt(digitIndex) <= 57) {
            hasDigits = true;
            digitIndex += 1;
        }
        if (hasDigits && digitIndex < length && line.charAt(digitIndex) === ".") {
            let bodyIndex = digitIndex + 1;
            let spaceCount = 0;
            while (bodyIndex < length && line.charCodeAt(bodyIndex) === 32) {
                bodyIndex += 1;
                spaceCount += 1;
            }
            if (spaceCount > 0) {
                lines[lineIndex] = `${line.slice(0, index)}- ${line.slice(bodyIndex)}`;
            }
        }
    }
    return lines.join("\n");
}
/** Strip Markdown formatting into clean text for summaries. */
export function stripMarkdown(markdown) {
    let text = markdown
        .replace(/#{1,6}\s*/g, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/```[\s\S]*?```/g, "[code block]");
    text = removeMarkdownLinks(text);
    text = normalizeMarkdownLists(text);
    return text.replace(/\n{3,}/g, "\n\n").trim();
}
/** Parses individual protocol content blocks into structured summary records. */
export class ProtocolStreamParser_ContentParser {
    config;
    constructor(config) {
        this.config = config;
    }
    /** Normalizes one chat protocol content block into a flattened message record. */
    parseProtocolContent(content, messageId, isDebug = false) {
        const contentType = content.content_type || "UNKNOWN";
        const contentData = asRecord(content.content_data) ?? {};
        let cleanText = "";
        let markdown;
        switch (contentType) {
            case "CHAT_CONTENT_MARKDOWN": {
                markdown = getString(contentData["markdown"]) ?? "";
                cleanText = stripMarkdown(markdown);
                break;
            }
            case "CHAT_CONTENT_ACTIONABLE_CARDS": {
                cleanText = this.extractCardOptions(contentData);
                break;
            }
            case "CHAT_CONTENT_ACTIONABLE_CHIPS": {
                cleanText = this.extractChipOptions(contentData);
                break;
            }
            case "CHAT_CONTENT_BUTTON": {
                const buttonText = getString(contentData["button_text"]) ?? "Unknown";
                cleanText = `Button: "${buttonText}"`;
                break;
            }
            case "CHAT_CONTENT_PROGRESS_BAR": {
                if (!this.config.includeProgressBars)
                    break;
                const progress = getNumber(contentData["progress_bar_current_percentage"]) ??
                    getNumber(contentData["current_percentage"]) ??
                    0;
                const message = getString(contentData["progress_bar_message"]) ??
                    getString(contentData["message"]) ??
                    "";
                cleanText = `Progress: ${progress}% - ${message}`;
                break;
            }
            case "CHAT_CONTENT_PANEL": {
                cleanText = this.extractPanelContent(contentData);
                break;
            }
            case "CHAT_CONTENT_ACTION_WRAPPER": {
                break;
            }
            default: {
                cleanText = `[${contentType}]`;
            }
        }
        return {
            messageId: messageId || content.content_id || "unknown",
            contentType,
            markdown,
            cleanText,
            delay: getNumber(contentData["delay"]),
            content_id: content.content_id,
            isDebug,
        };
    }
    /** Builds a bullet summary of actionable cards. */
    extractCardOptions(contentData) {
        if (!contentData)
            return "";
        const cards = asArray(contentData["actionable_cards_items"] ??
            contentData["cards"] ??
            contentData["items"]);
        if (!cards || cards.length === 0)
            return "";
        const cardList = cards
            .map((card) => {
            if (!isRecord(card))
                return "- Untitled";
            const title = getFirstString(card, ["card_title", "title"]) ?? "Untitled";
            const subtitle = getFirstString(card, ["card_subtitle", "subtitle"]);
            const description = getFirstString(card, [
                "card_description",
                "description",
            ]);
            let text = `- ${title}`;
            if (subtitle)
                text += ` - ${subtitle}`;
            if (description)
                text += ` - ${description}`;
            return text;
        })
            .join("\n");
        const selectionMode = getString(contentData["actionable_cards_selection_mode"]) ??
            getString(contentData["selectionMode"]) ??
            "SINGLE";
        return `Assistant presented ${selectionMode.toLowerCase()} selection cards:\n${cardList}`;
    }
    /** Builds a numbered list of actionable chips. */
    extractChipOptions(contentData) {
        if (!contentData)
            return "";
        const chips = asArray(contentData["actionable_chips_items"] ??
            contentData["chips"] ??
            contentData["items"]);
        if (!chips || chips.length === 0)
            return "";
        const chipList = chips
            .map((chip, index) => {
            if (!isRecord(chip))
                return `${index + 1}. Unknown`;
            const text = getFirstString(chip, ["chip_text", "text"]) ?? "Unknown";
            return `${index + 1}. ${text}`;
        })
            .join("\n");
        return `Assistant presented chips for the user to choose from:\n${chipList}`;
    }
    /** Serializes panel header, body description, and body type into a compact JSON marker. */
    extractPanelContent(contentData) {
        const headerTitle = getString(contentData["panel_header_title"]) ?? "Panel";
        const bodyType = getString(contentData["panel_body_type"]);
        const panelContent = this.describePanelBody(bodyType, contentData["panel_body_data"]);
        return JSON.stringify({
            panelHeader: headerTitle,
            panelContent,
            panelBodyType: bodyType ?? "UNKNOWN",
            isPanelData: true,
        });
    }
    /** Converts arbitrary panel body payloads into human-readable text. */
    describePanelBody(bodyType, bodyData) {
        if (bodyData === undefined || bodyData === null)
            return "[No panel content]";
        if (typeof bodyData === "string")
            return stripMarkdown(bodyData);
        const bodyRecord = asRecord(bodyData);
        // Preserve the legacy display conversion of arbitrary panel payloads.
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        if (!bodyRecord)
            return String(bodyData);
        const markdownValue = getString(bodyRecord["markdown"]);
        if (markdownValue)
            return stripMarkdown(markdownValue);
        const userPrompt = getString(bodyRecord["user_prompt"]);
        const assistantResponse = getString(bodyRecord["assistant_response"]);
        if (userPrompt || assistantResponse) {
            const label = this.getPanelProviderLabel(bodyType);
            if (userPrompt && assistantResponse) {
                return `${label}: "${userPrompt}" - ${assistantResponse}`;
            }
            if (userPrompt)
                return `${label} Prompt: "${userPrompt}"`;
            return `${label} Response: ${assistantResponse}`;
        }
        if (bodyType === "PANEL_BODY_IMAGE") {
            return `Image: ${getString(bodyRecord["image_alt_text"]) ?? "No description"}`;
        }
        if (bodyType === "PANEL_BODY_GOOGLE_SEARCH_HOME") {
            const query = getString(bodyRecord["search_query"]);
            if (query)
                return `Google Search: "${query}"`;
        }
        if (bodyType === "PANEL_BODY_GOOGLE_SEARCH_RESULT") {
            const items = asArray(bodyRecord["google_custom_search_items"]);
            return items && items.length > 0
                ? `Google Search Results (${items.length})`
                : "Google Search Results";
        }
        if (bodyType === "PANEL_BODY_GOOGLE_MAPS_REVIEWS") {
            const reviews = asArray(bodyRecord["reviews"]);
            return reviews && reviews.length > 0
                ? `Google Maps Reviews (${reviews.length})`
                : "Google Maps Reviews";
        }
        try {
            return JSON.stringify(bodyRecord);
        }
        catch {
            return "[Complex panel content]";
        }
    }
    /** Maps panel body type tokens containing provider substrings into short labels. */
    getPanelProviderLabel(bodyType) {
        if (!bodyType || typeof bodyType !== "string")
            return "Panel";
        if (bodyType.includes("CHATGPT"))
            return "ChatGPT";
        if (bodyType.includes("GEMINI"))
            return "Gemini";
        if (bodyType.includes("PERPLEXITY"))
            return "Perplexity";
        if (bodyType.includes("GOOGLE_SEARCH"))
            return "Google Search";
        if (bodyType.includes("GOOGLE_MAPS"))
            return "Google Maps";
        return "Panel";
    }
}
/** Converts raw protocol action records into structured parsed action descriptions. */
export class ProtocolStreamParser_ActionParser {
    contentParser;
    constructor(contentParser) {
        this.contentParser = contentParser;
    }
    /** Materializes a panel-update action into a synthetic parsed panel message. */
    convertPanelUpdateToMessage(actionData) {
        const panelContentId = actionData.panel_content_id;
        if (!panelContentId)
            return null;
        const bodyType = actionData.panel_body_type ?? "UNKNOWN";
        const headerTitle = actionData.panel_header_title ?? "Panel";
        const panelContent = this.contentParser.describePanelBody(bodyType, actionData.panel_body_data);
        return {
            messageId: `update-${panelContentId}`,
            contentType: "CHAT_CONTENT_PANEL",
            cleanText: JSON.stringify({
                panelHeader: headerTitle,
                panelContent,
                panelBodyType: bodyType,
                isPanelData: true,
            }),
            markdown: undefined,
            delay: undefined,
            content_id: panelContentId,
            isDebug: false,
        };
    }
    /** Normalizes an untrusted wire action object into a bounded parsed action. */
    parseAction(actionValue) {
        const actionRecord = asRecord(actionValue);
        if (!actionRecord)
            return undefined;
        const actionType = getString(actionRecord["action_type"]);
        if (!actionType)
            return undefined;
        const actionData = asRecord(actionRecord["action_data"]) ?? {};
        const actionTarget = getString(actionData["target"]) ??
            getString(actionRecord["action_target"]);
        const actionId = getString(actionRecord["action_id"]);
        return { actionId, actionType, actionTarget, actionData };
    }
    /** Produces a concise sentence summarizing a parsed action. */
    describeAction(action) {
        const { actionType, actionData, actionId, actionTarget } = action;
        switch (actionType) {
            case "CHAT_ACTION_UPDATE_PROGRESS_BAR": {
                const contentId = getString(actionData["progress_bar_content_id"]) ??
                    getString(actionData["content_id"]);
                const current = getNumber(actionData["progress_bar_current_percentage"]);
                const message = getString(actionData["progress_bar_message"]) ??
                    getString(actionData["message"]);
                const updates = [];
                if (current !== undefined)
                    updates.push(`${current}%`);
                const progressBarTarget = contentId
                    ? `progress bar ${contentId}`
                    : "progress bar";
                let summary = `Update ${progressBarTarget}`;
                if (updates.length > 0)
                    summary += ` (${updates.join(", ")})`;
                if (message)
                    summary += ` – "${message}"`;
                return summary;
            }
            case "CHAT_ACTION_UPDATE_PANEL": {
                return this.describePanelUpdate(actionData);
            }
            case "CHAT_ACTION_SEND_TEXT_MESSAGE": {
                const text = getString(actionData["text"]) ?? "";
                const role = (getString(actionData["role"]) ?? "USER").toLowerCase();
                const textDisplay = text ? `"${text}"` : "[no text]";
                return `Simulate ${role} message ${textDisplay}`;
            }
            case "CHAT_ACTION_CHOOSE_ACTIONABLE_CARD": {
                const label = getString(actionData["selected_card_title"]) ||
                    getString(actionData["selected_card_subtitle"]) ||
                    getString(actionData["selected_card_value"]) ||
                    "unknown card";
                const cardsContentId = getString(actionData["actionable_cards_content_id"]);
                const fromSuffix = cardsContentId ? ` from ${cardsContentId}` : "";
                return `Select card "${label}"${fromSuffix}`;
            }
            case "CHAT_ACTION_CHOOSE_ACTIONABLE_CHIP": {
                const label = getString(actionData["selected_chip_text"]) ??
                    getString(actionData["chip_text"]) ??
                    getString(actionData["selected_chip_value"]) ??
                    "unknown chip";
                const chipsContentId = getString(actionData["actionable_chips_content_id"]);
                const fromSuffix = chipsContentId ? ` from ${chipsContentId}` : "";
                return `Select chip "${label}"${fromSuffix}`;
            }
            default: {
                const descriptor = actionId
                    ? `${actionType} (${actionId})`
                    : actionType;
                const targetSuffix = actionTarget && actionTarget !== "CHAT"
                    ? ` target ${actionTarget}`
                    : "";
                return `Execute ${descriptor}${targetSuffix} with data ${safeStringify(actionData, 200)}`;
            }
        }
    }
    /** Formats panel header, body type, and rendered body text into a stable summary string. */
    describePanelUpdate(actionData) {
        const headerTitle = getString(actionData["panel_header_title"]) ?? "Panel";
        const bodyType = getString(actionData["panel_body_type"]);
        const panelBody = this.contentParser.describePanelBody(bodyType, actionData["panel_body_data"]);
        return `Update Panel "${headerTitle}" with content "${panelBody}"`;
    }
}
/** Generates a human-readable summary string from ordered stream parts. */
export class ProtocolStreamParser_SummaryGenerator {
    config;
    constructor(config) {
        this.config = config;
    }
    /** Builds a newline-joined narrative from ordered parsed stream segments. */
    generateReadableSummary(partsInOrder) {
        const parts = [];
        partsInOrder.forEach((part) => {
            if (part.type === "thought") {
                parts.push(`Assistant thought: ${part.payload.cleanText}`);
            }
            else if (part.type === "action") {
                parts.push(`Assistant performed: ${part.payload.description}`);
            }
            else {
                this.addMessagePart(parts, part.payload);
            }
        });
        let summary = parts.join("\n\n");
        if (summary.length > this.config.maxSummaryLength) {
            summary = `${summary.substring(0, this.config.maxSummaryLength)}...`;
        }
        return summary;
    }
    addMessagePart(parts, message) {
        if (!message.cleanText.trim())
            return;
        const isInteractive = [
            "CHAT_CONTENT_BUTTON",
            "CHAT_CONTENT_ACTIONABLE_CARDS",
            "CHAT_CONTENT_ACTIONABLE_CHIPS",
        ].includes(message.contentType);
        const isPanel = message.contentType === "CHAT_CONTENT_PANEL";
        if (isPanel) {
            parts.push(this.describePanelMessage(message.cleanText));
        }
        else if (isInteractive) {
            parts.push(`Assistant offers options: ${message.cleanText}`);
        }
        else if (message.isDebug) {
            if (this.config.includeDebugBlocks) {
                parts.push(`Assistant internal process: ${message.cleanText}`);
            }
        }
        else {
            parts.push(`Assistant said to user: ${message.cleanText}`);
        }
    }
    describePanelMessage(cleanText) {
        try {
            const parsed = JSON.parse(cleanText);
            const panelData = this.parsePanelData(parsed);
            if (panelData) {
                const bodyType = panelData.panelBodyType
                    ? ` (${panelData.panelBodyType})`
                    : "";
                const content = panelData.panelContent.trim();
                return [
                    `Assistant presented a panel called "${panelData.panelHeader}"${bodyType}`,
                    `with content "${content}"`,
                ].join(" ");
            }
            return `Assistant said to user: ${cleanText}`;
        }
        catch {
            return `Assistant said to user: ${cleanText}`;
        }
    }
    parsePanelData(value) {
        const record = asRecord(value);
        if (!record || record["isPanelData"] !== true)
            return undefined;
        const panelHeader = getString(record["panelHeader"]);
        const panelContent = getString(record["panelContent"]);
        if (!panelHeader || panelContent === undefined)
            return undefined;
        return {
            panelHeader,
            panelContent,
            panelBodyType: getString(record["panelBodyType"]),
            isPanelData: true,
        };
    }
}
/** Parses raw protocol stream text into messages, thoughts, actions, summary, and CTA capture. */
export class ProtocolStreamParser_Class {
    config;
    contentParser;
    actionParser;
    summaryGenerator;
    capturedCallToAction = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_PARSER_CONFIG, ...config };
        this.contentParser = new ProtocolStreamParser_ContentParser(this.config);
        this.actionParser = new ProtocolStreamParser_ActionParser(this.contentParser);
        this.summaryGenerator = new ProtocolStreamParser_SummaryGenerator(this.config);
    }
    /** Returns the latest call-to-action marker captured from parsed stream output. */
    getCapturedCallToAction() {
        return this.capturedCallToAction;
    }
    /** Parses a full markdown stream payload, including protocol fences and text markers. */
    parseStreamOutput(streamOutput) {
        const originalLength = streamOutput.length;
        const callToAction = ProtocolStreamParser_extractCallToAction(streamOutput);
        if (callToAction) {
            this.capturedCallToAction = callToAction;
        }
        const { messages, thoughts, actions, orderedParts } = ProtocolStreamParser_extractStreamPartsFromSegments({
            segments: extractProtocolStreamSegmentsFromMarkdown(streamOutput),
            config: this.config,
            contentParser: this.contentParser,
            actionParser: this.actionParser,
        });
        const assistantThoughts = this.config.extractThoughts ? thoughts : [];
        const assistantActions = this.config.extractActions ? actions : [];
        const timelineParts = orderedParts.filter((part) => {
            if (part.type === "thought" && !this.config.extractThoughts)
                return false;
            if (part.type === "action" && !this.config.extractActions)
                return false;
            return true;
        });
        const protocolMessages = messages.filter((message) => message.contentType !== "CHAT_CONTENT_ACTION_WRAPPER");
        const summary = this.summaryGenerator.generateReadableSummary(timelineParts);
        return {
            protocolMessages,
            assistantThoughts,
            assistantActions,
            summary,
            originalLength,
            processedLength: summary.length,
            compressionRatio: originalLength === 0 ? 0 : summary.length / originalLength,
            capturedCallToAction: this.capturedCallToAction,
        };
    }
}
/** Convenience helper for one-shot raw protocol stream parsing. */
export function parseStreamOutput(options) {
    const parser = new ProtocolStreamParser_Class(options.config);
    return parser.parseStreamOutput(options.streamOutput);
}
/** Extracts ordered stream parts from pre-tokenized protocol stream segments. */
export function ProtocolStreamParser_extractStreamPartsFromSegments(options) {
    const contentParser = options.contentParser ??
        new ProtocolStreamParser_ContentParser(options.config);
    const actionParser = options.actionParser ??
        new ProtocolStreamParser_ActionParser(contentParser);
    const messages = [];
    const thoughts = [];
    const actions = [];
    const orderedParts = [];
    let sequence = 0;
    const appendMessage = (message) => {
        if (!message.cleanText.trim())
            return;
        message.sourceIndex = sequence;
        messages.push(message);
        orderedParts.push({ order: sequence, type: "message", payload: message });
        sequence += 1;
    };
    const appendThought = (thought) => {
        thought.sourceIndex = sequence;
        thoughts.push(thought);
        orderedParts.push({ order: sequence, type: "thought", payload: thought });
        sequence += 1;
    };
    const appendAction = (action) => {
        action.sourceIndex = sequence;
        actions.push(action);
        orderedParts.push({ order: sequence, type: "action", payload: action });
        sequence += 1;
    };
    const traverseSegments = (segments) => {
        segments.forEach((segment) => {
            if (shouldSkipDebugSegment(segment, options.config))
                return;
            if (segment.type === "json") {
                ProtocolStreamParser_flattenToProtocolObjects(segment.content).forEach((jsonObject) => {
                    if (isProtocolChatMessageLoose(jsonObject)) {
                        jsonObject.message_contents.forEach((content) => {
                            appendMessage(contentParser.parseProtocolContent(content, jsonObject.message_id, Boolean(jsonObject.debug)));
                        });
                    }
                    else if (isProtocolPanelUpdateActionLoose(jsonObject)) {
                        const panel = actionParser.convertPanelUpdateToMessage(jsonObject.action_data);
                        if (panel)
                            appendMessage(panel);
                    }
                });
            }
            else if (segment.type === "string") {
                ProtocolStreamParser_processStringSegment(segment.content, appendThought, appendAction, options.config.actionMarkerLabels);
            }
            else if (isSegmentArray(segment.content)) {
                traverseSegments(segment.content);
            }
        });
    };
    traverseSegments(options.segments);
    return { messages, thoughts, actions, orderedParts };
}
function shouldSkipDebugSegment(segment, config) {
    return (!config.includeDebugBlocks &&
        segment.type === "json" &&
        isRecord(segment.content) &&
        segment.content["debug"] === true);
}
/** Scans a text span for assistant thought and action markers. */
export function ProtocolStreamParser_processStringSegment(text, onThought, onAction, actionMarkerLabels = DEFAULT_PARSER_CONFIG.actionMarkerLabels) {
    const thoughtRegex = /\*\*ASSISTANT THOUGHT\*\*\s*-\s*([^\n]+)(?:\n\s*"([^"]+)")?/g;
    const actionRegex = ProtocolStreamParser_createActionMarkerRegex(actionMarkerLabels);
    const matches = collectTextMarkerMatches(text, thoughtRegex, actionRegex);
    matches
        .sort((left, right) => left.index - right.index)
        .forEach(({ kind, match }) => {
        if (kind === "thought") {
            const thoughtLabel = match[1]?.trim();
            if (!thoughtLabel)
                return;
            const cleanText = match[2]
                ? `${thoughtLabel}: "${match[2]}"`
                : thoughtLabel;
            onThought(omitUndefined({
                originalText: match[0],
                cleanText,
                context: ProtocolStreamParser_extractContext(cleanText),
            }));
        }
        else {
            const actionType = match[1];
            const description = match[2]?.trim() ?? "";
            if (!actionType || !description)
                return;
            onAction(omitUndefined({
                actionType,
                description,
                context: ProtocolStreamParser_extractContext(description),
            }));
        }
    });
}
function ProtocolStreamParser_createActionMarkerRegex(actionMarkerLabels) {
    const labelPattern = actionMarkerLabels
        .map(ProtocolStreamParser_escapeRegexLiteral)
        .filter((label) => label.length > 0)
        .join("|");
    if (labelPattern.length === 0) {
        return /$a/g;
    }
    return new RegExp(`##\\s*(${labelPattern}):[ \\t]*([^\\n]*)`, "g");
}
function ProtocolStreamParser_escapeRegexLiteral(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function collectTextMarkerMatches(text, thoughtRegex, actionRegex) {
    const matches = [];
    let match = thoughtRegex.exec(text);
    while (match !== null) {
        matches.push({ index: match.index, kind: "thought", match });
        match = thoughtRegex.exec(text);
    }
    match = actionRegex.exec(text);
    while (match !== null) {
        matches.push({ index: match.index, kind: "action", match });
        match = actionRegex.exec(text);
    }
    return matches;
}
/** Derives a coarse routing hint from substring keywords in thought or action text. */
export function ProtocolStreamParser_extractContext(text) {
    const lower = text.toLowerCase();
    if (lower.includes("search"))
        return "search";
    if (lower.includes("analyz"))
        return "analysis";
    if (lower.includes("handshake"))
        return "handshake";
    if (lower.includes("respond"))
        return "response";
    return undefined;
}
/** Flattens nested JSON-like values into protocol object candidates for loose validators. */
export function ProtocolStreamParser_flattenToProtocolObjects(value) {
    const results = [];
    if (Array.isArray(value)) {
        value.forEach((item) => {
            const record = asRecord(item);
            if (record) {
                results.push(record);
            }
            else if (Array.isArray(item)) {
                results.push(...ProtocolStreamParser_flattenToProtocolObjects(item));
            }
        });
    }
    else {
        const record = asRecord(value);
        if (record)
            results.push(record);
    }
    return results;
}
function isSegmentArray(content) {
    return (Array.isArray(content) &&
        content.every((item) => isRecord(item) && typeof item["type"] === "string"));
}
//# sourceMappingURL=summary-parser.js.map