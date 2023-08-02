import { ReactNode } from 'react';
import { type AriaRadioGroupProps } from 'react-aria';
import { type RadioGroupState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './radio.styles.js';

export type RadioProps = {
  /**
   * The `Option` components to render
   */
  children?: ReactNode[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * Amount of Options to display, remainder will be hidden behind reveal button
   */
  showAmount?: number;
  /**
   * Controls size of `Option` components, can't be applied directly to `Option`
   */
  size?: 'medium' | 'large';
} & VariantProps<typeof styles> &
  Omit<AriaRadioGroupProps, 'errorMessage' | 'description'>;

export type RadioContextState = {
  /**
   * Controls orientation of `Option` components, can't be applied directly on `Option`
   */
  orientation: 'vertical' | 'horizontal';
  /**
   * Controls size of `Option` components, can't be applied directly on `Option`
   */
  size: 'medium' | 'large';
} & RadioGroupState;
