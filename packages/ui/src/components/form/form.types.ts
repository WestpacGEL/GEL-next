import { FormHTMLAttributes } from 'react';

export type FormContextValue = {
  inline?: boolean;
  size?: 'small' | 'medium' | 'large';
  spacing?: 'small' | 'medium' | 'large';
};

export type FormProps = FormContextValue & FormHTMLAttributes<HTMLFormElement>;
