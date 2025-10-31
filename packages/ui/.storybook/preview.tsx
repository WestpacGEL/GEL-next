/* eslint-disable react-hooks/rules-of-hooks */
import { clsx } from 'clsx';
import * as React from 'react';
import { useEffect } from 'react';

import type { Decorator, Preview } from '@storybook/react-vite';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import './global.css';

const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals?.theme || 'WBC';
  const isDarkMode = useDarkMode();
  // workaround for modal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelector('html')?.setAttribute('data-brand', theme.toLowerCase());
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelector('html')?.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  // Setting default background color of preview iframe body
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.add('bg-surface-mono');
    }
  }, []);
  // Note: Not using padding for grid demos as it affects the proper grid visuals i.e. breakpoints, paddings, margins etc.
  return (
    <div className={clsx(!(context.componentId === 'foundation-grid') && 'p-4 bg-surface-mono')}>
      <Story />
    </div>
  );
};

const VIEWPORTS = {
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
        // TODO: Re-enable other brands once tokens have been created
        // items: ['BOM', 'BSA', 'BTFG', 'RAMS', 'STG', 'WBC', 'WBG'],
        items: ['STG', 'WBC', 'BOM', 'BSA'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    viewport: {
      options: VIEWPORTS,
    },
    backgrounds: {
      disable: true,
    },
    darkMode: {
      current: 'light',
      stylePreview: true,
    },
  },
  decorators: [withThemeProvider],
};

export default preview;
