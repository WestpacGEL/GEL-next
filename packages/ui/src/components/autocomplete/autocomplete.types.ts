import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { FormHintProps } from '../index.js';

import { styles } from './autocomplete.styles.js';
import { PopoverProps } from './components/index.js';

type Variants = VariantProps<typeof styles>;

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
   * Whether autocomplete is invalid
   */
  invalid?: Variants['invalid'];
  /**
   * Whether autocomplete is disabled
   */
  isDisabled?: Variants['isDisabled'];
  /**
   * No option message
   */
  noOptionsMessage?: ReactNode;
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: PopoverProps['portalContainer'];
  /**
   * Size of autocomplete
   */
  size?: Variants['size'];
} & ComboBoxProps<T> &
  AriaLabelingProps;
