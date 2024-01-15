import React from 'react';

import { styles } from './input-field-supporting-text.styles.js';
import { type InputFieldSupportingTextProps } from './input-field-supporting-text.types.js';

/**
 * @private
 */
export function InputFieldSupportingText({
  className,
  tag: Tag = 'p',
  children,
  ...props
}: InputFieldSupportingTextProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}
