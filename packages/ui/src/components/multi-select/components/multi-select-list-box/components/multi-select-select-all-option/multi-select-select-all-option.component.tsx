import React, { useContext, useMemo } from 'react';

import { TickIcon } from '../../../../../icon/index.js';
import { MultiSelectContext } from '../../../../multi-select.component.js';

import { styles as selectAllOptionStyles } from './multi-select-select-all-option.styles.js';

export function MultiSelectSelectAllOption() {
  const { listState } = useContext(MultiSelectContext);
  const allItemsAreSelected = useMemo(
    () => listState.selectionManager.isSelectAll,
    [listState.selectionManager.isSelectAll],
  );

  const withOneSelectionOrMore = useMemo(
    () => !![...listState.selectionManager.selectedKeys].length,
    [listState.selectionManager.selectedKeys],
  );

  const styles = selectAllOptionStyles({ selected: withOneSelectionOrMore });

  return (
    <li className={styles.listItem()} key="select-all">
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
