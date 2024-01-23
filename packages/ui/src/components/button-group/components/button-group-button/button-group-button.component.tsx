'use client';

import React, { useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { Button as GELButton } from '../../../button/index.js';
import { ButtonGroupContext } from '../../button-group.component.js';

import { styles as buttonStyles } from './button-group-button.styles.js';
import { type ButtonGroupButtonProps } from './button-group-button.types.js';

export function ButtonGroupButton({ className, children, ...props }: ButtonGroupButtonProps) {
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
