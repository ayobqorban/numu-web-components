# Testing

The stack is Vitest, React Testing Library, jsdom, and axe. Tests live beside implementation units and in `tests/` for package-level contracts.

For every block, verify rendering, required and optional props, schema acceptance and rejection, defaults, variants, direction inheritance, accessible semantics, theme-token class usage, invalid-data handling, and successful rendering from defaults.

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:consumer
```

`test:consumer` builds and packs the exact local artifact, installs it into an isolated Next.js fixture, typechecks, validates registry fallbacks, prerenders the application, and prints the resolved React tree. It does not test against workspace source aliases.

After publishing, run `NODE_AUTH_TOKEN=<read-token> npm run test:consumer:published`. This installs the exact version from `package.json` through GitHub Packages. Tokens are environment-only and the temporary authenticated `.npmrc` is deleted after the run.

Visual review in the catalog covers two themes, light/dark as available, RTL/LTR, mobile, tablet, desktop, and wide desktop. Automated checks do not replace this review.

If the execution environment cannot launch a browser, record the limitation and complete [MANUAL_VISUAL_QA.md](MANUAL_VISUAL_QA.md) on a normal workstation before promoting the release.
