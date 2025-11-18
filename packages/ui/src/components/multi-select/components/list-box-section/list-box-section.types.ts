import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';

export type SectionProps = {
  filterText?: string;
  section: Node<unknown>;
  state: ListState<unknown>;
};
