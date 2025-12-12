'use client';

import React, { useCallback, useContext, useMemo, KeyboardEvent } from 'react';

import { TickIcon } from '../../../../../icon/index.js';
import { MultiSelectContext } from '../../../../multi-select.component.js';

import { styles as selectAllOptionStyles } from './multi-select-select-all-option.styles.js';

export function MultiSelectSelectAllOption() {
  const { listState, selectAllRef, listBoxRef, inputRef } = useContext(MultiSelectContext);
  const allItemsAreSelected = useMemo(
    () => listState.selectionManager.isSelectAll,
    [listState.selectionManager.isSelectAll],
  );

  const withOneSelectionOrMore = useMemo(
    () => !![...listState.selectionManager.selectedKeys].length,
    [listState.selectionManager.selectedKeys],
  );

  const styles = selectAllOptionStyles({ selected: withOneSelectionOrMore });

  // Need to manually handle keyboard accessibility due to component complexity
  const handleButtonKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstItem = listBoxRef.current?.querySelector('[data-key]') as HTMLElement;
      firstItem.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  const ariaChecked = () => {
    if (allItemsAreSelected) return 'true';
    if (withOneSelectionOrMore) return 'mixed';
    return 'false';
  };

  return (
    <li
      className={styles.listItem()}
      key="select-all"
      itemType="checkbox"
      role="checkbox"
      aria-checked={ariaChecked()}
      aria-label="Select all options"
    >
      <button
        className={styles.button()}
        onClick={() => {
          if (!allItemsAreSelected) {
            // This is because selectAll send a string called 'all' when it is called.
            listState.selectionManager.setSelectedKeys(
              // This makes it so that when filtered select all will add to the currently selected options rather than replacing
              new Set([...listState.selectionManager.selectedKeys, ...listState.selectionManager.collection.getKeys()]),
            );
            return;
          }
          return listState.selectionManager.clearSelection();
        }}
        ref={selectAllRef}
        onKeyDown={handleButtonKeyDown}
        tabIndex={-1}
      >
        <div className={styles.checkbox()}>
          {allItemsAreSelected && <TickIcon size="small" aria-hidden="true" />}
          {!allItemsAreSelected && withOneSelectionOrMore && (
            <div role="presentation" className={styles.indeterminate()} />
          )}
        </div>
        <span>Select all</span>
      </button>
    </li>
  );
}
