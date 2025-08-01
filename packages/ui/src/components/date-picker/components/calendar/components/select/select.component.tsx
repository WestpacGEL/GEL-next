import React from 'react';

import { ExpandMoreIcon } from '../../../../../icon/index.js';
import { Select as UISelect } from '../../../../../select/select.component.js';

import { styles as selectStyles } from './select.styles.js';
import { SelectProps } from './select.types.js';

/**
 * @private
 */
export function Select({ ...props }: SelectProps) {
  const styles = selectStyles();
  return (
    <div className="relative">
      <UISelect className={styles.base({ className: props.className })} {...props} />
      <ExpandMoreIcon color="primary" size="small" className={styles.caret()} />
    </div>
  );
}
