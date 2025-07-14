import React, { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { styles as popoverStyles } from './popover.styles.js';
import { PopoverProps } from './popover.types.js';

export function Popover({ state, children, showAsBottomSheet, ...props }: PopoverProps) {
  const ref = useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef: ref, containerPadding: 0, offset: 0 },
    state,
  );
  const styles = popoverStyles({ showAsBottomSheet });

  return (
    <Overlay>
      <div {...underlayProps} className={styles.underlay()} />
      <div {...popoverProps} ref={ref} className={styles.popover()}>
        <DismissButton onDismiss={() => state.close()} />
        {children}
      </div>
    </Overlay>
  );
}
