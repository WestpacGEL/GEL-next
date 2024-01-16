import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { FormHintProps, InputProps } from '../index.js';

import { styles } from './autocomplete.styles.js';
import { PopoverProps } from './components/index.js';

type Variants = VariantProps<typeof styles>;

export type AutocompleteProps<T extends object> = {
  /**
   * className
   */
  className?: string;
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
   * Whether the autocomplete should show a spinner to indicate waiting for data from server
   */
  loadingState?: boolean;
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
  /**
   * Width of autocomplete
   */
  width?: InputProps['width'];
} & ComboBoxProps<T> &
  AriaLabelingProps;
