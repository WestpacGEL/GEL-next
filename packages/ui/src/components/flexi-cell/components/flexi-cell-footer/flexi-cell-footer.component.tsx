import React from 'react';

import { styles } from './flexi-cell-footer.styles.js';
import { type FlexiCellFooterProps } from './flexi-cell-footer.types.js';

/** Flexi Cell Footer: Flexi Cell Footer */
export const FlexiCellFooter = ({ children, className, tag: Tag = 'div', ...props }: FlexiCellFooterProps) => {
  return (
    <Tag {...props} className={styles({ className })}>
      {children}
    </Tag>
  );
};
FlexiCellFooter.displayName = 'FlexiCell.Footer';
