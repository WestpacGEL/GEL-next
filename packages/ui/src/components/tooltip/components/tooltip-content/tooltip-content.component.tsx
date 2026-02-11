import React from 'react';

import { styles } from './tooltip-content.styles.js';
import { TooltipContentProps } from './tooltip-content.types.js';

export function TooltipContent({ children, id, position }: TooltipContentProps) {
  return children ? (
    <span className={styles({ position })} role="tooltip" id={id}>
      {children}
    </span>
  ) : null;
}
