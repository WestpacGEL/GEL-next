'use client';

import React, { useContext, useRef } from 'react';
import { useFocusVisible, useOption } from 'react-aria';

import { TickIcon } from '../../../../../icon/index.js';
import { MultiSelectContext } from '../../../../multi-select.component.js';

import { styles as optionStyles } from './multi-select-option.styles.js';
import { MultiSelectOptionProps } from './multi-select-option.types.js';

export function MultiSelectOption<T>({ item }: MultiSelectOptionProps<T>) {
  const { listState, selectionMode } = useContext(MultiSelectContext);
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption({ key: item.key }, listState, ref);
  const { isFocusVisible } = useFocusVisible();

  const styles = optionStyles({
    disabled: isDisabled,
    selectionMode,
    isFocusVisible: isFocused && isFocusVisible,
  });

  return (
    <li {...optionProps} ref={ref} className={styles.root()}>
      <div className={styles.itemContainer()}>
        <div className={styles.flexZero()}>
          <div className={styles.checkbox()}>{isSelected && <TickIcon size="small" aria-hidden="true" />}</div>
        </div>
        <div className={styles.body()}>
          <div>{item.rendered}</div>
        </div>
      </div>
      {item.props?.description && <div className={styles.description()}>{item.props.description}</div>}
    </li>
  );
}
