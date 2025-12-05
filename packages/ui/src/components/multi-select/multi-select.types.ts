import { ListProps } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { ListBoxProps } from './components/list-box/list-box.types.js';
import { styles } from './multi-select.styles.js';

type Variants = VariantProps<typeof styles>;
export type MultiSelectValue = { name?: string; id: number };
export type MultiSelectProps<T extends object = object> = {
  /**
   * listbox props
   */
  listBoxProps?: Omit<ListBoxProps<T>, 'state' | 'selectionMode'>;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Whether to show the section for the selected option in the field i.e. "Transaction: Savings" rather than "Savings"
   * NOTE: Only works with single selectionMode multi-selects
   */
  showSingleSectionTitle?: boolean;
  /**
   * Size of input
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
} & ListProps<T>;
