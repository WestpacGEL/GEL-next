import { CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flexi-cell-label.styles.js';

export type FlexiCellLabelProps = {
  /**
   * Children attribute
   */
  children: ReactNode;
  /**
   * Label's font weight
   */
  fontWeight?: CSSProperties['fontWeight'];
  /**
   * Component tag
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Define if it is going to truncate the text
   */
  truncateText?: boolean;
} & HTMLAttributes<HTMLOrSVGElement> &
  VariantProps<typeof styles>;
