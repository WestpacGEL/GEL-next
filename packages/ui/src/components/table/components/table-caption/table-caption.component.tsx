import React from 'react';

import { styles } from './table-caption.styles.js';
import { type TableCaptionProps } from './table-caption.types.js';

export function TableCaption({ className, children, ...props }: TableCaptionProps) {
  return (
    <caption className={styles({ className })} {...props}>
      {children}
    </caption>
  );
}
