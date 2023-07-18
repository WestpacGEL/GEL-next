import { withGEL } from '@westpac/ui/tailwind';
import { type Config } from 'tailwindcss';

const config: Config = withGEL({
  relative: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
});

export default config;
