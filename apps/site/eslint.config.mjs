import { defineConfig } from 'eslint/config';

import js from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@westpac/eslint-config/nextjs/index.js'

const compat = new FlatCompat({
//   baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends('turbo'),
  },
  ...eslintConfig,
]);
