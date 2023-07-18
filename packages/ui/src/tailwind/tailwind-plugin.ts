import plugin from 'tailwindcss/plugin.js';
import createThemes from 'tailwindcss-themer';

import { BREAKPOINTS } from './constants/breakpoints.js';
import { COLORS, DEFAULT_BODY_TYPOGRAPHY, FONT_TYPES, SPACING } from './constants/index.js';
import { THEMES } from './themes/index.js';
import { theme as WBCTheme } from './themes/wbc.js';
import { createFontSizes, generateFontComponents } from './utils/index.js';

/**
 * Base Plugin responsible for default theming and adding the typography components
 */
export const WestpacUIKitBasePlugin = plugin(
  // Adding the typography components
  ({ addComponents, addBase, theme }) => {
    addBase({
      html: { color: theme('colors.text.DEFAULT') },
    });
    addComponents(generateFontComponents(theme('typographySizes'), theme));
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
      typographySizes: {
        1: {
          fontSize: '3.75rem',
          lineHeight: 'tight',
        },
        2: {
          fontSize: '3.375rem',
          lineHeight: 'tight',
        },
        3: {
          fontSize: '3rem',
          lineHeight: 'tight',
        },
        4: {
          fontSize: '2.625rem',
          lineHeight: 'tight',
        },
        5: {
          fontSize: '2.25rem',
          lineHeight: 'tight',
        },
        6: {
          fontSize: '1.875rem',
          lineHeight: 'tight',
        },
        7: {
          fontSize: '1.5rem',
          lineHeight: 'tight',
        },
        8: {
          fontSize: '1.125rem',
          lineHeight: 'normal',
        },
        9: {
          fontSize: '1rem',
          lineHeight: 'normal',
        },
        10: {
          fontSize: '0.875rem',
          lineHeight: 'normal',
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
