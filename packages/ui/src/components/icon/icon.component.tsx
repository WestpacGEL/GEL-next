import React from 'react';

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
  color = 'muted',
  ...props
}: IconProps) {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      role={role}
      focusable={focusable}
      className={styles({ size, color, className })}
      {...props}
    >
      {copyrightYear && (
        <metadata>{`Copyright © ${copyrightYear} by Westpac Banking Corporation. All rights reserved.`}</metadata>
      )}
      {children}
    </svg>
  );
}
