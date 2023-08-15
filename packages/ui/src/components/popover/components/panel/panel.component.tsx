import React, { useRef } from 'react';
import { Overlay, mergeProps, useOverlay, usePopover } from 'react-aria';

import { CloseIcon } from '../../../icon/index.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

/**
 * TODO: Match functionality with current GEL
 * Missing: Can't type in text boxes outside of panel while open
 * Missing: Can't select text outisde of panel while open
 * Missing: Can't tab select out of panel while open
 */
export function Panel({ children, state, placement = 'top', offset = 15, ...props }: PanelProps) {
  const popoverRef = useRef(null);
  const { overlayProps } = useOverlay({ shouldCloseOnBlur: false }, popoverRef);
  const { popoverProps, arrowProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
      placement,
      // isNonModal will make it so that the popover can't be dismissed by clicking outside of it
      isNonModal: true,
      shouldFlip: false,
    },
    state,
  );
  const styles = panelStyles({ placement });

  return (
    <Overlay>
      <div {...mergeProps(popoverProps, overlayProps)} ref={popoverRef} className={styles.popover()}>
        <CloseIcon color="muted" onClick={state.close} className={styles.closeBtn()} />
        <div {...arrowProps} className={styles.arrow()} />
        {children}
      </div>
    </Overlay>
  );
}
