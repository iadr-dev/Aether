/**
 * Core type definitions for AETHER autonomous agent
 * All types use TypeScript strict mode with explicit types
 */

// ============================================================================
// STATE MACHINE
// ============================================================================

/**
 * Agent operational states
 */
export type AgentState =
  | 'IDLE'      // Waiting for signals
  | 'HUNTING'   // Cortex active, executing strategies
  | 'CRITICAL'  // Low balance, earning-focused
  | 'DISTRESS'  // Near-zero balance, broadcasting for help
  | 'DEAD'      // Zero balance, paused
  | 'DORMANT'   // Manual pause by operator
  | 'FUSED';    // Merged with other agents

/**
 * State transition event
 */
export interface StateTransition {
  from: AgentState;
  to: AgentState;
  trigger: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// CORTEX ENGINE - 6 PHASE SPIRAL
// ============================================================================

/**
 * Cortex reasoning phases
 */
export type CortexPhase =
  | 'PERCEIVE'    // Ingest signals from Perception Mesh
  | 'ANALYZE'     // Parallel analysis streams
  | 'STRATEGIZE'  // Generate strategies via Alpha Engine
  | 'EXECUTE'     // Dispatch Limbs in parallel
  | 'OBSERVE'     // Collect results
  | 'INTEGRATE';  // Learn and update memory

/**
 * Cortex spiral execution context
 */
export interface CortexContext {
  spiralId: string;
  phase: CortexPhase;
  startTime: number;
  signals: PerceptionSignal[];
  workingMemory: Record<string, unknown>;
}

// ============================================================================
// PERCEPTION SIGNALS
// ============================================================================

/**
 * Signal priority levels
 */
export type SignalPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Signal source types
 */
export type SignalType =
  | 'MARKET'      // Exchange prices, volume, liquidity
  | 'SOCIAL'      // Social platforms, sentiment
  | 'NEWS'        // Web-crawled news
  | 'CHAIN'       // On-chain events
  | 'WEB'         // Domain monitoring, opportunities
  | 'AGENT';      // Inter-agent messages

/**
 * Perception signal from any feed
 */
export interface PerceptionSignal {
  id: string;
  type: SignalType;
  priority: SignalPriority;
  source: string;
  timestamp: number;
  data: Record<string, unknown>;
  expiresAt?: number;
}

// ============================================================================
// ALPHA ENGINE - STRATEGIES & POSITIONS
// ============================================================================

/**
 * Strategy types for earning
 */
export type StrategyType =
  | 'PREDICTION'    // Prediction markets
  | 'YIELD'         // On-chain yield farming
  | 'ARBITRAGE'     // Price differences
  | 'DOMAIN'        // Domain intelligence
  | 'PRODUCT'       // Autonomous products
  | 'CONTENT'       // Content generation
  | 'SERVICE';      // Agent services

/**
 * Strategy definition
 */
export interface Strategy {
  id: string;
  type: StrategyType;
  edge: number;              // Expected edge percentage
  capital: number;           // Allocated capital in USD
  horizon: string;           // Time horizon (e.g., "14 days")
  expectedValue: number;     // Expected profit in USD
  createdAt: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'FAILED';
  metadata: Record<string, unknown>;
}

/**
 * Open position tracking
 */
export interface Position {
  id: string;
  strategyId: string;
  type: StrategyType;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  unrealizedPnL: number;
  openedAt: number;
  metadata: Record<string, unknown>;
}

// ============================================================================
// MEMORY SYSTEM - 6 TIERS
// ============================================================================

/**
 * Memory tier types
 */
export type MemoryTier =
  | 'WORKING'      // Current session (in-RAM)
  | 'EPISODIC'     // Significant events
  | 'SEMANTIC'     // Categorized facts
  | 'PROCEDURAL'   // Step-by-step procedures
  | 'MARKET'       // Price history, patterns
  | 'STRATEGIC';   // Strategy outcomes

/**
 * Base memory entry
 */
export interface MemoryEntry {
  id: string;
  tier: MemoryTier;
  timestamp: number;
  content: string;
  importance: number;        // 0-100 score
  metadata: Record<string, unknown>;
}

/**
 * Working memory (session-scoped)
 */
export interface WorkingMemory extends MemoryEntry {
  tier: 'WORKING';
  sessionId: string;
  goals: string[];
}

/**
 * Episodic memory (events)
 */
export interface EpisodicMemory extends MemoryEntry {
  tier: 'EPISODIC';
  eventType: string;
  outcome: 'SUCCESS' | 'FAILURE' | 'NEUTRAL';
}

/**
 * Semantic memory (facts)
 */
export interface SemanticMemory extends MemoryEntry {
  tier: 'SEMANTIC';
  category: string;
  embedding?: number[];      // Vector embedding
}

/**
 * Procedural memory (procedures)
 */
export interface ProceduralMemory extends MemoryEntry {
  tier: 'PROCEDURAL';
  procedureName: string;
  steps: string[];
  successCount: number;
  failureCount: number;
}

/**
 * Market memory (financial data)
 */
export interface MarketMemory extends MemoryEntry {
  tier: 'MARKET';
  symbol: string;
  priceHistory: Array<{ timestamp: number; price: number }>;
  correlations: Record<string, number>;
}

/**
 * Strategic memory (strategy outcomes)
 */
export interface StrategicMemory extends MemoryEntry {
  tier: 'STRATEGIC';
  strategyType: StrategyType;
  pnl: number;
  lessons: string[];
}

// ============================================================================
// LIMB SYSTEM - TOOL EXECUTION
// ============================================================================

/**
 * Limb call request
 */
export interface LimbCall {
  id: string;
  limbName: string;
  action: string;
  params: Record<string, unknown>;
  timestamp: number;
  timeout?: number;
}

/**
 * Limb execution result
 */
export interface LimbResult {
  callId: string;
  success: boolean;
  data?: unknown;
  error?: string;
  executionTime: number;
  timestamp: number;
}

// ============================================================================
// AUDIT CHAIN - MERKLE-LINKED LOGGING
// ============================================================================

/**
 * Audit entry types
 */
export type AuditEventType =
  | 'STATE_CHANGE'
  | 'LIMB_CALL'
  | 'TRANSACTION'
  | 'STRATEGY_CREATED'
  | 'STRATEGY_CLOSED'
  | 'MEMORY_WRITE'
  | 'CONFIG_CHANGE'
  | 'FUSION_EVENT';

/**
 * Audit log entry with Merkle chain
 */
export interface AuditEntry {
  id: string;
  eventType: AuditEventType;
  timestamp: number;
  actor: string;              // Who/what triggered this
  action: string;             // What happened
  data: Record<string, unknown>;
  previousHash: string;       // Hash of previous entry
  currentHash: string;        // Hash of this entry
}
