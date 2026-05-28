# numo

PDF invoice generation tool.

## Package manager

This project uses **pnpm**. Always use `pnpm` (not npm or yarn).

```bash
pnpm install       # install deps
pnpm dev           # dev server
pnpm build         # type-check + build
pnpm typecheck     # type-check only (tsc -b)
pnpm lint          # ESLint, report errors + warnings
pnpm lint:fix      # ESLint with --fix (sorts imports, Tailwind classes, …)
pnpm test          # Vitest, run all tests once
pnpm test:watch    # Vitest in watch mode
```

## Stack

- React 19 + TypeScript + Vite (Rolldown) with the React Compiler Babel plugin
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- shadcn/ui (radix-mira style)
- TanStack Router (code-based)
- Framer Motion (shared layout animations)

## Self-check after every code change

After making any change to TypeScript / TSX source, run these four commands and resolve everything they report before handing back to the user:

```bash
pnpm lint:fix   # auto-fix import order, Tailwind class order, etc.
pnpm lint       # report any remaining ESLint errors / warnings
pnpm typecheck  # tsc -b — must be silent (zero output, exit 0)
pnpm test       # Vitest — all tests must pass
```

Treat both errors **and warnings** as failures. The loop is:

1. Run `pnpm lint:fix` to auto-fix what the linter can fix on its own.
2. Run `pnpm lint`. If anything is reported, read the message, edit the offending file, and go back to step 1.
3. Run `pnpm typecheck`. If anything is reported, fix the types and go back to step 1 (a type fix can re-introduce a lint issue).
4. Run `pnpm test`. If anything fails, fix the code or the test and go back to step 1.
5. Only stop once all four commands are clean.

Do not silence rules with `eslint-disable` or `@ts-ignore` / `@ts-expect-error` to make the checks pass — fix the underlying issue. The only acceptable disable is one that's already justified by a comment explaining why.

## Testing

Tests run on **Vitest** with **@testing-library/react** in a **jsdom** environment.

- Test files live **adjacent** to the code they cover: `foo.ts` → `foo.test.ts`, `Foo.tsx` → `Foo.test.tsx`.
- Vitest is wired into `vite.config.ts` (the `test` block); globals (`describe`/`it`/`expect`/`vi`) are enabled, so no per-file imports of those are needed. `src/test/setup.ts` registers `@testing-library/jest-dom` matchers and cleans up the DOM after each test.
- The `better-tailwindcss` ESLint rules are turned off for `*.test.*` files, because test strings (e.g. exercising `cn`) look like Tailwind classes but aren't markup.

**Every new change must come with tests.** When you add or modify code:

- **Logic** (pure functions, calculations, type guards, reducers, data transforms, i18n dictionaries): add unit tests covering the meaningful cases, including edge cases.
- **Components** with behaviour (computed output, conditional rendering, user interaction): add a rendering / interaction test. Wrap components that consume context (e.g. `useTranslation`) in their provider, and drive interactions with `@testing-library/user-event`.

Trivial code with no real logic (pure passthrough props, static markup) does not need a dedicated test. When in doubt, add one. A change is not done until `pnpm test` passes — it is a required check alongside lint and typecheck (see the self-check loop above).

## What the linter enforces

The ESLint flat config (`eslint.config.js`) layers:

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` (flat recommended)
- `eslint-plugin-react-refresh` (Vite preset)
- `eslint-plugin-simple-import-sort` — import & export ordering (auto-fixable)
- `eslint-plugin-better-tailwindcss` recommended — Tailwind v4 class ordering, duplicate / deprecated / unknown class detection, consistent variant order, no unnecessary whitespace (mostly auto-fixable)

The Tailwind plugin reads `src/global.css` as its entry point (configured via `settings["better-tailwindcss"].entryPoint`). If you add a new Tailwind entry CSS file, update that setting.

## TypeScript

- `tsconfig.app.json` already has `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, and `erasableSyntaxOnly` on — treat any diagnostic as a real bug, not a config quirk.
- Path alias: `@/*` → `./src/*`.
