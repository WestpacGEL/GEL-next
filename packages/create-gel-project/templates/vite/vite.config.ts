/// <reference types="vitest/config" />

import path from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    bail: 1,
    clearMocks: true,
    coverage: {
      enabled: true,
      exclude: ['src/main.tsx', 'src/mocks/browser.ts'],
      include: ['src/**/*'],
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      thresholds: {
        '100': true,
      },
    },
    css: false,
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.ts?(x)'],
    setupFiles: 'src/test-setup.ts',
  },
}));
