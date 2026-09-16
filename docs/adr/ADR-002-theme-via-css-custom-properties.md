# ADR-002: Theme through semantic CSS custom properties

- Status: Accepted
- Date: 2026-09-16

## Context

The same components must support unrelated company brands, light/dark modes, and scoped previews without rebuilding the library.

## Decision

Use documented `--numu-web-*` semantic CSS custom properties. Consumers override tokens on `:root` or a subtree. A neutral default theme exists for development only.

## Alternatives

- React context carrying every visual value.
- Compile a separate stylesheet per company.
- Hardcode a NUMU palette and override component classes.

## Consequences

Themes change without source modifications or React runtime work. Consumers are responsible for safe token generation and accessible color pairs. Token meaning becomes a versioned public contract.
