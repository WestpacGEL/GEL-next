import { ReactNode } from 'react';

import { ButtonProps } from '../button/index.js';

export type PopoverProps = {
  /**
   * Body text for popover box
   */
  children: ReactNode;
  /**
   * Heading for popover box
   */
  heading?: string;
  /**
   * Button text
   */
  label?: string;
  /**
   * Placement of popover
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
} & Pick<ButtonProps, 'look' | 'iconAfter'>;
