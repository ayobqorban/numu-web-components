# ADR-001: Independent shared component library

- Status: Accepted
- Date: 2026-09-16

## Context

NUMU Admin previews and independently deployed company websites need the same visual implementation without copying source code or coupling websites to admin internals.

## Decision

Maintain `@numu/web-components` as an independent React and TypeScript package. It owns presentation contracts and rendering but no storage, authentication, backend, routing, or publishing workflow.

## Alternatives

- Keep components inside NUMU Admin and copy them into websites.
- Build components separately in every website.
- Create a full CMS package containing UI and persistence.

## Consequences

UI fixes and accessibility improvements can ship once to all consumers. The package requires disciplined versioning and integration testing. Consumer applications retain control of framework and business concerns.
