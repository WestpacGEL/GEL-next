import { ReactNode } from 'react';
import { AriaRadioGroupProps } from 'react-aria';
import { RadioGroupState } from 'react-stately';

import { type ButtonProps } from '../button/index.js';

export type ButtonGroupProps = {
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: boolean;
  /**
   * The `Button` components to render
   */
  children: ReactNode[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * error message
   */
  errorMessage?: string;
  /**
   * hint message
   */
  hintMessage?: string;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: 'hero' | 'primary';
} & Omit<AriaRadioGroupProps, 'errorMessage' | 'description' | 'orientation'> &
  Pick<ButtonProps, 'size'>;

export type ButtonGroupContextState = {
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: boolean;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: 'hero' | 'primary';
} & RadioGroupState &
  Pick<ButtonProps, 'size'>;
