import React, { useMemo, useRef } from 'react';
import { useListBox, useOption } from 'react-aria';

import { TickIcon } from '../../../../components/icon/index.js';
import { ListBoxSection } from '../list-box-section/list-box-section.component.js';
import { Option } from '../option/option.component.js';

import { styles as listBoxStyles } from './list-box.styles.js';

import type { ListBoxProps } from './list-box.types.js';

export function ListBox({ filterText, ...props }: ListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, selectionMode } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  const refSelectAll = useRef<HTMLLIElement>(null);
  const selectAllKey = 'select-all';
  const { optionProps, isFocused } = useOption(
    {
      key: selectAllKey,
      isDisabled: false,
      isSelected: false,
      shouldSelectOnPressUp: true,
    },
    state,
    refSelectAll,
  );
  const styles = listBoxStyles();

  const allItemsAreSelected = useMemo(() => state.selectionManager.isSelectAll, [state.selectionManager.isSelectAll]);

  const withOneSelectionOrMore = useMemo(
    () => !![...state.selectionManager.selectedKeys].length,
    [state.selectionManager.selectedKeys],
  );

  const stateCollection = [...state.collection];

  return (
    <div className="overflow-auto">
      {selectionMode === 'multiple' && stateCollection.length > 0 && (
        <li
          className={`border-b border-b-border-muted-soft ${isFocused ? 'bg-background-faint-pale' : ''}`}
          {...optionProps}
        >
          <button
            className="flex w-full cursor-pointer items-center gap-1 p-2"
            onClick={() => {
              if (!allItemsAreSelected) {
                // This is because selectAll send a string called 'all' when it is called.
                state.selectionManager.setSelectedKeys(state.selectionManager.collection.getKeys());
                return;
              }
              return state.selectionManager.clearSelection();
            }}
            // tabIndex={1}
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
      )}
      <ul {...listBoxProps} ref={listBoxRef} className={styles.ul()}>
        {stateCollection.length > 0 ? (
          [...state.collection].map(item =>
            item.type === 'section' ? (
              <ListBoxSection selectionMode={selectionMode} key={item.key} section={item} state={state} />
            ) : (
              <Option selectionMode={selectionMode} key={item.key} item={item} state={state} />
            ),
          )
        ) : (
          <p className="px-2 py-4 typography-body-9 text-text-body">No items found</p>
        )}
      </ul>
    </div>
  );
}
