# TypeScript warm-up guide

**Time:** about 60–90 minutes  
**Goal:** reload core TypeScript habits—types vs interfaces, simple generics, async error handling—then wire them together in a tiny “fake LLM” script.

This is a **guide**, not an answer sheet. Try each block before peeking at hints. Official docs are linked so you can re-read the exact rules.

---

## How to use this guide

1. Work inside this folder (`TS_Refresh/`): run `npm init -y` if you want a small project, then `npx tsc --init` and turn on `"strict": true` in `tsconfig.json` (or use the [TypeScript Playground](https://www.typescriptlang.org/play) with **strict** enabled).
2. Keep scratch files here (e.g. `warmup-a.ts`, `fake-llm.ts`) so everything for this refresh lives in one place.
3. After each block, ask yourself: *Would this still compile if I renamed a field?* That’s the bar for “I actually typed it.”

---

## Block A — Types vs interfaces (~20–25 min)

### Objectives

- Know when `interface` vs `type` is the usual team choice (and when it barely matters).
- Use `extends` with interfaces and intersections (`&`) with types at least once each.
- Hear the phrase **declaration merging** and know it applies to one of the two (look it up).

### Recall prompts (no keyboard yet)

- Name **three** differences in capability or behavior between `interface` and `type` (not “syntax looks different”—behavior).
- If two files both declare the same `interface` name, what *can* happen? What happens with two `type` aliases of the same name?

### Reading

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — skim **Interfaces** and **Type Aliases**.
- Optional deeper dive: search the Handbook for “declaration merging” and read the short explanation.

### Exercise

Model a tiny domain twice:

- **Version 1:** `User` and `Message` (or your own pair) using **`interface`**, with one type extending another where it makes sense.
- **Version 2:** the same shapes using **`type`** and intersections where needed.

Write **one sentence** in a comment: a tradeoff you noticed (ergonomics, errors, refactors—anything real).

### Success criteria

- `tsc` passes with **strict** mode.
- You can point to one place where your choice of `interface` vs `type` changed how you structured the code.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

Declaration merging is a property of <code>interface</code>, not <code>type</code>. If you never need merging, many teams default to <code>type</code> for object shapes for consistency—but both are valid when you know why you picked one.

</details>

---

## Block B — Generics in simple functions (~20–25 min)

### Objectives

- Add a type parameter to a function and watch inference work (or fail—then fix it).
- Constrain a generic with `extends` so only certain shapes are allowed.
- Avoid `any` for “I don’t care”—use generics or `unknown` plus narrowing instead.

### Recall prompts

- What does a generic **parameterize**—values, types, or both?
- Why is `identity<T>(x: T): T` more informative to the compiler than `identity(x: any): any`?

### Reading

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — sections on **Hello World of Generics**, **Generic Types**, and **Generic Constraints**.

### Exercises (build these yourself)

Implement (names can vary):

1. `identity` — returns its argument unchanged; return type should follow the argument.
2. `firstElement` — given a non-empty or possibly empty array, return the first element or `undefined` as appropriate. Get the array element type from the generic.
3. **Stretch:** a function that takes an object `T` and a key `K` where `K` extends `keyof T`, and returns `T[K]`. (If this is new, read the Handbook’s `keyof` / indexed access examples first.)

Do **not** copy-paste from the Handbook—type from memory, then compare.

### Success criteria

- Call sites infer types without redundant angle-bracket noise where possible.
- At least one function uses `extends` on a type parameter.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

For (3): the signature shape is <code>function pick&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K]</code>—implement the body in one line once the types click.

</details>

---

## Block C — Async/await + try/catch (~15–20 min)

### Objectives

- Type a function that returns `Promise<...>` explicitly when inference is unclear.
- Handle errors in `catch` without defaulting to `any`.
- Narrow `unknown` before using `e` as an `Error` or message string.

### Recall prompts

- What is the return type of an `async` function if you `return 42`?
- Why do linters often flag `catch (e: any)`?

### Reading

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how to refine `unknown`.
- [TypeScript 4.4+ note](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#defaulting-to-the-unknown-type-in-catch-variables): `catch` clause variables are `unknown` by default in strict setups—design your checks accordingly.

### Exercise

Write an async function that:

1. Awaits something that can fail (e.g. `fetch` to a URL, or a `Promise` that sometimes rejects).
2. Parses JSON and assigns it to a variable typed with a **small interface** you defined (even if the runtime might lie—that’s fine for this drill).
3. Uses `try` / `catch` / `finally`. In `catch`, narrow `unknown` before reading `.message` or stringifying.

### Success criteria

- No `any` in the catch path unless you document why it’s unavoidable.
- Successful path and error path are both type-checked.

### Hint (only after you try)

<details>
<summary>Open if stuck</summary>

Use <code>e instanceof Error</code> or a typeof / in-check pattern before touching <code>.message</code>. For JSON, consider <code>unknown</code> first, then assert or validate minimally for this exercise.

</details>

---

## Capstone — Fake “LLM” script (~25–35 min)

You combine: **named types**, **generics (optional stretch)**, and **async + try/catch**.

### Specification (you implement)

1. **Types** — Define something like `LLMMessage`, `LLMRequest`, and `LLMResponse` (names up to you). Include, at minimum:
   - messages: role + content (array).
   - optional fields such as `model`, `temperature`, or `maxTokens`.
   - response: at least a string field for assistant text and something for “usage” or `finishReason` if you want.

2. **`fakeLLM(input: LLMRequest): Promise<LLMResponse>`** — No real API. Use `setTimeout` or a short `delay(ms)` promise. Return **deterministic** fake text derived from the last user message (e.g. echo prefix) so you can visually verify behavior.

3. **`main`** — An async entry (or top-level await if your target allows it) that:
   - calls `fakeLLM` with a typed request object,
   - uses `try/catch`,
   - logs typed fields from the success response.

### Checklist (rubric)

- [ ] Compiles with `"strict": true`.
- [ ] Request and response shapes are **named types** (interface or type alias), not inline-only blobs everywhere.
- [ ] `fakeLLM` is explicitly typed to return `Promise<LLMResponse>`.
- [ ] Catch block handles `unknown` safely.

### Stretch (hints only)

- Implement `withTimeout<T>(p: Promise<T>, ms: number): Promise<T>` that rejects if `p` does not settle in time; wrap `fakeLLM(...)` with it. You will need to think about **race** between timeout and completion.

---

## Roadmap — after this session

Short pointers for the next pass (same “read + small exercise” pattern):

| Topic | Why it matters | Handbook starting point |
|--------|----------------|-------------------------|
| Utility types (`Partial`, `Pick`, `Omit`, `Record`) | Refactors and API boundaries | [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) |
| Discriminated unions | Safer branching on `kind` / `type` fields | [Narrowing — discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) |
| `satisfies` | Keeps inference while checking literal shapes | [satisfies operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) |
| Modules & `.d.ts` | How types cross file boundaries | [Modules](https://www.typescriptlang.org/docs/handbook/modules.html) |

---

## Quick time map

| Block | Minutes |
|--------|---------|
| A — Types vs interfaces | 20–25 |
| B — Generics | 20–25 |
| C — Async / try / catch | 15–20 |
| Capstone — fake LLM | 25–35 |
| **Total** | **~80–105** |

Adjust if you go deep on Handbook sections—that still counts as warm-up.
