import { type SymbolProps } from '@westpac/ui/symbol';

import { type BrandKey } from '@/app/types/brand.types';

export type LogoProps = {
  brand?: BrandKey;
} & SymbolProps;
