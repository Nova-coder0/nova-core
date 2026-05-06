# NOVA V1 Stabilization Plan

NOVA V1 is already deployed on BNB Smart Chain. Because deployment gas has already been paid, the immediate strategy is to strengthen V1 instead of rushing into a V2 deployment.

## V1 Contract

- Contract: `0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8`
- Chain: BNB Smart Chain
- Token: NovaToken
- Symbol: NOVA

## Goal

Make the existing NOVA token easier to trust, easier to inspect, and easier to use before considering a migration.

## Priority 1: Public Trust

- Keep the Trust Wallet asset entry updated.
- Add an official logo.
- Add an official website.
- Publish docs in `nova-core`.
- Explain that V1 is the active token.
- Publish the owner wallet and treasury plan.

## Priority 2: Contract Transparency

- Try to verify the original V1 source on BscScan.
- If original source is unavailable, publish an explicit warning that V1 source is not verified.
- Keep bytecode-level risk findings public.
- Monitor owner, pause/unpause, liquidity, and large transfers.

## Priority 3: Supply Handling

The owner wallet currently controls nearly the full supply. This can be acceptable only if it is explained clearly.

Required actions:

- Publish allocation plan.
- Decide how much goes to liquidity.
- Decide how much stays in treasury.
- Decide how much is reserved for development and community.
- Avoid large unexplained transfers.

## Priority 4: Liquidity

The existing PancakeSwap pair has effectively no liquidity. Before public promotion:

- add real liquidity,
- lock liquidity or explain multisig-managed liquidity,
- publish the liquidity transaction,
- monitor pair reserves publicly.

## Priority 5: Utility Before Mini-Chain

Build useful things around V1 first:

- public NOVA dashboard,
- holder and liquidity monitor,
- Telegram/Discord NOVA bot,
- NOVA credits for small tools,
- simple website explaining the project and token.

## V2 Position

V2 remains a backup path, not the first move.

Use V2 only if:

- V1 source cannot be verified and this blocks trust,
- V1 owner/pause controls become unacceptable,
- exchanges/wallets require a cleaner contract,
- migration has a clear public plan.

## Immediate Engineering Tasks

1. Keep `scripts/analyze-v1.js` as the repeatable health check.
2. Build a public NOVA dashboard from the same data.
3. Add logo and website to Trust Wallet metadata.
4. Write a website landing page for V1.
5. Publish tokenomics and treasury policy.

