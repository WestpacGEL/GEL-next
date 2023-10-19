import { type AriaCheckboxGroupItemProps } from 'react-aria';

import { FlexiCellProps } from '../../../../../index.js';

export type SelectorCheckboxGroupOptionProps = {
  /**
   * Check icon to render
   */
  checkIcon?: 'checkbox' | 'arrow';
} & FlexiCellProps &
  Omit<AriaCheckboxGroupItemProps, 'isIndeterminate'>;
