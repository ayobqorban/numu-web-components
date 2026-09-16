# Consumer integration

## Install

Configure GitHub Packages as described in [GITHUB_PACKAGES.md](GITHUB_PACKAGES.md), then pin the exact library version alongside a compatible React runtime:

```bash
npm install --save-exact @ayobqorban/numu-web-components@0.1.3
```

Import `@ayobqorban/numu-web-components/styles.css` exactly once from the application's global layout. Import components and common contracts from the package root; registry-only code may use `@ayobqorban/numu-web-components/registry`, and theme utilities may use `@ayobqorban/numu-web-components/theme`.

## Next.js

The package is server-safe and does not impose a client boundary. Server Components may call `renderWebBlock`; interactive consumer wrappers alone should use `"use client"`. Set `lang` and `dir` on the document, and apply each company's validated CSS custom properties on its page root.

The executable reference lives in `examples/next-consumer`. It renders Arabic RTL and English LTR sections with distinct themes, imports all public surfaces from the installed artifact, and demonstrates deterministic fallbacks for invalid, unknown, and unsupported blocks.

## Upgrade and acceptance

Follow [VERSIONING.md](VERSIONING.md). Every consumer upgrade must run typechecking, application tests, production build or SSR prerender, registry-data validation, React deduplication, and manual responsive/theme/direction review. The library repository's local and published consumer scripts provide a reusable baseline.
