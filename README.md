# NUMU Web Components

`@numu/web-components` is the shared React component library for NUMU Admin previews and independently deployed company websites. It owns presentation contracts, themes, runtime validation, and block rendering; consuming applications own persistence, APIs, authentication, routing, and publishing.

## Status

The foundation is experimental. Public block keys and schema versions are persistent contracts, but the package has not been published.

## Install

```bash
npm install @numu/web-components react react-dom
```

Import the shared stylesheet once in the consuming application:

```tsx
import "@numu/web-components/styles.css";
```

Render validated page data through the registry:

```tsx
import { renderWebBlock } from "@numu/web-components/registry";

const result = renderWebBlock({
  type: "hero.basic",
  version: 1,
  props: { title: "Build with confidence", description: "Shared, validated UI." },
});
```

See [docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md) for complete integration examples and [docs/COMPONENT_REGISTRY.md](docs/COMPONENT_REGISTRY.md) for the supported contracts.

## Development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

The Vite development catalog demonstrates two themes, both directions, and responsive layouts. The package is not published automatically.

## Principles

- Documentation and stable contracts come before components.
- CSS custom properties provide company-specific theming without source changes.
- Every page-builder block has a type, runtime schema, defaults, and registry definition.
- Server-safe output is the default; client JavaScript is introduced only when behavior needs it.
- Accessibility, RTL/LTR support, validation, and version safety are release requirements.

## License

Private project. No public license is granted.
