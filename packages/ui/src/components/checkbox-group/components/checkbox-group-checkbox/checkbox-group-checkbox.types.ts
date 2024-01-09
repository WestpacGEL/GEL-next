import { ReactNode } from 'react';
import { AriaCheckboxGroupItemProps } from 'react-aria';

export type CheckboxGroupCheckboxProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Renders hint under option, most likely a `string` but could be something else
   */
  hint?: ReactNode;
} & Omit<AriaCheckboxGroupItemProps, 'isIndeterminate'>;
