# Changelog

All notable changes follow [Keep a Changelog](https://keepachangelog.com/) and Semantic Versioning.

## [Unreleased]

## [0.1.3] - 2026-09-16

### Fixed

- Keep the Manual Visual QA catalog controls and long package label within narrow 320–430px viewports.

### Added

- Publish localized editor-field metadata from every Registry definition.
- Export a serializable `manifest.json` for non-React consumers such as NUMU Backend.

### Verified

- Record Theme A/B, RTL/LTR, mobile, tablet, desktop, keyboard, zoom, contrast, and reduced-motion evidence before NUMU integration.

## [0.1.2] - 2026-09-16

### Changed

- Align the GitHub Packages scope with the repository owner by publishing as `@ayobqorban/numu-web-components`.
- Verify the published artifact in the isolated Next.js consumer from within the release workflow.

## [0.1.1] - 2026-09-16

### Fixed

- Trigger private package publication from version-tag pushes so releases can remain integrated through `develop` without requiring the workflow on the default branch.

## [0.1.0] - 2026-09-16

### Added

- Documentation-first foundation and architecture decisions.
- Semantic theme contract and default development theme.
- Versioned web-block registry with runtime validation.
- Initial primitives and four experimental website blocks.
- Development catalog, automated tests, package build, and CI quality gates.
- Private GitHub Packages release workflow and authenticated consumer guidance.
- Next.js consumer proving SSR, registry rendering, theme isolation, RTL/LTR, and React deduplication.
