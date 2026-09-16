# Design tokens

Tokens are intentionally small in V1. Components consume semantic meaning and never company-specific values.

## Color

`--numu-web-color-primary`, `--numu-web-color-primary-foreground`, `--numu-web-color-secondary`, `--numu-web-color-secondary-foreground`, `--numu-web-color-accent`, `--numu-web-color-accent-foreground`, `--numu-web-color-background`, `--numu-web-color-foreground`, `--numu-web-color-surface`, `--numu-web-color-surface-foreground`, `--numu-web-color-muted`, `--numu-web-color-muted-foreground`, `--numu-web-color-border`, `--numu-web-color-ring`, `--numu-web-color-success`, `--numu-web-color-warning`, `--numu-web-color-danger`, and `--numu-web-color-info`.

## Typography

`--numu-web-font-sans`, `--numu-web-font-heading`, sizes from `--numu-web-font-size-sm` through `--numu-web-font-size-3xl`, weights `normal`, `medium`, `semibold`, `bold`, and line heights `tight`, `normal`, `relaxed`.

## Layout and effects

Radii `sm` through `xl`, shadows `sm` through `lg`, `--numu-web-container-max`, and section spacing `sm`, `md`, `lg`.

## Rules

- Tokens contain complete CSS values and support scoped overrides.
- Color pairs are inseparable accessibility contracts.
- New tokens require usage by more than one component or a documented structural need.
- Component-specific custom properties may be added only when semantic global tokens cannot express the requirement.
- Breakpoint values are implementation details in V1, not public tokens.
