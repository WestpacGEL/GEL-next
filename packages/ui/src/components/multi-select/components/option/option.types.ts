import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type OptionProps = {
  filterText?: string;
  item: Node<unknown>;
  state: ListState<unknown>;
};
