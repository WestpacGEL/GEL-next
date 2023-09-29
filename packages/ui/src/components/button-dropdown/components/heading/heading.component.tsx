import React from 'react';

import { styles as headingStyles } from './heading.styles.js';
import { type HeadingProps } from './heading.types.js';

export function Heading({ className, tag: Tag = 'h1', children, ...props }: HeadingProps) {
  const styles = headingStyles({});

  return (
    <Tag className={styles.base({ className })} {...props}>
      {children}
    </Tag>
  );
}
