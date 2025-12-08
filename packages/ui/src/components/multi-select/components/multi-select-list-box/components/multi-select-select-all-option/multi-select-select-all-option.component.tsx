import React, { useMemo } from 'react';
import { ListState } from 'react-stately';

import { TickIcon } from '../../../../../icon/index.js';

import { styles as selectAllOptionStyles } from './multi-select-select-all-option.styles.js';

export function MultiSelectSelectAllOption<T>({ state }: { state: ListState<T> }) {
  const allItemsAreSelected = useMemo(() => state.selectionManager.isSelectAll, [state.selectionManager.isSelectAll]);

  const withOneSelectionOrMore = useMemo(
    () => !![...state.selectionManager.selectedKeys].length,
    [state.selectionManager.selectedKeys],
  );

  const styles = selectAllOptionStyles({ selected: withOneSelectionOrMore });

  return (
    <li className={styles.listItem()} key="select-all">
      <button
        className={styles.button()}
        onClick={() => {
          if (!allItemsAreSelected) {
            // This is because selectAll send a string called 'all' when it is called.
            state.selectionManager.setSelectedKeys(
              // This makes it so that when filtered select all will add to the currently selected options rather than replacing
              new Set([...state.selectionManager.selectedKeys, ...state.selectionManager.collection.getKeys()]),
            );
            return;
          }
          return state.selectionManager.clearSelection();
        }}
      >
        <div className={styles.checkbox()}>
          {allItemsAreSelected && <TickIcon size="small" aria-hidden="true" />}
          {!allItemsAreSelected && withOneSelectionOrMore && (
            <div role="presentation" className="block w-3/5 border-t-2 border-t-border-muted" />
          )}
        </div>
        <span>Select all</span>
      </button>
    </li>
  );
}
