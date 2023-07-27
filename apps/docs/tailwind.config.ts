import { withGEL } from '@westpac/ui/tailwind';
import { type Config } from 'tailwindcss';

const config: Config = withGEL({
  relative: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: '300px auto',
      },
      gridTemplateRows: {
        header: '64px auto',
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
    'flex',
    'h-7',
    'w-12',
    'w-22',
    'items-center',
    'justify-center',
    'rounded',
    'transition-colors',
  ],
});

export default config;
