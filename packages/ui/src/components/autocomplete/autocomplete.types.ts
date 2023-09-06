import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './autocomplete.styles.js';
import { PopoverProps } from './components/index.js';

export type AutocompleteProps<T extends object> = {
  /**
   * Tag to render
   */
  footer?: ReactNode;
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: PopoverProps['portalContainer'];
} & VariantProps<typeof styles> &
  ComboBoxProps<T> &
  AriaLabelingProps;
