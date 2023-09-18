import { FormHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form.styles.js';

export type FormContextValue = {
  inline?: boolean;
  size?: 'small' | 'medium';
  spacing?: 'small' | 'medium';
};

export type FormProps = FormContextValue & VariantProps<typeof styles> & FormHTMLAttributes<HTMLFormElement>;
