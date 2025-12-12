'use client';

import React, { useCallback, KeyboardEvent, useContext } from 'react';

import { Button } from '../../../../components/button/index.js';
import { ClearIcon, SearchIcon } from '../../../../components/icon/index.js';
import { InputGroup } from '../../../../components/input-group/index.js';
import { Input } from '../../../input/index.js';
import { MultiSelectListBox } from '../../components/multi-select-list-box/multi-select-list-box.component.js';
import { MultiSelectContext } from '../../multi-select.component.js';
import { MultiSelectPopover } from '../multi-select-popover/multi-select-popover.component.js';

import { styles as dropdownStyles } from './multi-select-dropdown.styles.js';
import { MultiSelectDropdownProps } from './multi-select-dropdown.types.js';

export function MultiSelectDropdown<T extends object = object>({
  setFilterText,
  ...props
}: MultiSelectDropdownProps<T>) {
  const { filterText, size, overlayState, selectAllRef, listBoxRef, inputRef } = useContext(MultiSelectContext);
  const styles = dropdownStyles({});

  // Need to manually handle keyboard accessibility due to component complexity
  const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectAllRef.current) {
        selectAllRef.current.focus();
      } else {
        const firstItem = listBoxRef.current?.querySelector('[data-key]') as HTMLElement;
        firstItem.focus();
      }
    }
  }, []);

  return (
    <MultiSelectPopover className={styles.popover()}>
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
                  className={styles.clearButton()}
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
            tabIndex={-1}
          />
        </InputGroup>
      </div>
      <MultiSelectListBox {...props} aria-label="multiselect list" escapeKeyBehavior="none" listBoxRef={listBoxRef} />
    </MultiSelectPopover>
  );
}
