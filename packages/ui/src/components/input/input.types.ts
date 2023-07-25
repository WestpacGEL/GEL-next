import { InputHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './input.styles.js';

export type InputProps = VariantProps<typeof styles> & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
