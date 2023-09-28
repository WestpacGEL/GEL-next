import { HTMLAttributes, ReactNode } from 'react';
import { AriaCheckboxGroupProps } from 'react-aria';
import { CheckboxGroupState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './selector-checkbox-group.styles.js';

export type SelectorCheckboxGroupContextState = CheckboxGroupState;

export type SelectorCheckboxGroupProps = {
  /**
   * String to override base style
   */
  className?: string;
  /**
   * Orientation of checkbox items
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Controls size of `CheckboxItem` components, can't be applied directly to `CheckboxItem`
   */
  size?: 'medium' | 'large';
} & AriaCheckboxGroupProps &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;
