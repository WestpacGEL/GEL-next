import { HTMLAttributes } from 'react';
import { AriaListBoxOptions } from 'react-aria';
import { ListState } from 'react-stately';

export type AutocompleteListBoxProps = AriaListBoxOptions<unknown> & {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
} & HTMLAttributes<Element>;
