'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { type SelectProps } from '../../select.types.js';

import { styles as selectStyles } from './styled-select.styles.js';

function BaseSelect(
  {
    className,
    size = 'medium',
    invalid = false,
    width = 'auto',
    children,
    wrapperProps,
    disabled,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();
  const styles = selectStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    disabled,
    invalid,
    isFocused,
    isFocusVisible,
    width: resolveResponsiveVariant(width, breakpoint),
  });

  return (
    <div {...wrapperProps} className={styles.root({ className: wrapperProps?.className })}>
      <select ref={ref} disabled={disabled} className={styles.select({ className })} {...mergeProps(props, focusProps)}>
        {children}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" className={styles.caret()}>
        <path fill="currentColor" d="M0 0l7 8 7-8z" />
      </svg>
    </div>
  );
}

export const StyledSelect = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);
