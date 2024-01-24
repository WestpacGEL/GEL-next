import { HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';

import { HintProps, LabelProps } from '../index.js';

export type FieldProps = {
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
