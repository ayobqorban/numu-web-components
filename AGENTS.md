# Agent instructions

These instructions apply to the entire repository.

## Required reading order

Before coding, read:

1. `AGENTS.md`
2. `docs/ARCHITECTURE.md`
3. `docs/COMPONENT_STANDARDS.md`
4. `docs/DESIGN_TOKENS.md`
5. `docs/THEME_CONTRACT.md`
6. `docs/COMPONENT_SCHEMA_STANDARD.md`
7. `docs/COMPONENT_REGISTRY.md`

## Non-negotiable rules

- Read the relevant documentation before coding.
- Do not create a public block without a registry definition, runtime schema, defaults, tests, and catalog example.
- Do not hardcode company colors or couple components to NUMU Admin.
- Do not fetch NUMU APIs, read consumer environment variables, or add database/authentication logic.
- Search the registry before adding a component; do not duplicate an equivalent component.
- Do not add or mix styling systems without an accepted ADR.
- Do not silently break a public export, block key, schema, default, or behavior.
- Use CSS logical properties and verify RTL and LTR.
- Prefer server-safe components and add `"use client"` only for required interactivity.
- Update documentation and the registry with every public component change.
- Run lint, typecheck, tests, and build before commit.

## Change process

1. Confirm the change belongs to this library.
2. Update or add an ADR when changing a foundational decision.
3. Implement the smallest stable public contract.
4. Add runtime validation, tests, and catalog coverage.
5. Update documentation, changelog, and registry status.
6. Run all quality gates and inspect the diff for secrets or unrelated files.
