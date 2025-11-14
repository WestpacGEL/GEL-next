import { clsx } from 'clsx';
import React, { useMemo } from 'react';

import { resolveSimpleResponsiveVariant } from '../../../../utils/breakpoint.util.js';

import { BASE_CLASSES, BREAKPOINT_CLASSES } from './grid-container.styles.js';
import { type GridContainerProps } from './grid-container.types.js';

export function GridContainer({ className, tag: Tag = 'div', fixed = false, children, ...props }: GridContainerProps) {
  const fixedClasses = useMemo(() => {
    return resolveSimpleResponsiveVariant(fixed ? 'true' : 'false', BREAKPOINT_CLASSES.fixed);
  }, [fixed]);

  return (
    <Tag className={clsx(BASE_CLASSES, fixedClasses)} {...props}>
      {children}
    </Tag>
  );
}
