import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './button.styles.js';

export type ButtonProps = {
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
