import React from 'react';

import { styles } from './flexi-cell-adornment.styles.js';
import { type FlexiCellAdornmentProps } from './flexi-cell-adornment.types.js';

/** Flexi Cell Adornment: Flexi Cell Adornment */
export const FlexiCellAdornment = ({
  children,
  tag: Tag = 'div',
  align = 'center',
  className,
  ...props
}: FlexiCellAdornmentProps) => {
  return (
    <Tag {...props} className={styles({ align, className })}>
      {children}
    </Tag>
  );
};
FlexiCellAdornment.displayName = 'FlexiCell.Adornment';
