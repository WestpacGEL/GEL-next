import React from 'react';

import { Button } from '../../../../components/index.js';

import { styles } from './flexi-cell-button.styles.js';
import { type FlexiCellButtonProps } from './flexi-cell-button.types.js';

/** Flexi Cell Button: Flexi Cell Button */
export const FlexiCellButton = ({ className, ...props }: FlexiCellButtonProps) => {
  return <Button className={styles({ className })} look="link" {...props} />;
};
FlexiCellButton.displayName = 'FlexiCell.Button';
