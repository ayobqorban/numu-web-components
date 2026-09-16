# NUMU Web Components package release report

- Date: 2026-09-16
- Repository: `ayobqorban/numu-web-components`
- Published package: `@ayobqorban/numu-web-components@0.1.2`
- Release commit: `c3fbc01`
- Tag: `v0.1.2`
- GitHub Release: https://github.com/ayobqorban/numu-web-components/releases/tag/v0.1.2
- Overall status: **published and verified**

## Repository

The release integration was developed on `feature/package-release-integration`, merged into `develop`, and pushed without changing `main`. The repository remains `ayobqorban/numu-web-components`.

GitHub Packages requires an npm scope owned by the publishing GitHub account or organization. The original `@numu/web-components` scope belonged to an unrelated GitHub user, so the final package name was aligned with the repository owner: `@ayobqorban/numu-web-components`.

## Package

The package ships ESM JavaScript, TypeScript declarations, source maps, one stylesheet, README, changelog, and package metadata. React and React DOM remain external peer dependencies.

The final `npm pack --dry-run` contained 89 entries, was 158,721 bytes packed and 718,472 bytes unpacked, and contained no source examples, tests, dependency directories, environment files, credentials, or generated archives.

Public entry points:

- `@ayobqorban/numu-web-components`
- `@ayobqorban/numu-web-components/registry`
- `@ayobqorban/numu-web-components/theme`
- `@ayobqorban/numu-web-components/styles.css`

## CI

The final `develop` run [35110988630](https://github.com/ayobqorban/numu-web-components/actions/runs/35110988630) passed:

- dependency installation;
- ESLint;
- strict TypeScript;
- 8 Vitest files and 30 tests;
- Vite and declaration build;
- isolated local-tarball Next.js consumer.

The release run [35111241752](https://github.com/ayobqorban/numu-web-components/actions/runs/35111241752) passed every gate, published the package, then installed the published artifact from GitHub Packages and repeated the consumer acceptance test.

The runner reports a non-blocking deprecation annotation because `actions/checkout@v4` and `actions/setup-node@v4` target the older Actions runtime while GitHub forces Node.js 24. This did not affect the release.

## Consumer

Both the local tarball and the published private package passed the isolated Next.js 16.3.5 acceptance suite:

- strict TypeScript compilation;
- root, registry, theme, and stylesheet exports;
- valid registry rendering;
- safe invalid-props, unknown-key, and unsupported-version fallbacks;
- production static prerender/SSR-compatible build;
- Arabic RTL and English LTR page structures with isolated theme tokens;
- four public component imports;
- one deduplicated React/React DOM 19.2.4 dependency tree;
- exact installed package version validation.

The verifier now derives the package name, scope, installed path, and exact version from `package.json`, preventing future namespace drift.

## Security

No token was committed. The real `.npmrc`, environment files, generated archives, build output, and dependency directories are ignored. The committed `.npmrc.example` references only `${NODE_AUTH_TOKEN}`.

Publishing used the workflow's ephemeral `GITHUB_TOKEN` with `packages: write`. The post-publication consumer used the same short-lived token to read the newly published private package. Repository token-pattern scans found no GitHub or npm credentials.

## Release history

- `v0.1.0`: release record created before GitHub Actions could start; no package published.
- `v0.1.1`: all quality gates passed, but publishing `@numu/web-components` was rejected because the `numu` namespace is not owned by the repository owner.
- `v0.1.2`: renamed to the owner-aligned scope, published successfully, and verified from GitHub Packages.

## Remaining manual evidence

Browser automation could not initialize in the Windows sandbox, so screenshots were not captured here. The responsive, theme, direction, keyboard, zoom, contrast, and reduced-motion checks remain documented in `docs/MANUAL_VISUAL_QA.md` for execution on a normal workstation.

The package release and published-artifact acceptance are **complete**. Only the documented manual visual evidence remains.
