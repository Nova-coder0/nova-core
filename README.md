# NOVA Core

NOVA Core contains the technical foundation for NovaToken:

- V1 due diligence.
- V1 transparency dashboard.
- Liquidity planning calculator.
- No-BNB growth plan.
- V2 fixed-supply contract.
- Tokenomics draft.
- Security policy.
- Roadmap.
- Trust Wallet asset metadata.

## Current Token

- Chain: BNB Smart Chain
- V1 contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Symbol: `NOVA`

## Active Direction

NOVA V1 is the active deployed token. The first strategy is to strengthen V1 with transparency, metadata, monitoring, tokenomics, and utility before considering a V2 migration.

## V2 Direction

The current V1 token has trust issues: closed source, owner controls, centralized supply, and almost no liquidity. V2 is designed as a simpler fixed-supply token with no owner, no mint, no pause, no blacklist, and no tax controls.

V2 is now treated as a backup path, not the immediate next step.

## Development

Install dependencies:

```powershell
npm.cmd install
```

Compile:

```powershell
npm.cmd run compile
```

Test:

```powershell
npm.cmd test
```

Analyze active V1 token:

```powershell
npm.cmd run analyze:v1
```

Run the dashboard locally:

```powershell
npm.cmd run dev
```

Build the dashboard:

```powershell
npm.cmd run build
```

## Documents

- [Due diligence](docs/NOVA_DUE_DILIGENCE.md)
- [V1 stabilization plan](docs/V1_STABILIZATION_PLAN.md)
- [Liquidity plan](docs/LIQUIDITY_PLAN.md)
- [No-BNB growth plan](docs/NO_BNB_GROWTH_PLAN.md)
- [V2 architecture](docs/NOVA_V2_ARCHITECTURE.md)
- [Tokenomics draft](docs/TOKENOMICS_DRAFT.md)
- [Security policy](docs/SECURITY_POLICY.md)
- [Roadmap](docs/ROADMAP.md)
