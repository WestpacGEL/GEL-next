import React from 'react';

import { styles } from './dialog-footer.styles.js';
import { type DialogFooterProps } from './dialog-footer.types.js';

export function DialogFooter({ className, children, ...props }: DialogFooterProps) {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
}
