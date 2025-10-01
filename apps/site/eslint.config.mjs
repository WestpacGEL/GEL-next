import { dirname } from 'path';
import { fileURLToPath } from 'url';

import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      tailwindcss: {
        config: false,
        cssConfigPath: dirname(fileURLToPath(import.meta.url)) + '/src/app/styles/globals.css',
      },
    },
  },
]);
