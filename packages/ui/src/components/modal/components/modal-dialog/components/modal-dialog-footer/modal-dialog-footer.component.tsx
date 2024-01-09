import React from 'react';

import { styles } from './modal-dialog-footer.styles.js';
import { type ModalDialogFooterProps } from './modal-dialog-footer.types.js';

export function ModalDialogFooter({ className, children, ...props }: ModalDialogFooterProps) {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
}
