import { withTV } from 'tailwind-variants/transformer';
import { type Config } from 'tailwindcss';

import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/ui/tailwind';

export const withGEL = (config: Config) =>
  withTV({
    ...config,
    safelist: [
      // Workaround for date-picker which is a web component and tailwind can't pickup the inner components
      'date-picker',
      ...(typeof config.safelist === 'string' ? [config.safelist] : []),
      ...(Array.isArray(config.safelist) ? config.safelist : []),
    ],
    plugins: [
      WestpacUIKitBasePlugin,
      WestpacUIKitThemesPlugin,
      ...(config.plugins ? (Array.isArray(config.plugins) ? config.plugins : [config.plugins]) : []),
    ],
  });
