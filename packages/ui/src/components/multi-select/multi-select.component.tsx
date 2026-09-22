'use client';

import { focusWithoutScrolling } from '@react-aria/utils';
import { Node } from '@react-types/shared';
import React, { ForwardedRef, forwardRef, useRef, useState, memo, createContext } from 'react';
import { useFilter, useObjectRef, useOverlayTrigger } from 'react-aria';
import { Item, useListState, useOverlayTriggerState } from 'react-stately';

import { MultiSelectDropdown } from './components/multi-select-dropdown/multi-select-dropdown.component.js';
import { MultiSelectListBoxTrigger } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.component.js';
import { styles as multiSelectStyles } from './multi-select.styles.js';
import { filterNodes } from './utils/filter-nodes.js';

import type {
  MultiSelectContextProps,
  MultiSelectItemProps,
  MultiSelectProps,
  MultiSelectValue,
} from './multi-select.types.js';

export const MultiSelectContext = createContext<MultiSelectContextProps>({
  overlayState: {} as MultiSelectContextProps['overlayState'],
  listState: {} as MultiSelectContextProps['listState'],
  listBoxRef: { current: null },
  buttonRef: { current: null },
  popoverRef: { current: null },
  selectAllRef: { current: null },
  inputRef: { current: null },
  filterText: '',
  overlayProps: {},
  hideSelectAll: false,
});

export function BaseMultiSelect<T extends MultiSelectValue = MultiSelectValue>(
  {
    size = 'medium',
    listBoxProps,
    selectionMode = 'multiple',
    selectedKeys,
    onSelectionChange,
    placeholder = 'Select',
    showSingleSectionTitle = false,
    placement = 'bottom left',
    portalContainer,
    id,
    hideFilter = false,
    hideSelectAll = false,
    width = 'full',
    ...props
  }: MultiSelectProps<T>,
  forwardedRef: ForwardedRef<HTMLButtonElement>,
) {
  const [filterText, setFilterText] = useState('');
  const filter = useFilter({ sensitivity: 'base' });

  const listState = useListState<T>({
    ...props,
    selectedKeys,
    selectionMode,
    onSelectionChange,
    // Need to provide a custom filter as the default filtering in react-stately does not work with sections
    // https://github.com/adobe/react-spectrum/issues/4930
    filter: (nodes: Iterable<Node<T>>) =>
      filterNodes(nodes, filterText, (value, string) => filter.contains(value, string)),
  });

  // refs
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useObjectRef(forwardedRef);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);

  const overlayState = useOverlayTriggerState({
    onOpenChange: isOpen => {
      if (isOpen) {
        // Focus moves into the popover without scrolling the page (react-aria's own focus helper), so the
        // dropdown does not jump around, and page scroll cannot dismiss it while the user navigates.
        requestAnimationFrame(() => {
          const target =
            (!hideFilter && inputRef.current) ||
            (selectionMode === 'multiple' && !hideSelectAll && selectAllRef.current) ||
            (listBoxRef.current?.querySelector('[data-key]') as HTMLElement | null);
          if (target) focusWithoutScrolling(target);
        });
      }
      if (!isOpen) {
        buttonRef.current?.focus();
      }
    },
  });
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, overlayState, buttonRef);

  const styles = multiSelectStyles({});

  return (
    <MultiSelectContext.Provider
      value={{
        filterText,
        size,
        overlayState,
        listState,
        buttonRef,
        popoverRef,
        placement,
        selectAllRef,
        listBoxRef,
        inputRef,
        overlayProps,
        portalContainer,
        hideSelectAll,
      }}
    >
      <div className={styles.root()}>
        <MultiSelectListBoxTrigger
          placeholder={placeholder}
          selectedKeys={selectedKeys}
          showSingleSectionTitle={showSingleSectionTitle}
          triggerProps={triggerProps}
          id={id}
          width={width}
        />
        {overlayState.isOpen && (
          <MultiSelectDropdown setFilterText={setFilterText} hideFilter={hideFilter} {...listBoxProps} />
        )}
      </div>
    </MultiSelectContext.Provider>
  );
}

export const MultiSelect = memo(forwardRef(BaseMultiSelect));
MultiSelect.displayName = 'MultiSelect';

// Exporting react-stately's Item with custom props/naming and Section with custom naming to align with other components
export const MultiSelectItem = Item as (props: MultiSelectItemProps) => JSX.Element;
export { Section as MultiSelectSection } from 'react-stately';
