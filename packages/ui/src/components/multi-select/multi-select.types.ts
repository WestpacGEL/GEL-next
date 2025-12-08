import { ListProps } from 'react-stately';

import { MultiSelectListBoxProps } from './components/multi-select-list-box/multi-select-list-box.types.js';
import { MultiSelectListBoxTriggerProps } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.types.js';

export type MultiSelectValue = { name?: string; id: number };
export type MultiSelectProps<T extends object = object> = {
  /**
   * listbox props
   */
  listBoxProps?: Omit<MultiSelectListBoxProps<T>, 'state' | 'selectionMode'>;
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
  size?: MultiSelectListBoxTriggerProps<T>['size'];
} & ListProps<T>;
