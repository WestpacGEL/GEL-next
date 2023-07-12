import type { Preview } from '@storybook/react';
import './global.css';
import * as React from 'react';

const withThemeProvider = (Story, context) => {
  const theme = context.globals?.theme || 'WBC';
  return (
    <div data-theme={theme.toLowerCase()}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'WBC',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'paintbrush',
        // Array of plain string values or MenuItem shape (see below)
        items: ['BOM', 'BSA', 'BTFG', 'RAMS', 'STG', 'WBC', 'WBG'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withThemeProvider],
};

export default preview;
