import { FlatCompat } from '@eslint/eslintrc';
import config from '../index.js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...config,
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
];
