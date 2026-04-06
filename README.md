# TS_refresh

Small **TypeScript warm-up** workspace: practice strict typing, generics, async error handling, and a tiny capstone script—without shipping a real product.

## What it is for

Reload day-to-day TypeScript habits in about an hour: **interfaces vs types**, **generics**, **`async` / `try` / `catch` with `unknown`**, then combine those ideas in a **fake LLM** helper (no API keys, no network dependency for the core drill).

The structured path lives in **`docs/typescript-warmup-guide.md`** (objectives, exercises, success checks, handbook links).

## Layout

- **`src/`** — scratch and exercise files (`warmup-a.ts`, `generics.ts`, `async.ts`, `fake-llm.ts`, etc.).
- **`dist/`** — compiler output (`npm run build`). Ignored from version control if listed in `.gitignore`.

## Scripts

- **`npm run build`** — run the TypeScript compiler (`tsc`).
- **`npm run start`** — run the built capstone entry (`node dist/fake-llm.js`); run **`build`** first when sources change.

This repo is a **learning sandbox**, not a library or service.
