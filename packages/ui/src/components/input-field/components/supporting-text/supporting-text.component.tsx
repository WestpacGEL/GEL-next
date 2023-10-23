import React from 'react';

import { styles } from './supporting-text.styles.js';
import { type SupportingTextProps } from './supporting-text.types.js';

/**
 * @private
 */
export function SupportingText({ className, tag: Tag = 'p', children, ...props }: SupportingTextProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}
