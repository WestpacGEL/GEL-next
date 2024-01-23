import React from 'react';

import { styles as headingStyles } from './button-dropdown-heading.styles.js';
import { type ButtonDropdownHeadingProps } from './button-dropdown-heading.types.js';

export function ButtonDropdownHeading({ className, tag: Tag = 'h1', children, ...props }: ButtonDropdownHeadingProps) {
  const styles = headingStyles({});

  return (
    <Tag className={styles.base({ className })} {...props}>
      {children}
    </Tag>
  );
}
