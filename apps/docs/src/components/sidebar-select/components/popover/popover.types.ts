import { HTMLAttributes, ReactNode } from 'react';
import { type AriaPopoverProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: ReactNode;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
} & HTMLAttributes<Element>;
