import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form-section.styles.js';

type Variants = VariantProps<typeof styles>;

export type FormSectionProps = {
  /**
   * Remove padding
   */
  noPadding?: Variants['noPadding'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
