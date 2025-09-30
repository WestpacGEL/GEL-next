import { AriaRadioGroupProps } from 'react-aria';
import { RadioGroupState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { type ButtonProps } from '../button/index.js';

import { styles } from './components/button-group-button/button-group-button.styles.js';
import { ButtonGroupButtonProps } from './components/button-group-button/button-group-button.types.js';

type Variants = VariantProps<typeof styles>;

export type ButtonGroupProps = {
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: ResponsiveVariants<Variants['block']>;
  /**
   * The `Button` components to render in the form of an object
   */
  buttons: Omit<ButtonGroupButtonProps, 'className'>[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * error message
   */
  errorMessage?: string;
  /**
   * hint message
   */
  hintMessage?: string;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: ResponsiveVariants<'hero' | 'primary'>;
} & Omit<AriaRadioGroupProps, 'errorMessage' | 'description' | 'orientation' | 'children'> &
  Pick<ButtonProps, 'size'>;

export type ButtonGroupContextState = {
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: Variants['block'];
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: 'hero' | 'primary';
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  size: ButtonProps['size'];
  /**
   * Radio group state
   */
  state: RadioGroupState;
};
