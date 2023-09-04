import { clsx } from 'clsx';
import * as React from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { PopoverProps } from './popover.types.js';

export function Popover(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal } = props;
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}

      <div
        {...popoverProps}
        ref={popoverRef}
        className={clsx('z-10 border border-border bg-white shadow-lg', className)}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
