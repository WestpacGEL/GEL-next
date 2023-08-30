import React from 'react';

import { styles } from './symbol.styles.js';
import { type SymbolProps } from './symbol.types.js';
import { getTransform } from './symbol.utils.js';

export function Symbol({
  copyrightYear = '',
  xmlns = 'http://www.w3.org/2000/svg',
  role = 'img',
  focusable = false,
  className,
  viewBoxWidth,
  viewBoxHeight,
  align,
  offset,
  children,
  ...props
}: SymbolProps) {
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
        {align && offset ? <g transform={getTransform({ align, offset })}>{children}</g> : children}
      </svg>
    </span>
  );
}
