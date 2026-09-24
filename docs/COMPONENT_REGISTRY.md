# Component registry

The code registry is the machine-readable source of truth for discovery, validation, and rendering. This document is its human-readable mirror.

| Key | Version | Component | Status | Category | Since | Notes |
| --- | ---: | --- | --- | --- | --- | --- |
| `hero.basic` | 1 | `HeroBasic` | experimental | hero | 0.1.0 | Optional actions and image |
| `card.image-text` | 1 | `ImageTextCard` | experimental | card | 0.1.0 | Surface card variants |
| `content.text-image` | 1 | `TextImage` | experimental | content | 0.1.0 | Logical image position |
| `cta.basic` | 1 | `CtaBasic` | experimental | cta | 0.1.0 | One required action |

| layout.brand | 1 | LayoutBrand | experimental | layout | 0.2.0 | Header/footer brand identity |
| layout.navigation | 1 | LayoutNavigation | experimental | layout | 0.2.0 | Consumer-resolved reusable menu |
| layout.heading | 1 | LayoutHeading | experimental | layout | 0.2.0 | Compact layout text |
| layout.image | 1 | LayoutImage | experimental | layout | 0.2.0 | Linkable layout image |
| layout.icon-link | 1 | LayoutIconLink | experimental | layout | 0.2.0 | Semantic action icons |

## Public API

- `webBlockRegistry`: read-only collection of definitions.
- `getWebBlockDefinition(type, version)`: exact-version lookup.
- `validateWebBlock(input)`: envelope, lookup, and props validation.
- `renderWebBlock(input, options?)`: safe validation and rendering result.

Registry definitions contain key, version, category, status, localized labels and descriptions, schema, defaults, variants, component, and optional migration metadata. Duplicate key/version pairs fail during registry construction.

Published consumers may import these APIs from either the root entry point or the focused `/registry` entry point. The release acceptance fixture verifies both declarations and runtime behavior from the installed artifact, including invalid props, unknown keys, and unsupported versions.
