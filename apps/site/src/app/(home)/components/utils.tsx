'use client';

import {
  BOMShieldLogo,
  BSAStackedLogo,
  RAMSLogo,
  STGDragonLogo,
  SymbolProps,
  WBCLogo,
  WBGLogo,
} from '@westpac/ui/symbol';
import { FC } from 'react';
import { tv } from 'tailwind-variants';

import { BrandKey } from '@/app/types/brand.types';

export const logoMap: Record<BrandKey, { logo: FC<SymbolProps>; name: string }> = {
  wbc: { name: 'Westpac', logo: WBCLogo },
  stg: { name: 'St.George', logo: STGDragonLogo },
  bom: { name: 'Bank of Melbourne', logo: BOMShieldLogo },
  bsa: { name: 'BankSA', logo: BSAStackedLogo },
  wbg: { name: 'Westpac Group', logo: WBGLogo },
  rams: { name: 'RAMS', logo: RAMSLogo },
};

export const logoStyles = tv({
  base: '',
  variants: {
    brand: {
      wbc: 'h-3 w-[45px]',
      stg: 'h-[32px] w-[45px]',
      bom: 'h-[35px] w-[23px]',
      bsa: 'h-[34px] w-[21px]',
      wbg: 'h-[7px] w-[50px]',
      rams: 'h-[25px] w-[40px]',
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
    {
      brand: 'wbg',
      footer: true,
      className: 'lg:h-[8px] lg:w-[55px]',
    },
    {
      brand: 'rams',
      footer: true,
      className: 'lg:h-[31px] lg:w-[45px]',
    },
  ],
});
