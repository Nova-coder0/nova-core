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
- Brand logo assets.
- Treasury and grant-readiness documents.

## Current Token

- Chain: BNB Smart Chain
- V1 contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Symbol: `NOVA`
- Website: `https://nova-coder0.github.io/nova-core/`

## Public Website

The NOVA dashboard is configured for GitHub Pages, so it can run as a public HTTPS website without buying a domain.

- Site URL: `https://nova-coder0.github.io/nova-core/`
- Deploy workflow: `.github/workflows/pages.yml`
- Production base path: `/nova-core/`

## Active Direction

NOVA V1 is the active deployed token. The first strategy is to strengthen V1 with transparency, metadata, monitoring, tokenomics, and utility before considering a V2 migration.

## Brand And Wallet Listing

The token contract does not store a logo. Wallets and explorers usually read token images from off-chain metadata sources such as Trust Wallet Assets, token lists, or explorer profile submissions.

Prepared NOVA files:

- `assets/brand/nova-logo.svg`
- `public/nova-logo.png`
- `public/nova-logo-64.png`
- `public/nova.tokenlist.json`
- `blockchains/smartchain/assets/0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8/logo.png`
- `blockchains/smartchain/assets/0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8/info.json`

The dashboard also includes a MetaMask import button using `wallet_watchAsset` with the official NOVA logo URL from the public website.

Trust Wallet PR:

- `https://github.com/trustwallet/assets/pull/36579`

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
- [Website deployment](docs/WEBSITE_DEPLOYMENT.md)
- [External listing status](docs/EXTERNAL_LISTING_STATUS.md)
- [Treasury policy](docs/TREASURY_POLICY.md)
- [BNB Chain grant proposal draft](docs/BNB_CHAIN_GRANT_PROPOSAL.md)
- [BscScan profile submission package](docs/BSC_SCAN_PROFILE_SUBMISSION.md)
- [V2 architecture](docs/NOVA_V2_ARCHITECTURE.md)
- [Tokenomics draft](docs/TOKENOMICS_DRAFT.md)
- [Security policy](docs/SECURITY_POLICY.md)
- [Roadmap](docs/ROADMAP.md)
