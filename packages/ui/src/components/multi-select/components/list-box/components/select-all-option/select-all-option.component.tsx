import React, { useMemo } from 'react';
import { ListState } from 'react-stately';

import { TickIcon } from '../../../../../../components/icon/index.js';

import { styles as selectAllOptionStyles } from './select-all-option.styles.js';

export function SelectAllOption<T>({ state }: { state: ListState<T> }) {
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
          // TODO: Update this to add whateveris there to the selection instead of replacing it
          if (!allItemsAreSelected) {
            // This is because selectAll send a string called 'all' when it is called.
            state.selectionManager.setSelectedKeys(state.selectionManager.collection.getKeys());
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
