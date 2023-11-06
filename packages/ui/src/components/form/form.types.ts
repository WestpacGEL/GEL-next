import { FormHTMLAttributes } from 'react';

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

export type FormProps = FormContextValue & FormHTMLAttributes<HTMLFormElement>;
