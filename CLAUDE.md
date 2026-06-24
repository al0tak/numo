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
```

## Stack

- React 19 + TypeScript + Vite (Rolldown) with the React Compiler Babel plugin
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- shadcn/ui (radix-mira style)
- TanStack Router (code-based)
- Framer Motion (shared layout animations)

## Self-check after every code change

After making any change to TypeScript / TSX source, run these three commands and resolve everything they report before handing back to the user:

```bash
pnpm lint:fix   # auto-fix import order, Tailwind class order, etc.
pnpm lint       # report any remaining ESLint errors / warnings
pnpm typecheck  # tsc -b — must be silent (zero output, exit 0)
```

The Tailwind plugin reads `src/global.css` as its entry point (configured via `settings["better-tailwindcss"].entryPoint`). If you add a new Tailwind entry CSS file, update that setting.
