# NOVA Liquidity Plan

NOVA V1 is already deployed on BNB Smart Chain. The next market-structure step is not a new token deployment, but a transparent liquidity plan for the existing token.

## Important Principle

Adding liquidity does not automatically make the price go up. It creates a market where people can buy and sell. Sustainable price growth requires trust, demand, visible utility, and enough liquidity that trades do not look manipulated.

## Recommended Pair

Primary pair:

`NOVA / BNB`

Reason:

- BNB is native to BNB Smart Chain.
- PancakeSwap users understand BNB pairs.
- Gas and wallet UX are simpler.

Secondary future option:

`NOVA / USDT`

This can make pricing easier to understand, but it requires USDT liquidity and should come after the BNB pair is stable.

## Start Price Formula

The initial AMM price is created by the deposit ratio:

```text
BNB per NOVA = BNB deposited / NOVA deposited
USD per NOVA = BNB per NOVA * BNB price in USD
```

Example:

```text
10,000,000 NOVA + 1 BNB
= 0.0000001 BNB per NOVA
```

If BNB is 600 USD:

```text
0.0000001 * 600 = 0.00006 USD per NOVA
Implied FDV = 1,000,000,000 * 0.00006 = 60,000 USD
```

## Pool Depth

Pool depth should be public and realistic.

```text
Approximate pool USD depth = BNB deposited * BNB price * 2
```

Example:

```text
1 BNB at 600 USD + matching NOVA = about 1,200 USD pool depth
```

Thin pools are dangerous because small buys and sells move price too much.

## Suggested Launch Policy

Before adding public liquidity:

1. Publish tokenomics.
2. Publish owner and treasury policy.
3. Decide how many NOVA go to liquidity.
4. Decide how much BNB is paired.
5. Add liquidity in one transparent transaction.
6. Publish the transaction hash.
7. Lock LP or explain treasury-managed LP.
8. Add liquidity metrics to the dashboard.

## First Practical Scenario

Conservative example:

- `10,000,000 NOVA`
- `1 BNB`

This creates a small, honest initial pool. It is not deep enough for major promotion, but enough to establish transparent market structure.

Stronger example:

- `20,000,000 NOVA`
- `2 BNB`

Same starting price, more depth.

Higher start-price example:

- `5,000,000 NOVA`
- `1 BNB`

This doubles the initial price versus the 10M/1BNB scenario, but creates less NOVA depth.

## Rules

- Do not promise price increases.
- Do not market tiny liquidity as deep liquidity.
- Do not add liquidity before the dashboard and tokenomics are public.
- Do not move large owner-wallet supply without explanation.
- Do not burn or lock funds without documenting the reason.

