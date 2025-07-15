import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { type AriaPopoverProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: ReactNode;
  className?: string;
  popoverRef?: RefObject<HTMLDivElement>;
  portalContainer?: Element;
  state: OverlayTriggerState;
} & HTMLAttributes<Element>;
