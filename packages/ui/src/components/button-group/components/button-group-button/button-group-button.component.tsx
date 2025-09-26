'use client';

import React, { useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Button as GELButton } from '../../../button/index.js';
import { ButtonGroupContext } from '../../button-group.component.js';

import { styles as buttonStyles } from './button-group-button.styles.js';
import { type ButtonGroupButtonProps } from './button-group-button.types.js';

export function ButtonGroupButton({ className, label, ...props }: ButtonGroupButtonProps) {
  const { state, size, look, block } = useContext(ButtonGroupContext);
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children: label }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();
  const styles = buttonStyles({ block, isDisabled, isFocusVisible, size: resolveResponsiveVariant(size, breakpoint) });

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
        className={styles.button({ hasTransition: !isSelected })}
      >
        {label}
      </GELButton>
    </label>
  );
}
