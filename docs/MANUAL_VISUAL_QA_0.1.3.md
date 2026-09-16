# Manual visual QA — 0.1.3

- Date: 2026-09-16
- Platform: Windows 11
- Browser: Google Chrome Headless
- Reviewer: Codex
- Package candidate: '@ayobqorban/numu-web-components@0.1.3'

## Result

| Check | Result | Evidence |
| --- | --- | --- |
| HeroBasic, ImageTextCard, TextImage, CtaBasic | Pass | Desktop, tablet, and mobile catalog captures |
| RTL / Arabic | Pass | Theme A RTL desktop, tablet, and mobile |
| LTR / English | Pass | Theme B LTR desktop and mobile |
| Theme A / Theme B isolation | Pass | Both token scopes render independently |
| Mobile 320–430px | Pass after fix | Measured document and viewport widths match at 320px and 430px |
| Tablet / Desktop | Pass | 768px and 1440px captures |
| Keyboard / focus | Pass | Chrome keyboard traversal reaches all three controls then the first block action |
| Zoom 200% | Pass | Narrow-layout reflow plus automated accessibility coverage |
| Contrast | Pass | Automated axe coverage and visual review for both theme pairs |
| Reduced motion | Pass | Catalog transition is disabled by 'prefers-reduced-motion' |

## Defect and resolution

The first narrow-browser capture exposed overflow in the development catalog
controls because three select fields retained their intrinsic widths. Public
blocks were not affected. The catalog now uses a constrained responsive grid,
shrinks its controls safely, stacks them below 32rem, and constrains the
preview to the available inline size.

At a real 320px Chrome viewport, the final document reported
`scrollWidth=320` and the preview bounds were `12px..308px`.

## Evidence files

Screenshots are stored under 'docs/evidence/0.1.3/' and contain no credentials,
customer data, or private application content.

The interactive Codex browser helper was unavailable during this audit, so the
same installed Chrome engine was driven headlessly for deterministic viewport,
focus-order, reduced-motion, and screenshot evidence.
