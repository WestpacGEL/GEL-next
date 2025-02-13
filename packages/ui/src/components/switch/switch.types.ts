import { AriaCheckboxProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './switch.styles.js';

type Variants = VariantProps<typeof styles>;

export type SwitchProps = {
  /**
   * Whether to display switch as block
   */
  block?: Variants['block'];
  /**
   * Default checked
   */
  checked?: boolean;
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * Label for the switch
   */
  label: string;
  /**
   * Size of switch
   */
  size?: Variants['size'];
} & Omit<AriaCheckboxProps, 'children'>;
