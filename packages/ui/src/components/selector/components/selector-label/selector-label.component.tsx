import React from 'react';

import { FlexiCellLabel, FlexiCellLabelProps } from '../../../../components/flexi-cell/index.js';

import { styles } from './selector-label.styles.js';

export function SelectorLabel({ className, ...props }: FlexiCellLabelProps) {
  return <FlexiCellLabel {...props} className={styles({ className })} />;
}
