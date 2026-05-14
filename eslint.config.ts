import js from '@eslint/js'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist/**', 'node_modules/**', 'coverage/**', 'src/routeTree.gen.ts']),

  // Base JS + TypeScript (type-aware strict)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // React
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'react/display-name': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    },
  },

  // Accessibility
  {
    files: ['**/*.{ts,tsx}'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { 'jsx-a11y': pluginJsxA11y },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    rules: { ...pluginJsxA11y.configs.strict.rules },
  },

  // Import ordering
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { perfectionist: pluginPerfectionist },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['type', 'react', 'builtin', 'external', 'internal-type', 'internal', ['parent-type', 'sibling-type', 'index-type'], ['parent', 'sibling', 'index'], 'object', 'unknown'],
          customGroups: {
            value: { react: ['^react$', '^react-dom$', '^react/.+'] },
            type: { react: ['^react$', '^react-dom$', '^react/.+'] },
          },
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-named-imports': ['error', { type: 'natural', order: 'asc' }],
    },
  },

  // Node environment for config files
  {
    files: ['vite.config.ts', 'eslint.config.ts', 'vitest.setup.ts'],
    languageOptions: { globals: { ...globals.node } },
  },
])
