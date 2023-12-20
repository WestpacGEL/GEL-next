import { ButtonHTMLAttributes } from 'react';

import { type FlexiCellProps } from '../../../../../flexi-cell/index.js';

export type SelectorButtonGroupOptionProps = {
  /**
   * Unique ID used for toggling button
   */
  id: string;
  /**
   * Whether option isDisabled
   */
  isDisabled?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & ButtonHTMLAttributes<Element> &
  Omit<FlexiCellProps, 'dualAction' | 'href'>;
