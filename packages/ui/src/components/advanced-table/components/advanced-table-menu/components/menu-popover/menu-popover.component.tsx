import { useRef } from 'react';
import { AriaPopoverProps, DismissButton, Overlay, usePopover } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: React.ReactNode;
  state: OverlayTriggerState;
};

export const MenuPopover = ({ children, state, ...props }: PopoverProps) => {
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps } = usePopover({ ...props, popoverRef }, state);
  return (
    <Overlay>
      <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{ ...popoverProps.style, background: 'lightgray', border: '1px solid gray' }}
        className="p-3 flex flex-col gap-2"
      >
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
};
