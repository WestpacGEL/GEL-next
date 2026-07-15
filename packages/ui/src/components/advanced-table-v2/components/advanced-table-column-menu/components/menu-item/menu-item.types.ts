import { Node, TreeState } from 'react-stately';

export type MenuItemProps<T> = {
  item: Node<T>;
  state: TreeState<T>;
};
