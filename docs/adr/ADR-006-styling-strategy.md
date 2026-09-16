# ADR-006: CSS Modules plus semantic custom properties

- Status: Accepted
- Date: 2026-09-16

## Context

The library needs locally scoped styles, consumer-independent builds, theming, RTL support, and minimal runtime cost.

## Decision

Use CSS Modules for component structure and semantic CSS custom properties for all theme decisions. Ship one explicit stylesheet entry point. Use mobile-first media queries and logical properties.

## Alternatives

- Depend on each consumer's Tailwind configuration and content scanning.
- Use a CSS-in-JS runtime.
- Ship global component selectors.

## Consequences

Styles are predictable, SSR-friendly, and isolated from consumer class names. Consumers must import the generated stylesheet once. A second styling system requires a superseding ADR.
