import { type Node } from '@react-types/shared';
import { type ListState } from 'react-stately';

export type AutocompleteListBoxOptionProps<T = any> = {
  item: Node<T>;
  state: ListState<T>;
};
