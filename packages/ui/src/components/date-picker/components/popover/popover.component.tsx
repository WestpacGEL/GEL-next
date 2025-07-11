import React, { useRef } from 'react';
import { DismissButton, Overlay, useDialog, usePopover } from 'react-aria';

import { PopoverProps } from './popover.types.js';

export function Popover({ state, children, ...props }: PopoverProps) {
  const ref = useRef(null);
  const { popoverProps, underlayProps } = usePopover({ ...props, popoverRef: ref }, state);

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div {...popoverProps} ref={ref} className="absolute border border-border bg-white shadow-sm">
        <DismissButton onDismiss={() => state.close()} />
        {children}
      </div>
    </Overlay>
  );
}
