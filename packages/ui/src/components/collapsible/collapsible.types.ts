import { HTMLAttributes } from 'react';

import { ButtonProps } from '../button/index.js';

export type CollapsibleProps = {
  /**
   * A function for the onClick event
   */
  onClick?: () => unknown;
  /**
   * State of whether the Collapsible is open
   */
  open?: boolean;
  /**
   * Button text
   */
  text: string;
} & Pick<ButtonProps, 'size'> &
  HTMLAttributes<Element>;
