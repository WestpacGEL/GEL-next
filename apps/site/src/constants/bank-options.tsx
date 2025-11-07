import { BOMShieldLogo, BSAStackedLogo, STGDragonLogo, WBCLogo } from '@westpac/ui/symbol';

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
    designSystemPageClasses: 'block -mr-1 h-[2.375rem] w-9',
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
] as const;
