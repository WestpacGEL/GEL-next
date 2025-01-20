import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../assets/storybook'],
  async viteFinal(config) {
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
