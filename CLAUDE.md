# numo — Project Context

## What is numo?

A clean, fast, offline-capable invoice creation tool. No AI, no accounts, no subscriptions.
Pure React SPA deployed to GitHub Pages. The value proposition is a frictionless UX for
freelancers who need to produce professional invoices quickly.

**Live URL:** https://al0tak.github.io/numo/

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (with React Compiler via `babel-plugin-react-compiler`) |
| Language | TypeScript 6 (strict mode) |
| Routing | TanStack Router v1 — file-based routing |
| Data / state | TanStack Query v5 — add when first needed |
| UI components | shadcn/ui (new-york style, CSS variables) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, no config file) |
| Animations | `tw-animate-css` |
| Icons | `lucide-react` — add when first needed |
| Bundler | Vite 6 |
| Package manager | pnpm 11 |
| Testing | Vitest 3 + React Testing Library 16 |
| Linting | ESLint 9 flat config (`eslint.config.ts`), no Prettier |
| Deployment | GitHub Actions → GitHub Pages (push to `main` auto-deploys) |

---

## Design System

**Aesthetic:** Retrofuturism / space-kawaii — dark, neon-lit, slightly playful but professional.
Inspirations: Juno from Overwatch, Angels of Delusion from Zenless Zone Zero.

**Colors (oklch — defined in `src/styles/globals.css` under `@theme inline`):**

| Token | Value | Use |
|---|---|---|
| `--color-background` | `oklch(0.09 0.005 265)` | Page background (near-black) |
| `--color-foreground` | `oklch(0.97 0.005 265)` | Primary text |
| `--color-muted` | `oklch(0.55 0.010 265)` | Secondary text |
| `--color-cyan` | `oklch(0.82 0.18 196)` | Primary / interactive |
| `--color-pink` | `oklch(0.72 0.24 340)` | Accent |
| `--color-orange` | `oklch(0.75 0.20 50)` | Highlight / warning |

Glow shadow presets: `--shadow-glow-{cyan,pink,orange}`.

**Fonts (loaded via Google Fonts in `index.html`):**
- Body / UI: **Space Grotesk** — `font-sans`
- Headings / display: **Orbitron** — `font-display`

**Priority order (when making trade-offs):**
1. Performance — bundle size, render perf, Core Web Vitals
2. Accessibility — keyboard-first, WCAG AA minimum
3. Aesthetics — the neon/space-kawaii look

---

## File Structure

```
src/
├── components/ui/       # shadcn-generated components (pnpm dlx shadcn add <name>)
├── hooks/               # shared custom hooks
├── routes/
│   ├── __root.tsx       # root layout (createRootRoute)
│   └── index.tsx        # "/" route
├── styles/
│   └── globals.css      # Tailwind v4 entry + all design tokens
├── main.tsx             # React root + RouterProvider
├── routeTree.gen.ts     # AUTO-GENERATED — never edit by hand
└── vite-env.d.ts
```

---

## Key Conventions

### TypeScript
- All type-only imports must use `import type` (enforced: `@typescript-eslint/consistent-type-imports`).
- No `as any`, no `!` non-null assertions.
- Prefer `type` over `interface` unless declaration merging is needed.

### React
- Function components only.
- **React Compiler is active** — do NOT write `useMemo`/`useCallback` manually. If the compiler rejects a pattern, opt out with `'use no memo'` at the top of the function body.
- No array index keys (`react/no-array-index-key` is a warning).
- Route components must be named functions (not anonymous arrows) — required for display names.

### TanStack Router (file-based routing)
- Every route file exports `const Route = createFileRoute(...)` or `createRootRoute(...)`.
- Route files live in `src/routes/`. File path = URL path.
- `routeTree.gen.ts` is auto-generated on `pnpm dev` or `pnpm build`. **Never edit it manually.**
- Run `pnpm dev` once after adding a new route file to regenerate.
- Always use `<Link to="/path">` for internal navigation — never bare `<a href>`.

### Styling
- Use Tailwind utilities. No hand-written CSS except in `globals.css` for global tokens.
- All design tokens live in `src/styles/globals.css` under `@theme inline`.
- Use the `cn()` helper from `@/lib/utils` to merge conditional classes (add when first shadcn component is added).
- Respect `prefers-reduced-motion` — it is handled globally in `globals.css`.

### Adding shadcn Components
```bash
pnpm dlx shadcn add button
pnpm dlx shadcn add input card dialog
```
Components are generated into `src/components/ui/`. They automatically use the design tokens from `globals.css`.

When you first add a shadcn component, also add the utility dependencies it needs:
```bash
pnpm add clsx tailwind-merge
pnpm add -D @radix-ui/react-slot class-variance-authority lucide-react
```
Then create `src/lib/utils.ts`:
```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

### Adding TanStack Query
When the first data-fetching need arises:
```bash
pnpm add @tanstack/react-query
pnpm add -D @tanstack/react-query-devtools
```
Then wrap the router in `QueryClientProvider` inside `src/main.tsx`.

### Testing
- Unit tests for pure functions: `utils.test.ts` alongside `utils.ts`.
- Component tests: `Button.test.tsx` alongside `Button.tsx`.
- Use `@testing-library/user-event` for interactions (not `fireEvent`).
- Test behaviour, not implementation.
- Do NOT test `routeTree.gen.ts` or `main.tsx`.

### i18n (planned, not yet implemented)
- Mark all user-visible strings with `// i18n` comment for easy extraction later.
- Planned stack: `i18next` + `react-i18next`. Locale files in `src/locales/`.

### Accessibility
- All interactive elements must be keyboard-reachable.
- Use semantic HTML first (`<button>`, `<nav>`, `<main>`, `<article>`).
- `aria-label` required on icon-only buttons.
- `eslint-plugin-jsx-a11y` strict preset is enforced — all rules are errors.

---

## Scripts

```bash
pnpm dev            # Dev server (also regenerates routeTree.gen.ts on route changes)
pnpm build          # tsc + Vite production build
pnpm preview        # Preview production build locally
pnpm test           # Vitest in watch mode
pnpm test:run       # Vitest single run (used in CI)
pnpm test:coverage  # Coverage report in coverage/
pnpm lint           # ESLint check
pnpm lint:fix       # ESLint autofix
pnpm typecheck      # tsc --noEmit (faster than full build)
```

---

## GitHub Pages Deployment

- Every push to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`.
- The workflow runs typecheck → lint → tests → build → deploy. Free for public repos.
- **One-time setup:** GitHub repo Settings → Pages → Source: "GitHub Actions".
- `VITE_BASE` is injected as `/numo/` by the workflow. Local dev uses `/` by default.

---

## First-Run Note

`src/routeTree.gen.ts` is committed to the repo (marked as linguist-generated in `.gitattributes`). After cloning, `pnpm install` is all you need — no `pnpm dev` required before `pnpm typecheck` or `pnpm build`. The file is regenerated automatically whenever you run `pnpm dev` or `pnpm build`.
