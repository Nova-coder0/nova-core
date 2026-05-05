# NOVA V2 Architecture

NOVA V2 is designed to remove the main trust risks found in the current V1 contract.

## Design Goals

- Fixed supply.
- No owner.
- No mint function.
- No pause function.
- No blacklist function.
- No tax or fee controls.
- No upgrade proxy.
- Public source code.
- BscScan verification.
- Simple ERC20 behavior users can understand.

## Contract

`contracts/NovaTokenV2.sol`

The contract uses OpenZeppelin:

- `ERC20`
- `ERC20Burnable`
- `ERC20Permit`

Initial supply:

`1,000,000,000 NOVA`

All supply is minted once in the constructor to the treasury address. After deployment, no additional NOVA can be minted by anyone.

## Why No Owner

The V1 contract exposes ownership and pause controls. That creates trust risk because users must believe the admin will not abuse those controls.

V2 removes owner controls entirely. This means:

- nobody can pause transfers,
- nobody can change fees,
- nobody can blacklist wallets,
- nobody can mint supply,
- nobody can upgrade the token implementation.

This is less flexible, but much stronger for credibility.

## Treasury

The treasury address receives the full initial supply at deployment. The treasury should be a public multisig, not a private single wallet.

Recommended treasury policy:

- 3-of-5 multisig at minimum,
- public signer policy,
- public allocation plan,
- vesting for non-liquidity allocations,
- liquidity-lock policy before public promotion.

## Migration From V1

If V2 is adopted, the migration should be transparent:

1. Publish V2 contract source and tests.
2. Deploy V2 to BSC testnet.
3. Verify V2 on BscScan testnet.
4. Deploy V2 to BSC mainnet.
5. Verify V2 on BscScan.
6. Publish migration rules.
7. Snapshot V1 balances if needed.
8. Distribute V2 according to the published migration/tokenomics plan.

Do not migrate silently. Every migration rule must be public before launch.

## Mini-Chain Direction

The token should not jump directly to an independent chain. The practical sequence is:

1. BSC token as settlement asset.
2. Public dashboard and indexer.
3. Utility app using NOVA credits.
4. Devnet appchain prototype.
5. Checkpoint appchain state to BSC.
6. Bridge only if there is real demand.

