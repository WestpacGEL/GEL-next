import { type Node } from '@react-types/shared';
import { ListState } from 'react-stately';

export type AutocompleteListBoxSectionProps<T = any> = {
  section: Node<T>;
  state: ListState<T>;
};
