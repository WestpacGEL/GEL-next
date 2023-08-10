import { AriaSelectProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './sidebar-select.styles.js';

export type SidebarSelectProps<T = any> = VariantProps<typeof styles> & AriaSelectProps<T>;
