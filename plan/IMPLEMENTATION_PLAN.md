# AETHER Implementation Plan

> **Project**: AETHER - The Sovereign Wealth Intelligence
> **Status**: Planning Phase
> **Started**: 2026-03-05
> **Target**: Production-ready autonomous agent

---

## Overview

This document tracks the implementation of AETHER from architecture to production deployment. Tasks are organized by phases, with dependencies and priorities clearly marked.

**Legend:**
- 🔴 Critical path / Blocker
- 🟡 High priority
- 🟢 Medium priority
- ⚪ Low priority / Nice-to-have
- ✅ Completed
- 🚧 In Progress
- ⏸️ Blocked
- ⏭️ Planned

---

## Phase 0: Foundation & Infrastructure

**Goal**: Set up core infrastructure, types, and configuration system.

### Milestone 0.1: Project Setup
- [x] 🔴 Initialize Bun project with TypeScript
- [x] 🔴 Configure tsconfig.json (strict mode, paths)
- [x] 🔴 Set up directory structure per architecture
- [x] 🔴 Create `.aether/` config directory structure
- [x] 🟡 Set up ESLint + Prettier
- [x] 🟡 Configure Git hooks (pre-commit, pre-push)
- [x] 🟢 Create .gitignore (secrets, logs, node_modules)
- [x] 🟢 Initialize README.md with quick start

### Milestone 0.2: Core Types & Interfaces
- [x] 🔴 Define `src/types.ts` with all shared interfaces
  - [x] State machine states and transitions
  - [x] Cortex spiral phases
  - [x] Signal types and priorities
  - [x] Strategy and position types
  - [x] Memory tier interfaces
  - [x] Limb call and result types
  - [x] Audit entry types
- [x] 🔴 Define error types and custom exceptions
- [x] 🟡 Create type guards and validators

### Milestone 0.3: Configuration System
- [ ] 🔴 Implement `src/config.ts` - TOML parser
- [ ] 🔴 Define default configuration schema
- [ ] 🔴 Implement config validation
- [ ] 🟡 Implement config merge (defaults + user + env)
- [ ] 🟡 Add config hot-reload support
- [ ] 🟢 Create example `aether.toml` template

### Milestone 0.4: Database Layer
- [ ] 🔴 Set up SQLite with better-sqlite3
- [ ] 🔴 Create database schema (all tables)
  - [ ] `state` - agent state tracking
  - [ ] `memory_*` - 6-tier memory tables
  - [ ] `strategies` - strategy execution log
  - [ ] `positions` - open positions tracking
  - [ ] `transactions` - wallet transaction history
  - [ ] `audit_log` - Merkle-linked audit chain
  - [ ] `signals` - perception signal history
  - [ ] `limb_calls` - limb execution log
- [ ] 🔴 Implement database migrations system
- [ ] 🟡 Add database backup/restore utilities
- [ ] 🟡 Implement connection pooling

---

## Phase 1: Core Runtime & State Machine

**Goal**: Implement agent lifecycle, state machine, and bootstrap process.

### Milestone 1.1: State Machine
- [ ] 🔴 Implement state machine engine (`src/state/machine.ts`)
- [ ] 🔴 Implement all 7 states (IDLE, HUNTING, CRITICAL, DISTRESS, DEAD, DORMANT, FUSED)
- [ ] 🔴 Implement state transition logic with guards
- [ ] 🔴 Define state timing thresholds
  - [ ] IDLE → HUNTING: treasury > $20
  - [ ] HUNTING → CRITICAL: treasury < $20
  - [ ] CRITICAL → DISTRESS: treasury < $5, 30min window
  - [ ] DISTRESS → DEAD: 30min timeout
  - [ ] DORMANT: manual operator trigger
  - [ ] FUSED: fusion protocol activation
- [ ] 🔴 Add state persistence to database
- [ ] 🟡 Implement state change event emitter
- [ ] 🟡 Add state transition logging to audit chain

### Milestone 1.2: Bootstrap & Lifecycle
- [ ] 🔴 Implement bootstrap sequence (`src/bootstrap.ts`)
  - [ ] Constitution verification (hash check)
  - [ ] Database initialization
  - [ ] Wallet loading/generation
  - [ ] Memory tier initialization
  - [ ] Perception mesh startup
  - [ ] Heartbeat daemon startup
- [ ] 🔴 Implement graceful shutdown handler
- [ ] 🟡 Add crash recovery mechanism
- [ ] 🟡 Implement health check endpoint

### Milestone 1.3: Entry Point & CLI Router
- [ ] 🔴 Implement `src/index.ts` - main entry point
- [ ] 🔴 Implement CLI command router (`src/cli/index.ts`)
- [ ] 🔴 Add daemon mode (detached process)
- [ ] 🟡 Implement IPC via Unix domain sockets
- [ ] 🟡 Add process management (PID file, status check)

---

## Phase 2: Perception Mesh

**Goal**: Implement continuous world observation system.

### Milestone 2.1: Perception Core
- [ ] 🔴 Implement Mesh orchestrator (`src/perception/mesh.ts`)
- [ ] 🔴 Implement signal normalization (`src/perception/signal.ts`)
- [ ] 🔴 Implement attention allocation (`src/perception/attention.ts`)
- [ ] 🟡 Add signal deduplication
- [ ] 🟡 Implement priority scoring algorithm
- [ ] 🟡 Add intelligent feed throttling (cost control)

### Milestone 2.2: Feed Workers
- [ ] 🔴 Market feed (`src/perception/feeds/market.ts`)
  - [ ] Price feed integration (CoinGecko/CoinMarketCap)
  - [ ] Exchange event monitoring
  - [ ] On-chain flow detection
- [ ] 🟡 Social feed (`src/perception/feeds/social.ts`)
  - [ ] Twitter/X API integration
  - [ ] Sentiment scoring
  - [ ] Trend detection
- [ ] 🟡 News feed (`src/perception/feeds/news.ts`)
  - [ ] RSS aggregation
  - [ ] Importance scoring
  - [ ] Deduplication
- [ ] 🟡 Chain feed (`src/perception/feeds/chain.ts`)
  - [ ] Ethereum event monitoring
  - [ ] Base L2 integration
  - [ ] Protocol event tracking
- [ ] 🟢 Web feed (`src/perception/feeds/web.ts`)
  - [ ] Domain monitoring
  - [ ] Opportunity radar
  - [ ] Product gap detection
- [ ] 🟢 Agent feed (`src/perception/feeds/agents.ts`)
  - [ ] Inter-agent communication
  - [ ] Fusion broadcasts
  - [ ] Agent network discovery

### Milestone 2.3: Feed Management
- [ ] 🟡 Implement feed health monitoring
- [ ] 🟡 Add feed pause/resume controls
- [ ] 🟡 Implement feed error recovery
- [ ] 🟢 Add feed performance metrics

---

## Phase 3: Limb System (Tools)

**Goal**: Implement parallel tool execution system with sandboxing.

### Milestone 3.1: Limb Core
- [ ] 🔴 Implement Limb registry (`src/limbs/registry.ts`)
- [ ] 🔴 Implement parallel dispatcher (`src/limbs/dispatch.ts`)
- [ ] 🔴 Implement sandbox with isolated-vm (`src/limbs/sandbox.ts`)
  - [ ] Timeout enforcement
  - [ ] Memory limits
  - [ ] Safe context injection
- [ ] 🟡 Add hot-reload support for generated Limbs
- [ ] 🟡 Implement Limb versioning

### Milestone 3.2: Built-in Limbs
- [ ] 🔴 Shell Limb (`src/limbs/built-in/shell.ts`)
  - [ ] Command execution with sandboxing
  - [ ] Forbidden pattern check
  - [ ] Output capture
- [ ] 🔴 Wallet Limb (`src/limbs/built-in/wallet.ts`)
  - [ ] Sign transactions
  - [ ] Send USDC
  - [ ] Check balance
  - [ ] On-chain interactions
- [ ] 🔴 API Limb (`src/limbs/built-in/api.ts`)
  - [ ] HTTP client with SSRF protection
  - [ ] Request/response handling
  - [ ] Rate limiting
- [ ] 🟡 Browser Limb (`src/limbs/built-in/browser.ts`)
  - [ ] Playwright integration
  - [ ] Session persistence
  - [ ] Screenshot capture
- [ ] 🟡 File Limb (`src/limbs/built-in/file.ts`)
  - [ ] Read/write with path guards
  - [ ] Workspace-only access
  - [ ] File operations
- [ ] 🟡 Memory Limb (`src/limbs/built-in/memory.ts`)
  - [ ] Read from Psyche layer
  - [ ] Write to memory tiers
  - [ ] Memory search
- [ ] 🟢 Domain Limb (`src/limbs/built-in/domain.ts`)
- [ ] 🟢 Deploy Limb (`src/limbs/built-in/deploy.ts`)
- [ ] 🟢 Email Limb (`src/limbs/built-in/email.ts`)
- [ ] 🟢 Channel Send Limb (`src/limbs/built-in/channel-send.ts`)

---

## Phase 4: Cortex Engine

**Goal**: Implement the 6-phase reasoning orchestrator.

### Milestone 4.1: Cortex Core
- [ ] 🔴 Implement Cortex engine (`src/cortex/engine.ts`)
- [ ] 🔴 Implement spiral orchestration (6 phases)
- [ ] 🔴 Add parallel execution with Promise.all
- [ ] 🟡 Implement context builder (`src/cortex/context.ts`)
  - [ ] Token budget awareness
  - [ ] Context window management
  - [ ] Relevant memory injection
- [ ] 🟡 Implement system prompt builder (`src/cortex/system-prompt.ts`)
  - [ ] SOUL.md integration
  - [ ] STATUS.md integration
  - [ ] Skill context injection

### Milestone 4.2: Spiral Phases
- [ ] 🔴 Phase 1: Perceive (`src/cortex/perceive.ts`)
- [ ] 🔴 Phase 2: Analyze (`src/cortex/analyze.ts`)
  - [ ] Implement 4 parallel analysis streams
  - [ ] Risk assessment stream
  - [ ] Opportunity detection stream
  - [ ] Pattern recognition stream
  - [ ] Anomaly detection stream
- [ ] 🔴 Phase 3: Strategize (`src/cortex/strategize.ts`)
- [ ] 🔴 Phase 4: Execute (`src/cortex/execute.ts`)
- [ ] 🔴 Phase 5: Observe (`src/cortex/observe.ts`)
- [ ] 🔴 Phase 6: Integrate (`src/cortex/integrate.ts`)

### Milestone 4.3: LLM Integration
- [ ] 🔴 Implement LLM router (cost/latency aware)
- [ ] 🔴 Anthropic Claude integration (primary)
- [ ] 🟡 OpenAI-compatible fallback
- [ ] 🟡 Local inference (Ollama) for CRITICAL tier
- [ ] 🟡 Implement token cost tracking
- [ ] 🟡 Add response caching

### Milestone 4.4: Policy Engine Integration
- [ ] 🔴 Implement pre-execution policy check
- [ ] 🔴 Constitution law enforcement
- [ ] 🟡 Operator veto window (60s for >$1 transactions)
- [ ] 🟡 Injection defense scanning

---

## Phase 5: Tool Genesis

**Goal**: Implement runtime tool creation system.

### Milestone 5.1: Genesis Core
- [ ] 🔴 Implement capability gap detector (`src/genesis/creator.ts`)
- [ ] 🔴 Implement Limb code generator
- [ ] 🔴 Add code templates for common patterns
- [ ] 🟡 Implement LLM-based code generation

### Milestone 5.2: Testing & Deployment
- [ ] 🔴 Implement auto-test generator (`src/genesis/tester.ts`)
- [ ] 🔴 Implement test runner in isolated sandbox
- [ ] 🔴 Implement canary deployment (`src/genesis/deployer.ts`)
  - [ ] 1% → 5% → 25% → 100% rollout
  - [ ] Automatic rollback on errors
  - [ ] Performance monitoring
- [ ] 🟡 Implement policy auditor (`src/genesis/auditor.ts`)
- [ ] 🟡 Add generated Limb versioning

---


## Phase 6: Skill System

**Goal**: Implement token-efficient domain knowledge injection.

### Milestone 6.1: Skill Core
- [ ] 🔴 Implement SkillEngine (`src/skills/index.ts`)
- [ ] 🔴 Implement skill loader (`src/skills/loader.ts`)
- [ ] 🔴 Implement skill injector (`src/skills/injector.ts`)
- [ ] 🟡 Implement skill registry (`src/skills/registry.ts`)

### Milestone 6.2: Built-in Skills
- [ ] 🟡 Researcher skill
- [ ] 🟡 Lead-gen skill
- [ ] 🟡 Content-writer skill
- [ ] 🟡 Code-contractor skill
- [ ] 🟡 Market-analyst skill
- [ ] 🟡 Prediction-trader skill

---

## Phase 7: Alpha Engine

**Goal**: Implement financial intelligence as architecture.

### Milestone 7.1: Alpha Core
- [ ] 🔴 Implement Alpha orchestrator (`src/alpha/engine.ts`)
- [ ] 🔴 Implement strategy generator
- [ ] 🔴 Implement risk management with circuit breakers
  - [ ] Build correlation matrix (30-day rolling window)
  - [ ] Detect correlated positions (threshold: 0.7)
  - [ ] Implement circuit breakers (5% loss → pause, 10% → halt)
  - [ ] Add volatility-adjusted position sizing
- [ ] 🔴 Implement Kelly Criterion position sizing
  - [ ] Calculate optimal bet size: f* = (bp - q) / b
  - [ ] Apply fractional Kelly (0.25x for safety)
  - [ ] Integrate with risk management
- [ ] 🟡 Implement backtester
- [ ] 🟡 Implement portfolio manager

### Milestone 7.2: Earning Vectors
- [ ] 🔴 Prediction markets vector
- [ ] 🟡 On-chain yield vector
- [ ] 🟡 Domain intelligence vector
- [ ] 🟡 Autonomous products vector
- [ ] 🟡 Content generation vector
- [ ] 🟡 Agent services vector

### Milestone 7.3: Strategy Management
- [ ] 🔴 Implement strategy journal
- [ ] 🔴 Implement compound engine
- [ ] 🟡 Add performance analytics

---

## Phase 8: Psyche Layer & Memory

**Goal**: Implement 6-tier memory architecture.

### Milestone 8.1: Memory Tiers
- [ ] 🔴 Tier 1: Working Memory (in-RAM)
- [ ] 🔴 Tier 2: Episodic Memory (events)
- [ ] 🔴 Tier 3: Semantic Memory (facts + embeddings)
- [ ] 🟡 Tier 4: Procedural Memory (procedures)
- [ ] 🟡 Tier 5: Market Memory (price history)
- [ ] 🟡 Tier 6: Strategic Memory (strategy outcomes)

### Milestone 8.2: Memory Operations
- [ ] 🔴 Implement memory search
- [ ] 🟡 Implement memory compaction
- [ ] 🟡 Implement SOUL.md generator

---

## Phase 9: Financial Core

**Goal**: Implement wallet, treasury, and smart contracts.

### Milestone 9.1: Wallet & Identity
- [ ] 🔴 Implement wallet generation with ECDSA
- [ ] 🔴 Implement transaction signing
- [ ] 🔴 Implement USDC transfer (Base L2)
- [ ] 🟡 Add SIWE authentication

### Milestone 9.2: Treasury Management
- [ ] 🔴 Implement Treasury with spending limits
- [ ] 🔴 Implement reserve management ($20 minimum)
- [ ] 🟡 Add runway calculation

### Milestone 9.3: Smart Contracts
- [ ] 🔴 Implement WorkEscrow.sol with multi-oracle
- [ ] 🟡 Implement FusionPool.sol
- [ ] 🟡 Deploy to Base L2 testnet
- [ ] 🟡 Deploy to Base L2 mainnet

---


## Phase 10: Fusion Protocol

**Goal**: Implement agent-to-agent collaboration.

### Milestone 10.1: Fusion Core
- [ ] 🟡 Implement Fusion orchestrator
- [ ] 🟡 Implement trust scoring (0-100)
- [ ] 🟡 Add gradual capital contribution (10% → 50%)
- [ ] 🟡 Implement runtime behavior verification

### Milestone 10.2: Fusion Operations
- [ ] 🟡 Implement fusion request/accept
- [ ] 🟡 Implement shared Cortex coordination
- [ ] 🟡 Implement de-fusion (split)

---

## Phase 11: Heartbeat Daemon

**Goal**: Implement autonomous scheduling.

### Milestone 11.1: Heartbeat Core
- [ ] 🔴 Implement Heartbeat daemon with self-healing
- [ ] 🔴 Add watchdog pattern (auto-restart after 3 missed ticks)
- [ ] 🔴 Implement HEARTBEAT.md parser
- [ ] 🟡 Add cron-style scheduling

### Milestone 11.2: Scheduled Tasks
- [ ] 🔴 Compound trigger (daily)
- [ ] 🟡 Memory compaction (weekly)
- [ ] 🟡 Strategy review (daily)
- [ ] 🟡 Backup creation (daily)

---

## Phase 12: Channel Gateway

**Goal**: Implement multi-channel communication.

### Milestone 12.1: Gateway Core
- [ ] 🔴 Implement Channel Gateway
- [ ] 🔴 Add message routing
- [ ] 🔴 Implement GCRA rate limiter (`src/gateway/rate-limiter.ts`)
  - [ ] Token bucket with leak rate
  - [ ] Per-channel limits (Telegram: 30/min, Discord: 50/min)
  - [ ] Burst allowance configuration
  - [ ] Rate limit exceeded handling

### Milestone 12.2: Channel Adapters
- [ ] 🔴 Telegram adapter
- [ ] 🟡 Discord adapter
- [ ] 🟡 REST API adapter

### Milestone 12.3: Operator Interface
- [ ] 🔴 Implement operator notifications
- [ ] 🔴 Add veto command handling

---


## Phase 13: Constitution & Policy Engine

**Goal**: Implement immutable behavior rules.

### Milestone 13.1: Constitution
- [ ] 🔴 Implement Constitution with 5 laws
- [ ] 🔴 Add hash verification at boot
- [ ] 🟡 Create CONSTITUTION.md display copy

### Milestone 13.2: Policy Engine
- [ ] 🔴 Implement Policy Engine
- [ ] 🔴 Add pre-execution Limb checks
- [ ] 🔴 Implement law enforcement
- [ ] 🟡 Add operator veto window

---

## Phase 14: Security Model

**Goal**: Implement 7-layer defense system.

### Milestone 14.1: Security Layers
- [ ] 🔴 Layer 3: Injection Defense (8+ patterns)
- [ ] 🔴 Layer 4: Path Protection (workspace jail)
- [ ] 🔴 Layer 5: Command Safety (forbidden patterns)
- [ ] 🔴 Loop Guard (SHA256 deduplication)
  - [ ] Hash all Limb calls with SHA256
  - [ ] Detect infinite loops (same hash within 5min)
  - [ ] Auto-terminate on loop detection
  - [ ] Log loop attempts to audit chain
- [ ] 🔴 Secret Zeroization
  - [ ] Overwrite secrets in memory after use
  - [ ] Zero private keys on shutdown
  - [ ] Secure memory cleanup for sensitive data
- [ ] 🟡 SSRF protection

---

## Phase 15: Audit Chain

**Goal**: Implement tamper-evident logging.

### Milestone 15.1: Audit Core
- [ ] 🔴 Implement Audit Chain
- [ ] 🔴 Integrate Rust native Merkle hasher
- [ ] 🔴 Add append-only logging
- [ ] 🔴 Implement chain verification

### Milestone 15.2: Rust Native Module
- [ ] 🔴 Implement Merkle chain in Rust
- [ ] 🔴 Build Node.js bindings

---


## Phase 16: CLI Commands

**Goal**: Implement all CLI commands.

### Milestone 16.1: Core Commands
- [ ] 🔴 `aether init` - Quick start wizard
- [ ] 🔴 `aether setup` - Full onboarding
- [ ] 🔴 `aether run` - Start daemon
- [ ] 🔴 `aether status` - Agent status
- [ ] 🔴 `aether chat` - Interactive chat

### Milestone 16.2: Development Commands
- [ ] 🟡 `aether doctor` - Health check
- [ ] 🟡 `aether logs` - Log management
- [ ] 🟡 `aether debug` - Debug utilities
- [ ] 🟡 `aether shell` - Interactive REPL

### Milestone 16.3: Subsystem Commands
- [ ] 🟡 `aether perception` - Perception management
- [ ] 🟡 `aether alpha` - Alpha Engine management
- [ ] 🟡 `aether skill` - Skill management
- [ ] 🟡 `aether limb` - Limb management
- [ ] 🟡 `aether wallet` - Wallet operations
- [ ] 🟡 `aether memory` - Memory operations
- [ ] 🟡 `aether heartbeat` - Heartbeat management
- [ ] 🟡 `aether fusion` - Fusion operations
- [ ] 🟡 `aether audit` - Audit operations

### Milestone 16.4: Automation Commands
- [ ] 🟡 `aether hooks` - Hook management
- [ ] 🟡 `aether mcp` - MCP server management
- [ ] 🟡 `aether metrics` - Performance metrics

### Milestone 16.5: Data Commands
- [ ] 🟡 `aether export` - Data export
- [ ] 🟡 `aether backup` - Backup creation
- [ ] 🟡 `aether restore` - Restore from backup

### Milestone 16.6: TUI
- [ ] 🟡 Implement full terminal UI
- [ ] 🟡 Add interactive panels
- [ ] 🟡 Add keyboard shortcuts

---


## Phase 17: Observability & Testing

**Goal**: Implement monitoring, metrics, and comprehensive testing.

### Milestone 17.1: Observability
- [ ] 🔴 Implement structured logging (JSON format)
- [ ] 🟡 Add Prometheus metrics endpoint
- [ ] 🟡 Implement operator alerts
- [ ] 🟡 Add performance profiling

### Milestone 17.2: Testing Infrastructure
- [ ] 🔴 Set up test framework (Bun test)
- [ ] 🔴 Add unit test structure
- [ ] 🟡 Add integration test structure
- [ ] 🟡 Add E2E test structure
- [ ] 🟡 Set up CI/CD pipeline

### Milestone 17.3: Test Coverage
- [ ] 🔴 Core types and utilities (>90%)
- [ ] 🔴 State machine (>95%)
- [ ] 🔴 Cortex engine (>85%)
- [ ] 🟡 Perception mesh (>80%)
- [ ] 🟡 Limb system (>85%)
- [ ] 🟡 Alpha engine (>80%)
- [ ] 🟡 Memory system (>80%)
- [ ] 🟡 Financial core (>95%)
- [ ] 🟡 Security layers (>95%)

---

## Phase 18: Documentation & Deployment

**Goal**: Complete documentation and deployment infrastructure.

### Milestone 18.1: Documentation
- [ ] 🔴 Complete README.md with quick start
- [ ] 🟡 Write operator guide
- [ ] 🟡 Write developer guide
- [ ] 🟡 Document all CLI commands
- [ ] 🟡 Create architecture diagrams
- [ ] 🟢 Write API documentation

### Milestone 18.2: Deployment
- [ ] 🔴 Create installation script
- [ ] 🟡 Build binary distribution
- [ ] 🟡 Set up update mechanism
- [ ] 🟡 Create Docker image
- [ ] 🟢 Set up monitoring dashboard

### Milestone 18.3: Production Readiness
- [ ] 🔴 Security audit
- [ ] 🔴 Performance optimization
- [ ] 🟡 Load testing
- [ ] 🟡 Disaster recovery plan
- [ ] 🟡 Backup/restore testing

---

## Phase 19: Replication Engine

**Goal**: Implement state replication for high availability.

### Milestone 19.1: Replication Core
- [ ] 🟡 Implement replication engine (`src/replication/engine.ts`)
- [ ] 🟡 Add state snapshot mechanism
- [ ] 🟡 Implement incremental state sync
- [ ] 🟡 Add conflict resolution (last-write-wins)

### Milestone 19.2: Replication Targets
- [ ] 🟡 Local filesystem replication
- [ ] 🟡 Remote backup replication
- [ ] 🟡 Multi-region replication (optional)

---

## Phase 20: Self-Modification System

**Goal**: Enable agent to evolve its own capabilities safely.

### Milestone 20.1: Self-Modification Core
- [ ] 🟡 Implement self-modification engine (`src/self-mod/engine.ts`)
- [ ] 🟡 Add code generation for new Limbs
- [ ] 🟡 Implement safe code evaluation sandbox
- [ ] 🟡 Add rollback mechanism for failed modifications

### Milestone 20.2: Modification Policies
- [ ] 🟡 Define modification approval rules
- [ ] 🟡 Implement operator review for critical changes
- [ ] 🟡 Add modification audit logging
- [ ] 🟡 Implement gradual rollout for self-modifications

---


## Progress Tracking

### Phase Completion Status

| Phase | Status | Progress | Priority | Est. Duration |
|-------|--------|----------|----------|---------------|
| Phase 0: Foundation | ⏭️ Planned | 0% | 🔴 Critical | 1-2 weeks |
| Phase 1: Core Runtime | ⏭️ Planned | 0% | 🔴 Critical | 2-3 weeks |
| Phase 2: Perception Mesh | ⏭️ Planned | 0% | 🔴 Critical | 2-3 weeks |
| Phase 3: Limb System | ⏭️ Planned | 0% | 🔴 Critical | 2-3 weeks |
| Phase 4: Cortex Engine | ⏭️ Planned | 0% | 🔴 Critical | 3-4 weeks |
| Phase 5: Tool Genesis | ⏭️ Planned | 0% | 🟡 High | 2 weeks |
| Phase 6: Skill System | ⏭️ Planned | 0% | 🟡 High | 1-2 weeks |
| Phase 7: Alpha Engine | ⏭️ Planned | 0% | 🔴 Critical | 3-4 weeks |
| Phase 8: Psyche & Memory | ⏭️ Planned | 0% | 🔴 Critical | 2-3 weeks |
| Phase 9: Financial Core | ⏭️ Planned | 0% | 🔴 Critical | 3-4 weeks |
| Phase 10: Fusion Protocol | ⏭️ Planned | 0% | 🟡 High | 2 weeks |
| Phase 11: Heartbeat Daemon | ⏭️ Planned | 0% | 🔴 Critical | 1 week |
| Phase 12: Channel Gateway | ⏭️ Planned | 0% | 🔴 Critical | 1-2 weeks |
| Phase 13: Constitution | ⏭️ Planned | 0% | 🔴 Critical | 1 week |
| Phase 14: Security Model | ⏭️ Planned | 0% | 🔴 Critical | 2 weeks |
| Phase 15: Audit Chain | ⏭️ Planned | 0% | 🔴 Critical | 1 week |
| Phase 16: CLI Commands | ⏭️ Planned | 0% | 🟡 High | 2-3 weeks |
| Phase 17: Observability | ⏭️ Planned | 0% | 🟡 High | 1-2 weeks |
| Phase 18: Documentation | ⏭️ Planned | 0% | 🟡 High | 1-2 weeks |
| Phase 19: Replication Engine | ⏭️ Planned | 0% | 🟡 High | 1 week |
| Phase 20: Self-Modification | ⏭️ Planned | 0% | 🟡 High | 2 weeks |

**Total Estimated Duration**: 4-6 months (with 1-2 developers)

---

## Critical Path

The following phases are on the critical path and must be completed sequentially:

1. **Phase 0** → Foundation (blocks everything)
2. **Phase 1** → Core Runtime (blocks Cortex)
3. **Phase 2** → Perception Mesh (blocks Cortex)
4. **Phase 3** → Limb System (blocks Cortex)
5. **Phase 4** → Cortex Engine (blocks Alpha)
6. **Phase 7** → Alpha Engine (blocks production)
7. **Phase 8** → Psyche & Memory (blocks production)
8. **Phase 9** → Financial Core (blocks production)

**Critical Path Duration**: ~3-4 months

---

## Dependencies

```
Phase 0 (Foundation)
  ├─→ Phase 1 (Core Runtime)
  │     ├─→ Phase 2 (Perception Mesh)
  │     ├─→ Phase 3 (Limb System)
  │     │     ├─→ Phase 5 (Tool Genesis)
  │     │     └─→ Phase 6 (Skill System)
  │     ├─→ Phase 4 (Cortex Engine)
  │     │     └─→ Phase 7 (Alpha Engine)
  │     ├─→ Phase 8 (Psyche & Memory)
  │     ├─→ Phase 9 (Financial Core)
  │     │     └─→ Phase 10 (Fusion Protocol)
  │     ├─→ Phase 11 (Heartbeat Daemon)
  │     ├─→ Phase 12 (Channel Gateway)
  │     ├─→ Phase 13 (Constitution)
  │     ├─→ Phase 14 (Security Model)
  │     └─→ Phase 15 (Audit Chain)
  └─→ Phase 16 (CLI Commands)
  └─→ Phase 17 (Observability)
  └─→ Phase 18 (Documentation)
```

---

## Milestones & Releases

### v0.1.0 - MVP (Month 2)
- ✅ Foundation complete
- ✅ Core runtime operational
- ✅ Basic Cortex with 1-2 Limbs
- ✅ Simple CLI (run, status, chat)
- 🎯 **Goal**: Agent can think and execute basic tasks

### v0.2.0 - Perception (Month 3)
- ✅ Perception Mesh with 3+ feeds
- ✅ Full Limb system (8+ built-in)
- ✅ Memory system (6 tiers)
- 🎯 **Goal**: Agent sees the world continuously

### v0.3.0 - Financial Intelligence (Month 4)
- ✅ Alpha Engine operational
- ✅ 3+ earning vectors
- ✅ Financial core (wallet, treasury)
- ✅ WorkEscrow.sol deployed
- 🎯 **Goal**: Agent can earn money autonomously

### v0.4.0 - Production Ready (Month 5)
- ✅ All security layers
- ✅ Audit chain
- ✅ Full CLI suite
- ✅ Observability
- 🎯 **Goal**: Production-grade autonomous agent

### v0.5.0 - Advanced Features (Month 6)
- ✅ Tool Genesis
- ✅ Fusion Protocol
- ✅ Advanced skills
- 🎯 **Goal**: Self-extending, collaborative agent

---

## Risk Management

### High-Risk Areas

1. **LLM Reliability** (Phase 4)
   - Risk: API failures, rate limits, cost explosion
   - Mitigation: Fallback models, local inference, cost tracking

2. **Financial Security** (Phase 9)
   - Risk: Wallet compromise, transaction errors
   - Mitigation: Multi-layer security, spending limits, audit chain

3. **Tool Genesis Safety** (Phase 5)
   - Risk: Generated code vulnerabilities
   - Mitigation: Sandboxing, policy auditor, canary deployment

4. **Memory Corruption** (Phase 8)
   - Risk: Data loss, inconsistent state
   - Mitigation: Backups, integrity checks, recovery mechanisms

5. **Perception Cost** (Phase 2)
   - Risk: API cost explosion from feeds
   - Mitigation: Intelligent throttling, cost budgets, signal quality tracking

---

## Next Steps

1. **Immediate**: Set up Phase 0 (Foundation)
   - Initialize Bun project
   - Create directory structure
   - Define core types

2. **Week 1**: Complete Phase 0 + Start Phase 1
   - Database schema
   - State machine
   - Bootstrap sequence

3. **Week 2-3**: Phase 1 + Phase 3 (parallel)
   - Core runtime
   - Basic Limbs (shell, wallet, api)

4. **Week 4-5**: Phase 2 + Phase 4
   - Perception Mesh
   - Cortex Engine

5. **Month 2+**: Follow critical path to v0.1.0 MVP

---

## Notes

- This plan assumes 1-2 full-time developers
- Phases can be parallelized where dependencies allow
- Testing should be continuous, not a separate phase
- Security reviews should happen at each phase completion
- Documentation should be written alongside code

**Last Updated**: 2026-03-05

