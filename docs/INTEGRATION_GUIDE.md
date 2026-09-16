# Integration guide

For private-registry authentication, exact version pinning, CI, and upgrade instructions, first read [CONSUMER_INTEGRATION.md](CONSUMER_INTEGRATION.md).

## NUMU Admin

Import the registry to list available blocks, use localized metadata and defaults to seed editor state, and validate every edit through the block schema. Preview with `renderWebBlock` so editor and production use the same implementation. Store `{ id, type, version, props }`; do not store React code.

## Independent website

Fetch page JSON in the website application, validate each envelope, render through the registry, and apply company CSS tokens on the page root. The website controls ordering, locale, direction, routing, data fetching, error logging, and publishing.

```tsx
import { renderWebBlock } from "@numu/web-components/registry";
import "@numu/web-components/styles.css";

export function Page({ blocks }: { blocks: unknown[] }) {
  return blocks.map((block, index) => {
    const result = renderWebBlock(block, { fallback: null });
    return <div key={result.id ?? index}>{result.node}</div>;
  });
}
```

For Next.js, import the stylesheet from a permitted global CSS entry. The core package does not require `next/link` or `next/image`; an adapter entry point can be proposed later if measurable value justifies it.

## Theme mapping

Translate validated company theme data into `--numu-web-*` variables. Do not generate arbitrary CSS from untrusted values. Set `lang` and `dir` in the consumer.
