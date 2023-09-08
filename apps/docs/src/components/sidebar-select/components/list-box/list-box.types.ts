import { HTMLAttributes } from 'react';
import { AriaListBoxOptions } from 'react-aria';
import { ListState } from 'react-stately';

export type ListBoxProps<T = any> = AriaListBoxOptions<T> & {
  /**
   * List box ref from useRef
   */
  listBoxRef?: React.RefObject<HTMLUListElement>;
  /**
   * List state
   */
  state: ListState<T>;
} & HTMLAttributes<Element>;
