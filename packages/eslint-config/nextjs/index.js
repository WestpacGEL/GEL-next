// eslint.config.js
// import nextCoreWebVitals from 'eslint-config-next/core-web-vitals.js';
import globals from 'globals';
import sharedConfig from '../index.js'; // adjust path if needed
import typescriptParser from '@typescript-eslint/parser';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// console.log('nextCoreWebVitals', nextCoreWebVitals);

export default [
  // Your shared config (assumes it's also in flat config format)
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
        JSX: 'readonly',
      },
    },
  },
  ...sharedConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json', './tsconfig.json'],
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json', './tsconfig.json'],
        },
      },
    },
  },
  {
    ignores: ['.next/**', '**/public/**/*.js'],
  },
  // ...compat.extends("next/core-web-vitals"),
  // ...compat.extends("next/typescript"),
  // Next.js Core Web Vitals rules
  // ...nextCoreWebVitals,
];
