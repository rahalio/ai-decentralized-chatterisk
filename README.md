# Chatterisk

Volume-adjusted social-risk console for crypto projects. OpenAPI-first DDD monorepo using `@chatterisk/*` packages.

Canonical specs: `packages/openapi-core/src/{identity,projects,comments,aggregates,alerts,dossiers,external-links}.yaml`.

`.codegen/` is local-only — never commit or push it. Copy from `zero-apps-codegen-scaffold` if missing.

## Quick start

```bash
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ddd_demo_local_dev_key
pnpm --filter @chatterisk/webapp dev
```
