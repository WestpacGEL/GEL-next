import westpacConfig from '@westpac/test-config/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig(westpacConfig),
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
      environment: 'jsdom',
      exclude: [
        // keep the default Vitest excludes
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        // your custom ignores
        '**/*style.ts',
        '**/*styles.ts',
      ],
    },
  }),
);
