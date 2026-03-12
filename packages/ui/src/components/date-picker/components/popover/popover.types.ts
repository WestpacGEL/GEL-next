import { ReactNode } from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: ReactNode;
  showAsBottomSheet?: boolean;
  state: OverlayTriggerState;
  portalContainer?: Element;
};
