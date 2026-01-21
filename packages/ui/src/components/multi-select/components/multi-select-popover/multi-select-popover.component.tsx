'use client';

import React, { useContext } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { MultiSelectContext } from '../../multi-select.component.js';

import { styles as popoverStyles } from './multi-select-popover.styles.js';

import type { MultiSelectPopoverProps } from './multi-select-popover.types.js';

export function MultiSelectPopover({ children, className, ...props }: MultiSelectPopoverProps) {
  const { overlayState, overlayProps, popoverRef, buttonRef, placement } = useContext(MultiSelectContext);

  const { popoverProps } = usePopover(
    {
      ...props,
      placement,
      popoverRef,
      triggerRef: buttonRef,
      isNonModal: true,
      shouldFlip: true,
      shouldCloseOnInteractOutside: () => false, // need to manage accessibility manually due to complexity of component
      offset: 6,
    },
    overlayState,
  );

  const width = buttonRef.current?.getBoundingClientRect().width;
  const styles = popoverStyles();

  return (
    <Overlay disableFocusManagement>
      <div
        {...popoverProps}
        {...overlayProps}
        ref={popoverRef}
        className={styles.overlay({ className })}
        style={{ ...popoverProps.style, width: width ? `${width}px` : undefined }}
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
