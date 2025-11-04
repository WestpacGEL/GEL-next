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
        document.querySelector('[data-theme]') ||
        document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
        document.body
      );
    }
  }, []);

  const width = props.triggerRef.current?.getBoundingClientRect().width;
  return (
    <Overlay portalContainer={portalContainer || brandContainer}>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}

      <div
        {...popoverProps}
        style={{
          ...popoverProps.style,
          width: width ? `${width}px` : undefined,
          maxHeight:
            popoverProps.style?.maxHeight && +popoverProps.style?.maxHeight <= 400
              ? +popoverProps.style.maxHeight
              : 400,
        }}
        ref={popoverRef}
        className={clsx(
          'z-10 my-1 max-h-[400px] overflow-auto rounded-xl border border-border-muted-soft shadow-[0_2px_12px_rgba(0,0,0,0.2)]',
          className,
        )}
      >
        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}
