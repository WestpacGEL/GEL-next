import { fixupPluginRules } from '@eslint/compat';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import promisePlugin from 'eslint-plugin-promise';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as espree from 'espree';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
      ecmaVersion: 9,
      sourceType: 'module',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs', '*.cjs'],
        },
        tsconfigRootDir: import.meta.dirname,
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
        },
      },
    },
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  sonarjsPlugin.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  tailwindcssPlugin.configs['flat/recommended'],
  {
    plugins: {
      promise: fixupPluginRules(promisePlugin),
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
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
      'sonarjs/todo-tag': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      'no-console': 'error',
      'sonarjs/prefer-read-only-props': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      parser: espree, // Use plain JS parser
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: Object.fromEntries(Object.keys(tseslint.plugin.rules).map(rule => [`@typescript-eslint/${rule}`, 'off'])),
  },
  { ignores: ['node_modules/*', 'dist/*'] },
);
