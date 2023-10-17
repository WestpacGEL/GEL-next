import { HTMLAttributes, ReactNode } from 'react';

export type ErrorMessageProps = {
  /**
   * Icon
   */
  icon?: (...args: unknown[]) => JSX.Element;
  /**
   * Message or messages
   */
  message?: ReactNode | ReactNode[];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
