import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form-group.styles.js';

export type FormGroupProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & Omit<VariantProps<typeof styles>, 'inline' | 'spacing'> &
  HTMLAttributes<Element>;
