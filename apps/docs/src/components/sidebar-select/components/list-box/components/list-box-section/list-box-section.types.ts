import { type Node } from '@react-types/shared';
import { ListState } from 'react-stately';

export type ListBoxSectionProps<T = any> = {
  section: Node<T>;
  state: ListState<T>;
};
