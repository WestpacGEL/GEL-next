import { FONT_SIZES } from '../constants/typography.js';

export const createFontSizes = (fontTypes: string[]) => {
  return fontTypes.reduce((acc, fontType) => {
    return Object.entries(FONT_SIZES).reduce((acc2, [fontSize, value]) => {
      return {
        ...acc2,
        [`${fontType}-${fontSize}`]: value.fontSize,
      };
    }, acc);
  }, {} as Record<string, any>);
};
