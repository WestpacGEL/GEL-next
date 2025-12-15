import React from 'react';

import type { AriaPopoverProps } from 'react-aria';

export type MultiSelectPopoverProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<AriaPopoverProps, 'popoverRef' | 'triggerRef'>;
