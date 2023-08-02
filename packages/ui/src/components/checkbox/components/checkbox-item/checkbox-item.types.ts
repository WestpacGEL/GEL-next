import { ReactNode } from 'react';
import { AriaCheckboxGroupItemProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './checkbox-item.styles.js';

export type CheckboxItemProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Renders hint under option, most likely a `string` but could be something else
   */
  hint?: ReactNode;
} & Omit<VariantProps<typeof styles>, 'size' | 'orientation'> &
  Omit<AriaCheckboxGroupItemProps, 'isIndeterminate'>;
