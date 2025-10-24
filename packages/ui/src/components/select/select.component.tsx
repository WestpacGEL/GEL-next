'use client';

import React, { ForwardedRef, forwardRef } from 'react';

import { SelectWithTooltip, StyledSelect } from './components/index.js';
import { type SelectProps } from './select.types.js';

function BaseSelect({ children, enableTooltip, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) {
  return enableTooltip ? (
    <SelectWithTooltip ref={ref} {...props}>
      {children}
    </SelectWithTooltip>
  ) : (
    <StyledSelect ref={ref} {...props}>
      {children}
    </StyledSelect>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);
