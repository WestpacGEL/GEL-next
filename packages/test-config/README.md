# Test Configuration

This project provides default configuration files for `jest` and `vitest`. It is strongly recommend that you use `TypeScript` in your projects. The following instructions assumes that you are using TypeScript.

## How to use

- Install this package by running the following command:

```
pnpm install -D @westpac/test-config
```

### Jest example

- Create a `jest.config.js` file on the root folder of your project.
- Extend the configuration from `@westpac/test-config/jest`.

Example:

```
const defaultConfig = require('@westpac/test-config/jest');

const config = {
  ...defaultConfig,
};

module.exports = config;
```

From here, you can customize the rules as per your project's needs.

Example:

```
const defaultConfig = require('@westpac/test-config/jest');

const config = {
  ...defaultConfig,
  coverageThreshold: undefined,
};

module.exports = config;
```

### vitest example

- Create a `vitest.config.js` file on the root folder of your project.
- Extend the configuration from `@westpac/test-config/vitest`.

Example:

```
import westpacConfig from '@westpac/test-config/vitest';
import { defineConfig } from 'vitest/config';

export default defineConfig(westpacConfig);
```

From here, you can customize the rules as per your project's needs.

Example:

```
import westpacConfig from '@westpac/test-config/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig(westpacConfig),
  defineConfig({
    test: {
      coverage: undefined,
    },
  }),
);
```
