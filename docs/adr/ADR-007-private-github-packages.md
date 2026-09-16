# ADR-007: Private GitHub Packages distribution

- Status: Accepted
- Date: 2026-09-16

## Context

NUMU Admin and independent company websites need reproducible access to the same reviewed library artifact. The repository and package are private, and the release mechanism must avoid long-lived publishing credentials while supporting exact-version consumer tests.

## Decision

Publish `@numu/web-components` privately to GitHub Packages. A GitHub Release with a tag matching `v<package.json version>` triggers a workflow that validates, tests, packs, and publishes with its ephemeral `GITHUB_TOKEN`. Consumers authenticate with least-privilege `read:packages` tokens and pin exact versions.

## Alternatives

- Publish publicly to npm.
- Operate a private npm organization or another package registry.
- Install directly from Git or copy built files into consumers.

## Consequences

Package access follows GitHub repository and package permissions, and CI/deployment environments require authenticated npm configuration. Releases are traceable to immutable tags and can be tested as installed artifacts. Consumers must manage read tokens and cannot install offline without a cache. Changing registries requires a superseding ADR and a migration plan.
