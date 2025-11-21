import React, { useRef } from 'react';
import { useFocusVisible, useOption } from 'react-aria';

import { TickIcon } from '../../../icon/index.js';

import { styles as optionStyles } from './option.styles.js';
import { OptionProps } from './option.types.js';

export function Option({ selectionMode, item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption({ key: item.key }, state, ref);
  const { isFocusVisible } = useFocusVisible();

  const styles = optionStyles({
    focused: isFocused,
    selected: isSelected,
    disabled: isDisabled,
    selectionMode,
    isFocusVisible: isFocused && isFocusVisible,
  });

  return (
    <li {...optionProps} ref={ref} className={styles.root()}>
      <div className={styles.flexZero()}>
        <div className={styles.checkbox()}>{isSelected && <TickIcon size="small" aria-hidden="true" />}</div>
      </div>
      <div className={styles.body()}>
        <div>{item.rendered}</div>
      </div>
    </li>
  );
}
