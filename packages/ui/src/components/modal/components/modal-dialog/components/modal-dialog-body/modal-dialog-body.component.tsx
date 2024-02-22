import React from 'react';

import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalBodyStyles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

export function ModalDialogBody({ className, children, ...props }: ModalDialogBodyProps) {
  const { size } = useModalDialogContext();
  const styles = modalBodyStyles({ size });
  return (
    <div className={styles.base({ className })} {...props}>
      {children}
    </div>
  );
}
