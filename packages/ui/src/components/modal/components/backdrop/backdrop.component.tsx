import React, { useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { styles as backdropStyles } from './backdrop.styles.js';
import { type BackdropProps } from './backdrop.types.js';

export function Backdrop({ zIndex = 100, ...props }: BackdropProps) {
  const { children, state, className } = props;

  const ref = useRef(null);
  const styles = backdropStyles({ className });

  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  // Don't render anything if the modal is not open and we're not animating out.
  if (!state.isOpen) {
    return null;
  }

  return (
    // Animate opacity and backdrop blur of underlay
    <Overlay>
      <div style={{ zIndex }} className={styles.base()} {...underlayProps}>
        {/* Animate modal slightly upward when entering, and downward when exiting. */}
        <div {...modalProps} ref={ref} className={styles.modal()}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}
