'use client';

import { clsx } from 'clsx';
import React, { useMemo, useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { AutocompletePopoverProps } from './autocomplete-popover.types.js';
/**
 * @private
 */
export function AutocompletePopover(props: AutocompletePopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal, portalContainer } = props;
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  // This is required so branding applies correctly by default due to portal location, can be overridden with portalContainer prop
  const brandContainer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        document.querySelector('[data-theme]') || document.querySelector('[className="data-theme"]') || document.body
      );
    }
  }, []);

  const width = props.triggerRef.current?.getBoundingClientRect().width;
  return (
    <Overlay portalContainer={portalContainer || brandContainer}>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}

      <div
        {...popoverProps}
        style={{ ...popoverProps.style, width: width ? `${width}px` : undefined }}
        ref={popoverRef}
        className={clsx('border-border z-10 max-h-[400px] overflow-auto border bg-white shadow-lg', className)}
      >
        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}
