import { DOMProps } from '@react-types/shared';
import { Key, ReactNode, RefObject } from 'react';
import { AriaListBoxOptions, AriaPopoverProps } from 'react-aria';
import { ItemProps, ListProps, ListState, OverlayTriggerState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

import { styles as triggerStyles } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.styles.js';
import { MultiSelectSize } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.types.js';

type Variants = VariantProps<typeof triggerStyles>;

export type MultiSelectContextProps<T extends object = object> = {
  size?: MultiSelectSize;
  overlayState: OverlayTriggerState;
  listState: ListState<T>;
  buttonRef: RefObject<HTMLButtonElement>;
  listBoxRef: RefObject<HTMLUListElement>;
  popoverRef: RefObject<HTMLDivElement>;
  selectAllRef: RefObject<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  filterText: string;
  overlayProps: DOMProps;
  placement?: AriaPopoverProps['placement'];
  portalContainer?: Element;
  hideSelectAll?: boolean;
};

export type MultiSelectItemProps<T extends object = object> = { description?: string } & ItemProps<T>;

// Props for the items that can be passed to the MultiSelect component
export type MultiSelectValue = { textValue?: string; content?: ReactNode; key: Key; description?: string };

export type MultiSelectProps<T> = {
  /**
   * Whether to hide the filter input in the dropdown
   * @default false
   */
  hideFilter?: boolean;
  /**
   * Whether to hide the "Select All" option in the dropdown for multiple selection multi-selects
   * @default false
   */
  hideSelectAll?: boolean;
  /**
   * Props for the list box within the multi-select
   */
  listBoxProps?: Omit<AriaListBoxOptions<T>, 'state' | 'selectionMode'>;
  /**
   * id for the base multi-select container for accessibility/other uses
   */
  id?: string;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Manual placement of the dropdown, will flip automatically if there is not enough space
   * @default 'bottom left'
   */
  placement?: AriaPopoverProps['placement'];
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: Element;
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
  /**
   * Width of the multi-select, can be a fixed width or full width
   * @default full
   */
  width?: ResponsiveVariants<Variants['width']>;
} & ListProps<T>;
