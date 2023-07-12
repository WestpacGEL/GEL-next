import westpacConfig from '@westpac/test-config/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig(westpacConfig),
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
      environment: 'jsdom',
    },
  }),
);
