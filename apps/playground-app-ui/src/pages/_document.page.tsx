import { type BrandKey } from '@westpac/theme';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

const WOFF2_TYPE = 'font/woff2';
const getFontFilesPerBrand = (brandkey: BrandKey) => {
  switch (brandkey) {
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
export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const brand = __NEXT_DATA__?.props?.brand ?? 'wbc';
  const fontsToPreload = getFontFilesPerBrand(brand);
  return (
    <Html lang="en" data-theme={brand}>
      <Head>
        {fontsToPreload.map(({ href, type }) => (
          <link key={href} rel="preload" href={href} as="font" type={type} crossOrigin="" />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
