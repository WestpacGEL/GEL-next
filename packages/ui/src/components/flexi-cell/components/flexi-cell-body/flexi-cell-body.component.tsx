import React from 'react';

import { styles } from './flexi-cell-body.styles.js';
import { type FlexiCellBodyProps } from './flexi-cell-body.types.js';

/** Flexi Cell Body: Flexi Cell Body */
export const FlexiCellBody = ({ children, tag: Tag = 'div', className, ...props }: FlexiCellBodyProps) => {
  return (
    <Tag {...props} className={styles({ className })}>
      {children}
    </Tag>
  );
};
FlexiCellBody.displayName = 'FlexiCell.Body';
