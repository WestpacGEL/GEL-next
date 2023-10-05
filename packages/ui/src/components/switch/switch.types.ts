import { AriaCheckboxProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './switch.styles.js';

export type SwitchProps = {
  /**
   * Whether to display switch as block
   */
  block?: boolean;
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
} & Omit<AriaCheckboxProps, 'children' | 'isSelected'> &
  Pick<VariantProps<typeof styles>, 'size'>;
