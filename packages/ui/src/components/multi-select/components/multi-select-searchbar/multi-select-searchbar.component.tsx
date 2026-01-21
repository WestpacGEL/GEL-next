import React from 'react';
import { Button } from '../../../../components/button/index.js';
import { ClearIcon, SearchIcon } from '../../../../components/icon/index.js';
import { InputGroup } from '../../../../components/input-group/index.js';
import { Input } from '../../../input/index.js';
import { styles } from './multi-select-searchbar.styles.js';
const { searchInputWrapper, clearButton } = styles();
import type { MultiSelectSearchbarProps } from './multi-select-searchbar.types.js';
import { useContext, useCallback } from 'react';
import { MultiSelectContext } from '../../multi-select.component.js';

export function MultiSelectSearchbar({ filterText, setFilterText, closeBtnRef }: Pick<MultiSelectSearchbarProps, 'filterText' | 'setFilterText' | 'closeBtnRef'>) {
  const { size, inputRef, selectAllRef, listBoxRef } = useContext(MultiSelectContext);
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectAllRef.current) {
          selectAllRef.current.focus();
        } else {
          const firstItem = listBoxRef.current?.querySelector('[data-key]') as HTMLElement;
          firstItem?.focus();
        }
      }
      if (e.key === 'Escape' && filterText.length > 0) {
        e.stopPropagation();
        setFilterText('');
      }
      if (e.key === 'Tab' && filterText.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        closeBtnRef.current?.focus();
      }
    },
    [filterText.length, setFilterText, selectAllRef, listBoxRef, closeBtnRef],
  );
  return (
    <div className={searchInputWrapper()}>
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
                className={clearButton()}
                ref={closeBtnRef}
                aria-label="Clear filter text"
              >
                <ClearIcon color="muted" size="small" />
              </Button>
            ),
          }
        }
        aria-label="Filter options"
      >
        <Input
          ref={inputRef}
          size={size}
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          tabIndex={-1}
        />
      </InputGroup>
    </div>
  );
}
