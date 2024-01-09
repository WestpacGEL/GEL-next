import React from 'react';

import { styles } from './input-field-add-on-text-add-on.styles.js';
import { type InputFieldAddOnTextAddOnProps } from './input-field-add-on-text-add-on.types.js';

/**
 * @private
 */
export const InputFieldAddOnTextAddOn = ({
  position,
  className,
  size,
  id,
  children,
  ...props
}: InputFieldAddOnTextAddOnProps) => {
  return (
    <div id={`${id}-text-${position}`} className={styles({ className, position, size })} {...props}>
      {children}
    </div>
  );
};
