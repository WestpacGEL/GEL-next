/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Color from 'colorjs.io';

import { BrandConfig } from '../index.js';

type ColorConfig = BrandConfig['colors'];
export const generateColorTints = (color: Record<string, string>): ColorConfig => {
  return Object.entries(color).reduce((acc, [colorKey, colorValue]) => {
    const color = new Color(colorValue);
    const tints = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90].reduce(
      (acc2, curr) => {
        return {
          ...acc2,
          [curr]: color
            .mix('white', (100 - curr) / 100, { space: 'srgb' })
            .toString({ format: 'hex' })
            .toUpperCase(),
        };
      },
      { DEFAULT: colorValue },
    );
    return {
      ...acc,
      [colorKey]: tints,
    };
  }, {} as ColorConfig);
};
