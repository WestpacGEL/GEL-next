import type { Node } from '@react-types/shared';

export type MultiSelectOptionProps<T> = {
  // item is a react-stately Node for the given item value type T.
  // props.description is optional and may not exist for all item types, so keep it optional.
  item: Omit<Node<T>, 'props'> & { props?: { description?: string } };
};
