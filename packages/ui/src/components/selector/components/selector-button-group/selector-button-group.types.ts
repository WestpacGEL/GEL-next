import { type HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { styles } from './selector-button-group.styles.js';

type Variants = VariantProps<typeof styles>;

export type SelectorButtonGroupProps = {
  /**
   * Whether all options are disabled
   */
  isDisabled?: boolean;
  /**
   * Orientation of radio
   */
  orientation?: ResponsiveVariants<Variants['orientation']>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Key to set as default value (uncontrolled) or currently selected value (controlled)
   */
  value?: string;
  /**
   * Called when selection changes. Providing this prop makes the component controlled.
   * Pass an empty string to clear the selection.
   */
  onChange?: (value: string) => void;
} & AriaFieldProps &
  Omit<HTMLAttributes<Element>, 'onChange'>;

export type SelectorButtonGroupContextState = {
  /**
   * Whether all options should be disabled
   */
  isDisabled?: boolean;
  /**
   * Helps set selected state
   */
  onClick: (id: string) => void;
  /**
   * Whether component is valid
   */
  validationState: 'valid' | 'invalid';
  /**
   * id of currently selected option
   */
  value: string;
};
