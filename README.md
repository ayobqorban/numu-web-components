# NUMU Web Components

`@ayobqorban/numu-web-components` is the shared React component library for NUMU Admin previews and independently deployed company websites. It owns presentation contracts, themes, runtime validation, and block rendering; consuming applications own persistence, APIs, authentication, routing, and publishing.

## Status

The foundation is experimental. Public block keys and schema versions are persistent contracts. Releases are private and are published to GitHub Packages from signed-off GitHub Releases.

## Install

Configure the private `@ayobqorban` scope (copy `.npmrc.example`, but never commit a token), then install an exact version:

```bash
NODE_AUTH_TOKEN=<token-with-read-packages> npm install @ayobqorban/numu-web-components@0.1.3 react react-dom
```

Import the shared stylesheet once in the consuming application:

```tsx
import "@ayobqorban/numu-web-components/styles.css";
```

Render validated page data through the registry:

```tsx
import { renderWebBlock } from "@ayobqorban/numu-web-components/registry";

const result = renderWebBlock({
  type: "hero.basic",
  version: 1,
  props: { title: "Build with confidence", description: "Shared, validated UI." },
});
```

Registry consumers can build a property editor from `webBlockManifest`.
Backend consumers may read the equivalent serializable contract from
`@ayobqorban/numu-web-components/manifest.json`; neither consumer should
maintain a separate manual block catalog.

See [docs/CONSUMER_INTEGRATION.md](docs/CONSUMER_INTEGRATION.md) for authentication and version pinning, [docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md) for usage examples, and [docs/COMPONENT_REGISTRY.md](docs/COMPONENT_REGISTRY.md) for supported contracts.

## Development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:consumer
```

The Vite development catalog demonstrates two themes, both directions, and responsive layouts. Pushing a tag that matches `v<package.json version>` runs all quality gates and publishes the private package; create the corresponding GitHub Release after that workflow succeeds.

## Principles

- Documentation and stable contracts come before components.
- CSS custom properties provide company-specific theming without source changes.
- Every page-builder block has a type, runtime schema, defaults, and registry definition.
- Server-safe output is the default; client JavaScript is introduced only when behavior needs it.
- Accessibility, RTL/LTR support, validation, and version safety are release requirements.

## License

Private project. No public license is granted.
