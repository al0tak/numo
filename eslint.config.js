import js from "@eslint/js";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "node_modules", ".claude/worktrees"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "better-tailwindcss": betterTailwindcss,
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      "better-tailwindcss": {
        // Tailwind v4: point the plugin at the CSS entry that loads `@import "tailwindcss"`.
        entryPoint: "src/global.css",
      },
    },
    rules: {
      // Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Tailwind classnames — enable every stylistic + correctness rule from the
      // plugin's recommended config so they get auto-fixed alongside imports.
      ...betterTailwindcss.configs.recommended.rules,
    },
  },
]);
