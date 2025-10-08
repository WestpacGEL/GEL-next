'use client';
import React, { useMemo, useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { styles as backdropStyles } from './modal-backdrop.styles.js';
import { type ModalBackdropProps } from './modal-backdrop.types.js';

/**
 * @private
 */
export function ModalBackdrop({ zIndex = 100, portalContainer, size, ...props }: ModalBackdropProps) {
  const { children, state, className } = props;

  const ref = useRef(null);
  const styles = backdropStyles({ fullscreen: size === 'full', fluid: size === 'fluid' });

  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  // This is required so branding applies correctly by default due to portal location, can be overridden with portalContainer prop
  const brandContainer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        document.querySelector('[data-theme]') ||
        document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
        document.body
      );
    }
  }, []);

  // Don't render anything if the modal is not open and we're not animating out.
  if (!state.isOpen) {
    return null;
  }

  return (
    <Overlay portalContainer={portalContainer || brandContainer}>
      <div className={styles.base({ className })} style={{ zIndex }} {...underlayProps}>
        <div {...modalProps} ref={ref} className={styles.modal()}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}
