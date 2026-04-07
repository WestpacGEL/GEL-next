import { useRef } from 'react';
import { AriaPopoverProps, DismissButton, Overlay, usePopover } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

type PopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: React.ReactNode;
  state: OverlayTriggerState;
  style?: React.CSSProperties;
};

export const MenuPopover = ({ children, state, style, ...props }: PopoverProps) => {
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef, ...(props.isNonModal && { trigger: 'SubmenuTrigger' as const }) },
    state,
  );
  return (
    <Overlay>
      <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{ ...popoverProps.style, ...style }}
        className="flex flex-col border border-border-muted-soft bg-background-white"
      >
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
};
