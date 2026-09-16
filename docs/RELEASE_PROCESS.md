# Release process

1. Confirm the registry, docs, tests, and changelog describe all public changes.
2. Run lint, typecheck, tests, and build from a clean checkout.
3. Review dependency licenses, package contents, and generated declarations.
4. Select the Semantic Versioning increment and create a reviewed release PR.
5. Tag only the merged, verified commit.

No publishing workflow is configured in the foundation. Public npm publishing is forbidden without explicit approval. A later ADR must select private npm or GitHub Packages, credentials, provenance, and rollback policy.
