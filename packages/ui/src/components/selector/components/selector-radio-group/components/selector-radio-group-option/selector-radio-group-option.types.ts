import { type HTMLAttributes } from 'react';
import { type AriaRadioProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { type FlexiCellProps } from '../../../../../../index.js';

import { styles } from './selector-radio-group-option.styles.js';

export type SelectorRadioGroupOptionProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & FlexiCellProps &
  AriaRadioProps &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;
