// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind
import { type BrandKey } from '@westpac/ui/tailwind';
import { HTMLAttributes, ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './header.styles';

export type HeaderProps = {
  brand: BrandKey;
  onMenuButtonClick(): void;
  title?: ReactNode;
} & VariantProps<typeof styles> &
  HTMLAttributes<HTMLElement>;
