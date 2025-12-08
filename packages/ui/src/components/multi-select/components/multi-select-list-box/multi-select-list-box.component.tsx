import React, { useRef } from 'react';
import { useListBox } from 'react-aria';

import { MultiSelectListBoxSection } from './components/multi-select-list-box-section/multi-select-list-box-section.component.js';
import { MultiSelectOption } from './components/multi-select-option/multi-select-option.component.js';
import { MultiSelectSelectAllOption } from './components/multi-select-select-all-option/multi-select-select-all-option.component.js';
import { styles as listBoxStyles } from './multi-select-list-box.styles.js';

import type { MultiSelectListBoxProps } from './multi-select-list-box.types.js';

export function MultiSelectListBox<T>({ filterText, ...props }: MultiSelectListBoxProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, selectionMode } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  const styles = listBoxStyles({ hasSection: [...state.collection].some(item => item.type === 'section') });

  const stateCollection = [...state.collection];

  return (
    <div className="max-h-72 overflow-auto">
      {selectionMode === 'multiple' && stateCollection.length > 0 && <MultiSelectSelectAllOption state={state} />}
      <ul {...listBoxProps} ref={listBoxRef} className={styles.ul()}>
        {stateCollection.length > 0 ? (
          [...state.collection].map(item =>
            item.type === 'section' ? (
              <MultiSelectListBoxSection selectionMode={selectionMode} key={item.key} section={item} state={state} />
            ) : (
              <MultiSelectOption selectionMode={selectionMode} key={item.key} item={item} state={state} />
            ),
          )
        ) : (
          <p className="px-2 py-4 typography-body-9 text-text-body">No items found</p>
        )}
      </ul>
    </div>
  );
}
