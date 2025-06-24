import { withGEL } from '@westpac/ui/tailwind';

/** @type {import('tailwindcss').Config} */
const config = withGEL({
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx}'],
  safelist: [],
});

export default config;
