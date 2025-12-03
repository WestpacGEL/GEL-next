import { Node } from '@react-types/shared';
import React, { useRef, useState, useMemo, useEffect, useCallback, KeyboardEvent, memo } from 'react';
import { mergeProps, useButton, useFilter, useFocusRing, useOverlayTrigger } from 'react-aria';
import { ItemProps, Item, useListState, useOverlayTriggerState } from 'react-stately';

import { ClearIcon, DropDownIcon, SearchIcon } from '../../components/icon/index.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Button } from '../button/button.component.js';
import { Input } from '../input/input.component.js';
import { InputGroup } from '../input-group/input-group.component.js';
import { Tooltip } from '../tooltip/tooltip.component.js';

import { ListBox } from './components/list-box/list-box.component.js';
import { Popover } from './components/popover/popover.component.js';
import { styles as multiSelectStyles } from './multi-select.styles.js';
import { filterNodes } from './utils/filter-nodes.js';

import type { MultiSelectProps, MultiSelectValue } from './multi-select.types.js';

export { Section } from 'react-stately';

export function BaseMultiSelect<T extends MultiSelectValue = MultiSelectValue>({
  size = 'medium',
  listBoxProps,
  selectionMode = 'multiple',
  selectedKeys,
  onSelectionChange,
  ...props
}: MultiSelectProps<T>) {
  const breakpoint = useBreakpoint();
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

  // overlay trigger (useOverlayTrigger gives the props to open/close overlays)
  const { triggerProps } = useOverlayTrigger({ type: 'listbox' }, overlayState, buttonRef);
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const finalButtonProps = mergeProps(props, focusProps, buttonProps);

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

  const styles = multiSelectStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    isFocusVisible,
  });

  // Helper: get an array of selected nodes (for rendering tags)
  const selectedValues = useMemo(() => {
    if (!selectedKeys || typeof selectedKeys === 'string' || (selectedKeys instanceof Set && selectedKeys.size === 0)) {
      return [];
    }

    return [...selectedKeys].map((key: string) => {
      // if (selectionMode === 'single') {
      //   const parentKey = listState.collection.getItem(key)?.parentKey;
      //   console.log(listState.collection.getItem(parentKey ?? '')?.props.title);
      // }

      return listState.collection.getItem(key)?.textValue;
    });
  }, [listState.collection, selectedKeys]);

  const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

  const valuesString = selectedValues.map(node => node || '').join(', ');

  return (
    <div className={styles.root()}>
      <Tooltip tooltip={valuesString}>
        <div className="relative w-full">
          <button className={styles.control()} ref={buttonRef} {...finalButtonProps}>
            {/* Selected items */}
            <div className={styles.selection()}>
              <span className={styles.selectionSpan()}>{valuesString}</span>
            </div>

            {/* dropdown toggle */}
            <div className={styles.button()}>
              <DropDownIcon color="muted" size="small" aria-hidden="true" />
            </div>
          </button>
          {selectedValues.length > 0 && (
            <Button
              className="absolute top-0 right-6.5 bottom-0 flex !h-auto items-center justify-center"
              look="unstyled"
              onClick={() => {
                listState.selectionManager.clearSelection();
              }}
            >
              <ClearIcon className="-mt-0.5" size="small" color="muted" />
            </Button>
          )}
        </div>
      </Tooltip>
      {selectedValues.length > 0 && (
        <p className={styles.hint()}>
          {selectedValues.length} item{selectedValues.length > 1 && 's'} selected
        </p>
      )}

      {/* Popover + ListBox: keep passing state to ListBox — it will use selectionManager */}
      {overlayState.isOpen && (
        <Popover
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
          <ListBox
            {...listBoxProps}
            aria-label="multiselect list"
            escapeKeyBehavior="none"
            selectionMode={selectionMode}
            filterText={filterText}
            listBoxRef={listBoxRef}
            state={listState}
          />
        </Popover>
      )}
    </div>
  );
}
export const MultiSelect = memo(BaseMultiSelect);
export const MultiSelectItem = Item as (props: ItemProps<unknown> & { description?: string }) => JSX.Element;
