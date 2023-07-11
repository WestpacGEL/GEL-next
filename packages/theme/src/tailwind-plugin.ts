import plugin from 'tailwindcss/plugin.js';
import createThemes from 'tailwindcss-themer';

import { BREAKPOINTS } from './constants/breakpoints.js';
import { COLORS, DEFAULT_BODY_TYPOGRAPHY, FONT_SIZES, FONT_TYPES, SPACING } from './constants/index.js';
import { THEMES } from './themes/index.js';
import { theme as WBCTheme } from './themes/wbc.js';
import { createFontSizes } from './utils/index.js';

/**
 * Base Plugin responsible for default theming and adding the typography components
 */
export const WestpacUIKitBasePlugin = plugin(
  // Adding the typography components
  ({ addComponents, addBase, theme }) => {
    addBase({
      html: { color: theme('colors.text.DEFAULT') },
    });
    const fontComponents = Object.entries(FONT_SIZES).reduce((acc, [size, value]) => {
      return {
        ...acc,
        [`.typography-body-${size}`]: {
          fontSize: theme(`fontSize.body-${size}`),
          lineHeight: theme(`lineHeight.${value.lineHeight}`),
          fontFamily: theme(`fontFamily.sans`),
        },
        [`.typography-brand-${size}`]: {
          fontSize: theme(`fontSize.brand-${size}`),
          lineHeight: theme(`lineHeight.${value.lineHeight}`),
          fontFamily: theme(`fontFamily.brand`),
        },
      };
    }, {} as Record<string, any>);
    addComponents(fontComponents);
  },
  {
    theme: {
      screens: BREAKPOINTS,
      fontFamily: {
        sans: DEFAULT_BODY_TYPOGRAPHY,
        brand: DEFAULT_BODY_TYPOGRAPHY,
      },
      gap: SPACING,
      spacing: SPACING,
      colors: COLORS,
      extend: {
        lineHeight: {
          tight: '1.2',
          normal: '1.4',
        },
        fontSize: createFontSizes(FONT_TYPES),
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.2s ease',
        },
      },
    },
  },
);

/**
 * Multiple Theme plugin with all the brands variation
 */
export const WestpacUIKitThemesPlugin = createThemes({
  defaultTheme: {
    extend: {
      colors: WBCTheme.colors,
      fontFamily: {
        brand: [WBCTheme.brandFont, ...DEFAULT_BODY_TYPOGRAPHY],
      },
    },
  },
  themes: THEMES,
});
