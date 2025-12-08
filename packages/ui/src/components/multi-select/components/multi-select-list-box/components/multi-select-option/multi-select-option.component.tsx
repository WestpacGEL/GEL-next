import React, { useRef } from 'react';
import { useFocusVisible, useOption } from 'react-aria';

import { TickIcon } from '../../../../../icon/index.js';

import { styles as optionStyles } from './multi-select-option.styles.js';
import { MultiSelectOptionProps } from './multi-select-option.types.js';

export function MultiSelectOption<T>({ selectionMode, item, state }: MultiSelectOptionProps<T>) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption({ key: item.key }, state, ref);
  const { isFocusVisible } = useFocusVisible();

  const styles = optionStyles({
    selected: isSelected,
    disabled: isDisabled,
    selectionMode,
    isFocusVisible: isFocused && isFocusVisible,
  });

  return (
    <li {...optionProps} ref={ref} className={styles.root()}>
      <div className="flex gap-1">
        <div className={styles.flexZero()}>
          <div className={styles.checkbox()}>{isSelected && <TickIcon size="small" aria-hidden="true" />}</div>
        </div>
        <div className={styles.body()}>
          <div>{item.rendered}</div>
        </div>
      </div>
      {item.props?.description && (
        <div className="relative ml-5 typography-body-10 text-text-muted">{item.props.description}</div>
      )}
    </li>
  );
}
