import { withGEL } from '@westpac/ui/tailwind';
import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { generateFontComponents } from './src/utils/generate-font-components';

const SitePlugin = plugin(
  // Adding the typography components
  ({ addComponents, theme }) => {
    addComponents(generateFontComponents(theme('typographySizes'), theme));
  },
);

const config: Config = withGEL({
  relative: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        monospace: 'monospace',
        'gel-sans': [
          'Graphik',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        'gel-serif': ['Guardian', 'Times New Roman', 'Times', 'serif'],
      },
      gridTemplateColumns: {
        sidebar: '300px auto',
      },
      gridTemplateRows: {
        header: '64px auto',
      },
      colors: {
        'gel-primary': '#C80038',
        'gel-background': '#F3F5F6',
        'gel-border': '#CFD8DC',
        'gel-icon': '#1976D2',
        'gel-text': '#122935',
        'gel-link': '#1871C9',
        'gel-muted': '#575F65',
        'gel-hover': '#F9FAFB',
      },
      maxWidth: {
        'gel-container': '71.5rem',
      },
    },
  },
  safelist: [
    // This needed to be included because of the examples
    {
      pattern: /bg-+/, // 👈  This includes bg of all colors and shades
    },
    {
      pattern: /typography-+/,
    },
    {
      pattern: /gap-+/,
    },
    'flex',
    'h-7',
    'w-12',
    'w-22',
    'items-center',
    'justify-center',
    'italic',
    'rounded',
    'transition-colors',
    'bg-primary-20',
    'bg-success-20',
    'italic',
    'text-muted',
    'mb-[0.875rem]',
    'xsl:typography-body-8',
    'sm:typography-body-6',
    'md:typography-body-4',
    'lg:typography-body-2',
    'w-[15.625rem]',
    'w-[12rem]',
    '[&_li]:my-1',
    '[&_li]:underline',
    'ml-2',
    'text-success',
    'text-danger',
    'font-bold',
    'lg:w-7/12',
    'lg:w-2/12',
    'w-14',
    'w-6/12',
    'w-7/12',
    'w-5/12',
    'row-span-2',
    'w-5',
    'sm:w-10',
    'md:w-20',
    'lg:w-30',
    'w-auto',
  ],
  plugins: [SitePlugin],
  options: {
    brandFonts: {
      src: '/fonts',
    },
  },
});

export default config;
