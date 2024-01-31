import { ReactNode } from 'react';
import { AriaRadioProps } from 'react-aria';

export type ButtonGroupButtonProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Label to render
   */
  label: ReactNode;
} & Omit<AriaRadioProps, 'children'>;
