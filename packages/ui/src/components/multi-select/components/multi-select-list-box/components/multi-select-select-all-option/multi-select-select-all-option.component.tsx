'use client';

import React, { useCallback, useContext, useMemo, KeyboardEvent } from 'react';
import { mergeProps, useCheckbox, useFocusRing, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';

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

  // Create toggle state for the checkbox
  const state = useToggleState({
    isSelected: allItemsAreSelected,
    onChange: () => {
      if (!allItemsAreSelected) {
        // This is because selectAll send a string called 'all' when it is called.
        listState.selectionManager.setSelectedKeys(
          // This makes it so that when filtered select all will add to the currently selected options rather than replacing
          new Set([...listState.selectionManager.selectedKeys, ...listState.selectionManager.collection.getKeys()]),
        );
        return;
      }
      return listState.selectionManager.clearSelection();
    },
  });

  // Use React Aria's useCheckbox hook
  const { inputProps, labelProps } = useCheckbox(
    {
      isSelected: allItemsAreSelected,
      isIndeterminate: !allItemsAreSelected && withOneSelectionOrMore,
      'aria-label': 'Select all options',
      onKeyDown: e => handleInputKeyDown(e),
    },
    state,
    selectAllRef,
  );

  // Use React Aria's useFocusRing hook for focus management
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = selectAllOptionStyles({ selected: withOneSelectionOrMore, isFocusVisible });

  // Need to manually handle keyboard accessibility due to component complexity
  const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstItem = listBoxRef.current?.querySelector('[data-key]') as HTMLElement;
      firstItem.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.listItem()} key="select-all">
      <label className={styles.button()} data-focus-visible={isFocusVisible} {...labelProps}>
        <VisuallyHidden elementType="span">
          <input {...mergeProps(inputProps, focusProps)} ref={selectAllRef} />
        </VisuallyHidden>
        <div className={styles.checkbox()} role="presentation">
          {allItemsAreSelected && <TickIcon size="small" aria-hidden="true" color="hero" />}
          {!allItemsAreSelected && withOneSelectionOrMore && <div className={styles.indeterminate()} />}
        </div>
        <span className={styles.label()}>Select all</span>
      </label>
    </div>
  );
}
