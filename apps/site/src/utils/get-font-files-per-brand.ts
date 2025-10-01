import { type BrandKey } from '@westpac/ui/types';

const WOFF2_TYPE = 'font/woff2';
export const getFontFilesPerBrand = (brandKey: BrandKey) => {
  switch (brandKey) {
    case 'bom':
      return [
        { href: '/fonts/lineto-brown-pro-bold.woff2', type: WOFF2_TYPE },
        { href: '/fonts/lineto-brown-pro-light.woff2', type: WOFF2_TYPE },
        { href: '/fonts/lineto-brown-pro-regular.woff2', type: WOFF2_TYPE },
      ];
    case 'bsa':
      return [
        { href: '/fonts/Aller_Bd.woff2', type: WOFF2_TYPE },
        { href: '/fonts/Aller_Lt.woff2', type: WOFF2_TYPE },
      ];
    case 'rams':
      return [
        {
          href: '/fonts/source-sans-pro-v14-latin-600.woff2',
          type: WOFF2_TYPE,
        },
        {
          href: '/fonts/source-sans-pro-v14-latin-700.woff2',
          type: WOFF2_TYPE,
        },
        {
          href: '/fonts/source-sans-pro-v14-latin-regular.woff2',
          type: WOFF2_TYPE,
        },
      ];
    case 'stg':
      return [{ href: '/fonts/dragonbold-bold-webfont.woff2', type: WOFF2_TYPE }];
    case 'wbc':
      return [{ href: '/fonts/Westpac-Bold-v2.007.woff2', type: WOFF2_TYPE }];
    case 'wbg':
      return [
        { href: '/fonts/montserrat-v14-latin-300.woff2', type: WOFF2_TYPE },
        { href: '/fonts/montserrat-v14-latin-700.woff2', type: WOFF2_TYPE },
        { href: '/fonts/montserrat-v14-latin-regular.woff2', type: WOFF2_TYPE },
      ];
    case 'btfg':
    default:
      return [];
  }
};
