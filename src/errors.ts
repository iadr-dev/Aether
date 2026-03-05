/**
 * Custom error types for AETHER autonomous agent
 * All errors extend base AetherError with error codes and context
 */

// ============================================================================
// BASE ERROR
// ============================================================================

/**
 * Base error class for all AETHER errors
 */
export class AetherError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, unknown>;
  public readonly timestamp: number;

  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.context = context;
    this.timestamp = Date.now();
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================================
// STATE MACHINE ERRORS
// ============================================================================

export class StateError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class InvalidTransitionError extends StateError {
  constructor(from: string, to: string, context?: Record<string, unknown>) {
    super(
      `Invalid state transition from ${from} to ${to}`,
      "INVALID_TRANSITION",
      { from, to, ...context }
    );
  }
}

export class StateViolationError extends StateError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "STATE_VIOLATION", context);
  }
}

// ============================================================================
// CORTEX ERRORS
// ============================================================================

export class CortexError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class LLMFailureError extends CortexError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "LLM_FAILURE", context);
  }
}

export class ContextOverflowError extends CortexError {
  constructor(size: number, limit: number, context?: Record<string, unknown>) {
    super(
      `Context size ${size} exceeds limit ${limit}`,
      "CONTEXT_OVERFLOW",
      { size, limit, ...context }
    );
  }
}

export class PhaseExecutionError extends CortexError {
  constructor(phase: string, message: string, context?: Record<string, unknown>) {
    super(
      `Phase ${phase} execution failed: ${message}`,
      "PHASE_EXECUTION_FAILED",
      { phase, ...context }
    );
  }
}

// ============================================================================
// PERCEPTION ERRORS
// ============================================================================

export class PerceptionError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class FeedFailureError extends PerceptionError {
  constructor(feedName: string, message: string, context?: Record<string, unknown>) {
    super(
      `Feed ${feedName} failed: ${message}`,
      "FEED_FAILURE",
      { feedName, ...context }
    );
  }
}

export class SignalValidationError extends PerceptionError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "SIGNAL_VALIDATION_FAILED", context);
  }
}

// ============================================================================
// LIMB ERRORS
// ============================================================================

export class LimbError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class ToolFailureError extends LimbError {
  constructor(toolName: string, message: string, context?: Record<string, unknown>) {
    super(
      `Tool ${toolName} failed: ${message}`,
      "TOOL_FAILURE",
      { toolName, ...context }
    );
  }
}

export class TimeoutError extends LimbError {
  constructor(operation: string, timeout: number, context?: Record<string, unknown>) {
    super(
      `Operation ${operation} timed out after ${timeout}ms`,
      "TIMEOUT",
      { operation, timeout, ...context }
    );
  }
}

// ============================================================================
// FINANCIAL ERRORS
// ============================================================================

export class FinancialError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class InsufficientFundsError extends FinancialError {
  constructor(required: number, available: number, context?: Record<string, unknown>) {
    super(
      `Insufficient funds: required ${required}, available ${available}`,
      "INSUFFICIENT_FUNDS",
      { required, available, ...context }
    );
  }
}

export class TransactionFailureError extends FinancialError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "TRANSACTION_FAILED", context);
  }
}

// ============================================================================
// SECURITY ERRORS
// ============================================================================

export class SecurityError extends AetherError {
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message, code, context);
  }
}

export class PolicyViolationError extends SecurityError {
  constructor(policy: string, message: string, context?: Record<string, unknown>) {
    super(
      `Policy ${policy} violated: ${message}`,
      "POLICY_VIOLATION",
      { policy, ...context }
    );
  }
}

export class InjectionAttemptError extends SecurityError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "INJECTION_ATTEMPT", context);
  }
}
