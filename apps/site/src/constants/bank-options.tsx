import { BOMShieldLogo, BSAStackedLogo, RAMSLogo, STGDragonLogo, WBCLogo, WBGLogo } from '@westpac/ui/symbol';

export const BANK_OPTIONS = [
  {
    key: 'wbc',
    label: 'Westpac',
    icon: <WBCLogo className="h-3 w-[2.75rem]" />,
  },
  {
    key: 'stg',
    label: 'St. George',
    icon: <STGDragonLogo className="-mr-2 h-[2.375rem] w-9" />,
  },
  {
    key: 'bom',
    label: 'Bank of Melbourne',
    icon: <BOMShieldLogo className="mr-[0.5625rem] h-[2.4375rem] w-[1.625rem]" />,
  },
  {
    key: 'bsa',
    label: 'Bank of SA',
    icon: <BSAStackedLogo className="mr-[0.5rem] h-[2.875rem] w-[1.6875rem]" />,
  },
  {
    key: 'wbg',
    label: 'Westpac Group',
    icon: <WBGLogo className="mr-[-0.5rem] h-[0.5625rem] w-[4.375rem]" />,
  },
  {
    key: 'rams',
    label: 'RAMS',
    icon: <RAMSLogo className="mr-[-0.5rem] h-6 w-[4.375rem]" />,
  },
];
