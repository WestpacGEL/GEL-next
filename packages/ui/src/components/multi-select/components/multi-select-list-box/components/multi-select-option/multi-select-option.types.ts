import { MultiSelectProps } from '../../../../multi-select.types.js';

import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type MultiSelectOptionProps<T = unknown> = {
  selectionMode: MultiSelectProps['selectionMode'];
  // item is a react-stately Node for the given item value type T.
  // props.description is optional and may not exist for all item types, so keep it optional.
  item: Omit<Node<T>, 'props'> & { props?: { description?: string } };
  state: ListState<T>;
};
