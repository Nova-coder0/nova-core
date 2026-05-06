# NOVA V1 Allocation Execution

This document turns the published tokenomics into an executable transfer plan for the active NOVA V1 token.

## Active Token

- Token: NovaToken
- Symbol: NOVA
- Chain: BNB Smart Chain
- Contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Current contract owner: `0x73B13124271Dd38f62b1DA3297BeA735CBCDC942`

## Final Allocation

| Category | Share | Amount | Required target wallet |
| --- | ---: | ---: | --- |
| Liquidity | 20% | 200,000,000 NOVA | `NOVA_LIQUIDITY_WALLET` |
| Ecosystem rewards | 30% | 300,000,000 NOVA | `NOVA_ECOSYSTEM_REWARDS_WALLET` |
| Treasury / operations | 20% | 200,000,000 NOVA | `NOVA_TREASURY_OPERATIONS_WALLET` |
| Development | 15% | 150,000,000 NOVA | `NOVA_DEVELOPMENT_WALLET` |
| Community grants | 10% | 100,000,000 NOVA | `NOVA_COMMUNITY_GRANTS_WALLET` |
| Reserve | 5% | 50,000,000 NOVA | `NOVA_RESERVE_WALLET` |

## Execution Script

Dry-run:

```powershell
npm.cmd run allocate:v1
```

Execute:

```powershell
npm.cmd run allocate:v1:execute
```

The script writes a machine-readable plan to:

```text
generated/nova-v1-allocation-plan.json
```

## Safety Checks

The execution script refuses to broadcast transfers unless:

- `NOVA_OWNER_PRIVATE_KEY` or `DEPLOYER_PRIVATE_KEY` is set,
- the signer address matches the current NOVA owner,
- every target wallet is set and valid,
- the owner wallet has enough NOVA for all allocation transfers.

## Current Status

Dry-run has been generated successfully, but execution is blocked because:

- the local signer is `0x40e4afE4D891E85b47e645449554949aEfDB59c4`,
- the active NOVA owner is `0x73B13124271Dd38f62b1DA3297BeA735CBCDC942`,
- the local signer is not the current owner,
- the six category target wallets are not set yet.

## Required Before Execution

Set these variables in `.env`:

```text
NOVA_OWNER_PRIVATE_KEY=
NOVA_LIQUIDITY_WALLET=
NOVA_ECOSYSTEM_REWARDS_WALLET=
NOVA_TREASURY_OPERATIONS_WALLET=
NOVA_DEVELOPMENT_WALLET=
NOVA_COMMUNITY_GRANTS_WALLET=
NOVA_RESERVE_WALLET=
```

The owner wallet also needs enough BNB for gas.

## Recommendation

Use separate wallets for each category. For stronger trust, replace single-wallet category control with multisig wallets before moving large balances.
