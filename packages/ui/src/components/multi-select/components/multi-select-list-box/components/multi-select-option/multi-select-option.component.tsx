'use client';

import React, { useCallback, useContext, useRef, KeyboardEvent } from 'react';
import { mergeProps, useFocusRing, useOption } from 'react-aria';

import { TickIcon } from '../../../../../icon/index.js';
import { MultiSelectContext } from '../../../../multi-select.component.js';

import { styles as optionStyles } from './multi-select-option.styles.js';
import { MultiSelectOptionProps } from './multi-select-option.types.js';

export function MultiSelectOption<T>({ item }: MultiSelectOptionProps<T>) {
  const { listState, selectAllRef, inputRef } = useContext(MultiSelectContext);
  const selectionMode = listState.selectionManager.selectionMode;
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected } = useOption({ key: item.key }, listState, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = optionStyles({
    disabled: isDisabled,
    selectionMode,
    isFocusVisible,
  });

  // Need to manually handle keyboard accessibility due to component complexity
  const handleButtonKeyDown = useCallback(
    (e: KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'ArrowUp' && item.index === 0) {
        e.preventDefault();
        if (selectAllRef.current) {
          selectAllRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        listState.selectionManager.toggleSelection(item.key);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listState.selectionManager],
  );

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      className={styles.root()}
      onKeyDown={handleButtonKeyDown}
      aria-checked={selectionMode === 'multiple' ? isSelected : undefined}
      aria-selected={selectionMode === 'single' ? isSelected : undefined}
      tabIndex={0}
    >
      <div className={styles.itemContainer()}>
        <div className={styles.flexZero()}>
          <div className={styles.checkbox()}>
            {isSelected && <TickIcon size="small" aria-hidden="true" color="hero" />}
          </div>
        </div>
        <div className={styles.body()}>{item.rendered}</div>
      </div>
      {item.props?.description && <div className={styles.description()}>{item.props.description}</div>}
    </li>
  );
}
