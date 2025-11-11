import {
  BOMMultibrandLargeLogo,
  BSAMultibrandLargeLogo,
  STGMultibrandLargeLogo,
  WBCMultibrandLargeLogo,
} from '@westpac/ui/symbol';

import { LogoProps } from './logo.types';

export const Logo = ({ brand, ...props }: LogoProps) => {
  switch (brand) {
    case 'bom':
      return <BOMMultibrandLargeLogo {...props} />;
    case 'bsa':
      return <BSAMultibrandLargeLogo {...props} />;
    case 'stg':
      return <STGMultibrandLargeLogo {...props} />;
    case 'wbc':
    default:
      return <WBCMultibrandLargeLogo {...props} />;
  }
};
