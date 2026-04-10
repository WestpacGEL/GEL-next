import { Node, TreeState } from 'react-stately';

export type MenuSectionProps<T extends object> = {
  section: Node<T>;
  state: TreeState<T>;
};
