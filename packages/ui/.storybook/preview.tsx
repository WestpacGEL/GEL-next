import type { Preview } from '@storybook/react';
import { GEL } from '@westpac/core';
import brand from '@westpac/wbc';
import { generateInlineVars, getBrandVars } from '@westpac/theme';
import './global.css';
import React from 'react';

const vars = getBrandVars('wbc');
const inlineRootVars = generateInlineVars(vars);

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
      // const theme = getBrandTheme('wbc');
      return (
        <>
          <style>
            {`
              body {
                margin: 0;
                padding: 0;
              }
              * {
                box-sizing: border-box;
              }
              :root {
                ${inlineRootVars}
              }
            `}
          </style>
          <GEL brand={brand}>{story()}</GEL>
        </>
      );
    },
  ],
};

export default preview;
