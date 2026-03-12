import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'src/app/styles/globals.css',
      },
    },
  },
]);
