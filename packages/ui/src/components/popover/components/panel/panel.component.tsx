import React, { useRef } from 'react';
import {
  DismissButton,
  Overlay,
  mergeProps,
  useFocusManager,
  useOverlay,
  useOverlayPosition,
  usePopover,
  usePreventScroll,
} from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

/**
 * TODO: Match functionality with current GEL
 * Missing: Can't type in text boxes outside of panel while open
 * Missing: Can't select text outisde of panel while open
 * Missing: Can't tab select out of panel while open
 */
export function Panel({ children, state, placement = 'top', offset = 15, id, ...props }: PanelProps) {
  const popoverRef = useRef(null);

  // const { overlayProps } = useOverlay({ isDismissable: false }, popoverRef);

  const { overlayProps, underlayProps } = useOverlay(
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
    onClose: undefined,
    shouldUpdatePosition: true,
  });

  usePreventScroll({ isDisabled: true });

  // const { popoverProps, arrowProps } = usePopover(
  //   {
  //     ...props,
  //     offset,
  //     popoverRef,
  //     placement,
  //     // isNonModal will make it so that the popover can't be dismissed by clicking outside of it
  //     isNonModal: true,
  //     shouldFlip: false,
  //   },
  //   state,
  // );
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
