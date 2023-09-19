import { InputHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './input.styles.js';

export type InputProps = { invalid?: boolean } & Omit<VariantProps<typeof styles>, 'invalid'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
