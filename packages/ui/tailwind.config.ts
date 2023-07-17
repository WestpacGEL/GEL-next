import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from './src/tailwind/index.js';

const config: any = {
  jit: true,
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin],
};

export default config;
