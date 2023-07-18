import { withTV } from 'tailwind-variants/transformer';
import { type Config } from 'tailwindcss';

import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/ui/tailwind';

export const withGEL = (config: Config) =>
  withTV({
    ...config,
    plugins: [
      WestpacUIKitBasePlugin,
      WestpacUIKitThemesPlugin,
      ...(config.plugins ? (Array.isArray(config.plugins) ? config.plugins : [config.plugins]) : []),
    ],
  });
