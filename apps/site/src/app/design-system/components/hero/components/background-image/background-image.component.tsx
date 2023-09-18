import { BrandKey } from '@westpac/ui/tailwind';
import { clsx } from 'clsx';
import { tv } from 'tailwind-variants';

import { BsaBackgroundSvg, StgBackgroundSvg, WbcBackgroundSvg } from './components';

const styles = tv({
  slots: {
    base: 'absolute z-0 hidden sm:block', // hero
    header: 'absolute -z-10 sm:hidden', //sticky header
  },
  variants: {
    brand: {
      wbc: {
        header: 'inset-y-0 right-0 sm:top-auto sm:h-[228px]',
      },
      wbg: {},
      stg: {
        base: 'bottom-0 left-0 w-[1202px]',
        header: 'bottom-0 left-0 w-[601px] xsl:w-[1202px]',
      },
      bsa: {
        base: 'bottom-0 right-0 w-[1016px]',
        header: 'xsl:[1016px] bottom-0 right-0 w-[508px]',
      },
      bom: {},
      btfg: {},
      rams: {},
    },
    fixed: {
      true: { header: 'sm:block' },
    },
  },
});

export function BackgroundImage({
  brand,
  type,
  fixed,
}: {
  brand: BrandKey;
  fixed?: boolean;
  type?: 'hero' | 'header';
}) {
  const imageMap = {
    wbc: WbcBackgroundSvg,
    wbg: null,
    stg: StgBackgroundSvg,
    bsa: BsaBackgroundSvg,
    bom: null,
    btfg: null,
    rams: null,
  };

  let BgImage = imageMap[brand];

  // WBC background image only on header and if fixed
  if (type === 'hero' && brand === 'wbc' && !fixed) {
    BgImage = null;
  }

  const { base, header } = styles({ brand, fixed });
  return BgImage ? (
    <div className={clsx(type === 'hero' && base(), type === 'header' && header())}>
      <BgImage />
    </div>
  ) : null;
}
