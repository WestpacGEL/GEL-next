'use client';

import React, { Ref, forwardRef } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { styles } from './badge.styles.js';
import { type BadgeProps } from './badge.types.js';

export function BaseBadge(
  { className, tag: Tag = 'div', color = 'hero', type = 'default', soft = false, children, ...props }: BadgeProps,
  ref: Ref<HTMLElement>,
) {
  const breakpoint = useBreakpoint();
  return (
    <Tag
      {...({ ref } as object)}
      className={styles({
        className,
        color: resolveResponsiveVariant(color, breakpoint),
        type: resolveResponsiveVariant(type, breakpoint),
        soft: resolveResponsiveVariant(soft, breakpoint),
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export const Badge = forwardRef<HTMLElement, BadgeProps>(BaseBadge);
