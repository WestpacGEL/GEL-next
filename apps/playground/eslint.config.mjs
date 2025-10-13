import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      tailwindcss: {
        config: false,
        cssConfigPath: path.join(__dirname, 'src/app/globals.css'),
      },
    },
  },
]);
