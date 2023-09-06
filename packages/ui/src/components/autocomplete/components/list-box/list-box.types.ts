import { HTMLAttributes } from 'react';
import { AriaListBoxOptions } from 'react-aria';
import { ListState } from 'react-stately';

export type ListBoxProps<T = any> = AriaListBoxOptions<T> & {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<T>;
} & HTMLAttributes<Element>;
