# Testing

The stack is Vitest, React Testing Library, jsdom, and axe. Tests live beside implementation units and in `tests/` for package-level contracts.

For every block, verify rendering, required and optional props, schema acceptance and rejection, defaults, variants, direction inheritance, accessible semantics, theme-token class usage, invalid-data handling, and successful rendering from defaults.

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Visual review in the catalog covers two themes, light/dark as available, RTL/LTR, mobile, tablet, desktop, and wide desktop. Automated checks do not replace this review.
