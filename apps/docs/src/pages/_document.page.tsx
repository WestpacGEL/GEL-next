import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

import { getFontFilesPerBrand } from '../utils/get-font-files-per-brand';

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
