// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/stories/intro.stories.tsx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
   features: {
    experimentalComponentsManifest: true,
  },
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true,
          docs: true,
        },
        experimentalFormat: 'markdown',
      },
    }
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  staticDirs: ['../assets/storybook'],

  viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        exclude: ['@duetds/date-picker/dist/loader'],
      },
      define: {
        'process.env': {},
      },
    });
  },
};

export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
