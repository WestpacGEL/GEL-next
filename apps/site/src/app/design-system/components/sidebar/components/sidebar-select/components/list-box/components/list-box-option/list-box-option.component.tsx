import { type Node } from '@react-types/shared';
import * as React from 'react';
import { mergeProps, useFocusRing, useOption } from 'react-aria';
import { type ListState } from 'react-stately';

import { styles } from './list-box-option.styles';

type OptionProps<T = any> = {
  item: Node<T>;
  state: ListState<T>;
};

export function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { optionProps, isDisabled, isSelected } = useOption(
    {
      key: item.key as string | number,
    },
    state,
    ref,
  );

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      className={styles({ isFocusVisible, isSelected, isDisabled })}
    >
      {item.rendered}
    </li>
  );
}
