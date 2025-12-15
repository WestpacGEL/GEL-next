'use client';

import React, { useContext } from 'react';
import { useListBox } from 'react-aria';

import { MultiSelectContext } from '../../multi-select.component.js';

import { MultiSelectListBoxSection } from './components/multi-select-list-box-section/multi-select-list-box-section.component.js';
import { MultiSelectOption } from './components/multi-select-option/multi-select-option.component.js';
import { MultiSelectSelectAllOption } from './components/multi-select-select-all-option/multi-select-select-all-option.component.js';
import { styles as listBoxStyles } from './multi-select-list-box.styles.js';

import type { MultiSelectListBoxProps } from './multi-select-list-box.types.js';

export function MultiSelectListBox<T extends object = object>({ listBoxRef, ...props }: MultiSelectListBoxProps<T>) {
  const { listState, selectionMode } = useContext(MultiSelectContext);
  const { listBoxProps } = useListBox({ selectionMode, ...props }, listState, listBoxRef);

  const stateCollection = [...listState.collection];

  const styles = listBoxStyles({ hasSection: stateCollection.some(item => item.type === 'section') });

  return (
    <div className={styles.container()} tabIndex={-1}>
      {selectionMode === 'multiple' && stateCollection.length > 0 && <MultiSelectSelectAllOption />}
      <ul {...listBoxProps} ref={listBoxRef} className={styles.ul()} tabIndex={-1}>
        {stateCollection.length > 0 ? (
          stateCollection.map(item =>
            item.type === 'section' ? (
              <MultiSelectListBoxSection key={item.key} section={item} />
            ) : (
              <MultiSelectOption key={item.key} item={item} />
            ),
          )
        ) : (
          <p className={styles.noItemsText()}>No items found</p>
        )}
      </ul>
    </div>
  );
}
