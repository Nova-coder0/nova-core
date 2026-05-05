# NOVA Security Policy

## Scope

In scope:

- NOVA token contracts.
- Deployment scripts.
- Dashboard/indexer code once added.
- Migration scripts.
- Treasury and admin policy documentation.

Out of scope:

- Third-party wallets.
- Third-party DEX contracts.
- BNB Smart Chain consensus.

## V2 Security Principles

- No owner controls in the token contract.
- No mint after deployment.
- No pause mechanism.
- No blacklist mechanism.
- No tax or fee mechanism.
- No upgrade proxy.
- Public test suite.
- Public BscScan verification.

## Responsible Disclosure

Security issues should be reported privately before public disclosure. Until a dedicated security email exists, use the project maintainer's private GitHub contact path.

Do not exploit vulnerabilities on mainnet. Do not attempt to drain liquidity, manipulate holders, or attack third-party systems.

## Pre-Launch Checklist

- Compile contract.
- Run tests.
- Deploy to testnet.
- Verify testnet source.
- Test transfers, burns, permits, and treasury allocation.
- Review bytecode selectors.
- Publish deployment addresses.
- Publish tokenomics.
- Publish treasury/multisig address.
- Publish liquidity-lock transaction.

