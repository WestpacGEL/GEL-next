import { type Node } from '@react-types/shared';
import * as React from 'react';
import { useOption } from 'react-aria';
import { type ListState } from 'react-stately';

import { styles } from './autocomplete-list-box-option.styles.js';

type AutocompleteListBoxOptionProps<T = unknown> = {
  item: Node<T>;
  state: ListState<T>;
};

/**
 * @private
 */
export function AutocompleteListBoxOption({ item, state }: AutocompleteListBoxOptionProps) {
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
