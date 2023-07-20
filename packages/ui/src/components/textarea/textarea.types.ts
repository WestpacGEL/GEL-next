import { TextareaHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './textarea.styles.js';

export type TextareaProps = VariantProps<typeof styles> & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;
