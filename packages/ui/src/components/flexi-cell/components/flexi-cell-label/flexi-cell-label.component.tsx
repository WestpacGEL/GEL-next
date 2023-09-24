import React from 'react';

import { styles } from './flexi-cell-label.styles.js';
import { FlexiCellLabelProps } from './flexi-cell-label.types.js';

/** Flexi Cell Label: Flexi Cell Label */
export const FlexiCellLabel = ({
  children,
  tag: Tag = 'div',
  truncateText = false,
  className,
  ...props
}: FlexiCellLabelProps) => {
  return (
    <Tag className={styles({ className, truncateText })} {...props}>
      {children}
    </Tag>
  );
};
