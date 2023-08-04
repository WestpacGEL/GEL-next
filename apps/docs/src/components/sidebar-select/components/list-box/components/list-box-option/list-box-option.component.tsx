import { type Node } from '@react-types/shared';
import * as React from 'react';
import { useOption } from 'react-aria';
import { type ListState } from 'react-stately';

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

  let text = 'text-gray-700';

  if (isFocused || isSelected) {
    text = 'text-pink-600';
  } else if (isDisabled) {
    text = 'text-gray-200';
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`flex cursor-pointer items-center justify-between border-t border-t-border bg-white p-2 px-3 transition-colors first:border-t-0 hover:bg-light focus:bg-light ${
        isFocused ? 'bg-light' : ''
      } ${isSelected ? 'text-primary' : ''}`}
    >
      {item.rendered}
    </li>
  );
}
