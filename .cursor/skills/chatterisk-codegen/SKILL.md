---
name: chatterisk-codegen
description: >-
  Chatterisk OpenAPI codegen rules: .codegen must never be committed or pushed
  to GitHub; copy the tool from the scaffold locally; Mode A for new domains,
  core-only after YAML edits. Use when running zero-codegen in this repo.
---

# Chatterisk codegen

## HARD RULE — `.codegen` must never be committed or pushed to GitHub

`.codegen/` is gitignored. Do not add, commit, or push it. The Python tool (`zero_codegen`) is copied from `zero-apps-codegen-scaffold` for local use only. After a fresh clone, copy `.codegen/` from that scaffold before running generate.

## Package scope

`@chatterisk/*`. Config: `.codegen/.zero-codegen-merged.json` (`pnpm codegen:paths`).

## Modes

- **New domain:** full multi-layer generate once, then hand-fit platform.
- **Existing domain YAML edit:** bundle → regenerate **core only** → handwrite below.

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate \
  --domain projects --config .codegen/.zero-codegen-merged.json --skip-build
```
