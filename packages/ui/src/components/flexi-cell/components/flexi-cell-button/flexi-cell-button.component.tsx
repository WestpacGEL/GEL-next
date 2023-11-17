import React from 'react';

import { Button } from '../../../../components/index.js';

import { styles as flexiButtonStyles } from './flexi-cell-button.styles.js';
import { type FlexiCellButtonProps } from './flexi-cell-button.types.js';

/** Flexi Cell Button: Flexi Cell Button */
export const FlexiCellButton = ({ className, icon: Icon, ...props }: FlexiCellButtonProps) => {
  const styles = flexiButtonStyles();

  return (
    <>
      {Icon && (
        <Button
          className={styles.base({ className })}
          iconBefore={({ className }) => <Icon className={styles.iconBase({ className })} look="outlined" />}
          look="link"
          {...props}
        />
      )}
    </>
  );
};
FlexiCellButton.displayName = 'FlexiCell.Button';
