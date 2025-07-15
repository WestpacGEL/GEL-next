import sharedConfig from '../index.js';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...sharedConfig,
  eslintPluginNext.flatConfig.recommended,
  eslintPluginNext.flatConfig.coreWebVitals,
  eslintPluginReactHooks.configs['recommended-latest'],
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    ignores: ['.next/**', '**/public/**/*.js'],
  },
);
