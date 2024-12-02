import { FocusEvent, HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './pass-code.styles.js';

export type PassCodeProps = {
  /**
   * Number of passcode inputs
   */
  length: number;
  /**
   * Callback when the input is blurred
   */
  onBlur?: (index: number, event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback when the input value changes
   */
  onChange?: (passcode: string[]) => void;
  /**
   * Callback when the passcode is completely typed
   */
  onComplete?: (passcode: string) => void;
  /**
   * Type of passcode input
   */
  type?: 'numbers' | 'letters' | 'alphanumeric';
  /**
   * Value of the passcode input
   */
  value?: string[];
} & VariantProps<typeof styles> &
  Omit<HTMLAttributes<Element>, 'onChange'>;

/*
 * Passcode input ref used to access the passcode input functions via useImperativeHandle hook
 */
export type PassCodeRef = {
  /**
   * Clear the passcode input, for non-controlled component only
   */
  clear: () => void;
  /**
   * Focus on the first input
   */
  focus: () => void;
};
