import React from 'react';

import { styles } from './icon-add-on.styles.js';
import { type IconAddOnProps } from './icon-add-on.types.js';

/**
 * @private
 */
export const IconAddOn = ({ position, children, size, className, ...props }: IconAddOnProps) => {
  return (
    <div className={styles({ className, size, position })} {...props}>
      {children}
    </div>
  );
};
