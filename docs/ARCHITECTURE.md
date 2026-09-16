# Architecture

## Purpose

`@numu/web-components` is an independent React and TypeScript library shared by NUMU Admin preview surfaces and company websites. The same implementation renders editor previews and production output.

## Ownership boundary

The library owns visual components, primitives, public prop types, runtime schemas, defaults, variants, semantic theme tokens, block definitions, rendering, contract versions, and migration hooks.

Consumers own storage, authentication, routing, data fetching, page ordering, publishing, domains, business logic, and converting stored company themes into CSS custom properties.

## Layers

1. `types` and `schemas`: reusable transport-safe contracts.
2. `theme`: semantic tokens and neutral development defaults.
3. `primitives`: reusable layout and interaction building blocks.
4. `blocks`: versioned website sections with schema, defaults, and definitions.
5. `registry`: discovery, validation, and safe rendering.
6. `catalog`: development-only visual verification.

Dependencies flow downward. Blocks may use primitives and shared types; primitives never import blocks or the registry. The registry imports definitions, not consumer code.

## Runtime flow

```text
Page JSON -> block envelope validation -> registry lookup -> version check
          -> props schema validation -> component render or safe fallback
```

Validation results are explicit. Invalid or unsupported input produces a deterministic fallback and optional development diagnostics; it must not execute arbitrary code or raw HTML.

## React and Next.js

React and React DOM are peer dependencies. Components are ordinary React components and avoid Next.js-only APIs. Links use anchors and media use standard image contracts. Adapters may be added as separate entry points later. Components are server-safe unless their behavior truly requires a client boundary.

## Public entry points

- `@numu/web-components`: components, contracts, and common utilities.
- `@numu/web-components/registry`: registry and rendering APIs.
- `@numu/web-components/theme`: theme helpers and token types.
- `@numu/web-components/styles.css`: required component and default-theme styles.

## Distribution boundary

The repository builds ESM JavaScript, declarations, and one stylesheet into `dist/`. GitHub Packages is the private package registry; consumers install a pinned version at build time and never depend on this repository's source tree. React and React DOM stay external peer dependencies, so the host supplies one shared runtime.

The `examples/next-consumer` fixture is copied to a temporary directory for acceptance testing. It installs the packed artifact (or the published artifact), compiles a strict Next.js application, prerenders its page, exercises the public registry, and checks the resolved React dependency graph.
