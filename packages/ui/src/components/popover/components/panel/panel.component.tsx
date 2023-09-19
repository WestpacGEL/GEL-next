import React, { useRef } from 'react';
import { Overlay, mergeProps, useOverlay, useOverlayPosition, usePreventScroll } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

/**
 * TODO: Match functionality with current GEL
 */
export function Panel({ children, state, placement = 'top', offset = 15, id, ...props }: PanelProps) {
  const popoverRef = useRef(null);

  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: false,
      isDismissable: false,
      isKeyboardDismissDisabled: false,
    },
    popoverRef,
  );

  const { overlayProps: positionProps, arrowProps } = useOverlayPosition({
    placement: placement,
    offset: offset,
    targetRef: props.triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    shouldUpdatePosition: true,
    onClose: () => null,
    shouldFlip: false,
  });

  usePreventScroll({ isDisabled: true });

  const styles = panelStyles({ placement });

  return (
    <Overlay disableFocusManagement>
      <div {...mergeProps(overlayProps, positionProps)} ref={popoverRef} className={styles.popover()} id={id}>
        <Button
          look="link"
          onClick={state.close}
          className={styles.closeBtn()}
          iconAfter={() => <CloseIcon color="muted" size="small" />}
          tabIndex={2}
        />
        <div {...arrowProps} aria-hidden className={styles.arrow()} />
        <div tabIndex={1}>{children}</div>
      </div>
    </Overlay>
  );
}
