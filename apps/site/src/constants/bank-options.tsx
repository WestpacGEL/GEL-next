import { BOMShieldLogo, BSAStackedLogo, RAMSLogo, STGDragonLogo, WBCLogo, WBGLogo } from '@westpac/ui/symbol';

export const BANK_OPTIONS = [
  {
    key: 'wbc',
    label: 'Westpac',
    fontName: 'Westpac',
    icon: WBCLogo,
    homePageClasses: 'mr-1 block h-3 w-[2.75rem]',
    designSystemPageClasses: 'block h-3 w-[2.75rem]',
  },
  {
    key: 'stg',
    label: 'St.George',
    fontName: 'Dragon',
    icon: STGDragonLogo,
    homePageClasses: 'block h-[2.375rem] w-9',
    designSystemPageClasses: 'block -mr-2 h-[2.375rem] w-9',
  },
  {
    key: 'bom',
    label: 'Bank of Melbourne',
    fontName: 'Brown',
    icon: BOMShieldLogo,
    homePageClasses: 'mr-[1rem] block h-[2.4375rem] w-[1.625rem]',
    designSystemPageClasses: 'block mr-[0.5rem] h-[2.4375rem] w-[1.625rem]',
  },
  {
    key: 'bsa',
    label: 'Bank SA',
    fontName: 'Aller',
    icon: BSAStackedLogo,
    homePageClasses: 'mr-[1rem] block h-[2.875rem] w-[1.6875rem]',
    designSystemPageClasses: 'block mr-[0.5rem] h-[2.875rem] w-[1.6875rem]',
  },
  {
    key: 'wbg',
    label: 'Westpac Group',
    fontName: 'Montserrat',
    icon: WBGLogo,
    homePageClasses: 'mr-[-0.5rem] block h-[0.5625rem] w-[4.375rem]',
    designSystemPageClasses: 'mr-[-0.5rem] block h-[0.5625rem] w-[4.375rem]',
  },
  {
    key: 'rams',
    label: 'RAMS',
    fontName: 'Source Sans Pro',
    icon: RAMSLogo,
    homePageClasses: 'mr-[-0.3125rem] block h-5 w-[3.4375rem]',
    designSystemPageClasses: 'mr-[-0.5625rem] block h-6 w-[4.375rem]',
  },
] as const;
