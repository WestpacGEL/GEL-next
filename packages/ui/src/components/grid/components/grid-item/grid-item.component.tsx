import React from 'react';

import { styles } from './grid-item.styles.js';
import { type GridItemProps } from './grid-item.types.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';

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
