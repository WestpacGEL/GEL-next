import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './dialog-footer.styles.js';

export type DialogFooterProps = VariantProps<typeof styles> & HTMLAttributes<HTMLElement>;
