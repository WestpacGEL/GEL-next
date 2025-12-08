import React from 'react';

import type { AriaPopoverProps } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';

export type MultiSelectPopoverProps = {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
} & Omit<AriaPopoverProps, 'popoverRef'>;
