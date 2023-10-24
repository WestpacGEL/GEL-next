import { ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './paragraph.style';

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
  textAlign?: 'center' | 'end' | undefined;
} & VariantProps<typeof styles>;
