import { BRAND_FONTS } from '../constants/typography.js';
import { type BrandKey, type FontFace } from '../types/index.js';

type Brand = Exclude<BrandKey, 'btfg'>;

export function createBrandFonts({
  src = '',
  brand = ['bom', 'bsa', 'rams', 'stg', 'wbc', 'wbg'],
}: {
  brand?: Brand | Brand[];
  src: string;
}) {
  const trimSrc = src.replace(/\/$/, '');
  const brandList: Brand[] = Array.isArray(brand) ? brand : [brand];

  return brandList.reduce((acc, curr) => {
    const fonts = BRAND_FONTS[curr].map(font => ({
      '@font-face': { ...font, src: font.src.replace(/{src}/g, trimSrc) },
    }));
    return [...acc, ...fonts];
  }, [] as FontFace[]);
}
