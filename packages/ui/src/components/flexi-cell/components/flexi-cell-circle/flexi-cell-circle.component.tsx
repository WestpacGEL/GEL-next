import React from 'react';

import { Circle } from '../../../../components/index.js';

import { styles as flexiCellCircleStyles } from './flexi-cell-circle.styles.js';
import { FlexiCellCircleProps } from './flexi-cell-circle.types.js';

/** Flexi Cell Circle: Flexi Cell Circle */
export const FlexiCellCircle = ({ className, ...props }: FlexiCellCircleProps) => {
  const styles = flexiCellCircleStyles({});
  return <Circle className={styles.base({ className })} {...props} />;
};
