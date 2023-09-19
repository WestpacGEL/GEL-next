import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './dialog-body.styles.js';

export type DialogBodyProps = VariantProps<typeof styles> & HTMLAttributes<HTMLElement>;
