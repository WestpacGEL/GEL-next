import React from 'react';

import { styles } from './modal-dialog-body.styles.js';
import { type ModalDialogBodyProps } from './modal-dialog-body.types.js';

export function ModalDialogBody({ className, children, ...props }: ModalDialogBodyProps) {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
}
