import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'c8',
      enabled: true,
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
});
