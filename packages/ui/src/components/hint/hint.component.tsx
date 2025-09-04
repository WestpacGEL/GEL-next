import React from 'react';

import { styles } from './hint.styles.js';
import { type HintProps } from './hint.types.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

export function Hint({ className, tag: Tag = 'div', children, spacing = 'medium', ...props }: HintProps) {
  const breakpoint = useBreakpoint();
  return (
    <Tag className={styles({ className, spacing: resolveResponsiveVariant(spacing, breakpoint) })} {...props}>
      {children}
    </Tag>
  );
}
