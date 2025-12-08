import { Node } from '@react-types/shared';
import React, { useRef, useState, useEffect, useCallback, KeyboardEvent, memo, createContext } from 'react';
import { useFilter } from 'react-aria';
import { ItemProps, Item, useListState, useOverlayTriggerState } from 'react-stately';

import { ClearIcon, SearchIcon } from '../../components/icon/index.js';
import { Button } from '../button/button.component.js';
import { Input } from '../input/input.component.js';
import { InputGroup } from '../input-group/input-group.component.js';

import { MultiSelectListBox } from './components/multi-select-list-box/multi-select-list-box.component.js';
import { MultiSelectListBoxProps } from './components/multi-select-list-box/multi-select-list-box.types.js';
import { MultiSelectListBoxTrigger } from './components/multi-select-list-box-trigger/multi-select-list-box-trigger.component.js';
import { MultiSelectPopover } from './components/multi-select-popover/multi-select-popover.component.js';
import { styles as multiSelectStyles } from './multi-select.styles.js';
import { filterNodes } from './utils/filter-nodes.js';

import type { MultiSelectProps, MultiSelectValue } from './multi-select.types.js';

export { Section as MultiSelectSection } from 'react-stately';

// TODO: Break down component more, handle this context better
export const MultiSelectContext = createContext<{
  selectedKeys?: MultiSelectListBoxProps['selectedKeys'];
  selectionMode?: MultiSelectListBoxProps['selectionMode'];
  showSingleSectionTitle?: boolean;
}>({});

export function BaseMultiSelect<T extends MultiSelectValue = MultiSelectValue>({
  size = 'medium',
  listBoxProps,
  selectionMode = 'multiple',
  selectedKeys,
  onSelectionChange,
  placeholder = 'Select',
  showSingleSectionTitle = false,
  ...props
}: MultiSelectProps<T>) {
  // local filter string for the search input
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listBoxRef = useRef<HTMLUListElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

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
    (event: globalThis.KeyboardEvent) => {
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

  const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

  return (
    // <MultiSelectContext.Provider value={{ selectedKeys, selectionMode, showSingleSectionTitle }}>
    <div className={styles.root()}>
      <MultiSelectListBoxTrigger
        size={size}
        placeholder={placeholder}
        listState={listState}
        overlayState={overlayState}
        buttonRef={buttonRef}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        showSingleSectionTitle={showSingleSectionTitle}
      />
      {/* Popover + ListBox: keep passing state to ListBox — it will use selectionManager */}
      {overlayState.isOpen && (
        <MultiSelectPopover
          popoverRef={popoverRef}
          triggerRef={buttonRef}
          state={overlayState}
          isNonModal
          placement="bottom"
          className={styles.popover()}
          shouldFlip
          shouldCloseOnInteractOutside={() => false}
        >
          <div className={styles.searchInputWrapper()}>
            <InputGroup
              before={{
                icon: SearchIcon,
              }}
              after={
                filterText.length > 0 && {
                  inset: true,
                  element: (
                    <Button
                      onClick={() => {
                        setFilterText('');
                        inputRef.current?.focus();
                      }}
                      look="unstyled"
                      className="-mt-0.5 px-2"
                    >
                      <ClearIcon color="muted" size="small" />
                    </Button>
                  ),
                }
              }
            >
              <Input
                ref={inputRef}
                size={size}
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                onFocus={() => overlayState.open()}
                onKeyDown={handleInputKeyDown}
              />
            </InputGroup>
          </div>
          <MultiSelectListBox
            {...listBoxProps}
            aria-label="multiselect list"
            escapeKeyBehavior="none"
            selectionMode={selectionMode}
            filterText={filterText}
            listBoxRef={listBoxRef}
            state={listState}
          />
        </MultiSelectPopover>
      )}
    </div>
    // </MultiSelectContext.Provider>
  );
}
export const MultiSelect = memo(BaseMultiSelect);
export const MultiSelectItem = Item as (props: ItemProps<unknown> & { description?: string }) => JSX.Element;
