import { TextareaHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './textarea.styles.js';

type Variants = VariantProps<typeof styles>;

export type TextareaProps = {
  /**
   * Whether text area is invalid
   */
  invalid?: Variants['invalid'];
  /**
   * Size of text area
   */
  size?: Variants['size'];
  /**
   * width of text area
   */
  width?: Variants['width'];
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;
