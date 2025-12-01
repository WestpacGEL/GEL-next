'use client';

import React from 'react';

import { useBreakpoint } from '../../../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../../../utils/breakpoint.util.js';
import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalBodyStyles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

export function ModalDialogBody({ className, children, ...props }: ModalDialogBodyProps) {
  const { size, scrollingRef, canScroll, compact, footerPresent, scrollAtBottom } = useModalDialogContext();
  const breakpoint = useBreakpoint();

  const styles = modalBodyStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    canScroll,
    scrollAtBottom,
    compact,
    footerPresent,
  });

  return (
    <div className={styles.base({ className })} ref={scrollingRef} {...props}>
      {children}
    </div>
  );
}
