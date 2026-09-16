# ADR-005: Versioned persistent block contracts

- Status: Accepted
- Date: 2026-09-16

## Context

Stored company pages can outlive multiple package releases. Silent schema changes could make published pages invalid or change their meaning.

## Decision

Persist `{ type, version, props }`. Treat a block key as permanent and its positive integer version as the runtime schema contract. Breaking changes create a new version with continued support or an explicit migration.

## Alternatives

- Infer schema from the installed package version.
- Always mutate saved page JSON to the latest shape.
- Replace block keys whenever props change.

## Consequences

Old pages remain deterministic, while the registry may carry multiple definitions or migration code. Deprecation and removal require documentation and a major package release when public support changes.
