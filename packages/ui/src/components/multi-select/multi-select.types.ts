import { ListProps } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ListBoxProps } from './components/list-box/list-box.types.js';
import { styles } from './multi-select.styles.js';

type Variants = VariantProps<typeof styles>;
export type MultiSelectValue = { name?: string; id: number };
export type MultiSelectProps<T extends object = object> = {
  /**
   * Size of input
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * listbox props
   */
  listBoxProps?: Omit<ListBoxProps, 'state'>;
} & ListProps<T>;
