import { SelectHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './select.styles.js';

export type SelectProps = VariantProps<typeof styles> & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
