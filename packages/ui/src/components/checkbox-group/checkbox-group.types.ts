import { AriaCheckboxGroupProps } from 'react-aria';
import { CheckboxGroupState } from 'react-stately';

import { HintProps } from '../index.js';

import { CheckboxGroupCheckboxProps } from './components/checkbox-group-checkbox/checkbox-group-checkbox.types.js';
import { VariantProps } from 'tailwind-variants';
import { styles } from './checkbox-group.styles.js';
import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

type Variant = VariantProps<typeof styles>;

export type CheckboxGroupProps = {
  /**
   * The `CheckboxItem` components to render
   */
  checkboxes: CheckboxGroupCheckboxProps[];
  /**
   * String to override base style
   */
  className?: string;
  /**
   * error message
   */
  errorMessage?: string | string[];
  /**
   * hint message
   */
  hintMessage?: HintProps['children'];
  /**
   * Orientation of checkbox items
   */
  orientation?: ResponsiveVariants<Variant['orientation']>;
  /**
   * Amount of CheckboxItems to display, remainder will be hidden behind reveal button
   */
  showAmount?: number;
  /**
   * Controls size of `CheckboxItem` components, can't be applied directly to `CheckboxItem`
   */
  size?: ResponsiveVariants<'medium' | 'large'>;
} & Omit<AriaCheckboxGroupProps, 'errorMessage' | 'description'>;

export type CheckboxGroupContextState = {
  /**
   * Controls orientation of `CheckboxItem` components, can't be applied directly on `CheckboxItem`
   */
  orientation: 'vertical' | 'horizontal';
  /**
   * Controls size of `CheckboxItem` components, can't be applied directly on `CheckboxItem`
   */
  size: 'medium' | 'large';
  /**
   * State
   */
  state: CheckboxGroupState;
};
