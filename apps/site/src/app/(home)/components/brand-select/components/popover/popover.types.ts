import { HTMLAttributes } from 'react';
import { type AriaPopoverProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: React.ReactNode;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
  portalContainer?: Element;
  state: OverlayTriggerState;
} & HTMLAttributes<Element>;
