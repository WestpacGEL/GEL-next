import { type Node } from '@react-types/shared';
import * as React from 'react';
import { useOption } from 'react-aria';
import { type ListState } from 'react-stately';

import { styles } from './list-box-option.styles.js';

interface OptionProps<T = any> {
  item: Node<T>;
  state: ListState<T>;
}

export function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null);

  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  return (
    <li {...optionProps} ref={ref} className={styles({ isFocused, isSelected, isDisabled })}>
      {item.rendered}
    </li>
  );
}
