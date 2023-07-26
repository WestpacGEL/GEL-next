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
});

export default config;
