import { ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './list.style';

export type ListProps = {
  children: ReactNode[];
  className?: string;
} & VariantProps<typeof styles>;
