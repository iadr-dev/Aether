/**
 * Runtime type guards and validators for AETHER types
 * Uses TypeScript type predicates for type-safe runtime checking
 */

import type {
  AgentState,
  StateTransition,
  CortexPhase,
  CortexContext,
  SignalPriority,
  SignalType,
  PerceptionSignal,
  StrategyType,
  Strategy,
  Position,
  MemoryTier,
  MemoryEntry,
  WorkingMemory,
  EpisodicMemory,
  SemanticMemory,
  ProceduralMemory,
  MarketMemory,
  StrategicMemory,
  LimbCall,
  LimbResult,
  AuditEventType,
  AuditEntry,
} from "../types";

// ============================================================================
// UTILITY HELPERS
// ============================================================================

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

// ============================================================================
// STATE MACHINE
// ============================================================================

const AGENT_STATES: AgentState[] = [
  "IDLE",
  "HUNTING",
  "CRITICAL",
  "DISTRESS",
  "DEAD",
  "DORMANT",
  "FUSED",
];

export function isAgentState(value: unknown): value is AgentState {
  return isString(value) && AGENT_STATES.includes(value as AgentState);
}

export function isStateTransition(value: unknown): value is StateTransition {
  return (
    isObject(value) &&
    isAgentState(value.from) &&
    isAgentState(value.to) &&
    isString(value.trigger) &&
    isNumber(value.timestamp)
  );
}

// ============================================================================
// CORTEX ENGINE
// ============================================================================

const CORTEX_PHASES: CortexPhase[] = [
  "PERCEIVE",
  "ANALYZE",
  "STRATEGIZE",
  "EXECUTE",
  "OBSERVE",
  "INTEGRATE",
];

export function isCortexPhase(value: unknown): value is CortexPhase {
  return isString(value) && CORTEX_PHASES.includes(value as CortexPhase);
}

export function isCortexContext(value: unknown): value is CortexContext {
  return (
    isObject(value) &&
    isString(value.spiralId) &&
    isCortexPhase(value.phase) &&
    isNumber(value.startTime) &&
    isArray(value.signals) &&
    isObject(value.workingMemory)
  );
}

// ============================================================================
// PERCEPTION SIGNALS
// ============================================================================

const SIGNAL_PRIORITIES: SignalPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

export function isSignalPriority(value: unknown): value is SignalPriority {
  return isString(value) && SIGNAL_PRIORITIES.includes(value as SignalPriority);
}

const SIGNAL_TYPES: SignalType[] = [
  "MARKET",
  "SOCIAL",
  "NEWS",
  "CHAIN",
  "WEB",
  "AGENT",
];

export function isSignalType(value: unknown): value is SignalType {
  return isString(value) && SIGNAL_TYPES.includes(value as SignalType);
}

export function isPerceptionSignal(value: unknown): value is PerceptionSignal {
  return (
    isObject(value) &&
    isString(value.id) &&
    isSignalType(value.type) &&
    isSignalPriority(value.priority) &&
    isString(value.source) &&
    isNumber(value.timestamp) &&
    isObject(value.data)
  );
}

// ============================================================================
// ALPHA ENGINE
// ============================================================================

const STRATEGY_TYPES: StrategyType[] = [
  "PREDICTION",
  "YIELD",
  "ARBITRAGE",
  "DOMAIN",
  "PRODUCT",
  "CONTENT",
  "SERVICE",
];

export function isStrategyType(value: unknown): value is StrategyType {
  return isString(value) && STRATEGY_TYPES.includes(value as StrategyType);
}

export function isStrategy(value: unknown): value is Strategy {
  return (
    isObject(value) &&
    isString(value.id) &&
    isStrategyType(value.type) &&
    isNumber(value.edge) &&
    isNumber(value.capital) &&
    isString(value.horizon) &&
    isNumber(value.expectedValue) &&
    isNumber(value.createdAt) &&
    isString(value.status) &&
    ["ACTIVE", "PAUSED", "COMPLETED", "FAILED"].includes(
      value.status as string,
    ) &&
    isObject(value.metadata)
  );
}

export function isPosition(value: unknown): value is Position {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.strategyId) &&
    isStrategyType(value.type) &&
    isNumber(value.entryPrice) &&
    isNumber(value.currentPrice) &&
    isNumber(value.quantity) &&
    isNumber(value.unrealizedPnL) &&
    isNumber(value.openedAt) &&
    isObject(value.metadata)
  );
}

// ============================================================================
// MEMORY SYSTEM
// ============================================================================

const MEMORY_TIERS: MemoryTier[] = [
  "WORKING",
  "EPISODIC",
  "SEMANTIC",
  "PROCEDURAL",
  "MARKET",
  "STRATEGIC",
];

export function isMemoryTier(value: unknown): value is MemoryTier {
  return isString(value) && MEMORY_TIERS.includes(value as MemoryTier);
}

export function isMemoryEntry(value: unknown): value is MemoryEntry {
  return (
    isObject(value) &&
    isString(value.id) &&
    isMemoryTier(value.tier) &&
    isNumber(value.timestamp) &&
    isString(value.content) &&
    isNumber(value.importance) &&
    isObject(value.metadata)
  );
}

export function isWorkingMemory(value: unknown): value is WorkingMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "WORKING" &&
    isString((value as WorkingMemory).sessionId) &&
    isArray((value as WorkingMemory).goals)
  );
}

export function isEpisodicMemory(value: unknown): value is EpisodicMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "EPISODIC" &&
    isString((value as EpisodicMemory).eventType) &&
    isString((value as EpisodicMemory).outcome) &&
    ["SUCCESS", "FAILURE", "NEUTRAL"].includes(
      (value as EpisodicMemory).outcome,
    )
  );
}

export function isSemanticMemory(value: unknown): value is SemanticMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "SEMANTIC" &&
    isString((value as SemanticMemory).category)
  );
}

export function isProceduralMemory(value: unknown): value is ProceduralMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "PROCEDURAL" &&
    isString((value as ProceduralMemory).procedureName) &&
    isArray((value as ProceduralMemory).steps) &&
    isNumber((value as ProceduralMemory).successCount) &&
    isNumber((value as ProceduralMemory).failureCount)
  );
}

export function isMarketMemory(value: unknown): value is MarketMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "MARKET" &&
    isString((value as MarketMemory).symbol) &&
    isArray((value as MarketMemory).priceHistory) &&
    isObject((value as MarketMemory).correlations)
  );
}

export function isStrategicMemory(value: unknown): value is StrategicMemory {
  return (
    isMemoryEntry(value) &&
    value.tier === "STRATEGIC" &&
    isStrategyType((value as StrategicMemory).strategyType) &&
    isNumber((value as StrategicMemory).pnl) &&
    isArray((value as StrategicMemory).lessons)
  );
}

// ============================================================================
// LIMB SYSTEM
// ============================================================================

export function isLimbCall(value: unknown): value is LimbCall {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.limbName) &&
    isString(value.action) &&
    isObject(value.params) &&
    isNumber(value.timestamp)
  );
}

export function isLimbResult(value: unknown): value is LimbResult {
  return (
    isObject(value) &&
    isString(value.callId) &&
    typeof value.success === "boolean" &&
    isNumber(value.executionTime) &&
    isNumber(value.timestamp)
  );
}

// ============================================================================
// AUDIT CHAIN
// ============================================================================

const AUDIT_EVENT_TYPES: AuditEventType[] = [
  "STATE_CHANGE",
  "LIMB_CALL",
  "TRANSACTION",
  "STRATEGY_CREATED",
  "STRATEGY_CLOSED",
  "MEMORY_WRITE",
  "CONFIG_CHANGE",
  "FUSION_EVENT",
];

export function isAuditEventType(value: unknown): value is AuditEventType {
  return isString(value) && AUDIT_EVENT_TYPES.includes(value as AuditEventType);
}

export function isAuditEntry(value: unknown): value is AuditEntry {
  return (
    isObject(value) &&
    isString(value.id) &&
    isAuditEventType(value.eventType) &&
    isNumber(value.timestamp) &&
    isString(value.actor) &&
    isString(value.action) &&
    isObject(value.data) &&
    isString(value.previousHash) &&
    isString(value.currentHash)
  );
}
