# NOVA Technical Due Diligence

Date: 2026-05-06

## Contract

- Chain: BNB Smart Chain
- Token: NovaToken
- Symbol: NOVA
- Contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Type: BEP20-compatible token
- Decimals: 18
- Total supply: `1,000,000,000 NOVA`
- Owner: `0x73b13124271dd38f62b1da3297bea735cbcdc942`
- Current pause status: not paused

## External Signals

- Honeypot simulation: not a honeypot at time of check
- Buy tax: 0%
- Sell tax: 0%
- Transfer tax: 0%
- Holders: 4
- Source status: closed source / not open source
- DexScreener pairs: no indexed pair data returned
- Honeypot pair data: PancakeSwap V2 pair exists at `0x1eCc98A87EA3E28B8b8Bc72a388223db8A1444Bb`
- Pair liquidity estimate: effectively zero

## Supply Distribution

- Owner balance: about `999,999,740.872531125278412842 NOVA`
- Owner share: about `99.999974%`
- Pair NOVA reserve: about `0.001426263528979562 NOVA`
- Pair WBNB reserve: about `0.000000284852116128 WBNB`

This distribution is the biggest current trust problem. Even if the contract is not a honeypot, a market cannot form with effectively no liquidity and almost all supply controlled by one wallet.

## Bytecode-Level Function Signals

Detected public-function selectors in bytecode:

- `owner()`
- `transferOwnership(address)`
- `renounceOwnership()`
- `burn(uint256)`
- `pause()`
- `unpause()`

Not detected in the selector scan:

- `mint(address,uint256)`
- common blacklist setters
- common tax setters
- common max-wallet or max-transaction setters
- common trading-open toggles

This is not a full audit because source code is not verified. Bytecode selector checks can miss hidden behavior, modified names, assembly, or non-standard implementations.

## Critical Risks

1. Closed source contract

   Users, wallets, scanners, and exchanges cannot easily verify the implementation. This creates a high trust barrier.

2. Owner can pause/unpause

   A pausable token can be useful for emergencies, but it is a centralization risk. If ownership stays with a single wallet, buyers must trust that wallet completely.

3. Owner controls nearly all supply

   This is normal at launch only if there is a clear allocation, vesting, lock, treasury plan, and public explanation. Without that, it looks unsafe.

4. Liquidity is effectively zero

   There is no real market depth. Price data can be misleading because tiny reserves can imply absurd market caps.

5. No public product layer yet

   The token currently has metadata, but not enough visible utility: no dashboard, no docs, no protocol, no revenue/use loop, no public roadmap.

## Immediate Strategy

### Phase 0: Trust Repair

- Verify the contract source on BscScan, if possible.
- If the original source cannot be verified, treat the current contract as a prototype and plan NOVA V2.
- Publish tokenomics:
  - total supply
  - treasury wallet
  - team allocation
  - ecosystem allocation
  - liquidity allocation
  - vesting/lock schedule
- Add an official website URL to Trust Wallet metadata.
- Add `logo.png` to the Trust Wallet asset path.
- Create a public GitHub repo for NOVA docs and technical roadmap.

### Phase 1: Safety Architecture

- Move ownership to a multisig wallet.
- Add a timelock for dangerous operations if the contract remains pausable.
- Define when pause may be used.
- Publish a clear owner/admin policy.
- Lock initial liquidity if liquidity is added.
- Add monitoring for:
  - owner transfers
  - pause/unpause calls
  - liquidity changes
  - large holder transfers

### Phase 2: Product Utility

NOVA needs utility before a mini-chain makes sense. Candidate utilities:

- NOVA dashboard for holders and transparency.
- NOVA-powered API credits for small tools.
- Telegram/Discord bot access paid with NOVA.
- AI-agent or automation credits.
- Staking only if it has a real revenue or utility source.
- Governance only after there is something real to govern.

### Phase 3: Developer Infrastructure

Build these as separate modules:

- `nova-contracts`: V2 contracts, tests, deployment scripts.
- `nova-indexer`: BSC event indexer for holders, transfers, liquidity, and admin actions.
- `nova-dashboard`: public dashboard for token health and roadmap.
- `nova-docs`: tokenomics, roadmap, security policy, whitepaper.
- `nova-bot`: Telegram/Discord holder utility bot.

### Phase 4: Mini-Blockchain / Appchain

Do not start with a full blockchain. Start with a testable architecture:

1. NOVA remains the canonical BSC token.
2. Build an off-chain service/indexer that tracks NOVA balances and usage.
3. Build a local devnet prototype with a minimal EVM-compatible chain or Substrate/Cosmos-style appchain only after utility exists.
4. Bridge only when there is a strong reason.

Recommended first mini-chain concept:

- A small NOVA appchain/devnet for credits, reputation, and agent actions.
- BSC NOVA remains settlement and liquidity token.
- Appchain records cheap high-frequency actions.
- Periodic checkpoints anchor appchain state back to BSC.

## Go / No-Go Decision

Use current contract if:

- source can be verified,
- owner is moved to multisig/timelock,
- tokenomics are published,
- liquidity and supply handling are made transparent.

Prefer NOVA V2 if:

- source cannot be verified,
- current owner controls cannot be made trustworthy,
- pause behavior is not acceptable,
- we want a cleaner long-term architecture with tests and audits.

## First Engineering Backlog

1. Verify or reconstruct the current contract source.
2. Create a public NOVA technical repository.
3. Write tokenomics and security policy.
4. Build a public dashboard with contract status, owner, liquidity, holders, and admin-event monitoring.
5. Add Trust Wallet logo and website metadata.
6. Build NOVA V2 contract only if current source verification fails.
7. Add unit tests and deployment scripts for V2.
8. Add liquidity plan and lock policy before any public push.

