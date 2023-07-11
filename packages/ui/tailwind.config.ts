import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/theme';

const config: any = {
  jit: true,
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin],
};

export default config;
