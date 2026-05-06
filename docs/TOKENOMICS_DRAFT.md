# NOVA Tokenomics

This is the active NOVA V1 allocation model. Execution is handled by `scripts/allocate-v1.js`.

## Supply

- Token: NovaToken
- Symbol: NOVA
- Supply: `1,000,000,000`
- Decimals: 18
- Chain: BNB Smart Chain

## Allocation

| Category | Share | Amount |
| --- | ---: | ---: |
| Liquidity | 20% | 200,000,000 NOVA |
| Ecosystem rewards | 30% | 300,000,000 NOVA |
| Treasury / operations | 20% | 200,000,000 NOVA |
| Development | 15% | 150,000,000 NOVA |
| Community grants | 10% | 100,000,000 NOVA |
| Reserve | 5% | 50,000,000 NOVA |

## Required Trust Rules

- Liquidity allocation should be paired with real BNB or stable liquidity.
- Liquidity should be locked or transparently managed by multisig.
- Development and operations allocation should vest over time.
- Treasury wallet should be public.
- Large transfers should be announced or explained.
- No hidden supply, no private mint, no admin tax.

## Execution

Use the allocation execution script:

```powershell
npm.cmd run allocate:v1
```

The script creates `generated/nova-v1-allocation-plan.json` and refuses to execute unless the signer is the current NOVA owner and every category wallet is set.

## Current Warning

The current V1 contract has almost all supply in one owner wallet and almost no liquidity. Public promotion should wait until allocation transfers, liquidity policy, and owner/source-code risk are resolved.
