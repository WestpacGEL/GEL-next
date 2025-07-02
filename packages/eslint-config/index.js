// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import promisePlugin from 'eslint-plugin-promise';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';
// import tsSortKeys from 'eslint-plugin-typescript-sort-keys';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  // Base JS config
  js.configs.recommended,

  // Apply Prettier and Tailwind
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 9,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/',
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: true,
        },
      ],
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          ignoredKeys: ['compoundVariants', 'defaultVariants', 'responsiveVariants', 'compoundSlots'],
        },
      ],
      'no-console': 'error',
    },
  },

  // TypeScript overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptPlugin.parser,
      parserOptions: {
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      promise: promisePlugin,
      sonarjs: sonarjsPlugin,
      // 'typescript-sort-keys': tsSortKeys,
      import: importPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      // ...tsSortKeys.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      'sonarjs/prefer-read-only-props': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.commonjs
      },
    },
  },

  compat.config({
    overrides: [{ files: 'ui/**/*.{ts,tsx}', extends: 'next/core-web-vitals' }],
  }),

  // Ignores
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
];
