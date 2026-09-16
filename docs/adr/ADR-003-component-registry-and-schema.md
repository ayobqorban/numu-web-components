# ADR-003: Central registry with runtime schemas

- Status: Accepted
- Date: 2026-09-16

## Context

Page data arrives as JSON from APIs, editors, or future AI workflows. TypeScript types disappear at runtime and cannot protect rendering.

## Decision

Register every page-builder block in one immutable registry. Bind its persistent key and schema version to a Zod props schema, typed defaults, metadata, variants, and component implementation.

## Alternatives

- Import components directly and trust API data.
- Use TypeScript types without runtime validation.
- Create a universal block with many nullable props.

## Consequences

Editors can discover and validate blocks and production rendering fails safely. Zod adds a small runtime dependency, and every public block must maintain definition metadata and schema tests.
