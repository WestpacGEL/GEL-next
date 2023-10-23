import React from 'react';

import { styles } from './flexi-cell-hint.styles.js';
import { FlexiCellHintProps } from './flexi-cell-hint.types.js';

/** Flexi Cell Hint: Flexi Cell Hint */
export const FlexiCellHint = ({
  children,
  tag: Tag = 'p',
  className,
  truncateText = false,
  ...props
}: FlexiCellHintProps) => {
  return (
    <Tag {...props} className={styles({ className, truncateText })}>
      {children}
    </Tag>
  );
};
FlexiCellHint.displayName = 'FlexiCell.Hint';
