import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form-hint.styles.js';

export type FormHintProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & Omit<VariantProps<typeof styles>, 'spacing'> &
  HTMLAttributes<Element>;
