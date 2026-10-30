import { HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';

import { HintProps, LabelProps } from '../index.js';

export type FieldProps = {
  /**
   * Politely announces updates to the visible error without moving focus.
   * Enable before errors appear and keep enabled while validating.
   * Initial errors and repeated identical messages are not guaranteed to be announced.
   * @default false
   */
  announceError?: boolean;
  /**
   * error title
   */
  errorTitle?: string;
  /**
   * error message
   */
  errorMessage?: string | string[];
  /**
   * hint message
   */
  hintMessage?: HintProps['children'];
  /**
   * label size
   */
  labelSize?: LabelProps['size'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & AriaFieldProps &
  HTMLAttributes<Element>;
