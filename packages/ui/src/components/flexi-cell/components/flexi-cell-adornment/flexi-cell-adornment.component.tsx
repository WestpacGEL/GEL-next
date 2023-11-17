import React from 'react';

import { styles as adornmentStyles } from './flexi-cell-adornment.styles.js';
import { type FlexiCellAdornmentProps } from './flexi-cell-adornment.types.js';

/** Flexi Cell Adornment: Flexi Cell Adornment */
export const FlexiCellAdornment = ({
  children,
  tag: Tag = 'div',
  align,
  leftGraphic: LeftGraphic,
  promoGraphic: PromoGraphic,
  className,
  ...props
}: FlexiCellAdornmentProps) => {
  const styles = adornmentStyles({ align });
  return (
    <Tag {...props} className={styles.base({ className })}>
      {LeftGraphic && <LeftGraphic className={styles.leftGraphic()} />}
      {PromoGraphic && <PromoGraphic className={styles.promoGraphic()} />}
      {children}
    </Tag>
  );
};
FlexiCellAdornment.displayName = 'FlexiCell.Adornment';
