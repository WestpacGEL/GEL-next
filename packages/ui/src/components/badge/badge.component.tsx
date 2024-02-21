'use client';

import React, { forwardRef } from 'react';

import { styles } from './badge.styles.js';
import { type BadgeProps } from './badge.types.js';

export function BaseBadge(
  { className, tag: Tag = 'div', color = 'hero', type = 'default', soft = false, children, ...props }: BadgeProps,
  ref: any,
) {
  return (
    <Tag {...({ ref } as any)} className={styles({ className, color, type, soft })} {...props}>
      {/* styling vertically aligns text in the middle */}
      <div className="relative bottom-[1px]">{children}</div>
    </Tag>
  );
}

export const Badge = forwardRef<any, BadgeProps>(BaseBadge);
