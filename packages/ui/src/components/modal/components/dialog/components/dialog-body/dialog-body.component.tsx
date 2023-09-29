import React from 'react';

import { styles } from './dialog-body.styles.js';
import { type DialogBodyProps } from './dialog-body.types.js';

export function DialogBody({ className, children, ...props }: DialogBodyProps) {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
}
