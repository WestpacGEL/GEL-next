import { clsx } from 'clsx';
import React from 'react';

import { type WellProps } from './well.types.js';

export function Well({ tag: Tag = 'div', bgClass = 'bg-light', children, className, ...props }: WellProps) {
  return (
    <Tag className={clsx('rounded border border-border bg-light p-2 sm:p-4', bgClass, className)} {...props}>
      {children}
    </Tag>
  );
}
