import Values from 'values.js';

import { BrandConfig } from '../index.js';

type ColorConfig = BrandConfig['colors'];
export const generateColorShades = (color: Record<string, string>): ColorConfig => {
  return Object.entries(color).reduce((acc, [colorKey, colorValue]) => {
    const colorShades = new Values(colorValue)
      .all(20)
      .slice(0, -1)
      .reduce(
        (acc2, shade, index) => {
          const shadeKey = index === 0 ? 50 : index * 100;
          return {
            ...acc2,
            [shadeKey]: `#${shade.hex.toUpperCase()}`,
          };
        },
        { DEFAULT: colorValue },
      );
    return {
      ...acc,
      [colorKey]: colorShades,
    };
  }, {} as ColorConfig);
};
