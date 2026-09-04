# Coding conventions

Established before any feature code is written. Every PR is expected to follow these;
CI enforces the mechanical parts (lint, typecheck, formatting) automatically.

## Language & type safety

- TypeScript strict mode everywhere (`strict: true` in `tsconfig.json`).
- No `any`. If a third-party type is genuinely unknown, use `unknown` and narrow it.
- Zero warnings policy: `eslint . --max-warnings=0` and `tsc --noEmit` must both pass
  clean. A warning is treated as a defect, not a suggestion.

## Structure

- Functional components only. No class components.
- One component per file. File name matches the component name (`ListingCard.tsx`
  exports `ListingCard`).
- `camelCase` for variables and functions, `PascalCase` for components, types, and
  interfaces, `SCREAMING_SNAKE_CASE` for true constants.
- No component or page may import `@supabase/supabase-js` or call `fetch` against
  Supabase directly. All backend access goes through `src/services/*`. This is the
  single most important rule in the codebase — it is what lets the backend change
  later without a rewrite.

## Services

- Each service owns one table cluster and exposes a small, typed public interface.
- Services return plain domain types from `src/types`, never raw Supabase row shapes.
- A service must not import another service's internals — only its public interface.

## Comments

- Comment *why*, not *what*. Code should read clearly enough that a *what* comment is
  redundant.
- Every exported function gets a one-line doc comment describing its contract
  (inputs, outputs, and any failure behavior).

## Formatting

- Prettier is the single source of truth for formatting. Never hand-format against it.
- Run `npm run format` before committing, or rely on your editor's format-on-save.

## Commits & PRs

- Small, single-purpose commits. A commit that touches unrelated files is a sign it
  should be split.
- Every PR must pass CI (lint, typecheck, test, build) before merge — no exceptions,
  no "fix in a follow-up."
