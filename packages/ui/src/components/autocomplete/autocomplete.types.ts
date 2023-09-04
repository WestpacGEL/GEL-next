import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './autocomplete.styles.js';

export type AutocompleteProps<T extends object> = {
  /**
   * Tag to render
   */
  footer?: ReactNode;
} & VariantProps<typeof styles> &
  ComboBoxProps<T> &
  AriaLabelingProps;
