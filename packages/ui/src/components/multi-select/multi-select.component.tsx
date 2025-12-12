'use client';

import { Node } from '@react-types/shared';
import React, { useRef, useState, useEffect, useCallback, memo, createContext } from 'react';
import { useFilter } from 'react-aria';
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
});

export function BaseMultiSelect<T extends MultiSelectValue = MultiSelectValue>({
  size = 'medium',
  listBoxProps,
  selectionMode = 'multiple',
  selectedKeys,
  onSelectionChange,
  placeholder = 'Select',
  showSingleSectionTitle = false,
  placement,
  ...props
}: MultiSelectProps<T>) {
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);

  const overlayState = useOverlayTriggerState({
    onOpenChange: isOpen => {
      if (isOpen) {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    },
  });

  // React Aria does not check for escape key press unless panel is focused so this is needed
  const keyHandler = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      if (overlayState.isOpen && event.key === 'Escape') overlayState.close();
    },
    [overlayState],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = multiSelectStyles({});

  return (
    <MultiSelectContext.Provider
      value={{
        selectedKeys,
        selectionMode,
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
      }}
    >
      <div className={styles.root()}>
        <MultiSelectListBoxTrigger
          placeholder={placeholder}
          selectedKeys={selectedKeys}
          showSingleSectionTitle={showSingleSectionTitle}
        />
        {overlayState.isOpen && <MultiSelectDropdown setFilterText={setFilterText} {...listBoxProps} />}
      </div>
    </MultiSelectContext.Provider>
  );
}
export const MultiSelect = memo(BaseMultiSelect);

// Exporting react-stately's Item with custom props/naming and Section with custom naming to align with other components
export const MultiSelectItem = Item as (props: MultiSelectItemProps) => JSX.Element;
export { Section as MultiSelectSection } from 'react-stately';
