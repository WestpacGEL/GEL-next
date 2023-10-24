import { ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './blockquote.style';

export type BlockquoteProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof styles>;
