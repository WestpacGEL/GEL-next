import type { Preview } from '@storybook/react';
import './global.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    story => {
      return <div data-theme="wbc">{story()}</div>;
    },
  ],
};

export default preview;
