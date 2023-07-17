import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/ui/tailwind';
import { type Config } from 'tailwindcss';

const config: Config = {
  relative: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin],
};

export default config;
