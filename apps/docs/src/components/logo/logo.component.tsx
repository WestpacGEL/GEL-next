import { BOMLogoIcon, BSALogoIcon, RAMSLogoIcon, STGLogoIcon, WBCLogoIcon, WBGLogoIcon } from '@westpac/ui';

import { LogoProps } from './logo.types';

export const Logo = ({ brand, ...props }: LogoProps) => {
  switch (brand) {
    case 'bom':
      return <BOMLogoIcon {...props} />;
    case 'bsa':
      return <BSALogoIcon {...props} />;
    case 'rams':
      return <RAMSLogoIcon {...props} />;
    case 'stg':
      return <STGLogoIcon {...props} />;
    case 'wbg':
      return <WBGLogoIcon {...props} />;
    case 'wbc':
    default:
      return <WBCLogoIcon {...props} />;
  }
};
