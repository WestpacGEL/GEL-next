import { ReactNode } from 'react';
import { type ItemProps } from 'react-stately';

export type AutocompleteItemProps<T = any> = ItemProps<T> & {
  /**
   * Autocomplete.Item body content
   */
  children?: ReactNode;
};
