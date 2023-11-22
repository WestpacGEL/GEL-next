import React from 'react';

import { styles as adornmentStyles } from './flexi-cell-adornment.styles.js';
import { type FlexiCellAdornmentProps } from './flexi-cell-adornment.types.js';

/** Flexi Cell Adornment: Flexi Cell Adornment */
export const FlexiCellAdornment = ({
  children,
  tag: Tag = 'div',
  align,
  className,
  ...props
}: FlexiCellAdornmentProps) => {
  const styles = adornmentStyles({ align });
  return (
    <Tag {...props} className={styles.base({ className })}>
      {children}
    </Tag>
  );
};
FlexiCellAdornment.displayName = 'FlexiCell.Adornment';
