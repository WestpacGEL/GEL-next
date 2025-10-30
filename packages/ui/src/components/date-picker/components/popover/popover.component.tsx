import React, { useRef } from 'react';
import { Overlay, usePopover } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { styles as popoverStyles } from './popover.styles.js';
import { PopoverProps } from './popover.types.js';

/**
 * @private
 */
export function Popover({ state, portalContainer, children, showAsBottomSheet, ...props }: PopoverProps) {
  const ref = useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    { ...props, popoverRef: ref, containerPadding: 0, offset: 0 },
    state,
  );
  const styles = popoverStyles({ showAsBottomSheet });

  return (
    <Overlay portalContainer={portalContainer}>
      <div {...underlayProps} className={styles.underlay()} />
      <div {...popoverProps} ref={ref} className={styles.popover()}>
        <div className={styles.header()}>
          <p className={styles.headerLabel()}>Choose a date</p>
          <Button
            iconBefore={CloseIcon}
            look="link"
            onClick={() => state.close()}
            aria-label="Close window"
            className={styles.closeButton()}
          />
        </div>
        {children}
      </div>
    </Overlay>
  );
}
