# Component schema standard

TypeScript types protect developers at build time; Zod schemas protect JSON received at runtime. A block definition binds both to a persistent key and schema version.

```ts
type WebBlockInput = {
  id?: string;
  type: string;
  version: number;
  props: unknown;
};
```

## Rules

- Object schemas are strict so unknown fields are rejected deliberately.
- User-visible strings have practical length limits.
- URLs allow safe relative paths and `http`/`https`; dangerous protocols are rejected.
- Images require `src` and either meaningful `alt` or `decorative: true`.
- Variants are finite enums.
- Defaults must parse successfully through their own schema.
- Schema versions are positive integers and independent of npm package versions.
- A breaking shape or behavior change creates a new schema version.

Definitions may expose `migrateProps(fromVersion, toVersion, props)` when a migration is safe. Otherwise the old version remains supported or is deprecated with a documented replacement. Migration never mutates its input.

## AI and editor use

Schemas, defaults, localized metadata, and finite variants are the structured contract used by editors and future AI page generation. Consumers must not ask AI to emit executable React or JavaScript.
