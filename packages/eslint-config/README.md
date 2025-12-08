# Lint Configuration

This project provides default linting configuration via the `eslint` package.

## How to use

- Install this package by running the following command:

```
pnpm install -D @westpac/eslint-config
```

- Follow the [Eslint Getting Started](https://eslint.org/docs/latest/use/getting-started) instructions. You may need to follow the manual instructions for config.

- You should end up with something that looks like the following (Yours may differ in some places):

```mjs
import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'src/globals.css',
      },
    },
  },
]);
```
