import React from 'react';

import { styles } from './caption.styles.js';
import { type CaptionProps } from './caption.types.js';

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <caption className={styles({ className })} {...props}>
      {children}
    </caption>
  );
}
