import React from 'react';

import { styles as adornmentStyles } from './flexi-cell-adornment.styles.js';
import { type FlexiCellAdornmentProps } from './flexi-cell-adornment.types.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';

/** Flexi Cell Adornment: Flexi Cell Adornment */
export const FlexiCellAdornment = ({
  children,
  tag: Tag = 'div',
  align,
  className,
  ...props
}: FlexiCellAdornmentProps) => {
  const breakpoint = useBreakpoint();
  const styles = adornmentStyles({ align: resolveResponsiveVariant(align, breakpoint) });
  return (
    <Tag {...props} className={styles.base({ className })}>
      {children}
    </Tag>
  );
};
