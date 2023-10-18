import { type HTMLAttributes } from 'react';
import { type AriaRadioProps } from 'react-aria';

import { type FlexiCellProps } from '../../../../../../index.js';

export type SelectorRadioGroupOptionProps = {
  /**
   * Check icon to render
   */
  checkIcon?: 'checkbox' | 'arrow';
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & FlexiCellProps &
  AriaRadioProps &
  HTMLAttributes<Element>;
