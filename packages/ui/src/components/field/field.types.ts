import { HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { FormHintProps } from '../index.js';

import { styles } from './field.styles.js';

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
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & AriaFieldProps &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;
