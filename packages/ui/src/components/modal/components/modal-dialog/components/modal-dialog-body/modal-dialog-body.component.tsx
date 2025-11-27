'use client';

import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalBodyStyles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

export function ModalDialogBody({ className, children, ...props }: ModalDialogBodyProps) {
  const { size, scrollingRef, canScroll, compact, footerPresent, scrollAtBottom } = useModalDialogContext();

  const styles = modalBodyStyles({ size, canScroll, scrollAtBottom, compact, footerPresent });

  return (
    <div className={styles.base({ className })} ref={scrollingRef} {...props}>
      {children}
    </div>
  );
}
