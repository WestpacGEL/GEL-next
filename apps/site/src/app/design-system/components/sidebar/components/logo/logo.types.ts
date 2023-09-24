import { type IconProps } from '@westpac/ui/icon';

import { type BrandKey } from '@/app/types/brand.types';

export type LogoProps = {
  brand?: BrandKey;
} & IconProps;
