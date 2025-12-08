import React, { ForwardedRef, forwardRef, useState } from 'react';

import { Tooltip } from '../../../tooltip/index.js';
import { SelectProps } from '../../select.types.js';
import { StyledSelect } from '../styled-select/styled-select.component.js';

import { styles } from './select-with-tooltip.styles.js';

function BaseSelectWithTooltip(
  { width = 'auto', children, onChange, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <Tooltip tooltip={selectedOption} className={styles({ width })}>
      <StyledSelect
        ref={ref}
        onChange={e => {
          setSelectedOption(e.target.options[e.target.selectedIndex].text);
          onChange?.(e);
        }}
        width={width}
        {...props}
      >
        {children}
      </StyledSelect>
    </Tooltip>
  );
}

export const SelectWithTooltip = forwardRef<HTMLSelectElement, SelectProps>(BaseSelectWithTooltip);
