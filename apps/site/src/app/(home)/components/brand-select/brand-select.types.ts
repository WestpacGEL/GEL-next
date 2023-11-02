import { AriaSelectProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './brand-select.styles.js';

export type BrandSelectProps<T = any> = VariantProps<typeof styles> & AriaSelectProps<T>;
