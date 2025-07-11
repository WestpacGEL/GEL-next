import { HTMLAttributes, ReactNode } from 'react';
import { AriaDialogProps, AriaPopoverProps } from 'react-aria';
import { DateFieldStateOptions, OverlayTriggerState } from 'react-stately';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & { children: ReactNode; state: OverlayTriggerState };
