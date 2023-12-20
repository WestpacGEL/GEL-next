import React, { useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { Button as GELButton } from '../../../button/index.js';
import { ButtonGroupContext } from '../../button-group.component.js';

import { styles as buttonStyles } from './button.styles.js';
import { type ButtonProps } from './button.types.js';

export function Button({ className, children, ...props }: ButtonProps) {
  const state = useContext(ButtonGroupContext);
  const { size, look, block } = state;
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = buttonStyles({ block, isDisabled, isFocusVisible });

  return (
    <label className={styles.base({ className })}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <GELButton
        tag="div"
        block={block}
        soft={!isSelected}
        disabled={isDisabled}
        look={look}
        size={size}
        className={styles.button()}
      >
        {children}
      </GELButton>
    </label>
  );
}

Button.displayName = 'ButtonGroup.Button';
