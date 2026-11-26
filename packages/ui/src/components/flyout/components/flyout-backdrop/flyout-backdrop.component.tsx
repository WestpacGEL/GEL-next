'use client';

import { useExitAnimation } from '@react-aria/utils';
import React, { useMemo, useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { styles as backdropStyles } from './flyout-backdrop.styles.js';
import { type FlyoutBackdropProps } from './flyout-backdrop.types.js';

/**
 * @private
 */
export function FlyoutBackdrop({
  children,
  className,
  isDismissable = true,
  portalContainer,
  state,
  zIndex = 100,
  ...props
}: FlyoutBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isExiting = useExitAnimation(ref, state.isOpen);
  const styles = backdropStyles({ isOpen: state.isOpen });
  const { modalProps, underlayProps } = useModalOverlay({ isDismissable, ...props }, state, ref);

  // This is required so branding applies correctly by default due to portal location, can be overridden with portalContainer prop
  const brandContainer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        document.querySelector('[data-brand]') ||
        document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
        document.body
      );
    }
  }, []);

  if (!state.isOpen && !isExiting) {
    return null;
  }

  return (
    <Overlay isExiting={isExiting} portalContainer={portalContainer || brandContainer}>
      <div className={styles.base({ className })} style={{ zIndex }} {...underlayProps}>
        {children({ flyoutRef: ref, modalProps })}
      </div>
    </Overlay>
  );
}
