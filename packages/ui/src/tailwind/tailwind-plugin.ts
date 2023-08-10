import plugin from 'tailwindcss/plugin.js';
import createThemes from 'tailwindcss-themer';

import { BREAKPOINTS } from './constants/breakpoints.js';
import { COLORS, DEFAULT_BODY_TYPOGRAPHY, FONT_TYPES, SPACING } from './constants/index.js';
import { THEMES } from './themes/index.js';
import { theme as WBCTheme } from './themes/wbc.js';
import { createFontSizes, generateFontComponents, generateFormControlComponents } from './utils/index.js';

/**
 * Base Plugin responsible for default theming and adding the typography components
 */
export const WestpacUIKitBasePlugin = plugin(
  // Adding the typography components
  ({ addComponents, addUtilities, addBase, theme }) => {
    addBase({
      html: { color: theme('colors.text.DEFAULT') },
    });
    addUtilities({
      '.focus-outline': { [`@apply ${theme('focusOutline')}`]: {} },
      '.select-caret': {
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' style='color: rgb(89,87,103);'><path fill='currentColor' d='M0 0l7 8 7-8z'/></svg>\")",
      },
    });
    addComponents(generateFontComponents(theme('typographySizes'), theme));
    addComponents(generateFormControlComponents(theme('formControl')));
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
        borderWidth: {
          5: '0.3125rem',
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
      formControl: {
        base: 'no-inner-spin-button box-border w-fit appearance-none overflow-visible rounded border bg-white align-middle text-text transition placeholder:font-light placeholder:text-text-50 placeholder:opacity-100 focus:focus-outline disabled:form-control-disabled',
        disabled: 'cursor-not-allowed border-dashed bg-background text-muted',
        sizes: {
          // Some of the values are not following the spacing so we needed to use static values as following
          small: 'px-[0.5625rem] pb-[0.25rem] pt-[0.1875rem] text-sm',
          medium: 'typography-body-9 px-2 py-[0.3125rem]',
          large: 'px-[0.9375rem] py-[0.5rem] text-base',
          xlarge: 'px-3 pb-[0.625rem] pt-[0.5625rem] text-lg',
        },
      },
      focusOutline: 'outline outline-2 outline-offset-[3px] outline-focus',
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
