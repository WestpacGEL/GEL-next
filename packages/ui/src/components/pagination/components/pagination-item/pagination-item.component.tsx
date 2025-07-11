import React from 'react';

import { styles } from './pagination-item.styles.js';
import { type PaginationItemProps } from './pagination-item.types.js';

/**
 * @private
 */
export function PaginationItem({
  className,
  firstItem = false,
  lastItem = false,
  tag: Tag = 'a',
  children,
  active,
  disabled = false,
  ...props
}: PaginationItemProps) {
  return (
    <Tag
      className={styles({ className, firstItem, lastItem, active, disabled })}
      {...props}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      {...(Tag === 'button' && { type: 'button' })}
    >
      {children}
    </Tag>
  );
}
