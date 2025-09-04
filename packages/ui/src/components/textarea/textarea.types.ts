import { TextareaHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './textarea.styles.js';
import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;

export type TextareaProps = {
  /**
   * Whether text area is invalid
   */
  invalid?: Variants['invalid'];
  /**
   * Size of text area
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * width of text area
   */
  width?: ResponsiveVariants<Variants['width']>;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;
