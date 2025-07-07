import React from 'react';

import { styles } from './heading.styles.js';
import { type HeadingProps } from './heading.types.js';

export function Heading({ className, tag, brandHeading, size, children, uppercase, ...props }: HeadingProps) {
  const sizeToTag = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
    7: 'h6',
    8: 'h6',
    9: 'h6',
    10: 'h6',
  };
  const Tag = typeof size === 'number' && !tag ? (sizeToTag[size] as keyof HeadingProps['tag']) : tag || 'h6';

  return (
    <Tag className={styles({ className, brandHeading, size, uppercase })} {...props}>
      {children}
    </Tag>
  );
}
