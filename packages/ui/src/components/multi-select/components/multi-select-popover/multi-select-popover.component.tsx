'use client';

import React, { useContext } from 'react';
import { useOverlay, DismissButton, Overlay, usePopover } from 'react-aria';

import { MultiSelectContext } from '../../multi-select.component.js';

import { styles as popoverStyles } from './multi-select-popover.styles.js';

import type { MultiSelectPopoverProps } from './multi-select-popover.types.js';

export function MultiSelectPopover({ children, className, ...props }: MultiSelectPopoverProps) {
  const { overlayState, popoverRef, buttonRef, placement } = useContext(MultiSelectContext);

  const { overlayProps } = useOverlay(
    {
      isOpen: overlayState.isOpen,
      onClose: () => overlayState.close(),
      isDismissable: true, // <-- required for outside click behavior
    },
    popoverRef,
  );

  const { popoverProps } = usePopover(
    {
      ...props,
      placement,
      popoverRef,
      triggerRef: buttonRef,
      isNonModal: true,
      shouldFlip: true,
      shouldCloseOnInteractOutside: () => false,
      offset: 6,
    },
    overlayState,
  );

  const width = buttonRef.current?.getBoundingClientRect().width;
  const styles = popoverStyles();

  return (
    <Overlay>
      <div
        {...overlayProps}
        {...popoverProps}
        ref={popoverRef}
        className={styles.overlay({ className })}
        style={{ ...popoverProps.style, width: width ? `${width}px` : undefined }}
      >
        {children}
        <DismissButton onDismiss={() => overlayState.close()} />
      </div>
    </Overlay>
  );
}
