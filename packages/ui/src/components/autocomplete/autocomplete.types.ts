import { type ComboBoxProps } from '@react-types/combobox';
import { type AriaLabelingProps } from '@react-types/shared';
import { type ReactNode } from 'react';
import { ComboBoxState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { HintProps, InputProps } from '../index.js';

import { styles } from './autocomplete.styles.js';
import { AutocompletePopoverProps } from './components/index.js';

type Variants = VariantProps<typeof styles>;

export type AutocompleteProps<T extends object> = {
  /**
   * <AutocompleteItem /> as a collection
   */
  children?: ComboBoxProps<T>['children'];
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
  hintMessage?: HintProps['children'];
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
   * Name for input for forms
   */
  name?: string;
  /**
   * No option message
   */
  noOptionsMessage?: ReactNode;
  /**
   * Element where the popover will be rendered, by default it will be into the body
   */
  portalContainer?: AutocompletePopoverProps['portalContainer'];
  /**
   * Size of autocomplete
   */
  size?: Variants['size'];
  /**
   * Width of autocomplete
   */
  width?: InputProps['width'];
  /**
   * Pass through comboBox state from consuming component. If not specified,
   * will be handled internally.
   */
  comboBoxState?: ComboBoxState<T>;
} & ComboBoxProps<T> &
  AriaLabelingProps;
