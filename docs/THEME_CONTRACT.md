# Theme contract

A consumer applies the theme to `:root` or a subtree containing NUMU components. The library ships a neutral development theme; production consumers should override it.

```css
.company-theme {
  --numu-web-color-primary: #166534;
  --numu-web-color-primary-foreground: #ffffff;
  --numu-web-color-background: #ffffff;
  --numu-web-color-foreground: #172033;
  --numu-web-color-surface: #f6f8f7;
  --numu-web-color-surface-foreground: #172033;
  --numu-web-color-border: #d8dedb;
  --numu-web-font-sans: "Noto Sans Arabic", system-ui, sans-serif;
}
```

Theme data stored by NUMU remains outside this package. A consuming application validates its theme model and maps it to these variables.

## Modes and direction

Dark mode is another scoped token set, not component-specific conditional logic. Direction is supplied with `dir="rtl"` or `dir="ltr"`; components use logical properties. React context is not required for color or direction.

## Accessibility responsibility

Consumers must maintain WCAG 2.2 AA contrast for at least `primary/primary-foreground`, `secondary/secondary-foreground`, `accent/accent-foreground`, `background/foreground`, and `surface/surface-foreground`. The focus ring must remain visible against all surfaces.

## Stability

Removing or changing the meaning of a published token is breaking. Adding an optional token with a fallback is compatible. Default token values are development defaults, not NUMU or customer brand identity.
