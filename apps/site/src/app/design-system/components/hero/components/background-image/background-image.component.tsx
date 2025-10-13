import { BrandKey } from '@westpac/ui/types';
import { clsx } from 'clsx';

import { styles } from './background-image.styles';
import { BsaBackgroundSvg, StgBackgroundSvg, WbcBackgroundSvg } from './components';

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
