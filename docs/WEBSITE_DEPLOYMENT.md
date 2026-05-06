# NOVA Website Deployment

NOVA uses GitHub Pages as the first public website so no paid domain is required.

## Public URL

`https://nova-coder0.github.io/nova-core/`

## Deployment

The site is deployed by `.github/workflows/pages.yml`.

The workflow:

1. installs dependencies,
2. runs the Hardhat tests,
3. builds the Vite dashboard,
4. uploads the `dist` folder as a GitHub Pages artifact,
5. deploys it to GitHub Pages.

## Why GitHub Pages

- Free HTTPS hosting.
- No domain purchase required.
- Works with the existing `Nova-coder0/nova-core` repository.
- Gives BscScan, Trust Wallet, token lists, and users a stable public project URL.

## Asset URLs

- Logo 256: `https://nova-coder0.github.io/nova-core/nova-logo.png`
- Logo 64: `https://nova-coder0.github.io/nova-core/nova-logo-64.png`
- Tokenlist: `https://nova-coder0.github.io/nova-core/nova.tokenlist.json`

## Current Limitation

GitHub Pages does not replace a verified domain forever. If NOVA grows, the next step should be a project domain that points to this same site or a production host.
