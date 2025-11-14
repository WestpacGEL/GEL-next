import { clsx } from 'clsx';
import React, { useMemo } from 'react';

import { resolveSimpleResponsiveVariant } from '../../../../utils/breakpoint.util.js';

import { BREAKPOINT_CLASSES } from './grid-item.styles.js';
import { type GridItemProps } from './grid-item.types.js';

export function GridItem({ className, tag: Tag = 'div', span, rowSpan, start, children, ...props }: GridItemProps) {
  const finalClassName = useMemo(() => {
    const spanClasses = resolveSimpleResponsiveVariant(span, BREAKPOINT_CLASSES.span);
    const rowSpanClasses = resolveSimpleResponsiveVariant(rowSpan, BREAKPOINT_CLASSES.rowSpan);
    const startClasses = resolveSimpleResponsiveVariant(start, BREAKPOINT_CLASSES.start);
    return clsx(spanClasses, rowSpanClasses, startClasses, className);
  }, [span, rowSpan, start, className]);

  return (
    <Tag className={finalClassName} {...props}>
      {children}
    </Tag>
  );
}
