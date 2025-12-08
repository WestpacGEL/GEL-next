import React, { useRef } from 'react';
import { useOverlay, DismissButton, Overlay, usePopover } from 'react-aria';

import { styles as popoverStyles } from './multi-select-popover.styles.js';

import type { MultiSelectPopoverProps } from './multi-select-popover.types.js';

export function MultiSelectPopover(props: MultiSelectPopoverProps) {
  const { state, children, className, isNonModal, popoverRef: externalRef, ...otherProps } = props;

  // Use provided ref or create our own
  const internalPopoverRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalRef ?? internalPopoverRef;

  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: () => state.close(),
      isDismissable: true, // <-- required for outside click behavior
    },
    popoverRef,
  );

  const { popoverProps, underlayProps } = usePopover(
    {
      ...otherProps,
      popoverRef,
      isNonModal,
      offset: 6,
    },
    state,
  );

  const width = props.triggerRef.current?.getBoundingClientRect().width;
  const styles = popoverStyles();

  return (
    <Overlay>
      {/* Only show underlay when modal. Non-modal uses document listeners. */}
      {!isNonModal && <div {...underlayProps} className={styles.underlay()} />}

      <div
        {...overlayProps}
        {...popoverProps}
        ref={popoverRef}
        className={styles.overlay({ className })}
        style={{ ...popoverProps.style, width: width ? `${width}px` : undefined }}
      >
        {/* Screen reader close button (not for click-outside) */}
        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}
