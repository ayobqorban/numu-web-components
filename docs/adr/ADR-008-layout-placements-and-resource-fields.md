# ADR-008: Layout placements and resource fields

## Decision

Blocks declare explicit page, header, or footer placements. The editor contract also supports a resource field whose value is an opaque consumer-owned identifier. The library never fetches the referenced resource; consumers resolve it and may supply runtime-only display data such as navigation items.

## Consequences

- Page editors filter the registry by placement and cannot insert layout-only blocks.
- Header and footer builders share the same versioned registry and renderer.
- Menu persistence, authorization, and lookup stay in the consuming application.
- Stored navigation blocks contain only a menu identifier and presentation settings. Published delivery snapshots may hydrate optional navigation items.
