import React from 'react';

import { styles } from './input-group-supporting-text.styles.js';
import { type InputGroupSupportingTextProps } from './input-group-supporting-text.types.js';

/**
 * @private
 */
export function InputGroupSupportingText({
  className,
  tag: Tag = 'p',
  children,
  ...props
}: InputGroupSupportingTextProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}
