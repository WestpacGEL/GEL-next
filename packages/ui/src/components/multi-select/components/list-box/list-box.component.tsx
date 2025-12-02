import React, { useRef } from 'react';
import { useListBox } from 'react-aria';

import { ListBoxSection } from '../list-box-section/list-box-section.component.js';
import { Option } from '../option/option.component.js';

import { SelectAllOption } from './components/select-all-option/select-all-option.component.js';
import { styles as listBoxStyles } from './list-box.styles.js';

import type { ListBoxProps } from './list-box.types.js';

export function ListBox<T>({ filterText, ...props }: ListBoxProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, selectionMode } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  // const refSelectAll = useRef<HTMLButtonElement>(null);
  // const selectAllKey = 'select-all';
  // const { optionProps, isFocused } = useOption(
  //   {
  //     key: selectAllKey,
  //     isDisabled: false,
  //     isSelected: false,
  //     shouldSelectOnPressUp: true,
  //   },
  //   state,
  //   refSelectAll,
  // );
  const styles = listBoxStyles({ hasSection: [...state.collection].some(item => item.type === 'section') });

  const stateCollection = [...state.collection];

  return (
    <div className="max-h-72 overflow-auto">
      {selectionMode === 'multiple' && stateCollection.length > 0 && <SelectAllOption state={state} />}
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
