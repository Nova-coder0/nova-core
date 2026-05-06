# NOVA Treasury Policy

NOVA V1 currently has almost all supply in the owner wallet. That is the largest trust issue. The solution is not to move tokens randomly, but to publish a clear treasury policy before any major transfer.

## Active Token

- Token: NovaToken
- Symbol: NOVA
- Chain: BNB Smart Chain
- Contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Current owner wallet: `0x73B13124271Dd38f62b1DA3297BeA735CBCDC942`

## Policy Goals

- Avoid unexplained owner-wallet transfers.
- Explain how supply will be used.
- Protect future holders from surprise supply moves.
- Make liquidity and utility funding transparent.

## Draft Allocation

| Category | Share | Purpose |
| --- | ---: | --- |
| Liquidity | 20% | PancakeSwap liquidity and future exchange liquidity |
| Ecosystem rewards | 30% | User rewards, campaigns, utility incentives |
| Treasury / operations | 20% | Hosting, tooling, audits, listings, operations |
| Development | 15% | Dashboard, bots, indexer, mini-chain research |
| Community grants | 10% | Builders, partners, integrations |
| Reserve | 5% | Emergency reserve and strategic opportunities |

## Transfer Rules

- No large transfer without public explanation.
- Any liquidity transfer must include the target pool and amount.
- Any partner allocation must include public terms.
- Any burn must include the reason and transaction hash.
- Any treasury wallet change must be announced in the repository.

## Preferred Treasury Setup

Short term:

- keep owner wallet unchanged,
- publish every planned movement before executing.

Medium term:

- move treasury control to a multisig,
- publish signer policy,
- publish vesting or lock rules for non-liquidity allocations.

## Immediate Next Step

Before adding liquidity, publish:

1. exact NOVA amount for the first pool,
2. matching BNB amount,
3. target start price,
4. LP lock or treasury-managed LP policy,
5. transaction hash after execution.

