import React from 'react';

import { styles } from './form-section.styles.js';
import { type FormSectionProps } from './form-section.types.js';

export function FormSection({ className, noPadding = false, tag: Tag = 'div', children, ...props }: FormSectionProps) {
  return (
    <Tag className={styles({ className, noPadding })} {...props}>
      {children}
    </Tag>
  );
}
