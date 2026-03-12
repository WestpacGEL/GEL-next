'use client';

import { BOMShieldLogo, BSAStackedLogo, STGDragonLogo, SymbolProps, WBCLogo } from '@westpac/ui/symbol';
import { FC } from 'react';
import { tv } from 'tailwind-variants';

import { BrandKey } from '@/app/types/brand.types';

export const logoMap: Record<BrandKey, { logo: FC<SymbolProps>; name: string }> = {
  wbc: { name: 'Westpac', logo: WBCLogo },
  stg: { name: 'St.George', logo: STGDragonLogo },
  bom: { name: 'Bank of Melbourne', logo: BOMShieldLogo },
  bsa: { name: 'BankSA', logo: BSAStackedLogo },
};

export const logoStyles = tv({
  base: '',
  variants: {
    brand: {
      wbc: 'h-3 w-[45px]',
      stg: 'h-[32px] w-[45px]',
      bom: 'h-[35px] w-[23px]',
      bsa: 'h-[34px] w-[21px]',
    },
    footer: {
      true: '',
    },
  },
  compoundVariants: [
    {
      brand: 'wbc',
      footer: true,
      className: 'lg:h-[20px] lg:w-[50px]',
    },
    {
      brand: 'stg',
      footer: true,
      className: 'lg:h-[35px] lg:w-[50px]',
    },
    {
      brand: 'bom',
      footer: true,
      className: 'lg:h-[40px] lg:w-[27px]',
    },
    {
      brand: 'bsa',
      footer: true,
      className: 'lg:h-[40px] lg:w-4',
    },
  ],
});
