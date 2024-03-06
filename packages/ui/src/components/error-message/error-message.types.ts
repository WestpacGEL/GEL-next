import { HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';

export type ErrorMessageProps = {
  /**
   * Icon
   */
  icon?: (...args: unknown[]) => JSX.Element;
  /**
   * Message or messages
   */
  message?: AriaFieldProps['errorMessage'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
