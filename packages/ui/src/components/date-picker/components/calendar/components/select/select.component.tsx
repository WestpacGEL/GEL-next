import React from 'react';
import { useFocusRing } from 'react-aria';

import { ExpandMoreIcon } from '../../../../../icon/index.js';

import { styles as selectStyles } from './select.styles.js';
import { SelectProps } from './select.types.js';

/**
 * @private
 */
export function Select({ ...props }: SelectProps) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = selectStyles({ isFocusVisible });
  return (
    <div className="relative">
      <select {...focusProps} className={styles.base({ className: props.className })} {...props} />
      <ExpandMoreIcon color="primary" size="small" className={styles.caret()} />
    </div>
  );
}
