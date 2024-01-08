import React from 'react';

import { styles as headingStyles } from './heading.styles.js';
import { type ButtonDropdownHeadingProps } from './heading.types.js';

export function ButtonDropdownHeading({ className, tag: Tag = 'h1', children, ...props }: ButtonDropdownHeadingProps) {
  const styles = headingStyles({});

  return (
    <Tag className={styles.base({ className })} {...props}>
      {children}
    </Tag>
  );
}
ButtonDropdownHeading.displayName = 'ButtonDropdown.Heading';
