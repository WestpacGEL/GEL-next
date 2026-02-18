'use client';

import React, { useCallback, useContext, useMemo, KeyboardEvent } from 'react';
import { useOption, useFocusRing, mergeProps } from 'react-aria';

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

  // Handle selection change
  const handleSelectionChange = useCallback(() => {
    if (!allItemsAreSelected) {
      // This is because selectAll send a string called 'all' when it is called.
      listState.selectionManager.setSelectedKeys(
        new Set([...listState.selectionManager.selectedKeys, ...listState.selectionManager.collection.getKeys()]),
      );
      return;
    }
    return listState.selectionManager.clearSelection();
  }, [allItemsAreSelected, listState.selectionManager]);

  // Use useOption for accessibility and keyboard nav
  const { optionProps } = useOption(
    {
      key: 'select-all',
    },
    listState,
    selectAllRef,
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = selectAllOptionStyles({
    selected: withOneSelectionOrMore,
    isFocusVisible,
  });

  // Need to manually handle keyboard accessibility due to component complexity
  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstItem = listBoxRef.current?.querySelector('[data-key]') as HTMLElement;
        firstItem?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelectionChange();
      }
    },
    [handleSelectionChange, listBoxRef, inputRef],
  );

  let ariaChecked: 'true' | 'false' | 'mixed';
  if (allItemsAreSelected) {
    ariaChecked = 'true';
  } else if (withOneSelectionOrMore) {
    ariaChecked = 'mixed';
  } else {
    ariaChecked = 'false';
  }

  return (
    <div
      className={styles.listItem()}
      key="select-all"
      {...mergeProps(optionProps, focusProps)}
      ref={selectAllRef}
      onClick={handleSelectionChange}
      onKeyDown={e => {
        handleInputKeyDown(e);
      }}
      role="option"
      aria-checked={ariaChecked}
      aria-label="Select all options"
    >
      <div className={styles.button()}>
        <div className={styles.checkbox()} role="presentation">
          {allItemsAreSelected && <TickIcon size="small" aria-hidden="true" color="hero" />}
          {!allItemsAreSelected && withOneSelectionOrMore && <div className={styles.indeterminate()} />}
        </div>
        <span className={styles.label()}>Select all</span>
      </div>
    </div>
  );
}
