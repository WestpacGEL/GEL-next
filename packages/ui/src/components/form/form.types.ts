import { FormHTMLAttributes } from 'react';

export type FormContextValue = {
  /**
   * Whether form is inline
   */
  inline?: boolean;
  /**
   * Size of Form
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Spacing of Form
   */
  spacing?: 'medium' | 'large';
};

export type FormProps = FormContextValue & FormHTMLAttributes<HTMLFormElement>;
