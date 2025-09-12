/* eslint-disable @typescript-eslint/unbound-method */
import plugin from 'tailwindcss/plugin.js';
import createThemes from 'tailwindcss-themer';
import { ThemeConfig } from 'tailwindcss-themer/lib/utils/optionsUtils.js';

import { BREAKPOINTS } from './constants/breakpoints.js';
import { COLORS, DEFAULT_BODY_TYPOGRAPHY, FONT_TYPES, SPACING } from './constants/index.js';
import { THEMES } from './themes/index.js';
import { theme as WBCTheme } from './themes/wbc.js';
import { BrandKey } from './types/brand.types.js';
import { type PluginOptions } from './types/tailwind.types.js';
import { generateDatePicker } from './utils/generate-date-picker-component.js';
import { generateLinearLoader } from './utils/generate-linear-loader.js';
import {
  createBrandFonts,
  createFontSizes,
  generateFontComponents,
  generateFormControlComponents,
} from './utils/index.js';

/**
 * Base Plugin responsible for default theming and adding the typography components
 */
export const WestpacUIKitBasePlugin = plugin.withOptions(
  function (options: PluginOptions = {}) {
    return ({ addComponents, addUtilities, addVariant, addBase, theme }) => {
      /**
       * Base
       */
      addBase({
        html: { color: theme('colors.text.DEFAULT') }, // DONE
        '@starting-style': {
          // IS THIS EVEN BEING APPLIED?
          '.popover:popover-open': {
            opacity: '0',
            transform: 'scaleX(0) scaleY(0)',
          },
        },
      });

      if (options?.brandFonts?.src) {
        const fonts = createBrandFonts({
          src: options.brandFonts.src,
          brand: options.brandFonts?.brands,
          display: options.brandFonts?.display,
        });
        fonts.forEach(font => addBase(font));
      }
      /**
       * Utilities
       */
      addUtilities(
        // DONE
        {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
          '.focus-outline': { [`@apply ${theme('focusOutline')}`]: {} },
          // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
          '.background-transition': { [`@apply ${theme('backgroundTransition')}`]: {} },
        },
        { respectPrefix: true, respectImportant: true },
      );

      /**
       * Components
       */
      addComponents(generateLinearLoader(), { respectPrefix: true, respectImportant: true }); // DONE
      addComponents(generateFontComponents(theme('typographySizes'), theme), {
        respectPrefix: true,
        respectImportant: true,
      });
      // DONE
      addComponents(generateFormControlComponents(theme('formControl')), {
        respectPrefix: true,
        respectImportant: true,
      });
      addComponents(generateDatePicker(), { respectPrefix: true, respectImportant: true });

      /**
       * Variants
       */
      THEMES.forEach(({ name }) => {
        addVariant(`active-theme-${name.toLowerCase()}`, [
          `[data-theme="${name.toLowerCase()}"] &`,
          `.theme-${name.toLowerCase()} &`,
        ]);
      });
    };
  },
  function () {
    return {
      theme: {
        screens: BREAKPOINTS, // DONE
        fontFamily: {
          sans: DEFAULT_BODY_TYPOGRAPHY,
          brand: DEFAULT_BODY_TYPOGRAPHY,
        },
        gap: SPACING, // DONE
        spacing: SPACING, //DONE
        colors: COLORS, //DONE
        extend: {
          // DONE
          lineHeight: {
            tight: '1.2',
            normal: '1.4',
            // See https://stackoverflow.com/questions/19982651/why-does-bootstrap-set-the-line-height-property-to-1-428571429 for below line height reasoning
            loose: '1.428571429',
          },
          // TO DO with updated tokens
          borderRadius: {
            DEFAULT: '0.1875rem',
          },
          borderWidth: {
            5: '0.3125rem',
          },
          fontSize: createFontSizes(FONT_TYPES),
          // DONE
          keyframes: {
            waveLines: {
              '0%': {
                transform: 'translateX(-100%)',
              },
              '100%': {
                transform: 'translateX(100%)',
              },
            },
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            fadeInDown: {
              '0%': {
                opacity: '0',
                transform: 'translateY(-10vh)',
              },
              '100%': {
                opacity: '1',
                transform: 'translateY(0)',
              },
            },
            fadeInUp: {
              '0%': {
                opacity: '0',
                transform: 'translateY(10vh)',
              },
              '100%': {
                opacity: '1',
                transform: 'translateY(0)',
              },
            },
            slideUp: {
              '0%': {
                transform: 'translateY(100%)',
              },
              '100%': {
                transform: 'translateY(0)',
              },
            },
            maxHeightIn: {
              '0%': { maxHeight: '0' },
            },
          },
          animation: {
            skeleton: 'waveLines 2s infinite ease-out',
            fadeIn: 'fadeIn 0.2s ease',
            fadeInDown: 'fadeInDown 0.4s ease',
            fadeInUp: 'fadeInUp 0.4s ease',
            slideUp: 'slideUp 0.4s ease',
            maxHeightIn: 'maxHeightIn 0.4s ease',
          },
          // TODO: Confirm if this is still needed? latest switch doesnt have it?
          boxShadow: {
            switch: '0.1875rem 0 0.375rem 0 rgba(0,0,0,0.53)',
          },
          maxWidth: {
            // TODO: Check the breakpoints mapping i.e. if xsl actually maps to the new container variable we are setting
            xsl: BREAKPOINTS.xsl,
            sm: BREAKPOINTS.sm,
            md: BREAKPOINTS.md,
            lg: BREAKPOINTS.lg,
            'container-xs': '35.35rem',
            'container-xsl': '47.25rem',
            'container-sm': '60.75rem',
            'container-md': '72.75rem',
            'container-lg': '97.5rem',
          },
          transitionTimingFunction: {
            ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', // based on css ease timing function used in GEL 3.0
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
          11: {
            fontSize: '0.875rem',
            lineHeight: 'loose',
          },
        },
        // DONE
        formControl: {
          base: 'no-inner-spin-button box-border w-fit appearance-none overflow-visible rounded border bg-background-white-pale align-middle text-text-body transition placeholder:font-light placeholder:opacity-100 disabled:form-control-disabled border-border-muted-strong',
          disabled: 'cursor-not-allowed border-dashed bg-surface-muted-pale text-text-muted',
          sizes: {
            // Some of the values are not following the spacing so we needed to use static values as following
            small: 'px-[0.5625rem] pb-[0.25rem] pt-[0.1875rem] text-sm leading-[1.3rem]',
            medium: 'typography-body-9 px-2 py-[0.3125rem] leading-6',
            large: 'px-[0.9375rem] py-[0.5rem] text-base',
            xlarge: 'px-3 pb-[0.625rem] pt-[0.5625rem] text-lg leading-[1.685rem]',
          },
        },
        // TODO: Is this still used?
        button: {
          base: 'inline-flex items-center justify-center rounded leading-[1.5] transition-[background] disabled:pointer-events-none disabled:opacity-50 group-last/add-on-after:rounded-l-none group-first/add-on-before:rounded-r-none',
          look: {
            base: {
              primary:
                'border border-border-primary bg-surface-primary text-white hover:bg-surface-primary-70 active:bg-surface-active-primary',
              hero: 'border border-border-hero bg-surface-hero text-white hover:bg-surface-hero-70 active:bg-surface-active-hero',
              faint:
                'border border-border-muted bg-surface-light text-muted hover:bg-surface-white active:bg-surface-active-white',
              link: 'text-link underline',
            },
            soft: {
              primary:
                'border border-border-primary bg-surface-white text-text hover:text-white hover:bg-surface-primary-70 active:bg-surface-active-primary',
              hero: 'border border-border-hero bg-surface-hero bg-surface-white text-text hover:text-white hover:bg-surface-hero-70 active:bg-surface-active-hero',
              faint:
                'border border-border-muted bg-surface-white text-muted hover:bg-surface-light active:bg-surface-active-light',
            },
          },
        },
        focusOutline: 'outline outline-2 outline-offset-[3px] outline-focus',
        backgroundTransition: 'transition-[background] duration-300 ease-ease',
      },
    };
  },
);

/**
 * Multiple Theme plugin with all the brands variation
 */
export const WestpacUIKitThemesPlugin = ({ brands }: { brands?: BrandKey[] }) =>
  createThemes({
    defaultTheme: {
      extend: {
        colors: WBCTheme.colors,
        fontFamily: {
          brand: [WBCTheme.brandFont, ...DEFAULT_BODY_TYPOGRAPHY],
        },
      },
    },
    // themes: THEMES,
    themes: brands?.length
      ? (brands
          .map(brand => THEMES.find(({ name }) => name === brand.toUpperCase()))
          .filter(theme => theme) as ThemeConfig[])
      : THEMES,
  });
