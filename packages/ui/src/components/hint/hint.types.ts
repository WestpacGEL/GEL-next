import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './hint.styles.js';

import type { ResponsiveVariants } from '../../types/responsive-variants.types.js';

type Variant = VariantProps<typeof styles>;
export type HintProps = {
  /**
   * spacing
   */
  spacing?: ResponsiveVariants<Variant['spacing']>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
