import { ReactNode } from 'react';
import { AriaCheckboxGroupProps } from 'react-aria';
import { CheckboxGroupState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './checkbox-group.styles.js';

export type CheckboxGroupProps = {
  /**
   * The `CheckboxItem` components to render
   */
  children: ReactNode[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * Orientation of checkbox items
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Amount of CheckboxItems to display, remainder will be hidden behind reveal button
   */
  showAmount?: number;
  /**
   * Controls size of `CheckboxItem` components, can't be applied directly to `CheckboxItem`
   */
  size?: 'medium' | 'large';
} & VariantProps<typeof styles> &
  Omit<AriaCheckboxGroupProps, 'errorMessage' | 'description'>;

export type CheckboxGroupContextState = {
  /**
   * Controls orientation of `CheckboxItem` components, can't be applied directly on `CheckboxItem`
   */
  orientation: 'vertical' | 'horizontal';
  /**
   * Controls size of `CheckboxItem` components, can't be applied directly on `CheckboxItem`
   */
  size: 'medium' | 'large';
} & CheckboxGroupState;
