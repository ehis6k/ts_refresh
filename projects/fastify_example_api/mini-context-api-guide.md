# Mini Context API in Node (Fastify)

**Time:** about 2-3 hours (with breaks)  
**Goal:** build a tiny "Context API" with `POST /documents` and `GET /context?query=...`, while practicing Fastify setup, JSON schema validation, typed replies, and basic OpenAPI/Swagger wiring.

This is a **guide**, not an answer sheet. Try each block first, then check hints.

---

## How to use this guide

1. Work inside this folder (`TS_refresh/`) and keep this as a small API exercise project.
2. Create files in `src/` (for example `server.ts`, `routes/documents.ts`, `types.ts`).
3. After each block, run your checks (`npm run dev`, `npm run typecheck`) before moving on.

---

## Block A - Fast setup (20-30 min)

### Objectives

- Initialize a TypeScript Node API quickly.
- Run a Fastify server in dev mode.
- Confirm strict TypeScript is on.

### Setup commands

Run these in your project root:

```bash
npm init -y
npm i fastify @fastify/swagger @fastify/swagger-ui
npm i -D typescript tsx @types/node
npx tsc --init
```

Then update `tsconfig.json` (or verify):

- `"strict": true`
- `"moduleResolution": "NodeNext"` (or keep your preferred modern setting)
- `"module": "NodeNext"` (or consistent with your runtime)
- `"target": "ES2022"` (or similar modern target)

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "tsx src/server.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

### First server checkpoint

Create `src/server.ts` with:

- a Fastify instance,
- one `GET /health` route returning `{ ok: true }`,
- `app.listen({ port: 3000 })`.

### Success criteria

- `npm run dev` starts without TypeScript errors.
- `GET /health` returns `200` with JSON.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

Use `fastify({ logger: true })` so request logs make debugging easier.

</details>

---

## Block B - Model and storage design (20-25 min)

### Objectives

- Define a typed `Document` model.
- Keep in-memory storage simple and explicit.
- Prepare for typed route replies.

### Exercise

Define a `Document` type (or interface) with:

- `id: string`
- `title: string`
- `text: string`
- `tags: string[]`

Then create in-memory storage, for example:

- `const docs = new Map<string, Document>()`, or
- `const docs: Document[] = []` plus helper lookup.

Add two response shapes:

- Success envelope (for example `{ success: true, data: ... }`)
- Error envelope (for example `{ success: false, error: string }`)

### Success criteria

- You can add/read documents in memory with type safety.
- No `any` needed for core domain shapes.

---

## Block C - `POST /documents` with JSON schema validation (35-45 min)

### Objectives

- Validate request body using Fastify schema.
- Return proper status codes (`201`, `409`, `400`).
- Type request + reply payloads.

### Exercise

Create `POST /documents` that accepts:

```json
{ "id": "doc-1", "title": "Intro", "text": "some text", "tags": ["api", "node"] }
```

Behavior:

- If `id` is new: store document and return `201`.
- If `id` already exists: return `409` with error payload.
- If body fails schema: Fastify should return a validation error (`400`).

Schema checklist:

- `type: "object"`
- `required: ["id", "title", "text", "tags"]`
- `additionalProperties: false`
- per-field types (`string`, array of strings)

Typed route checklist:

- Type body shape with a route generic.
- Type possible replies by status code (for example `201` and `409`).

### Success criteria

- Invalid body is rejected automatically by schema validation.
- Duplicate IDs return `409` consistently.
- Successful creation returns typed payload with `201`.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

Fastify route generics usually look like:
`fastify.post<{ Body: ..., Reply: ... }>(...)`  
and status reply can be sent with `return reply.code(201).send(...)`.

</details>

---

## Block D - `GET /context?query=...` simple relevance (25-35 min)

### Objectives

- Parse and validate query params.
- Return filtered "relevant docs" deterministically.
- Keep response typed and predictable.

### Exercise

Create `GET /context?query=...`:

- Query param: `query` (required string, minimum length 1).
- Simple relevance rule is enough:
  - case-insensitive match in `title`, `text`, or any `tags`.
- Return an array of matching docs (or a trimmed projection if you prefer).

Status behavior:

- `200` for valid query (even if empty results).
- validation error (`400`) when query is missing/invalid.

Optional polish:

- limit results to top N (e.g. first 5).
- include a `score` field (basic count of matches).

### Success criteria

- `GET /context?query=node` returns relevant docs.
- Query validation prevents bad input.
- Response is strongly typed.

---

## Block E - Add minimal Swagger/OpenAPI (20-30 min)

### Objectives

- Touch Fastify Swagger plugins.
- Expose API docs endpoint.
- Connect route schemas to generated docs.

### Exercise

Register:

- `@fastify/swagger`
- `@fastify/swagger-ui`

Add a minimal OpenAPI config (title/version is enough), then expose docs route such as:

- `/docs` for UI
- `/docs/json` (or generated JSON route) for raw schema

For each route, include:

- `schema.summary`
- `schema.tags`
- `schema.response` definitions

### Success criteria

- You can open docs UI in browser.
- Both routes appear with basic schema/response info.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

Register Swagger first, then Swagger UI, then routes. If routes do not show, check registration order and that each route has a `schema`.

</details>

---

## Suggested file layout

One clean option:

```text
src/
  server.ts
  types.ts
  store.ts
  routes/
    documents.ts
    context.ts
```

Keep it small. The goal is confidence with API basics, not architecture perfection.

---

## Manual test checklist (rubric)

- [ ] `POST /documents` valid payload -> `201`.
- [ ] `POST /documents` duplicate `id` -> `409`.
- [ ] `POST /documents` bad payload -> validation error (`400`).
- [ ] `GET /context?query=something` -> `200` with filtered results.
- [ ] `GET /context` (missing query) -> validation error.
- [ ] `/docs` loads and shows both endpoints.

---

## Stretch ideas (pick 1-2 only)

- Add `DELETE /documents/:id` (`204` on success, `404` if missing).
- Add pagination to `/context` (`limit`, `offset`).
- Replace in-memory storage with a JSON file for persistence between restarts.
- Write 2-3 route tests with Fastify's `inject` API.

---

## If you want Express instead

Fastify is ideal here because schema validation + typed route patterns are built-in and faster to iterate on.  
If you use Express, pair it with:

- validation library (`zod`, `joi`, or `ajv`),
- explicit response typing in handlers,
- separate OpenAPI generation tooling.

For this exact exercise, Fastify typically gets you there quicker.
