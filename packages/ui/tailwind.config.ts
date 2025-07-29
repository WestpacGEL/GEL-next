import { withTV } from 'tailwind-variants/transformer';
import { Config } from 'tailwindcss';

import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from './src/tailwind/index.js';

const config: Config = withTV({
  jit: true,
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin({ brandFonts: { src: '/fonts' } }), WestpacUIKitThemesPlugin({})],
  future: {
    hoverOnlyWhenSupported: true,
  },
});

export default config;
