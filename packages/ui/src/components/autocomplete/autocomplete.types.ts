import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { FormHintProps } from '../index.js';

import { styles } from './autocomplete.styles.js';
import { PopoverProps } from './components/index.js';

export type AutocompleteProps<T extends object> = {
  /**
   * error message
   */
  errorMessage?: string | string[];
  /**
   * Tag to render
   */
  footer?: ReactNode;
  /**
   * hint message
   */
  hintMessage?: FormHintProps['children'];
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: PopoverProps['portalContainer'];
} & VariantProps<typeof styles> &
  ComboBoxProps<T> &
  AriaLabelingProps;
