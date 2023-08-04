import { HTMLAttributes, ReactNode } from 'react';
import { type AriaPopoverProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './popover.styles.js';

export type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: ReactNode;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
