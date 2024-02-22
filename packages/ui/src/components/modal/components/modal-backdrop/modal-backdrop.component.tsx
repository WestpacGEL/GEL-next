import React, { useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { styles as backdropStyles } from './modal-backdrop.styles.js';
import { type ModalBackdropProps } from './modal-backdrop.types.js';

/**
 * @private
 */
export function ModalBackdrop({ zIndex = 100, portalContainer, size, ...props }: ModalBackdropProps) {
  const { children, state, className } = props;

  const ref = useRef(null);
  const styles = backdropStyles({ className, fullscreen: size === 'full', fluid: size === 'fluid' });

  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  // Don't render anything if the modal is not open and we're not animating out.
  if (!state.isOpen) {
    return null;
  }

  return (
    <Overlay portalContainer={portalContainer}>
      <div style={{ zIndex }} className={styles.base()} {...underlayProps}>
        <div {...modalProps} ref={ref} className={styles.modal()}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}
