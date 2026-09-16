# Component standards

## Public API

Public components must be fully typed, focused on presentation, SSR-safe where possible, and independent of consumer state, APIs, authentication, routing, and environment variables. Props use domain-neutral names such as `title`, `description`, `image`, `action`, `alignment`, and `variant`.

Each component accepts only documented variants. `className` is an escape hatch for layout integration, not a theme system. DOM props are exposed selectively rather than by spreading untrusted page JSON.

## Blocks

Every page-builder block requires:

- a persistent `category.name` key and positive integer schema version;
- TypeScript props and a strict runtime schema;
- preview-safe defaults;
- localized label and description metadata;
- a component implementation and registry definition;
- tests and a development-catalog example;
- registry and changelog documentation.

## Markup and boundaries

Use semantic HTML and preserve heading hierarchy by making heading level configurable where necessary. Use anchors for navigation and buttons for actions. Never render CMS HTML with `dangerouslySetInnerHTML`. Components do not infer locale or direction; the consumer sets `lang` and `dir`.

## Naming

- React components and types: `PascalCase`.
- Functions and props: `camelCase`.
- Block keys: `category.name`.
- Folders: `kebab-case`.
- CSS classes: local `camelCase` module names.
- Public exports: named exports only.

## Styling

Use CSS Modules for local structure and `--numu-web-*` semantic custom properties for theme decisions. Use logical properties. Do not use global selectors except the documented theme root and base catalog styles.
