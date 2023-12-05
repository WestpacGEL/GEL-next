import { HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';

import { FormHintProps, FormLabelProps } from '../index.js';

export type FieldProps = {
  /**
   * error message
   */
  errorMessage?: string | string[];
  /**
   * hint message
   */
  hintMessage?: FormHintProps['children'];
  /**
   * Sub-label mode (smaller label text size)
   */
  subLabel?: FormLabelProps['subLabel'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & AriaFieldProps &
  HTMLAttributes<Element>;
