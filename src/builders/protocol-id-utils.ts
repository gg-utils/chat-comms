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

export interface ProtocolIdUtils_ContentIdResolutionOptions
  extends ProtocolIdUtils_BaseIdResolutionOptions {
  content_id?: string;
}

export interface ProtocolIdUtils_ActionIdResolutionOptions
  extends ProtocolIdUtils_BaseIdResolutionOptions {
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
  debug: (
    source: string,
    message: string,
    metadata?: ProtocolIdUtils_LogMetadata
  ) => void;
  info: (
    source: string,
    message: string,
    metadata?: ProtocolIdUtils_LogMetadata
  ) => void;
  warn: (
    source: string,
    message: string,
    metadata?: ProtocolIdUtils_LogMetadata
  ) => void;
  error: (
    source: string,
    message: string,
    error?: Error,
    metadata?: ProtocolIdUtils_LogMetadata
  ) => void;
}

export interface ProtocolIdUtils_SequenceManagerOptions {
  baseMessageId: string;
  initialSuffix?: string;
  logger?: ProtocolIdUtils_SequenceManagerLogger;
  logPrefix?: string;
  errorPrefix?: string;
  initializationLogMessage?: string;
}

function createProtocolRandomUuid(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40;
    bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0"));
    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex
      .slice(6, 8)
      .join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
    const randomNibble = Math.floor(Math.random() * 16);
    const value = char === "x" ? randomNibble : (randomNibble & 0x3) | 0x8;
    return value.toString(16);
  });
}

function createShortRandomComponent(): string {
  return createProtocolRandomUuid().replace(/-/g, "").slice(0, 8);
}

/** Protocol utility functions for ID generation, ID resolution, and basic envelope checks. */
export const ProtocolIdUtils = {
  /** Generate a unique message ID. */
  generateMessageId(prefix: string = "chatmessage"): string {
    return `${prefix}-${createProtocolRandomUuid()}`;
  },

  /** Generate a unique content ID from a message ID and content suffix. */
  generateContentId(messageId: string, suffix: string): string {
    return `${messageId}-content-${suffix}-${createShortRandomComponent()}`;
  },

  /** Generate a unique action ID from a message ID and action suffix. */
  generateActionId(messageId: string, suffix: string): string {
    return `${messageId}-action-${suffix}-${createShortRandomComponent()}`;
  },

  /** Basic shape validation for protocol chat message envelopes. */
  validateMessage(message: ProtocolIdUtils_MessageLike): boolean {
    return Boolean(
      message.message_id &&
        message.message_type === "CHAT_MESSAGE" &&
        message.message_role &&
        message.message_target === "CHAT" &&
        Array.isArray(message.message_contents)
    );
  },

  /** Resolve a content ID using explicit IDs first, then suffix/message context, then fallback IDs. */
  resolveContentId(options: ProtocolIdUtils_ContentIdResolutionOptions): string {
    if (options.content_id) {
      return options.content_id;
    }
    if (options.content_id_suffix && options.message_id) {
      return this.generateContentId(options.message_id, options.content_id_suffix);
    }
    if (options.content_id_suffix) {
      return `content-${options.content_id_suffix}`;
    }
    return `content-${createProtocolRandomUuid()}`;
  },

  /** Resolve an action ID using explicit IDs first, then suffix/message context, then fallback IDs. */
  resolveActionId(options: ProtocolIdUtils_ActionIdResolutionOptions): string {
    if (options.action_id) {
      return options.action_id;
    }
    if (options.content_id_suffix && options.message_id) {
      return this.generateActionId(options.message_id, options.content_id_suffix);
    }
    if (options.content_id_suffix) {
      return `action-${options.content_id_suffix}`;
    }
    return `action-${createProtocolRandomUuid()}`;
  },
};

/**
 * Runtime-agnostic manager for stable protocol message, content, and action id sequences.
 *
 * @remarks
 * This class owns the reusable id arithmetic only. Consumers may supply an optional logger adapter
 * to mirror transitions into their own logging infrastructure.
 */
export class ProtocolIdUtils_SequenceManager {
  private readonly baseMessageId: string;
  private readonly logger: ProtocolIdUtils_SequenceManagerLogger | undefined;
  private readonly logPrefix: string;
  private readonly errorPrefix: string;
  private currentSequenceId: string;
  private sequenceCounter: number = 0;

  constructor(options: ProtocolIdUtils_SequenceManagerOptions) {
    if (!options.baseMessageId || options.baseMessageId.trim().length === 0) {
      const errorPrefix = options.errorPrefix ?? "ProtocolIdUtils_SequenceManager";
      throw new Error(`${errorPrefix}: baseMessageId cannot be empty`);
    }

    this.baseMessageId = options.baseMessageId.trim();
    this.logger = options.logger;
    this.logPrefix = options.logPrefix ?? "ProtocolIdUtils_SequenceManager";
    this.errorPrefix = options.errorPrefix ?? "ProtocolIdUtils_SequenceManager";
    this.currentSequenceId = options.initialSuffix
      ? `${this.baseMessageId}-${options.initialSuffix}`
      : this.baseMessageId;

    this.logger?.debug(
      this.logPrefix,
      options.initializationLogMessage ?? "Initialized ProtocolIdUtils_SequenceManager",
      {
        baseMessageId: this.baseMessageId,
        initialSequenceId: this.currentSequenceId,
        hasInitialSuffix: Boolean(options.initialSuffix),
      }
    );
  }

  /** Current message id for the active logical protocol sequence. */
  getCurrentMessageId(): string {
    return this.currentSequenceId;
  }

  /** Backward-compatible alias for sequence-oriented callers. */
  getCurrentSequenceId(): string {
    return this.getCurrentMessageId();
  }

  /** Start the next logical protocol sequence and return its message id. */
  startNewSequence(sequenceName: string): string {
    if (!sequenceName || sequenceName.trim().length === 0) {
      throw new Error(`${this.errorPrefix}: sequenceName cannot be empty`);
    }

    const trimmedSequenceName = sequenceName.trim();
    const previousSequenceId = this.currentSequenceId;
    this.sequenceCounter += 1;
    this.currentSequenceId = `${this.baseMessageId}-${trimmedSequenceName}-${this.sequenceCounter}`;

    this.logger?.debug(this.logPrefix, "Started new sequence", {
      sequenceName: trimmedSequenceName,
      previousSequenceId,
      newSequenceId: this.currentSequenceId,
      sequenceNumber: this.sequenceCounter,
    });

    return this.currentSequenceId;
  }

  /** Create a content id under the current logical protocol sequence. */
  makeContentId(contentType: string): string {
    if (!contentType || contentType.trim().length === 0) {
      throw new Error(`${this.errorPrefix}: contentType cannot be empty`);
    }

    const trimmedContentType = contentType.trim();
    const contentId = `${this.currentSequenceId}-${trimmedContentType}`;

    this.logger?.debug(this.logPrefix, "Created content ID", {
      baseSequenceId: this.currentSequenceId,
      contentType: trimmedContentType,
      contentId,
    });

    return contentId;
  }

  /** Create an action id under the current logical protocol sequence. */
  makeActionId(actionType: string): string {
    if (!actionType || actionType.trim().length === 0) {
      throw new Error(`${this.errorPrefix}: actionType cannot be empty`);
    }

    const trimmedActionType = actionType.trim();
    const actionId = `${this.currentSequenceId}-${trimmedActionType}`;

    this.logger?.debug(this.logPrefix, "Created action ID", {
      baseSequenceId: this.currentSequenceId,
      actionType: trimmedActionType,
      actionId,
    });

    return actionId;
  }

  /** Original base message id supplied to the sequence manager. */
  getBaseMessageId(): string {
    return this.baseMessageId;
  }

  /** Number of logical sequences created after initialization or reset. */
  getSequenceCount(): number {
    return this.sequenceCounter;
  }

  /** Emit a debug log with the current sequence snapshot. */
  logDebug(message: string, metadata?: ProtocolIdUtils_LogMetadata): void {
    this.logger?.debug(this.logPrefix, message, this.createLogMetadata(metadata));
  }

  /** Emit an info log with the current sequence snapshot. */
  logInfo(message: string, metadata?: ProtocolIdUtils_LogMetadata): void {
    this.logger?.info(this.logPrefix, message, this.createLogMetadata(metadata));
  }

  /** Emit a warning log with the current sequence snapshot. */
  logWarning(message: string, metadata?: ProtocolIdUtils_LogMetadata): void {
    this.logger?.warn(this.logPrefix, message, this.createLogMetadata(metadata));
  }

  /** Emit an error log with the current sequence snapshot. */
  logError(
    message: string,
    error?: Error,
    metadata?: ProtocolIdUtils_LogMetadata
  ): void {
    this.logger?.error(this.logPrefix, message, error, this.createLogMetadata(metadata));
  }

  /** Reset sequence numbering and return to the original base message id. */
  reset(): void {
    const previousState = {
      currentSequenceId: this.currentSequenceId,
      sequenceCount: this.sequenceCounter,
    };

    this.sequenceCounter = 0;
    this.currentSequenceId = this.baseMessageId;

    this.logger?.debug(this.logPrefix, "Reset sequence manager", {
      previousState,
      newState: {
        currentSequenceId: this.currentSequenceId,
        sequenceCount: this.sequenceCounter,
      },
    });
  }

  /** Human-readable state snapshot for diagnostics. */
  toString(): string {
    return [
      `ProtocolIdUtils_SequenceManager(base: ${this.baseMessageId}`,
      `current: ${this.currentSequenceId}`,
      `count: ${this.sequenceCounter})`,
    ].join(", ");
  }

  private createLogMetadata(
    metadata: ProtocolIdUtils_LogMetadata = {}
  ): ProtocolIdUtils_LogMetadata {
    return {
      currentSequenceId: this.currentSequenceId,
      sequenceCount: this.sequenceCounter,
      baseMessageId: this.baseMessageId,
      ...metadata,
    };
  }
}
