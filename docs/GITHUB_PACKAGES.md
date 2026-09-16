# GitHub Packages

## Developer installation

Create a classic GitHub personal access token with `read:packages` and repository access. Export it as `NODE_AUTH_TOKEN`, copy `.npmrc.example` to the consumer environment, and run `npm ci`. Never put the token itself in the file.

```ini
@ayobqorban:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
always-auth=true
```

## CI and deployment

Store `NODE_AUTH_TOKEN` in the platform's encrypted secret manager. The build must create or supply equivalent npm configuration before dependency installation. Limit the token to read access for consumers. The library's release workflow needs no long-lived publish secret: it receives an ephemeral GitHub Actions token with `packages: write`.

GitHub Actions must be allowed to read the repository and write packages. Private package access must explicitly include every consuming repository or organization policy that needs it.

## Troubleshooting

- `401` usually means the token is absent, expired, or malformed.
- `403` usually means the token lacks `read:packages`, SSO authorization, repository access, or package access.
- `404` may mean the package/version does not exist or GitHub is hiding a private resource from an unauthorized identity.
- Confirm the scope is `@numu` and the registry hostname is `npm.pkg.github.com`.
