import { defineConfig } from 'eslint/config';
import { fixupPluginRules } from '@eslint/compat';
import eslintConfig from '@westpac/eslint-config/nextjs/index.js';
import storybookPlugin from 'eslint-plugin-storybook';

const OFF = 0;

export default defineConfig([
  ...eslintConfig,
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
  },
]);
