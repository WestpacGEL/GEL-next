import { HTMLAttributes } from 'react';
import { AriaCheckboxGroupProps } from 'react-aria';
import { CheckboxGroupState } from 'react-stately';

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
  Omit<HTMLAttributes<Element>, 'onChange'>;
