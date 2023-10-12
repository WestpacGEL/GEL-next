import React from 'react';

import { VisuallyHidden } from '../index.js';

import { styles } from './form-label.styles.js';
import { type FormLabelProps } from './form-label.types.js';

export function FormLabel({
  className,
  tag: Tag = 'label',
  spacing,
  srOnly,
  children,
  subLabel = false,
  ...props
}: FormLabelProps) {
  const finalSpacing = spacing || 'medium';

  return srOnly ? (
    <VisuallyHidden>{children}</VisuallyHidden>
  ) : (
    <Tag className={styles({ className, spacing: finalSpacing, subLabel })} {...props}>
      {children}
    </Tag>
  );
}
