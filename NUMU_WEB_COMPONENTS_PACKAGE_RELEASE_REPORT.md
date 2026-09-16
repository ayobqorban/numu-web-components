# NUMU Web Components package release report

- Date: 2026-09-16
- Repository: `ayobqorban/numu-web-components`
- Package: `@numu/web-components@0.1.0`
- Integration branch: `feature/package-release-integration`
- Feature commit: `0cc166b`
- `develop` merge commit: `de7925a`
- Tag and private release: `v0.1.0`
- Overall status: **implemented locally; remote publication blocked**

## Repository

The release integration was developed on a feature branch, pushed, merged into `develop`, and pushed without changing `main`. Package metadata now points at the private GitHub repository. The real `.npmrc`, environment files, generated archives, build output, and dependency directories are ignored.

## Package

The package builds as ESM with external React peer dependencies and exports the root API, registry, theme helpers, stylesheet, and package metadata. A root declaration-resolution defect discovered by the consumer test was fixed by exporting the registry and theme directory indexes explicitly.

The final dry-run archive contains 89 entries, is 158,525 bytes packed and 717,894 bytes unpacked, and includes JavaScript, source maps, CSS, declarations, README, changelog, and manifest. It does not include source examples, tests, `node_modules`, environment files, tokens, or a generated archive.

## CI

Local gates passed:

- ESLint: passed.
- TypeScript: passed.
- Vitest: 8 files and 30 tests passed.
- Vite plus declaration build: passed.
- `git diff --check`: passed.

GitHub Actions is enabled and allows all actions, but the `develop` push run [35098195348](https://github.com/ayobqorban/numu-web-components/actions/runs/35098195348) ended as `startup_failure` with zero jobs. The same account-level symptom existed on all earlier runs, so no repository command or test executed remotely.

The publishing workflow now triggers on pushed `v*` tags. This is intentional: GitHub loads a `release`-event workflow from the default branch, but this delivery must remain on `develop` and must not merge into `main`.

## Consumer

The isolated Next.js 16.3.5 consumer passed from the real local tarball:

- strict TypeScript compilation;
- public root, registry, theme, and stylesheet imports;
- valid registry rendering;
- deterministic invalid-props, unknown-key, and unsupported-version fallbacks;
- production static prerender/SSR-compatible build;
- Arabic RTL and English LTR page structures with isolated theme tokens;
- four public component imports;
- one deduplicated React/React DOM 19.2.4 dependency tree.

The browser automation helper failed to initialize twice with a Windows sandbox helper error, so screenshots could not be captured in this environment. The required workstation checks are recorded in `docs/MANUAL_VISUAL_QA.md`.

## Security

No token was added to the repository. The committed `.npmrc.example` references only `${NODE_AUTH_TOKEN}`. Consumer tokens require least-privilege `read:packages`; the release job uses its ephemeral `GITHUB_TOKEN` with `packages: write`. A repository scan found no GitHub or npm token patterns.

The currently authenticated local GitHub CLI token lacks `read:packages` and `write:packages`, so it was not used as a manual publishing fallback.

## Release

The annotated `v0.1.0` tag and [private GitHub Release](https://github.com/ayobqorban/numu-web-components/releases/tag/v0.1.0) were created on `de7925a`. GitHub Packages returns `404 Package not found`, confirming that version `0.1.0` was not published.

The release attempt exposed two independent remote constraints:

1. GitHub Actions cannot start jobs for this repository/account and reports `startup_failure`.
2. The first workflow revision used a release event from `develop`; GitHub does not register that workflow until it exists on the default branch. The workflow was corrected to a tag-push trigger for the next attempt.

## Remaining acceptance work

1. Resolve the GitHub Actions account/repository startup failure (billing, spending limit, policy, or platform support must be checked by the repository owner).
2. After Actions can start, publish with a new patch version/tag such as `0.1.1`; alternatively, explicitly withdraw and recreate the unpublished `v0.1.0` release/tag under the documented failed-release procedure.
3. Verify the package in GitHub Packages and run `npm run test:consumer:published` with an environment-only `read:packages` token.
4. Complete and capture the manual visual QA checklist.

Publication and published-artifact acceptance remain **BLOCKED** until these external steps succeed.
