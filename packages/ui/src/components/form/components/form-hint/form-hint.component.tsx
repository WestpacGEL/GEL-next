import React from 'react';

import { useFormContext } from '../../form.component.js';

import { styles } from './form-hint.styles.js';
import { type FormHintProps } from './form-hint.types.js';

export function FormHint({ className, tag: Tag = 'div', children, ...props }: FormHintProps) {
  const { spacing } = useFormContext();

  return (
    <Tag className={styles({ className, spacing: spacing || 'medium' })} {...props}>
      {children}
    </Tag>
  );
}
