import { FormHTMLAttributes } from 'react';
import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

export type FormContextValue = {
  /**
   * Whether form is inline
   */
  inline?: boolean;
  /**
   * Spacing of Form
   */
  spacing?: 'medium' | 'large';
};

export type FormProps = {
  /**
   * Whether form is inline
   */
  inline?: ResponsiveVariants<FormContextValue['inline']>;
  /**
   * Spacing of Form
   */
  spacing?: ResponsiveVariants<FormContextValue['spacing']>;
} & FormHTMLAttributes<HTMLFormElement>;
