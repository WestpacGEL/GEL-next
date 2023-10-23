import React from 'react';

import { Circle } from '../../../../components/index.js';

import { styles } from './flexi-cell-circle.styles.js';
import { FlexiCellCircleProps } from './flexi-cell-circle.types.js';

/** Flexi Cell Circle: Flexi Cell Circle */
export const FlexiCellCircle = ({ className, ...props }: FlexiCellCircleProps) => {
  return <Circle className={styles({ className })} {...props} />;
};
FlexiCellCircle.displayName = 'FlexiCell.Circle';
