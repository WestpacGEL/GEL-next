import React from 'react';

import { styles } from './default-add-on.styles.js';
import { type DefaultAddOnProps } from './default-add-on.types.js';

/**
 * @private
 */
export const DefaultAddOn = ({ position, className, children, ...props }: DefaultAddOnProps) => {
  return (
    <div className={styles({ className })} {...props}>
      {children}
    </div>
  );
};
