import { type AriaCheckboxGroupItemProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { FlexiCellProps } from '../../../../../index.js';

import { styles } from './selector-checkbox-group-option.styles.js';

export type SelectorCheckboxGroupOptionProps = {
  /**
   * Check icon to render
   */
  checkIcon?: 'checkbox' | 'arrow';
} & FlexiCellProps &
  VariantProps<typeof styles> &
  Omit<AriaCheckboxGroupItemProps, 'isIndeterminate'>;
