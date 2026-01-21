'use client';

import { Node } from '@react-types/shared';
import React, { useRef, useState, memo, createContext } from 'react';
import { useFilter, useOverlayTrigger } from 'react-aria';
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
  id,
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
        overlayProps,
      }}
    >
      <div className={styles.root()} id={id}>
        <MultiSelectListBoxTrigger
          placeholder={placeholder}
          selectedKeys={selectedKeys}
          showSingleSectionTitle={showSingleSectionTitle}
          triggerProps={triggerProps}
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
