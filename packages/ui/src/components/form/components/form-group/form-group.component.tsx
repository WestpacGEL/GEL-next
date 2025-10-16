import React from 'react';

import { useFormContext } from '../../form.component.js';

import { styles } from './form-group.styles.js';
import { type FormGroupProps } from './form-group.types.js';

export function FormGroup({ className, tag: Tag = 'div', children, spacing: propSpacing, ...props }: FormGroupProps) {
  const { inline, spacing } = useFormContext();

  return (
    <Tag className={styles({ className, inline, spacing: propSpacing || spacing })} {...props}>
      {children}
    </Tag>
  );
}
