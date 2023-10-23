'use client';

import React, { forwardRef } from 'react';

import { styles } from './badge.styles.js';
import { type BadgeProps } from './badge.types.js';

export function BaseBadge(
  { className, tag: Tag = 'div', color = 'hero', type = 'default', children, ...props }: BadgeProps,
  ref: any,
) {
  return (
    <Tag {...({ ref } as any)} className={styles({ className, color, type })} {...props}>
      {children}
    </Tag>
  );
}

export const Badge = forwardRef<any, BadgeProps>(BaseBadge);
