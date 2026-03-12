import { HTMLAttributes } from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

import { ButtonProps } from '../../../button/index.js';

export type DropdownPanelProps = {
  /**
   * State for the panel
   */
  state: OverlayTriggerState;
  /**
   * Uses portal to render popover
   */
  portalContainer?: Element;
} & HTMLAttributes<Element> &
  Omit<AriaPopoverProps, 'popoverRef'> &
  Pick<ButtonProps, 'block'>;
