import { clsx } from 'clsx';
import { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { PopoverProps } from './popover.types';

export function Popover(props: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        className={clsx('z-10 bg-white shadow-[rgba(0,0,0,0.24)_0_8px_8px]', className)}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
