import { type HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

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
  orientation?: Variants['orientation'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Key to set as default value
   */
  value?: string;
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
