import { AriaRadioGroupProps, AriaToggleButtonGroupProps } from 'react-aria';
import { RadioGroupState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { type ButtonProps } from '../button/index.js';

import { styles } from './components/button-group-button/button-group-button.styles.js';

type Variants = VariantProps<typeof styles>;

export type ButtonGroupProps = {
  children: React.ReactNode;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: ResponsiveVariants<'hero' | 'primary'>;
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: ResponsiveVariants<Variants['block']>;
  /**
   * size
   */
  size?: ButtonProps['size'];
  /**
   * className
   */
  className?: string;
} & AriaToggleButtonGroupProps;
