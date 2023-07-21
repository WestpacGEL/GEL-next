import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './breadcrumb.styles.js';

export type BreadcrumbProps = VariantProps<typeof styles> & HTMLAttributes<HTMLDivElement>;
