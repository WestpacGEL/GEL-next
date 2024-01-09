import { HTMLAttributes } from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

import { ButtonProps } from '../../../button/index.js';

export type ButtonDropdownPanelProps = {
  /**
   * State for the panel
   */
  state: OverlayTriggerState;
} & HTMLAttributes<Element> &
  Omit<AriaPopoverProps, 'popoverRef'> &
  Pick<ButtonProps, 'block'>;
