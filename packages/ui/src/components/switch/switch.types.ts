import { AriaCheckboxProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { styles } from './switch.styles.js';

type Variants = VariantProps<typeof styles>;

export type SwitchProps = {
  /**
   * Whether to display switch as block
   */
  block?: ResponsiveVariants<Variants['block']>;
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
  size?: ResponsiveVariants<Variants['size']>;
} & Omit<AriaCheckboxProps, 'children'>;
