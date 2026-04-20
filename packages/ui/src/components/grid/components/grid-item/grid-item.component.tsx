import React from 'react';

import { responsiveClasses } from '../../../../utils/responsive-class.util.js';

import { SPAN_MAP, ROW_SPAN_MAP, START_MAP } from './grid-item.styles.js';
import { type GridItemProps } from './grid-item.types.js';

export function GridItem({ className, tag: Tag = 'div', span, rowSpan, start, children, ...props }: GridItemProps) {
  return (
    <Tag
      className={responsiveClasses(
        [
          [span, SPAN_MAP],
          [rowSpan, ROW_SPAN_MAP],
          [start, START_MAP],
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
