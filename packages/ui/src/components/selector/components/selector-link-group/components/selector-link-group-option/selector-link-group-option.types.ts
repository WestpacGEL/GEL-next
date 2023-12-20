import { AnchorHTMLAttributes } from 'react';
import { AriaLinkOptions } from 'react-aria';

import { type FlexiCellProps } from '../../../../../flexi-cell/index.js';

export type SelectorLinkGroupOptionProps = {
  /**
   * href for link
   */
  href: string;
  /**
   * Whether option isDisabled
   */
  isDisabled?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & Omit<AriaLinkOptions, 'isDisabled' | 'elementType'> &
  Omit<FlexiCellProps, 'dualAction' | 'href'> &
  AnchorHTMLAttributes<Element>;
