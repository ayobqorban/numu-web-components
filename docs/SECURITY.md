# Security

The library treats page data as untrusted.

- Never use `eval`, execute strings, or accept arbitrary component imports.
- Never render unsanitized HTML or spread unknown props onto DOM elements.
- Validate block envelopes, versions, and props before rendering.
- Restrict links and media to safe URL contracts.
- Use `rel="noreferrer noopener"` for new browsing contexts.
- Do not expose production payload details in user-facing fallbacks.

Invalid data returns a safe rendering result. Development diagnostics may include validation issues; production consumers decide how to log them. Security reports should be handled privately with repository maintainers.

## Registry credentials

- Never commit a real `.npmrc`, token, generated package archive, or environment file.
- Developers need a least-privilege classic personal access token with `read:packages` to install; publishing is performed by GitHub Actions using its ephemeral `GITHUB_TOKEN` and `packages: write` permission.
- Configure CI and deployment platforms (including Vercel) with `NODE_AUTH_TOKEN` as an encrypted secret and generate the registry configuration during the build.
- Do not print tokens, pass them as command arguments, or persist them in build artifacts or caches.
- Revoke a leaked token immediately, remove it from history, and rotate every dependent secret before rebuilding.
