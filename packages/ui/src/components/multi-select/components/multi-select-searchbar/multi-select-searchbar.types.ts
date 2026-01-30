import { ButtonRef } from '../../../../components/button/button.types.js';

export type MultiSelectSearchbarProps = {
  filterText: string;
  setFilterText: (text: string) => void;
  closeBtnRef: React.RefObject<ButtonRef>;
};
