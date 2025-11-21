import { MultiSelectProps } from '../../multi-select.types.js';

import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type SectionProps = {
  selectionMode: MultiSelectProps['selectionMode'];
  section: Node<unknown>;
  state: ListState<unknown>;
};
