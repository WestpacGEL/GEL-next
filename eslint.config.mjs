const { defineConfig } = require('eslint/config');

const js = require('@eslint/js');

import eslintConfig from '@westpac/eslint-config';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  ...eslintConfig,
  {
    extends: compat.extends('turbo'),
  },
]);
