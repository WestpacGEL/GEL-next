import { MultiSelectProps } from '../../multi-select.types.js';

import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type OptionProps = {
  selectionMode: MultiSelectProps['selectionMode'];
  filterText?: string;
  item: Node<unknown>;
  state: ListState<unknown>;
};
