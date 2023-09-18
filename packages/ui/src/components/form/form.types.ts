import { FormHTMLAttributes } from 'react';

export type FormContextValue = {
  inline?: boolean;
  size?: 'small' | 'medium';
  spacing?: 'small' | 'medium';
};

export type FormProps = FormContextValue & FormHTMLAttributes<HTMLFormElement>;
