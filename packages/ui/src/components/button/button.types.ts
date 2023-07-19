import { AnchorHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './button.styles.js';

export type ButtonProps = {
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & Omit<AnchorHTMLAttributes<Element>, 'type' | 'color'> &
  VariantProps<typeof styles>;
