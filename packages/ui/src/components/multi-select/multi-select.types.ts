import { Key, ReactNode, RefObject } from 'react';
import { AriaListBoxOptions, AriaListBoxProps, AriaPopoverProps } from 'react-aria';
import { ItemProps, ListProps, ListState, OverlayTriggerState } from 'react-stately';

import { MultiSelectSize } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.types.js';

export type MultiSelectContextProps<T extends object = object> = {
  size?: MultiSelectSize;
  overlayState: OverlayTriggerState;
  listState: ListState<T>;
  buttonRef: RefObject<HTMLButtonElement>;
  listBoxRef: RefObject<HTMLUListElement>;
  popoverRef: RefObject<HTMLDivElement>;
  selectAllRef: RefObject<HTMLButtonElement>;
  inputRef: RefObject<HTMLInputElement>;
  selectedKeys?: AriaListBoxProps<T>['selectedKeys'];
  selectionMode?: AriaListBoxProps<T>['selectionMode'];
  filterText: string;
  placement?: AriaPopoverProps['placement'];
};

export type MultiSelectItemProps<T extends object = object> = { description?: string } & ItemProps<T>;

// Props for the items that can be passed to the MultiSelect component
export type MultiSelectValue = { textValue?: string; content?: ReactNode; key: Key; description?: string };

export type MultiSelectProps<T> = {
  /**
   * Props for the list box within the multi-select
   */
  listBoxProps?: Omit<AriaListBoxOptions<T>, 'state' | 'selectionMode'>;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Manual placement of the dropdown, will flip automatically if there is not enough space
   * @default bottom
   */
  placement?: AriaPopoverProps['placement'];
  /**
   * Whether to show the section for the selected option in the field i.e. "Transaction: Savings" rather than "Savings"
   * NOTE: Only works with single selectionMode multi-selects
   */
  showSingleSectionTitle?: boolean;
  /**
   * Size of input
   * @default medium
   */
  size?: MultiSelectSize;
} & ListProps<T>;
