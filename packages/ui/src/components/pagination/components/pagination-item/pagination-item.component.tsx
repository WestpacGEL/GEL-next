import React from 'react';

import { styles } from './pagination-item.styles.js';
import { type PaginationItemProps } from './pagination-item.types.js';

export function PaginationItem({
  className,
  firstItem = false,
  tag: Tag = 'a',
  children,
  active,
  disabled = false,
  ...props
}: PaginationItemProps) {
  return (
    <Tag
      className={styles({ className, firstItem, active, disabled })}
      {...props}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Tag>
  );
}
