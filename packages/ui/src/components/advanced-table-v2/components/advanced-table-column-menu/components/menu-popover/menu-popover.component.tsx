import { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { styles as menuPopoverStyles } from './menu-popover.styles.js';
import { MenuPopoverProps } from './menu-popover.types.js';

export const MenuPopover = ({ children, state, style, ...props }: MenuPopoverProps) => {
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef, ...(props.isNonModal && { trigger: 'SubmenuTrigger' as const }) },
    state,
  );

  const styles = menuPopoverStyles();

  return (
    <Overlay>
      <div {...underlayProps} className={styles.underlay()} />
      <div {...popoverProps} ref={popoverRef} style={{ ...popoverProps.style, ...style }} className={styles.popover()}>
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
};
