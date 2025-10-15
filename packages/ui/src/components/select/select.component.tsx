'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './select.styles.js';
import { type SelectProps } from './select.types.js';

function BaseSelect(
  {
    className,
    enableTruncatedTitle = false,
    size = 'medium',
    invalid = false,
    width = 'auto',
    children,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const [selectedOption, setSelectedOption] = React.useState<string | undefined>(undefined);

  return (
    <select
      ref={ref}
      className={styles({ className, size, invalid, isFocused, isFocusVisible, width })}
      title={enableTruncatedTitle ? selectedOption : undefined}
      onChange={e => {
        setSelectedOption(e.target.options[e.target.selectedIndex].text);
      }}
      {...mergeProps(props, focusProps)}
    >
      {children}
    </select>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);
