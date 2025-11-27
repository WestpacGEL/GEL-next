'use client';

import React from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { VisuallyHidden } from '../index.js';

import { styles } from './label.styles.js';
import { type LabelProps } from './label.types.js';

export function Label({
  className,
  tag: Tag = 'label',
  spacing = 'medium',
  srOnly,
  children,
  size = 'medium',
  ...props
}: LabelProps) {
  const breakpoint = useBreakpoint();

  return srOnly ? (
    <VisuallyHidden>{children}</VisuallyHidden>
  ) : (
    <Tag
      className={styles({
        className,
        spacing: resolveResponsiveVariant(spacing, breakpoint),
        size: resolveResponsiveVariant(size, breakpoint),
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}
