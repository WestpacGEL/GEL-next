import { ButtonRef } from '../../../../components/button/button.types.js';
import type { MultiSelectSize } from '../multi-select-list-box-trigger/multi-select-list-box-trigger.types.js';

export interface MultiSelectSearchbarProps {
  filterText: string;
  setFilterText: (text: string) => void;
  closeBtnRef: React.RefObject<ButtonRef>;
}
