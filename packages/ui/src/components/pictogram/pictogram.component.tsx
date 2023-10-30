'use client';

import React from 'react';

import { styles } from './pictogram.styles.js';
import { type PictogramProps } from './pictogram.types.js';

export function Pictogram({
  copyrightYear = '',
  xmlns = 'http://www.w3.org/2000/svg',
  role = 'img',
  focusable = false,
  className,
  viewBoxWidth,
  viewBoxHeight,
  children,
  ...props
}: PictogramProps) {
  return (
    <span className={styles({ className })}>
      <svg
        xmlns={xmlns}
        role={role}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        focusable={focusable}
        className="block"
        {...props}
      >
        {copyrightYear && (
          <metadata>{`Copyright © ${copyrightYear} by Westpac Banking Corporation. All rights reserved.`}</metadata>
        )}
        {children}
      </svg>
    </span>
  );
}
