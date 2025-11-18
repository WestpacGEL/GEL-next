import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useButton, useOverlayTrigger } from 'react-aria';
import { useListState, useOverlayTriggerState } from 'react-stately';

import { DropDownIcon, SearchIcon } from '../../components/icon/index.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Input } from '../input/input.component.js';
import { InputGroup } from '../input-group/input-group.component.js';

import { ListBox } from './components/list-box/list-box.component.js';
import { Popover } from './components/popover/popover.component.js';
import { styles as multiSelectStyles } from './multi-select.styles.js';

import type { MultiSelectProps, MultiSelectValue } from './multi-select.types.js';

export { Item, Section } from 'react-stately';

export function MultiSelect<T extends MultiSelectValue = MultiSelectValue>({
  size = 'medium',
  listBoxProps,
  ...props
}: MultiSelectProps<T>) {
  const breakpoint = useBreakpoint();
  // local filter string for the search input
  const [filterText, setFilterText] = useState('');

  // useListState supports selectionMode: 'multiple' and accepts a filter function
  const listState = useListState<T>({
    ...props,
    selectionMode: 'multiple',
  });
  const overlayState = useOverlayTriggerState({});

  // refs
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listBoxRef = useRef<HTMLUListElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // overlay trigger (useOverlayTrigger gives the props to open/close overlays)
  const { triggerProps } = useOverlayTrigger({ type: 'listbox' }, overlayState, buttonRef);
  const { buttonProps } = useButton(triggerProps, buttonRef);

  // React Aria does not check for escape key press unless panel is focused so this is needed
  const keyHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (overlayState.isOpen && event.key === 'Escape') overlayState.close();
    },
    [overlayState],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    if (overlayState.isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [overlayState.isOpen]);

  const styles = multiSelectStyles({
    size: resolveResponsiveVariant(size, breakpoint),
  });

  // Helper: get an array of selected nodes (for rendering tags)
  const selectedNodes = useMemo(() => {
    const keys = [...listState.selectionManager.selectedKeys];
    return keys.map(key => listState.collection.getItem(key)).filter(key => !!key);
  }, [listState.selectionManager.selectedKeys, listState.collection]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

  return (
    <div className={styles.root()}>
      <button className={styles.control()} ref={buttonRef} {...buttonProps}>
        {/* Selected items */}
        <div className={styles.selection()}>{selectedNodes.map(node => node.textValue || '').join(', ')}</div>

        {/* dropdown toggle */}
        <div className={styles.button()}>
          <DropDownIcon color="muted" size="small" aria-hidden="true" />
        </div>
      </button>
      {selectedNodes.length > 0 && (
        <p className={styles.hint()}>
          {selectedNodes.length} item{selectedNodes.length > 1 && 's'} selected
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
        >
          <div className={styles.searchInputWrapper()}>
            <InputGroup
              before={{
                icon: SearchIcon,
              }}
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
          <ListBox {...listBoxProps} filterText={filterText} listBoxRef={listBoxRef} state={listState} />
        </Popover>
      )}
    </div>
  );
}
