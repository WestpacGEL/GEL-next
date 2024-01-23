import React from 'react';

import { VisuallyHidden } from '../index.js';

import { styles } from './label.styles.js';
import { type LabelProps } from './label.types.js';

export function Label({
  className,
  tag: Tag = 'label',
  spacing,
  srOnly,
  children,
  size = 'medium',
  ...props
}: LabelProps) {
  const finalSpacing = spacing || 'medium';

  return srOnly ? (
    <VisuallyHidden>{children}</VisuallyHidden>
  ) : (
    <Tag className={styles({ className, spacing: finalSpacing, size })} {...props}>
      {children}
    </Tag>
  );
}
