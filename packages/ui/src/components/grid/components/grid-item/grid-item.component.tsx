'use client';

import React from 'react';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';

import { styles } from './grid-item.styles.js';
import { type GridItemProps } from './grid-item.types.js';

export function GridItem({ className, tag: Tag = 'div', span, rowSpan, start, children, ...props }: GridItemProps) {
  const breakpoint = useBreakpoint();
  return (
    <Tag
      className={styles({
        span: resolveResponsiveVariant(span, breakpoint),
        rowSpan: resolveResponsiveVariant(rowSpan, breakpoint),
        start: resolveResponsiveVariant(start, breakpoint),
        className,
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}
