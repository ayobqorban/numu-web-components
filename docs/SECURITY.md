# Security

The library treats page data as untrusted.

- Never use `eval`, execute strings, or accept arbitrary component imports.
- Never render unsanitized HTML or spread unknown props onto DOM elements.
- Validate block envelopes, versions, and props before rendering.
- Restrict links and media to safe URL contracts.
- Use `rel="noreferrer noopener"` for new browsing contexts.
- Do not expose production payload details in user-facing fallbacks.

Invalid data returns a safe rendering result. Development diagnostics may include validation issues; production consumers decide how to log them. Security reports should be handled privately with repository maintainers.
