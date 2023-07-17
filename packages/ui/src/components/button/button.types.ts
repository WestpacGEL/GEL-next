import { type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { styles } from './button.styles.js';

export type ButtonProps = {
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'button' | 'div'>;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
