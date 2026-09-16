# NUMU Web Components Foundation Report

Date: 2026-09-16

## Initial audit

The target directory was empty: no Git repository, package manifest, lockfile, source, tests, documentation, CI, or existing policy. The configured global Git identity differed from the required identity. The official GitHub repository returned no remote heads, so the foundation was created as a new history without overwriting remote work.

The project now uses npm with `package-lock.json`, React 19 for development, React/React DOM peer ranges of `>=18.2.0 <20`, TypeScript 6, Vite 8, Zod 4, Vitest 4, Testing Library, jest-axe, and ESLint 10.

## Documentation foundation

Created `README.md`, `AGENTS.md`, `CHANGELOG.md`, the required architecture and standards documents under `docs/`, the component development checklist, registry and integration guides, roadmap, release/versioning policies, and six accepted ADRs.

The documentation review confirmed one styling system, one theme source of truth, a server-safe default policy, independent npm and block schema versioning, and a strict separation between presentation contracts and consumer application responsibilities.

## Architecture

The package is an independent React and TypeScript component library. Its layers are shared schemas/types, theme contract, primitives, versioned blocks, the central registry, and a development-only catalog. Consumers retain persistence, APIs, routing, authentication, page ordering, domain management, publishing, and theme storage.

Public entry points are:

- `@numu/web-components`
- `@numu/web-components/registry`
- `@numu/web-components/theme`
- `@numu/web-components/styles.css`

React and React DOM remain external peer dependencies. The library contains no package-wide client boundary and no Next.js-specific core dependency.

## Styling decision

ADR-006 selects CSS Modules for local structure plus semantic CSS custom properties for themes. Components use logical properties, mobile-first media queries, visible focus, and reduced-motion handling. Tailwind, CSS-in-JS runtimes, global component selectors, and company-specific colors were not introduced.

## Theme and design token contract

The neutral development theme implements the documented color pairs, typography sizes/weights/line heights, radii, shadows, container width, and section spacing. `numuThemeTokens` and `themeToCssVariables` provide typed integration helpers. Consumers can override tokens at `:root` or a scoped `.numu-web-theme` container for company themes and dark mode.

Theme A demonstrates a green palette with Arabic RTL content. Theme B demonstrates a blue palette with English LTR content. The catalog also exposes mobile, tablet, and desktop widths.

## Registry and runtime schemas

The immutable registry exposes `webBlockRegistry`, `getWebBlockDefinition`, `validateWebBlock`, and `renderWebBlock`. Every definition includes a persistent key, positive schema version, category, experimental status, Arabic/English metadata, strict Zod schema, validated defaults, finite variants, and component implementation.

Validation distinguishes invalid envelopes, unknown block keys, unsupported versions, and invalid props. Rendering returns an explicit validation result and a caller-owned safe fallback; it never executes page-provided code or raw HTML.

Shared link validation rejects unsafe protocols. Media requires meaningful alt text unless explicitly decorative. The definition contract reserves a pure `migrateProps` hook for future version migrations.

## Versioning

The package follows Semantic Versioning. Stored page blocks use an independent `{ type, version, props }` contract. Stable block keys are persistent. Breaking schema or behavior changes require a new block schema version, continued old-version support or a documented migration, deprecation guidance, and an appropriate package release.

## Initial primitives

- `WebContainer`
- `WebSection`
- `WebButton`
- `WebHeading`

## Initial blocks

- `hero.basic@1`
- `card.image-text@1`
- `content.text-image@1`
- `cta.basic@1`

All four are marked `experimental`. No additional page-builder blocks were added.

## Development catalog

The Vite catalog provides interactive selectors for theme, direction, and viewport. Query parameters make acceptance states reproducible, for example:

```text
/?theme=theme-a&direction=rtl&viewport=desktop
/?theme=theme-b&direction=ltr&viewport=desktop
```

Automated catalog tests verify both required acceptance states, direction/language attributes, responsive selector state, and all six rendered block examples. The Codex browser and local headless browsers could not create a visual capture under the Windows sandbox account; manual browser visual review remains recommended before the first published release.

## Tests and accessibility

Vitest completed 8 test files and 30 tests. Coverage includes each block's defaults, required data, variants, schema rejection, safe URLs, media alternatives, registry errors and fallback rendering, secure new-window links, theme mapping, RTL inheritance, catalog theme/direction switching, and successful rendering from defaults.

jest-axe reported no detectable violations in the four initial block fixtures. The baseline targets WCAG 2.2 AA; manual keyboard, screen-reader, zoom, and production-theme contrast review remain consumer/release responsibilities.

## Responsive and RTL/LTR verification

Components use CSS logical properties and do not set language or direction themselves. The catalog supplies Arabic RTL and English LTR roots. Automated tests verify inherited direction and both catalog states. Layouts are mobile-first and define adaptive grid transitions for tablet/desktop widths without fixed text heights.

## Build and package

Vite library mode produces ESM entry points, source maps, a single explicit stylesheet, and tree-shakeable named exports. TypeScript emits declarations and declaration maps. React imports remain external in built output.

The final build produced approximately 7.62 kB CSS (1.89 kB gzip) and a registry/runtime chunk of approximately 127.54 kB (31.81 kB gzip), primarily including Zod runtime validation. `npm pack --dry-run` reported no bundled dependencies and no publication was performed. `publishConfig.access` is `restricted`.

## CI and quality gates

GitHub Actions runs on pull requests and pushes to `develop` with Node 24:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run build`

Local final results:

- Lint: passed
- Typecheck: passed
- Tests: passed, 30/30
- Build: passed
- npm audit: passed, 0 vulnerabilities
- Package dry run: passed

## Known limitations

- The package and block contracts are experimental and have not been tested inside NUMU Admin or an independent production website.
- Browser screenshots were blocked by the Windows sandbox; the interactive catalog and DOM/accessibility acceptance tests are available for manual follow-up.
- Catalog/default preview images use remote Unsplash URLs and are not production content.
- No dark-theme sample, visual-regression service, numeric bundle budget, migration implementation, framework adapter, or publishing workflow is included yet.
- Zod is the only runtime dependency and accounts for most of the registry bundle.

## Deferred work

The full page builder, NUMU Web screens, backend/API, database, authentication, domains, publishing, form and navigation builders, advanced headers/footers, gallery, pricing, testimonials, FAQ, team, advanced animation, AI generation, and public npm publishing remain out of scope.

## Git handoff

- Feature branch: `feature/library-foundation`
- Target branch: `develop`
- Baseline branches: `main`, `develop`
- Documentation commit: `5a65c7d`
- Foundation implementation commit: `4c37f06`
- Tests and CI commit: `1a9cdad`
- Git username: `ayobqorban`
- Git email: `ayob.qorban@gmail.com`
- Remote repository: `https://github.com/ayobqorban/numu-web-components.git`
- Intended push status: feature, develop, and baseline main branches pushed to origin
- Intended merge status: feature merged into develop with a non-fast-forward merge
- Tests status: passed
- Build status: passed

The report commit and final `develop` merge hash cannot be embedded literally inside this file without changing the hash being described. Resolve the immutable final values with `git log --oneline --decorate --all` and `git rev-parse origin/develop`; they are also provided in the final implementation handoff.
