'use client';

import React from 'react';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';

import { styles } from './grid-container.styles.js';
import { type GridContainerProps } from './grid-container.types.js';

export function GridContainer({ className, tag: Tag = 'div', fixed = false, children, ...props }: GridContainerProps) {
  const breakpoint = useBreakpoint();
  return (
    <Tag className={styles({ fixed: resolveResponsiveVariant(fixed, breakpoint), className })} {...props}>
      {children}
    </Tag>
  );
}
