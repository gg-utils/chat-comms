/**
 * @fileoverview Protocol ID generation, resolution, and basic envelope shape utilities.
 *
 * These helpers are runtime-agnostic and work in browser, Node, and test environments.
 *
 * @testing TypeScript compile: cd chat-stream-protocol && npm run build
 * @documentation reviewed=2026-05-25 standard=FILE_OVERVIEW_STANDARDS_TYPESCRIPT@3
 */
export interface ProtocolIdUtils_BaseIdResolutionOptions {
    content_id_suffix?: string;
    message_id?: string;
}
export interface ProtocolIdUtils_ContentIdResolutionOptions extends ProtocolIdUtils_BaseIdResolutionOptions {
    content_id?: string;
}
export interface ProtocolIdUtils_ActionIdResolutionOptions extends ProtocolIdUtils_BaseIdResolutionOptions {
    action_id?: string;
}
export interface ProtocolIdUtils_MessageLike {
    message_id?: unknown;
    message_type?: unknown;
    message_role?: unknown;
    message_target?: unknown;
    message_contents?: unknown;
}
export type ProtocolIdUtils_LogMetadata = Record<string, unknown>;
export interface ProtocolIdUtils_SequenceManagerLogger {
    debug: (source: string, message: string, metadata?: ProtocolIdUtils_LogMetadata) => void;
    info: (source: string, message: string, metadata?: ProtocolIdUtils_LogMetadata) => void;
    warn: (source: string, message: string, metadata?: ProtocolIdUtils_LogMetadata) => void;
    error: (source: string, message: string, error?: Error, metadata?: ProtocolIdUtils_LogMetadata) => void;
}
export interface ProtocolIdUtils_SequenceManagerOptions {
    baseMessageId: string;
    initialSuffix?: string;
    logger?: ProtocolIdUtils_SequenceManagerLogger;
    logPrefix?: string;
    errorPrefix?: string;
    initializationLogMessage?: string;
}
/** Protocol utility functions for ID generation, ID resolution, and basic envelope checks. */
export declare const ProtocolIdUtils: {
    /** Generate a unique message ID. */
    generateMessageId(prefix?: string): string;
    /** Generate a unique content ID from a message ID and content suffix. */
    generateContentId(messageId: string, suffix: string): string;
    /** Generate a unique action ID from a message ID and action suffix. */
    generateActionId(messageId: string, suffix: string): string;
    /** Basic shape validation for protocol chat message envelopes. */
    validateMessage(message: ProtocolIdUtils_MessageLike): boolean;
    /** Resolve a content ID using explicit IDs first, then suffix/message context, then fallback IDs. */
    resolveContentId(options: ProtocolIdUtils_ContentIdResolutionOptions): string;
    /** Resolve an action ID using explicit IDs first, then suffix/message context, then fallback IDs. */
    resolveActionId(options: ProtocolIdUtils_ActionIdResolutionOptions): string;
};
/**
 * Runtime-agnostic manager for stable protocol message, content, and action id sequences.
 *
 * @remarks
 * This class owns the reusable id arithmetic only. Consumers may supply an optional logger adapter
 * to mirror transitions into their own logging infrastructure.
 */
export declare class ProtocolIdUtils_SequenceManager {
    private readonly baseMessageId;
    private readonly logger;
    private readonly logPrefix;
    private readonly errorPrefix;
    private currentSequenceId;
    private sequenceCounter;
    constructor(options: ProtocolIdUtils_SequenceManagerOptions);
    /** Current message id for the active logical protocol sequence. */
    getCurrentMessageId(): string;
    /** Backward-compatible alias for sequence-oriented callers. */
    getCurrentSequenceId(): string;
    /** Start the next logical protocol sequence and return its message id. */
    startNewSequence(sequenceName: string): string;
    /** Create a content id under the current logical protocol sequence. */
    makeContentId(contentType: string): string;
    /** Create an action id under the current logical protocol sequence. */
    makeActionId(actionType: string): string;
    /** Original base message id supplied to the sequence manager. */
    getBaseMessageId(): string;
    /** Number of logical sequences created after initialization or reset. */
    getSequenceCount(): number;
    /** Emit a debug log with the current sequence snapshot. */
    logDebug(message: string, metadata?: ProtocolIdUtils_LogMetadata): void;
    /** Emit an info log with the current sequence snapshot. */
    logInfo(message: string, metadata?: ProtocolIdUtils_LogMetadata): void;
    /** Emit a warning log with the current sequence snapshot. */
    logWarning(message: string, metadata?: ProtocolIdUtils_LogMetadata): void;
    /** Emit an error log with the current sequence snapshot. */
    logError(message: string, error?: Error, metadata?: ProtocolIdUtils_LogMetadata): void;
    /** Reset sequence numbering and return to the original base message id. */
    reset(): void;
    /** Human-readable state snapshot for diagnostics. */
    toString(): string;
    private createLogMetadata;
}
//# sourceMappingURL=protocol-id-utils.d.ts.map