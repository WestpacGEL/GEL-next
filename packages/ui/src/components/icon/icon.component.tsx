'use client';

import React from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { styles } from './icon.styles.js';
import { type IconProps } from './icon.types.js';

export function Icon({
  copyrightYear = '',
  xmlns = 'http://www.w3.org/2000/svg',
  viewBox = '0 0 24 24',
  role = 'img',
  focusable = 'false',
  children,
  className,
  size = 'medium',
  color,
  ...props
}: IconProps) {
  const breakpoint = useBreakpoint();

  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      role={role}
      focusable={focusable}
      className={styles({
        size: resolveResponsiveVariant(size, breakpoint),
        color: resolveResponsiveVariant(color, breakpoint),
        className,
      })}
      {...props}
    >
      {copyrightYear && (
        <metadata>{`Copyright © ${copyrightYear} by Westpac Banking Corporation. All rights reserved.`}</metadata>
      )}
      {children}
    </svg>
  );
}
