import {
  BOMMultibrandLargeLogo,
  BSAMultibrandLargeLogo,
  RAMSMultibrandLargeLogo,
  STGMultibrandLargeLogo,
  WBCMultibrandLargeLogo,
  WBGMultibrandLargeLogo,
} from '@westpac/ui/symbol';

import { LogoProps } from './logo.types';

export const Logo = ({ brand, ...props }: LogoProps) => {
  switch (brand) {
    case 'bom':
      return <BOMMultibrandLargeLogo {...props} />;
    case 'bsa':
      return <BSAMultibrandLargeLogo {...props} />;
    case 'rams':
      return <RAMSMultibrandLargeLogo {...props} />;
    case 'stg':
      return <STGMultibrandLargeLogo {...props} />;
    case 'wbg':
      return <WBGMultibrandLargeLogo {...props} />;
    case 'wbc':
    default:
      return <WBCMultibrandLargeLogo {...props} />;
  }
};
