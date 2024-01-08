import { HTMLAttributes, ReactNode } from 'react';

import { ButtonProps } from '../button/index.js';

export type CollapsibleProps = {
  /**
   * Collapsible hidden content
   */
  children?: ReactNode;
  /**
   * A function for the onClick event
   */
  onClick?: () => void;
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
