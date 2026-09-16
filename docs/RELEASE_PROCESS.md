# Release process

Releases are private GitHub Packages releases as decided in [ADR-007](adr/ADR-007-private-github-packages.md). Public npm publishing is forbidden.

## Prepare

1. Work on a feature or release branch based on `develop`.
2. Update the package version and dated changelog entry using Semantic Versioning.
3. Keep `examples/next-consumer/package.json` pinned to the same exact package version.
4. Run `npm ci`, lint, typecheck, tests, build, `npm run test:consumer`, and `npm pack --dry-run`.
5. Review the tarball file list and scan the working tree for credentials, environment files, and generated archives.
6. Merge the reviewed changes into `develop`. Do not merge to `main` as part of the package release.

## Publish

1. Create an annotated `v<version>` tag on the verified `develop` commit and push it.
2. Create a GitHub Release for that tag.
3. The release workflow verifies that the tag and `package.json` version match, reruns all gates, packs the consumer test, and publishes to `https://npm.pkg.github.com` with the workflow-scoped `GITHUB_TOKEN`.
4. Confirm the workflow completed and that GitHub Packages lists the expected version.
5. With a separate least-privilege `read:packages` token, run `npm run test:consumer:published`.
6. Complete the manual visual checklist before declaring the version accepted.

Never reuse a version number. If publishing fails before a package version exists, correct the cause, delete only the failed release/tag if appropriate, and recreate them on the corrected commit. If the immutable package already exists, release a new patch version.

## Rollback

GitHub Packages versions are immutable release records and consumers pin exact versions. To roll back a consumer, restore its last known-good version and lockfile, then deploy normally. If a published version is unsafe, mark the GitHub Release as withdrawn, document the reason, notify consumers, and publish a corrected patch. Package deletion is a last resort because it can break reproducible builds.

## Required evidence

Record the commit, tag, release URL, workflow result, package version, tarball inventory, local consumer result, published consumer result, React dependency tree, visual-check result, and any blocker in the release report.
