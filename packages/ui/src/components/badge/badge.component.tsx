'use client';

import React, { Ref, forwardRef } from 'react';

import { styles } from './badge.styles.js';
import { type BadgeProps } from './badge.types.js';

export function BaseBadge(
  { className, tag: Tag = 'div', color = 'hero', type = 'default', soft = false, children, ...props }: BadgeProps,
  ref: Ref<HTMLElement>,
) {
  return (
    <Tag {...({ ref } as object)} className={styles({ className, color, type, soft })} {...props}>
      {/* styling vertically aligns text in the middle */}
      {children}
    </Tag>
  );
}

export const Badge = forwardRef<HTMLElement, BadgeProps>(BaseBadge);
