import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './progress-indicator.styles.js';

type Variants = VariantProps<typeof styles>;

export type ProgressIndicatorProps = {
  /**
   * Whether indicator should be white for a dark background
   */
  inverted?: boolean;
  /**
   * Size of progress indicator
   */
  size?: Variants['size'];
} & HTMLAttributes<Element>;
