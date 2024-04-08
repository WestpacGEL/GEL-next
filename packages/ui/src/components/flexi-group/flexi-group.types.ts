import { ReactNode } from 'react';
import { AriaRadioGroupProps, AriaRadioProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flexi-group.styles.js';

export type FlexiGroupProps = {
  /**
   * String to override base style
   */
  className?: string;
  /**
   * error message
   */
  errorMessage?: string;
  /**
   * The `Flexi` components to render in the form of an object
   */
  flexiFields: Omit<FlexiFieldGroupProps, 'className'>[];
  /**
   * hint message
   */
  hintMessage?: string;
  pictogram?: ReactNode;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  Omit<AriaRadioGroupProps, 'errorMessage' | 'description' | 'orientation' | 'children'>;

export type FlexiFieldGroupProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Label to render
   */
  label: ReactNode;
} & Omit<AriaRadioProps, 'children'>;
