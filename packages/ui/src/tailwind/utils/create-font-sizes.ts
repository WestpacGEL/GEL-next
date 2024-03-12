import { FONT_SIZES } from '../constants/typography.js';

type FontSizeType = Record<
  string,
  | string
  | [fontSize: string, lineHeight: string]
  | [
      fontSize: string,
      configuration: Partial<{
        fontWeight: string | number;
        letterSpacing: string;
        lineHeight: string;
      }>,
    ]
>;

export const createFontSizes = (fontTypes: string[]) => {
  return fontTypes.reduce((acc, fontType) => {
    return Object.entries(FONT_SIZES).reduce((acc2, [fontSize, value]) => {
      return {
        ...acc2,
        [`${fontType}-${fontSize}`]: value.fontSize,
      };
    }, acc);
  }, {} as FontSizeType);
};
