import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { fixupPluginRules } from '@eslint/compat';
import eslintConfig from '@westpac/eslint-config/nextjs';
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
      'sonarjs/unused-import': 'warn',
    },
  },
  {
    files: ['**/*.spec.tsx', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'sonarjs/no-nested-functions': 'off',
    },
  },
  {
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'src/css/global.css',
      },
    },
  },
]);
