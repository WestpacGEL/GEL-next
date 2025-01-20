import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPromise from 'eslint-plugin-promise';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';

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
  eslint.configs.recommended,
  sonarjs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  ...tailwind.configs['flat/recommended'],
  {
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
      // 'tailwindcss/enforces-shorthand': 'off', // TEMP
      'sonarjs/todo-tag': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      'no-console': 'error',
    },
  },
  { ignores: ['node_modules/*', 'dist/*'] },
);
