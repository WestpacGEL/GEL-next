import type { Preview } from '@storybook/react';
import './global.css';
import * as React from 'react';
import { clsx } from 'clsx';
import { useEffect } from 'react';

const withThemeProvider = (Story, context) => {
  const theme = context.globals?.theme || 'WBC';
  // workaround for modal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelector('html')?.setAttribute('data-theme', theme.toLowerCase());
    }
  }, [theme]);
  // Note: Not using padding for grid demos as it affects the proper grid visuals i.e. breakpoints, paddings, margins etc.
  return (
    <div className={clsx(!(context.componentId === 'foundation-grid') && 'p-4 bg-surface-white-pale')}>
      <Story />
    </div>
  );
};

const systemViewports = {
  xs: {
    name: 'XS',
    styles: {
      width: '375px',
      height: '801px',
    },
  },
  xsl: {
    name: 'XSL',
    styles: {
      width: '576px',
      height: '801px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '768px',
      height: '801px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '992px',
      height: '801px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '1200px',
      height: '801px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1900px',
      height: '801px',
    },
  },
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
        items: ['BOM', 'BSA', 'BTFG', 'RAMS', 'STG', 'WBC', 'WBG', 'WBC-LIGHT', 'WBC-DARK', 'STG-LIGHT', 'STG-DARK'],
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
    layout: 'fullscreen',
    viewport: {
      viewports: systemViewports,
    },
  },
  decorators: [withThemeProvider],
};

export default preview;
