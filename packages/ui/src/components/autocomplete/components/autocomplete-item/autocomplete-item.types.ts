import { ReactNode } from 'react';
import { type ItemProps } from 'react-stately';

export type AutocompleteItemProps<T = HTMLElement> = ItemProps<T> & {
  /**
   * AutocompleteItem body content
   */
  children?: ReactNode;
};
