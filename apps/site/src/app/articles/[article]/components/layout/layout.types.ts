import { ReactElement } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './layout.styles.js';

export type LayoutProps = {
  children: ReactElement[];
  layout: [number, ...number[]];
};

export type Variants = VariantProps<typeof styles>;
