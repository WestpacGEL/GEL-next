import bomBrand from '@westpac/bom';
import bsaBrand from '@westpac/bsa';
import btfgBrand from '@westpac/btfg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ramsBrand from '@westpac/rams';
import stgBrand from '@westpac/stg';
import wbcBrand from '@westpac/wbc';
import wbgBrand from '@westpac/wbg';

import { BrandKey } from '../types/index.js';

export function getBrandByKey(brandKey: BrandKey) {
  switch (brandKey) {
    case 'bom':
      return bomBrand;
    case 'bsa':
      return bsaBrand;
    case 'btfg':
      return btfgBrand;
    case 'rams':
      return ramsBrand;
    case 'stg':
      return stgBrand;
    case 'wbc':
      return wbcBrand;
    case 'wbg':
      return wbgBrand;
  }
}
