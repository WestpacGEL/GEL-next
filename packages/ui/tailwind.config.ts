import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/theme';

const config: any = {
  jit: true,
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin],
  safelist: [
    {
      pattern: /bg-+/, // 👈  This includes bg of all colors and shades
    },
    {
      pattern: /text-+/,
    },
    {
      pattern: /icon-+/,
    },
  ],
};

export default config;
