# Performance

- Ship ESM and type declarations with side-effect metadata limited to CSS.
- Keep React and React DOM external peer dependencies.
- Use named, tree-shakeable exports and avoid package-wide client boundaries.
- Prefer platform APIs and CSS over runtime libraries.
- Avoid eager loading of optional media and reserve image dimensions when provided.
- Review every dependency for size, SSR impact, maintenance, and license.

The initial quality gate inspects the built output and prevents accidental React bundling. A numeric bundle budget may be added after the first published baseline.
