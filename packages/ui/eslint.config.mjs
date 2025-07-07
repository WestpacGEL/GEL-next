import { fixupPluginRules } from '@eslint/compat';
import eslintConfig from '@westpac/eslint-config/nextjs/index.js';
import { defineConfig } from 'eslint/config';
import storybookPlugin from 'eslint-plugin-storybook';

const OFF = 0;

export default defineConfig([
  ...eslintConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          varsIgnorePattern: '^React$',
        },
      ],
    },
  },
  {
    rules: {
      '@next/next/no-html-link-for-pages': OFF,
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
  {
    files: ['**/*.stories.tsx', '**/*.stories.ts'],
    plugins: {
      storybook: fixupPluginRules(storybookPlugin),
    },
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  {
    files: ['**/*.spec.tsx', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/unbound-method': 'off',
      'sonarjs/no-nested-functions': 'off',
    },
  },
]);
