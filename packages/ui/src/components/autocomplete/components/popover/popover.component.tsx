import { clsx } from 'clsx';
import * as React from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { PopoverProps } from './popover.types.js';

export function Popover(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal, portalContainer } = props;
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  const width = props.triggerRef.current?.getBoundingClientRect().width;
  return (
    <Overlay portalContainer={portalContainer}>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}

      <div
        {...popoverProps}
        style={{ ...popoverProps.style, width: width ? `${width}px` : undefined }}
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
