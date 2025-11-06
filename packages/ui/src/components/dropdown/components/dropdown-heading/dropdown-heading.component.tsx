import React from 'react';

import { styles as headingStyles } from './dropdown-heading.styles.js';
import { type DropdownHeadingProps } from './dropdown-heading.types.js';

export function DropdownHeading({ className, tag: Tag = 'h1', children, ...props }: DropdownHeadingProps) {
  const styles = headingStyles({});

  return (
    <Tag className={styles.base({ className })} {...props}>
      {children}
    </Tag>
  );
}
