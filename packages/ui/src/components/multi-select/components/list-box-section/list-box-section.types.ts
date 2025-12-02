import { MultiSelectProps } from '../../multi-select.types.js';

import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type SectionProps<T = unknown> = {
  selectionMode: MultiSelectProps['selectionMode'];
  section: Node<T>;
  state: ListState<T>;
};
