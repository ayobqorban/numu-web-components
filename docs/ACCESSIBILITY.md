# Accessibility

The target is WCAG 2.2 AA. Components provide semantic structure, keyboard operability, visible focus, accessible names, meaningful media alternatives, and reduced-motion behavior where motion exists.

Headings use a configurable semantic level while visual size remains a style variant. Links include text labels. Decorative images use empty `alt`; meaningful images require non-empty alternatives. Color never carries meaning alone.

Automated checks use Testing Library and axe. They complement manual keyboard, contrast, responsive zoom, screen-reader, RTL, and dark-theme review. Theme authors are responsible for accessible color pairs defined in `THEME_CONTRACT.md`.
