'use client';

import React, { useContext, useMemo } from 'react';
import { DismissButton, mergeProps, Overlay, usePopover } from 'react-aria';

import { MultiSelectContext } from '../../multi-select.component.js';

import { styles as popoverStyles } from './multi-select-popover.styles.js';

import type { MultiSelectPopoverProps } from './multi-select-popover.types.js';

export function MultiSelectPopover({ children, className, ...props }: MultiSelectPopoverProps) {
  const { overlayState, overlayProps, popoverRef, buttonRef, placement, portalContainer } =
    useContext(MultiSelectContext);

  const { popoverProps } = usePopover(
    {
      ...props,
      placement: placement || 'bottom left',
      popoverRef,
      triggerRef: buttonRef,
      isNonModal: true,
      shouldFlip: true,
      shouldCloseOnInteractOutside: () => false, // need to manage accessibility manually due to complexity of component
      offset: 6,
    },
    overlayState,
  );

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

  const styles = popoverStyles();

  return (
    <Overlay disableFocusManagement portalContainer={portalContainer || brandContainer}>
      <div
        {...mergeProps(popoverProps, overlayProps)}
        ref={popoverRef}
        className={styles.overlay({ className })}
        onBlur={e => {
          const related = e.relatedTarget as Element | null;
          if (!popoverRef?.current) return;
          // keep open if focus moved to an element inside the popover
          if (related && popoverRef.current.contains(related)) return;
          // keep open if focus moved to the trigger button (so it doesn't open instantly on press)
          if (related && buttonRef?.current && buttonRef.current.contains(related)) return;
          overlayState.close();
        }}
        // Closes the dropdown when using keyboard navigation
        onKeyDown={e => {
          if (e.key === 'Tab' || e.key === 'Escape') {
            overlayState.close();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Options list with filter"
      >
        {children}
        <DismissButton onDismiss={() => overlayState.close()} />
      </div>
    </Overlay>
  );
}
