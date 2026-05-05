# NOVA V2 Testnet Deployment

This document describes the safe path for deploying `NovaTokenV2` to BSC Testnet.

## Requirements

- A dedicated deployer wallet.
- Testnet BNB on the deployer wallet.
- A treasury address that will receive the full initial supply.
- Optional BscScan API key for source verification.

Do not paste private keys into chat. Store them only in a local `.env` file or your shell environment.

## Environment

Create `.env` from `.env.example`:

```powershell
Copy-Item .env.example .env
```

Set:

```text
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
DEPLOYER_PRIVATE_KEY=0x...
NOVA_TREASURY=0x...
BSCSCAN_API_KEY=...
```

`NOVA_TREASURY` should be a public treasury or multisig address. For the first testnet deployment it can be a normal wallet, but mainnet should use multisig.

## Preflight

```powershell
npm.cmd run check:deploy -- --network bscTestnet
```

## Deploy

```powershell
npm.cmd run deploy:bsc-testnet
```

## Verify

After deployment, verify:

- token name is `NovaToken`,
- symbol is `NOVA`,
- decimals are `18`,
- total supply is `1,000,000,000`,
- treasury owns all initial supply,
- there is no owner function,
- there is no mint function,
- there is no pause function,
- there is no blacklist or tax function.

## Mainnet Rule

Do not deploy to BSC mainnet until:

- tokenomics are finalized,
- treasury is a multisig,
- liquidity plan is public,
- V2 source is reviewed,
- testnet address is verified and tested.

